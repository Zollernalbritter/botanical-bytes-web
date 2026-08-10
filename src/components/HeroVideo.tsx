"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "./ui/icons";

// Hintergrund-Video mit eigenem Pause-Knopf (WCAG 2.2.2); bei reduzierter
// Bewegung startet es pausiert auf dem Poster.
export function HeroVideo({
  label,
  pauseLabel,
  playLabel,
}: {
  label: string;
  pauseLabel: string;
  playLabel: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pause();
      setPlaying(false);
    }
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-lab-poster.jpg"
        aria-label={label}
        className="size-full object-cover"
      >
        <source src="/media/hero-lab.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        className="absolute bottom-5 right-5 flex size-10 items-center justify-center rounded-full bg-ink/45 text-white backdrop-blur-sm transition-colors hover:bg-ink/65 focus-visible:outline-white md:bottom-8 md:right-8"
      >
        {playing ? (
          <PauseIcon className="size-4" />
        ) : (
          <PlayIcon className="size-4" />
        )}
      </button>
    </>
  );
}
