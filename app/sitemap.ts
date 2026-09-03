import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { serviceContent, cities, hasCityPages } from "@/lib/content";
import { guides } from "@/lib/guides";

// Every indexable route: 6 static pages, 5 guides, 5 service pages and the
// kitchen/bathroom service-by-city pages. /privacy is excluded because it is noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: site.domain, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: site.domain + "/services", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: site.domain + "/gallery", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: site.domain + "/our-team", lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: site.domain + "/contact", lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: site.domain + "/guides", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];
  for (const g of guides) {
    entries.push({
      url: site.domain + "/guides/" + g.slug,
      lastModified: new Date(g.updated),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const s of serviceContent) {
    entries.push({
      url: site.domain + "/services/" + s.slug,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
    if (!hasCityPages(s.slug)) continue;
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
