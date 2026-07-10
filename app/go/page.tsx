import type { Metadata } from "next";
import { site } from "@/lib/site";
import EstimateFunnel from "@/components/EstimateFunnel";
import "./go.css";

// Hidden lead-capture page for paid (Meta) ad traffic.
// noindex + robots.txt disallow + excluded from sitemap + no internal links.
export const metadata: Metadata = {
  title: "Free Renovation Estimate | Palm Beach Renovations",
  description:
    "Get a free, no-obligation renovation estimate from Palm Beach Renovations. Kitchens, bathrooms, cabinetry & flooring across Palm Beach and Martin County, FL.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function GoPage() {
  return (
    <main className="lp-root">
      <div className="lp-topbar">
        <span className="lp-brand">{site.name}</span>
        <a href={`tel:${site.phone}`} className="lp-phone">
          📞 {site.phoneDisplay}
        </a>
      </div>

      <section className="lp-hero">
        <p className="lp-eyebrow">Palm Beach &amp; Martin County, FL</p>
        <h1>
          Get Your <span>Free Renovation Estimate</span>
        </h1>
        <p className="lp-sub">Licensed &amp; insured · Veteran-owned · 25+ years of experience</p>

        <EstimateFunnel />

        <div className="lp-owners">
          <p className="lp-owners-title">Meet the owners</p>
          <div className="lp-owners-row">
            {site.owners.map((o) => (
              <div key={o.name} className="lp-owner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.photo} alt={o.name} />
                <strong>{o.name}</strong>
                <span>{o.role}</span>
              </div>
            ))}
          </div>
          <p className="lp-owners-note">
            Real local owners on every job — no call centers, no subcontractor roulette.
          </p>
        </div>
      </section>

      <footer className="lp-footer">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.hours} ·{" "}
          <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
        </p>
      </footer>
    </main>
  );
}
