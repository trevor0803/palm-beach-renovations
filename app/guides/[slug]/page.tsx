import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { guides, getGuide, type Block } from "@/lib/guides";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.summary,
    alternates: { canonical: `${site.domain}/guides/${g.slug}` },
    openGraph: {
      type: "article",
      title: g.metaTitle,
      description: g.summary,
      url: `${site.domain}/guides/${g.slug}`,
      publishedTime: g.published,
      modifiedTime: g.updated,
    },
  };
}

function renderBlock(b: Block, i: number) {
  switch (b.t) {
    case "h2":
      return <h2 key={i}>{b.text}</h2>;
    case "h3":
      return <h3 key={i}>{b.text}</h3>;
    case "ul":
      return (
        <ul key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside key={i} className="guide-callout">
          <p className="guide-callout-title">{b.title}</p>
          <p>{b.text}</p>
        </aside>
      );
    case "quote":
      return (
        <blockquote key={i} className="guide-quote">
          <p>{b.text}</p>
          <cite>{b.cite}</cite>
        </blockquote>
      );
    default:
      return <p key={i}>{b.text}</p>;
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const related = (g.related ?? []).map((s) => getGuide(s)).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.summary,
    datePublished: g.published,
    dateModified: g.updated,
    image: `${site.domain}${g.heroImage}`,
    mainEntityOfPage: `${site.domain}/guides/${g.slug}`,
    author: { "@type": "Organization", name: site.name, url: site.domain },
    publisher: { "@type": "Organization", name: site.name, url: site.domain },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${site.domain}/guides` },
      { "@type": "ListItem", position: 3, name: g.title, item: `${site.domain}/guides/${g.slug}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/guides">Guides</Link> <span>/</span> {g.title}
        </nav>
        <header className="page-head guide-head">
          <p className="guide-meta">{g.readingMinutes} min read · Updated {g.updated}</p>
          <h1>{g.title}</h1>
          <p className="guide-standfirst">{g.summary}</p>
        </header>
      </div>

      <div className="container">
        <div className="guide-hero">
          <Image src={g.heroImage} alt={g.title} width={1120} height={560} priority sizes="100vw" />
        </div>
      </div>

      <article className="container guide-body">{g.body.map(renderBlock)}</article>

      <section className="container section">
        <div className="guide-author">
          <p>
            <strong>Written by Palm Beach Renovations.</strong> Licensed and insured, 25+ years
            remodeling kitchens and bathrooms across Palm Beach and Martin County. Rules and
            requirements change — confirm anything specific with the building department covering
            your address, or ask us during a free estimate.
          </p>
          <div className="hero-cta">
            <a className="btn" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            <Link className="btn btn-outline" href="/contact">Request a Free Estimate</Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="band">
          <div className="container section">
            <h2 className="center">Keep reading</h2>
            <div className="guide-grid">
              {related.map((r) => (
                <article key={r!.slug} className="guide-card">
                  <div className="guide-card-body">
                    <p className="guide-meta">{r!.readingMinutes} min read</p>
                    <h3>
                      <Link href={`/guides/${r!.slug}`}>{r!.title}</Link>
                    </h3>
                    <p>{r!.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
