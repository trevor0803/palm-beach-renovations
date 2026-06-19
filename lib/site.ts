// Central place for all business info. Update here and it propagates site-wide.
export const site = {
  name: "Palm Beach Renovations",
  shortName: "Palm Beach Renovations",
  domain: "https://palmbeachreno.com",
  phone: "+15618162496",
  phoneDisplay: "(561) 816-2496",
  email: "info@palmbeachreno.com", // update if different
  hours: "Mon–Fri, 8am–6pm",
  areaServed: ["Palm Beach County", "Martin County", "Royal Palm Beach", "West Palm Beach", "Jupiter", "Stuart"],
  geo: { lat: 26.7056, lng: -80.0364 }, // Palm Beach county center; refine to office address
  description:
    "Expert home renovation and remodeling in Palm Beach and Martin County, FL. Kitchens, bathrooms, custom cabinetry, and tile flooring. Licensed, insured, 25+ years experience. Free estimates.",
  owners: [
    { name: "Michael Ullman", role: "Owner", photo: "/img/team-michael.webp" },
    { name: "Adam Mayer", role: "Owner", photo: "/img/team-adam.webp" },
    { name: "Thomas Callahan", role: "Owner", photo: "/img/team-thomas.webp" },
  ],
  social: {
    google:
      "https://www.google.com/maps/place/Palm+Beach+Renovations",
  },
};

export const services = [
  {
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling",
    blurb:
      "Custom cabinetry, countertops, tile, and layouts that turn your kitchen into the heart of the home.",
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    blurb:
      "From small powder rooms to spa-like master baths, finished on schedule with no shortcuts.",
  },
  {
    slug: "custom-cabinetry",
    title: "Custom Cabinetry",
    blurb:
      "Built-to-fit cabinetry and storage solutions crafted for the way you live.",
  },
  {
    slug: "tile-flooring",
    title: "Tile & Flooring",
    blurb:
      "Durable, beautiful tile and flooring installation that stands the test of time.",
  },
  {
    slug: "home-additions",
    title: "Home Additions & Remodels",
    blurb:
      "Bedrooms, living spaces, and full-home remodels that add value and function.",
  },
];

export const reviews = [
  { author: "Mary G.", text: "No matter what day of the week, they always got back to me quickly, which gave me peace of mind throughout the process." },
  { author: "Sharon P.", text: "Great communication, always on time, no shortcuts, finished the job ahead of schedule and did a beautiful job!" },
  { author: "Jake A.", text: "They were incredibly accommodating with change requests. The countertops and tile work are absolute standouts." },
  { author: "Jessica F.", text: "Adam and his team provided so much guidance and walked us through the entire process. Turned out incredible!" },
  { author: "Elizabeth D.", text: "The quality of their craftsmanship was truly impressive. We wouldn't hesitate to recommend them." },
  { author: "Noel W.", text: "Professional, communicative, and stuck to the timeline they promised. Couldn't be happier." },
];
