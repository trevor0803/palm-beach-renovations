import crypto from "crypto";

// Meta Conversions API — server-side events, deduplicated with the browser
// pixel via a shared event_id, matched via _fbp/_fbc cookies + hashed PII.
// Env: META_PIXEL_ID, META_CAPI_TOKEN (Events Manager → Settings → Generate token).
// Optional: META_TEST_EVENT_CODE while verifying in Test Events.

const GRAPH = "https://graph.facebook.com/v25.0";
const sha = (v: string) =>
  crypto.createHash("sha256").update(String(v).trim().toLowerCase()).digest("hex");
const shaPhone = (v: string) =>
  crypto.createHash("sha256").update(String(v).replace(/\D/g, "")).digest("hex");

export async function sendCapiEvent(
  eventName: string,
  {
    eventId,
    email,
    phone,
    firstName,
    lastName,
    city,
    zip,
    sourceUrl,
    ip,
    userAgent,
    fbp,
    fbc,
  }: {
    eventId?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    zip?: string;
    sourceUrl?: string;
    ip?: string;
    userAgent?: string;
    fbp?: string;
    fbc?: string;
  }
) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return { skipped: "capi-not-configured" };

  const user_data: Record<string, unknown> = {};
  if (email) user_data.em = [sha(email)];
  if (phone) user_data.ph = [shaPhone(phone)];
  if (firstName) user_data.fn = [sha(firstName)];
  if (lastName) user_data.ln = [sha(lastName)];
  if (city) user_data.ct = [sha(city.replace(/\s/g, ""))];
  if (zip) user_data.zp = [sha(zip)];
  if (fbp) user_data.fbp = fbp; // matches the browser pixel's cookie
  if (fbc) user_data.fbc = fbc; // attributes back to the ad click
  if (ip) user_data.client_ip_address = ip;
  if (userAgent) user_data.client_user_agent = userAgent;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: sourceUrl || undefined,
        event_id: eventId || undefined, // dedup key with the browser event
        user_data,
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(`${GRAPH}/${pixelId}/events?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error?.message || `HTTP ${res.status}` };
    return { ok: true, received: data.events_received };
  } catch (e) {
    return { error: (e as Error).message };
  }
}
