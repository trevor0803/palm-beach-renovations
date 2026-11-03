"use client";
import { useEffect, useRef, useState } from "react";

export default function LanderVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [heard, setHeard] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  function hear() {
    const v = ref.current;
    if (!v) return;
    v.loop = false;
    v.muted = false;
    v.currentTime = 0;
    v.controls = true;
    v.play().catch(() => {});
    setHeard(true);
    try { window.gtag?.("event", "lander_video_unmute", { page_path: location.pathname }); } catch {}
  }

  return (
    <div className="ld-video">
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="auto" aria-label={label} />
      {!heard && (
        <button type="button" className="ld-video-btn" onClick={hear}>
          <span className="ld-video-icon" aria-hidden="true" />
          Tap to hear Mike
        </button>
      )}
    </div>
  );
}
