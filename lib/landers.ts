// Paid-traffic landers (/estimate/bathroom and /estimate/kitchen). One short survey per service.
// No prices and no product choices: an owner calls, books a specific time to see the project,
// and sends an estimate shortly after.

export type LanderOpt = { id: string; label: string; sub?: string };
export type LanderQ = { id: string; label: string; q: string; opts: LanderOpt[] };

export type Lander = {
  slug: "bathroom" | "kitchen";
  service: string; // "Bathroom"
  projectType: string; // sent to GHL
  headline: string;
  sub: string;
  hero: { src: string; alt: string; position: string };
  workTitle: string;
  featured: { src: string; alt: string };
  work: { src: string; alt: string }[];
  reviewAuthors: string[];
  questions: LanderQ[];
};

const g = (f: string) => `/img/gallery/${f}`;

const START: LanderQ = {
  id: "start",
  label: "Start",
  q: "When would you like to start?",
  opts: [
    { id: "asap", label: "As soon as possible" },
    { id: "1-3", label: "In 1 to 3 months" },
    { id: "3-6", label: "In 3 to 6 months" },
    { id: "exploring", label: "Just exploring for now" },
  ],
};

export const landers: Record<string, Lander> = {
  bathroom: {
    slug: "bathroom",
    service: "Bathroom",
    projectType: "Bathroom Remodeling",
    headline: "Planning a full bathroom remodel? One of the owners will call you.",
    sub: "Three quick questions, about a minute. We call to learn about your project, set a specific time to see it in person, and send your estimate shortly after.",
    hero: { src: "/img/lander/hero-bathroom.jpg", alt: "Finished primary bathroom with a glass walk-in shower, two black vanities and a freestanding tub", position: "center 60%" },
    workTitle: "Recent bathrooms",
    featured: { src: "/img/lander/hero-bathroom.jpg", alt: "Finished primary bathroom with a glass walk-in shower, two black vanities and a freestanding tub" },
    work: [
      { src: g("bathroom-walk-in-shower-quartz-vanity.jpg"), alt: "Large walk-in glass shower with a linear drain and a quartz vanity" },
      { src: g("bathroom-marble-shower-wood-vanity.jpg"), alt: "Marble-look walk-in shower with a glass door and a wood vanity" },
      { src: g("bathroom-sliding-glass-shower-pebble-floor.jpg"), alt: "Sliding glass shower door with black hardware and a pebble shower floor" },
      { src: g("bathroom-glass-shower-gray-tile.jpg"), alt: "Frameless glass shower with a gray tile floor and a wood vanity" },
      { src: g("bathroom-floating-wood-vanity-tub.jpg"), alt: "Bathroom with a floating wood vanity, oval mirrors and a freestanding tub" },
    ],
    reviewAuthors: ["Jessica F.", "Sharon P.", "Noel W."],
    questions: [
      {
        id: "room",
        label: "Which bath",
        q: "Which bathroom are we talking about?",
        opts: [
          { id: "primary", label: "Primary bathroom" },
          { id: "guest", label: "Guest bathroom" },
          { id: "hall", label: "Hall or kids' bathroom" },
          { id: "powder", label: "Powder room" },
          { id: "multiple", label: "More than one" },
        ],
      },
      {
        id: "layout",
        label: "Layout",
        q: "For a complete remodel, what about the layout?",
        opts: [
          { id: "same", label: "Keep the layout as it is" },
          { id: "change", label: "Change the layout", sub: "Move the shower, tub or vanity" },
          { id: "unsure", label: "Not sure, I'd like advice" },
        ],
      },
      START,
    ],
  },
  kitchen: {
    slug: "kitchen",
    service: "Kitchen",
    projectType: "Kitchen Remodeling",
    headline: "Planning a full kitchen remodel? One of the owners will call you.",
    sub: "Three quick questions, about a minute. We call to learn about your project, set a specific time to see it in person, and send your estimate shortly after.",
    hero: { src: g("kitchen-remodel-7.jpg"), alt: "Finished kitchen with a white waterfall island, brass pendant lights and a wall of sliding glass doors", position: "center 42%" },
    workTitle: "Recent kitchens",
    featured: { src: "/img/lander/kitchen-full.jpg", alt: "Finished kitchen with navy cabinets, white quartz counters and an island" },
    work: [
      { src: g("kitchen-quartz-island-white-cabinets.jpg"), alt: "Kitchen with white cabinets and a large quartz island with a sink" },
      { src: g("kitchen-navy-white-island.jpg"), alt: "Navy and white kitchen with a quartz island" },
      { src: g("kitchen-remodel-6.jpg"), alt: "Navy kitchen with a large island and pendant lights" },
      { src: g("kitchen-gray-woodgrain-cabinets.jpg"), alt: "Kitchen with gray woodgrain cabinets and stone backsplash" },
      { src: g("kitchen-remodel-10.jpg"), alt: "Open kitchen with a butcher-block island and wood-look floors" },
    ],
    reviewAuthors: ["Jake A.", "Elizabeth D.", "Mary G."],
    questions: [
      {
        id: "concept",
        label: "Design",
        q: "Do you have a kitchen concept in mind?",
        opts: [
          { id: "have-plan", label: "Yes, I know what I want", sub: "I have a design or photos" },
          { id: "some-ideas", label: "I have some ideas", sub: "I'd like guidance to finish the plan" },
          { id: "need-advice", label: "Not yet, I need advice", sub: "Help me figure out the whole design" },
        ],
      },
      {
        id: "size",
        label: "Size",
        q: "How big is your kitchen?",
        opts: [
          { id: "small", label: "Small", sub: "Galley or compact" },
          { id: "medium", label: "Medium" },
          { id: "large", label: "Large or open to the living area" },
          { id: "not-sure", label: "Not sure" },
        ],
      },
      START,
    ],
  },
};

