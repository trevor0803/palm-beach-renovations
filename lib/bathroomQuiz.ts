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
  noOther?: boolean; // skip the automatic "Something else" option
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
const OTHER: Opt = { id: "other", label: "Something else", sub: "Tell us in your own words" };

// Ids that clear every other pick in a multi-select group.
export const EXCLUSIVE = ["keep", "skip", "not-sure"];

const baseSections: Section[] = [
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
          { id: "curbless", label: "No-step shower", sub: "No threshold to step over", img: "/img/quiz/shower-curbless.jpg", alt: "Curbless walk-in shower with linear drain and gray porcelain tile" },
          { id: "wet-room", label: "Open spa shower", sub: "Rain head, no door", img: "/img/quiz/shower-wet-room.jpg", alt: "Open spa shower with rainfall head and warm stone-look tile" },
          { id: "tub-to-shower", label: "Replace my tub with a shower", sub: "Walk in, no tub wall", img: "/img/quiz/shower-tub-to-shower.jpg", alt: "Alcove shower with white subway tile and sliding glass door replacing a tub" },
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
        layout: "photo",
        opts: [
          { id: "semi-frameless", label: "Semi-frameless glass", sub: "Slim frame, great value", tier: 1, img: "/img/quiz/glass-semi.jpg", alt: "Semi-frameless glass shower door with a slim chrome frame" },
          { id: "curtain", label: "Shower curtain", sub: "Simple and low cost", tier: 1, img: "/img/quiz/glass-curtain.jpg", alt: "White shower curtain on a chrome rod over a tub" },
          { id: "frameless", label: "Frameless glass", sub: "Clean look, no frame edges", tier: 2, img: "/img/quiz/glass-frameless.jpg", alt: "Frameless glass shower door with a brushed nickel handle" },
          { id: "fixed-panel", label: "Fixed glass panel, no door", sub: "Open walk-in look", tier: 2, img: "/img/quiz/glass-fixed.jpg", alt: "Walk-in shower with a single fixed glass panel and no door" },
          { id: "frameless-sliding", label: "Fully frameless sliding glass", sub: "Premium, minimal hardware", tier: 3, img: "/img/quiz/glass-sliding.jpg", alt: "Fully frameless sliding glass shower doors with black hardware" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "shower-comfort",
        label: "Safety and comfort",
        q: "Any safety or comfort features?",
        hint: "Choose all that apply.",
        layout: "photo",
        multi: true,
        hideWhen: { group: "shower-style", ids: ["skip"] },
        opts: [
          { id: "grab-bars", label: "Grab bars", sub: "Stylish, for safety", img: "/img/quiz/comfort-grab-bar.jpg", alt: "Brushed nickel grab bar on a tiled shower wall" },
          { id: "bench", label: "Built-in shower bench", img: "/img/quiz/comfort-bench.jpg", alt: "Built-in tiled shower bench" },
          { id: "handheld", label: "Handheld shower head", sub: "Easier to use sitting or standing", img: "/img/quiz/comfort-handheld.jpg", alt: "Handheld shower head on a slide bar" },
          { id: "slip-resistant", label: "Slip-resistant shower floor", img: "/img/quiz/comfort-slip.jpg", alt: "Slip-resistant pebble shower floor" },
          { id: "niche", label: "Built-in shelf (niche)", sub: "For shampoo and soap", img: "/img/quiz/comfort-niche.jpg", alt: "Built-in tiled shower niche with shampoo bottles" },
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
          { id: "alcove", label: "Standard tub", sub: "Built into the wall", img: "/img/quiz/tub-standard.jpg", alt: "White alcove bathtub with tiled surround" },
          { id: "drop-in", label: "Drop-in soaking tub", sub: "Set into a tiled deck", img: "/img/quiz/tub-drop-in.jpg", alt: "Drop-in soaking tub in a marble-look tile deck" },
          { id: "corner", label: "Corner tub", sub: "Angled into a corner", img: "/img/quiz/tub-corner.jpg", alt: "Oval tub with floor-mounted filler" },
          { id: "walk-in-tub", label: "Walk-in tub", sub: "Door and built-in seat", img: "/img/quiz/tub-walk-in.jpg", alt: "Accessible walk-in tub with hinged door and seat" },
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
        id: "shower-tile",
        label: "Shower and wall tile",
        q: "Which shower and wall tile styles do you like?",
        hint: "Choose as many as you like. Exact tile comes later.",
        layout: "photo",
        multi: true,
        opts: [
          { id: "subway", label: "Subway", sub: "Classic brick pattern", tier: 1, img: "/img/quiz/tile-subway.jpg", alt: "White subway tile shower wall with a built-in niche" },
          { id: "hexagon", label: "Hexagon", sub: "Geometric", tier: 1, img: "/img/quiz/tile-hexagon.jpg", alt: "White hexagon tile with dark grout" },
          { id: "large-format", label: "Large-format porcelain", sub: "Fewer grout lines", tier: 2, img: "/img/quiz/tile-large-format.jpg", alt: "Large-format white marble-look porcelain tile on a bathroom wall" },
          { id: "mosaic", label: "Mosaic accent", sub: "Small-tile accents", tier: 2, img: "/img/quiz/tile-mosaic.jpg", alt: "Small round mosaic tile" },
          { id: "marble-look", label: "Marble look", sub: "Soft veining", tier: 3, img: "/img/quiz/tile-marble-look.jpg", alt: "Marble-look porcelain tile with gray veining" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "floor-tile",
        label: "Floor",
        q: "Which floor styles do you like?",
        hint: "Choose as many as you like. Exact floor comes later.",
        layout: "photo",
        multi: true,
        opts: [
          { id: "vinyl-plank", label: "Waterproof plank", sub: "Light oak look, easy care", tier: 1, img: "/img/quiz/floor-vinyl-plank.jpg", alt: "Light oak waterproof vinyl plank bathroom floor" },
          { id: "wood-look", label: "Wood-look tile", sub: "Warm, durable", tier: 1, img: "/img/quiz/floor-wood-look.jpg", alt: "Walnut wood-look porcelain plank floor" },
          { id: "large-format", label: "Large-format tile", sub: "Fewer grout lines", tier: 2, img: "/img/quiz/floor-large-format.jpg", alt: "Large-format gray porcelain floor tile" },
          { id: "hexagon", label: "Hexagon mosaic", sub: "Classic pattern", tier: 2, img: "/img/quiz/floor-hexagon.jpg", alt: "White and black hexagon mosaic floor" },
          { id: "patterned", label: "Patterned tile", sub: "Bold, decorative", tier: 3, img: "/img/quiz/floor-patterned.jpg", alt: "Patterned cement-look floor tile" },
          { id: "stone", label: "Natural stone", sub: "Travertine, warm tones", tier: 3, img: "/img/quiz/floor-stone.jpg", alt: "Honed travertine bathroom floor" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "floor-heat",
        label: "Heated floor",
        q: "Want heated floors?",
        hint: "Warm underfoot.",
        layout: "text",
        noOther: true,
        hideWhen: { group: "floor-tile", ids: ["keep"] },
        opts: [
          { id: "yes", label: "Yes, add heated floors" },
          { id: "no", label: "No thanks" },
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
        layout: "photo",
        opts: [
          { id: "comfort", label: "Comfort height", sub: "Taller seat, easier to use", img: "/img/quiz/toilet-comfort.jpg", alt: "Comfort height white toilet" },
          { id: "wall-hung", label: "Wall-hung", sub: "Mounted on the wall, easy to clean", img: "/img/quiz/toilet-wall-hung.jpg", alt: "Wall-hung toilet with concealed tank" },
          { id: "bidet", label: "Toilet with bidet seat", img: "/img/quiz/toilet-bidet.jpg", alt: "Toilet with a bidet seat" },
          { id: "standard", label: "Standard toilet", img: "/img/quiz/toilet-standard.jpg", alt: "Standard white two-piece toilet" },
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
        layout: "photo",
        multi: true,
        opts: [
          { id: "led-mirror", label: "LED backlit mirror", sub: "Glowing edge, even light", img: "/img/quiz/light-led-mirror.jpg", alt: "LED backlit bathroom mirror with a glowing edge" },
          { id: "round-mirror", label: "Round mirror", sub: "Framed, statement look", img: "/img/quiz/light-round-mirror.jpg", alt: "Round black-framed bathroom mirror" },
          { id: "framed-mirror", label: "Large framed mirror", sub: "Classic, full width", img: "/img/quiz/light-framed-mirror.jpg", alt: "Large framed gold bathroom mirror" },
          { id: "vanity-lights", label: "New vanity light fixtures", img: "/img/quiz/light-sconces.jpg", alt: "Wall sconce vanity lights beside a mirror" },
          { id: "recessed", label: "Ceiling lights", sub: "Flush with the ceiling", img: "/img/quiz/light-recessed.jpg", alt: "Recessed ceiling lights" },
          { id: "shower-light", label: "Light in the shower", img: "/img/quiz/light-shower.jpg", alt: "Recessed light in a tiled shower" },
          { id: "exhaust-fan", label: "Quiet exhaust fan", img: "/img/quiz/light-fan.jpg", alt: "Quiet exhaust fan with LED light" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "storage",
        label: "Storage and upgrades",
        q: "Which storage and upgrades?",
        hint: "Choose all that apply.",
        layout: "photo",
        multi: true,
        opts: [
          { id: "linen-cabinet", label: "Linen cabinet", img: "/img/quiz/store-linen.jpg", alt: "Tall linen cabinet beside a vanity" },
          { id: "medicine-cabinet", label: "Medicine cabinet", sub: "Built into the wall", img: "/img/quiz/store-medicine.jpg", alt: "Recessed medicine cabinet in the wall" },
          { id: "heated-towel", label: "Heated towel rack", img: "/img/quiz/store-towel-rack.jpg", alt: "Heated towel rack" },
          { id: "skip", label: "None of these" },
        ],
      },
    ],
  },
];

// Every question ends with "Something else" (the page shows a text box when it is picked).
export const sections: Section[] = baseSections.map((sec) => ({
  ...sec,
  groups: sec.groups.map((gr) => (gr.noOther ? gr : { ...gr, opts: [...gr.opts, OTHER] })),
}));

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
