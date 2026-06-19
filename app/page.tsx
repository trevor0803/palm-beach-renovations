import Link from "next/link";
import Image from "next/image";
import { site, services, reviews } from "@/lib/site";

const features = [
  { icon: "/img/logo.webp", title: "Certified Experts", text: "With over 25 years of experience, our skilled professionals are qualified to transform any space." },
  { icon: "/img/logo.webp", title: "Free Estimates", text: "Finding the right company at the right price shouldn't cost a fortune — that's why estimates are free." },
  { icon: "/img/logo.webp", title: "Exceptional Quality", text: "We use only the highest-quality materials so your renovation stands the test of time." },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/img/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/img/hero.webm" type="video/webm" />
          <source src="/img/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container hero-inner">
          <h1>Expert Home Renovation Services in Palm Beach &amp; Martin County</h1>
          <p className="lede">Free Estimates · Licensed &amp; Insured · 25+ Years of Experience</p>
          <div className="hero-cta">
            <Link className="btn" href="/services">Check our services</Link>
            <a className="btn btn-outline" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container section">
        <p className="intro">
          Elevate your space with Palm Beach Renovations, your go-to for expert home
          remodeling in Palm Beach and Martin County. Our skilled team specializes in
          transforming kitchens, bathrooms, bedrooms, and more. We bring your vision to life
          with quality craftsmanship and personalized solutions for every project.
        </p>
      </section>

      {/* Features */}
      <section className="container section features">
        {features.map((f) => (
          <div key={f.title} className="feature">
            <h2>{f.title}</h2>
            <p>{f.text}</p>
          </div>
        ))}
      </section>

      {/* Services */}
      <section className="band">
        <div className="container section">
          <h2 className="center">Need a Home Upgrade?</h2>
          <p className="center intro">
            From expert kitchen and bathroom remodeling to custom cabinetry and stylish tile
            flooring, our work leaves you loving your space for years to come — adding both
            aesthetic appeal and market value.
          </p>
          <div className="service-grid">
            {services.map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`} className="service-card">
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
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
      <section className="band">
        <div className="container section">
          <h2 className="center">What Homeowners Are Saying</h2>
          <div className="review-grid">
            {reviews.map((r) => (
              <blockquote key={r.author} className="review">
                <p>&ldquo;{r.text}&rdquo;</p>
                <cite>— {r.author}, Google Review</cite>
              </blockquote>
            ))}
          </div>
          <div className="center">
            <a className="btn" href={site.social.google} target="_blank" rel="noopener noreferrer">View all reviews</a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-final">
        <div className="container section center">
          <h2>Transform Your Space With Us Today</h2>
          <p>Get your free estimate — connect with our team now.</p>
          <div className="hero-cta center">
            <a className="btn" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            <Link className="btn btn-outline" href="/contact">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
