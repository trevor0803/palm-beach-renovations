// Server-side GoHighLevel v2 API helpers.
// Auth: Private Integration token (Settings → Private Integrations in the
// PBR sub-account). Set GHL_API_TOKEN + GHL_LOCATION_ID in Vercel env vars.

const BASE = "https://services.leadconnectorhq.com";

function headers() {
  return {
    Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export async function upsertContact({
  firstName,
  lastName,
  phone,
  email,
  tags = [],
  source,
  city,
  postalCode,
}: {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  tags?: string[];
  source?: string;
  city?: string;
  postalCode?: string;
}) {
  const res = await fetch(`${BASE}/contacts/upsert`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      locationId: process.env.GHL_LOCATION_ID,
      firstName,
      lastName,
      phone,
      email,
      tags,
      ...(city ? { city } : {}),
      ...(postalCode ? { postalCode } : {}),
      ...(source ? { source } : {}),
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`GHL upsert ${res.status}: ${JSON.stringify(data).slice(0, 200)}`);
  return data.contact || data;
}

export async function createContactNote(contactId: string, body: string) {
  const res = await fetch(`${BASE}/contacts/${contactId}/notes`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ body }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`GHL note ${res.status}: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return res.json();
}
