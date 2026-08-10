"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
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

function Caption({ item, side }: { item: Item; side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`hidden max-w-[15rem] lg:block ${
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
export function StickyStack({ dict }: { dict: Dictionary }) {
  const s = dict.stack;

  return (
    <section id="projekt" className="scroll-mt-24 px-5 pt-28 md:pt-40">
      <h2 className="fade-up mx-auto max-w-3xl text-center display text-[clamp(2.25rem,6vw,4.4rem)]">
        {s.heading1}
        <br />
        {s.heading2}
      </h2>

      <div className="mx-auto mt-20 max-w-6xl md:mt-28">
        {s.items.map((item, i) => {
          const right = i % 2 === 1;
          return (
            <div
              key={item.title1}
              style={{ zIndex: i + 1 }}
              className="mb-16 lg:sticky lg:top-[14vh] lg:mb-[24vh] lg:last:mb-0"
            >
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,38rem)_1fr]">
                {right ? <div className="hidden lg:block" /> : <Caption item={item} side="left" />}

                <motion.div
                  initial={{ scale: 0.94, opacity: 0.65 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="relative mx-auto flex aspect-[5/4] w-full max-w-[38rem] items-center justify-center overflow-hidden rounded-[2rem] shadow-float"
                >
                  <Image
                    src={media[i]}
                    alt={item.mediaAlt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 608px, 92vw"
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink/10"
                  />
                  <div className="relative flex w-full justify-center">
                    {i === 2 ? (
                      <PromptPanel label={s.prompt} />
                    ) : (
                      <StatusPanel item={item} />
                    )}
                  </div>
                </motion.div>

                {right ? <Caption item={item} side="right" /> : <div className="hidden lg:block" />}
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
