// Browser-side lead tracking. The server (/api/lead) already sends the Meta Conversions API
// "Lead" event with the same eventId, so firing the browser pixel with that id lets Meta
// deduplicate the pair. GA4 gets a generate_lead key event so form fills show up in reports.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackLead(eventId: string, source: string, service?: string) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "generate_lead", {
      lead_source: source,
      service: service || undefined,
      page_path: window.location.pathname,
    });
  } catch {}
  try {
    window.fbq?.("track", "Lead", {}, { eventID: eventId });
  } catch {}
}

export function newEventId() {
  return globalThis.crypto?.randomUUID?.() || String(Date.now());
}
