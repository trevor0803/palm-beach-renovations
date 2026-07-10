"use client";
// Lead-capture funnel for paid (Meta) traffic — /go.
// Fires browser Lead with eventID; /api/lead sends the matching CAPI event (deduped).
import { useState } from "react";
import { site } from "@/lib/site";

const PROJECT_TYPES = [
  "Kitchen Remodeling",
  "Bathroom Remodeling",
  "Custom Cabinetry",
  "Tile & Flooring",
  "Home Addition",
  "Other",
];

const TIMELINES = ["As soon as possible", "1–3 months", "3–6 months", "Just planning"];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Meta match signals: _fbp cookie + _fbc (from the fbclid on the ad click)
function metaCookies() {
  if (typeof document === "undefined") return {};
  const get = (k: string) => (document.cookie.match(new RegExp("(^| )" + k + "=([^;]+)")) || [])[2];
  let fbc = get("_fbc");
  if (!fbc) {
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  return { fbp: get("_fbp") || "", fbc: fbc || "" };
}

export default function EstimateFunnel() {
  const [step, setStep] = useState(0); // 0: project, 1: timeline, 2: contact form
  const [projectType, setProjectType] = useState("");
  const [timeline, setTimeline] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", city: "", zip: "" });
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const trackCall = () => {
    if (typeof window !== "undefined" && window.fbq) window.fbq("track", "Contact");
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErr("");
    try {
      const eventId =
        (typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID()) || String(Date.now());
      const fd = new FormData(e.currentTarget);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          projectType,
          message: `Timeline: ${timeline}`,
          source: "meta-funnel",
          tag: "free-estimate",
          company: fd.get("company") || "", // honeypot
          eventId,
          ...metaCookies(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong — please try again");
      if (typeof window !== "undefined" && window.fbq)
        window.fbq("track", "Lead", {}, { eventID: eventId });
      setState("done");
    } catch (e) {
      setErr((e as Error).message);
      setState("idle");
    }
  }

  const progress = ((step + 1) / 3) * 100;

  if (state === "done") {
    return (
      <div className="lp-card lp-center">
        <div className="lp-check">✓</div>
        <h2>You&apos;re all set!</h2>
        <p>
          Thanks{form.firstName ? `, ${form.firstName}` : ""} — we got your request. One of our owners
          will reach out shortly to schedule your free estimate.
        </p>
        <p className="lp-muted">Want to talk now?</p>
        <a className="lp-btn" href={`tel:${site.phone}`} onClick={trackCall}>
          Call {site.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <div className="lp-card" id="estimate">
      <div className="lp-progress">
        <div style={{ width: `${progress}%` }} />
      </div>

      {step === 0 && (
        <>
          <h2>What are you looking to renovate?</h2>
          <div className="lp-options">
            {PROJECT_TYPES.map((p) => (
              <button
                key={p}
                type="button"
                className={projectType === p ? "sel" : ""}
                onClick={() => {
                  setProjectType(p);
                  setStep(1);
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2>When do you want to start?</h2>
          <div className="lp-options">
            {TIMELINES.map((t) => (
              <button
                key={t}
                type="button"
                className={timeline === t ? "sel" : ""}
                onClick={() => {
                  setTimeline(t);
                  setStep(2);
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <button type="button" className="lp-back" onClick={() => setStep(0)}>
            ← Back
          </button>
        </>
      )}

      {step === 2 && (
        <form onSubmit={submit}>
          <h2>Where should we send your free estimate?</h2>
          <div className="lp-row">
            <input placeholder="First name *" required value={form.firstName} onChange={set("firstName")} />
            <input placeholder="Last name" value={form.lastName} onChange={set("lastName")} />
          </div>
          <div className="lp-row">
            <input placeholder="Phone *" type="tel" required value={form.phone} onChange={set("phone")} />
            <input placeholder="Email *" type="email" required value={form.email} onChange={set("email")} />
          </div>
          <div className="lp-row">
            <input placeholder="City *" required value={form.city} onChange={set("city")} />
            <input placeholder="Zip" value={form.zip} onChange={set("zip")} />
          </div>
          {/* Honeypot — hidden from real users */}
          <input name="company" tabIndex={-1} autoComplete="off" className="lp-hp" aria-hidden="true" />
          <p className="lp-consent">
            By submitting, I agree to receive calls/texts from {site.name} about my estimate. No spam,
            opt out anytime.
          </p>
          {err && <p className="lp-error">{err}</p>}
          <button className="lp-btn lp-full" type="submit" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Get My Free Estimate →"}
          </button>
          <button type="button" className="lp-back" onClick={() => setStep(1)}>
            ← Back
          </button>
        </form>
      )}
    </div>
  );
}
