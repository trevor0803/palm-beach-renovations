// Picture-based bathroom estimate (/bathroom-estimate).
// A guided walk through every part of the bathroom. Every question must be answered, and
// "Keep what I have" / "Skip this" count as answers, so each lead arrives complete.
// Photos are PBR's own finished projects (public/img/gallery) plus generated style images (public/img/quiz).
// Tiers (1 Essential, 2 Select, 3 Signature) are set from the price bands of comparable
// Floor & Decor products. No prices are ever shown to customers.

export type Layout = "photo" | "swatch" | "color" | "text";
export type Tier = 1 | 2 | 3;

export type Opt = {
  id: string;
  label: string;
  sub?: string;
  img?: string;
  alt?: string;
  swatch?: "large" | "subway" | "marble" | "mosaic" | "hex" | "wood";
  color?: string;
  tier?: Tier;
};

export type Group = {
  id: string;
  label: string; // short name used in the lead notes
  q: string;
  hint?: string;
  layout: Layout;
  multi?: boolean;
  opts: Opt[];
  hideWhen?: { group: string; ids: string[] }; // hide (record "Not applicable") when that answer is picked
  askWhen?: { group: string; id: string; q: string }; // reword the question when that answer is picked
};

export type Section = {
  id: string;
  title: string;
  groups: Group[];
};

export const TIERS: Record<Tier, { name: string; blurb: string }> = {
  1: { name: "Essential", blurb: "Great value, solid quality" },
  2: { name: "Select", blurb: "Upgraded materials and finishes" },
  3: { name: "Signature", blurb: "Premium, showpiece quality" },
};

const g = (f: string) => `/img/gallery/${f}`;
const KEEP: Opt = { id: "keep", label: "Keep what I have" };
const SKIP: Opt = { id: "skip", label: "Skip this" };
const NOT_SURE: Opt = { id: "not-sure", label: "Not sure yet" };

// Ids that clear every other pick in a multi-select group.
export const EXCLUSIVE = ["keep", "skip", "not-sure"];

export const sections: Section[] = [
  {
    id: "shower",
    title: "Shower & glass",
    groups: [
      {
        id: "shower-style",
        label: "Shower style",
        q: "What style of shower?",
        layout: "photo",
        opts: [
          { id: "walk-in", label: "Walk-in shower", img: g("bathroom-marble-walk-in-shower.jpg"), alt: "Walk-in shower with white marble tile and black fixtures" },
          { id: "corner", label: "Corner shower", img: g("bathroom-diamond-tile-corner-shower.jpg"), alt: "Corner shower with diamond-pattern tile and mosaic floor" },
          { id: "glass-bench", label: "Glass enclosure with bench", img: g("bathroom-glass-shower-subway-tile.jpg"), alt: "Glass-enclosed shower with subway tile and built-in bench" },
          { id: "curbless", label: "No-step shower", sub: "No threshold to step over" },
          { id: "tub-to-shower", label: "Replace my tub with a shower", sub: "Walk in, no tub wall" },
          KEEP,
          SKIP,
          NOT_SURE,
        ],
      },
      {
        id: "shower-glass",
        label: "Shower glass",
        q: "What about the shower glass?",
        hideWhen: { group: "shower-style", ids: ["skip"] },
        askWhen: { group: "shower-style", id: "keep", q: "Want new glass on your current shower?" },
        layout: "text",
        opts: [
          { id: "semi-frameless", label: "Semi-frameless glass", sub: "Slim frame, great value", tier: 1 },
          { id: "curtain", label: "Shower curtain", sub: "Simple and low cost", tier: 1 },
          { id: "frameless", label: "Frameless glass", sub: "Clean look, no frame edges", tier: 2 },
          { id: "fixed-panel", label: "Fixed glass panel, no door", sub: "Open walk-in look", tier: 2 },
          { id: "frameless-sliding", label: "Fully frameless sliding glass", sub: "Premium, minimal hardware", tier: 3 },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "shower-comfort",
        label: "Safety and comfort",
        q: "Any safety or comfort features?",
        hint: "Choose all that apply.",
        layout: "text",
        multi: true,
        hideWhen: { group: "shower-style", ids: ["skip"] },
        opts: [
          { id: "grab-bars", label: "Grab bars", sub: "Stylish, for safety" },
          { id: "bench", label: "Built-in shower bench" },
          { id: "handheld", label: "Handheld shower head", sub: "Easier to use sitting or standing" },
          { id: "slip-resistant", label: "Slip-resistant shower floor" },
          { id: "niche", label: "Built-in shelf (niche)", sub: "For shampoo and soap" },
          { id: "skip", label: "None of these" },
        ],
      },
    ],
  },
  {
    id: "tub",
    title: "Tub",
    groups: [
      {
        id: "tub-style",
        label: "Tub",
        q: "What kind of tub?",
        layout: "photo",
        opts: [
          { id: "shower-tub", label: "Shower and tub combo", img: g("bathroom-marble-shower-and-tub.jpg"), alt: "Marble bathroom with a shower and soaking tub" },
          { id: "freestanding", label: "Freestanding tub", img: g("bathroom-floating-wood-vanity-tub.jpg"), alt: "Modern bathroom with a freestanding tub and floating vanity" },
          { id: "alcove", label: "Standard tub", sub: "Built into the wall" },
          KEEP,
          { id: "skip", label: "No tub needed" },
          NOT_SURE,
        ],
      },
    ],
  },
  {
    id: "vanity",
    title: "Vanity & faucets",
    groups: [
      {
        id: "vanity-style",
        label: "Vanity",
        q: "What kind of vanity?",
        layout: "photo",
        opts: [
          { id: "navy-31", label: "Classic painted", sub: "Deep navy, gold hardware", tier: 1, img: "/img/quiz/vanity-navy.jpg", alt: "Deep navy compact bathroom vanity with gold hardware" },
          { id: "mist-gray-48", label: "Shaker with mirror", sub: "Soft gray, framed mirror", tier: 1, img: "/img/quiz/vanity-mist-gray.jpg", alt: "Mist gray bathroom vanity with a framed mirror" },
          { id: "oak-37", label: "Modern light wood", sub: "Clean lines, single sink", tier: 2, img: "/img/quiz/vanity-oak-single.jpg", alt: "Light oak bathroom vanity with an engineered stone top" },
          { id: "cinnamon-49", label: "Warm wood", sub: "Rich tone, white top", tier: 2, img: "/img/quiz/vanity-cinnamon.jpg", alt: "Cinnamon wood bathroom vanity with a white quartz top" },
          { id: "walnut-37", label: "Marble-top walnut", sub: "Statement stone top", tier: 3, img: "/img/quiz/vanity-walnut.jpg", alt: "Walnut bathroom vanity with a Carrara marble top" },
          { id: "oak-double-61", label: "Double-sink", sub: "Two sinks, natural oak", tier: 3, img: "/img/quiz/vanity-oak-double.jpg", alt: "Natural oak double-sink bathroom vanity" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "faucet-finish",
        label: "Faucet and fixture finish",
        q: "Which faucet and fixture finish?",
        hint: "Faucets, shower trim and hardware.",
        layout: "photo",
        opts: [
          { id: "matte-black", label: "Matte black", img: "/img/quiz/faucet-matte-black.jpg", alt: "Matte black bathroom faucet" },
          { id: "brushed-nickel", label: "Brushed nickel", img: "/img/quiz/faucet-brushed-nickel.jpg", alt: "Brushed nickel bathroom faucet" },
          { id: "chrome", label: "Polished chrome", img: "/img/quiz/faucet-chrome.jpg", alt: "Polished chrome bathroom faucet" },
          { id: "brushed-gold", label: "Brushed gold", img: "/img/quiz/faucet-brushed-gold.jpg", alt: "Brushed gold bathroom faucet" },
          KEEP,
          NOT_SURE,
        ],
      },
    ],
  },
  {
    id: "tile",
    title: "Tile & flooring",
    groups: [
      {
        id: "tile-style",
        label: "Tile styles",
        q: "Which tile styles do you like?",
        hint: "Choose as many as you like. Exact tile comes later.",
        layout: "photo",
        multi: true,
        opts: [
          { id: "subway", label: "Subway", sub: "Classic brick pattern", tier: 1, img: "/img/quiz/tile-subway.jpg", alt: "White subway tile shower wall with a built-in niche" },
          { id: "wood-look", label: "Wood-look plank", sub: "Warm, durable", tier: 1, img: "/img/quiz/tile-wood-look.jpg", alt: "Walnut wood-look porcelain plank floor" },
          { id: "hexagon", label: "Hexagon", sub: "Geometric", tier: 1, img: "/img/quiz/tile-hexagon.jpg", alt: "White hexagon floor tile with dark grout" },
          { id: "large-format", label: "Large-format porcelain", sub: "Fewer grout lines", tier: 2, img: "/img/quiz/tile-large-format.jpg", alt: "Large-format white marble-look porcelain tile on a bathroom wall" },
          { id: "mosaic", label: "Mosaic", sub: "Small-tile accents", tier: 2, img: "/img/quiz/tile-mosaic.jpg", alt: "Small round mosaic floor tile" },
          { id: "marble-look", label: "Marble look", sub: "Soft veining", tier: 3, img: "/img/quiz/tile-marble-look.jpg", alt: "Marble-look porcelain tile with gray veining" },
          KEEP,
          SKIP,
          NOT_SURE,
        ],
      },
      {
        id: "flooring",
        label: "Flooring",
        q: "What about the floor?",
        layout: "text",
        opts: [
          { id: "tile-floor", label: "New tile floor" },
          { id: "plank-floor", label: "New waterproof plank floor" },
          { id: "heated-floor", label: "New floor with heated tile", sub: "Warm underfoot" },
          KEEP,
          NOT_SURE,
        ],
      },
    ],
  },
  {
    id: "paint",
    title: "Paint",
    groups: [
      {
        id: "paint-colors",
        label: "Paint colors",
        q: "Which paint colors do you like?",
        hint: "Choose as many as you like. Exact shades come later.",
        layout: "color",
        multi: true,
        opts: [
          { id: "crisp-white", label: "Crisp white", color: "#fbfbf8" },
          { id: "warm-greige", label: "Warm greige", color: "#cfc6b8" },
          { id: "soft-gray", label: "Soft gray", color: "#c4c8cc" },
          { id: "sage", label: "Sage green", color: "#a7b5a0" },
          { id: "spa-blue", label: "Spa blue", color: "#a9c9d6" },
          { id: "blush", label: "Blush", color: "#e8c9c2" },
          { id: "navy", label: "Deep navy", color: "#1f3350" },
          { id: "charcoal", label: "Charcoal", color: "#3b3f45" },
          KEEP,
          NOT_SURE,
        ],
      },
    ],
  },
  {
    id: "toilet",
    title: "Toilet",
    groups: [
      {
        id: "toilet-style",
        label: "Toilet",
        q: "What kind of toilet?",
        layout: "text",
        opts: [
          { id: "comfort", label: "Comfort height", sub: "Taller seat, easier to use" },
          { id: "wall-hung", label: "Wall-hung", sub: "Mounted on the wall, easy to clean" },
          { id: "bidet", label: "Toilet with bidet seat" },
          { id: "standard", label: "Standard toilet" },
          KEEP,
          NOT_SURE,
        ],
      },
    ],
  },
  {
    id: "extras",
    title: "Lighting, storage & extras",
    groups: [
      {
        id: "lighting",
        label: "Lighting and mirrors",
        q: "What lighting and mirrors?",
        hint: "Choose all that apply.",
        layout: "text",
        multi: true,
        opts: [
          { id: "led-mirror", label: "LED backlit mirror", sub: "Glowing edge, even light" },
          { id: "vanity-lights", label: "New vanity light fixtures" },
          { id: "recessed", label: "Ceiling lights", sub: "Flush with the ceiling" },
          { id: "shower-light", label: "Light in the shower" },
          { id: "exhaust-fan", label: "Quiet exhaust fan" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "storage",
        label: "Storage and upgrades",
        q: "Which storage and upgrades?",
        hint: "Choose all that apply.",
        layout: "text",
        multi: true,
        opts: [
          { id: "linen-cabinet", label: "Linen cabinet" },
          { id: "medicine-cabinet", label: "Medicine cabinet", sub: "Built into the wall" },
          { id: "heated-towel", label: "Heated towel rack" },
          { id: "skip", label: "None of these" },
        ],
      },
    ],
  },
];

// Quick pill questions shown after the sections. Single select, all required.
export type Basic = { id: string; label: string; q: string; hint?: string; opts: { id: string; label: string; sub?: string }[] };

export const basics: Basic[] = [
  {
    id: "room",
    label: "Which bath",
    q: "Which bathroom is it?",
    opts: [
      { id: "primary", label: "Primary / master bath" },
      { id: "guest", label: "Guest bath" },
      { id: "hall", label: "Hall or kids' bath" },
      { id: "powder", label: "Powder room" },
    ],
  },
  {
    id: "level",
    label: "Style level",
    q: "Which style level feels right overall?",
    hint: "A starting point only. You can mix levels.",
    opts: [
      { id: "tier-1", label: "Tier 1 · Essential", sub: TIERS[1].blurb },
      { id: "tier-2", label: "Tier 2 · Select", sub: TIERS[2].blurb },
      { id: "tier-3", label: "Tier 3 · Signature", sub: TIERS[3].blurb },
      { id: "not-sure", label: "Not sure yet" },
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
      { id: "u15", label: "Under $15,000" },
      { id: "15-25", label: "$15,000 to $25,000" },
      { id: "25-40", label: "$25,000 to $40,000" },
      { id: "40+", label: "$40,000 or more" },
      { id: "not-sure", label: "Not sure" },
    ],
  },
];

export const CONTACT_TIMES = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
];
