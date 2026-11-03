import type { Metadata } from "next";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaPixel from "@/components/MetaPixel";
import Analytics from "@/components/Analytics";
import localFont from "next/font/local";
import "./globals.css";
import "./polish.css";

const display = localFont({ src: "../public/fonts/fraunces-latin.woff2", weight: "500 700", variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Palm Beach Renovations | Home Remodeling in Palm Beach, FL",
    template: "%s | Palm Beach Renovations",
  },
  description: site.description,
  keywords: [
    "home renovation Palm Beach",
    "kitchen remodeling Palm Beach FL",
    "bathroom remodeling Palm Beach",
    "home improvement Royal Palm Beach",
    "remodeling contractor Martin County",
    "custom cabinetry Palm Beach",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: site.domain },
  verification: { google: "yYoVh81A0Xb6Fac8wMCiRTJmi8ftcWXADCxSLk8KRVE" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.domain,
    siteName: site.name,
    title: "Palm Beach Renovations | Home Remodeling in Palm Beach, FL",
    description: site.description,
    images: [{ url: "/og-home.jpg", width: 1200, height: 630, alt: "Finished kitchen remodel by Palm Beach Renovations" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm Beach Renovations | Home Remodeling in Palm Beach, FL",
    description: site.description,
    images: ["/og-home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
  },
};

// LocalBusiness structured data — critical for local SEO + rich results.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${site.domain}/#business`,
  name: site.name,
  image: [`${site.domain}/og-home.jpg`, `${site.domain}/icon-512.png`],
  logo: `${site.domain}/icon-512.png`,
  url: site.domain,
  telephone: site.phone,
  priceRange: "$$",
  description: site.description,
  areaServed: site.areaServed.map((a) => ({ "@type": "Place", name: a })),
  address: {
    "@type": "PostalAddress",
    addressRegion: "FL",
    addressCountry: "US",
    addressLocality: "Palm Beach",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  founder: site.owners.map((o) => ({ "@type": "Person", name: o.name })),
  sameAs: [site.social.google],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.domain}/#website`,
  url: site.domain,
  name: site.name,
  publisher: { "@id": `${site.domain}/#business` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <MetaPixel />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <div id="main">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
