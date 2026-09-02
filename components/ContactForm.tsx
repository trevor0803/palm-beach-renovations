"use client";
import { useState } from "react";
import { site } from "@/lib/site";

export default function ContactForm({ serviceOptions }: { serviceOptions: string[] }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");
  const note = err || (state === "done" ? "Thanks! We have your request and will reach out shortly." : "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErr("");
    const f = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: f.get("firstName"),
          lastName: f.get("lastName"),
          phone: f.get("phone"),
          email: f.get("email"),
          city: f.get("city"),
          zip: f.get("zip"),
          projectType: f.get("interest"),
          message: "Submitted from the website contact form.",
          source: "website-contact",
          tag: "contact-form",
          company: f.get("hp_check") || "",
          eventId: crypto.randomUUID?.() || String(Date.now()),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setState("done");
    } catch (error) {
      setErr((error as Error).message);
      setState("idle");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="row">
        <label>First Name *<input name="firstName" required /></label>
        <label>Last Name<input name="lastName" /></label>
      </div>
      <div className="row">
        <label>Phone *<input name="phone" type="tel" required /></label>
        <label>Email *<input name="email" type="email" required /></label>
      </div>
      <div className="row">
        <label>City *<input name="city" required /></label>
        <label>Postal Code<input name="zip" /></label>
      </div>
      <label>Interested In *
        <select name="interest" required defaultValue="">
          <option value="" disabled>Select a service</option>
          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          <option value="Other">Other</option>
        </select>
      </label>
      <input name="hp_check" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <p className="consent">
                By submitting, you agree to receive calls and texts from {site.name} about your request. Message frequency varies. Reply STOP to opt out.
      </p>
      <button className="btn" type="submit" disabled={state === "sending"}>Submit</button>
      {note && <p className="form-note">{note}</p>}
    </form>
  );
}
