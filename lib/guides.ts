export type Guide = {
  slug: string;
  title: string;
  /** Shown in listings and as the meta description. */
  summary: string;
  metaTitle: string;
  published: string;
  updated: string;
  readingMinutes: number;
  heroImage: string;
  /** Body is a simple block list so the content stays in one place and renders consistently. */
  body: Block[];
  related?: string[];
};

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "callout"; title: string; text: string }
  | { t: "quote"; text: string; cite: string };

export const guides: Guide[] = [
  {
    slug: "do-you-need-a-permit-to-remodel-palm-beach-county",
    title: "Do You Need a Permit to Remodel in Palm Beach County?",
    metaTitle: "Do You Need a Permit to Remodel in Palm Beach County? (2026)",
    summary:
      "Palm Beach County publishes a list of work that does not require a permit. The dividing line is simpler than most homeowners expect — and it explains almost every kitchen and bathroom question we get asked.",
    published: "2026-09-03",
    updated: "2026-09-03",
    readingMinutes: 7,
    heroImage: "/img/gallery/kitchen-navy-white-island.jpg",
    body: [
      { t: "p", text: "This is the question we field more than any other, usually phrased as “it's just a bathroom, do we really need a permit?” The answer is genuinely clear once you know where the line sits, and Palm Beach County draws it in a published document called “Items Not Requiring a Permit.”" },
      { t: "p", text: "The principle underneath the whole list is this: replacing something exactly as it is, in the same place, generally does not need a permit. Moving it, changing its configuration, or opening up a wall to get at it generally does." },

      { t: "h2", text: "What the county says you can do without a permit" },
      { t: "p", text: "These come straight from the county's own list, and the qualifiers matter as much as the items:" },
      { t: "ul", items: [
        "Kitchen cabinets — “exact replacement only with no change in configuration of electrical or plumbing.”",
        "Sink — “exact replacement in same location only.”",
        "Water closet (toilet) — “replacement in same location.”",
        "Dishwasher — “exact replacement; same wattage.”",
        "Faucet — “replace existing (not involving removal of drywall).”",
        "Ceramic tile — “remove and replace,” provided it is not on a fire-rated assembly.",
        "Outlets and switches — replacing like for like within the existing junction box.",
        "Light fixtures — replacing “like for like” in an existing lighting outlet.",
        "Interior doors — removing and replacing in the same location.",
      ]},
      { t: "p", text: "Read those again and notice how much work the phrases “exact replacement,” “same location” and “no change in configuration” are doing. Almost every real remodel breaks at least one of them." },

      { t: "h2", text: "Which means a real remodel almost always needs a permit" },
      { t: "p", text: "If your project involves any of the following, plan on pulling one:" },
      { t: "ul", items: [
        "Moving a sink, toilet, shower or any drain — relocating plumbing is the clearest trigger there is.",
        "Changing the cabinet layout in a way that moves outlets, switches or plumbing rough-in.",
        "Removing or altering a wall, whether or not you think it is load-bearing.",
        "Adding circuits, moving electrical panels, or adding recessed lighting where none existed.",
        "Converting a tub to a walk-in shower — this changes the drain and the waterproofing assembly.",
        "Replacing exterior windows or doors beyond the narrow exemptions on the county list.",
      ]},
      { t: "callout", title: "The honest version", text: "If you are gutting a kitchen or bathroom back to the studs, you need a permit. The exemption list is written for repairs and swaps, not for renovations. Anyone telling you otherwise on a full remodel is either misinformed or hoping you are." },

      { t: "h2", text: "Martin County works differently" },
      { t: "p", text: "If your home is in Stuart, Palm City, Hobe Sound or anywhere else in Martin County, you are not dealing with Palm Beach County at all. Martin County's building department states it plainly: a permit is required to remodel a residence." },
      { t: "p", text: "That department is at 900 SE Ruhnke Street in Stuart and can be reached at (772) 288-5916. They publish checklists by project type, and in our experience the process is predictable when the submittal is complete on the first pass." },

      { t: "h2", text: "And your municipality may add another layer" },
      { t: "p", text: "Palm Beach County's rules govern unincorporated areas. If you live inside a municipality — West Palm Beach, Boca Raton, Jupiter, Wellington, Boynton Beach, Palm Beach Gardens and the rest — that city or village runs its own building department, and its requirements can be stricter than the county's." },
      { t: "p", text: "The Town of Palm Beach is the clearest example. Homes in historic districts or with landmark status go through architectural review before a building permit is issued, and that review governs the schedule far more than the permit itself does." },

      { t: "h2", text: "Why permits are worth it even when they feel like friction" },
      { t: "p", text: "Homeowners occasionally ask whether they can skip the paperwork. Three reasons not to:" },
      { t: "ol", items: [
        "Unpermitted work surfaces when you sell. Title and inspection turn it up, and buyers use open or missing permits as leverage — or walk.",
        "Insurance claims get complicated. If unpermitted work contributes to a loss, expect the carrier to ask about it.",
        "Inspections catch real problems. Shower pan waterproofing, drain slope, and electrical in wet locations are exactly the things a second set of eyes should verify.",
      ]},

      { t: "h2", text: "Who pulls it" },
      { t: "p", text: "Your licensed contractor should pull the permit in their name. That matters more than it sounds. When a contractor asks the homeowner to pull an owner-builder permit for work the contractor is performing, the homeowner takes on the legal responsibility for that work — and loses much of the protection the licensing system exists to provide. It is a meaningful red flag." },
      { t: "p", text: "At Palm Beach Renovations we pull permits under our license, schedule the inspections, and meet the inspector on site. It is part of the job, not an extra." },

      { t: "callout", title: "Before you assume anything", text: "Rules change and jurisdictions differ. Confirm the current requirements with the building department that covers your address before you make a decision based on this or any other article — or ask us during the estimate and we will tell you exactly what your project needs." },
    ],
    related: ["what-a-kitchen-remodel-costs-palm-beach-county", "kitchen-bathroom-remodel-timeline"],
  },

  {
    slug: "what-a-kitchen-remodel-costs-palm-beach-county",
    title: "What a Kitchen Remodel Actually Costs in Palm Beach County",
    metaTitle: "Kitchen Remodel Cost in Palm Beach County: What Drives the Number",
    summary:
      "Nobody can quote your kitchen from a blog post. But the things that move the number are predictable, and knowing them tells you where your money is going before you ever get an estimate.",
    published: "2026-09-03",
    updated: "2026-09-03",
    readingMinutes: 8,
    heroImage: "/img/gallery/kitchen-gray-woodgrain-cabinets.jpg",
    body: [
      { t: "p", text: "Every homeowner wants a number and every honest contractor is reluctant to give one before seeing the space. That is not evasion. Two kitchens of identical square footage in the same neighborhood can differ by a factor of three depending on decisions that have nothing to do with size." },
      { t: "p", text: "So rather than invent a figure, here is what actually moves it — roughly in order of impact." },

      { t: "h2", text: "1. Cabinetry, by a distance" },
      { t: "p", text: "Cabinets are typically the single largest line in a kitchen budget, and the spread within “cabinets” is enormous. Stock cabinets in standard sizes, semi-custom with modified dimensions and upgraded interiors, and full custom built to your walls are three different products at three different prices." },
      { t: "p", text: "What separates them in practice: box construction (plywood versus particleboard), drawer hardware, whether interiors are finished, and whether the cabinet actually fits your wall or needs filler strips to bridge the gap. On a Florida coastal project, plywood boxes are worth the difference — particleboard and humidity are a poor combination over time." },

      { t: "h2", text: "2. Whether plumbing and gas move" },
      { t: "p", text: "Keeping the sink and appliances where they are is dramatically cheaper than relocating them. Moving a sink to an island means opening the slab, trenching, re-routing drain with correct fall, and patching — plus the permit and inspection that comes with it." },
      { t: "p", text: "It is often the right decision. An island sink can transform how a kitchen works. But it should be a deliberate choice made with the cost understood, not a line on a drawing nobody priced." },

      { t: "h2", text: "3. Whether walls come out" },
      { t: "p", text: "Opening a kitchen to the living space is the most requested change we get, and the cost depends entirely on what the wall is doing. A non-structural partition is a modest line item. A load-bearing wall means engineering, a properly sized beam, temporary shoring and a structural permit — a different order of magnitude." },
      { t: "p", text: "This is why we investigate before we price. A twenty-minute look above the ceiling is the difference between a real number and a guess." },

      { t: "h2", text: "4. Countertops and how they are detailed" },
      { t: "p", text: "Material matters, but fabrication detail often matters more. A standard eased edge on a single slab is one price. Full-height backsplashes, mitered waterfall island ends and book-matched veining require more material, more fabrication and slab selection at the yard — and they look markedly better. It is a real choice, not an upsell." },

      { t: "h2", text: "5. Appliances" },
      { t: "p", text: "The appliance package is usually the homeowner's own purchase, but it drives cabinetry design and therefore cost. Built-in refrigeration, panel-ready dishwashers and pro-style ranges all change cabinet dimensions and often require ventilation and electrical work that a standard slide-in range does not." },
      { t: "callout", title: "Lock appliances before cabinets", text: "Cabinetry is built to appliance specifications. Choosing a different range after cabinets are ordered is one of the most expensive changes of mind available in a kitchen project. Pick the appliances first." },

      { t: "h2", text: "6. What is behind the walls" },
      { t: "p", text: "In older homes east of I-95 and in the pre-1980 housing stock across the county, demolition regularly reveals cast-iron drain lines at the end of their service life, aluminum branch wiring, or framing that was modified at some point without much care." },
      { t: "p", text: "None of that is a disaster, and all of it is far cheaper to address while the wall is already open. We build a contingency into every older-home project for exactly this reason, and we would rather tell you about it up front than surprise you in week two." },

      { t: "h2", text: "What to ask for instead of a ballpark" },
      { t: "p", text: "A useful estimate is itemized. You should be able to see what the cabinetry allowance is, what the countertop allowance is, what is included for plumbing and electrical, and what the contingency covers. Two estimates are only comparable when both are broken out that way — a single bottom-line number tells you nothing about what was assumed to get there." },
      { t: "ul", items: [
        "Is the permit included, and who pulls it?",
        "What grade of cabinet is in the number, and is the box plywood?",
        "Is stone an allowance or a specified material?",
        "What happens if demolition reveals failed plumbing — how is that priced?",
        "Who is on site day to day, and are they employees or subcontractors?",
      ]},
      { t: "p", text: "We give free, written, itemized estimates across Palm Beach and Martin County. It costs nothing to find out what your actual kitchen costs rather than what the internet's average kitchen costs." },
    ],
    related: ["do-you-need-a-permit-to-remodel-palm-beach-county", "choosing-countertops-florida-kitchen"],
  },

  {
    slug: "kitchen-bathroom-remodel-timeline",
    title: "How Long a Kitchen or Bathroom Remodel Really Takes",
    metaTitle: "Kitchen & Bathroom Remodel Timeline: What to Expect Week by Week",
    summary:
      "A realistic week-by-week picture of a South Florida kitchen and bathroom remodel — including the waiting that happens before anyone swings a hammer.",
    published: "2026-09-03",
    updated: "2026-09-03",
    readingMinutes: 6,
    heroImage: "/img/gallery/bathroom-marble-walk-in-shower.jpg",
    body: [
      { t: "p", text: "The most common misunderstanding about remodeling schedules is where the time actually goes. Homeowners picture demolition-to-done. In reality a meaningful part of the calendar happens before the first day on site, and the work itself moves faster than most people expect once it starts." },

      { t: "h2", text: "Before anything is demolished" },
      { t: "p", text: "Design, selections and a written estimate usually take two to four weeks depending on how quickly decisions get made. Cabinetry then has to be ordered, and lead time is the single biggest variable in the entire project — stock can arrive in a couple of weeks, custom can take considerably longer." },
      { t: "p", text: "Permitting runs in parallel where it can. In Martin County and most municipalities the review is predictable; where architectural or HOA review is involved, that becomes the critical path." },
      { t: "callout", title: "The rule that saves projects", text: "We do not demolish a working kitchen until the cabinets are physically in the warehouse. It is tempting to start early. It is also how families end up eating off a hot plate for six extra weeks because a cabinet order slipped." },

      { t: "h2", text: "A typical kitchen, once work starts" },
      { t: "h3", text: "Week 1 — Demolition and discovery" },
      { t: "p", text: "Protection goes down, cabinets and counters come out, and whatever is behind the walls becomes visible. This is when surprises appear, and it is the week where an experienced crew earns its keep by handling them without stopping the job." },
      { t: "h3", text: "Weeks 2–3 — Rough-in" },
      { t: "p", text: "Plumbing and electrical are moved and roughed in, any framing changes are made, and inspections are called. Nothing looks like progress to a homeowner during this phase, and it is the most important part of the project." },
      { t: "h3", text: "Weeks 3–4 — Walls and floors" },
      { t: "p", text: "Drywall, texture and paint, then flooring where it runs under the cabinets. This is where the room starts reading as a room again." },
      { t: "h3", text: "Weeks 4–5 — Cabinets" },
      { t: "p", text: "Cabinets are set and scribed to the walls. Then the counter fabricator templates the actual installed cabinets — not the drawing — and stone fabrication typically takes one to two weeks from that template." },
      { t: "h3", text: "Weeks 6–7 — Counters, backsplash, finish" },
      { t: "p", text: "Stone is installed, the sink and faucet are plumbed, backsplash tile goes on, appliances are set, and electrical and plumbing trim out." },
      { t: "h3", text: "Week 7–8 — Punch list" },
      { t: "p", text: "Hardware, touch-ups, adjusting every door and drawer, final inspection and walkthrough. Most kitchens land in the four-to-eight-week range on site; layout changes and custom cabinetry push toward the top of it." },

      { t: "h2", text: "Bathrooms are shorter but tighter" },
      { t: "p", text: "A full bathroom is typically two to four weeks on site. The room is smaller, but the trades stack in a confined space and waterproofing cannot be rushed — pan and membrane work needs proper cure time before tile, and skipping that is how leaks are built in." },
      { t: "p", text: "If it is the only bathroom in the house, that is a real conversation to have before starting rather than during." },

      { t: "h2", text: "What actually causes delays" },
      { t: "ul", items: [
        "Material lead times — especially cabinetry and specialty tile.",
        "Decisions made late. Every day a tile selection is open is a day the schedule cannot be committed.",
        "Change orders mid-project, which is why we push hard on finalizing design before demolition.",
        "Genuine surprises behind the walls in older homes.",
        "HOA or architectural review, where applicable.",
      ]},
      { t: "p", text: "Four of those five are manageable with planning. We give a realistic timeline at the estimate and update it in writing if anything moves — the schedule you get on day one should still mean something in week four." },
    ],
    related: ["do-you-need-a-permit-to-remodel-palm-beach-county", "bathroom-waterproofing-florida"],
  },

  {
    slug: "bathroom-waterproofing-florida",
    title: "Bathroom Waterproofing in Florida: The Part You Never See",
    metaTitle: "Bathroom Waterproofing in Florida | Why It Matters More Here",
    summary:
      "The most expensive bathroom failures happen behind tile that looked perfect on install day. Here is what a properly built South Florida shower actually has in it.",
    published: "2026-09-03",
    updated: "2026-09-03",
    readingMinutes: 6,
    heroImage: "/img/gallery/bathroom-glass-shower-subway-tile.jpg",
    body: [
      { t: "p", text: "Every failed shower we have been called to repair looked fine on the day it was finished. That is the whole problem with waterproofing: it is invisible, it is the cheapest place for a contractor to cut, and the consequences show up two or three years later as a soft spot in the hallway floor or a stain on the ceiling below." },
      { t: "p", text: "In South Florida the margin for error is narrower than most of the country. Ambient humidity is high year-round, bathrooms dry out slowly, and coastal homes add salt to the equation. A shower that would survive in a dry climate can fail here." },

      { t: "h2", text: "Tile is not waterproof" },
      { t: "p", text: "This surprises people. Tile and grout shed water, but they are not a barrier — grout is porous and water passes through it. Every tiled shower relies on a waterproofing layer behind or beneath the tile to actually contain the water and direct it to the drain." },
      { t: "p", text: "When that layer is missing, wrong, or installed carelessly, the tile still looks perfect. Water just goes somewhere else — into the framing, the subfloor, or the wall cavity." },

      { t: "h2", text: "What a properly built shower has in it" },
      { t: "ul", items: [
        "A sloped substrate that actually falls to the drain, with no flat spots that hold standing water.",
        "A continuous waterproof membrane — sheet or liquid-applied — across the pan and up the walls to the required height.",
        "Every inside corner, change of plane and pipe penetration sealed with the manufacturer's matching detail, not with whatever caulk was on the truck.",
        "A drain assembly compatible with the membrane system, correctly bonded to it.",
        "Cement backer board or a foam board system on the walls — never standard drywall inside a wet area.",
        "Cure and, where the system calls for it, a flood test before a single tile goes on.",
      ]},
      { t: "callout", title: "Mixing systems is where failures start", text: "Waterproofing products are engineered as systems. A membrane from one manufacturer, a drain from another and corner treatment from a third may all be good products and still fail at the joints. We build to one manufacturer's system and follow its details." },

      { t: "h2", text: "Curbless showers raise the stakes" },
      { t: "p", text: "Curbless walk-in showers are the most requested bathroom feature we build, and rightly so — they look better, they are easier to clean and they let a bathroom work for decades as needs change. They are also less forgiving." },
      { t: "p", text: "Without a curb, the only things stopping water leaving the shower are correct slope and a properly placed linear drain. That usually means recessing the subfloor or building up the surrounding floor, and the waterproofing has to extend well beyond the shower footprint. It is entirely achievable. It is not the place to hire on price." },

      { t: "h2", text: "Ventilation is part of waterproofing" },
      { t: "p", text: "A bathroom fan is not a comfort feature in Florida, it is moisture control. Two failures are common: a fan too small for the room, and a fan that vents into the attic rather than to the outside. The second is remarkably widespread and quietly ruins attic sheathing and insulation." },
      { t: "p", text: "We size the fan to the room, duct it properly to the exterior, and where it makes sense put it on a humidity sensor or timer so it runs long enough after a shower to actually dry the space." },

      { t: "h2", text: "Questions worth asking any bathroom contractor" },
      { t: "ol", items: [
        "Which waterproofing system are you using, by name?",
        "Do you flood test the pan before tiling, and can I see it?",
        "How is the shower niche waterproofed — that is the most common leak point in the room.",
        "Where does the exhaust fan terminate?",
        "Is the wall blocked for grab bars now, in case they are wanted later?",
      ]},
      { t: "p", text: "A contractor who answers those confidently is telling you a lot about how they build. One who waves them off is telling you something too." },
    ],
    related: ["kitchen-bathroom-remodel-timeline", "do-you-need-a-permit-to-remodel-palm-beach-county"],
  },

  {
    slug: "choosing-countertops-florida-kitchen",
    title: "Choosing Countertops for a Florida Kitchen",
    metaTitle: "Quartz vs Granite vs Porcelain: Countertops for a Florida Kitchen",
    summary:
      "Quartz, granite, porcelain and solid surface all work in a Palm Beach kitchen. Which one is right depends on light, cooking habits and whether the counter ever sees sun.",
    published: "2026-09-03",
    updated: "2026-09-03",
    readingMinutes: 5,
    heroImage: "/img/gallery/kitchen-remodel-10.jpg",
    body: [
      { t: "p", text: "Countertops are the most-touched surface in a kitchen and the one homeowners agonize over most. The good news is that there is no wrong answer among the main options — there are just trade-offs, and a few of them are specific to living in South Florida." },

      { t: "h2", text: "Engineered quartz" },
      { t: "p", text: "The default choice for most kitchens we build, and for good reason. It is non-porous, so it never needs sealing and shrugs off wine, citrus and oil. Patterning is consistent, which makes it predictable to design with, and quality has improved to the point that convincing marble-look quartz is widely available." },
      { t: "p", text: "The Florida caveat: quartz contains resin, and prolonged direct sunlight can cause discoloration over time. For an indoor kitchen this is rarely an issue — but for an outdoor kitchen or a counter under an unshaded south-facing window, choose differently." },

      { t: "h2", text: "Natural granite" },
      { t: "p", text: "Genuinely heat-resistant, highly durable, and every slab is unique — which is either the appeal or the difficulty depending on your temperament. It handles sun without fading, which makes it a sound choice for outdoor kitchens and lanais, a common ask here." },
      { t: "p", text: "It is porous, so it wants sealing periodically. That is a ten-minute job once a year, not a burden — but it is a job, and it should be a conscious choice." },

      { t: "h2", text: "Porcelain slab" },
      { t: "p", text: "The most underrated option on this list. Porcelain is UV-stable, heat-resistant, non-porous and available in very large formats with patterning that runs through convincingly. For an outdoor kitchen in full Florida sun it is the material we most often recommend." },
      { t: "p", text: "It requires an experienced fabricator — it is less forgiving to cut and handle than quartz — so it is worth asking who is fabricating it." },

      { t: "h2", text: "Marble, honestly" },
      { t: "p", text: "Marble is beautiful and it is soft and porous. It etches when it meets anything acidic — lemon, wine, vinegar — and it stains. In a working family kitchen it will patina, and that is not a defect, it is the material behaving as marble behaves." },
      { t: "p", text: "If you love it and you accept that, use it and enjoy it. If you would be upset by a ring on it in year one, choose a marble-look quartz and be happy instead." },

      { t: "h2", text: "The details that matter more than the material" },
      { t: "ul", items: [
        "Edge profile. A simple eased or mitered edge reads more current than an ornate one and costs less.",
        "Full-height backsplash. Using the same slab up the wall behind the range is the single upgrade that most changes how a kitchen looks.",
        "Seam placement. Ask where the seams will be before fabrication — a seam in the wrong place is permanent.",
        "Waterfall ends. Beautiful when the vein carries through the miter, disappointing when it does not. That requires slab selection, not a sample chip.",
        "Overhang support. Anything past about ten to twelve inches usually needs concealed support, and it should be designed in rather than added after.",
      ]},
      { t: "callout", title: "See the actual slab", text: "Sample chips are for narrowing the field. Before fabrication, go to the yard and look at the specific slabs your kitchen will be cut from — veining, movement and tone vary enormously within the same product name. We go with our clients for exactly this reason." },
      { t: "p", text: "Whichever way you go, the fabrication and installation matter as much as the material. We template off installed cabinets, not drawings, and we walk the slab selection with you before anything is cut." },
    ],
    related: ["what-a-kitchen-remodel-costs-palm-beach-county", "kitchen-bathroom-remodel-timeline"],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
