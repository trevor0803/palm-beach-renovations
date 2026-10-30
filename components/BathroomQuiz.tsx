"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import { trackLead, newEventId } from "@/lib/track";
import { sections, basics, EXCLUSIVE, CONTACT_TIMES, AREAS, INTRO, AFTER_AREAS, OUTRO, type Group, type Opt } from "@/lib/bathroomQuiz";

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
  review: { accent: "#1e3a8a", icon: "M5 12l4 4 10-10" },
};
const KEEP_ICON = "M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4";
const SKIP_ICON = "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM6 6l12 12";
const OTHER_ICON = "M4 20h4L19 9l-4-4L4 16zM13 7l4 4";

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
  const noMedia = layout === "photo" && !opt.img;
  const glyph = opt.id === "keep" ? KEEP_ICON : opt.id === "skip" ? SKIP_ICON : opt.id === "other" ? OTHER_ICON : icon;
  const unsure = opt.id === "not-sure";
  return (
    <button type="button" className={`bq-card bq-${layout}${selected ? " is-selected" : ""}`} aria-pressed={selected} onClick={onPick}>
      {layout === "photo" && opt.img && (
        <span className="bq-media">
          <Image src={opt.img} alt={opt.alt || opt.label} width={420} height={315} sizes="(max-width: 640px) 46vw, 220px" />
        </span>
      )}
      {noMedia && (
        <span className="bq-media bq-ph" aria-hidden="true">
          {unsure ? <b>?</b> : <Icon d={glyph} size={48} sw={1.2} />}
        </span>
      )}
      {layout === "color" && (
        <span className={`bq-chip${opt.color ? "" : " bq-chip-q"}`} style={opt.color ? { background: opt.color } : undefined} aria-hidden="true">
          {!opt.color && (unsure ? "?" : <Icon d={opt.id === "keep" ? KEEP_ICON : opt.id === "other" ? OTHER_ICON : SKIP_ICON} size={28} sw={1.6} />)}
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

// A selectable text row (used for text questions and the quick-details questions).
function Choice({ label, sub, selected, onPick, multi }: { label: string; sub?: string; selected: boolean; onPick: () => void; multi?: boolean }) {
  return (
    <button type="button" className={`bq-choice${selected ? " is-selected" : ""}`} aria-pressed={selected} onClick={onPick}>
      <span className={`bq-mark${multi ? " is-square" : ""}`} aria-hidden="true">{selected ? "✓" : ""}</span>
      <span className="bq-choice-text">
        <strong>{label}</strong>
        {sub && <small>{sub}</small>}
      </span>
    </button>
  );
}

export default function BathroomQuiz() {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [others, setOthers] = useState<Record<string, string>>({});
  const [bestTime, setBestTime] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // After Next / Back / a jump: scroll to the top of the card and move focus to the new heading.
  useEffect(() => {
    if (!moved.current) return;
    metaRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    headRef.current?.focus({ preventScroll: true });
  }, [i, state]);

  // Shrink the hero once the person starts, so the questions get the screen.
  useEffect(() => {
    const page = rootRef.current?.closest(".bq-page");
    page?.classList.toggle("is-step", i > 0 || state === "done");
  }, [i, state]);

  function pick(group: { id: string; multi?: boolean }, optId: string) {
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
  const picked = answers["areas"] || [];
  const areaOf = (gid: string) => AREAS.find((a) => a.groups.includes(gid))?.id;
  const chosen = (gr: Group) => picked.includes(areaOf(gr.id) || "");
  const visibleOf = (s: (typeof sections)[number]) => s.groups.filter((gr) => chosen(gr) && !hidden(gr));
  const sectionDone = (s: (typeof sections)[number]) => visibleOf(s).every((gr) => answered(gr.id));
  const detailsDone = basics.every((b) => answered(b.id));
  const allDone = picked.length > 0 && sections.every(sectionDone) && detailsDone;

  // One question per screen: every visible group is its own page, then the quick details, then the review.
  type Page = { kind: "group"; si: number; gr: Group; last: boolean } | { kind: "basic"; b: (typeof basics)[number] } | { kind: "areas" } | { kind: "review" };
  const pages: Page[] = [];
  const basicById = (id: string) => basics.find((b) => b.id === id)!;
  INTRO.forEach((id) => pages.push({ kind: "basic", b: basicById(id) }));
  pages.push({ kind: "areas" });
  AFTER_AREAS.forEach((id) => pages.push({ kind: "basic", b: basicById(id) }));
  sections.forEach((s, si) => {
    const vis = visibleOf(s);
    vis.forEach((gr, gi) => pages.push({ kind: "group", si, gr, last: gi === vis.length - 1 }));
  });
  OUTRO.forEach((id) => pages.push({ kind: "basic", b: basicById(id) }));
  pages.push({ kind: "review" });
  const idx = Math.min(i, pages.length - 1);
  const page = pages[idx];
  const isContact = page.kind === "review";
  const stepKey = page.kind === "group" ? page.gr.id : page.kind === "basic" ? page.b.id : page.kind === "areas" ? "areas" : "contact";
  const accent = accentOf(page.kind === "group" ? sections[page.si].id : page.kind === "review" ? "review" : "details");
  const stepDone = page.kind === "group" ? answered(page.gr.id) : page.kind === "basic" ? answered(page.b.id) : page.kind === "areas" ? picked.length > 0 : true;
  const firstPageOf = (si: number) => pages.findIndex((p) => p.kind === "group" && p.si === si);
  const areasIdx = pages.findIndex((p) => p.kind === "areas");
  const outroIdx = pages.findIndex((p) => p.kind === "basic" && OUTRO.includes(p.b.id));
  const stepTitle = page.kind === "group" ? sections[page.si].title : page.kind === "review" ? "Review" : page.kind === "areas" ? "Your project" : "Quick details";
  const qNum = idx + 1;
  const qTotal = pages.length;
  const areasKnown = picked.length > 0; // the total only means something once they say what they want changed
  const barTotal = areasKnown ? qTotal : qTotal + 4;

  function go(next: number) {
    moved.current = true;
    if (next > idx) track("bathroom_quiz_step", { step: idx + 1, step_id: stepKey });
    setI(Math.max(0, next));
  }

  const labelsFor = (id: string, opts: Opt[], withTier = false) => {
    const sel = answers[id] || [];
    return opts
      .filter((o) => sel.includes(o.id))
      .map((o) => {
        if (o.id === "other") {
          const t = (others[id] || "").trim().replace(/\s+/g, " ");
          return t ? `Something else: "${t}"` : "Something else";
        }
        return withTier && o.tier ? `${o.label} (Tier ${o.tier})` : o.label;
      });
  };

  function buildRows() {
    return sections.map((s, idx) => {
      const parts = visibleOf(s).map((gr) => `${gr.label}: ${labelsFor(gr.id, gr.opts, true).join(", ") || "-"}`);
      const note = (notes[s.id] || "").trim().replace(/\s+/g, " ");
      return { idx, id: s.id, title: s.title, text: parts.length ? parts.join("; ") : "Not changing", note };
    });
  }

  function buildMessage() {
    const basicsLine = basics.map((b) => `${b.label}: ${labelsFor(b.id, b.opts).join(", ") || "-"}`).join(" | ");
    const lines: string[] = ["BATHROOM ESTIMATE REQUEST (website wish list)", basicsLine];
    lines.push(`Wants changed: ${AREAS.filter((a) => picked.includes(a.id)).map((a) => a.label).join(", ") || "-"}`);
    const when = CONTACT_TIMES.find((t) => t.id === bestTime);
    if (when) lines.push(`Best time to reach: ${when.label}`);
    lines.push("");
    const undecided: string[] = [];
    const keepSkip: string[] = [];
    for (const r of buildRows()) {
      lines.push(`${r.title.toUpperCase()}: ${r.text}`);
      if (r.note) lines.push(`  NOTE: ${r.note}`);
      for (const gr of sections[r.idx].groups) {
        if (!chosen(gr) || hidden(gr)) continue;
        const sel = answers[gr.id] || [];
        if (sel.includes("not-sure")) undecided.push(gr.label);
        for (const id of sel) {
          if (id === "keep") keepSkip.push(`${gr.label}: keep`);
          if (id === "skip") keepSkip.push(`${gr.label}: skip`);
        }
      }
    }
    lines.push("");
    lines.push(`UNDECIDED: ${undecided.join(", ") || "none"}`);
    lines.push(`KEEP / SKIP: ${keepSkip.join("; ") || "none"}`);
    return lines.join("\n");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErr("");
    const f = new FormData(e.currentTarget);
    const eventId = newEventId();
    const fullName = String(f.get("name") || "").trim().replace(/\s+/g, " ");
    const [firstName, ...rest] = fullName.split(" ");
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
          message: buildMessage(),
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

  const rows = buildRows();
  const basicRows = basics.map((b) => ({ k: b.label, v: labelsFor(b.id, b.opts).join(", ") || "-" }));

  if (state === "done") {
    return (
      <div className="bq" ref={rootRef}>
        <div className="bq-meta" ref={metaRef} />
        <div className="bq-done" role="status">
          <h2 ref={headRef} tabIndex={-1}>Thank you! Your bathroom plan is in.</h2>
          <p>We&apos;ll review your picks and call to set up your free in-home visit. Need us sooner? Call <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.</p>
          <ul className="bq-summary">
            {rows.map((r) => (<li key={r.id}><span>{r.title}</span><strong>{r.text}{r.note ? ` (Note: ${r.note})` : ""}</strong></li>))}
            {basicRows.map((r) => (<li key={r.k}><span>{r.k}</span><strong>{r.v}</strong></li>))}
          </ul>
        </div>
      </div>
    );
  }

  // Render a group's options. Tiered options sit under Essential / Select / Signature headers.
  function renderOpts(gr: Group, icon: string) {
    const sel = answers[gr.id] || [];
    const asCard = gr.layout === "photo" || gr.layout === "color" || gr.layout === "swatch";
    const mk = (o: Opt) =>
      asCard ? (
        <Card key={o.id} opt={o} layout={gr.layout} icon={icon} selected={sel.includes(o.id)} onPick={() => pick(gr, o.id)} />
      ) : (
        <Choice key={o.id} label={o.label} sub={o.sub} multi={gr.multi} selected={sel.includes(o.id)} onPick={() => pick(gr, o.id)} />
      );
    const gridCls = asCard ? `bq-grid bq-grid-${gr.layout}` : "bq-list";
    const q = questionOf(gr);
    const shown = gr.opts.filter((o) => o.id !== "keep" && o.id !== "skip");
    return (
      <div className={gridCls} role="group" aria-label={q}>
        {shown.map(mk)}
      </div>
    );
  }

  return (
    <div className="bq" ref={rootRef}>
      <div className="bq-meta" ref={metaRef}>
        <div className="bq-progress" role="progressbar" aria-label="Progress" aria-valuemin={1} aria-valuemax={qTotal} aria-valuenow={qNum} aria-valuetext={`Question ${qNum} of ${qTotal}, ${stepTitle}`}>
          <span style={{ width: `${Math.round((qNum / barTotal) * 100)}%` }} />
        </div>
        <p className="bq-count">{isContact ? "Last step" : areasKnown ? `Question ${qNum} of ${qTotal}` : `Question ${qNum}`} <span>· {stepTitle}</span></p>
      </div>

      {page.kind === "group" && (() => {
        const gr = page.gr;
        const sec = sections[page.si];
        return (
          <section className="bq-panel" style={accent} aria-label={questionOf(gr)} key={gr.id}>
            <div className="bq-panel-head">
              <span className="bq-panel-ico"><Icon d={look[sec.id].icon} size={22} /></span>
              <h2 ref={headRef} tabIndex={-1}><small>{sec.title}</small>{questionOf(gr)}</h2>
            </div>
            <div className="bq-group">
              <p className="bq-how">
                <span className="bq-tag">{gr.multi ? "Choose all that apply" : "Choose one"}</span>
                {gr.hint && gr.hint !== "Choose all that apply." && <span className="bq-hint-inline">{gr.hint}</span>}
              </p>
              {renderOpts(gr, look[sec.id].icon)}
              {(answers[gr.id] || []).includes("other") && (
                <label className="bq-other">
                  <span>What do you have in mind?</span>
                  <input
                    type="text"
                    maxLength={120}
                    value={others[gr.id] || ""}
                    onChange={(e) => setOthers((o) => ({ ...o, [gr.id]: e.target.value }))}
                    placeholder="Describe it in a few words"
                  />
                </label>
              )}
            </div>
            {page.last && (
              <label className="bq-note">
                <span>Anything to add about your {sec.title.toLowerCase()}? <em>(optional)</em></span>
                <textarea
                  rows={2}
                  maxLength={300}
                  value={notes[sec.id] || ""}
                  onChange={(e) => setNotes((n) => ({ ...n, [sec.id]: e.target.value }))}
                  placeholder="Details like glass, grab bars, faucet finish, or anything else"
                />
              </label>
            )}
          </section>
        );
      })()}

      {page.kind === "areas" && (
        <section className="bq-panel" style={accent} aria-label="What do you want changed" key="areas">
          <div className="bq-panel-head">
            <span className="bq-panel-ico"><Icon d={look.details.icon} size={22} /></span>
            <h2 ref={headRef} tabIndex={-1}><small>Your project</small>What do you want changed?</h2>
          </div>
          <div className="bq-group">
            <p className="bq-how">
              <span className="bq-tag">Choose all that apply</span>
              <span className="bq-hint-inline">We will ask about just these, one at a time.</span>
            </p>
            <div className="bq-list" role="group" aria-label="What do you want changed">
              {AREAS.map((a) => (
                <Choice key={a.id} label={a.label} sub={a.sub} multi selected={picked.includes(a.id)} onPick={() => setAnswers((x) => { const cur = x["areas"] || []; return { ...x, areas: cur.includes(a.id) ? cur.filter((y) => y !== a.id) : [...cur, a.id] }; })} />
              ))}
            </div>
          </div>
        </section>
      )}

      {page.kind === "basic" && (
        <section className="bq-panel" style={accent} aria-label={page.b.q} key={page.b.id}>
          <div className="bq-panel-head">
            <span className="bq-panel-ico"><Icon d={look.details.icon} size={22} /></span>
            <h2 ref={headRef} tabIndex={-1}><small>Quick details</small>{page.b.q}</h2>
          </div>
          <div className="bq-group">
            <p className="bq-how">
              <span className="bq-tag">Choose one</span>
              {page.b.hint && <span className="bq-hint-inline">{page.b.hint}</span>}
            </p>
            <div className="bq-list" role="group" aria-label={page.b.q}>
              {page.b.opts.map((o) => (
                <Choice key={o.id} label={o.label} sub={o.sub} selected={(answers[page.b.id] || []).includes(o.id)} onPick={() => pick({ id: page.b.id }, o.id)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {isContact && (
        <>
          <section className="bq-panel bq-review" style={accent} aria-label="Your picks">
            <div className="bq-panel-head">
              <span className="bq-panel-ico"><Icon d={look.review.icon} size={22} /></span>
              <h2 ref={headRef} tabIndex={-1}><small>Review</small>Your picks</h2>
            </div>
            <ul className="bq-picks">
              {rows.map((r) => (
                <li key={r.id}>
                  <div>
                    <strong>{r.title}</strong>
                    <span>{r.text.replace(/^[^:]+: /, "").replace(/; ([^:;]+): /g, " · $1: ")}{r.note ? ` · Note: ${r.note}` : ""}</span>
                  </div>
                  <button type="button" className="bq-edit" onClick={() => go(firstPageOf(r.idx) >= 0 ? firstPageOf(r.idx) : areasIdx)}>Edit</button>
                </li>
              ))}
              <li>
                <div>
                  <strong>Quick details</strong>
                  <span>{basicRows.map((b) => `${b.k}: ${b.v}`).join(" · ")}</span>
                </div>
                <button type="button" className="bq-edit" onClick={() => go(outroIdx)}>Edit</button>
              </li>
            </ul>
          </section>

          <form className="bq-contact" onSubmit={submit}>
            <p className="bq-kicker">Last step</p>
            <h2>Almost done. Where should we reach you?</h2>
            <p className="bq-promise">We&apos;ll call once to book your free in-home visit. No spam, never shared.</p>
            <label><span>Name</span><input name="name" autoComplete="name" required /></label>
            <div className="qe-row">
              <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" required /></label>
              <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
            </div>
            <div className="bq-times" role="group" aria-label="Best time to reach you (optional)">
              <span>Best time to reach you <em>(optional)</em></span>
              <div>
                {CONTACT_TIMES.map((t) => (
                  <button key={t.id} type="button" className={`bq-time${bestTime === t.id ? " is-selected" : ""}`} aria-pressed={bestTime === t.id} onClick={() => setBestTime(bestTime === t.id ? "" : t.id)}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <input name="hp_check" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
            <button className="btn qe-submit" type="submit" disabled={state === "sending" || !allDone}>
              {state === "sending" ? "Sending…" : "Get my free estimate"}
            </button>
            {!allDone && <p className="bq-promise">A few questions above are still open. Use Edit to finish them.</p>}
            {err && <p className="qe-error" role="alert">{err}</p>}
            <p className="bq-consent">
              By submitting, you agree to receive calls and texts from {site.name} about your request. Message frequency varies. Reply STOP to opt out.
            </p>
            <p className="bq-or">Prefer to talk? <a href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a></p>
          </form>
        </>
      )}

      <div className="bq-nav">
        {!isContact && !stepDone && <p className="bq-need" role="status">Pick an answer to continue</p>}
        <div className="bq-navrow">
          {idx > 0 ? <button type="button" className="bq-back" onClick={() => go(idx - 1)}>← Back</button> : <span />}
          {!isContact && (
            <div className="bq-next">
              <button type="button" className="btn" disabled={!stepDone} onClick={() => go(idx + 1)}>
                {pages[idx + 1]?.kind === "review" ? "Review →" : "Next →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
