"use client";
import { useEffect, useState } from "react";

// The hero video is 2.3 MB. CSS `display:none` does not stop the download, so on
// phones we never render the element at all — the poster image on .hero carries it.
// Desktop gets the video after mount, which also keeps it off the critical path.
const DESKTOP = "(min-width: 861px)";

export default function HeroVideo() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const wide = window.matchMedia(DESKTOP);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShow(wide.matches && !motion.matches);
    update();
    wide.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  if (!show) return null;

  return (
    <video className="hero-video" autoPlay muted loop playsInline poster="/img/hero-poster.jpg" aria-hidden="true">
      <source src="/img/hero.webm" type="video/webm" />
      <source src="/img/hero.mp4" type="video/mp4" />
    </video>
  );
}
