import Link from "next/link";
import Image from "next/image";
import { site, reviews } from "@/lib/site";
import { gallery } from "@/lib/gallery";
import type { ServiceContent } from "@/lib/content";
import GoogleBadge from "@/components/GoogleBadge";
import { hash, rotate } from "@/lib/proof";

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
  hideTopCta = false,
  excludeSrc,
}: {
  service: ServiceContent;
  cityName?: string;
  cityDetail?: string[];
  hideTopCta?: boolean;
  excludeSrc?: string;
}) {
  const where = cityName ? ` in ${cityName}` : " in Palm Beach & Martin County";
  const cats = PHOTO_CATEGORIES[service.slug] ?? ["Kitchen"];
  // Each city starts at a different point in the photo and review lists, so no two city pages
  // show the same proof strip.
  const seed = hash(`${service.slug}:${cityName ?? ""}`);
  const photoPool = gallery.filter((g) => cats.includes(g.category) && g.src !== excludeSrc);
  const photos = rotate(photoPool, seed, 3);
  const proof = rotate(reviews, seed >>> 3, 2);

  return (
    <>
      {!hideTopCta && (
        <section className="service-cta-top">
          <p className="trust-line">
            <strong>Licensed &amp; Insured</strong> · 25+ Years of Experience · Free Estimates
          </p>
          <div className="hero-cta">
            <a className="btn" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            <Link className="btn btn-outline" href="/contact">Request a Free Estimate</Link>
          </div>
        </section>
      )}

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
                <cite><GoogleBadge /> {r.author}, Google Review</cite>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {service.slug === "bathroom-remodeling" && (
        <section className="container">
          <div className="bathroom-promo">
            <div>
              <h2>Planning a bathroom? Build your wish list.</h2>
              <p>Check off the shower, vanity, tile and more you want, then get a free estimate based on your picks.</p>
            </div>
            <Link className="btn" href="/bathroom-estimate">Start my wish list</Link>
          </div>
        </section>
      )}

      {cityDetail && cityDetail.length > 0 && (
        <section className="container section city-detail">
          <h2>{service.shortTitle} in {cityName}: what to expect</h2>
          {cityDetail.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
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
