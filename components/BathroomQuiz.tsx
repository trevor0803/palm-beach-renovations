"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import { trackLead, newEventId } from "@/lib/track";
import { sections, basics, type Opt, type Section } from "@/lib/bathroomQuiz";
import TileSwatch from "@/components/TileSwatch";

type Answers = Record<string, string[]>;

function track(name: string, params: Record<string, unknown>) {
  try {
    window.gtag?.("event", name, params);
  } catch {}
}

const hasMedia = (s: Section, o: Opt) => (s.layout === "photo" && !!o.img) || (s.layout === "swatch" && !!o.swatch) || (s.layout === "color" && !!o.color);

function Card({ opt, layout, selected, onPick }: { opt: Opt; layout: Section["layout"]; selected: boolean; onPick: () => void }) {
  return (
    <button type="button" className={`bq-card bq-${layout}${selected ? " is-selected" : ""}`} aria-pressed={selected} onClick={onPick}>
      {layout === "photo" && opt.img && (
        <span className="bq-media">
          <Image src={opt.img} alt={opt.alt || opt.label} width={420} height={315} sizes="(max-width: 640px) 46vw, 220px" />
        </span>
      )}
      {layout === "swatch" && opt.swatch && <span className="bq-media"><TileSwatch kind={opt.swatch} /></span>}
      {layout === "color" && <span className="bq-chip" style={{ background: opt.color }} aria-hidden="true" />}
      <span className="bq-label">
        <strong>{opt.label}</strong>
        {opt.sub && <small>{opt.sub}</small>}
      </span>
      <span className="bq-check" aria-hidden="true">✓</span>
    </button>
  );
}

function Pill({ label, selected, onPick }: { label: string; selected: boolean; onPick: () => void }) {
  return (
    <button type="button" className={`bq-pill${selected ? " is-selected" : ""}`} aria-pressed={selected} onClick={onPick}>
      {selected && <span aria-hidden="true">✓ </span>}
      {label}
    </button>
  );
}

export default function BathroomQuiz() {
  const [open, setOpen] = useState<string[]>([]); // ticked checklist boxes, in tick order
  const [answers, setAnswers] = useState<Answers>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");
  const lastOpened = useRef<string | null>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!lastOpened.current) return;
    const el = document.getElementById(`bq-sec-${lastOpened.current}`);
    lastOpened.current = null;
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [open]);

  useEffect(() => {
    if (state === "done") {
      doneRef.current?.focus({ preventScroll: true });
      doneRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [state]);

  function toggleSection(id: string) {
    setOpen((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      lastOpened.current = id;
      track("bathroom_quiz_open", { section: id });
      return [...cur, id];
    });
  }

  function pick(id: string, optId: string, multi?: boolean) {
    setAnswers((a) => {
      const cur = a[id] || [];
      if (!multi) return { ...a, [id]: cur.includes(optId) ? [] : [optId] };
      if (optId === "not-sure") return { ...a, [id]: cur.includes(optId) ? [] : [optId] };
      const next = cur.includes(optId) ? cur.filter((x) => x !== optId) : [...cur.filter((x) => x !== "not-sure"), optId];
      return { ...a, [id]: next };
    });
  }

  const chosenSections = sections.filter((s) => open.includes(s.id));
  const labelsFor = (id: string, opts: { id: string; label: string }[]) => {
    const sel = answers[id] || [];
    return opts.filter((o) => sel.includes(o.id)).map((o) => o.label);
  };

  function summaryRows() {
    const rows: { k: string; v: string }[] = [];
    for (const s of chosenSections) rows.push({ k: s.title, v: labelsFor(s.id, s.opts).join(", ") || "Wants this, no pick yet" });
    for (const b of basics) {
      const v = labelsFor(b.id, b.opts).join(", ");
      if (v) rows.push({ k: b.q.replace(/\?$/, ""), v });
    }
    return rows;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErr("");
    const f = new FormData(e.currentTarget);
    const eventId = newEventId();
    const fullName = String(f.get("name") || "").trim().replace(/\s+/g, " ");
    const [firstName, ...rest] = fullName.split(" ");
    const rows = summaryRows();
    const message = `Bathroom wish list\n${rows.length ? rows.map((r) => `${r.k}: ${r.v}`).join("\n") : "(nothing selected)"}`;
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
          projectType: "Bathroom Remodeling",
          message,
          source: "website-bathroom-quiz",
          tag: "bathroom-quiz",
          company: f.get("hp_check") || "",
          eventId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please call us instead.");
      trackLead(eventId, "website-bathroom-quiz", "Bathroom Remodeling");
      setState("done");
    } catch (error) {
      setErr((error as Error).message);
      setState("idle");
    }
  }

  if (state === "done") {
    const rows = summaryRows();
    return (
      <div className="bq bq-done" role="status">
        <h2 ref={doneRef} tabIndex={-1}>Thank you! Your bathroom plan is in.</h2>
        <p>We&apos;ll review your picks and reach out shortly to set up your free estimate. Need us sooner? Call <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.</p>
        {rows.length > 0 && (
          <ul className="bq-summary">
            {rows.map((r) => (<li key={r.k}><span>{r.k}</span><strong>{r.v}</strong></li>))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="bq">
      <h2 className="bq-q">What do you want in your new bathroom?</h2>
      <p className="bq-hint">Check everything you&apos;re interested in. Each box you check opens a few quick choices.</p>

      <div className="bq-checklist" role="group" aria-label="Bathroom items">
        {sections.map((s) => {
          const on = open.includes(s.id);
          const answered = (answers[s.id] || []).length > 0;
          return (
            <button
              key={s.id}
              type="button"
              className={`bq-item${on ? " is-on" : ""}`}
              aria-pressed={on}
              aria-expanded={on}
              aria-controls={`bq-sec-${s.id}`}
              onClick={() => toggleSection(s.id)}
            >
              <span className="bq-box" aria-hidden="true">{on ? "✓" : ""}</span>
              <span className="bq-item-text">
                <strong>{s.title}</strong>
                <small>{on && answered ? "Choice saved" : s.blurb}</small>
              </span>
            </button>
          );
        })}
      </div>

      {chosenSections.map((s) => (
        <section key={s.id} id={`bq-sec-${s.id}`} className="bq-panel" aria-labelledby={`bq-h-${s.id}`}>
          <div className="bq-panel-head">
            <h3 id={`bq-h-${s.id}`}>{s.q}</h3>
            <button type="button" className="bq-remove" onClick={() => toggleSection(s.id)} aria-label={`Remove ${s.title}`}>Remove</button>
          </div>
          {s.hint && <p className="bq-hint">{s.hint}</p>}
          {s.layout !== "text" && s.opts.some((o) => hasMedia(s, o)) && (
            <div className={`bq-grid bq-grid-${s.layout}`}>
              {s.opts.filter((o) => hasMedia(s, o)).map((o) => (
                <Card key={o.id} opt={o} layout={s.layout} selected={(answers[s.id] || []).includes(o.id)} onPick={() => pick(s.id, o.id, s.multi)} />
              ))}
            </div>
          )}
          <div className="bq-pills" role="group" aria-label={s.q}>
            {s.opts.filter((o) => s.layout === "text" || !hasMedia(s, o)).map((o) => (
              <Pill key={o.id} label={o.sub && s.layout === "text" ? `${o.label} · ${o.sub}` : o.label} selected={(answers[s.id] || []).includes(o.id)} onPick={() => pick(s.id, o.id, s.multi)} />
            ))}
          </div>
        </section>
      ))}

      {open.length === 0 && <p className="bq-empty">Nothing checked yet. Tap any box above to start, or skip straight to the quick questions below.</p>}

      <div className="bq-basics">
        <h3>A few quick details</h3>
        {basics.map((b) => (
          <div key={b.id} className="bq-basic">
            <p className="bq-basic-q">{b.q}</p>
            <div className="bq-pills" role="group" aria-label={b.q}>
              {b.opts.map((o) => (
                <Pill key={o.id} label={o.label} selected={(answers[b.id] || []).includes(o.id)} onPick={() => pick(b.id, o.id)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <form className="bq-contact" onSubmit={submit}>
        <h3>Where should we send your plan?</h3>
        <p className="bq-hint">We&apos;ll follow up to schedule your free estimate.</p>
        <label><span>Name</span><input name="name" autoComplete="name" required /></label>
        <div className="qe-row">
          <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" required /></label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
        </div>
        <label><span>Zip code</span><input name="zip" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" placeholder="33411" required /></label>
        <input name="hp_check" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
        <button className="btn qe-submit" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Get my free estimate"}
        </button>
        {err && <p className="qe-error" role="alert">{err}</p>}
        <p className="qe-consent">
          By submitting, you agree to receive calls and texts from {site.name} about your request. Message frequency varies. Reply STOP to opt out.
        </p>
      </form>
    </div>
  );
}
