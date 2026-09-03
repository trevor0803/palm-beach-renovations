import type { NextConfig } from "next";

// Cities and services the site used to publish a page for. Sept 2026: the
// service x city matrix was cut from 75 pages to 20 (kitchens and bathrooms
// only, in ten real markets). Everything retired below 301s to the service
// page so nothing that was indexed lands on a 404.
const RETIRED_CITIES = [
  "north-palm-beach",
  "tequesta",
  "manalapan",
  "jupiter-island",
  "sewalls-point",
];
const LIVE_CITIES = [
  "west-palm-beach",
  "palm-beach",
  "royal-palm-beach",
  "wellington",
  "boynton-beach",
  "boca-raton",
  "jupiter",
  "palm-beach-gardens",
  "stuart",
  "palm-city",
];
const CITY_SERVICES = ["kitchen-remodeling", "bathroom-remodeling"];
const NON_CITY_SERVICES = ["custom-cabinetry", "tile-flooring", "home-additions"];

function retiredCityPages() {
  const out: { source: string; destination: string; permanent: true }[] = [];
  // Services that no longer have city pages at all.
  for (const service of NON_CITY_SERVICES) {
    for (const city of [...LIVE_CITIES, ...RETIRED_CITIES]) {
      out.push({
        source: `/services/${service}/${city}`,
        destination: `/services/${service}`,
        permanent: true,
      });
    }
  }
  // Cities we no longer publish, for the services that kept city pages.
  for (const service of CITY_SERVICES) {
    for (const city of RETIRED_CITIES) {
      out.push({
        source: `/services/${service}/${city}`,
        destination: `/services/${service}`,
        permanent: true,
      });
    }
  }
  return out;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/webp"] },
  async redirects() {
    return retiredCityPages();
  },
};

export default nextConfig;
