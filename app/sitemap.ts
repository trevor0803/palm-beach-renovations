import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/our-team", "/gallery", "/contact", "/privacy"];
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.domain}${r}`,
    lastModified: now,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/privacy" ? 0.3 : 0.8,
  }));
}
