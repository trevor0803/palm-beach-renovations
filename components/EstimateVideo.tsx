"use client";
import { useRef, useState } from "react";

export default function EstimateVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function play() {
    const v = ref.current;
    if (!v) return;
    v.controls = true;
    v.muted = false;
    v.play().catch(() => {});
    setStarted(true);
    try { window.gtag?.("event", "estimate_video_play", { page_path: location.pathname }); } catch {}
  }

  return (
    <div className="est-video">
      <video ref={ref} src={src} poster={poster} playsInline preload="metadata" aria-label={label} onEnded={() => setStarted(false)} />
      {!started && (
        <button type="button" className="est-play" onClick={play} aria-label="Play video">
          <span className="est-play-icon" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
