// Service × city content. Each service has full unique copy; each city has a
// distinct intro so service×city pages don't read as duplicates.

export type ServiceContent = {
  slug: string;
  title: string;
  shortTitle: string;
  blurb: string;
  heroImage: string;
  metaDescription: string;
  intro: string;
  benefits: { heading: string; text: string }[];
  process: string[];
  faqs: { q: string; a: string }[];
};

export const serviceContent: ServiceContent[] = [
  {
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling",
    shortTitle: "Kitchens",
    blurb:
      "Custom cabinetry, countertops, tile, and layouts that turn your kitchen into the heart of the home.",
    heroImage: "/img/gallery/kitchen-remodel-1.jpg",
    metaDescription:
      "Expert kitchen remodeling in Palm Beach & Martin County, FL. Custom cabinets, countertops, islands, and lighting. Licensed, insured, free estimates. Call (561) 816-2496.",
    intro:
      "Your kitchen does more than any other room in the house — it cooks, hosts, and gathers your family. Palm Beach Renovations builds kitchens that look stunning and work even harder, from efficient single-wall layouts to wide-open islands made for entertaining. With 25+ years of experience, we handle the full remodel: cabinetry, countertops, backsplash, flooring, lighting, and the plumbing and electrical behind it all.",
    benefits: [
      { heading: "Custom Cabinetry", text: "Cabinets built and fitted to your space and storage habits — no wasted inches, no awkward fillers." },
      { heading: "Durable Countertops", text: "Quartz, granite, and solid-surface tops selected for the way Florida kitchens actually get used." },
      { heading: "Smart Layouts", text: "We rework the work triangle, add islands, and open sightlines so the room flows the way you live." },
      { heading: "Quality Finishes", text: "Tile, backsplash, and lighting installed to last — no shortcuts, no callbacks." },
    ],
    process: [
      "Free in-home consultation and measurements",
      "Design, material selection, and a clear written estimate",
      "Demolition and any structural, plumbing, or electrical work",
      "Cabinet, counter, tile, and fixture installation",
      "Final walkthrough and daily-clean handover",
    ],
    faqs: [
      { q: "How long does a kitchen remodel take?", a: "Most kitchens run 4–8 weeks depending on scope, custom cabinetry lead times, and any layout changes. We give you a realistic timeline up front and stick to it." },
      { q: "Can you work around my schedule?", a: "Yes. Many clients live in the home during the remodel, so we plan daily cleanup and protect the rest of your house throughout the project." },
      { q: "Do you offer free estimates?", a: "Always. We come out, measure, talk through your goals, and provide a clear written estimate at no cost." },
    ],
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    shortTitle: "Bathrooms",
    blurb:
      "From small powder rooms to spa-like master baths, finished on schedule with no shortcuts.",
    heroImage: "/img/gallery/bathroom-remodel-1.jpg",
    metaDescription:
      "Bathroom remodeling in Palm Beach & Martin County, FL. Walk-in showers, tile, vanities, and full master baths. Licensed, insured, free estimates. Call (561) 816-2496.",
    intro:
      "A well-built bathroom is part daily routine, part retreat. Palm Beach Renovations remodels everything from tight powder rooms to spa-style master suites — curbless walk-in showers, freestanding tubs, double vanities, and tile work that holds up to Florida humidity. We manage the waterproofing, plumbing, and ventilation correctly the first time, so the beautiful finishes you see are backed by the work you don't.",
    benefits: [
      { heading: "Walk-In & Curbless Showers", text: "Modern, accessible showers with proper slope, waterproofing, and tile detailing that lasts." },
      { heading: "Vanities & Storage", text: "Custom and semi-custom vanities sized to your space with the storage you actually need." },
      { heading: "Moisture-Smart Builds", text: "Correct waterproofing and ventilation to prevent the mold and rot common in humid climates." },
      { heading: "Tile Craftsmanship", text: "Floor-to-ceiling tile, niches, and accents installed with clean lines and lasting adhesion." },
    ],
    process: [
      "Free in-home consultation and measurements",
      "Design, fixture and tile selection, written estimate",
      "Demolition, waterproofing, plumbing, and electrical",
      "Tile, vanity, fixture, and glass installation",
      "Final walkthrough and cleanup",
    ],
    faqs: [
      { q: "How long does a bathroom remodel take?", a: "A typical bathroom runs 2–4 weeks. Master suites with custom tile and glass can take longer; we'll give you an exact timeline before we start." },
      { q: "Can you make my shower accessible?", a: "Yes — curbless entries, grab-bar blocking, benches, and handheld fixtures are all part of what we do." },
      { q: "Will you handle the plumbing and electrical?", a: "Yes. We coordinate licensed trades so the entire job is done to code under one accountable team." },
    ],
  },
  {
    slug: "custom-cabinetry",
    title: "Custom Cabinetry",
    shortTitle: "Cabinetry",
    blurb:
      "Built-to-fit cabinetry and storage solutions crafted for the way you live.",
    heroImage: "/img/gallery/kitchen-remodel-2.jpg",
    metaDescription:
      "Custom cabinetry in Palm Beach & Martin County, FL. Built-to-fit kitchen, bath, and built-in storage. Licensed, insured, free estimates. Call (561) 816-2496.",
    intro:
      "Stock cabinets fit a catalog; custom cabinets fit your home. Palm Beach Renovations designs and installs built-to-fit cabinetry for kitchens, baths, laundry rooms, offices, and living spaces — making use of every inch and matching the style of your home. Whether you want shaker simplicity or detailed millwork, we build storage that looks intentional and lasts for decades.",
    benefits: [
      { heading: "Built for Your Space", text: "Cabinetry designed around your room's exact dimensions — no fillers, no compromises." },
      { heading: "Material Choices", text: "A range of woods, finishes, and hardware to match your style and budget." },
      { heading: "Smart Storage", text: "Pull-outs, dividers, and built-ins designed around how you actually use the room." },
      { heading: "Seamless Installation", text: "Precise, level installs with finished detailing that reads as part of the house." },
    ],
    process: [
      "Free in-home consultation and measurements",
      "Design and material selection with written estimate",
      "Fabrication of your custom cabinetry",
      "Professional installation and finishing",
      "Final walkthrough",
    ],
    faqs: [
      { q: "Is custom cabinetry worth it over stock?", a: "When your space is irregular or you want specific storage and finishes, custom eliminates wasted space and gives a built-in, high-end look stock can't match." },
      { q: "What styles do you offer?", a: "Everything from clean shaker and flat-panel modern to traditional raised-panel and detailed millwork." },
      { q: "Do you do built-ins beyond the kitchen?", a: "Yes — entertainment centers, office built-ins, laundry storage, closets, and more." },
    ],
  },
  {
    slug: "tile-flooring",
    title: "Tile & Flooring",
    shortTitle: "Tile & Flooring",
    blurb:
      "Durable, beautiful tile and flooring installation that stands the test of time.",
    heroImage: "/img/gallery/bathroom-remodel-2.jpg",
    metaDescription:
      "Tile and flooring installation in Palm Beach & Martin County, FL. Porcelain, ceramic, luxury vinyl, and more. Licensed, insured, free estimates. Call (561) 816-2496.",
    intro:
      "Flooring sets the tone for the whole house, and in Florida it has to handle sand, humidity, and heavy traffic. Palm Beach Renovations installs porcelain and ceramic tile, large-format tile, luxury vinyl plank, and more — with proper subfloor prep and leveling so the finished floor lies flat and lasts. From a single room to a whole-home refresh, we deliver clean grout lines and durable results.",
    benefits: [
      { heading: "Tile Expertise", text: "Porcelain, ceramic, and large-format tile installed with proper prep and crisp grout lines." },
      { heading: "Luxury Vinyl & More", text: "Waterproof LVP and other modern floors ideal for Florida homes and busy households." },
      { heading: "Proper Subfloor Prep", text: "Leveling and moisture control that prevent cracking, lifting, and hollow spots later." },
      { heading: "Clean, Lasting Results", text: "Detailed transitions, trim, and finishing for a floor that looks built-in, not bolted-on." },
    ],
    process: [
      "Free in-home consultation and measurements",
      "Material selection and written estimate",
      "Removal of old flooring and subfloor prep",
      "Tile or flooring installation",
      "Grouting, sealing, and final cleanup",
    ],
    faqs: [
      { q: "What flooring is best for Florida homes?", a: "Porcelain tile and waterproof luxury vinyl are popular for their durability against humidity, sand, and heavy use. We'll help you weigh look, feel, and budget." },
      { q: "Can you match existing flooring?", a: "In many cases yes. We'll assess your current floor and recommend the closest match or a clean transition." },
      { q: "Do you remove the old floor?", a: "Yes, removal, disposal, and subfloor prep are all part of the job." },
    ],
  },
  {
    slug: "home-additions",
    title: "Home Additions & Remodels",
    shortTitle: "Additions",
    blurb:
      "Bedrooms, living spaces, and full-home remodels that add value and function.",
    heroImage: "/img/gallery/home-renovation-1.jpg",
    metaDescription:
      "Home additions and full remodels in Palm Beach & Martin County, FL. Room additions, open-concept conversions, and whole-home renovation. Free estimates. Call (561) 816-2496.",
    intro:
      "Sometimes a refresh isn't enough — you need more space or a fundamentally better layout. Palm Beach Renovations handles room additions, open-concept conversions, and full-home remodels that add real square footage and market value. We manage the project end to end, from design and permitting through framing, finishes, and final inspection, so a complex job stays organized and on schedule.",
    benefits: [
      { heading: "Room Additions", text: "Bedrooms, family rooms, and expanded living space built to blend with your existing home." },
      { heading: "Open-Concept Conversions", text: "Removing walls and reworking layouts to create the open, connected spaces buyers want." },
      { heading: "Whole-Home Remodels", text: "Coordinated, multi-room renovations managed under one accountable team." },
      { heading: "Value That Lasts", text: "Quality construction and finishes that raise both how your home lives and what it's worth." },
    ],
    process: [
      "Free in-home consultation and project scoping",
      "Design, permitting, and a detailed written estimate",
      "Framing, structural, mechanical, and rough-in work",
      "Finishes, fixtures, and detailing",
      "Final inspection and walkthrough",
    ],
    faqs: [
      { q: "Do you handle permits?", a: "Yes. We manage permitting and inspections as part of larger additions and remodels so the work is fully to code." },
      { q: "Can you remodel while we live in the home?", a: "Often yes, with phased work and daily cleanup. For larger projects we'll discuss the most practical approach for your family." },
      { q: "How do additions affect home value?", a: "Well-executed additions and open layouts typically add both usable space and resale value, though results vary by home and market." },
    ],
  },
];

export type City = {
  slug: string;
  name: string;
  county: string;
  intro: string;
};

export const cities: City[] = [
  { slug: "palm-beach", name: "Palm Beach", county: "Palm Beach County",
    intro: "Renovating Palm Beach's historic estates and oceanfront residences with the craftsmanship and discretion the island expects." },
  { slug: "west-palm-beach", name: "West Palm Beach", county: "Palm Beach County",
    intro: "Serving West Palm Beach homeowners from historic El Cid and Flamingo Park bungalows to waterfront condos along the Intracoastal." },
  { slug: "boynton-beach", name: "Boynton Beach", county: "Palm Beach County",
    intro: "Updating Boynton Beach homes from established mainland neighborhoods to the area's many gated and waterfront communities." },
  { slug: "wellington", name: "Wellington", county: "Palm Beach County",
    intro: "Remodeling Wellington's equestrian estates and family homes with finishes suited to the village's upscale, active lifestyle." },
  { slug: "jupiter", name: "Jupiter", county: "Palm Beach County",
    intro: "Renovating Jupiter's coastal and Abacoa-area homes with finishes built to stand up to salt air and an active outdoor lifestyle." },
  { slug: "palm-beach-gardens", name: "Palm Beach Gardens", county: "Palm Beach County",
    intro: "Remodeling Palm Beach Gardens homes across PGA National, Mirasol, and the area's established golf and gated communities." },
  { slug: "north-palm-beach", name: "North Palm Beach", county: "Palm Beach County",
    intro: "Bringing quality remodeling to North Palm Beach's waterfront and village homes near the Intracoastal and golf communities." },
  { slug: "tequesta", name: "Tequesta", county: "Palm Beach County",
    intro: "Renovating Tequesta's riverfront and village homes with a focus on coastal-ready, lasting finishes." },
  { slug: "boca-raton", name: "Boca Raton", county: "Palm Beach County",
    intro: "Updating Boca Raton homes from Mizner-era residences to the city's many luxury gated and country-club communities." },
  { slug: "royal-palm-beach", name: "Royal Palm Beach", county: "Palm Beach County",
    intro: "Helping Royal Palm Beach families update the spacious, family-friendly homes that define this western Palm Beach County village." },
  { slug: "manalapan", name: "Manalapan", county: "Palm Beach County",
    intro: "Renovating Manalapan's oceanfront and Intracoastal estates with meticulous craftsmanship and a respect for privacy." },
  { slug: "jupiter-island", name: "Jupiter Island", county: "Martin County",
    intro: "Delivering estate-caliber renovations on Jupiter Island, where oceanfront homes demand the highest standard of craftsmanship." },
  { slug: "sewalls-point", name: "Sewall's Point", county: "Martin County",
    intro: "Remodeling Sewall's Point's waterfront peninsula homes with finishes built for the Treasure Coast's boating lifestyle." },
  { slug: "palm-city", name: "Palm City", county: "Martin County",
    intro: "Serving Palm City's established neighborhoods and acreage homes with renovations tailored to Martin County living." },
  { slug: "stuart", name: "Stuart", county: "Martin County",
    intro: "Bringing quality remodeling to Stuart and the Treasure Coast, from downtown cottages to riverfront and golf-community homes." },
];
