import Link from "next/link";
import Image from "next/image";
import { site, reviews } from "@/lib/site";
import { serviceContent, cities } from "@/lib/content";
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

const trust = ["Licensed & insured", "25+ years of experience", "Free, no-pressure estimates", "Palm Beach & Martin County"];

const showcase = [
  { src: "/img/gallery/kitchen-remodel-7.jpg", alt: "Finished kitchen with a white waterfall island, brass pendant lights and glass doors to the yard" },
  { src: "/img/gallery/bathroom-floating-wood-vanity-tub.jpg", alt: "Finished bathroom with a floating wood vanity, oval mirrors and a freestanding tub" },
  { src: "/img/gallery/renovation-project-7.jpg", alt: "Finished bathroom with a freestanding tub, white vanity and a sliding glass door" },
];

const recent = [
  { src: "/img/gallery/kitchen-remodel-6.jpg", alt: "Navy kitchen with a large marble island and pendant lights" },
  { src: "/img/gallery/home-renovation-1.jpg", alt: "Walk-in shower with herringbone tile and brass fixtures" },
  { src: "/img/gallery/kitchen-remodel-5.jpg", alt: "Navy kitchen with stainless appliances and a center island" },
  { src: "/img/gallery/bathroom-gray-double-vanity.jpg", alt: "Bathroom with a gray double vanity and glass shower" },
  { src: "/img/gallery/bathroom-remodel-10.jpg", alt: "Double vanity with gold faucets and a framed mirror" },
];

const steps = [
  { t: "An owner calls you", d: "Michael, Adam or Tom calls to learn about your project and answer your questions." },
  { t: "We set a specific time", d: "We pick an exact time that works for you. No all-day arrival window." },
  { t: "We see it in person", d: "We look at the space with you, take measurements and talk through your ideas." },
  { t: "Your estimate follows", d: "We send your estimate shortly after the visit for you to review." },
];

export default function Home() {
  return (
    <main className="pb">
      {/* Hero */}
      <section className="pbh">
        <div className="container pbh-in">
          <div>
            <p className="pbh-kicker">Kitchens, bathrooms, cabinetry and tile</p>
            <h1>Expert Home Remodeling in Palm Beach &amp; Martin County</h1>
            <p className="pbh-lede">
              Remodeling and renovation across Palm Beach and Martin County, owner-led and built to last.
            </p>
            <div className="pbh-owners">
              <span className="pbh-faces" aria-hidden="true">
                {site.owners.map((o) => (
                  <Image key={o.name} src={o.photo} alt="" width={56} height={56} />
                ))}
              </span>
              <p>
                <strong>Michael, Adam &amp; Thomas</strong>
                The owners of {site.name}
              </p>
            </div>
            <div className="pbh-cta">
              <a className="btn btn-gold" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
              <Link className="btn btn-ghost" href="/gallery">See our projects</Link>
            </div>
          </div>
          <div className="pbh-card">
            <QuickEstimate />
          </div>
        </div>
      </section>

      <div className="pbs">
        {showcase.map((p, i) => (
          <figure key={p.src}>
            <Image src={p.src} alt={p.alt} fill priority={i === 0} sizes={i === 0 ? "(max-width: 960px) 100vw, 45vw" : "(max-width: 960px) 50vw, 28vw"} />
          </figure>
        ))}
      </div>

      <div className="pbt">
        <ul>
          {trust.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      {/* Intro + differentiators */}
      <section className="pbi">
        <div className="container">
          <div className="pbi-grid">
            <h2>Your go-to for home remodeling in Palm Beach and Martin County</h2>
            <p>
              Elevate your space with Palm Beach Renovations, your go-to for expert home
              remodeling in Palm Beach and Martin County. Our skilled team specializes in
              transforming kitchens, bathrooms, bedrooms, and more. We bring your vision to life
              with quality craftsmanship and personalized solutions for every project.
            </p>
          </div>
          <div className="pbf">
            {features.map((f) => (
              <div key={f.title} className="pbf-item">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">{f.icon}</svg>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="pbv">
        <div className="container">
          <div className="pb-head">
            <h2>Need a Home Upgrade?</h2>
            <p>
              From expert kitchen and bathroom remodeling to custom cabinetry and stylish tile
              flooring, our work leaves you loving your space for years to come — adding both
              aesthetic appeal and market value.
            </p>
          </div>
          <div className="pbv-grid">
            {serviceContent.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="pbv-card">
                <Image
                  src={s.heroImage}
                  alt={`${s.title} by ${site.name}`}
                  fill
                  sizes={i < 2 ? "(max-width: 960px) 100vw, 55vw" : "(max-width: 960px) 100vw, 33vw"}
                />
                <div className="pbv-body">
                  <h3>{s.title}</h3>
                  <p>{s.blurb}</p>
                  <span className="pbv-link">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent projects */}
      <section className="pbw">
        <div className="container">
          <div className="pb-head">
            <h2>Recent projects</h2>
            <p>Kitchens and bathrooms finished across Palm Beach and Martin County.</p>
          </div>
          <div className="pbw-grid">
            {recent.map((p) => (
              <figure key={p.src}>
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 960px) 50vw, 25vw" />
              </figure>
            ))}
          </div>
          <div className="pbw-foot">
            <Link className="btn" href="/gallery">See the full gallery</Link>
          </div>
        </div>
      </section>

      {/* Owners */}
      <section className="pbo">
        <div className="container">
          <div className="pb-head on-dark">
            <h2>Meet the owners</h2>
            <p>
              If someone&apos;s coming to work in your home, you should know who you&apos;re
              letting in. Get to know our owners and their backgrounds.
            </p>
          </div>
          <div className="pbo-grid">
            {site.owners.map((o) => (
              <figure key={o.name} className="pbo-card">
                <Image src={o.photo} alt={`${o.name}, ${o.role} at ${site.name}`} width={400} height={500} sizes="(max-width: 960px) 80vw, 360px" />
                <figcaption>
                  <strong>{o.name}</strong>
                  <span>{o.short}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="pbo-foot">
            <Link className="btn btn-gold" href="/our-team">Learn more about our team</Link>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="pbp">
        <div className="container">
          <div className="pb-head">
            <h2>What to expect</h2>
            <p>A free estimate, from first call to written number.</p>
          </div>
          <ol>
            {steps.map((st) => (
              <li key={st.t}>
                <strong>{st.t}</strong>
                <span>{st.d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews */}
      <section className="pbr">
        <div className="container">
          <div className="pb-head">
            <h2>What Homeowners Are Saying</h2>
          </div>
          <p className="pbr-src"><GoogleBadge /> Reviews from our Google Business Profile</p>
          <div className="pbr-grid">
            {reviews.map((r, i) => (
              <blockquote key={r.author} className={`pbr-q${i === 0 ? " is-feature" : ""}`}>
                <span className="pbr-mark" aria-hidden="true">&ldquo;</span>
                <p>{r.text}</p>
                <cite>— {r.author}, Google Review</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="pba">
        <div className="container">
          <div className="pb-head">
            <h2>Where we work</h2>
            <p>Remodeling for homeowners in these Palm Beach and Martin County communities.</p>
          </div>
          {["kitchen-remodeling", "bathroom-remodeling"].map((slug) => {
            const sv = serviceContent.find((x) => x.slug === slug)!;
            return (
              <div key={slug} className="pba-row">
                <h3>{sv.title}</h3>
                <div className="city-chips" style={{ justifyContent: "flex-start", marginTop: 0 }}>
                  {cities.map((c) => (
                    <Link key={c.slug} href={`/services/${slug}/${c.slug}`} className="chip chip-link">
                      {sv.shortTitle} in {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
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
