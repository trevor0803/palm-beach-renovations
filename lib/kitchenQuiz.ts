// Kitchen wish list (/kitchen-estimate). Same engine as the bathroom one (components/BathroomQuiz.tsx),
// different questions. No prices are shown to customers. Options sit under Tier 1 / 2 / 3 (Essential, Select, Signature).
// Photos are generated style images in public/img/quiz (k-*.jpg).
import { TIERS, type Group, type Opt, type Section } from "@/lib/bathroomQuiz";

export const EXCLUSIVE = ["keep", "skip", "not-sure"];

const k = (n: string) => `/img/quiz/k-${n}.jpg`;
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
        hint: "Pick the closest look. Exact colors come later.",
        layout: "photo",
        opts: [
          { id: "shaker-white", label: "Painted shaker, white", sub: "Classic and clean", tier: 1, img: k("cab-shaker-white"), alt: "White painted shaker kitchen cabinets with brushed nickel pulls" },
          { id: "shaker-gray", label: "Painted shaker, soft gray", sub: "Quiet and versatile", tier: 1, img: k("cab-shaker-gray"), alt: "Soft gray shaker kitchen cabinets with matte black pulls" },
          { id: "shaker-navy", label: "Shaker, deep navy", sub: "Bold color, gold hardware", tier: 2, img: k("cab-shaker-navy"), alt: "Deep navy shaker kitchen cabinets with brushed gold pulls" },
          { id: "slab-wood", label: "Flat-panel, walnut grain", sub: "Modern and warm", tier: 2, img: k("cab-slab-wood"), alt: "Walnut flat-panel slab kitchen cabinets" },
          { id: "white-oak", label: "Natural white oak", sub: "Light wood, slim pulls", tier: 3, img: k("cab-white-oak"), alt: "Natural white oak slab kitchen cabinets with slim brass pulls" },
          { id: "two-tone", label: "Two-tone, sage and wood", sub: "Color below, wood above", tier: 3, img: k("cab-two-tone"), alt: "Sage green lower cabinets with natural wood open shelving" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "cabinet-hardware",
        label: "Cabinet hardware",
        q: "What pulls and knobs do you like?",
        hint: "Choose as many as you like.",
        layout: "photo",
        multi: true,
        hideWhen: { group: "cabinet-style", ids: ["keep"] },
        opts: [
          { id: "nickel", label: "Brushed nickel", sub: "Soft, goes with everything", tier: 1, img: k("hw-nickel"), alt: "Brushed nickel knobs and pulls on white cabinets" },
          { id: "black", label: "Matte black bars", sub: "Crisp contrast", tier: 1, img: k("hw-bar-black"), alt: "Matte black bar pull on a gray shaker drawer" },
          { id: "gold", label: "Brushed gold bars", sub: "Warm metal accent", tier: 2, img: k("hw-bar-gold"), alt: "Brushed gold bar pull on a white shaker drawer" },
          { id: "brass-knob", label: "Aged brass knobs", sub: "Traditional charm", tier: 2, img: k("hw-knob-brass"), alt: "Aged brass round knobs on a navy cabinet" },
          { id: "no-hardware", label: "No visible hardware", sub: "Integrated edge pulls", tier: 3, img: k("hw-edge"), alt: "Handleless integrated edge-pull kitchen drawers" },
          KEEP,
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
        layout: "photo",
        multi: true,
        opts: [
          { id: "laminate", label: "High-end laminate", sub: "Stone looks at a friendly price", tier: 1, img: k("ct-laminate"), alt: "Marble-look laminate kitchen countertop" },
          { id: "quartz-solid", label: "Quartz, solid", sub: "Clean and low maintenance", tier: 1, img: k("ct-quartz-solid"), alt: "Solid white-gray quartz kitchen countertop" },
          { id: "quartz-veined", label: "Quartz, marble look", sub: "Soft veining, easy care", tier: 2, img: k("ct-quartz-veined"), alt: "Veined quartz island with a waterfall edge" },
          { id: "granite", label: "Granite", sub: "Natural, very durable", tier: 2, img: k("ct-granite"), alt: "Speckled granite kitchen countertop" },
          { id: "butcher", label: "Butcher block", sub: "Warm wood, great for islands", tier: 2, img: k("ct-butcher"), alt: "Butcher block kitchen island countertop" },
          { id: "marble", label: "Natural marble", sub: "Classic veining, needs care", tier: 3, img: k("ct-marble"), alt: "Calacatta marble kitchen island" },
          { id: "quartzite", label: "Quartzite", sub: "Dramatic natural patterns", tier: 3, img: k("ct-quartzite"), alt: "Blue-gray quartzite kitchen countertop" },
          { id: "soapstone", label: "Soapstone or dark stone", sub: "Deep, honed and moody", tier: 3, img: k("ct-soapstone"), alt: "Dark honed soapstone kitchen countertop" },
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
        q: "What would you like to change about the layout?",
        hint: "Choose all that apply.",
        layout: "photo",
        multi: true,
        opts: [
          { id: "island", label: "Add or enlarge an island", sub: "Seating and prep space", tier: 1, img: k("ly-island"), alt: "Open kitchen with a large island and seating" },
          { id: "peninsula", label: "Add a peninsula", sub: "Counter seating off the cabinets", tier: 1, img: k("ly-peninsula"), alt: "Kitchen with a peninsula and bar stools" },
          { id: "open", label: "Open to the living area", sub: "Take out or reshape a wall", tier: 2, img: k("ly-open"), alt: "Kitchen opened to the living and dining area" },
          { id: "reshape", label: "Reshape the whole kitchen", sub: "Move the sink, range or fridge", tier: 3, img: k("ly-lshape"), alt: "L-shaped kitchen with a breakfast nook" },
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
        layout: "photo",
        multi: true,
        opts: [
          { id: "subway", label: "Classic subway tile", sub: "Timeless white", tier: 1, img: k("bs-subway"), alt: "White subway tile backsplash" },
          { id: "subway-gray", label: "Beveled gray tile", sub: "Soft and glossy", tier: 1, img: k("bs-subway-gray"), alt: "Gray beveled subway tile backsplash" },
          { id: "herringbone", label: "Herringbone", sub: "Angled pattern", tier: 2, img: k("bs-herringbone"), alt: "Herringbone tile backsplash behind a range" },
          { id: "hexagon", label: "Hexagon", sub: "Geometric, graphic", tier: 2, img: k("bs-hexagon"), alt: "White hexagon tile backsplash with dark grout" },
          { id: "zellige", label: "Handmade zellige look", sub: "Glossy, varied color", tier: 2, img: k("bs-zellige"), alt: "Green zellige tile backsplash" },
          { id: "arabesque", label: "Arabesque or scalloped", sub: "Decorative shape", tier: 3, img: k("bs-arabesque"), alt: "Cream arabesque tile backsplash" },
          { id: "slab", label: "Full-height stone slab", sub: "One surface, counter to ceiling", tier: 3, img: k("bs-slab"), alt: "Full-height marble slab backsplash" },
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
        hint: "Choose as many as you like.",
        layout: "photo",
        multi: true,
        opts: [
          { id: "vinyl-plank", label: "Waterproof plank", sub: "Warm look, easy care", tier: 1, img: k("fl-vinyl"), alt: "Light oak waterproof plank kitchen floor" },
          { id: "wood-look", label: "Wood-look tile", sub: "Looks like wood, built for Florida", tier: 1, img: k("fl-woodtile"), alt: "Wood-look porcelain plank kitchen floor" },
          { id: "large-format", label: "Large-format tile", sub: "Fewer grout lines", tier: 2, img: k("fl-large"), alt: "Large-format gray porcelain kitchen floor" },
          { id: "checker", label: "Checkerboard tile", sub: "Classic pattern", tier: 2, img: k("fl-checker"), alt: "Black and white checkerboard kitchen floor" },
          { id: "travertine", label: "Travertine or natural stone", sub: "Warm, Mediterranean feel", tier: 3, img: k("fl-travertine"), alt: "Honed travertine kitchen floor" },
          { id: "herringbone-wood", label: "Herringbone hardwood", sub: "Showpiece pattern", tier: 3, img: k("fl-herringbone-wood"), alt: "Engineered hardwood in herringbone pattern" },
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
        layout: "photo",
        opts: [
          { id: "steel-single", label: "Stainless, single bowl", sub: "Undermount, clean look", tier: 1, img: k("sk-stainless-single"), alt: "Stainless single-bowl undermount sink" },
          { id: "steel-double", label: "Stainless, double bowl", sub: "Two basins, classic", tier: 1, img: k("sk-stainless-double"), alt: "Stainless double-bowl sink" },
          { id: "farmhouse", label: "Farmhouse apron sink", sub: "White fireclay", tier: 2, img: k("sk-farmhouse"), alt: "White farmhouse apron sink with brass faucet" },
          { id: "composite", label: "Black composite", sub: "Hides stains, modern", tier: 2, img: k("sk-composite"), alt: "Black granite composite undermount sink" },
          { id: "workstation", label: "Workstation sink", sub: "Cutting board and rack ledge", tier: 3, img: k("sk-workstation"), alt: "Stainless workstation sink with accessories" },
          { id: "copper", label: "Hammered copper", sub: "Handmade statement", tier: 3, img: k("sk-copper"), alt: "Hammered copper farmhouse sink" },
          KEEP,
          NOT_SURE,
        ],
      },
      {
        id: "faucet-finish",
        label: "Faucet",
        q: "What faucet do you like?",
        hint: "Choose as many as you like.",
        layout: "photo",
        multi: true,
        opts: [
          { id: "chrome", label: "Chrome pull-down", sub: "Bright and classic", tier: 1, img: k("fc-chrome"), alt: "Chrome pull-down kitchen faucet" },
          { id: "steel", label: "Stainless spring neck", sub: "Commercial style", tier: 1, img: k("fc-steel"), alt: "Stainless commercial-style kitchen faucet" },
          { id: "matte-black", label: "Matte black", sub: "Modern contrast", tier: 2, img: k("fc-black"), alt: "Matte black pull-down kitchen faucet" },
          { id: "brushed-gold", label: "Brushed gold", sub: "Warm and refined", tier: 3, img: k("fc-gold"), alt: "Brushed gold high-arc kitchen faucet" },
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
        layout: "photo",
        multi: true,
        opts: [
          { id: "recessed", label: "Recessed lights", sub: "Clean, even light", tier: 1, img: k("lt-recessed"), alt: "Recessed lighting in a white kitchen" },
          { id: "under-cabinet", label: "Under-cabinet lighting", sub: "Warm glow on the counters", tier: 1, img: k("lt-undercab"), alt: "Under-cabinet LED lighting" },
          { id: "pendants", label: "Pendants over the island", sub: "Glass or metal", tier: 2, img: k("lt-pendants"), alt: "Glass pendants over a kitchen island" },
          { id: "linear", label: "Linear chandelier", sub: "Long island statement", tier: 3, img: k("lt-linear"), alt: "Linear chandelier over an island" },
          { id: "statement", label: "Oversized statement pendants", sub: "Woven or sculptural", tier: 3, img: k("lt-statement"), alt: "Woven rattan pendants over an island" },
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
        id: "appliance-finish",
        label: "Appliance look",
        q: "What look do you want for new appliances?",
        hint: "Choose as many as you like.",
        layout: "photo",
        multi: true,
        hideWhen: { group: "appliances", ids: ["keep-mine"] },
        opts: [
          { id: "stainless", label: "Stainless steel", sub: "The familiar standard", tier: 1, img: k("ap-stainless"), alt: "Stainless steel appliances in a white kitchen" },
          { id: "black-steel", label: "Black stainless", sub: "Darker, moodier", tier: 2, img: k("ap-black"), alt: "Black stainless appliances in a dark kitchen" },
          { id: "panel", label: "Panel-ready", sub: "Hidden behind cabinet fronts", tier: 3, img: k("ap-panel"), alt: "Panel-ready appliances hidden behind cabinets" },
          { id: "pro-range", label: "Pro range and custom hood", sub: "Cook's kitchen centerpiece", tier: 3, img: k("ap-pro"), alt: "Professional range with a custom hood" },
          NOT_SURE,
        ],
      },
      {
        id: "kitchen-storage",
        label: "Storage",
        q: "Any storage features you want?",
        hint: "Choose all that apply.",
        layout: "photo",
        multi: true,
        opts: [
          { id: "drawers", label: "Deep drawers with dividers", sub: "Pots and pans within reach", tier: 1, img: k("st-drawers"), alt: "Deep kitchen drawer with dividers" },
          { id: "corner", label: "Corner solutions", sub: "Lazy Susan or pull-out corners", tier: 1, img: k("st-corner"), alt: "Pull-out corner cabinet shelves" },
          { id: "pantry", label: "Pull-out pantry", sub: "Tall and organized", tier: 2, img: k("st-pantry"), alt: "Tall pull-out pantry cabinet" },
          { id: "appliance-garage", label: "Appliance garage", sub: "Coffee station tucked away", tier: 3, img: k("st-appliance"), alt: "Appliance garage with a coffee machine" },
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
      { id: "u20", label: "Under $20,000" },
      { id: "20-30", label: "$20,000 to $30,000" },
      { id: "30-50", label: "$30,000 to $50,000" },
      { id: "50+", label: "$50,000 or more" },
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
  { id: "cabinets", label: "Cabinets", sub: "Style, color, hardware", groups: ["cabinet-style", "cabinet-hardware"] },
  { id: "counters", label: "Countertops", groups: ["counter-material"] },
  { id: "layout", label: "Layout and island", sub: "Open up or move things", groups: ["layout-change"] },
  { id: "backsplash", label: "Backsplash", groups: ["backsplash-style"] },
  { id: "floor", label: "Flooring", groups: ["floor-material"] },
  { id: "sink", label: "Sink and faucet", groups: ["sink-style", "faucet-finish"] },
  { id: "lighting", label: "Lighting", groups: ["kitchen-lighting"] },
  { id: "appliances", label: "Appliances", groups: ["appliances", "appliance-finish"] },
  { id: "storage", label: "Storage", sub: "Pantry, pull-outs", groups: ["kitchen-storage"] },
];

export const INTRO = ["room"];
export const AFTER_AREAS = ["level"];
export const OUTRO = ["timeline", "budget"];
