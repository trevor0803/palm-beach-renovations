import Link from "next/link";
import Image from "next/image";
import { site, reviews } from "@/lib/site";
import { gallery } from "@/lib/gallery";
import type { ServiceContent } from "@/lib/content";

// Which gallery photos back up which service.
const PHOTO_CATEGORIES: Record<string, string[]> = {
  "kitchen-remodeling": ["Kitchen"],
  "custom-cabinetry": ["Kitchen"],
  "bathroom-remodeling": ["Bathroom"],
  "tile-flooring": ["Flooring", "Patio", "Walkway"],
  "home-additions": ["Home Renovation", "Renovation", "Deck"],
};

export default function ServiceBody({
  service,
  cityName,
  cityDetail,
}: {
  service: ServiceContent;
  cityName?: string;
  cityDetail?: string[];
}) {
  const where = cityName ? ` in ${cityName}` : " in Palm Beach & Martin County";
  const cats = PHOTO_CATEGORIES[service.slug] ?? ["Kitchen"];
  const photos = gallery.filter((g) => cats.includes(g.category)).slice(0, 3);
  const proof = reviews.slice(0, 2);

  return (
    <>
      <section className="service-cta-top">
        <p className="trust-line">
          <strong>Licensed &amp; Insured</strong> · 25+ Years of Experience · Free Estimates
        </p>
        <div className="hero-cta">
          <a className="btn" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
          <Link className="btn btn-outline" href="/contact">Request a Free Estimate</Link>
        </div>
      </section>

      <section className="service-intro section">
        <p className="intro">{service.intro}</p>
      </section>

      {photos.length > 0 && (
        <section className="proof-strip">
          <div className="proof-photos">
            {photos.map((p) => (
              <figure key={p.src}>
                <Image
                  src={p.src}
                  alt={cityName ? `${p.alt} near ${cityName}, FL` : p.alt}
                  width={520}
                  height={390}
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </figure>
            ))}
          </div>
          <div className="proof-reviews">
            {proof.map((r) => (
              <blockquote key={r.author}>
                <p>&ldquo;{r.text}&rdquo;</p>
                <cite>&mdash; {r.author}, Google Review</cite>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <section className="band">
        <div className="container section">
          <h2 className="center">Why Homeowners{where} Choose Us</h2>
          <div className="service-grid">
            {service.benefits.map((b) => (
              <div key={b.heading} className="service-card" style={{ cursor: "default" }}>
                <h3>{b.heading}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <h2 className="center">Our Process</h2>
        <ol className="process-list">
          {service.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="band">
        <div className="container section">
          <h2 className="center">Frequently Asked Questions</h2>
          <div className="faq-list">
            {service.faqs.map((f) => (
              <details key={f.q} className="faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="container section center">
          <h2>Ready to Start Your {service.title} Project?</h2>
          <p>Get a free, no-pressure estimate{cityName ? ` for your ${cityName} home` : ""}.</p>
          <div className="hero-cta center">
            <a className="btn" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            <Link className="btn btn-outline" href="/contact">Request an Estimate</Link>
          </div>
        </div>
      </section>
    </>
  );
}
