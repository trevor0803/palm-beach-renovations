import type { Metadata } from "next";
import { site } from "@/lib/site";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse completed kitchen, bathroom, and home renovation projects by Palm Beach Renovations in Palm Beach and Martin County, FL.",
  alternates: { canonical: `${site.domain}/gallery` },
};

export default function GalleryPage() {
  return (
    <main className="container">
      <header className="page-head">
        <h1>Project Gallery</h1>
        <p>
          A look at completed kitchen, bathroom, and full-home renovations across Palm Beach
          and Martin County. New projects added regularly.
        </p>
      </header>

      <GalleryGrid />

      <div className="cta-band">
        <p>Like what you see? Let&apos;s talk about your project.</p>
        <a className="btn" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
      </div>
    </main>
  );
}
