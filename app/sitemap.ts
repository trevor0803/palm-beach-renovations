import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { serviceContent, cities } from "@/lib/content";

// Every indexable route: 5 static pages + 5 service pages + 5x15 service-by-city pages.
// /privacy is intentionally excluded because it is noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: site.domain, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: site.domain + "/services", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: site.domain + "/gallery", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: site.domain + "/our-team", lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: site.domain + "/contact", lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    ];
  for (const s of serviceContent) {
    entries.push({
      url: site.domain + "/services/" + s.slug,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
    for (const c of cities) {
      entries.push({
        url: site.domain + "/services/" + s.slug + "/" + c.slug,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }
  return entries;
}
