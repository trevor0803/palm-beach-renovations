import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { serviceContent, cities } from "@/lib/content";
import ServiceBody from "@/components/ServiceBody";

export function generateStaticParams() {
  return serviceContent.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const s = serviceContent.find((x) => x.slug === service);
  if (!s) return {};
  return {
    title: `${s.title} in Palm Beach & Martin County`,
    description: s.metaDescription,
    alternates: { canonical: `${site.domain}/services/${s.slug}` },
    openGraph: {
      title: `${s.title} | ${site.name}`,
      description: s.metaDescription,
      url: `${site.domain}/services/${s.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = serviceContent.find((x) => x.slug === service);
  if (!s) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.title,
    provider: { "@type": "GeneralContractor", name: site.name, telephone: site.phone, url: site.domain },
    areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
    description: s.metaDescription,
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

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/services">Services</Link> <span>/</span> {s.title}
        </nav>
      </div>

      <section className="service-banner">
        <Image
          src={s.heroImage}
          alt={`${s.title} by ${site.name}`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="service-banner-overlay" aria-hidden="true" />
        <div className="container service-banner-inner">
          <h1>{s.title} in Palm Beach &amp; Martin County, FL</h1>
          <p>{s.blurb}</p>
        </div>
      </section>

      <div className="container">
        <ServiceBody service={s} />
      </div>

      <section className="container section">
        <h2 className="center">{s.title} by City</h2>
        <div className="city-chips">
          {cities.map((c) => (
            <Link key={c.slug} href={`/services/${s.slug}/${c.slug}`} className="chip chip-link">
              {s.shortTitle} in {c.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
