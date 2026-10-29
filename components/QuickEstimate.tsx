"use client";
import { useState } from "react";
import { site } from "@/lib/site";
import { trackLead, newEventId } from "@/lib/track";

const OPTIONS = [
  "Kitchen Remodeling",
  "Bathroom Remodeling",
  "Custom Cabinetry",
  "Tile & Flooring",
  "Home Addition or Remodel",
  "Other",
];

// Short, above-the-fold estimate form. Posts to the same /api/lead route as the contact page,
// so contacts land in GHL with the website-lead tag plus this form's own tags.
export default function QuickEstimate({
  source = "website-hero",
  tag = "hero-form",
  heading = "Get your free estimate",
  sub = "Tell us about your project. We reply the same business day.",
  defaultService = "",
}: {
  source?: string;
  tag?: string;
  heading?: string;
  sub?: string;
  defaultService?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErr("");
    const f = new FormData(e.currentTarget);
    const eventId = newEventId();
    // One "Name" field; GHL gets it split into first and last.
    const fullName = String(f.get("name") || "").trim().replace(/\s+/g, " ");
    const [firstName, ...rest] = fullName.split(" ");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(" "),
          zip: f.get("zip"),
          phone: f.get("phone"),
          email: f.get("email"),
          projectType: f.get("interest"),
          message: `Submitted from the ${source} form on ${window.location.pathname}.`,
          source,
          tag,
          company: f.get("hp_check") || "",
          eventId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please call us instead.");
      trackLead(eventId, source, String(f.get("interest") || ""));
      setState("done");
    } catch (error) {
      setErr((error as Error).message);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="qe-card qe-done" role="status">
        <h2>Thank you!</h2>
        <p>We have your request and will reach out shortly. Need us sooner? Call <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.</p>
      </div>
    );
  }

  return (
    <form className="qe-card" onSubmit={onSubmit}>
      <h2>{heading}</h2>
      <p className="qe-sub">{sub}</p>
      <label>
        <span>Name</span>
        <input name="name" autoComplete="name" required />
      </label>
      <div className="qe-row">
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        <span>Zip code</span>
        <input name="zip" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" placeholder="33411" required />
      </label>
      <label>
        <span>What are you planning?</span>
        <select name="interest" required defaultValue={defaultService}>
          <option value="" disabled>Select a service</option>
          {OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <input name="hp_check" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <button className="btn qe-submit" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Request my free estimate"}
      </button>
      {err && <p className="qe-error" role="alert">{err}</p>}
      <p className="qe-consent">
        By submitting, you agree to receive calls and texts from {site.name} about your request. Message frequency varies. Reply STOP to opt out.
      </p>
    </form>
  );
}
