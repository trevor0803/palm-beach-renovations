"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import { trackLead, newEventId } from "@/lib/track";
import { CALL_TIMES, type Lander } from "@/lib/landers";

type Answers = Record<string, string>;

function track(name: string, params: Record<string, unknown>) {
  try {
    window.gtag?.("event", name, params);
  } catch {}
}

function metaCookies() {
  const get = (key: string) => (document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)")) || [])[2];
  let fbc = get("_fbc");
  if (!fbc) {
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  return { fbp: get("_fbp") || "", fbc: fbc || "" };
}

export function OwnerFaces({ size = 44 }: { size?: number }) {
  return (
    <span className="ld-faces" aria-hidden="true">
      {site.owners.map((o) => (
        <Image key={o.name} src={o.photo} alt="" width={size} height={size} style={{ width: size, height: size }} />
      ))}
    </span>
  );
}

export default function LanderSurvey({ lander }: { lander: Lander }) {
  const qs = lander.questions;
  const total = qs.length + 1;
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [callTime, setCallTime] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [first, setFirst] = useState("");
  const [err, setErr] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    if (!moved.current) return;
    headRef.current?.focus({ preventScroll: true });
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) cardRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [i, state]);

  function choose(qid: string, optId: string) {
    setAnswers((a) => ({ ...a, [qid]: optId }));
    moved.current = true;
    if (timer.current) clearTimeout(timer.current);
    track("lander_step", { lander: lander.slug, step: i + 1, step_id: qid });
    timer.current = setTimeout(() => setI((n) => Math.min(n + 1, qs.length)), 260);
  }

  const labelOf = (qid: string) => {
    const q = qs.find((x) => x.id === qid);
    return q?.opts.find((o) => o.id === answers[qid])?.label || "-";
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErr("");
    const f = new FormData(e.currentTarget);
    const eventId = newEventId();
    const fullName = String(f.get("name") || "").trim().replace(/\s+/g, " ");
    const [firstName, ...rest] = fullName.split(" ");
    const when = CALL_TIMES.find((t) => t.id === callTime);
    const message = [
      `AD LANDER SURVEY (${lander.service})`,
      ...qs.map((q) => `${q.label}: ${labelOf(q.id)}`),
      when ? `Best time to call: ${when.label}` : "",
    ].filter(Boolean).join("\n");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(" "),
          phone: f.get("phone"),
          email: f.get("email"),
          zip: f.get("zip"),
          projectType: lander.projectType,
          message,
          source: `website-lander-${lander.slug}`,
          tag: `lander-${lander.slug}`,
          company: f.get("hp_check") || "",
          eventId,
          ...metaCookies(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please call us instead.");
      trackLead(eventId, `website-lander-${lander.slug}`, lander.projectType);
      moved.current = true;
      setFirst(firstName);
      setState("done");
    } catch (error) {
      setErr((error as Error).message);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="ld-card ld-done" id="start" ref={cardRef} role="status">
        <OwnerFaces size={64} />
        <h2 ref={headRef} tabIndex={-1}>Thank you{first ? `, ${first}` : ""}. Your request is in.</h2>
        <p>Michael, Adam or Tom will call you to learn a little more about your project. Then we&apos;ll set a specific time to come see it.</p>
        <p className="ld-done-call">Need us sooner? Call <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.</p>
      </div>
    );
  }

  const isContact = i >= qs.length;
  const q = qs[i];

  return (
    <div className="ld-card" id="start" ref={cardRef}>
      <div className="ld-who">
        <OwnerFaces />
        <p><strong>Michael, Adam or Tom</strong> will call you</p>
      </div>
      <div className="ld-progress" role="progressbar" aria-label="Progress" aria-valuemin={1} aria-valuemax={total} aria-valuenow={i + 1}>
        <span style={{ width: `${((i + 1) / total) * 100}%` }} />
      </div>
      <p className="ld-count">Step {i + 1} of {total}</p>

      {!isContact && q && (
        <div key={q.id} className="ld-step">
          <h2 ref={headRef} tabIndex={-1}>{q.q}</h2>
          <div className="ld-opts" role="group" aria-label={q.q}>
            {q.opts.map((o) => (
              <button key={o.id} type="button" className={`ld-opt${answers[q.id] === o.id ? " is-on" : ""}`} aria-pressed={answers[q.id] === o.id} onClick={() => choose(q.id, o.id)}>
                <span className="ld-opt-text"><strong>{o.label}</strong>{o.sub && <small>{o.sub}</small>}</span>
                <span className="ld-dot" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}

      {isContact && (
        <form key="contact" className="ld-step ld-form" onSubmit={submit}>
          <h2 ref={headRef} tabIndex={-1}>Where should we call you?</h2>
          <label><span>Name</span><input name="name" autoComplete="name" required /></label>
          <div className="ld-two">
            <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
            <label><span>ZIP code</span><input name="zip" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} required /></label>
          </div>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
          <div className="ld-times" role="group" aria-label="Best time for the call (optional)">
            <span>Best time for the call <em>(optional)</em></span>
            <div>
              {CALL_TIMES.map((t) => (
                <button key={t.id} type="button" className={`ld-time${callTime === t.id ? " is-on" : ""}`} aria-pressed={callTime === t.id} onClick={() => setCallTime(callTime === t.id ? "" : t.id)}>{t.label}</button>
              ))}
            </div>
          </div>
          <input name="hp_check" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
          <button className="ld-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Request my call"}</button>
          {err && <p className="ld-error" role="alert">{err}</p>}
          <p className="ld-consent">By submitting, you agree to receive calls and texts from {site.name} about your request. Message frequency varies. Reply STOP to opt out.</p>
        </form>
      )}

      {i > 0 && (
        <button type="button" className="ld-back" onClick={() => { moved.current = true; setI(i - 1); }}>Back</button>
      )}
    </div>
  );
}
