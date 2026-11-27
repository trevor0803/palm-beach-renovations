// Palm Beach Renovations: new guides written by MAT Factory.
//
// How this file works: the factory's weekly blog writer adds one post at the
// top of the BLOG_POSTS array below. Each post is an object with these keys:
// slug (kebab-case), title, description, category, publishedAt, updatedAt,
// intro, sections (a list of heading and paragraphs). lib/guides.ts turns
// every post here into a guide page, so a new post is published on /guides,
// in the sitemap and in the Article schema with no other edit.
//
// Editorial rules (binding for every post):
// - Write like a knowledgeable local remodeler explaining things plainly to a
//   homeowner in Palm Beach County or Martin County. Kitchens and bathrooms.
// - Categories to reuse: Planning, Permits, Kitchens, Bathrooms, Materials.
// - Permit and code facts must come from the county building department or the
//   code itself, never from a blog or a directory. If a detail is unclear,
//   leave it out.
// - Never invent jobs, customers, reviews, statistics, prices, years in
//   business, awards, licences or guarantees. Hedge material behavior as ranges.
// - No phone numbers, no links, no ALL CAPS, no emoji, no exclamation marks.
// - Do not repeat a topic already covered on /guides.

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const BLOG_POSTS = [
  {
    slug: "home-renovation-royal-palm-beach",
    title: "What Makes a Royal Palm Beach Renovation Different",
    description:
      "How Royal Palm Beach's own Village Building Division, permit documents, and e-permitting portal shape a real kitchen or bathroom renovation timeline.",
    category: "Permits",
    publishedAt: "2026-11-27",
    updatedAt: "2026-11-27",
    intro:
      "Homeowners searching for help with a home renovation in Royal Palm Beach often land on pages that read the same as every other city's remodeling page, services listed with no mention of who actually reviews the plans or what paperwork Village Hall wants before a hammer swings. Royal Palm Beach runs its own permitting process, separate from the county and from neighboring Wellington, and that affects how a kitchen or bathroom project gets scheduled from the first sketch to the final inspection. Here is what that actually looks like.",
    sections: [
      {
        heading: "Royal Palm Beach is its own Village, and that matters for your renovation",
        paragraphs: [
          "Royal Palm Beach was incorporated in 1959 and is now the 10th largest city in Palm Beach County, with roughly 40,000 residents. That incorporated status means the Village runs its own municipal government and its own services, including its own Building Division, rather than relying on the county's building department the way an unincorporated neighborhood might.",
          "Practically, that means a renovation permit here is reviewed by Village staff under the Village's own rules and forms, not by the Palm Beach County building department and not by Wellington's. If a contractor's experience is mostly with county permits or a different city's process, they will still need to learn Royal Palm Beach's specific requirements before a permit gets issued, which is worth asking about up front.",
        ],
      },
      {
        heading: "Permits and the documents Village Hall requires",
        paragraphs: [
          "Most kitchen and bathroom renovations that involve moving walls, adding square footage, or otherwise changing the structure fall under the Village's Remodel/Addition permit. That application calls for the permit application itself, two sets of plans, a current survey, product approvals for the materials being installed, setbacks shown on the survey, energy calculations, truss plans where applicable, and zoning approval.",
          "A straightforward interior remodel that does not touch the footprint has its own, lighter paperwork trail. The Village's Resident Permit Form Finder lists a Floor Plan or Perimeter drawing, a Design Plan, and Product Approvals, often called NOAs, as the forms needed for that permit type.",
          "The common thread across both permit types is that the paperwork has to be complete at submission. The Village's rules state that required documentation must be submitted at the time of application for the permit to be accepted for processing, so a partial submission does not hold a place in line while missing items get tracked down.",
        ],
      },
      {
        heading: "What a licensed contractor handles versus what falls on the homeowner",
        paragraphs: [
          "A licensed contractor pulling the permit is typically the one assembling the plan sets, survey, product approvals, and energy calculations, and coordinating with the designer or engineer if the project needs one. That is part of why working with a contractor who already has a relationship with the Village's Building Division can keep a project moving instead of stalling at the submission counter.",
          "Homeowners who plan to do some or all of the work themselves have an additional requirement. Any Owner/Builder permit in Royal Palm Beach must be accompanied by a notarized Owner/Builder Affidavit, and that affidavit has to be part of the application package from the start, not added later. It is worth knowing this before deciding to self-perform work, since it changes both the paperwork and the liability that sits with the homeowner rather than a licensed contractor.",
        ],
      },
      {
        heading: "Kitchen and bathroom renovation considerations in Royal Palm Beach",
        paragraphs: [
          "Kitchen and bathroom projects here almost always need product approvals, or NOAs, documenting that windows, doors, and other exterior-rated products meet Florida Building Code wind and impact standards for this part of the coast. If a kitchen remodel includes a new window over the sink or a bathroom addition adds an exterior door, those product approvals have to be part of the permit package, not an afterthought.",
          "Bathroom remodels that rework the shower or tub area also involve waterproofing and plumbing changes that typically require their own inspections during construction, separate from the final sign-off. Kitchen remodels that relocate the sink, range, or load-bearing walls bring in plumbing, electrical, and sometimes structural review on top of the base Remodel/Addition permit, which is part of why the survey and setback documentation matter even for work that looks purely cosmetic from inside the house.",
        ],
      },
      {
        heading: "A realistic timeline from design to final inspection",
        paragraphs: [
          "Before any permit application goes in, the design phase has to produce the plans, survey, and energy calculations the Village requires, which means finalizing the layout and material selections earlier in the process than many homeowners expect. Rushing this stage is one of the more common reasons a permit application comes back with corrections instead of an approval.",
          "Once the application is submitted complete, it goes through Village review before a permit is issued, and only after that does demolition and construction begin. Inspections are scheduled at set points as the work progresses, electrical, plumbing, framing where applicable, and a final inspection that closes out the permit. How long all of that takes depends on the scope of the project and how quickly corrections, if any, get resolved, so it is worth asking a contractor for a timeline based on your specific project rather than a general estimate.",
        ],
      },
      {
        heading: "Choosing a remodeler who already works with the Village's system",
        paragraphs: [
          "Royal Palm Beach, like many Florida municipalities, has moved toward handling permit applications and inspections through an online system rather than paper-only submissions at the counter. A contractor who regularly files through that system and knows what the Village's reviewers expect to see on a survey or a set of plans tends to avoid the back-and-forth that slows down less experienced applicants.",
          "When vetting a remodeler for a Royal Palm Beach project, it is reasonable to ask directly how many permits they have pulled through the Village's Building Division, not just Palm Beach County generally, and whether they are familiar with the specific document list for a Remodel/Addition permit versus an interior remodel. A contractor who can answer that clearly is signaling that they understand the Village is its own jurisdiction, not just another line on a service area list.",
        ],
      },
    ],
  },
  {
    slug: "before-and-after-home-renovations-palm-beach-gardens",
    title: "Before and After Renovations in Palm Beach Gardens",
    description:
      "A walkthrough of what real permitted kitchen, bathroom, and whole-home transformations in Palm Beach Gardens actually involve, start to finish.",
    category: "Planning",
    publishedAt: "2026-11-20",
    updatedAt: "2026-11-20",
    intro:
      "Before-and-after photos are the easy part to look at, but they skip over everything that actually happened between the old kitchen and the new one. In Palm Beach Gardens, that gap includes design decisions, a trip through city permitting, and in many neighborhoods a separate approval from an architectural review board. Here is what the full process looks like, from the outdated space in the first photo to the one that gets shared at the end.",
    sections: [
      {
        heading: "What counts as a before-and-after renovation here",
        paragraphs: [
          "A true before-and-after is not just new paint and a different light fixture. In Palm Beach Gardens, the projects that produce a dramatic transformation usually involve some combination of removing or relocating walls, reworking the kitchen layout around the appliances and island, re-tiling or replacing a bathroom from the studs out, or touching the structure and systems enough that the house genuinely functions differently afterward.",
          "That distinction matters because it is also the line that determines whether a permit is required. A cosmetic refresh, like swapping countertops without moving plumbing, is a different animal from a gut renovation that reconfigures space. Most of the transformations homeowners are chasing when they search for before-and-after inspiration fall into the second category, which means the process below applies.",
        ],
      },
      {
        heading: "Kitchen, bathroom, and whole-home examples",
        paragraphs: [
          "A typical kitchen transformation in this area starts with a closed-off, dated layout, often with a peninsula or a wall separating the kitchen from a family room, and ends with an open layout centered on an island, updated cabinetry, and a different lighting plan. The visual change is dramatic, but it almost always starts with a wall coming down, which is structural work and triggers both design and permitting steps before any demolition happens.",
          "A bathroom before-and-after commonly involves replacing an old tub-and-tile combination with a curbless or low-threshold shower, reworking the vanity footprint, and redoing waterproofing underneath the new tile. The photos show surfaces and fixtures, but the work that makes the after photo hold up over time happens behind the tile, where the waterproofing membrane and slope go.",
          "A whole-home renovation ties these together, often room by room, and may include opening the floor plan, redoing flooring throughout, and updating the exterior enough to change curb appeal. These projects take the longest and involve the most coordination between the design phase, permitting, and construction, simply because more systems and more rooms are affected at once.",
        ],
      },
      {
        heading: "The process behind every transformation",
        paragraphs: [
          "Every one of these projects starts with design, even when the homeowner is eager to get to construction. That means finalizing the layout, selecting materials, and producing drawings detailed enough to submit for a permit. Skipping or rushing this step is the most common reason a project stalls later, because the permit reviewer or the contractor finds a gap that has to be resolved mid-project instead of on paper.",
          "Once the design is set, the project moves into permitting, and only after the permit is issued does demolition and construction actually begin. Inspections happen at set points along the way, tied to the trades involved, framing, electrical, plumbing, and a final inspection before the project is considered closed out. The before-and-after photo only exists because every one of those steps happened in order.",
        ],
      },
      {
        heading: "Permits and ARB approval before work starts",
        paragraphs: [
          "The City of Palm Beach Gardens requires a building permit for most construction, remodeling, or repair work. That requirement exists so that a renovation meets current Florida Building Code standards, which in this part of the state means construction built to hold up under hurricane wind loads and flood exposure, not just a cosmetic inspection. A kitchen remodel that moves walls or relocates plumbing, or a bathroom remodel that touches the shower pan and waterproofing, falls squarely under this requirement.",
          "Permits for renovation and addition projects in Palm Beach Gardens are reviewed and issued through the city's Building Division, located at 10500 North Military Trail. That is the office to contact or visit when you are ready to confirm what your specific project needs before signing a contract or starting demolition.",
          "Many homes in Palm Beach Gardens sit within a gated community or planned development with its own architectural review board, and that approval is separate from the city permit. An ARB typically reviews exterior changes, and sometimes certain interior work depending on the community's governing documents, before the city permit process even begins. If your home falls under an ARB, build that approval timeline into your schedule rather than assuming the city permit is the only box to check.",
        ],
      },
      {
        heading: "What makes the biggest visual difference",
        paragraphs: [
          "Layout changes tend to produce the most dramatic before-and-after contrast, because removing a wall or reworking traffic flow changes how a room feels in a way surface finishes alone cannot match. Natural light is a close second: enlarging an opening, changing a window, or simply removing visual barriers between rooms lets existing light reach spaces that used to feel closed off.",
          "Surfaces still matter, and countertops, flooring, and cabinetry finish are what most people notice first in a photo. But the projects that look transformed rather than just refreshed are almost always the ones where the layout or the light changed first, with the surfaces finishing the job.",
        ],
      },
      {
        heading: "Planning your own before-and-after project",
        paragraphs: [
          "If you are starting to plan a renovation in Palm Beach Gardens, begin with the design and a realistic look at what your layout needs to change, then confirm with the city Building Division what permits your scope will require and check whether your community has an ARB process to account for. Getting those two things settled early is what keeps a project moving instead of stalling once walls are already open.",
          "The before-and-after photo is the reward at the end, but it is really a record of design decisions made correctly up front, a permit process followed in the right order, and construction that matched the drawings. Plan for those three things and the transformation takes care of itself.",
        ],
      },
    ],
  },
  {
    slug: "vetting-a-high-end-remodeling-contractor-palm-beach-county",
    title: "Vetting a High-End Remodeling Contractor in PBC",
    description:
      "How to verify a Florida contractor's license and insurance, understand the Notice of Commencement, and spot red flags in a luxury remodel bid.",
    category: "Permits",
    publishedAt: "2026-11-13",
    updatedAt: "2026-11-13",
    intro:
      "If you are putting together a high-end kitchen, bathroom, or whole-home renovation in Palm Beach County, the budget at stake makes due diligence worth the extra hour it takes. The marketing on a contractor's website will not tell you whether their license is active, whether they carry the insurance they claim, or whether their paperwork will hold up if something goes wrong. This guide walks through how to check those things yourself, and what the paperwork around a large remodel is supposed to look like.",
    sections: [
      {
        heading: "What \"high-end\" actually means in a remodeling contractor",
        paragraphs: [
          "A lot of companies use the word luxury or high-end to describe a price point rather than a way of working. What should actually set a high-end contractor apart is how the project is run: tighter coordination between design and construction, more detailed drawings before demolition starts, finish-level materials that are specified and ordered correctly the first time, and a crew that can execute custom cabinetry, natural stone, or complex tile work without it becoming a learning exercise on your job.",
          "None of that shows up in a sales pitch. It shows up in the proposal itself, how detailed the scope of work is, how the allowances are written, and how the contractor talks about sequencing a project in a place like Boca Raton where permitting, HOA review, and finish lead times all have to line up.",
        ],
      },
      {
        heading: "Verify the license and insurance before the conversation goes any further",
        paragraphs: [
          "Florida law requires construction work to be performed by licensed contractors. There is a narrow owner/builder exemption, but it still requires the homeowner to personally perform or supervise the work themselves, it is not a loophole that lets an unlicensed crew do the job under your name. Any contractor proposing a large remodel should hold an active Florida license appropriate to the scope of work, and you should confirm that directly rather than taking a license number at face value.",
          "The same goes for insurance. Ask for a certificate of general liability coverage and workers compensation coverage, and ask that it name you or the project address, not just a generic form pulled from a file. A contractor who hesitates to provide this, or who says it will come later, is telling you something about how the rest of the project will go.",
          "This step costs you almost nothing and takes a few minutes. It is also the single easiest way to filter out a contractor who is not equipped to carry a high-end budget through to completion.",
        ],
      },
      {
        heading: "Permits and the Notice of Commencement",
        paragraphs: [
          "A large kitchen, bathroom, or whole-home remodel in Palm Beach County is going to involve a building permit, and likely separate trade permits for electrical, plumbing, and mechanical work depending on scope. A high-end contractor should be able to explain which permits your specific project needs before the contract is signed, not figure it out after demolition has started.",
          "One document homeowners often miss entirely is the Notice of Commencement. In Palm Beach County, a Notice of Commencement must be recorded with the Clerk of the Circuit Court before the first inspection takes place on any permit valued over 5,000 dollars, which covers essentially every meaningful kitchen or bathroom remodel and certainly any full renovation. This is not paperwork your contractor can quietly handle for you after the fact. It protects your position as the owner, and skipping it or filing it late can stall your very first inspection.",
          "Ask early in the process who is responsible for recording the Notice of Commencement, when it will happen relative to permit issuance, and ask to see a copy once it is filed. A contractor used to working on larger projects will already have this built into their process and will not need to be reminded twice.",
        ],
      },
      {
        heading: "Questions to ask before you sign",
        paragraphs: [
          "Beyond license and insurance, ask what the estimate actually includes. A serious high-end estimate should spell out material allowances by category rather than a single lump sum, note what is excluded, and state who pulls which permits. Ask how change orders are priced and documented, since a finish-heavy remodel almost always involves some adjustments along the way, and you want that process in writing before it happens rather than negotiated in the moment.",
          "Ask who will actually be on site day to day, whether that is the same person named in the proposal, and how often you should expect updates. Ask about the payment schedule and whether draws are tied to completed phases of work rather than a calendar. And ask to see the Notice of Commencement timeline and permit numbers once they are issued, so you have a paper trail tied to your address, not just a verbal assurance that everything is handled.",
        ],
      },
      {
        heading: "Red flags in a bid or proposal",
        paragraphs: [
          "A few patterns are worth taking seriously. A bid that is unusually vague about material allowances, especially on cabinetry, countertops, or tile, often means the real cost gets discovered later through change orders. A contractor who wants a large deposit well beyond what covers initial material ordering, or who pushes to start work before permits are pulled, is asking you to accept risk that should sit with them.",
          "Be cautious of a proposal that does not mention who files the Notice of Commencement or which permits the project requires, since that usually means it has not been thought through yet rather than that it does not apply. And be skeptical of anyone who discourages you from calling the county to confirm their license or insurance. A contractor confident in their standing has no reason to discourage that call.",
        ],
      },
      {
        heading: "What a trustworthy project looks like from contract to walkthrough",
        paragraphs: [
          "A well-run high-end remodel has a contract with a detailed scope and allowances, a recorded Notice of Commencement on file before the first inspection, permits pulled under the contractor's license for the appropriate trades, and a payment schedule tied to completed milestones rather than the calendar. Inspections happen at the points the building department requires, and you get copies of the paperwork as it is generated rather than having to ask for it after the fact.",
          "But a project run this way gives you a clear paper trail and a way to hold the work to what was agreed, which is what a high-end budget is actually paying for.",
        ],
      },
    ],
  },
  {
    slug: "full-home-renovation-palm-beach-gardens-guide",
    title: "Planning a Full Home Renovation in Palm Beach Gardens",
    description:
      "A Palm Beach Gardens homeowner's guide to full home renovation scope, permits, gas and vegetation removal add-ons, and the Notice of Commencement.",
    category: "Permits",
    publishedAt: "2026-11-05",
    updatedAt: "2026-11-05",
    intro:
      "A full home renovation in Palm Beach Gardens touches more than cabinets and tile. Once a project moves past one room and starts changing structure, systems, or the roofline, the city treats it differently than a cosmetic update, with its own paperwork and sequencing. Here is what that actually looks like, using the Building Division's own requirements rather than generic national advice.",
    sections: [
      {
        heading: "What makes a renovation \"full\" rather than a single-room remodel",
        paragraphs: [
          "A single-room remodel usually means new finishes inside an existing footprint: cabinets, counters, flooring, maybe a reconfigured layout within the same walls. A full or whole-home renovation is broader. It typically touches multiple rooms at once and often includes work on electrical, plumbing, HVAC, structural framing, windows, or the roof, sometimes alongside an addition.",
          "That distinction matters because the scope of work drives the scope of permitting. A kitchen refresh might need one building permit. A whole-home job can involve several permits running in parallel, plus separate trade permits for electrical, plumbing, and mechanical work, all tied back to the same address and the same general contractor of record.",
        ],
      },
      {
        heading: "The Palm Beach Gardens permit process",
        paragraphs: [
          "The City of Palm Beach Gardens requires a building permit for most construction, remodeling, or repair work, and that applies to full home renovations just as it does to additions. The Building Division, located at 10500 N Military Trail, is where applications, plan review, and inspections are handled for projects inside city limits.",
          "For a renovation of any real size, expect to submit plans and supporting documents for review before work starts, then schedule inspections at defined points as construction proceeds. The exact checklist of required documents depends on what the project includes, which is why it is worth asking your contractor to walk through the city's residential renovation checklist line by line before you sign anything, rather than assuming one permit covers everything.",
        ],
      },
      {
        heading: "Permits you may not expect: gas, vegetation removal, and the Notice of Commencement",
        paragraphs: [
          "This is where a lot of full-gut projects get tripped up. On the city's own residential addition and renovation checklist, gas work and vegetation removal are each called out as needing their own separate permit application, not just the main building permit. If your renovation includes a new gas line for a range or tankless water heater, or if trees and significant landscaping need to come out to make room for construction, plan on filing for those separately and building the extra review time into your schedule.",
          "The other document homeowners often miss is the Notice of Commencement. Florida law requires that for a direct contract for improvements greater than 2,500 dollars, the owner must file a certified copy of the recorded Notice of Commencement, or a notarized statement that it was filed, before the first inspection takes place. Palm Beach Gardens asks for that certified copy to be filed with the city before permitted work proceeds. Skipping it does not just risk a paperwork headache, it can stall your very first inspection and push the whole timeline back.",
        ],
      },
      {
        heading: "Why these permits exist in the first place",
        paragraphs: [
          "It is reasonable for a homeowner to wonder why a bathroom gut job or a whole-house renovation needs this much review. The city's own explanation is straightforward: building permits exist so construction complies with the Florida Building Code and protects against hazards such as hurricanes and flooding, which are not abstract risks in Palm Beach Gardens, they are the conditions the code is written around.",
          "Wind load requirements, impact-rated openings, and flood-resistant construction details are not add-ons a contractor can skip to save time. They are the baseline the plans are reviewed against, and they are a large part of why structural, electrical, and plumbing changes in a full renovation each get their own look from the Building Division rather than being waved through with a single sign-off.",
        ],
      },
      {
        heading: "How a contractor sequences design, permits, and construction",
        paragraphs: [
          "A well-run full home renovation moves in a deliberate order. Design and engineering come first, since plans have to be complete enough to submit for review. Permit applications and any required trade or specialty permits, including gas and vegetation removal where they apply, get filed next, and that review period needs to be built into the project timeline rather than treated as a formality.",
          "Only once permits are issued does construction typically begin, with inspections scheduled at the stages the permit requires, demolition, rough framing, rough electrical and plumbing, insulation, and final. Treating permitting as step one instead of an afterthought is usually what separates a renovation that stays on schedule from one that gets stopped mid-demolition because an inspection was never scheduled or a Notice of Commencement was never filed.",
        ],
      },
      {
        heading: "Questions worth asking before you sign a full-home contract",
        paragraphs: [
          "Before committing to a whole-home renovation contract, ask who is pulling the permits and whether that includes the separate applications for gas and vegetation removal if your project needs them. Ask who is responsible for filing the Notice of Commencement and confirming it is recorded before the first inspection, since that responsibility is ultimately the owner's under Florida law even when a contractor handles the paperwork.",
          "It also helps to ask what happens if work starts before a permit is issued. Unpermitted work discovered later can mean stop-work orders, retroactive permitting, and inspections on work that is already closed up, which usually costs more time and money than waiting for approval in the first place. A contractor who is comfortable walking you through the Building Division's process, rather than brushing past it, is generally a good sign for how the rest of the project will go.",
        ],
      },
    ],
  },
];

export const blogPosts: BlogPost[] = BLOG_POSTS as BlogPost[];
