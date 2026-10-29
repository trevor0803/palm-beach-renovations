import { site } from "@/lib/site";

// Google cuts titles at roughly 60 characters. Keep the brand suffix only when it fits;
// otherwise drop it so the keywords are never the part that gets cut off.
export function fitTitle(base: string) {
  const withBrand = `${base} | ${site.name}`;
  return { absolute: withBrand.length <= 60 ? withBrand : base };
}
