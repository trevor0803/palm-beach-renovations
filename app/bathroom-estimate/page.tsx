import type { Metadata } from "next";
import { site } from "@/lib/site";
import BathroomQuiz from "@/components/BathroomQuiz";

// A paid-traffic and on-site funnel, not a search landing page: keep it out of the index.
export const metadata: Metadata = {
  title: { absolute: "Bathroom Wish List | Palm Beach Renovations" },
  description: "Check off what you want, pick your favorites, and get a free bathroom remodel estimate in Palm Beach and Martin County.",
  alternates: { canonical: `${site.domain}/bathroom-estimate` },
  robots: { index: false, follow: true },
};

export default function BathroomEstimatePage() {
  return (
    <main className="bq-page">
      <div className="container">
        <header className="bq-head">
          <p className="eyebrow eyebrow-dark">Free bathroom estimate</p>
          <h1>Build your bathroom wish list</h1>
          <p>Check what you want, tap your favorites. No typing, no pressure. We&apos;ll use your picks to build an accurate estimate.</p>
        </header>
        <BathroomQuiz />
      </div>
    </main>
  );
}
