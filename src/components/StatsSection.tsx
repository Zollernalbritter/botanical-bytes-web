import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";

export function StatsSection({ dict }: { dict: Dictionary }) {
  const s = dict.stats;

  return (
    <section className="bg-ink py-20 text-offwhite md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2 md:gap-14 md:px-8">
        <div>
          <p className="font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
            {s.big}
          </p>
          <p className="mt-5 max-w-md text-offwhite/70">{s.sub}</p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {s.small.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-2xl text-lime md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-offwhite/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <Image
          src={images.weighingHarvest}
          alt={s.imgAlt}
          placeholder="blur"
          sizes="(min-width: 768px) 520px, 100vw"
          className="aspect-[4/3] w-full rounded-card object-cover"
        />
      </div>
    </section>
  );
}
