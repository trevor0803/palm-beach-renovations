import { NextResponse } from "next/server";
import { upsertContact, createContactNote } from "@/lib/ghl";
import { sendCapiEvent } from "@/lib/capi";

export const dynamic = "force-dynamic";

// Creates/updates the contact in GHL (Private Integration token) and fires a
// server-side Meta Lead event deduped with the browser pixel via eventId.
// GHL workflows (notifications, SMS follow-up) trigger off the tags below.
export async function POST(req: Request) {
  try {
    if (!process.env.GHL_API_TOKEN || !process.env.GHL_LOCATION_ID) {
      return NextResponse.json({ error: "GHL not configured for this site" }, { status: 500 });
    }
    const {
      firstName = "",
      lastName = "",
      phone,
      email,
      city = "",
      zip = "",
      projectType = "",
      message = "",
      source = "meta-funnel",
      tag,
      eventId,
      fbp,
      fbc,
      company, // honeypot — real users never fill this
    } = await req.json();

    // Silently accept-and-drop bots so they don't retry.
    if (company) return NextResponse.json({ ok: true });

    if (!phone && !email) {
      return NextResponse.json({ error: "Phone or email required" }, { status: 400 });
    }

    const contact = await upsertContact({
      firstName: firstName || "Website",
      lastName: lastName || "Lead",
      phone,
      email,
      city,
      postalCode: zip,
      tags: ["website-lead", source, ...(tag ? [tag] : [])],
      source,
    });

    // Project details → a clean, readable note on the contact
    const noteLines = [
      projectType ? `Project type: ${projectType}` : "",
      city ? `City: ${city}${zip ? ` ${zip}` : ""}` : zip ? `Zip: ${zip}` : "",
      message ? `Details: ${message}` : "",
    ].filter(Boolean);
    if (noteLines.length && contact.id) {
      createContactNote(contact.id, `📋 Free estimate request:\n${noteLines.map((l) => `• ${l}`).join("\n")}`).catch(
        () => {} // never block the lead
      );
    }

    await sendCapiEvent("Lead", {
      eventId,
      email,
      phone,
      firstName,
      lastName,
      city,
      zip,
      fbp,
      fbc,
      sourceUrl: req.headers.get("referer") || "",
      ip: req.headers.get("x-forwarded-for")?.split(",")[0] || "",
      userAgent: req.headers.get("user-agent") || "",
    });

    return NextResponse.json({ ok: true, contactId: contact.id });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

// Config health check (no secrets) — visit /api/lead in a browser to verify env vars.
export async function GET() {
  return NextResponse.json({
    ghlToken: Boolean(process.env.GHL_API_TOKEN),
    ghlLocationId: Boolean(process.env.GHL_LOCATION_ID),
    metaPixelId: Boolean(process.env.META_PIXEL_ID),
    metaCapiToken: Boolean(process.env.META_CAPI_TOKEN),
    browserPixelId: Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
    testEventCode: Boolean(process.env.META_TEST_EVENT_CODE),
  });
}
