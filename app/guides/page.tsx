import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Remodeling Guides",
  description:
    "Straight answers on permits, costs, timelines and materials for kitchen and bathroom remodels in Palm Beach and Martin County, FL — written by a licensed contractor.",
  alternates: { canonical: `${site.domain}/guides` },
};

export default function GuidesIndex() {
  return (
    <main>
      <div className="container">
        <header className="page-head">
          <h1>Remodeling Guides</h1>
          <p>
            The questions homeowners actually ask us, answered properly. No fluff, no
            invented statistics — just what 25+ years of remodeling in Palm Beach and
            Martin County has taught us.
          </p>
        </header>
      </div>

      <div className="container section">
        <div className="guide-grid">
          {guides.map((g) => (
            <article key={g.slug} className="guide-card">
              <Link href={`/guides/${g.slug}`} className="guide-card-img">
                <Image
                  src={g.heroImage}
                  alt={g.title}
                  width={560}
                  height={360}
                  sizes="(max-width: 860px) 100vw, 33vw"
                />
              </Link>
              <div className="guide-card-body">
                <p className="guide-meta">{g.readingMinutes} min read</p>
                <h2>
                  <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                </h2>
                <p>{g.summary}</p>
                <Link className="guide-more" href={`/guides/${g.slug}`}>
                  Read the guide →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <section className="cta-final">
        <div className="container section center">
          <h2>Still have a question?</h2>
          <p>Ask us directly. Estimates are free and we will tell you what your project actually needs.</p>
          <div className="hero-cta center">
            <a className="btn" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            <Link className="btn btn-outline" href="/contact">Request a Free Estimate</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
