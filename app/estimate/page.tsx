import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { site } from "@/lib/site";
import EstimateVideo from "@/components/EstimateVideo";
import "./estimate.css";

// A paid-traffic funnel, not a search landing page: noindex, not linked from the site.
export const metadata: Metadata = {
  title: { absolute: "Free Remodeling Estimate | Palm Beach Renovations" },
  description: "Watch a quick hello from Mike, then choose your kitchen or bathroom remodel and get a free estimate in Palm Beach and Martin County.",
  alternates: { canonical: `${site.domain}/estimate` },
  robots: { index: false, follow: false },
};

const choices = [
  { href: "/kitchen-estimate", label: "Kitchen Remodeling", src: "/img/lander/kitchen-full.jpg", alt: "Finished kitchen remodel by Palm Beach Renovations" },
  { href: "/bathroom-estimate", label: "Bathroom Remodeling", src: "/img/lander/hero-bathroom.jpg", alt: "Finished bathroom remodel by Palm Beach Renovations" },
];

const accent = { "--accent": "#1e3a8a" } as CSSProperties;

export default function EstimatePage() {
  return (
    <main className="bq-page">
      <section className="bq-hero">
        <Image src="/img/gallery/kitchen-navy-white-island.jpg" alt="" fill priority sizes="100vw" className="bq-hero-img" />
        <div className="bq-hero-shade" aria-hidden="true" />
        <div className="container bq-hero-inner">
          <p className="bq-eyebrow">Palm Beach Renovations · Free Estimate</p>
          <h1>Let&apos;s plan your <em>remodel</em></h1>
          <p className="bq-hero-sub">Watch a quick hello from Mike, then pick your project. No prices, no pressure. We turn your picks into a free, accurate estimate.</p>
          <ul className="bq-hero-points">
            <li>Free estimate</li>
            <li>Licensed &amp; insured</li>
            <li>Owner-led team</li>
          </ul>
        </div>
      </section>
      <div className="container bq-wrap">
        <section className="bq-panel est-panel" style={accent} aria-labelledby="est-h">
          <div className="est-vsl">
            <EstimateVideo src="/video/vsl-pbr.mp4" poster="/video/vsl-pbr.jpg" label="A hello from Mike, one of the owners" />
          </div>
          <p className="est-name"><strong>Mike Ullman</strong> · Owner, Palm Beach Renovations</p>
          <h2 id="est-h" className="est-h"><small>Step 1</small>What are you remodeling?</h2>
          <div className="ld-pick-grid">
            {choices.map((c) => (
              <Link key={c.href} href={c.href} className="ld-pick-card">
                <Image src={c.src} alt={c.alt} fill sizes="(max-width: 720px) 100vw, 440px" />
                <span>{c.label}<em>Start &rarr;</em></span>
              </Link>
            ))}
          </div>
          <p className="est-call">Prefer to talk? <a href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a></p>
        </section>
      </div>
    </main>
  );
}
