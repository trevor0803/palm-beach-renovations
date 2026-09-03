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
    heroImage: "/img/gallery/kitchen-navy-white-island.jpg",
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
    heroImage: "/img/gallery/bathroom-marble-walk-in-shower.jpg",
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
    heroImage: "/img/gallery/kitchen-gray-woodgrain-cabinets.jpg",
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
    heroImage: "/img/gallery/tile-flooring-installation.jpg",
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
    heroImage: "/img/gallery/home-renovation-4.jpg",
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
  /** Genuinely local detail — the reason this page deserves to exist. */
  detail: string[];
};

/**
 * Only these services get city pages. Kitchens and bathrooms are the two with real
 * "service + city" search demand; cabinetry, flooring and additions are served by
 * their single service page instead of 15 near-identical variants each.
 */
export const CITY_SERVICES = ["kitchen-remodeling", "bathroom-remodeling"] as const;

export function hasCityPages(serviceSlug: string) {
  return (CITY_SERVICES as readonly string[]).includes(serviceSlug);
}

export const cities: City[] = [
  {
    slug: "west-palm-beach",
    name: "West Palm Beach",
    county: "Palm Beach County",
    intro:
      "Serving West Palm Beach homeowners from the historic bungalows of El Cid and Flamingo Park to waterfront condos along the Intracoastal.",
    detail: [
      "West Palm Beach has the widest spread of housing stock anywhere in the county, and a kitchen or bathroom here can mean two completely different projects depending on the street. In El Cid, Flamingo Park and Northwood, you are usually working inside a 1920s Mediterranean Revival or frame vernacular house: plaster over masonry or lath, original casement windows, cast-iron drain lines, and rooms that were laid out when kitchens were service spaces at the back of the house rather than the middle of family life.",
      "Those houses reward opening things up, but the walls have to be checked first. We locate what is structural before we price a layout change, because in a house of that era the wall between a small kitchen and the dining room is often carrying load. Cast-iron waste lines are the other common surprise — once a wall is open, replacing brittle drain line while it is accessible costs far less than coming back for it later.",
      "Move east to the downtown and Intracoastal condo buildings and the constraints change entirely. Buildings have their own renovation rules, approved work hours, elevator reservations and requirements around noise and dust. Concrete slabs mean plumbing generally cannot be relocated freely, which pushes a bathroom redesign toward working within the existing wet wall. We plan those projects around the building's schedule from day one rather than discovering it at demolition.",
      "Newer construction west of Parker Avenue and out toward the airport is more straightforward: frame or block, PVC drains, standard 8-foot ceilings, and layouts that already assume open-plan living. Those are the fastest projects on our board and where a full kitchen can move quickly once cabinetry arrives.",
    ],
  },
  {
    slug: "palm-beach",
    name: "Palm Beach",
    county: "Palm Beach County",
    intro:
      "Renovating Palm Beach's historic estates and oceanfront residences with the craftsmanship and discretion the island expects.",
    detail: [
      "Work on the island is its own discipline. Many Palm Beach homes sit within designated historic districts or are individually landmarked, which means exterior changes — windows, doors, rooflines, anything visible from the street — go through architectural review before a permit is issued. Interior kitchen and bathroom work has more freedom, but the moment a project touches an opening in an exterior wall, the review timeline becomes the schedule.",
      "The houses themselves are typically masonry with plaster finishes, generous ceiling heights and detailed millwork that was built by hand. Matching an existing profile matters here. When we replace trim or build cabinetry into an older Palm Beach house, we template off what is there rather than ordering a stock profile that is close but visibly wrong once it is installed next to the original.",
      "Season shapes everything. A large share of island homes are occupied from roughly November through April, and owners generally want dust-producing work done in the off months. That compresses the calendar into late spring and summer, which is also hurricane season — so materials get ordered early and the building is kept dry and secured at every stage rather than left open over a weekend.",
      "Oceanfront exposure drives the specification. Salt air is hard on hardware, hinges, fasteners and unprotected metal. On island projects we default to marine-grade or stainless hardware and finishes rated for coastal exposure, because the cheaper option looks identical on install day and pitted two seasons later.",
    ],
  },
  {
    slug: "royal-palm-beach",
    name: "Royal Palm Beach",
    county: "Palm Beach County",
    intro:
      "Helping Royal Palm Beach families update the spacious, family-friendly homes that define this western Palm Beach County village.",
    detail: [
      "Royal Palm Beach is largely a village of single-family homes built from the 1970s through the 2000s on lots that are generous by South Florida standards. The common thread across neighborhoods like Counterpoint Estates, Crestwood and the newer communities off Okeechobee is that the bones are sound and the finishes are dated — original oak or white thermofoil cabinets, laminate counters, builder-grade tile, and a kitchen closed off from the family room by a wall that no longer makes sense for how the family actually lives.",
      "That makes this one of the best value markets we work in. Because the structures are relatively modern, opening a kitchen to the living space is usually a straightforward beam-and-header job rather than an archaeology project. Plumbing is PVC, electrical is generally in reasonable shape, and slabs are consistent — so the money goes into cabinetry, counters and finishes that you actually see, instead of disappearing into remediation.",
      "Ceiling height is the one thing to plan around. Many homes here have 8-foot ceilings in the original section with vaulted or cathedral ceilings in the great room. Running cabinetry to the ceiling in an 8-foot kitchen changes the proportions of the whole room and adds real storage, but it needs the crown and soffit detail resolved on paper before cabinets are ordered.",
      "Most of the village sits inside an HOA. Interior work rarely needs association approval, but anything involving exterior doors, windows or a permit posted in the front yard usually does, and approval windows vary. We ask for the association's requirements at the estimate stage so the paperwork runs in parallel with material lead times rather than after them.",
    ],
  },
  {
    slug: "wellington",
    name: "Wellington",
    county: "Palm Beach County",
    intro:
      "Remodeling Wellington's equestrian estates and family homes with finishes suited to the village's upscale, active lifestyle.",
    detail: [
      "Wellington runs on the equestrian calendar. The Winter Equestrian Festival brings a seasonal population into the village from roughly January through April, and for homeowners near Palm Beach Point, Grand Prix Village and the showgrounds, that window is either the busiest time of year or the period the house is rented out. Either way it is the worst time to have a kitchen torn apart. Most of our Wellington projects are scheduled to finish before the season starts or to run through the summer once it ends.",
      "The housing is split between large equestrian properties and established family communities like Binks Forest, Olympia and the Landings. The estate work tends toward custom — larger islands, second prep sinks, serious ventilation, mudroom and boot-room storage that has to handle barn traffic, and durable flooring that tolerates being walked on in riding boots. The family-home work is closer to what we do in Royal Palm Beach: solid 1990s and 2000s construction that needs the kitchen opened up and finished properly.",
      "Wellington homes often have more square footage to work with than the county average, which changes the design conversation. Where a smaller kitchen forces compromise, here the useful question is usually whether to add a second work zone — a beverage station, a baking area, a butler's pantry between kitchen and dining — rather than how to fit everything along one wall.",
      "Association review is a real factor in the gated communities. Requirements differ between neighborhoods, and the practical effect is on timing rather than design, so we get the submittal moving early. Interior-only kitchen and bath work usually clears quickly.",
    ],
  },
  {
    slug: "boynton-beach",
    name: "Boynton Beach",
    county: "Palm Beach County",
    intro:
      "Updating Boynton Beach homes from established mainland neighborhoods to the area's many gated and 55-plus communities.",
    detail: [
      "Boynton Beach splits neatly into two kinds of renovation. East of I-95, in the older mainland neighborhoods, you find compact block homes from the 1950s through the 1970s — small closed kitchens, single bathrooms, terrazzo under the carpet more often than people expect, and original galvanized or cast-iron plumbing that is at the end of its life. These projects deliver the biggest visible change per dollar, and they are also the ones where opening a wall reveals the most.",
      "West of the interstate the story is gated and largely 55-plus: Hunters Run, the Valencia communities, Aberdeen and their neighbors. These homes are newer, structurally uncomplicated, and their owners typically want two things — a kitchen that looks current, and a bathroom that will work for the next twenty years.",
      "That second point shapes a lot of our Boynton work. Converting a builder-grade tub-shower into a curbless walk-in shower with a proper linear drain, blocking in the walls for grab bars before tile goes on, comfort-height vanities and better lighting are all straightforward to build in from the start and expensive to retrofit later. None of it has to look clinical — done properly it just reads as a well-designed bathroom.",
      "Community rules here are stricter than average. Many associations restrict work hours, require licensed and insured contractors to register before starting, and limit deliveries and dumpster placement. We handle that registration as part of the job rather than leaving it to the homeowner, because a truck turned away at the gate on day one costs a week.",
    ],
  },
  {
    slug: "boca-raton",
    name: "Boca Raton",
    county: "Palm Beach County",
    intro:
      "Updating Boca Raton homes from Mizner-era residences to the city's many luxury gated and country-club communities.",
    detail: [
      "Boca Raton expects a level of finish, and the details are where projects here are won or lost. In the older east-side neighborhoods and the Mizner-influenced houses, that means arched openings, barrel tile, wrought iron and plaster that has to be matched rather than patched. In the country-club communities — Boca Bath & Tennis, Broken Sound, Boca West, St. Andrews — it means large kitchens where the cabinetry, stone and appliance package are the entire point, and the tolerances have to be tight because everything is visible.",
      "Stone selection drives more of the budget here than anywhere else we work. Full-height backsplashes, waterfall island ends and book-matched slabs all require buying and templating stone as a set, and the slab has to be selected at the yard rather than from a sample chip. We build that trip into the schedule, because a mitered waterfall edge that does not carry the vein through is the kind of detail that cannot be fixed after fabrication.",
      "Appliance lead times deserve early attention. Built-in refrigeration, panel-ready dishwashers and pro-style ranges each dictate cabinet dimensions, and the specification has to be locked before cabinetry is ordered — not after. Getting that sequence wrong is the single most common cause of a delayed high-end kitchen.",
      "Architectural review in the gated communities is genuine, not a formality. Anything visible from the street or the golf course typically goes through the association, and requirements vary considerably between communities. We ask for the standards up front and design to them.",
    ],
  },
  {
    slug: "jupiter",
    name: "Jupiter",
    county: "Palm Beach County",
    intro:
      "Renovating Jupiter's coastal and Abacoa-area homes with finishes built to stand up to salt air and an active outdoor lifestyle.",
    detail: [
      "Jupiter is a coastal town and the specification should reflect it. Homes near the inlet, along the Loxahatchee and out toward Jupiter Island live in salt air year-round, and that decides hardware before it decides anything else. Cabinet hinges, drawer slides, pulls, faucet finishes and any exposed fastener need to be rated for coastal exposure. It is a small line item at the quoting stage and the difference between hardware that still works in five years and hardware that seizes.",
      "The housing runs from 1980s and 1990s coastal homes that are now squarely in renovation age, through Abacoa's newer neo-traditional construction, to the estate properties in Admirals Cove and Jupiter Hills. The older coastal houses are the interesting ones: compartmentalized layouts, low ceilings in the kitchen, and often a wall between the kitchen and the water view, which is the first thing worth reconsidering.",
      "Ventilation matters more here than most homeowners expect. Between humidity and the tendency to cook and entertain with the doors open, an undersized hood in a Jupiter kitchen leaves grease and moisture in the room. We size ventilation to the range rather than to what fits the existing cabinet opening, and where that means a make-up air path, we plan it rather than ignore it.",
      "Homes in flood zones bring an extra layer. Substantial improvements to a structure below base flood elevation can trigger requirements that go well beyond a kitchen permit. We flag that possibility early, because it is a project-defining issue and not a detail to discover at inspection.",
    ],
  },
  {
    slug: "palm-beach-gardens",
    name: "Palm Beach Gardens",
    county: "Palm Beach County",
    intro:
      "Remodeling Palm Beach Gardens homes across PGA National, Mirasol, BallenIsles and the area's established golf communities.",
    detail: [
      "Palm Beach Gardens is golf-community country, and the renovation pattern is consistent: well-built homes from the 1980s through the 2000s in PGA National, BallenIsles, Mirasol, Frenchman's Creek and their neighbors, with kitchens and bathrooms that have simply aged out. The layouts are usually generous, the structures sound, and the work is about bringing finishes and function up to what the rest of the house already implies.",
      "The most common request here is removing the wall or peninsula between the kitchen and the family room. In homes of this vintage that is frequently achievable — but it is also frequently load-bearing, and in a single-story home with a tile roof the load is real. We open a small inspection point and confirm what is above before anyone talks about beam sizes or budgets.",
      "Dated soffits and dropped ceilings are the other recurring theme. Many of these kitchens have a bulkhead running the perimeter that was built to hide ductwork and recessed cans. Sometimes it is genuinely full of mechanicals and sometimes it is empty and can go, which unlocks full-height cabinetry and a much taller-feeling room. That is a twenty-minute investigation that changes the entire design.",
      "Community standards vary widely across the Gardens and several communities require contractor registration, certificates of insurance on file and restricted work hours. We handle those submittals as part of the project so that the first day on site is actually a working day.",
    ],
  },
  {
    slug: "stuart",
    name: "Stuart",
    county: "Martin County",
    intro:
      "Bringing quality remodeling to Stuart and the Treasure Coast, from downtown cottages to riverfront and golf-community homes.",
    detail: [
      "Stuart is the Martin County seat and permitting here runs through the county's building department at 900 SE Ruhnke Street rather than through Palm Beach County. Martin County states plainly that a permit is required to remodel a residence, so we plan for the permit rather than around it, and we build the review into the schedule from the start.",
      "The housing has real range. Downtown and in the older neighborhoods off Colorado Avenue you find Florida cottages and mid-century block homes, some with original wood floors under the carpet and most with kitchens that were last touched decades ago. Along the St. Lucie and out toward Sewall's Point and Sailfish Point the projects are larger, waterfront, and specified to a higher finish level.",
      "Riverfront homes bring the same salt-air considerations as the coast plus the humidity that comes with living on the water. Cabinet boxes in plywood rather than particleboard, finishes that tolerate moisture, and honest attention to ventilation all matter more here than they would inland. It is not exotic work — it is just specifying for the environment the house actually sits in.",
      "Stuart's smaller scale is an advantage during a remodel. Trades, suppliers and inspectors are local and the logistics are simpler than a project on the island or in a Boca gated community. Projects here tend to run to schedule.",
    ],
  },
  {
    slug: "palm-city",
    name: "Palm City",
    county: "Martin County",
    intro:
      "Serving Palm City's established neighborhoods and acreage homes with renovations tailored to Martin County living.",
    detail: [
      "Palm City is largely unincorporated Martin County, and that shapes the work in a few practical ways. Lots are bigger, many homes sit on acreage, and a meaningful number are on well and septic rather than municipal water and sewer. If a bathroom project adds a fixture or relocates drainage, the septic system becomes part of the conversation — not usually a blocker, but absolutely something to establish before the design is finalized rather than after.",
      "The housing stock is mostly 1980s through 2000s single-family, with pockets of newer construction in Martin Downs and the golf communities, plus larger estate properties toward Harbour Ridge and the river. These are comfortable, well-built homes whose kitchens were designed around a closed floor plan and a much smaller refrigerator than anyone buys today.",
      "Because lots are generous, additions are a more realistic option here than in the denser parts of Palm Beach County. When a kitchen genuinely cannot work in its footprint, bonusing out a few feet is often more sensible than forcing a compromised layout — and Palm City is one of the few markets where that is regularly worth pricing as an alternative.",
      "Permitting goes through Martin County at 900 SE Ruhnke Street in Stuart, and the department can be reached at (772) 288-5916. The requirements are clear and the process is predictable, which makes scheduling here more reliable than in jurisdictions with layered architectural review on top of the building permit.",
    ],
  },
];
