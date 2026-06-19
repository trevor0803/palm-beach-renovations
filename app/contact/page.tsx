import type { Metadata } from "next";
import { site, services } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Palm Beach Renovations for a free home remodeling estimate in Palm Beach and Martin County, FL. Call (561) 816-2496 or send us a message.",
  alternates: { canonical: `${site.domain}/contact` },
};

export default function ContactPage() {
  return (
    <main className="container">
      <header className="page-head">
        <h1>Transform Your Space With Us Today</h1>
        <p>Connect with us through the form below or give us a call. We&apos;ll get right back to you.</p>
      </header>

      <div className="contact-layout">
        <ContactForm serviceOptions={services.map((s) => s.title)} />
        <aside className="contact-info">
          <h2>Get in Touch</h2>
          <p><strong>Phone:</strong> <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
          <p><strong>Hours:</strong> {site.hours}</p>
          <p><strong>Service Area:</strong> Palm Beach &amp; Martin County, FL</p>
          <a className="btn" href={`tel:${site.phone}`}>Call for a Free Estimate</a>
        </aside>
      </div>
    </main>
  );
}
