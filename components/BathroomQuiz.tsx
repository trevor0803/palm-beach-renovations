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

const look: Record<string, { accent: string; icon: string }> = {
  shower: { accent: "#0e7490", icon: "M4 4h9a4 4 0 0 1 4 4v1M13 9h8l-1.5 3h-5zM8 15v1m4-1v1m4-1v1m-9 3v1m4-1v1m4-1v1" },
  tub: { accent: "#6d28d9", icon: "M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2m11-2 1 2" },
  vanity: { accent: "#b45309", icon: "M3 11h18v9H3zM12 11V6a3 3 0 0 1 3-3M8 15h8" },
  tile: { accent: "#be185d", icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  finish: { accent: "#a16207", icon: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z" },
  glass: { accent: "#0369a1", icon: "M5 3h14v18H5zM9 7l4-3M9 12l7-6M9 17l8-8" },
  toilet: { accent: "#047857", icon: "M6 3h8v7H6zM4 10h16a0 0 0 0 1 0 0 8 8 0 0 1-8 8 8 8 0 0 1-8-8zM9 18l-1 3m7-3 1 3" },
  lighting: { accent: "#c2410c", icon: "M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.500c.700.700 1 1.500 1 2.500h6c0-1 .300-1.800 1-2.500A6 6 0 0 0 12 3z" },
  extras: { accent: "#4338ca", icon: "M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800zM19 16l.800 2.200L22 19l-2.200.800L19 22l-.800-2.200L16 19l2.200-.800z" },
};
type Accent = React.CSSProperties & { "--accent"?: string };
const accentOf = (id: string): Accent => ({ "--accent": look[id]?.accent || "#1e3a8a" });

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
      <div className="bq-top">
      <div className="bq-chapter">
        <span className="bq-num">01</span>
        <div>
          <h2 className="bq-q">Choose what&apos;s on your wish list</h2>
          <p className="bq-hint">Check everything you&apos;re interested in. Each one opens a few quick choices.</p>
        </div>
      </div>

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
              style={accentOf(s.id)}
              onClick={() => toggleSection(s.id)}
            >
              <span className="bq-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={look[s.id]?.icon} /></svg>
              </span>
              <span className="bq-item-text">
                <strong>{s.title}</strong>
                <small>{on && answered ? "Choice saved" : s.blurb}</small>
              </span>
              <span className="bq-box" aria-hidden="true">{on ? "✓" : ""}</span>
            </button>
          );
        })}
      </div>
      </div>

      {chosenSections.map((s) => (
        <section key={s.id} id={`bq-sec-${s.id}`} className="bq-panel" style={accentOf(s.id)} aria-labelledby={`bq-h-${s.id}`}>
          <div className="bq-panel-head">
            <span className="bq-panel-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={look[s.id]?.icon} /></svg>
            </span>
            <h3 id={`bq-h-${s.id}`}><small>{s.title}</small>{s.q}</h3>
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
        <div className="bq-chapter">
          <span className="bq-num">02</span>
          <h3>A few quick details</h3>
        </div>
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
        <p className="bq-kicker">Step 03</p>
        <h3>Where should we send your plan?</h3>
        <p className="bq-hint">We&apos;ll follow up to schedule your free estimate.</p>
        <label><span>Name</span><input name="name" autoComplete="name" required /></label>
        <div className="qe-row">
          <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" required /></label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
        </div>
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
