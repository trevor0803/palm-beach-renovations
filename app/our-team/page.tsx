import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the owners of Palm Beach Renovations. With 25+ years of combined experience, our team delivers quality home remodeling across Palm Beach and Martin County, FL.",
  alternates: { canonical: `${site.domain}/our-team` },
};

const bio =
  "A hands-on owner with a commitment to quality craftsmanship, clear communication, and finishing every project the right way.";

export default function TeamPage() {
  return (
    <main className="container">
      <header className="page-head">
        <h1>Meet Our Dedicated Team</h1>
        <p>
          If someone&apos;s coming to work in your home, you should know who you&apos;re
          letting in. Get to know the owners behind Palm Beach Renovations.
        </p>
      </header>

      <section className="team-grid team-grid-lg">
        {site.owners.map((o) => (
          <figure key={o.name} className="team-card">
            <Image src={o.photo} alt={`${o.name}, ${o.role} at ${site.name}`} width={400} height={600} />
            <figcaption>
              <strong>{o.name}</strong>
              <span>{o.role}</span>
              <p>{bio}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      <div className="cta-band">
        <p>Work with a team you can trust.</p>
        <a className="btn" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
      </div>
    </main>
  );
}
