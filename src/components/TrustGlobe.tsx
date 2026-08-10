"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { DottedGlobe } from "./DottedGlobe";

// Lassies „Trusted by“-Beat: gepunkteter Globus, darüber ziehen Zitat-Karten
// nacheinander durchs Bild. Bei uns sind es die echten Wettbewerbs-Stationen.
export function TrustGlobe({ dict }: { dict: Dictionary }) {
  const t = dict.trust;
  const items = dict.milestones.items;
  const photos = [images.teamStudio, images.bwkiStage, images.jufoLandeswettbewerb];

  const ref = useRef<HTMLElement>(null);
  const progress = useSectionProgress(ref);

  const bloom = useTransform(progress, [0.04, 0.26], [0, 1]);
  const globeScale = useTransform(progress, [0, 0.3], [0.88, 1]);

  // Jede Karte hat ihr eigenes Fenster; die Fenster überlappen nicht, sonst
  // stehen zwei halbtransparente Karten übereinander.
  const windows: [number, number, number, number][] = [
    [0.26, 0.34, 0.44, 0.5],
    [0.52, 0.58, 0.68, 0.74],
    [0.76, 0.82, 1, 1],
  ];

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center overflow-hidden px-5 pt-[15vh]">
        <h2 className="display relative z-10 text-center text-[clamp(2rem,5.5vw,3.6rem)]">
          {t.heading1}
          <br />
          {t.heading2}
        </h2>
        <p className="relative z-10 mt-4 max-w-md text-center text-sm text-muted">
          {t.note}
        </p>

        <motion.div
          style={{ scale: globeScale }}
          className="pointer-events-none absolute left-1/2 top-[36%] w-[min(54vh,84vw)] -translate-x-1/2"
        >
          <DottedGlobe bloom={bloom} className="w-full" />
        </motion.div>

        {items.map((item, i) => (
          <Card
            key={item.org}
            item={item}
            photo={photos[i]}
            progress={progress}
            range={windows[i]}
          />
        ))}
      </div>
    </section>
  );
}

function Card({
  item,
  photo,
  progress,
  range,
}: {
  item: Dictionary["milestones"]["items"][number];
  photo: StaticImageData;
  progress: MotionValue<number>;
  range: [number, number, number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[1]], [26, 0]);

  return (
    <motion.figure
      style={{ opacity, y }}
      className="absolute bottom-[12vh] left-1/2 grid w-[min(34rem,92vw)] -translate-x-1/2 grid-cols-[auto_1fr] gap-4 rounded-2xl bg-white p-4 shadow-float"
    >
      <Image
        src={photo}
        alt={item.imgAlt}
        placeholder="blur"
        sizes="200px"
        className="aspect-[4/5] w-28 rounded-xl object-cover sm:w-36"
      />
      <div className="flex min-w-0 flex-col">
        <blockquote className="display text-[17px] leading-snug sm:text-[19px]">
          „{item.quote}“
        </blockquote>
        <figcaption className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4 text-[13px]">
          <span className="text-ink">{item.name}</span>
          <span className="rounded-md bg-card px-2 py-1 font-mono text-[11px] text-muted">
            {item.org}
          </span>
        </figcaption>
      </div>
    </motion.figure>
  );
}
