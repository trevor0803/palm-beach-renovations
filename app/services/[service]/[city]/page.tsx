import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";
import { serviceContent, cities } from "@/lib/content";
import ServiceBody from "@/components/ServiceBody";

export function generateStaticParams() {
  return serviceContent.flatMap((s) =>
    cities.map((c) => ({ service: s.slug, city: c.slug }))
  );
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
    title: `${s.title} in ${c.name}, FL`,
    description: `${s.title} in ${c.name}, ${c.county}. ${s.metaDescription}`,
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
  if (!s || !c) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.title,
    provider: { "@type": "GeneralContractor", name: site.name, telephone: site.phone, url: site.domain },
    areaServed: { "@type": "City", name: c.name, containedInPlace: { "@type": "AdministrativeArea", name: c.county } },
    description: `${s.title} in ${c.name}, ${c.county}, FL.`,
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

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/services">Services</Link> <span>/</span>{" "}
          <Link href={`/services/${s.slug}`}>{s.title}</Link> <span>/</span> {c.name}
        </nav>
        <header className="page-head">
          <h1>{s.title} in {c.name}, FL</h1>
          <p>{c.intro}</p>
        </header>
      </div>

      <div className="container">
        <ServiceBody service={s} cityName={c.name} />
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
          <Link href={`/services/${s.slug}`}>← All {s.title} services</Link>
        </p>
      </section>
    </main>
  );
}
