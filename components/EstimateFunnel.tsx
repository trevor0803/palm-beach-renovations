"use client";
import { useState } from "react";
import { site } from "@/lib/site";

const PROJECT_TYPES = [
  ["Kitchen", "Kitchen Remodeling"],
  ["Bathroom", "Bathroom Remodeling"],
  ["Whole Home", "Whole-Home Remodel"],
  ["Cabinets", "Custom Cabinetry"],
  ["Flooring", "Tile & Flooring"],
  ["Other", "Other"],
] as const;

const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just researching"];

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

function metaCookies() {
  if (typeof document === "undefined") return {};
  const get = (key: string) => (document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)")) || [])[2];
  let fbc = get("_fbc");
  if (!fbc) {
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  return { fbp: get("_fbp") || "", fbc: fbc || "" };
}

export default function EstimateFunnel() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState("");
  const [timeline, setTimeline] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", zip: "" });
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErr("");
    try {
      const eventId = crypto.randomUUID?.() || String(Date.now());
      const fd = new FormData(event.currentTarget);
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          projectType,
          message: `Desired timeline: ${timeline}`,
          source: "meta-funnel",
          tag: "free-estimate",
          company: fd.get("company") || "",
          eventId,
          ...metaCookies(),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      window.fbq?.("track", "Lead", {}, { eventID: eventId });
      setState("done");
    } catch (error) {
      setErr((error as Error).message);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="lp-card lp-success" id="estimate" role="status">
        <div className="lp-check">✓</div>
        <p className="lp-step-label">REQUEST RECEIVED</p>
        <h2>Thanks{form.firstName ? `, ${form.firstName}` : ""}!</h2>
        <p>One of our team members will reach out shortly to learn more and schedule your free estimate.</p>
        <a className="lp-btn lp-full" href={`tel:${site.phone}`} onClick={() => window.fbq?.("track", "Contact")}>
          Call Us Now: {site.phoneDisplay}
        </a>
      </div>
    );
  }

  const progress = ((step + 1) / 3) * 100;
  return (
    <div className="lp-card" id="estimate">
      <div className="lp-card-head">
        <div>
          <p className="lp-step-label">FREE ESTIMATE · STEP {step + 1} OF 3</p>
          <h2>{step === 0 ? "What would you like to renovate?" : step === 1 ? "When would you like to begin?" : "Where should we reach you?"}</h2>
        </div>
        <span className="lp-step-count">{step + 1}/3</span>
      </div>
      <div className="lp-progress" aria-hidden="true"><div style={{ width: `${progress}%` }} /></div>

      {step === 0 && (
        <div className="lp-options lp-project-options">
          {PROJECT_TYPES.map(([label, value]) => (
            <button key={value} type="button" onClick={() => { setProjectType(value); setStep(1); }}>
              <span>{label}</span><b aria-hidden="true">›</b>
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <>
          <div className="lp-options">
            {TIMELINES.map((value) => (
              <button key={value} type="button" onClick={() => { setTimeline(value); setStep(2); }}>
                <span>{value}</span><b aria-hidden="true">›</b>
              </button>
            ))}
          </div>
          <button type="button" className="lp-back" onClick={() => setStep(0)}>← Back</button>
        </>
      )}

      {step === 2 && (
        <form onSubmit={submit}>
          <p className="lp-form-intro">We&apos;ll contact you to discuss your project—no pressure and no obligation.</p>
          <div className="lp-row">
            <label>First name<input name="firstName" autoComplete="given-name" required value={form.firstName} onChange={update("firstName")} /></label>
            <label>Last name<input name="lastName" autoComplete="family-name" value={form.lastName} onChange={update("lastName")} /></label>
          </div>
          <label>Phone number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={form.phone} onChange={update("phone")} /></label>
          <label>Email address<input name="email" type="email" inputMode="email" autoComplete="email" required value={form.email} onChange={update("email")} /></label>
          <label>Project ZIP code<input name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" required value={form.zip} onChange={update("zip")} /></label>
          <input name="company" tabIndex={-1} autoComplete="off" className="lp-hp" aria-hidden="true" />
          <p className="lp-consent">By submitting, you agree to receive calls and texts from {site.name} about your request. Message frequency varies. Reply STOP to opt out.</p>
          {err && <p className="lp-error" role="alert">{err}</p>}
          <button className="lp-btn lp-full" type="submit" disabled={state === "sending"}>
            {state === "sending" ? "Sending Your Request…" : "Request My Free Estimate"}
          </button>
          <p className="lp-safe"><span aria-hidden="true">🔒</span> Your information is private and secure.</p>
          <button type="button" className="lp-back" onClick={() => setStep(1)}>← Back</button>
        </form>
      )}
    </div>
  );
}
