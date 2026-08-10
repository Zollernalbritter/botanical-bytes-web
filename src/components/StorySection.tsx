import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";
import { TimelapseVideo } from "./TimelapseVideo";
import { Eyebrow } from "./ui/Eyebrow";
import { Section } from "./ui/Section";

export function StorySection({ dict }: { dict: Dictionary }) {
  const s = dict.story;

  return (
    <Section id="story" className="bg-offwhite">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
            {s.headline}
          </h2>
          <div className="mt-6 space-y-4 text-ink/80">
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ol className="mt-8 space-y-3 border-l-2 border-lime pl-5">
            {s.timeline.map((t) => (
              <li key={t.text}>
                <span className="font-mono text-sm text-sage-deep">
                  {t.year}
                </span>
                <p className="text-sm text-ink/80">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-4">
          <Image
            src={images.measuringSeeds}
            alt={s.img1Alt}
            placeholder="blur"
            sizes="(min-width: 768px) 520px, 100vw"
            className="aspect-[4/3] w-full rounded-card object-cover shadow-card"
          />
          <Image
            src={images.bwkiStage}
            alt={s.img2Alt}
            placeholder="blur"
            sizes="(min-width: 768px) 520px, 100vw"
            className="aspect-[4/3] w-full rounded-card object-cover shadow-card"
          />
        </div>
      </div>

      <div className="mt-14">
        <h3 className="font-display text-xl font-medium tracking-tight md:text-2xl">
          {s.daysHeading}
        </h3>
        {/* Unter sm: horizontale Scroll-Reihe statt 2+2+1-Waisenkind-Grid */}
        <div
          tabIndex={0}
          role="group"
          aria-label={s.daysHeading}
          className="mt-4 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0"
        >
          {images.days.map((img, i) => (
            <figure key={s.dayLabel + (i + 1)} className="w-36 shrink-0 sm:w-auto">
              <Image
                src={img}
                alt={s.daysAlt.replace("{n}", String(i + 1))}
                placeholder="blur"
                sizes="(min-width: 640px) 210px, 144px"
                className="aspect-[3/4] w-full rounded-xl object-cover"
              />
              <figcaption className="mt-1.5 font-mono text-xs text-sage-deep">
                {s.dayLabel} {i + 1}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-12 grid items-center gap-6 sm:grid-cols-[minmax(0,20rem)_1fr]">
        <TimelapseVideo
          label={s.videoAlt}
          className="w-full max-w-xs rounded-card shadow-card"
        />
        <h3 className="font-display text-xl font-medium italic tracking-tight text-sage-deep md:text-2xl">
          {s.videoHeading}
        </h3>
      </div>
    </Section>
  );
}
