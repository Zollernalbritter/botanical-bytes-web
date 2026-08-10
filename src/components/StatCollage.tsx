import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";

function MiniCard({
  title,
  rows,
  className = "",
}: {
  title: string;
  rows: string[];
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-white/95 p-4 shadow-float ${className}`}>
      <p className="text-sm font-medium text-ink">{title}</p>
      <ul className="mt-2 space-y-1">
        {rows.map((row) => (
          <li key={row} className="font-mono text-xs text-muted">
            {row}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Lassie-Prinzip: eine riesige Zahl, flankiert von einer schwebenden Collage
// aus echten Fotos und kleinen Daten-Karten.
export function StatCollage({ dict }: { dict: Dictionary }) {
  const c = dict.collage;

  return (
    <section className="overflow-x-clip px-5 py-24 md:py-40">
      <div className="relative mx-auto max-w-6xl">
        {/* Collage — erst ab xl, darunter kollidiert sie mit der Headline */}
        <div className="hidden xl:block">
          <Image
            src={images.heroCress}
            alt={c.imgAlts[0]}
            placeholder="blur"
            sizes="230px"
            className="absolute -left-4 top-2 aspect-[4/5] w-56 -rotate-3 rounded-2xl object-cover shadow-float"
          />
          <MiniCard
            title={c.cards[0].title}
            rows={c.cards[0].rows}
            className="absolute left-14 top-64 w-48 rotate-2"
          />
          <Image
            src={images.days[4]}
            alt={c.imgAlts[1]}
            placeholder="blur"
            sizes="210px"
            className="absolute -right-2 top-0 aspect-[4/5] w-52 rotate-3 rounded-2xl object-cover shadow-float"
          />
          <MiniCard
            title={c.cards[1].title}
            rows={c.cards[1].rows}
            className="absolute right-12 top-60 w-52 -rotate-2"
          />
        </div>

        <div className="fade-up relative mx-auto max-w-2xl text-center">
          <p className="font-mono text-sm text-muted">{c.qualifier}</p>
          <p className="font-display text-[6rem] font-medium leading-none tracking-tight sm:text-[8rem] md:text-[11rem]">
            {c.big}
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            {c.line1}
            <br />
            {c.line2}
          </h2>
        </div>

        <div className="fade-up relative mx-auto mt-24 max-w-2xl text-center md:mt-40">
          <h2 className="font-display text-2xl font-medium italic leading-snug tracking-tight text-muted md:text-4xl">
            {c.sub1}
            <br />
            {c.sub2}
          </h2>
        </div>

        {/* Unterhalb xl: kompakte Reihe statt Collage */}
        <div className="mt-14 flex items-start justify-center gap-4 xl:hidden">
          <Image
            src={images.heroCress}
            alt={c.imgAlts[0]}
            placeholder="blur"
            sizes="160px"
            className="aspect-[4/5] w-36 -rotate-2 rounded-2xl object-cover shadow-float"
          />
          <MiniCard
            title={c.cards[0].title}
            rows={c.cards[0].rows}
            className="w-44 rotate-1"
          />
        </div>
      </div>
    </section>
  );
}
