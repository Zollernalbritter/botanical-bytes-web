import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";
import { Eyebrow } from "./ui/Eyebrow";
import { PillLink } from "./ui/Pill";
import { Section } from "./ui/Section";
import { ArrowUpRightIcon } from "./ui/icons";

export function TeamSection({ dict }: { dict: Dictionary }) {
  const t = dict.team;

  return (
    <Section id="team" className="bg-offwhite">
      <div className="grid items-center gap-10 md:grid-cols-5 md:gap-14">
        <div className="md:col-span-2">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
            {t.headline}
          </h2>
          <p className="mt-5 text-ink/80">{t.body}</p>
          <div className="mt-7">
            <PillLink href={dict.footer.tflitUrl} external variant="outline">
              {t.tflitLabel}
              <ArrowUpRightIcon className="size-4" />
            </PillLink>
          </div>
        </div>
        <figure className="md:col-span-3">
          <Image
            src={images.teamStudio}
            alt={t.imgAlt}
            placeholder="blur"
            sizes="(min-width: 768px) 640px, 100vw"
            className="aspect-[3/2] w-full rounded-card object-cover shadow-card"
          />
          <figcaption className="mt-2 text-right font-mono text-xs text-sage-deep">
            {t.credit}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
