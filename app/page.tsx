import Link from "next/link";
import Image from "next/image";
import { site, reviews } from "@/lib/site";
import { serviceContent } from "@/lib/content";
import HeroVideo from "@/components/HeroVideo";
import QuickEstimate from "@/components/QuickEstimate";
import GoogleBadge from "@/components/GoogleBadge";

// Existing claims, unchanged. Icons are decorative (aria-hidden).
const features = [
  {
    title: "Certified Experts",
    text: "With over 25 years of experience, our skilled professionals are qualified to transform any space.",
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6Z" />
    ),
  },
  {
    title: "Free Estimates",
    text: "Finding the right company at the right price shouldn't cost a fortune — that's why estimates are free.",
    icon: (
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-7 14H7v-2h5v2Zm5-4H7v-2h10v2Zm0-4H7V7h10v2Z" />
    ),
  },
  {
    title: "Exceptional Quality",
    text: "We use only the highest-quality materials so your renovation stands the test of time.",
    icon: (
      <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.1 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2Z" />
    ),
  },
];

const checks = ["Free, no-pressure estimates", "Licensed & insured", "Owner-led team: meet Michael, Adam & Thomas"];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero hero-split">
        <HeroVideo />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container hero-inner hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Kitchens · Bathrooms · Cabinetry · Tile</p>
            <h1>Expert Home Remodeling in Palm Beach &amp; Martin County</h1>
            <p className="lede">
              Remodeling and renovation across Palm Beach and Martin County, led by the three owners and built to last.
            </p>
            <ul className="hero-checks">
              {checks.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="hero-cta">
              <a className="btn btn-light" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
              <Link className="btn btn-outline" href="/gallery">See our projects</Link>
            </div>
          </div>
          <div className="hero-form">
            <QuickEstimate />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container section">
        <p className="intro intro-lg">
          Elevate your space with Palm Beach Renovations, your go-to for expert home
          remodeling in Palm Beach and Martin County. Our skilled team specializes in
          transforming kitchens, bathrooms, bedrooms, and more. We bring your vision to life
          with quality craftsmanship and personalized solutions for every project.
        </p>
      </section>

      {/* Features */}
      <section className="container features">
        {features.map((f) => (
          <div key={f.title} className="feature">
            <span className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">{f.icon}</svg>
            </span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </section>

      {/* Services */}
      <section className="band section-band">
        <div className="container section">
          <h2 className="center">Need a Home Upgrade?</h2>
          <p className="center intro">
            From expert kitchen and bathroom remodeling to custom cabinetry and stylish tile
            flooring, our work leaves you loving your space for years to come — adding both
            aesthetic appeal and market value.
          </p>
          <div className="home-services">
            {serviceContent.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="home-service">
                <div className="home-service-media">
                  <Image
                    src={s.heroImage}
                    alt={`${s.title} by ${site.name}`}
                    width={640}
                    height={420}
                    sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 380px"
                  />
                </div>
                <div className="home-service-body">
                  <h3>{s.title}</h3>
                  <p>{s.blurb}</p>
                  <span className="service-feature-link">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="center">
            <Link className="btn" href="/gallery">Project Gallery</Link>
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="container section">
        <h2 className="center">Meet Our Dedicated Team</h2>
        <p className="center intro">
          If someone&apos;s coming to work in your home, you should know who you&apos;re
          letting in. Get to know our owners and their backgrounds.
        </p>
        <div className="team-grid">
          {site.owners.map((o) => (
            <figure key={o.name} className="team-card">
              <Image src={o.photo} alt={`${o.name}, ${o.role} at ${site.name}`} width={300} height={450} />
              <figcaption><strong>{o.name}</strong><span>{o.role}</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="center"><Link className="btn btn-outline" href="/our-team">Learn more about our team</Link></div>
      </section>

      {/* Reviews */}
      <section className="band section-band">
        <div className="container section">
          <h2 className="center">What Homeowners Are Saying</h2>
          <p className="center reviews-source"><GoogleBadge /> Reviews from our Google Business Profile</p>
          <div className="review-grid">
            {reviews.map((r) => (
              <blockquote key={r.author} className="review">
                <span className="review-mark" aria-hidden="true">&ldquo;</span>
                <p>{r.text}</p>
                <cite>— {r.author}, Google Review</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-final">
        <div className="container section center">
          <h2>Transform Your Space With Us Today</h2>
          <p>Get your free estimate — connect with our team now.</p>
          <div className="hero-cta center">
            <a className="btn btn-light" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            <Link className="btn btn-outline" href="/contact">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
