import Link from "next/link";
import { site } from "@/lib/site";
import type { ServiceContent } from "@/lib/content";

export default function ServiceBody({
  service,
  cityName,
}: {
  service: ServiceContent;
  cityName?: string;
}) {
  const where = cityName ? ` in ${cityName}` : " in Palm Beach & Martin County";
  return (
    <>
      <section className="service-intro section">
        <p className="intro">{service.intro}</p>
      </section>

      <section className="band">
        <div className="container section">
          <h2 className="center">Why Homeowners{where} Choose Us</h2>
          <div className="service-grid">
            {service.benefits.map((b) => (
              <div key={b.heading} className="service-card" style={{ cursor: "default" }}>
                <h3>{b.heading}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <h2 className="center">Our Process</h2>
        <ol className="process-list">
          {service.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="band">
        <div className="container section">
          <h2 className="center">Frequently Asked Questions</h2>
          <div className="faq-list">
            {service.faqs.map((f) => (
              <details key={f.q} className="faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="container section center">
          <h2>Ready to Start Your {service.title} Project?</h2>
          <p>Get a free, no-pressure estimate{cityName ? ` for your ${cityName} home` : ""}.</p>
          <div className="hero-cta center">
            <a className="btn" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            <Link className="btn btn-outline" href="/contact">Request an Estimate</Link>
          </div>
        </div>
      </section>
    </>
  );
}
