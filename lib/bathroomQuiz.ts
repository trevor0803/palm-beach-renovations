// Picture-based bathroom wish list (/bathroom-estimate).
// A big checklist up top; each box that gets ticked opens its own section of choices.
// Every answer is a tap: no free-text fields except the final contact details.
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

export type Section = {
  id: string;
  title: string; // checklist label
  blurb: string; // checklist sub-label
  q: string; // heading inside the opened section
  hint?: string;
  layout: Layout;
  multi?: boolean;
  opts: Opt[]; // options with media render as cards; the rest render as pills
};

const g = (f: string) => `/img/gallery/${f}`;
const NOT_SURE: Opt = { id: "not-sure", label: "Not sure yet" };

export const sections: Section[] = [
  {
    id: "shower",
    title: "New shower",
    blurb: "Walk-in, corner, glass",
    q: "What style of shower?",
    layout: "photo",
    opts: [
      { id: "walk-in", label: "Walk-in shower", img: g("bathroom-marble-walk-in-shower.jpg"), alt: "Walk-in shower with white marble tile and black fixtures" },
      { id: "corner", label: "Corner shower", img: g("bathroom-diamond-tile-corner-shower.jpg"), alt: "Corner shower with diamond-pattern tile and mosaic floor" },
      { id: "glass-bench", label: "Glass enclosure with bench", img: g("bathroom-glass-shower-subway-tile.jpg"), alt: "Glass-enclosed shower with subway tile and built-in bench" },
      { id: "curbless", label: "No-step (curbless) shower" },
      { id: "tub-to-shower", label: "Replace my tub with a shower" },
      NOT_SURE,
    ],
  },
  {
    id: "tub",
    title: "Tub",
    blurb: "Soaking, freestanding, combo",
    q: "What kind of tub?",
    layout: "photo",
    opts: [
      { id: "shower-tub", label: "Shower and tub combo", img: g("bathroom-marble-shower-and-tub.jpg"), alt: "Marble bathroom with a shower and soaking tub" },
      { id: "freestanding", label: "Freestanding tub", img: g("bathroom-floating-wood-vanity-tub.jpg"), alt: "Modern bathroom with a freestanding tub and floating vanity" },
      { id: "alcove", label: "Standard alcove tub" },
      { id: "keep", label: "Keep my current tub" },
      NOT_SURE,
    ],
  },
  {
    id: "vanity",
    title: "Vanity & sinks",
    blurb: "Double, floating, single",
    q: "What kind of vanity?",
    layout: "photo",
    opts: [
      { id: "double", label: "Double vanity", sub: "Two sinks", img: g("bathroom-gray-double-vanity.jpg"), alt: "Gray double vanity" },
      { id: "floating", label: "Floating vanity", sub: "Wall-mounted, modern", img: g("bathroom-floating-wood-vanity-tub.jpg"), alt: "Floating wood vanity" },
      { id: "single", label: "Single vanity" },
      { id: "linen-tower", label: "Vanity with a linen tower" },
      NOT_SURE,
    ],
  },
  {
    id: "tile",
    title: "Tile",
    blurb: "Walls, floor, shower",
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
      NOT_SURE,
    ],
  },
  {
    id: "finish",
    title: "Faucets & fixtures",
    blurb: "Choose a finish",
    q: "Which fixture finish?",
    hint: "Faucets, shower trim and hardware.",
    layout: "color",
    opts: [
      { id: "matte-black", label: "Matte black", color: "linear-gradient(135deg,#2a2a2a,#0f0f0f)" },
      { id: "brushed-nickel", label: "Brushed nickel", color: "linear-gradient(135deg,#d3d6db,#9ea3aa)" },
      { id: "chrome", label: "Polished chrome", color: "linear-gradient(135deg,#ffffff,#b9c0c9 60%,#eef1f4)" },
      { id: "brushed-gold", label: "Brushed gold", color: "linear-gradient(135deg,#e2c283,#b88f3f)" },
      NOT_SURE,
    ],
  },
  {
    id: "glass",
    title: "Shower glass",
    blurb: "Door or enclosure",
    q: "What kind of shower glass?",
    layout: "text",
    opts: [
      { id: "frameless", label: "Frameless glass", sub: "Clean, open look" },
      { id: "semi-frameless", label: "Semi-frameless glass", sub: "Budget friendly" },
      { id: "fixed-panel", label: "Fixed glass panel, no door" },
      { id: "curtain", label: "Shower curtain" },
      NOT_SURE,
    ],
  },
  {
    id: "toilet",
    title: "Toilet",
    blurb: "Comfort height and more",
    q: "What kind of toilet?",
    layout: "text",
    opts: [
      { id: "comfort", label: "Comfort height", sub: "Easier to sit and stand" },
      { id: "wall-hung", label: "Wall-hung", sub: "Sleek, easy to clean" },
      { id: "bidet", label: "Toilet with bidet seat" },
      { id: "standard", label: "Standard toilet" },
      NOT_SURE,
    ],
  },
  {
    id: "lighting",
    title: "Lighting & mirrors",
    blurb: "LED, vanity lights",
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
      NOT_SURE,
    ],
  },
  {
    id: "extras",
    title: "Storage & upgrades",
    blurb: "Niche, bench, heated floor",
    q: "Which extras do you want?",
    hint: "Select all that apply.",
    layout: "text",
    multi: true,
    opts: [
      { id: "niche", label: "Built-in shower niche" },
      { id: "bench", label: "Shower bench" },
      { id: "heated-floor", label: "Heated floor" },
      { id: "linen-cabinet", label: "Linen cabinet" },
      { id: "medicine-cabinet", label: "Recessed medicine cabinet" },
      { id: "grab-bars", label: "Grab bars (stylish, safety)" },
      NOT_SURE,
    ],
  },
];

// Quick pill questions shown after the sections. Single select.
export type Basic = { id: string; q: string; opts: { id: string; label: string }[] };

export const basics: Basic[] = [
  {
    id: "room",
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
