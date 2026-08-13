"use client";

import { motion, useReducedMotion, type MotionProps } from "motion/react";
import { GITHUB_URL, type Locale } from "@/content";
import type { Studio } from "@/content/studio";
import { PillAnchor, PillNote, Wrap } from "./primitives";
import { DomeGlyph, RingGlyph } from "./shapes";

// Schlusseinladung: Riesentitel, zwei Pillen — darunter ein Beet aus acht
// Sprossen, die restlos aus den Grundformen des Baukastens gestapelt sind.

// Farben nur über feste Klassen: zusammengesetzte Strings findet Tailwind nicht.
const fill = {
  azure: "bg-azure",
  wheat: "bg-wheat",
  clay: "bg-clay",
  leaf: "bg-leaf",
  coral: "bg-coral",
  olive: "bg-olive",
  blush: "bg-blush",
  lime: "bg-lime",
} as const;

// Die Glyphen aus shapes.tsx färben über currentColor, brauchen also text-*.
const ink = {
  azure: "text-azure",
  wheat: "text-wheat",
  clay: "text-clay",
  leaf: "text-leaf",
  coral: "text-coral",
  olive: "text-olive",
  blush: "text-blush",
  lime: "text-lime",
} as const;

type Tone = keyof typeof fill;

type Figure = {
  crown: "circle" | "ring" | "dome" | "leaf" | "cross";
  crownTone: Tone;
  stem: "column" | "block";
  stemTone: Tone;
  hole: boolean;
  leaves: "arches" | "capsule";
  leafTone: Tone;
  potTone: Tone;
};

const stemSize = {
  column: "h-24 w-10",
  block: "h-16 w-16",
} as const;

const figures: Figure[] = [
  { crown: "circle", crownTone: "coral", stem: "column", stemTone: "leaf", hole: true, leaves: "arches", leafTone: "lime", potTone: "clay" },
  { crown: "ring", crownTone: "azure", stem: "block", stemTone: "wheat", hole: false, leaves: "capsule", leafTone: "olive", potTone: "coral" },
  { crown: "dome", crownTone: "wheat", stem: "column", stemTone: "clay", hole: true, leaves: "arches", leafTone: "leaf", potTone: "azure" },
  { crown: "leaf", crownTone: "lime", stem: "block", stemTone: "azure", hole: false, leaves: "capsule", leafTone: "blush", potTone: "olive" },
  { crown: "cross", crownTone: "olive", stem: "column", stemTone: "blush", hole: true, leaves: "arches", leafTone: "wheat", potTone: "leaf" },
  { crown: "circle", crownTone: "blush", stem: "block", stemTone: "olive", hole: false, leaves: "capsule", leafTone: "coral", potTone: "azure" },
  { crown: "dome", crownTone: "leaf", stem: "column", stemTone: "lime", hole: true, leaves: "arches", leafTone: "azure", potTone: "wheat" },
  { crown: "ring", crownTone: "clay", stem: "block", stemTone: "coral", hole: false, leaves: "capsule", leafTone: "lime", potTone: "blush" },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Der Kopf der Sprosse — eine der fünf erlaubten Silhouetten. */
function Crown({ kind, tone }: { kind: Figure["crown"]; tone: Tone }) {
  switch (kind) {
    case "ring":
      return <RingGlyph className={`size-20 ${ink[tone]}`} />;
    case "dome":
      // Seitenverhältnis der Glyphe ist 24:14 — sonst bliebe die Fläche hohl.
      return <DomeGlyph className={`h-14 w-24 ${ink[tone]}`} />;
    case "leaf":
      return <span className={`shape-leaf size-20 ${fill[tone]}`} />;
    case "cross":
      return (
        <span className="relative size-20">
          <span
            className={`shape-capsule absolute left-1/2 top-1/2 h-5 w-20 -translate-x-1/2 -translate-y-1/2 rotate-45 ${fill[tone]}`}
          />
          <span
            className={`shape-capsule absolute left-1/2 top-1/2 h-5 w-20 -translate-x-1/2 -translate-y-1/2 -rotate-45 ${fill[tone]}`}
          />
        </span>
      );
    default:
      return <span className={`size-20 rounded-full ${fill[tone]}`} />;
  }
}

/** Eine Figur: Krone, Stamm mit Blättern, Fuß — bündig aufeinander. */
function Sprout({
  figure,
  index,
  still,
}: {
  figure: Figure;
  index: number;
  still: boolean;
}) {
  const rise: MotionProps = still
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.6, delay: index * 0.06, ease },
      };

  return (
    <motion.div
      {...rise}
      className="flex w-full max-w-[10rem] flex-col items-center"
    >
      <div className="flex h-20 w-full items-end justify-center">
        <Crown kind={figure.crown} tone={figure.crownTone} />
      </div>

      <div className="relative flex w-full items-center justify-center">
        {figure.leaves === "capsule" ? (
          // Liegt hinter dem Stamm, weil der Stamm später im DOM steht.
          <span
            className={`shape-capsule absolute left-1/2 top-1/2 h-6 w-28 -translate-x-1/2 -translate-y-1/2 ${fill[figure.leafTone]}`}
          />
        ) : (
          <span className={`shape-arch size-10 -rotate-90 ${fill[figure.leafTone]}`} />
        )}

        <span className={`relative ${stemSize[figure.stem]} ${fill[figure.stemTone]}`}>
          {figure.hole ? (
            <span className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream" />
          ) : null}
        </span>

        {figure.leaves === "arches" ? (
          <span className={`shape-arch size-10 rotate-90 ${fill[figure.leafTone]}`} />
        ) : null}
      </div>

      {/* Der Fuß ist ein Bogen, dem ein cremefarbener Block zwei Beine ausstanzt. */}
      <span className={`shape-arch relative h-14 w-28 ${fill[figure.potTone]}`}>
        <span className="absolute bottom-0 left-1/2 h-5 w-10 -translate-x-1/2 bg-cream" />
      </span>
    </motion.div>
  );
}

// locale gehört zur gemeinsamen Signatur aller Sektionen; hier stammt jeder
// sichtbare Text aus s, darum bleibt der Wert ungenutzt.
export function BuildYours({ s }: { s: Studio; locale: Locale }) {
  const reduce = useReducedMotion();

  return (
    <section>
      <Wrap>
        <h2 className="t-mega text-balance text-center">{s.build.heading}</h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <PillNote>{s.build.note}</PillNote>
          <PillAnchor external href={GITHUB_URL} tone="coral">
            {s.build.cta}
          </PillAnchor>
        </div>
      </Wrap>

      <div
        aria-hidden="true"
        className="mt-20 grid grid-cols-2 place-items-center gap-x-10 gap-y-14 overflow-hidden px-4 md:grid-cols-4"
      >
        {figures.map((figure, index) => (
          <Sprout
            key={`${figure.crownTone}-${figure.stemTone}`}
            figure={figure}
            index={index}
            still={reduce === true}
          />
        ))}
      </div>
    </section>
  );
}
