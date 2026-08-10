"use client";

import { useEffect, useRef } from "react";

// Native Controls = Pausierbarkeit (WCAG 2.2.2); bei reduzierter Bewegung
// wird der Autoplay-Loop direkt gestoppt (CSS erreicht <video> nicht).
export function TimelapseVideo({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pause();
    }
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="none"
      poster="/media/wachstum-poster.jpg"
      aria-label={label}
      className={className}
    >
      <source src="/media/wachstum.webm" type="video/webm" />
      <source src="/media/wachstum.mp4" type="video/mp4" />
    </video>
  );
}
