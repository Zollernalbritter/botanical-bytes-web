"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { Studio } from "@/content/studio";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import { Wrap } from "./primitives";

// Eröffnung der Seite: viel Luft, ein zweizeiliger Satz, darunter das Showreel
// als großes Medium. Beim Hineinscrollen wächst der Rahmen in seine volle
// Breite und gibt dabei einen Teil seiner Rundung ab — die Bewegung ersetzt
// den Schatten, den diese Bildsprache nicht kennt.
export function StudioHero({ s }: { s: Studio }) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(true);

  // WCAG 2.2.2: Wer Bewegung abbestellt hat, sieht zuerst nur das Poster.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.current?.pause();
      setPlaying(false);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "start 25%"],
  });
  // Bei reduzierter Bewegung bleiben beide Werte konstant, hängen aber weiter
  // am Element: der Server kennt die Einstellung nicht und schreibt den
  // Startwert schon ins HTML — nur ein gebundener Wert überschreibt ihn wieder.
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [0.94, 1],
  );
  // Radius als Zahl führen, damit die Einheit erst am Ende danebentritt.
  const radius = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [2.5, 2.5] : [5, 2.5],
  );
  const borderRadius = useMotionTemplate`${radius}rem`;

  function toggle() {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="pt-32 md:pt-40">
      <Wrap>
        <h1 className="t-hero text-balance text-center">
          {s.hero.line1}
          <br />
          {s.hero.line2}
        </h1>
      </Wrap>

      <Wrap className="mt-12 md:mt-16">
        <motion.div
          ref={frame}
          style={{ scale, borderRadius }}
          className="relative aspect-video w-full overflow-hidden rounded-frame bg-shell"
        >
          <video
            ref={video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-poster.jpg"
            aria-label={s.hero.videoAlt}
            className="size-full object-cover"
          >
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? s.hero.pause : s.hero.play}
            className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-night/40 text-cream backdrop-blur transition-colors hover:bg-night/60 focus-visible:outline-cream md:bottom-6 md:right-6"
          >
            {playing ? (
              <PauseIcon className="size-4" />
            ) : (
              <PlayIcon className="size-4" />
            )}
          </button>
        </motion.div>
      </Wrap>
    </section>
  );
}
