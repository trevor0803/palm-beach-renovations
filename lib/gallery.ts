// Gallery image set — matches the actual files in public/img/gallery.
export type GalleryCategory =
  | "Kitchen"
  | "Bathroom"
  | "Deck"
  | "Patio"
  | "Walkway"
  | "Flooring"
  | "Windows"
  | "Home Renovation"
  | "Renovation";

export type GalleryImage = {
  src: string;
  category: GalleryCategory;
  alt: string;
};

export const gallery: GalleryImage[] = [
  // Kitchens
  { src: "/img/gallery/kitchen-navy-white-island.jpg", category: "Kitchen", alt: "Kitchen with navy and white cabinets and a marble waterfall island by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-gray-woodgrain-cabinets.jpg", category: "Kitchen", alt: "Kitchen with gray woodgrain cabinets and a stone backsplash by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-3.jpg", category: "Kitchen", alt: "Completed kitchen remodel by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-4.jpg", category: "Kitchen", alt: "Completed kitchen remodel by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-5.jpg", category: "Kitchen", alt: "Completed kitchen remodel by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-6.jpg", category: "Kitchen", alt: "Completed kitchen remodel by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-7.jpg", category: "Kitchen", alt: "Completed kitchen remodel by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-9.jpg", category: "Kitchen", alt: "Completed kitchen remodel by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-10.jpg", category: "Kitchen", alt: "Completed kitchen remodel by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-11.jpg", category: "Kitchen", alt: "Completed kitchen remodel by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-12.jpg", category: "Kitchen", alt: "Completed kitchen remodel by Palm Beach Renovations" },

  // Bathrooms
  { src: "/img/gallery/bathroom-marble-walk-in-shower.jpg", category: "Bathroom", alt: "Walk-in shower with white marble tile and black fixtures by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-marble-shower-and-tub.jpg", category: "Bathroom", alt: "Marble bathroom with a rainfall shower and soaking tub by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-glass-shower-subway-tile.jpg", category: "Bathroom", alt: "Glass-enclosed shower with subway tile and a built-in bench by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-floating-wood-vanity-tub.jpg", category: "Bathroom", alt: "Modern bathroom with a floating wood vanity and freestanding tub by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-shower-glass-mosaic-accent.jpg", category: "Bathroom", alt: "Walk-in shower with marble tile and a glass mosaic accent stripe by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-diamond-tile-corner-shower.jpg", category: "Bathroom", alt: "Corner shower with white diamond-pattern tile and a mosaic floor by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-gray-double-vanity.jpg", category: "Bathroom", alt: "Master bathroom with a gray double vanity and glass shower by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-2.jpg", category: "Bathroom", alt: "Renovated bathroom by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-6.jpg", category: "Bathroom", alt: "Renovated bathroom by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-7.jpg", category: "Bathroom", alt: "Renovated bathroom by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-8.jpg", category: "Bathroom", alt: "Renovated bathroom by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-9.jpg", category: "Bathroom", alt: "Renovated bathroom by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-10.jpg", category: "Bathroom", alt: "Renovated bathroom by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-11.jpg", category: "Bathroom", alt: "Renovated bathroom by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-12.jpg", category: "Bathroom", alt: "Renovated bathroom by Palm Beach Renovations" },

  // Decks & outdoor living
  { src: "/img/gallery/covered-wood-deck-by-pool.jpg", category: "Deck", alt: "Covered wood deck beside a backyard pool by Palm Beach Renovations" },
  { src: "/img/gallery/travertine-paver-patio-pergola.jpg", category: "Patio", alt: "Travertine paver patio with a wood pergola by Palm Beach Renovations" },
  { src: "/img/gallery/new-concrete-patio-slab.jpg", category: "Patio", alt: "Freshly poured concrete patio slab by Palm Beach Renovations" },
  { src: "/img/gallery/paver-walkway-river-rock.jpg", category: "Walkway", alt: "Paver stepping-stone walkway set in river rock by Palm Beach Renovations" },

  // Flooring & windows
  { src: "/img/gallery/tile-flooring-installation.jpg", category: "Flooring", alt: "Tile flooring installation in progress by Palm Beach Renovations" },
  { src: "/img/gallery/wood-windows-hardwood-hallway.jpg", category: "Windows", alt: "Hallway with a wall of wood-framed windows and hardwood floors by Palm Beach Renovations" },

  // Home renovations
  { src: "/img/gallery/home-renovation-1.jpg", category: "Home Renovation", alt: "Whole-home renovation by Palm Beach Renovations" },
  { src: "/img/gallery/home-renovation-2.jpg", category: "Home Renovation", alt: "Whole-home renovation by Palm Beach Renovations" },
  { src: "/img/gallery/home-renovation-4.jpg", category: "Home Renovation", alt: "Whole-home renovation by Palm Beach Renovations" },

  // Other renovation projects
  { src: "/img/gallery/renovation-project-5.jpg", category: "Renovation", alt: "Renovation project by Palm Beach Renovations" },
  { src: "/img/gallery/renovation-project-6.jpg", category: "Renovation", alt: "Renovation project by Palm Beach Renovations" },
  { src: "/img/gallery/renovation-project-7.jpg", category: "Renovation", alt: "Renovation project by Palm Beach Renovations" },
  { src: "/img/gallery/renovation-project-8.jpg", category: "Renovation", alt: "Renovation project by Palm Beach Renovations" },
];
