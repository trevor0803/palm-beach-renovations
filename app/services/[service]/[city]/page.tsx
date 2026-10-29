import { fitTitle } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";
import { serviceContent, cities, CITY_SERVICES } from "@/lib/content";
import ServiceBody from "@/components/ServiceBody";
import QuickEstimate from "@/components/QuickEstimate";
import Image from "next/image";
import { gallery } from "@/lib/gallery";
import { hash, rotate } from "@/lib/proof";

export function generateStaticParams() {
  // Only kitchens and bathrooms get city pages — see CITY_SERVICES in lib/content.
  return serviceContent
    .filter((s) => (CITY_SERVICES as readonly string[]).includes(s.slug))
    .flatMap((s) => cities.map((c) => ({ service: s.slug, city: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}): Promise<Metadata> {
  const { service, city } = await params;
  const s = serviceContent.find((x) => x.slug === service);
  const c = cities.find((x) => x.slug === city);
  if (!s || !c) return {};
  return {
    title: fitTitle(`${s.title} in ${c.name}, FL`),
    description: `${s.title} in ${c.name}, FL. Licensed and insured, 25+ years of experience, free estimates. Call ${site.phoneDisplay}.`,
    alternates: { canonical: `${site.domain}/services/${s.slug}/${c.slug}` },
    openGraph: {
      title: `${s.title} in ${c.name}, FL | ${site.name}`,
      description: `Professional ${s.title.toLowerCase()} for ${c.name} homeowners. Free estimates.`,
      url: `${site.domain}/services/${s.slug}/${c.slug}`,
      type: "website",
    },
  };
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}) {
  const { service, city } = await params;
  const s = serviceContent.find((x) => x.slug === service);
  const c = cities.find((x) => x.slug === city);
  if (!s || !c || !(CITY_SERVICES as readonly string[]).includes(s.slug)) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.title,
    provider: { "@type": "GeneralContractor", name: site.name, telephone: site.phone, url: site.domain },
    areaServed: { "@type": "City", name: c.name, containedInPlace: { "@type": "AdministrativeArea", name: c.county } },
    description: `${s.title} in ${c.name}, ${c.county}, FL.`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.domain}/services` },
      { "@type": "ListItem", position: 3, name: s.title, item: `${site.domain}/services/${s.slug}` },
      { "@type": "ListItem", position: 4, name: c.name, item: `${site.domain}/services/${s.slug}/${c.slug}` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const otherCities = cities.filter((x) => x.slug !== c.slug);
  const category = s.slug === "bathroom-remodeling" ? "Bathroom" : "Kitchen";
  // A different project photo per city, offset from the proof strip below so they never repeat on one page.
  const heroPhoto = rotate(
    // Only the described showcase shots (not the numbered "remodel-N" snapshots) make a good header photo.
    gallery.filter((g) => g.category === category && !/-remodel-\d+\./.test(g.src)),
    hash(`${s.slug}:${c.slug}`) + 5,
    1
  )[0];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/services">Services</Link> <span>/</span>{" "}
          <Link href={`/services/${s.slug}`}>{s.title}</Link> <span>/</span> {c.name}
        </nav>
        <header className="page-hero">
          <div className="page-hero-copy">
            <h1>{s.title} in {c.name}, FL</h1>
            <p className="page-hero-intro">{c.intro}</p>
            <p className="trust-line">
              <strong>Licensed &amp; Insured</strong> · 25+ Years of Experience · Free Estimates
            </p>
            <div className="hero-cta hero-cta-left">
              <a className="btn" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
              <Link className="btn btn-outline" href="/gallery">See our projects</Link>
            </div>
            {heroPhoto && (
              <Image
                className="page-hero-photo"
                src={heroPhoto.src}
                alt={`${s.title} project by ${site.name}, serving ${c.name}`}
                width={760}
                height={440}
                sizes="(max-width: 860px) 100vw, 560px"
                priority
              />
            )}
          </div>
          <div className="page-hero-form">
            <QuickEstimate
              source={`website-${s.slug}-${c.slug}`}
              tag="city-page-form"
              heading={`Free ${s.title.toLowerCase()} estimate in ${c.name}`}
              defaultService={s.title}
            />
          </div>
        </header>
      </div>

      <div className="container">
        <ServiceBody service={s} cityName={c.name} cityDetail={c.detail} hideTopCta excludeSrc={heroPhoto?.src} />
      </div>

      <section className="container section">
        <h2 className="center">{s.shortTitle} in Nearby Areas</h2>
        <div className="city-chips">
          {otherCities.map((o) => (
            <Link key={o.slug} href={`/services/${s.slug}/${o.slug}`} className="chip chip-link">
              {s.shortTitle} in {o.name}
            </Link>
          ))}
        </div>
        <p className="center" style={{ marginTop: "1.5rem" }}>
          <Link className="service-back-link" href={`/services/${s.slug}`}>← All {s.title} services</Link>
        </p>
      </section>
    </main>
  );
}
