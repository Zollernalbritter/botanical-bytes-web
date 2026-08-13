"use client";

// Schaufenster: große zweizeilige Überschrift, darunter eine breite Medienkarte
// mit dem Zeitraffer (Klick startet und pausiert), darunter drei Textspalten,
// jede von einer Farbmarke angeführt.

import Image from "next/image";
import { useRef, useState, type ComponentType } from "react";
import type { Studio } from "@/content/studio";
import { images } from "@/lib/images";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import { SectionHeading, Wrap } from "./primitives";
import { ClassroomMark, MakerMark, ResearchMark } from "./shapes";

// Reihenfolge folgt der Reihenfolge der Spalten in studio.ts.
const marks: ComponentType<{ className?: string }>[] = [
  ClassroomMark,
  ResearchMark,
  MakerMark,
];

export function ShowcaseVideo({ s }: { s: Studio }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    // Der Zustand kommt aus den Video-Events statt aus dem Klick — dann stimmt
    // das Label auch, wenn der Browser das Abspielen verweigert.
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  return (
    // Ohne eigene Außenabstände — den Rhythmus setzt die Seite.
    <div>
      <Wrap>
        {/* SectionHeading bringt t-section schon mit. Beide Utilities sind
            gleich stark und t-section steht später im Stylesheet — ohne
            Important-Modifier bliebe die Überschrift auf Sektionsgrad. */}
        <SectionHeading
          line1={s.showcase.line1}
          line2={s.showcase.line2}
          className="t-hero!"
        />

        {/* Der Zeitraffer liegt nur in 400 × 296 px vor. Darum bleibt die Karte
            schmaler als der Hero, und der Clip wird eingepasst statt beschnitten
            — gestreckt auf volle Breite zerfällt er sichtbar. Im Ruhezustand
            steht davor ein scharfes Foto vom Ende desselben Zyklus. */}
        <div className="relative mx-auto mt-12 aspect-[16/10] max-w-[52rem] overflow-hidden rounded-frame bg-night md:aspect-[16/9]">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-label={s.showcase.videoAlt}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="size-full object-contain"
          >
            <source src="/media/wachstum.webm" type="video/webm" />
            <source src="/media/wachstum.mp4" type="video/mp4" />
          </video>

          <Image
            src={images.cressGrown}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 52rem, 100vw"
            placeholder="blur"
            className={`object-cover transition-opacity duration-500 ${
              playing ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Die ganze Karte ist die Schaltfläche; der Fokusring liegt nach
              innen, weil die Karte außen abschneidet. */}
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? s.showcase.pauseLabel : s.showcase.playLabel}
            className="group absolute inset-0 flex items-center justify-center focus-visible:outline-cream focus-visible:-outline-offset-4"
          >
            <span
              className={`inline-flex items-center gap-2 rounded-full bg-azure px-5 py-2.5 text-[0.9375rem] font-medium leading-none text-cream transition-opacity ${
                playing
                  ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  : "opacity-100"
              }`}
            >
              {playing ? (
                <PauseIcon className="size-4" />
              ) : (
                <PlayIcon className="size-4" />
              )}
              {playing ? s.showcase.pauseLabel : s.showcase.playLabel}
            </span>
          </button>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {s.showcase.columns.map((column, i) => {
            const Mark = marks[i];
            return (
              <div
                key={column.title}
                className="flex flex-col items-center text-center"
              >
                <Mark />
                <h3 className="mt-5 text-[1.0625rem] font-medium">
                  {column.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[22rem] text-[0.9375rem] leading-relaxed text-night/55">
                  {column.body}
                </p>
              </div>
            );
          })}
        </div>
      </Wrap>
    </div>
  );
}
