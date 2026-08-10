import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";

// Statt Kunden-Testimonials: die drei echten Wettbewerbs-Meilensteine,
// jeweils mit echtem Foto — Lassies menschlicher Beat, ehrlich belegt.
export function Milestones({ dict }: { dict: Dictionary }) {
  const m = dict.milestones;
  const photos = [images.teamStudio, images.bwkiStage, images.jufoLandeswettbewerb];

  return (
    <section className="bg-sand px-5 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <h2 className="fade-up text-center font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          {m.heading1}
          <br />
          <span className="italic">{m.heading2}</span>
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6">
          {m.items.map((item, i) => (
            <figure key={item.meta} className="fade-up">
              <Image
                src={photos[i]}
                alt={item.imgAlt}
                placeholder="blur"
                sizes="(min-width: 768px) 360px, 100vw"
                className="aspect-[4/5] w-full rounded-media object-cover"
              />
              <blockquote className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight">
                {item.quote}
              </blockquote>
              <figcaption className="mt-2 font-mono text-xs text-muted">
                {item.meta}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="fade-up mt-16 text-center text-muted">{m.outro}</p>
        <p className="fade-up mt-2 text-center font-mono text-xs text-muted">
          {m.pressLine}
        </p>
      </div>
    </section>
  );
}
