import Image from "next/image";
import { gallery } from "@/lib/gallery";

export default function GalleryGrid() {
  return (
    <section className="gallery-grid" aria-label="Renovation project photos">
      {gallery.map((photo) => (
        <figure key={photo.src} className="gallery-item">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={600}
            height={450}
            loading="lazy"
            sizes="(max-width: 480px) 100vw, (max-width: 860px) 50vw, 25vw"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </figure>
      ))}
    </section>
  );
}
