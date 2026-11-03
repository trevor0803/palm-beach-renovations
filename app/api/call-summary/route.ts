import { NextResponse, after } from "next/server";
import { timingSafeEqual } from "crypto";
import { createContactNote } from "@/lib/ghl";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // transcripts can take a few minutes to appear

// Call transcript -> AI summary -> note on the GHL contact.
// A GHL workflow (trigger: Call Status = completed) POSTs here with a Webhook
// action. We answer 200 right away, then wait for the transcript in the
// background, summarize it with Claude and post the summary as a contact note.
//
// Env: CALL_WEBHOOK_SECRET, ANTHROPIC_API_KEY, GHL_API_TOKEN, GHL_LOCATION_ID
// Optional: ANTHROPIC_MODEL (default claude-sonnet-5-5)
// Token scopes needed: contacts write (notes) + conversations/messages readonly.

const BASE = "https://services.leadconnectorhq.com";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

function ghlHeaders() {
  return {
    Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
    Version: "2021-04-15", // conversations endpoints
    Accept: "application/json",
  };
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Latest completed call message for a contact (used when no messageId is sent).
async function findLatestCallMessageId(contactId: string): Promise<string | null> {
  const loc = process.env.GHL_LOCATION_ID!;
  const s = await fetch(
    `${BASE}/conversations/search?locationId=${loc}&contactId=${contactId}`,
    { headers: ghlHeaders() }
  );
  if (!s.ok) {
    console.log("[call-summary] conversation search failed", s.status);
    return null;
  }
  const sd = await s.json();
  const convoId = sd?.conversations?.[0]?.id;
  if (!convoId) return null;

  const m = await fetch(`${BASE}/conversations/${convoId}/messages?limit=20&type=TYPE_CALL`, {
    headers: ghlHeaders(),
  });
  if (!m.ok) {
    console.log("[call-summary] messages fetch failed", m.status);
    return null;
  }
  const md = await m.json();
  const list: Array<{ id: string; messageType?: string; dateAdded?: string }> =
    md?.messages?.messages ?? md?.messages ?? [];
  const calls = list.filter((x) => !x.messageType || x.messageType === "TYPE_CALL");
  calls.sort((a, b) => +new Date(b.dateAdded || 0) - +new Date(a.dateAdded || 0));
  return calls[0]?.id ?? null;
}

// Returns the transcript as plain text, or "" if it is not ready yet.
async function fetchTranscript(messageId: string): Promise<string> {
  const loc = process.env.GHL_LOCATION_ID!;
  const res = await fetch(
    `${BASE}/conversations/locations/${loc}/messages/${messageId}/transcription`,
    { headers: ghlHeaders() }
  );
  if (res.status === 404) return "";
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GHL transcription ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const rows: unknown = data?.transcriptions ?? data?.transcription ?? data;
  if (typeof rows === "string") return rows.trim();
  if (Array.isArray(rows)) {
    return rows
      .map((r: { transcript?: string; text?: string; mediaChannel?: number }) => {
        const t = r.transcript ?? r.text ?? "";
        if (!t) return "";
        // mediaChannel 1 / 2 are the two sides of the call
        return r.mediaChannel ? `Speaker ${r.mediaChannel}: ${t}` : t;
      })
      .filter(Boolean)
      .join("\n")
      .trim();
  }
  console.log("[call-summary] unexpected transcription shape", Object.keys(data || {}));
  return "";
}

async function summarize(transcript: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 600,
      system:
        "You write short CRM call notes for Palm Beach Renovations, a kitchen and bathroom remodeling contractor in Palm Beach and Martin County, FL. " +
        "Use only what is said in the transcript. Never invent names, prices, dates or promises. " +
        "The two speakers are labeled by channel and are not named; infer who is the contractor team and who is the customer from context.",
      messages: [
        {
          role: "user",
          content:
            "Summarize this call for the contact's CRM note. Use exactly this format, plain text, no markdown:\n\n" +
            "Outcome: one sentence\n" +
            "Project: what they want done, rooms, scope, timeline, budget if mentioned (or 'Not discussed')\n" +
            "Objections / concerns: short list or 'None'\n" +
            "Next step: who does what and by when (or 'None agreed')\n\n" +
            "Transcript:\n" +
            transcript,
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return (data?.content || [])
    .map((b: { type: string; text?: string }) => (b.type === "text" ? b.text : ""))
    .join("")
    .trim();
}

async function run(contactId: string, messageIdIn?: string) {
  // Give GHL time to finish the call + transcription before the first look.
  await sleep(30_000);

  let messageId = messageIdIn || null;
  let transcript = "";
  for (let attempt = 1; attempt <= 9; attempt++) {
    if (!messageId) messageId = await findLatestCallMessageId(contactId);
    if (messageId) {
      transcript = await fetchTranscript(messageId);
      if (transcript) break;
    }
    console.log("[call-summary] transcript not ready", { contactId, messageId, attempt });
    await sleep(20_000);
  }

  if (!transcript) {
    console.log("[call-summary] gave up, no transcript", { contactId, messageId });
    return;
  }

  const stamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  // Too little speech to summarize (voicemail, hang-up, ring-out).
  if (transcript.split(/\s+/).length < 12) {
    await createContactNote(contactId, `📞 Call ${stamp} ET: no real conversation captured.\n\n${transcript}`);
    return;
  }

  const summary = await summarize(transcript);
  await createContactNote(contactId, `📞 Call summary (${stamp} ET)\n\n${summary}`);
  console.log("[call-summary] note posted", { contactId, messageId });
}

export async function POST(req: Request) {
  const secret = process.env.CALL_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Not configured" }, { status: 500 });
  if (!safeEqual(req.headers.get("x-webhook-secret") || "", secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.GHL_API_TOKEN || !process.env.GHL_LOCATION_ID || !process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  const b = body as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  const contactId: string | undefined = b.contactId || b.contact_id || b.contact?.id;
  const messageId: string | undefined = b.messageId || b.message_id || undefined;
  if (!contactId) return NextResponse.json({ error: "contactId required" }, { status: 400 });

  after(async () => {
    try {
      await run(contactId, messageId);
    } catch (e) {
      console.log("[call-summary] FAILED", (e as Error).message);
    }
  });

  return NextResponse.json({ ok: true, queued: true });
}

// Config health check (no secrets).
export async function GET() {
  return NextResponse.json({
    callWebhookSecret: Boolean(process.env.CALL_WEBHOOK_SECRET),
    anthropicKey: Boolean(process.env.ANTHROPIC_API_KEY),
    ghlToken: Boolean(process.env.GHL_API_TOKEN),
    ghlLocationId: Boolean(process.env.GHL_LOCATION_ID),
  });
}
