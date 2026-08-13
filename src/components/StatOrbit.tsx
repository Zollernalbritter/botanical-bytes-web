"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { LeafMark } from "./LeafMark";
import { CheckCircleIcon } from "./ui/icons";

type Progress = MotionValue<number>;

// Startversatz relativ zur Ruhelage: alles beginnt winzig nahe der Mitte und
// fliegt beim Scrollen nach außen an seinen Platz (Lassies Collage-Effekt).
type Seed = { x: number; y: number; r: number; drift: number };

function Floater({
  progress,
  seed,
  reduced,
  className,
  children,
}: {
  progress: Progress;
  seed: Seed;
  reduced: boolean;
  className: string;
  children: ReactNode;
}) {
  // Bei reduzierter Bewegung liegt der Startzustand schon auf der Ruhelage: die
  // Collage steht dann von Anfang an fertig da, statt zu fliegen.
  const from = reduced
    ? { x: 0, y: 0, r: 0, drift: 0, scale: 1 }
    : { ...seed, scale: 0.14 };
  const scale = useTransform(progress, [0, 0.4], [from.scale, 1]);
  const x = useTransform(progress, [0, 0.4], [from.x, 0]);
  const y = useTransform(progress, [0, 0.4, 1], [from.y, 0, from.drift]);
  const rotate = useTransform(progress, [0, 0.4], [from.r, 0]);
  const opacity = useTransform(progress, [0, 0.06], [0, 1]);

  // Sichtbarkeit und Lage je Breakpoint stecken in className. Auf dem Telefon
  // tragen drei kleine Bilder die Collage — dort ist kein Platz für Karten
  // neben der Zahl, aber ganz ohne Bilder stand die Sektion leer da. Die
  // Karten und die beiden mittelnahen Trabanten kommen erst ab md bzw. lg
  // dazu, wenn sie Platz neben der Zahl finden.
  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, scale, rotate, opacity }}
      className={`pointer-events-none absolute ${className}`}
    >
      {children}
    </motion.div>
  );
}

function DataCard({
  title,
  rows,
  done = false,
}: {
  title: string;
  rows: { label: string; value: string }[];
  done?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-float">
      <p className="flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-medium text-ink">
        {done ? (
          <CheckCircleIcon className="size-4 shrink-0 text-moss" />
        ) : (
          <LeafMark className="size-4 shrink-0" />
        )}
        {title}
      </p>
      <ul className="border-t border-hair bg-paper/60 px-3.5 py-1.5">
        {rows.map((row) => (
          <li key={row.label} className="flex items-baseline justify-between py-1">
            <span className="text-[12px] text-muted">{row.label}</span>
            <span className="font-mono text-[12px] text-ink">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Photo({
  src,
  className,
}: {
  src: StaticImageData;
  className: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      placeholder="blur"
      sizes="240px"
      className={`rounded-xl object-cover shadow-float ${className}`}
    />
  );
}

// Lassies große Zahl: Die Collage fliegt aus der Mitte nach außen, während in
// der Bildmitte zwei Aussagen nacheinander stehen bleiben.
export function StatOrbit({ dict }: { dict: Dictionary }) {
  const o = dict.orbit;
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref);
  const reduced = useReducedMotion() ?? false;
  const lift = reduced ? 0 : 30;

  const beat1 = useTransform(scrollYProgress, [0.02, 0.12, 0.4, 0.5], [0, 1, 1, 0]);
  const beat1Y = useTransform(scrollYProgress, [0.4, 0.5], [0, -lift]);
  const beat2 = useTransform(scrollYProgress, [0.52, 0.62], [0, 1]);
  const beat2Y = useTransform(scrollYProgress, [0.52, 0.62], [lift, 0]);

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-5">
        {/* ————— Collage —————
            Die Bühne begrenzt den Kreis auf 1150 px und zentriert ihn: sonst
            wandern die Trabanten auf breiten Schirmen an den Fensterrand und
            die Zahl steht allein in einem Loch.

            Senkrecht hält jeder Trabant jetzt mindestens 200 px Abstand zur
            Mitte, die Karte über der Zahl sogar 238 px. Die alten 146 px waren
            zu knapp gerechnet: sie ließen zwar den Textblock frei, aber die
            Trabanten driften beim Scrollen noch einmal um bis zu 95 px, und
            genau dann rückte die obere Karte der Zahl auf den Pelz. Der
            Abstand muss also den Drift mit einschließen, nicht nur den Text.
            Deshalb steht seitlich neben der Zahl weiterhin nichts.

            pointer-events-none, weil die Bühne sonst über der Zahl liegt und
            deren Text unmarkierbar machte. */}
        <div className="pointer-events-none absolute inset-0 mx-auto max-w-[1150px]">
          <Floater
            progress={scrollYProgress}
            reduced={reduced}
            seed={{ x: 290, y: 160, r: -14, drift: -85 }}
            className="left-2 bottom-[calc(50%_+_150px)] w-24 md:left-0 md:bottom-[calc(50%_+_200px)] md:w-52"
          >
            <Photo src={images.generatedSeedlings} className="aspect-[4/5] w-full" />
          </Floater>

          {/* Das Abmessen der Aussaat — auch das ein echtes Foto, und die Karte
              „Zyklus 12 abgeschlossen“ legt sich darüber. Erst steht im Bild,
              was gemacht wurde, dann in der Karte, was dabei herauskam. */}
          <Floater
            progress={scrollYProgress}
            reduced={reduced}
            seed={{ x: 60, y: 150, r: -9, drift: -60 }}
            className="hidden lg:block left-1/2 -ml-48 bottom-[calc(50%_+_300px)] w-32"
          >
            <Photo src={images.measuringSeedsWarm} className="aspect-[3/4] w-full" />
          </Floater>

          <Floater
            progress={scrollYProgress}
            reduced={reduced}
            seed={{ x: 20, y: 125, r: 8, drift: -45 }}
            className="hidden lg:block left-1/2 -ml-40 bottom-[calc(50%_+_255px)] w-64"
          >
            <DataCard title={o.cards[0].title} rows={o.cards[0].rows} done />
          </Floater>

          <Floater
            progress={scrollYProgress}
            reduced={reduced}
            seed={{ x: -290, y: 175, r: 12, drift: -95 }}
            className="right-2 bottom-[calc(50%_+_150px)] w-24 md:right-0 md:bottom-[calc(50%_+_200px)] md:w-52"
          >
            <Photo src={images.generatedTray} className="aspect-[4/5] w-full" />
          </Floater>

          <Floater
            progress={scrollYProgress}
            reduced={reduced}
            seed={{ x: 235, y: -95, r: -6, drift: -50 }}
            className="hidden lg:block left-[1%] top-[calc(50%_+_152px)] w-44"
          >
            <Photo src={images.generatedBench} className="aspect-[4/5] w-full" />
          </Floater>

          <Floater
            progress={scrollYProgress}
            reduced={reduced}
            seed={{ x: 250, y: -135, r: -8, drift: -35 }}
            className="hidden md:block left-[3%] top-[calc(50%_+_300px)] w-64"
          >
            <DataCard title={o.cards[2].title} rows={o.cards[2].rows} />
          </Floater>

          {/* Unter der Zahl steht die Waage mit der gewogenen Ernte — das echte
              Foto aus dem Projekt, um 90° aufgerichtet, damit die Anzeige
              lesbar ist. Die Sektion behauptet 25 % mehr Ertrag; dann soll
              darunter auch die Waage stehen, auf der gewogen wurde, und kein
              erzeugtes Stimmungsbild.

              Die Collage mischt bewusst: drei erzeugte Bilder tragen die
              Stimmung an den Rändern, drei echte Fotos tragen die Aussage —
              Abmessen, Wiegen, Ernte. Was belegt, ist echt. */}
          <Floater
            progress={scrollYProgress}
            reduced={reduced}
            seed={{ x: -30, y: -145, r: 6, drift: -30 }}
            className="left-1/2 -ml-12 top-[calc(50%_+_150px)] w-24 lg:-ml-[5.5rem] lg:top-[calc(50%_+_214px)] lg:w-44"
          >
            <Photo
              src={images.weighingHarvestWarm}
              className="aspect-[3/4] w-full"
            />
          </Floater>

          {/* Bild und Karte überlappen sich bewusst — und die Reihenfolge im
              Dokument entscheidet, wer oben liegt: das Bild steht vorher, die
              Karte legt sich darüber.

              Die Karte sitzt dabei auf der UNTERKANTE des Bildes, nicht in
              seiner Mitte. Mittig gelegt zerschneidet sie das Motiv in zwei
              Hälften und verdeckt genau das, was man sehen soll; auf der Kante
              liest sie sich als Bildunterschrift, die zufällig aufliegt. */}
          <Floater
            progress={scrollYProgress}
            reduced={reduced}
            seed={{ x: -230, y: -90, r: 7, drift: -55 }}
            className="hidden lg:block right-[11%] top-[calc(50%_+_148px)] w-48"
          >
            <Photo src={images.cressGrownWarm} className="aspect-[3/4] w-full" />
          </Floater>

          <Floater
            progress={scrollYProgress}
            reduced={reduced}
            seed={{ x: -255, y: -135, r: -10, drift: -40 }}
            className="hidden md:block right-[2%] top-[calc(50%_+_330px)] w-64"
          >
            <DataCard title={o.cards[1].title} rows={o.cards[1].rows} />
          </Floater>
        </div>

        {/* ————— Aussage 1: die große Zahl ————— */}
        <motion.div
          style={{ opacity: beat1, y: beat1Y }}
          className="relative max-w-2xl text-center"
        >
          <p className="display text-[clamp(4rem,14vw,9rem)]">{o.stat}</p>
          <h2 className="display mt-1 text-[clamp(1.5rem,4.4vw,3rem)]">
            {o.statLine1}
            <br />
            {o.statLine2}
          </h2>
        </motion.div>

        {/* ————— Aussage 2 ————— */}
        <motion.h2
          style={{ opacity: beat2, y: beat2Y }}
          className="display absolute max-w-3xl px-5 text-center text-[clamp(1.75rem,5vw,3.6rem)]"
        >
          {o.beat1}
          <br />
          {o.beat2}
        </motion.h2>
      </div>
    </section>
  );
}
