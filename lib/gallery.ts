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
  { src: "/img/gallery/kitchen-remodel-3.jpg", category: "Renovation", alt: "Bright renovated room with white tile floor and large windows by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-4.jpg", category: "Renovation", alt: "Living room with white built-in cabinets and shelving by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-5.jpg", category: "Kitchen", alt: "Navy kitchen with stainless appliances and a center island by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-6.jpg", category: "Kitchen", alt: "Navy kitchen with a marble island and pendant lights by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-7.jpg", category: "Kitchen", alt: "Kitchen with a white waterfall island, brass pendant lights and glass doors to the yard by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-9.jpg", category: "Kitchen", alt: "White kitchen with a stainless range hood and gray plank floors by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-10.jpg", category: "Kitchen", alt: "Open kitchen with a butcher-block island and wood-look floors by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-11.jpg", category: "Bathroom", alt: "Bathroom with a tropical mural, round mirror and glass shower by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-remodel-12.jpg", category: "Kitchen", alt: "Open room with natural wood kitchen cabinets and wood-look floors by Palm Beach Renovations" },

  // Bathrooms
  { src: "/img/gallery/bathroom-marble-walk-in-shower.jpg", category: "Bathroom", alt: "Walk-in shower with white marble tile and black fixtures by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-marble-shower-and-tub.jpg", category: "Bathroom", alt: "Marble bathroom with a rainfall shower and soaking tub by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-glass-shower-subway-tile.jpg", category: "Bathroom", alt: "Glass-enclosed shower with subway tile and a built-in bench by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-floating-wood-vanity-tub.jpg", category: "Bathroom", alt: "Modern bathroom with a floating wood vanity and freestanding tub by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-shower-glass-mosaic-accent.jpg", category: "Bathroom", alt: "Walk-in shower with marble tile and a glass mosaic accent stripe by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-diamond-tile-corner-shower.jpg", category: "Bathroom", alt: "Corner shower with white diamond-pattern tile and a mosaic floor by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-gray-double-vanity.jpg", category: "Bathroom", alt: "Master bathroom with a gray double vanity and glass shower by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-2.jpg", category: "Bathroom", alt: "Bathroom with a tiled walk-in shower, window and dark vanity by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-6.jpg", category: "Bathroom", alt: "Walk-in shower with a tiled bench and pebble mosaic floor by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-7.jpg", category: "Bathroom", alt: "Double vanity with black-framed mirrors and a granite top by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-8.jpg", category: "Kitchen", alt: "Kitchen with sage cabinets, butcher-block counters and a farmhouse sink by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-9.jpg", category: "Bathroom", alt: "Marble-look walk-in shower and toilet in a renovated bathroom by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-10.jpg", category: "Bathroom", alt: "Double vanity with gold faucets and a large framed mirror by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-11.jpg", category: "Bathroom", alt: "Black tile corner shower with a wood-look plank floor by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-remodel-12.jpg", category: "Bathroom", alt: "Glass-enclosed marble shower with a built-in bench by Palm Beach Renovations" },

  // Decks & outdoor living
  { src: "/img/gallery/covered-wood-deck-by-pool.jpg", category: "Deck", alt: "Covered wood deck beside a backyard pool by Palm Beach Renovations" },
  { src: "/img/gallery/travertine-paver-patio-pergola.jpg", category: "Patio", alt: "Travertine paver patio with a wood pergola by Palm Beach Renovations" },
  { src: "/img/gallery/new-concrete-patio-slab.jpg", category: "Patio", alt: "Freshly poured concrete patio slab by Palm Beach Renovations" },
  { src: "/img/gallery/paver-walkway-river-rock.jpg", category: "Walkway", alt: "Paver stepping-stone walkway set in river rock by Palm Beach Renovations" },

  // Flooring & windows
  { src: "/img/gallery/tile-flooring-installation.jpg", category: "Flooring", alt: "Tile flooring installation in progress by Palm Beach Renovations" },
  { src: "/img/gallery/wood-windows-hardwood-hallway.jpg", category: "Windows", alt: "Hallway with a wall of wood-framed windows and hardwood floors by Palm Beach Renovations" },

  // Home renovations
  { src: "/img/gallery/home-renovation-1.jpg", category: "Bathroom", alt: "Walk-in shower with herringbone tile and brass fixtures by Palm Beach Renovations" },
  { src: "/img/gallery/home-renovation-2.jpg", category: "Home Renovation", alt: "House exterior with new windows installed by Palm Beach Renovations" },
  { src: "/img/gallery/home-renovation-4.jpg", category: "Home Renovation", alt: "Open framing during a whole-home renovation by Palm Beach Renovations" },

  // Other renovation projects
  { src: "/img/gallery/renovation-project-5.jpg", category: "Bathroom", alt: "Walk-in shower with stone-look tile and a rain shower head by Palm Beach Renovations" },
  { src: "/img/gallery/renovation-project-6.jpg", category: "Renovation", alt: "Polished marble-look floor in a renovated room by Palm Beach Renovations" },
  { src: "/img/gallery/renovation-project-7.jpg", category: "Bathroom", alt: "Bathroom with a freestanding tub, white vanity and gold-framed mirror by Palm Beach Renovations" },
  { src: "/img/gallery/renovation-project-8.jpg", category: "Renovation", alt: "Living room with a gray sofa and built-in shelving by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-walk-in-shower-quartz-vanity.jpg", category: "Bathroom", alt: "Large walk-in glass shower with a linear drain and a quartz vanity by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-marble-shower-wood-vanity.jpg", category: "Bathroom", alt: "Marble-look walk-in shower with a glass door and a wood vanity by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-sliding-glass-shower-pebble-floor.jpg", category: "Bathroom", alt: "Sliding glass shower door with black hardware and a pebble shower floor by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-glass-shower-gray-tile.jpg", category: "Bathroom", alt: "Frameless glass shower with a gray tile floor and a wood vanity by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-quartz-island-white-cabinets.jpg", category: "Kitchen", alt: "Kitchen with white cabinets and a large quartz island with a sink by Palm Beach Renovations" },
  { src: "/img/gallery/renovation-open-living-area.jpg", category: "Renovation", alt: "Open living area with wood-look floors and sliding glass doors to the pool by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-black-cabinets-white-island.jpg", category: "Kitchen", alt: "Open kitchen with black cabinets, a white quartz island and bar stools by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-blue-tile-tub-gold-glass-door.jpg", category: "Bathroom", alt: "Blue vertical-tile tub shower with a gold sliding glass door and a niche by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-blue-onyx-look-shower-hex-floor.jpg", category: "Bathroom", alt: "Walk-in shower with large blue onyx-look tile and a hexagon mosaic floor by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-marble-look-tub-surround-niche.jpg", category: "Bathroom", alt: "Tub surround in marble-look tile with a hexagon-tile niche by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-subway-tile-shower-hex-floor.jpg", category: "Bathroom", alt: "Subway tile walk-in shower with a niche and a hexagon mosaic floor by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-marble-tile-shower-teal-accent.jpg", category: "Bathroom", alt: "Frameless glass shower with marble-look tile and a teal glass accent stripe by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-double-vanity-sliding-shower-door.jpg", category: "Bathroom", alt: "Double vanity with gold faucets beside a sliding glass shower door by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-gray-tile-shower-bench-hex-floor.jpg", category: "Bathroom", alt: "Gray tile walk-in shower with a built-in bench and hexagon mosaic floor by Palm Beach Renovations" },
  { src: "/img/gallery/bathroom-tile-shower-teak-stool.jpg", category: "Bathroom", alt: "Tiled walk-in shower with a pebble floor and a teak stool by Palm Beach Renovations" },
  { src: "/img/gallery/kitchen-sage-cabinets-butcher-block-island.jpg", category: "Kitchen", alt: "Sage green kitchen with a butcher-block island and a farmhouse sink by Palm Beach Renovations" },
  { src: "/img/gallery/renovation-wood-accent-wall-shelves-tv.jpg", category: "Renovation", alt: "Custom wood accent wall with lit floating shelves and a framed TV by Palm Beach Renovations" },
  { src: "/img/gallery/renovation-framing-open-floor-plan.jpg", category: "Home Renovation", alt: "New wall framing in an open floor plan during a renovation by Palm Beach Renovations" },
];
