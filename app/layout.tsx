import type { Metadata } from "next";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.domain,
    siteName: site.name,
    title: "Palm Beach Renovations | Home Remodeling in Palm Beach, FL",
    description: site.description,
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm Beach Renovations | Home Remodeling in Palm Beach, FL",
    description: site.description,
    images: ["/icon-512.png"],
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
  image: `${site.domain}/icon-512.png`,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
