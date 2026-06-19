import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { serviceContent, cities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Renovation Services",
  description:
    "Kitchen remodeling, bathroom remodeling, custom cabinetry, tile and flooring, and home additions in Palm Beach and Martin County, FL. Free estimates from a licensed, insured contractor.",
  alternates: { canonical: `${site.domain}/services` },
};

export default function ServicesPage() {
  return (
    <main className="container">
      <header className="page-head">
        <h1>Our Renovation Services</h1>
        <p>
          From single-room refreshes to full-home remodels, Palm Beach Renovations delivers
          quality craftsmanship across Palm Beach and Martin County. Every project starts with
          a free estimate.
        </p>
      </header>

      <section className="service-card-grid">
        {serviceContent.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="service-feature-card">
            <div className="service-feature-media">
              <Image
                src={s.heroImage}
                alt={`${s.title} by ${site.name}`}
                width={600}
                height={400}
                sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="service-feature-body">
              <h2>{s.title}</h2>
              <p>{s.blurb}</p>
              <span className="service-feature-link">Learn more →</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="section">
        <h2 className="center">Areas We Serve</h2>
        <p className="center intro">
          Proudly serving homeowners across Palm Beach and Martin County.
        </p>
        <div className="city-chips">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/services/kitchen-remodeling/${c.slug}`}
              className="chip chip-link"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="cta-band">
        <p>Ready to start? Get your free, no-pressure estimate.</p>
        <a className="btn" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
      </div>
    </main>
  );
}
