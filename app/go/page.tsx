import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { reviews, site } from "@/lib/site";
import EstimateFunnel from "@/components/EstimateFunnel";
import "./go.css";

export const metadata: Metadata = {
  title: "Free Home Renovation Estimate",
  description:
    "Tell us about your renovation and request a free, no-obligation estimate from a local, licensed and insured Palm Beach remodeling team.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const projectPhotos = [
  { src: "/img/gallery/kitchen-navy-white-island.jpg", alt: "Completed navy and white kitchen renovation", label: "Kitchen Remodeling" },
  { src: "/img/gallery/bathroom-marble-walk-in-shower.jpg", alt: "Completed marble walk-in shower renovation", label: "Bathroom Remodeling" },
  { src: "/img/gallery/home-renovation-4.jpg", alt: "Completed Palm Beach home renovation", label: "Whole-Home Renovations" },
];

export default function GoPage() {
  return (
    <main className="lp-root">
      <header className="lp-topbar">
        <Image src="/img/logo.webp" alt={site.name} width={150} height={86} priority />
        <div className="lp-topbar-call">
          <span>Prefer to talk?</span>
          <a href={`tel:${site.phone}`} aria-label={`Call ${site.name} at ${site.phoneDisplay}`}>
            <span aria-hidden="true">☎</span> {site.phoneDisplay}
          </a>
        </div>
      </header>

      <section className="lp-hero">
        <div className="lp-hero-photo" aria-hidden="true">
          <Image
            src="/img/gallery/kitchen-navy-white-island.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
          <div className="lp-photo-badge"><strong>Real local work.</strong> Real local team.</div>
        </div>

        <div className="lp-hero-content">
          <div className="lp-copy">
            <p className="lp-eyebrow">Palm Beach &amp; Martin County Homeowners</p>
            <h1>Ready to Love Your Home Again?</h1>
            <p className="lp-lede">
              Get a thoughtful renovation plan, quality craftsmanship, and clear communication
              from a local team that treats your home like it matters.
            </p>
            <ul className="lp-trust-list" aria-label="Why choose Palm Beach Renovations">
              <li><span>✓</span> Free, no-obligation estimate</li>
              <li><span>✓</span> Licensed &amp; insured</li>
              <li><span>✓</span> 25+ years of experience</li>
            </ul>
          </div>

          <EstimateFunnel />
        </div>
      </section>

      <section className="lp-proof" aria-label="Company highlights">
        <div><strong>25+</strong><span>Years of experience</span></div>
        <div><strong>Local</strong><span>Palm Beach &amp; Martin County</span></div>
        <div><strong>Free</strong><span>No-obligation estimates</span></div>
        <div><strong>Direct</strong><span>Communication with our team</span></div>
      </section>

      <section className="lp-section lp-reviews">
        <p className="lp-kicker">HOMEOWNER REVIEWS</p>
        <h2>Craftsmanship is important. So is how you&apos;re treated.</h2>
        <div className="lp-review-grid">
          {reviews.slice(0, 3).map((review) => (
            <blockquote key={review.author}>
              <div className="lp-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p>&ldquo;{review.text}&rdquo;</p>
              <cite>{review.author} · Google Review</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="lp-work">
        <div className="lp-section">
          <p className="lp-kicker">RECENT PROJECTS</p>
          <h2>Picture what&apos;s possible in your home.</h2>
          <div className="lp-work-grid">
            {projectPhotos.map((photo) => (
              <figure key={photo.src}>
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 100vw, 33vw" />
                <figcaption>{photo.label}</figcaption>
              </figure>
            ))}
          </div>
          <a className="lp-btn lp-inline-btn" href="#estimate">Start My Free Estimate</a>
        </div>
      </section>

      <section className="lp-section lp-team">
        <div className="lp-team-copy">
          <p className="lp-kicker">KNOW WHO YOU&apos;RE HIRING</p>
          <h2>A local team you can feel comfortable inviting into your home.</h2>
          <p>
            Renovations are personal. That&apos;s why communication, reliability, and respect are
            part of every project—not extras.
          </p>
          <a href="#estimate">Tell us about your project →</a>
        </div>
        <div className="lp-owners-row">
          {site.owners.map((owner) => (
            <figure key={owner.name}>
              <Image src={owner.photo} alt={`${owner.name}, ${owner.role}`} width={220} height={330} />
              <figcaption><strong>{owner.name}</strong><span>{owner.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="lp-final">
        <p className="lp-kicker">YOUR HOME. YOUR VISION.</p>
        <h2>Let&apos;s talk about your renovation.</h2>
        <p>Answer a few quick questions and we&apos;ll contact you about a free estimate.</p>
        <a className="lp-btn" href="#estimate">Get My Free Estimate</a>
        <a className="lp-final-phone" href={`tel:${site.phone}`}>or call {site.phoneDisplay}</a>
      </section>

      <footer className="lp-footer">
        <Image src="/img/logo.webp" alt={site.name} width={120} height={69} />
        <p>Licensed &amp; Insured · Serving Palm Beach &amp; Martin County</p>
        <p>© {new Date().getFullYear()} {site.name} · <Link href="/privacy">Privacy Policy</Link></p>
      </footer>

      <nav className="lp-mobile-bar" aria-label="Contact options">
        <a href={`tel:${site.phone}`} className="lp-mobile-call">Call Now</a>
        <a href="#estimate" className="lp-mobile-estimate">Free Estimate</a>
      </nav>
    </main>
  );
}
