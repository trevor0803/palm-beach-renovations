import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { reviews, site } from "@/lib/site";
import { landers } from "@/lib/landers";
import LanderSurvey from "@/components/LanderSurvey";
import "../estimate.css";

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return Object.keys(landers).map((service) => ({ service }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const l = landers[service];
  if (!l) return {};
  return {
    title: `${l.service} Remodeling Estimate | ${site.name}`,
    description: `Request your ${l.service.toLowerCase()} remodeling estimate. One of the owners of ${site.name} will call you.`,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

const steps = [
  { t: "An owner calls you", d: "Michael, Adam or Tom calls to learn about your project and answer your questions." },
  { t: "We set a specific time", d: "We pick an exact time that works for you. No all-day arrival window." },
  { t: "We see it in person", d: "We look at the space with you, take measurements and talk through your ideas." },
  { t: "Your estimate follows", d: "We send your estimate shortly after the visit for you to review." },
];

export default async function LanderPage({ params }: Props) {
  const { service } = await params;
  const l = landers[service];
  if (!l) notFound();
  const quotes = l.reviewAuthors.map((a) => reviews.find((r) => r.author === a)).filter((r): r is (typeof reviews)[number] => !!r);

  return (
    <main className="ld-root">
      <header className="ld-top">
        <Image src="/img/logo.webp" alt={site.name} width={120} height={69} priority />
        <a href={`tel:${site.phone}`} aria-label={`Call ${site.name} at ${site.phoneDisplay}`}>{site.phoneDisplay}</a>
      </header>

      <section className="ld-hero">
        <Image src={l.hero.src} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: l.hero.position }} aria-hidden="true" />
        <div className="ld-hero-shade" aria-hidden="true" />
        <div className="ld-hero-in">
          <div className="ld-hero-copy">
            <h1>{l.headline}</h1>
            <p>{l.sub}</p>
            <ul className="ld-facts">
              <li>Licensed and insured</li>
              <li>Serving Palm Beach and Martin County</li>
              <li>Owner-led, from first call to final walkthrough</li>
            </ul>
          </div>
          <LanderSurvey lander={l} />
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
        <h2 id="ld-own-h">The three owners who will be on your project</h2>
        <div className="ld-owner-grid">
          {site.owners.map((o) => (
            <figure key={o.name}>
              <Image src={o.photo} alt={`${o.name}, owner of ${site.name}`} width={600} height={900} sizes="(max-width: 700px) 100vw, 360px" />
              <figcaption>
                <strong>{o.name}</strong>
                <p>{o.bio}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="ld-sec ld-work" aria-labelledby="ld-work-h">
        <h2 id="ld-work-h">{l.workTitle}</h2>
        <div className="ld-grid">
          {l.work.map((w) => (
            <Image key={w.src} src={w.src} alt={w.alt} width={640} height={640} sizes="(max-width: 700px) 50vw, 320px" />
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
        <h2>Ready to talk about your {l.service.toLowerCase()}?</h2>
        <a className="ld-cta" href="#start">Start my estimate</a>
        <p>Or call <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
      </section>

      <footer className="ld-foot">
        <p>&copy; {new Date().getFullYear()} {site.name}. Licensed and insured. Serving Palm Beach and Martin County, FL.</p>
        <p><a href="/privacy">Privacy policy</a></p>
      </footer>
    </main>
  );
}
