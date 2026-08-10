import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";
import { LeafMark } from "./LeafMark";
import { TimelapseVideo } from "./TimelapseVideo";

function FloatingCard({
  card,
  className = "",
}: {
  card: { title: string; rows: { label: string; value: string }[] };
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute w-44 rounded-2xl bg-white/95 p-3 shadow-float backdrop-blur-sm sm:w-60 sm:p-4 ${className}`}
    >
      <p className="flex items-center gap-2 text-xs font-medium text-ink sm:text-sm">
        <LeafMark className="size-4" />
        {card.title}
      </p>
      <ul className="mt-3">
        {card.rows.map((row) => (
          <li
            key={row.label}
            className="flex items-baseline justify-between border-t border-ink/5 py-1.5 first:border-0"
          >
            <span className="text-xs text-muted">{row.label}</span>
            <span className="font-mono text-xs text-ink">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Drei Feature-Blöcke nach Lassie-Vorbild: Medien-Karte mit schwebendem
// Produkt-UI-Kärtchen, daneben kurze Serif-Headline + zwei Sätze.
export function FeatureBlocks({ dict }: { dict: Dictionary }) {
  const f = dict.features;
  const medias = [
    <TimelapseVideo
      key="video"
      label={f.blocks[0].mediaAlt}
      className="aspect-[4/3] w-full rounded-media object-cover"
    />,
    <Image
      key="proto"
      src={images.greenhousePrototype}
      alt={f.blocks[1].mediaAlt}
      placeholder="blur"
      sizes="(min-width: 768px) 520px, 100vw"
      className="aspect-[4/3] w-full rounded-media object-cover object-bottom"
    />,
    <Image
      key="harvest"
      src={images.weighingHarvest}
      alt={f.blocks[2].mediaAlt}
      placeholder="blur"
      sizes="(min-width: 768px) 520px, 100vw"
      className="aspect-[4/3] w-full rounded-media object-cover"
    />,
  ];

  return (
    <section id="projekt" className="px-5 py-24 md:py-36">
      <div className="mx-auto max-w-5xl">
        <h2 className="fade-up text-center font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          {f.heading1}
          <br />
          <span className="italic">{f.heading2}</span>
        </h2>

        {f.blocks.map((block, i) => (
          <article
            key={block.title}
            className="fade-up mt-20 grid items-center gap-10 md:mt-32 md:grid-cols-2 md:gap-16"
          >
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                {block.title}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                {block.body}
              </p>
            </div>
            <div className={`relative ${i % 2 === 1 ? "md:order-1" : ""}`}>
              {medias[i]}
              <FloatingCard
                card={block.card}
                className={
                  i === 0
                    ? "-top-5 right-4 md:-right-5"
                    : "-bottom-5 left-4 md:-left-5"
                }
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
