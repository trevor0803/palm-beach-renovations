"use client";
import { useState } from "react";
import { site } from "@/lib/site";

export default function ContactForm({ serviceOptions }: { serviceOptions: string[] }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    // No backend yet: open the user's mail client with a prefilled message.
    // Swap this for a real form endpoint (Formspree, Resend, or an API route) later.
    const body = [
      `Name: ${f.get("firstName")} ${f.get("lastName")}`,
      `Phone: ${f.get("phone")}`,
      `Email: ${f.get("email")}`,
      `City: ${f.get("city")} ${f.get("zip")}`,
      `Interested in: ${f.get("interest")}`,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "Website Estimate Request"
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
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
      <p className="consent">
        By providing my phone number and email, I agree to receive messages from {site.name} in
        response to my inquiry.
      </p>
      <button className="btn" type="submit">Submit</button>
      {sent && <p className="form-note">Opening your email app to send the request…</p>}
    </form>
  );
}
