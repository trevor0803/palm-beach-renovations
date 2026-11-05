// Kitchen wish list (/kitchen-estimate). Same engine as the bathroom one (components/BathroomQuiz.tsx),
// different questions. No prices are shown to customers and there are no product tiers here.
// Photos are PBR's own finished kitchens plus the shared style images in public/img/quiz.
import type { Group, Opt, Section } from "@/lib/bathroomQuiz";

export const EXCLUSIVE = ["keep", "skip", "not-sure"];

const g = (f: string) => `/img/gallery/${f}`;
const KEEP: Opt = { id: "keep", label: "Keep what I have" };
const SKIP: Opt = { id: "skip", label: "Skip this" };
const NOT_SURE: Opt = { id: "not-sure", label: "Not sure yet" };
const OTHER: Opt = { id: "other", label: "Something else", sub: "Tell us in your own words" };

const baseSections: Section[] = [
  {
    id: "cabinets",
    title: "Cabinets",
    groups: [
      {
        id: "cabinet-style",
        label: "Cabinet style",
        q: "What style of cabinets do you like?",
        layout: "photo",
        opts: [
          { id: "shaker-light", label: "Shaker, painted light", sub: "Classic and clean", img: g("kitchen-remodel-9.jpg"), alt: "White kitchen with shaker cabinets" },
          { id: "shaker-dark", label: "Shaker, deep color", sub: "Navy, charcoal, green", img: g("kitchen-remodel-6.jpg"), alt: "Navy shaker kitchen with a marble island" },
          { id: "slab-wood", label: "Flat-panel, wood grain", sub: "Modern and warm", img: g("kitchen-gray-woodgrain-cabinets.jpg"), alt: "Kitchen with flat-panel woodgrain cabinets" },
          { id: "natural-wood", label: "Natural wood", sub: "Light, honey or walnut tones", img: g("kitchen-remodel-12.jpg"), alt: "Kitchen with natural wood cabinets and wood-look floors" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "cabinet-color",
        label: "Cabinet color",
        q: "Which cabinet colors do you like?",
        hint: "Choose as many as you like. Exact shades come later.",
        layout: "color",
        multi: true,
        hideWhen: { group: "cabinet-style", ids: ["keep"] },
        opts: [
          { id: "white", label: "Crisp white", color: "#fbfbf8" },
          { id: "soft-gray", label: "Soft gray", color: "#c4c8cc" },
          { id: "navy", label: "Deep navy", color: "#1f3350" },
          { id: "charcoal", label: "Charcoal or black", color: "#2b2e33" },
          { id: "sage", label: "Sage green", color: "#a7b5a0" },
          { id: "wood", label: "Natural wood", color: "#b98a55" },
          { id: "two-tone", label: "Two-tone", sub: "Island and perimeter differ", color: "#8a93a8" },
          NOT_SURE,
        ],
      },
      {
        id: "cabinet-hardware",
        label: "Cabinet hardware",
        q: "What finish for the pulls and knobs?",
        layout: "text",
        multi: true,
        hideWhen: { group: "cabinet-style", ids: ["keep"] },
        opts: [
          { id: "brushed-gold", label: "Brushed gold" },
          { id: "matte-black", label: "Matte black" },
          { id: "brushed-nickel", label: "Brushed nickel" },
          { id: "chrome", label: "Chrome" },
          { id: "push-open", label: "No hardware", sub: "Push-open or integrated pulls" },
          NOT_SURE,
        ],
      },
    ],
  },
  {
    id: "counters",
    title: "Countertops",
    groups: [
      {
        id: "counter-material",
        label: "Countertops",
        q: "What countertops do you like?",
        hint: "Choose as many as you like.",
        layout: "color",
        multi: true,
        opts: [
          { id: "quartz-white", label: "Quartz, white", sub: "Clean and low maintenance", color: "#f1f0ec" },
          { id: "quartz-marble", label: "Quartz, marble look", sub: "Soft veining", color: "#dcdad6" },
          { id: "granite", label: "Granite", sub: "Natural stone", color: "#4a4744" },
          { id: "butcher-block", label: "Butcher block", sub: "Warm wood, great on an island", color: "#b98a55" },
          { id: "marble", label: "Marble", sub: "Natural, needs more care", color: "#e9e7e3" },
          { id: "dark-stone", label: "Dark stone look", sub: "Soapstone or charcoal tones", color: "#4b5050" },
          { id: "custom", label: "Custom or mixed", sub: "Different tops for the island and perimeter", color: "#9aa0a6" },
          KEEP,
          NOT_SURE,
        ],
      },
    ],
  },
  {
    id: "layout",
    title: "Layout & island",
    groups: [
      {
        id: "layout-change",
        label: "Layout",
        q: "What about the layout?",
        hint: "Choose all that apply.",
        layout: "text",
        multi: true,
        noOther: false,
        opts: [
          { id: "island", label: "Add or enlarge an island" },
          { id: "open", label: "Open the kitchen to the living area", sub: "Take out or reshape a wall" },
          { id: "move", label: "Move the sink, range or refrigerator" },
          { id: "full", label: "Redesign the whole floor plan", sub: "I would like advice" },
          KEEP,
          NOT_SURE,
        ],
      },
    ],
  },
  {
    id: "backsplash",
    title: "Backsplash",
    groups: [
      {
        id: "backsplash-style",
        label: "Backsplash",
        q: "What kind of backsplash do you like?",
        hint: "Choose as many as you like.",
        layout: "color",
        multi: true,
        opts: [
          { id: "subway", label: "Classic subway tile", color: "#f7f7f5" },
          { id: "herringbone", label: "Herringbone or linear", sub: "Stacked or angled strips", color: "#d9dcd6" },
          { id: "hexagon", label: "Hexagon or geometric", color: "#c9d3d6" },
          { id: "arabesque", label: "Arabesque or scalloped", color: "#e7e1d6" },
          { id: "marble-look", label: "Marble-look tile", color: "#e1dfdb" },
          { id: "handmade", label: "Handmade look", sub: "Zellige style, glossy and varied", color: "#7fa59a" },
          { id: "slab", label: "Full-height slab", sub: "Same stone as the counter", color: "#cfcbc5" },
          { id: "stacked-stone", label: "Stacked stone", color: "#b9ad9d" },
          KEEP,
          NOT_SURE,
        ],
      },
    ],
  },
  {
    id: "floor",
    title: "Flooring",
    groups: [
      {
        id: "floor-material",
        label: "Flooring",
        q: "What flooring do you like?",
        layout: "photo",
        opts: [
          { id: "wood-look", label: "Wood-look tile", sub: "Looks like wood, built for Florida", img: "/img/quiz/floor-wood-look.jpg", alt: "Wood-look porcelain plank tile" },
          { id: "large-format", label: "Large-format tile", sub: "Fewer grout lines", img: "/img/quiz/floor-large-format.jpg", alt: "Large-format gray porcelain floor tile" },
          { id: "travertine-look", label: "Natural stone or travertine look", sub: "Warm tones", img: "/img/quiz/floor-stone.jpg", alt: "Honed travertine floor" },
          { id: "vinyl-plank", label: "Vinyl or hybrid plank", sub: "Warm and water resistant", img: "/img/quiz/floor-vinyl-plank.jpg", alt: "Vinyl plank flooring" },
          { id: "pattern", label: "Checkerboard or herringbone", sub: "A pattern as the statement", img: "/img/quiz/floor-patterned.jpg", alt: "Patterned floor tile" },
          { id: "hardwood", label: "Hardwood", sub: "Engineered or solid" },
          KEEP,
          NOT_SURE,
        ],
      },
    ],
  },
  {
    id: "sink",
    title: "Sink & faucet",
    groups: [
      {
        id: "sink-style",
        label: "Sink",
        q: "What kind of sink?",
        layout: "text",
        opts: [
          { id: "undermount-single", label: "Undermount, single bowl" },
          { id: "undermount-double", label: "Undermount, double bowl" },
          { id: "farmhouse", label: "Farmhouse sink", sub: "Apron front" },
          { id: "workstation", label: "Workstation sink", sub: "Ledge for boards and racks" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "faucet-finish",
        label: "Faucet finish",
        q: "What faucet finish do you like?",
        layout: "photo",
        multi: true,
        opts: [
          { id: "matte-black", label: "Matte black", img: "/img/quiz/faucet-matte-black.jpg", alt: "Matte black faucet" },
          { id: "brushed-gold", label: "Brushed gold", img: "/img/quiz/faucet-brushed-gold.jpg", alt: "Brushed gold faucet" },
          { id: "brushed-nickel", label: "Brushed nickel", img: "/img/quiz/faucet-brushed-nickel.jpg", alt: "Brushed nickel faucet" },
          { id: "chrome", label: "Chrome", img: "/img/quiz/faucet-chrome.jpg", alt: "Chrome faucet" },
          KEEP,
          NOT_SURE,
        ],
      },
    ],
  },
  {
    id: "extras",
    title: "Lighting, appliances & storage",
    groups: [
      {
        id: "kitchen-lighting",
        label: "Lighting",
        q: "What lighting would you like?",
        hint: "Choose all that apply.",
        layout: "text",
        multi: true,
        opts: [
          { id: "recessed", label: "Recessed lights" },
          { id: "pendants", label: "Pendants over the island" },
          { id: "under-cabinet", label: "Under-cabinet lighting" },
          { id: "statement", label: "A statement fixture", sub: "Chandelier or large pendant" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "appliances",
        label: "Appliances",
        q: "What about appliances?",
        layout: "text",
        noOther: true,
        opts: [
          { id: "all-new", label: "All new appliances" },
          { id: "some-new", label: "Some new appliances" },
          { id: "keep-mine", label: "Keeping my appliances" },
          NOT_SURE,
        ],
      },
      {
        id: "kitchen-storage",
        label: "Storage",
        q: "Any storage features you want?",
        hint: "Choose all that apply.",
        layout: "text",
        multi: true,
        opts: [
          { id: "pantry", label: "Pantry cabinet" },
          { id: "pull-outs", label: "Pull-out organizers" },
          { id: "corner", label: "Corner solutions", sub: "Lazy Susan or pull-out corners" },
          { id: "trash", label: "Hidden trash and recycling" },
          { id: "coffee-bar", label: "Coffee or drink station" },
          SKIP,
        ],
      },
    ],
  },
];

export const sections: Section[] = baseSections.map((sec) => ({
  ...sec,
  groups: sec.groups.map((gr: Group) => (gr.noOther ? gr : { ...gr, opts: [...gr.opts, OTHER] })),
}));

export const basics = [
  {
    id: "room",
    label: "Kitchen size",
    q: "How big is your kitchen?",
    opts: [
      { id: "small", label: "Small", sub: "Galley or compact" },
      { id: "medium", label: "Medium" },
      { id: "large", label: "Large" },
      { id: "open", label: "Open to the living area" },
      { id: "not-sure", label: "Not sure" },
    ],
  },
  {
    id: "timeline",
    label: "Start",
    q: "When would you like to start?",
    opts: [
      { id: "asap", label: "As soon as possible" },
      { id: "1-3", label: "In 1 to 3 months" },
      { id: "3-6", label: "In 3 to 6 months" },
      { id: "research", label: "Just exploring" },
    ],
  },
  {
    id: "budget",
    label: "Budget",
    q: "Rough budget range?",
    hint: "This helps us suggest realistic options. It is not a quote.",
    opts: [
      { id: "u30", label: "Under $30,000" },
      { id: "30-50", label: "$30,000 to $50,000" },
      { id: "50-80", label: "$50,000 to $80,000" },
      { id: "80+", label: "$80,000 or more" },
      { id: "not-sure", label: "Not sure" },
    ],
  },
];

export const CONTACT_TIMES = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
];

export const AREAS: { id: string; label: string; sub?: string; groups: string[] }[] = [
  { id: "cabinets", label: "Cabinets", sub: "Style, color, hardware", groups: ["cabinet-style", "cabinet-color", "cabinet-hardware"] },
  { id: "counters", label: "Countertops", groups: ["counter-material"] },
  { id: "layout", label: "Layout and island", sub: "Open up or move things", groups: ["layout-change"] },
  { id: "backsplash", label: "Backsplash", groups: ["backsplash-style"] },
  { id: "floor", label: "Flooring", groups: ["floor-material"] },
  { id: "sink", label: "Sink and faucet", groups: ["sink-style", "faucet-finish"] },
  { id: "lighting", label: "Lighting", groups: ["kitchen-lighting"] },
  { id: "appliances", label: "Appliances", groups: ["appliances"] },
  { id: "storage", label: "Storage", sub: "Pantry, pull-outs", groups: ["kitchen-storage"] },
];

export const INTRO = ["room"];
export const AFTER_AREAS: string[] = [];
export const OUTRO = ["timeline", "budget"];
