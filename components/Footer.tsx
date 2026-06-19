import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { cities } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Image src="/img/logo.webp" alt={`${site.name} logo`} width={140} height={80} className="footer-logo" />
          <p>Licensed &amp; Insured · 25+ Years of Experience</p>
        </div>
        <div>
          <h3>Navigation</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/our-team">Our Team</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></li>
            <li>{site.hours}</li>
            <li>Palm Beach &amp; Martin County</li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3>Areas We Serve</h3>
          <ul className="footer-areas">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/services/kitchen-remodeling/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        {site.name} © {new Date().getFullYear()} · All rights reserved
      </div>
    </footer>
  );
}
