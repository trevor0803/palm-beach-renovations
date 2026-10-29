"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import { trackLead, newEventId } from "@/lib/track";
import { sections, basics, EXCLUSIVE, type Group, type Opt } from "@/lib/bathroomQuiz";
import TileSwatch from "@/components/TileSwatch";

type Answers = Record<string, string[]>;

function track(name: string, params: Record<string, unknown>) {
  try {
    window.gtag?.("event", name, params);
  } catch {}
}

const look: Record<string, { accent: string; icon: string }> = {
  shower: { accent: "#0e7490", icon: "M4 4h9a4 4 0 0 1 4 4v1M13 9h8l-1.5 3h-5zM8 15v1m4-1v1m4-1v1m-9 3v1m4-1v1m4-1v1" },
  tub: { accent: "#6d28d9", icon: "M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2m11-2 1 2" },
  vanity: { accent: "#b45309", icon: "M3 11h18v9H3zM12 11V6a3 3 0 0 1 3-3M8 15h8" },
  tile: { accent: "#be185d", icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  paint: { accent: "#0f766e", icon: "M5 3h12v6H5zM17 6h3v6h-8v3M10.5 15h3v6h-3z" },
  toilet: { accent: "#047857", icon: "M6 3h8v7H6zM4 10h16a8 8 0 0 1-8 8 8 8 0 0 1-8-8zM9 18l-1 3m7-3 1 3" },
  extras: { accent: "#4338ca", icon: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" },
  details: { accent: "#1e3a8a", icon: "M5 4h14v16H5zM9 9h6M9 13h6M9 17h3" },
};
const KEEP_ICON = "M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4";
const SKIP_ICON = "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM6 6l12 12";

type Accent = React.CSSProperties & { "--accent"?: string };
const accentOf = (id: string): Accent => ({ "--accent": look[id]?.accent || "#1e3a8a" });

function Icon({ d, size = 24, sw = 1.8 }: { d: string; size?: number; sw?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Card({ opt, layout, selected, onPick, icon }: { opt: Opt; layout: Group["layout"]; selected: boolean; onPick: () => void; icon: string }) {
  const noMedia = (layout === "photo" && !opt.img) || (layout === "swatch" && !opt.swatch);
  const glyph = opt.id === "keep" ? KEEP_ICON : opt.id === "skip" ? SKIP_ICON : icon;
  const unsure = opt.id === "not-sure";
  return (
    <button type="button" className={`bq-card bq-${layout}${selected ? " is-selected" : ""}`} aria-pressed={selected} onClick={onPick}>
      {layout === "photo" && opt.img && (
        <span className="bq-media">
          <Image src={opt.img} alt={opt.alt || opt.label} width={420} height={315} sizes="(max-width: 640px) 46vw, 220px" />
        </span>
      )}
      {layout === "swatch" && opt.swatch && <span className="bq-media"><TileSwatch kind={opt.swatch} /></span>}
      {noMedia && (
        <span className="bq-media bq-ph" aria-hidden="true">
          {unsure ? <b>?</b> : <Icon d={glyph} size={56} sw={1.2} />}
        </span>
      )}
      {layout === "color" && (
        <span className={`bq-chip${opt.color ? "" : " bq-chip-q"}`} style={opt.color ? { background: opt.color } : undefined} aria-hidden="true">
          {!opt.color && (unsure ? "?" : <Icon d={opt.id === "keep" ? KEEP_ICON : SKIP_ICON} size={30} sw={1.6} />)}
        </span>
      )}
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
  const total = sections.length + 2; // sections + quick details + contact
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");
  const topRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  // Scroll to the top of the card only after Next or Back, never on first load or on taps.
  useEffect(() => {
    if (!moved.current) return;
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [i, state]);

  const isSection = i < sections.length;
  const isDetails = i === sections.length;
  const section = isSection ? sections[i] : null;
  const stepKey = section ? section.id : isDetails ? "details" : "contact";
  const accent = accentOf(section ? section.id : "details");

  function pick(group: Group, optId: string) {
    setAnswers((a) => {
      const cur = a[group.id] || [];
      if (!group.multi) return { ...a, [group.id]: [optId] };
      if (EXCLUSIVE.includes(optId)) return { ...a, [group.id]: cur.includes(optId) ? [] : [optId] };
      const next = cur.includes(optId) ? cur.filter((x) => x !== optId) : [...cur.filter((x) => !EXCLUSIVE.includes(x)), optId];
      return { ...a, [group.id]: next };
    });
  }

  const answered = (id: string) => (answers[id] || []).length > 0;
  const hidden = (gr: Group) => !!gr.hideWhen && (answers[gr.hideWhen.group] || []).some((x) => gr.hideWhen!.ids.includes(x));
  const questionOf = (gr: Group) => (gr.askWhen && (answers[gr.askWhen.group] || []).includes(gr.askWhen.id) ? gr.askWhen.q : gr.q);
  const visibleGroups = section ? section.groups.filter((gr) => !hidden(gr)) : [];
  const stepDone = section ? visibleGroups.every((gr) => answered(gr.id)) : isDetails ? basics.every((b) => answered(b.id)) : true;

  function go(next: number) {
    moved.current = true;
    if (next > i) track("bathroom_quiz_step", { step: i + 1, step_id: stepKey });
    setI(next);
  }

  const labelsFor = (id: string, opts: { id: string; label: string }[]) => {
    const sel = answers[id] || [];
    return opts.filter((o) => sel.includes(o.id)).map((o) => o.label);
  };

  function summaryRows() {
    const rows: { k: string; v: string }[] = [];
    for (const s of sections) {
      const parts = s.groups.map((gr) => `${gr.label}: ${hidden(gr) ? "Not applicable" : labelsFor(gr.id, gr.opts).join(", ") || "-"}`);
      const note = (notes[s.id] || "").trim().replace(/\s+/g, " ");
      rows.push({ k: s.title, v: parts.join("; ") + (note ? ` (Note: ${note})` : "") });
    }
    for (const b of basics) rows.push({ k: b.label, v: labelsFor(b.id, b.opts).join(", ") || "-" });
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
    const message = `Bathroom estimate\n${summaryRows().map((r) => `${r.k}: ${r.v}`).join("\n")}`;
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
      moved.current = true;
      setState("done");
    } catch (error) {
      setErr((error as Error).message);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="bq" ref={topRef}>
        <div className="bq-done" role="status">
          <h2>Thank you! Your bathroom plan is in.</h2>
          <p>We&apos;ll review your picks and reach out shortly to set up your free estimate. Need us sooner? Call <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.</p>
          <ul className="bq-summary">
            {summaryRows().map((r) => (<li key={r.k}><span>{r.k}</span><strong>{r.v}</strong></li>))}
          </ul>
        </div>
      </div>
    );
  }

  const stepTitle = section ? section.title : isDetails ? "Quick details" : "Your estimate";

  return (
    <div className="bq" ref={topRef}>
      <div className="bq-meta">
        <div className="bq-progress" aria-hidden="true"><span style={{ width: `${Math.round(((i + 1) / total) * 100)}%` }} /></div>
        <p className="bq-count">Step {i + 1} of {total} <span>· {stepTitle}</span></p>
      </div>

      {section && (
        <section className="bq-panel" style={accent} aria-label={section.title} key={section.id}>
          <div className="bq-panel-head">
            <span className="bq-panel-ico"><Icon d={look[section.id].icon} size={22} /></span>
            <h2><small>{section.title}</small>{section.groups[0].q}</h2>
          </div>
          {visibleGroups.map((gr, gi) => (
            <div key={gr.id} className="bq-group">
              {gi > 0 && <h3 className="bq-gq">{questionOf(gr)}</h3>}
              {gr.hint && <p className="bq-hint">{gr.hint}</p>}
              {gr.layout === "text" ? (
                <div className="bq-pills" role="group" aria-label={questionOf(gr)}>
                  {gr.opts.map((o) => (
                    <Pill key={o.id} label={o.sub ? `${o.label} · ${o.sub}` : o.label} selected={(answers[gr.id] || []).includes(o.id)} onPick={() => pick(gr, o.id)} />
                  ))}
                </div>
              ) : (
                <div className={`bq-grid bq-grid-${gr.layout}`} role="group" aria-label={gr.q}>
                  {gr.opts.map((o) => (
                    <Card key={o.id} opt={o} layout={gr.layout} icon={look[section.id].icon} selected={(answers[gr.id] || []).includes(o.id)} onPick={() => pick(gr, o.id)} />
                  ))}
                </div>
              )}
            </div>
          ))}
          <label className="bq-note">
            <span>Anything to add? <em>(optional)</em></span>
            <textarea
              rows={2}
              maxLength={300}
              value={notes[section.id] || ""}
              onChange={(e) => setNotes((n) => ({ ...n, [section.id]: e.target.value }))}
              placeholder={`Notes about your ${section.title.toLowerCase()}`}
            />
          </label>
        </section>
      )}

      {isDetails && (
        <section className="bq-panel" style={accent} aria-label="Quick details">
          <div className="bq-panel-head">
            <span className="bq-panel-ico"><Icon d={look.details.icon} size={22} /></span>
            <h2><small>Quick details</small>Just a few last things</h2>
          </div>
          {basics.map((b) => (
            <div key={b.id} className="bq-basic">
              <p className="bq-basic-q">{b.q}</p>
              <div className="bq-pills" role="group" aria-label={b.q}>
                {b.opts.map((o) => (
                  <Pill key={o.id} label={o.label} selected={(answers[b.id] || []).includes(o.id)} onPick={() => pick({ id: b.id, label: b.label, q: b.q, layout: "text", opts: b.opts }, o.id)} />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {stepKey === "contact" && (
        <form className="bq-contact" onSubmit={submit}>
          <p className="bq-kicker">Last step</p>
          <h2>Where should we send your plan?</h2>
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
      )}

      <div className="bq-nav">
        {i > 0 ? <button type="button" className="bq-back" onClick={() => go(i - 1)}>← Back</button> : <span />}
        {stepKey !== "contact" && (
          <div className="bq-next">
            {!stepDone && <span className="bq-need">Answer each question to continue</span>}
            <button type="button" className="btn" disabled={!stepDone} onClick={() => go(i + 1)}>
              {i === sections.length ? "Last step →" : "Next →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
