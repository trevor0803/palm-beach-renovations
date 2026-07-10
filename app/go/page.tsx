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
        <div className="lp-hero-copy">
          <p className="lp-eyebrow">Palm Beach &amp; Martin County, FL</p>
          <h1>
            Get Your <span>Free Renovation Estimate</span> — Fast
          </h1>
          <p className="lp-sub">
            Kitchens, bathrooms, custom cabinetry &amp; flooring. Licensed &amp; insured, veteran-owned,
            25+ years of experience. Answer two quick questions and we&apos;ll get you a free,
            no-obligation estimate.
          </p>
          <ul className="lp-points">
            <li>✓ Free in-home estimate — no pressure, no obligation</li>
            <li>✓ Licensed &amp; insured local contractors</li>
            <li>✓ Owner-led crews on every job</li>
          </ul>
        </div>
        <EstimateFunnel />
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
