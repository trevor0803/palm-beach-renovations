import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import BathroomQuiz from "@/components/BathroomQuiz";

// A paid-traffic funnel, not a search landing page: noindex, not in the sitemap, not linked from the site.
export const metadata: Metadata = {
  title: { absolute: "Bathroom Wish List | Palm Beach Renovations" },
  description: "Check off what you want, pick your favorites, and get a free bathroom remodel estimate in Palm Beach and Martin County.",
  alternates: { canonical: `${site.domain}/bathroom-estimate` },
  robots: { index: false, follow: false },
};

export default function BathroomEstimatePage() {
  return (
    <main className="bq-page">
      <section className="bq-hero">
        <Image src="/img/gallery/bathroom-marble-shower-and-tub.jpg" alt="" fill priority sizes="100vw" className="bq-hero-img" />
        <div className="bq-hero-shade" aria-hidden="true" />
        <div className="container bq-hero-inner">
          <p className="bq-eyebrow">Palm Beach Renovations · Bathroom Collection</p>
          <h1>Design the bathroom <em>you&apos;ve been dreaming of</em></h1>
          <p className="bq-hero-sub">Choose your favorites in a few taps. Quick, easy, no pressure. We&apos;ll turn your picks into an accurate, free estimate.</p>
          <ul className="bq-hero-points">
            <li>Free estimate</li>
            <li>Licensed &amp; insured</li>
            <li>Owner-led team</li>
          </ul>
        </div>
      </section>
      <div className="container bq-wrap">
        <BathroomQuiz />
      </div>
    </main>
  );
}
