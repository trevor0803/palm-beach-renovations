// Picture-based bathroom estimate (/bathroom-estimate).
// A guided walk through every part of the bathroom. Every question must be answered, and
// "Keep the same" / "Don't need" count as answers, so each lead arrives complete.
// Photos are PBR's own finished projects (public/img/gallery); tile styles are drawn swatches.

export type Layout = "photo" | "swatch" | "color" | "text";

export type Opt = {
  id: string;
  label: string;
  sub?: string;
  img?: string;
  alt?: string;
  swatch?: "large" | "subway" | "marble" | "mosaic" | "hex" | "wood";
  color?: string;
};

export type Group = {
  id: string;
  label: string; // short name used in the lead notes
  q: string;
  hint?: string;
  layout: Layout;
  multi?: boolean;
  opts: Opt[];
  // Optional tie to an earlier group in the same section.
  hideWhen?: { group: string; ids: string[] }; // hide (and record "Not applicable") when that answer is picked
  askWhen?: { group: string; id: string; q: string }; // reword the question when that answer is picked
};

export type Section = {
  id: string;
  title: string;
  groups: Group[];
};

const g = (f: string) => `/img/gallery/${f}`;
const KEEP: Opt = { id: "keep", label: "Keep the same" };
const SKIP: Opt = { id: "skip", label: "Don't need" };
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
          { id: "curbless", label: "No-step (curbless) shower" },
          { id: "tub-to-shower", label: "Replace my tub with a shower" },
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
          { id: "frameless", label: "Frameless glass", sub: "Clean, open look" },
          { id: "semi-frameless", label: "Semi-frameless glass", sub: "Budget friendly" },
          { id: "fixed-panel", label: "Fixed glass panel, no door" },
          { id: "curtain", label: "Shower curtain" },
          KEEP,
          SKIP,
          NOT_SURE,
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
          { id: "alcove", label: "Standard alcove tub" },
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
          { id: "double", label: "Double vanity", sub: "Two sinks", img: g("bathroom-gray-double-vanity.jpg"), alt: "Gray double vanity" },
          { id: "floating", label: "Floating vanity", sub: "Wall-mounted, modern", img: g("bathroom-floating-wood-vanity-tub.jpg"), alt: "Floating wood vanity" },
          { id: "single", label: "Single vanity" },
          { id: "linen-tower", label: "Vanity with a linen tower" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "faucet-finish",
        label: "Faucet and fixture finish",
        q: "Which faucet and fixture finish?",
        hint: "Faucets, shower trim and hardware.",
        layout: "color",
        opts: [
          { id: "matte-black", label: "Matte black", color: "linear-gradient(135deg,#2a2a2a,#0f0f0f)" },
          { id: "brushed-nickel", label: "Brushed nickel", color: "linear-gradient(135deg,#d3d6db,#9ea3aa)" },
          { id: "chrome", label: "Polished chrome", color: "linear-gradient(135deg,#ffffff,#b9c0c9 60%,#eef1f4)" },
          { id: "brushed-gold", label: "Brushed gold", color: "linear-gradient(135deg,#e2c283,#b88f3f)" },
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
        hint: "Pick as many as you like. Exact tile comes later.",
        layout: "swatch",
        multi: true,
        opts: [
          { id: "large-format", label: "Large-format porcelain", sub: "Clean, few grout lines", swatch: "large" },
          { id: "subway", label: "Subway", sub: "Classic brick pattern", swatch: "subway" },
          { id: "marble-look", label: "Marble look", sub: "Soft veining", swatch: "marble" },
          { id: "mosaic", label: "Mosaic", sub: "Small-tile accents", swatch: "mosaic" },
          { id: "hexagon", label: "Hexagon", sub: "Geometric", swatch: "hex" },
          { id: "wood-look", label: "Wood-look plank", sub: "Warm, durable", swatch: "wood" },
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
          { id: "heated-floor", label: "New floor with heated tile" },
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
        hint: "Pick as many as you like. Exact shades come later.",
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
          { id: "comfort", label: "Comfort height", sub: "Easier to sit and stand" },
          { id: "wall-hung", label: "Wall-hung", sub: "Sleek, easy to clean" },
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
        hint: "Select all that apply.",
        layout: "text",
        multi: true,
        opts: [
          { id: "led-mirror", label: "LED backlit mirror" },
          { id: "vanity-lights", label: "New vanity light fixtures" },
          { id: "recessed", label: "Recessed ceiling lights" },
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
        hint: "Select all that apply.",
        layout: "text",
        multi: true,
        opts: [
          { id: "niche", label: "Built-in shower niche" },
          { id: "bench", label: "Shower bench" },
          { id: "linen-cabinet", label: "Linen cabinet" },
          { id: "medicine-cabinet", label: "Recessed medicine cabinet" },
          { id: "grab-bars", label: "Grab bars (stylish, safety)" },
          { id: "skip", label: "None of these" },
        ],
      },
    ],
  },
];

// Quick pill questions shown after the sections. Single select, all required.
export type Basic = { id: string; label: string; q: string; opts: { id: string; label: string }[] };

export const basics: Basic[] = [
  {
    id: "room",
    label: "Bathroom",
    q: "Which bathroom is it?",
    opts: [
      { id: "primary", label: "Primary / master bath" },
      { id: "guest", label: "Guest bath" },
      { id: "hall", label: "Hall or kids' bath" },
      { id: "powder", label: "Powder room" },
    ],
  },
  {
    id: "timeline",
    label: "Timeline",
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
    opts: [
      { id: "u15", label: "Under $15,000" },
      { id: "15-25", label: "$15,000 to $25,000" },
      { id: "25-40", label: "$25,000 to $40,000" },
      { id: "40+", label: "$40,000 or more" },
      { id: "not-sure", label: "Not sure" },
    ],
  },
];
