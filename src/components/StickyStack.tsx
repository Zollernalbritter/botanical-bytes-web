"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";
import { LeafMark } from "./LeafMark";
import { ArrowUpCircleIcon, MicIcon, PlusCircleIcon, SpinnerIcon } from "./ui/icons";

type Item = Dictionary["stack"]["items"][number];

const media: StaticImageData[] = [
  images.heroCress,
  images.days[2],
  images.cressGrown,
];

// Lassies Produkt-UI, das über dem Medium schwebt: eine schmale Statuszeile
// mit Marke, Vorgang und Messwert.
function StatusPanel({ item }: { item: Item }) {
  return (
    <div className="w-[min(88%,26rem)] overflow-hidden rounded-xl bg-white/95 shadow-float backdrop-blur-sm">
      <p className="flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-medium text-ink">
        <LeafMark className="size-4 shrink-0" />
        {item.uiTitle}
      </p>
      <div className="flex items-center gap-2.5 border-t border-hair bg-paper/70 px-3.5 py-2.5">
        <SpinnerIcon className="size-3.5 shrink-0 animate-spin text-muted [animation-duration:2.6s]" />
        <span className="min-w-0 flex-1 truncate text-[12px] text-ink/80">
          {item.uiRow}
        </span>
        <span className="shrink-0 font-mono text-[12px] text-muted">
          {item.uiValue}
        </span>
      </div>
    </div>
  );
}

// Die dritte Karte trägt statt der Statuszeile ein Prompt-Feld — Lassies
// „Ask anything“-Pille.
function PromptPanel({ label }: { label: string }) {
  return (
    <div className="flex w-[min(88%,26rem)] items-center gap-2.5 rounded-full border border-white/60 bg-white/25 px-3.5 py-2.5 text-white shadow-float backdrop-blur-md">
      <PlusCircleIcon className="size-[18px] shrink-0 opacity-80" />
      <span className="min-w-0 flex-1 truncate text-[13px] text-white/90">
        {label}
      </span>
      <MicIcon className="size-[18px] shrink-0 opacity-80" />
      <ArrowUpCircleIcon className="size-[18px] shrink-0" />
    </div>
  );
}

function Caption({
  item,
  side,
  transition,
}: {
  item: Item;
  side: "left" | "right";
  transition: { duration: number; ease: "easeOut" };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={transition}
      className={`hidden max-w-[15rem] self-center lg:block ${
        side === "right" ? "justify-self-start" : "justify-self-end text-right"
      }`}
    >
      <h3 className="display text-[22px]">
        {item.title1}
        <br />
        {item.title2}
      </h3>
      <p className="mt-3 text-[13px] leading-relaxed text-muted">{item.body}</p>
    </motion.div>
  );
}

// Lassies Signatur-Sektion: drei Medienkarten, die beim Scrollen übereinander
// stapeln. Die Texte stehen abwechselnd links und rechts daneben und blenden
// mit ihrer Karte ein.
//
// Regel des Stapels: ab lg sitzt jede Karte am selben sticky-Anschlag und ist
// gleich groß, die nachrückende deckt die vorige also pixelgenau. Deshalb wird
// hier nichts am Kartenrahmen animiert — Skalierung oder Transparenz beim
// Einblenden legten den Rand der darunterliegenden Karte frei, und man sähe
// zwei versetzte Fotos gleichzeitig. Das Einblenden passiert stattdessen
// innerhalb des Rahmens (Foto und Bedienfeld), wo es nichts verraten kann.
export function StickyStack({ dict }: { dict: Dictionary }) {
  const s = dict.stack;
  const reduced = useReducedMotion();
  // Bei reduzierter Bewegung steht jeder Einblender sofort auf seinem Ziel.
  const soft = { duration: reduced ? 0 : 0.7, ease: "easeOut" } as const;

  return (
    <section id="projekt" className="scroll-mt-24 px-5 pt-28 md:pt-40">
      <h2 className="fade-up mx-auto max-w-3xl text-center display text-[clamp(2.25rem,6vw,4.4rem)]">
        {s.heading1}
        <br />
        {s.heading2}
      </h2>

      {/* Das Polster unten fängt den Überstand der Deckfläche der letzten Karte
          auf, damit er nicht in die folgende Sektion ragt. */}
      <div className="mx-auto mt-20 max-w-6xl md:mt-28 lg:pb-10">
        {s.items.map((item, i) => {
          const right = i % 2 === 1;
          return (
            <div
              key={item.title1}
              style={{ zIndex: i + 1 }}
              className="relative mb-16 lg:sticky lg:top-[14vh] lg:mb-[24vh] lg:last:mb-0"
            >
              {/* Jede Zeile bringt ihren eigenen Papiergrund mit: beim Hochschieben
                  löscht er die vorige Zeile mitsamt Bildunterschrift — sonst
                  bliebe die Beschriftung der alten Karte neben der neuen stehen.
                  Der Überstand nach unten schluckt deren Schlagschatten.

                  Der Grund beginnt bewusst genau an der Oberkante und nicht
                  darüber: zieht man ihn hoch, löscht die dritte Zeile die
                  zweite schon, während diese noch die sichtbare Karte ist —
                  die Fläche bleibt dann leer. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -bottom-10 top-0 -z-10 hidden bg-paper lg:block"
              />

              {/* items-start statt -center: so hängt die Karte am oberen Rand ihrer
                  Zeile und sitzt in jeder Zeile auf derselben Höhe, egal wie hoch
                  der Text daneben ausfällt. Die Beschriftung zentriert sich selbst. */}
              <div className="grid items-start gap-8 lg:grid-cols-[1fr_minmax(0,38rem)_1fr]">
                {right ? (
                  <div className="hidden lg:block" />
                ) : (
                  <Caption item={item} side="left" transition={soft} />
                )}

                {/* Der Sandgrund hält den Rahmen auch dann undurchsichtig, wenn das
                    Foto noch lädt oder gerade einblendet. */}
                <div className="relative mx-auto flex aspect-[5/4] w-full max-w-[38rem] items-center justify-center overflow-hidden rounded-[2rem] bg-sand shadow-float">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={soft}
                    className="absolute inset-0"
                  >
                    <Image
                      src={media[i]}
                      alt={item.mediaAlt}
                      placeholder="blur"
                      sizes="(min-width: 1024px) 608px, 92vw"
                      className="size-full object-cover"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-ink/10" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ ...soft, delay: reduced ? 0 : 0.12 }}
                    className="relative flex w-full justify-center"
                  >
                    {i === 2 ? (
                      <PromptPanel label={s.prompt} />
                    ) : (
                      <StatusPanel item={item} />
                    )}
                  </motion.div>
                </div>

                {right ? (
                  <Caption item={item} side="right" transition={soft} />
                ) : (
                  <div className="hidden lg:block" />
                )}
              </div>

              {/* Unter lg steht der Text unter der Karte statt daneben */}
              <div className="mx-auto mt-6 max-w-[38rem] lg:hidden">
                <h3 className="display text-2xl">
                  {item.title1} {item.title2}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
