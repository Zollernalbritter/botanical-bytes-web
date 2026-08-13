"use client";

// Einsatzfelder als Farbband nach dem Vorbild der Referenz: drei Vollflächen,
// die einander bündig berühren, dazu ein großer Kreis über der Naht der ersten
// beiden — er ist Deko und Kategorie zugleich und trägt seine eigene
// Beschriftung. Beim Scrollen wandert das ganze Band sanft seitwärts.

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Studio } from "@/content/studio";
import { SectionHeading, Wrap } from "./primitives";

// Grundfarbe und Schriftfarbe je Einsatzfeld. Feste Klassenstrings, weil
// Tailwind den Quelltext scannt und zusammengesetzte Namen nicht findet.
// Azure und Wheat sind zu hell für Creme-Text — dort steht die Tinte.
const toneBlock: Record<string, string> = {
  azure: "bg-azure text-night",
  wheat: "bg-wheat text-night",
  clay: "bg-clay text-cream",
  leaf: "bg-leaf text-cream",
};

// Welches Feld zum Kreis wird. Alles andere bleibt Rechteck.
const CIRCLE_TONE = "wheat";

// Die drei Rechtecke sind absichtlich ungleich breit — gleiche Drittel wirken
// wie eine Tabelle.
const basis = ["md:flex-[1.15]", "md:flex-[1]", "md:flex-[1.3]"];

// Zwei Einzüge, die mit der Breite mitgehen müssen:
// [0] Das Band ragt 6 % über den linken Rand hinaus. Ohne Ausgleich läge die
//     Beschriftung des ersten Feldes im abgeschnittenen Überhang. Prozente
//     rechnen gegen die Bandbreite (112 %), 6 % Viewport sind dort 5,5 %.
// [1] Das mittlere Feld beginnt an der Naht, über der der Kreis liegt — der
//     Einzug muss dessen Radius freiräumen. Der Kreis misst 24 vw (gedeckelt
//     bei 22 rem), sein Radius also 12 vw; darauf noch etwas Luft.
const inset = [
  "md:pl-[calc(5.5%+2rem)]",
  "md:pl-[min(12.5rem,calc(12vw+1.5rem))]",
  "",
];

export function UseCaseCollage({ s }: { s: Studio }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  // Der Versatz bleibt klein: die Beschriftungen sitzen oben links in ihren
  // Flächen, und alles, was das Band nach links schiebt, drückt die des ersten
  // Feldes aus dem Ausschnitt. Anderthalb Prozent bleiben unter seinem Polster.
  const drift = useTransform(scrollYProgress, [0, 1], ["1.5%", "-1.5%"]);

  const circle = s.useCases.items.find((item) => item.tone === CIRCLE_TONE);
  let rectIndex = -1;

  // Abstände nach oben und unten setzt die Seite; hier nur der Ankerversatz.
  return (
    <section id="einsatz" className="scroll-mt-24">
      <Wrap>
        <SectionHeading
          line1={s.useCases.line1}
          line2={s.useCases.line2}
          className="t-hero!"
        />
      </Wrap>

      {/* Oben und unten Luft für die Formen, die über die Kanten ragen; seitlich
          schneidet das Band ab. Die Innenfläche ist breiter als der Ausschnitt,
          damit der Versatz nie den Creme-Grund freilegt. */}
      <div ref={bandRef} className="mt-16 overflow-hidden pb-6 pt-12">
        <motion.div
          style={{ x: reduced ? 0 : drift }}
          className="relative -ml-[6%] w-[112%]"
        >
          <div className="flex flex-wrap">
            {s.useCases.items.map((item) => {
              // Auf schmalen Viewports bleibt auch das Kreis-Feld ein Rechteck
              // und die vier Flächen brechen in ein 2×2-Quilt. Ab md verschwindet
              // es hier und taucht als Kreis wieder auf; display:none nimmt es
              // dabei aus dem Accessibility-Baum, es steht also nie doppelt.
              const isCircle = item.tone === CIRCLE_TONE;
              if (!isCircle) rectIndex += 1;

              return (
                <div
                  key={item.label1}
                  className={`relative h-[16rem] min-w-[14rem] flex-1 p-6 md:h-[22rem] md:p-8 ${
                    toneBlock[item.tone] ?? "bg-olive text-cream"
                  } ${
                    isCircle
                      ? "md:hidden"
                      : `${basis[rectIndex] ?? ""} ${inset[rectIndex] ?? ""}`
                  }`}
                >
                  <p className="t-card">
                    {item.label1}
                    <br />
                    {item.label2}
                  </p>

                  {/* Der Kreis hängt an der rechten Kante des ersten Feldes,
                      nicht an einer Prozentmarke des Bandes: Flexbox verteilt
                      die Breiten nach Wachstumsfaktor UND Innenabstand, die
                      Naht liegt also nie genau dort, wo ein fester Prozentwert
                      sie vermuten lässt. So sitzt er bei jeder Breite exakt
                      darauf. z-10, weil das Nachbarfeld als späteres
                      Geschwister sonst über ihn malen würde. */}
                  {circle && rectIndex === 0 ? (
                    <div className="absolute -top-8 right-0 z-10 hidden aspect-square w-[min(22rem,24vw)] translate-x-1/2 items-end justify-center rounded-full bg-wheat pb-[12%] md:flex">
                      <p className="t-card text-center text-night">
                        {circle.label1}
                        <br />
                        {circle.label2}
                      </p>

                      {/* Kuppe auf der Krone — die Silhouette, an der man die
                          Bildsprache wiedererkennt. Sie hängt am Kreis selbst,
                          damit sie ihm bei jeder Größe auf dem Scheitel bleibt. */}
                      <span
                        aria-hidden="true"
                        className="absolute -top-8 left-1/2 size-16 -translate-x-1/2 rounded-full bg-olive"
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* ————— Deko: reine Flächen, kein Inhalt ————— */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {/* X aus zwei gekreuzten Kapseln, oben rechts */}
            <span className="absolute right-[14%] top-4 block size-24 md:top-6">
              <span className="shape-capsule absolute left-0 top-1/2 h-6 w-24 -translate-y-1/2 rotate-45 bg-blush" />
              <span className="shape-capsule absolute left-0 top-1/2 h-6 w-24 -translate-y-1/2 -rotate-45 bg-blush" />
            </span>

            {/* Drei Formen, halb aus der Unterkante herausgerückt */}
            <span className="shape-arch-down absolute -bottom-5 left-[12%] h-10 w-14 bg-coral" />
            <span className="absolute -bottom-5 left-[44%] size-10 rotate-45 bg-azure" />
            <span className="absolute -bottom-5 right-[16%] flex h-10 w-16 items-center justify-center bg-wheat">
              <span className="size-5 rounded-full bg-cream" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
