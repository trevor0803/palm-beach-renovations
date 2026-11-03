import { site } from "@/lib/site";

// Google cuts titles at roughly 60 characters. Keep the brand suffix only when it fits;
// otherwise drop it so the keywords are never the part that gets cut off.
export function fitTitle(base: string) {
  const withBrand = `${base} | ${site.name}`;
  return { absolute: withBrand.length <= 60 ? withBrand : base };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.domain}${it.path}`,
    })),
  };
}
