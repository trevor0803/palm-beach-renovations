"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/our-team", label: "Our Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="topbar">
        <span>Call us for your FREE Estimate!</span>
        <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
      </div>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <Image src="/img/logo.webp" alt={`${site.name} logo`} width={150} height={86} priority />
        </Link>
        <nav className={`nav ${open ? "is-open" : ""}`} aria-label="Primary">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <a className="btn nav-cta" href={`tel:${site.phone}`}>Get in touch</a>
        </nav>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
