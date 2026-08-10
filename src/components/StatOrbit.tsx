"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
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
  className,
  children,
}: {
  progress: Progress;
  seed: Seed;
  className: string;
  children: ReactNode;
}) {
  const scale = useTransform(progress, [0, 0.4], [0.14, 1]);
  const x = useTransform(progress, [0, 0.4], [seed.x, 0]);
  const y = useTransform(progress, [0, 0.4, 1], [seed.y, 0, seed.drift]);
  const rotate = useTransform(progress, [0, 0.4], [seed.r, 0]);
  const opacity = useTransform(progress, [0, 0.06], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, scale, rotate, opacity }}
      className={`pointer-events-none absolute hidden md:block ${className}`}
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

  const beat1 = useTransform(scrollYProgress, [0.02, 0.12, 0.4, 0.5], [0, 1, 1, 0]);
  const beat1Y = useTransform(scrollYProgress, [0.4, 0.5], [0, -30]);
  const beat2 = useTransform(scrollYProgress, [0.52, 0.62], [0, 1]);
  const beat2Y = useTransform(scrollYProgress, [0.52, 0.62], [30, 0]);

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-5">
        {/* ————— Collage ————— */}
        <Floater
          progress={scrollYProgress}
          seed={{ x: 300, y: 210, r: -14, drift: -90 }}
          className="left-[3%] top-[16%] w-36 md:w-48"
        >
          <Photo src={images.heroCress} className="aspect-[4/5] w-full" />
        </Floater>

        <Floater
          progress={scrollYProgress}
          seed={{ x: 260, y: 190, r: 8, drift: -70 }}
          className="left-[13%] top-[24%] w-56 md:w-64"
        >
          <DataCard title={o.cards[0].title} rows={o.cards[0].rows} done />
        </Floater>

        <Floater
          progress={scrollYProgress}
          seed={{ x: -300, y: 230, r: 12, drift: -110 }}
          className="right-[5%] top-[12%] w-32 md:w-44"
        >
          <Photo src={images.days[4]} className="aspect-[4/5] w-full" />
        </Floater>

        <Floater
          progress={scrollYProgress}
          seed={{ x: -280, y: -160, r: -10, drift: -60 }}
          className="bottom-[16%] right-[4%] w-56 md:w-64"
        >
          <DataCard title={o.cards[1].title} rows={o.cards[1].rows} />
        </Floater>

        <Floater
          progress={scrollYProgress}
          seed={{ x: -240, y: -200, r: 6, drift: -40 }}
          className="bottom-[4%] right-[12%] w-32 md:w-40"
        >
          <Photo src={images.weighingHarvest} className="aspect-square w-full" />
        </Floater>

        <Floater
          progress={scrollYProgress}
          seed={{ x: 250, y: -190, r: -8, drift: -80 }}
          className="bottom-[12%] left-[6%] w-56 md:w-64"
        >
          <DataCard title={o.cards[2].title} rows={o.cards[2].rows} />
        </Floater>

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
