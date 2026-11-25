import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { reviews, site } from "@/lib/site";
import LanderVideo from "@/components/LanderVideo";
import "./estimate.css";

export const metadata: Metadata = {
  title: `Free Remodeling Estimate | ${site.name}`,
  description: `Request a free kitchen or bathroom remodeling estimate. One of the owners of ${site.name} will call you.`,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const choices = [
  { href: "/estimate/kitchen", label: "Kitchen Remodeling", src: "/img/lander/kitchen-full.jpg", alt: "Finished kitchen remodel by Palm Beach Renovations" },
  { href: "/estimate/bathroom", label: "Bathroom Remodeling", src: "/img/lander/hero-bathroom.jpg", alt: "Finished bathroom remodel by Palm Beach Renovations" },
];

const steps = [
  { t: "An owner calls you", d: "Michael, Adam or Tom calls to learn about your project and answer your questions." },
  { t: "We set a specific time", d: "We pick an exact time that works for you. No all-day arrival window." },
  { t: "We see it in person", d: "We look at the space with you, take measurements and talk through your ideas." },
  { t: "Your estimate follows", d: "We send your estimate shortly after the visit for you to review." },
];

const quotes = reviews.slice(0, 3);

export default function EstimatePage() {
  return (
    <main className="ld-root">
      <header className="ld-top">
        <Image src="/img/logo.webp" alt={site.name} width={120} height={69} priority />
        <a href={`tel:${site.phone}`} aria-label={`Call ${site.name} at ${site.phoneDisplay}`}>{site.phoneDisplay}</a>
      </header>

      <section className="ld-hero">
        <div className="ld-hero-in ld-solo">
          <div className="ld-stage">
            <LanderVideo src="/video/mike-hello.mp4" poster="/video/mike-hello.jpg" label="A hello from Mike, one of the owners" />
            <div className="ld-stage-text">
              <p className="ld-name"><strong>Mike Ullman</strong><span>Owner, Palm Beach Renovations</span></p>
              <h1>Thinking about remodeling your kitchen or bathroom?</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="ld-pick" aria-labelledby="ld-pick-h">
        <h2 id="ld-pick-h">What are you remodeling?</h2>
        <p>Pick one to start your free estimate. It only takes a couple of minutes.</p>
        <div className="ld-pick-grid">
          {choices.map((c) => (
            <Link key={c.href} href={c.href} className="ld-pick-card">
              <Image src={c.src} alt={c.alt} fill sizes="(max-width: 720px) 100vw, 400px" />
              <span>{c.label}<em>Start &rarr;</em></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="ld-sec ld-next" aria-labelledby="ld-next-h">
        <h2 id="ld-next-h">What happens after you send this</h2>
        <ol>
          {steps.map((s) => (
            <li key={s.t}><strong>{s.t}</strong><span>{s.d}</span></li>
          ))}
        </ol>
      </section>

      <section className="ld-sec ld-owners" aria-labelledby="ld-own-h">
        <h2 id="ld-own-h">Meet the owners</h2>
        <div className="ld-owner-grid">
          {site.owners.map((o) => (
            <figure key={o.name}>
              <Image src={o.photo} alt={`${o.name}, owner of ${site.name}`} width={600} height={900} sizes="(max-width: 700px) 40vw, 360px" />
              <figcaption>
                <strong>{o.name}</strong>
                <p>{o.bio}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="ld-sec ld-reviews" aria-labelledby="ld-rev-h">
        <h2 id="ld-rev-h">What homeowners say</h2>
        <div className="ld-rev-grid">
          {quotes.map((r) => (
            <blockquote key={r.author}>
              <p>&ldquo;{r.text}&rdquo;</p>
              <footer>{r.author}, Google review</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="ld-final">
        <h2>Ready to get started?</h2>
        <a className="ld-cta" href="#ld-pick-h">Choose my project</a>
        <p>Or call <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
      </section>

      <footer className="ld-foot">
        <p>&copy; {new Date().getFullYear()} {site.name}. Licensed and insured. Serving Palm Beach and Martin County, FL.</p>
        <p><a href="/privacy">Privacy policy</a></p>
      </footer>
    </main>
  );
}
