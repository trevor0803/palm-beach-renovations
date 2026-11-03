"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { gallery } from "@/lib/gallery";

// Best finished work first. Everything else follows in its existing order. Every photo stays
// in the page HTML (filters only hide), so all images and alt text remain crawlable.
const FEATURED = [
  "kitchen-remodel-7", "bathroom-floating-wood-vanity-tub", "kitchen-navy-white-island", "renovation-project-7",
  "kitchen-remodel-6", "bathroom-diamond-tile-corner-shower", "kitchen-remodel-5", "home-renovation-1",
  "kitchen-gray-woodgrain-cabinets", "bathroom-gray-double-vanity", "bathroom-remodel-10", "bathroom-marble-walk-in-shower",
];
const WIDE = new Set(["kitchen-navy-white-island", "kitchen-remodel-6", "bathroom-remodel-10"]);
const rank = (src: string) => {
  const i = FEATURED.findIndex((f) => src.includes(`/${f}.`));
  return i === -1 ? 99 : i;
};
const TABS = [
  { id: "all", label: "All projects" },
  { id: "kitchen", label: "Kitchens" },
  { id: "bath", label: "Bathrooms" },
  { id: "more", label: "Outdoor & more" },
] as const;
type Tab = (typeof TABS)[number]["id"];
const tabOf = (c: string): Tab => (c === "Kitchen" ? "kitchen" : c === "Bathroom" ? "bath" : "more");

export default function GalleryGrid() {
  const [tab, setTab] = useState<Tab>("all");
  const [open, setOpen] = useState<number | null>(null);
  const items = useMemo(() => [...gallery].sort((a, b) => rank(a.src) - rank(b.src)), []);
  const shown = useMemo(() => items.filter((p) => tab === "all" || tabOf(p.category) === tab), [items, tab]);

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, step]);

  const cur = open !== null ? shown[open] : null;
  return (
    <>
      <div className="gx-tabs" role="group" aria-label="Filter projects">
        {TABS.map((t) => (
          <button key={t.id} type="button" className="gx-tab" aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>
      <section className="gx-grid" aria-label="Renovation project photos">
        {items.map((photo) => {
          const vis = tab === "all" || tabOf(photo.category) === tab;
          const idx = shown.indexOf(photo);
          const wide = tab === "all" && WIDE.has(photo.src.split("/").pop()!.replace(/\.jpg$/, ""));
          return (
            <button key={photo.src} type="button" hidden={!vis} className={`gx-item${wide ? " is-wide" : ""}`} onClick={() => setOpen(idx)} aria-label={`Enlarge photo: ${photo.alt}`}>
              <Image src={photo.src} alt={photo.alt} width={wide ? 800 : 600} height={wide ? 600 : 750} loading="lazy" sizes="(max-width: 960px) 50vw, 33vw" />
            </button>
          );
        })}
      </section>
      {cur && (
        <div className="gx-box" role="dialog" aria-modal="true" aria-label="Project photo" onClick={() => setOpen(null)}>
          <button type="button" className="gx-btn gx-close" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          <button type="button" className="gx-btn gx-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
          <button type="button" className="gx-btn gx-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
          <div onClick={(e) => e.stopPropagation()} style={{ display: "grid", justifyItems: "center" }}>
            <Image src={cur.src} alt={cur.alt} width={1200} height={1200} sizes="94vw" />
            <p>{cur.alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
