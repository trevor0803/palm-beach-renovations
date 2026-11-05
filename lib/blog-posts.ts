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
