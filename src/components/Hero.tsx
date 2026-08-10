import Image from "next/image";
import { GITHUB_URL, type Dictionary, type Locale } from "@/content";
import { images } from "@/lib/images";
import { Eyebrow } from "./ui/Eyebrow";
import { PillLink } from "./ui/Pill";
import { ArrowRightIcon, ArrowUpRightIcon } from "./ui/icons";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="pt-14 md:pt-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Eyebrow>{dict.hero.eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          {dict.hero.headline1}
          <br />
          <span className="italic">{dict.hero.headline2}</span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-ink/80 md:text-lg">
          {dict.hero.sub}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <PillLink href={`/${locale}#story`} variant="ink">
            {dict.hero.ctaPrimary}
            <ArrowRightIcon className="size-4" />
          </PillLink>
          <PillLink href={GITHUB_URL} external variant="outline">
            {dict.hero.ctaGithub}
            <ArrowUpRightIcon className="size-4" />
          </PillLink>
        </div>
        <div className="mt-10 overflow-hidden rounded-card shadow-card md:mt-14">
          <Image
            src={images.heroCress}
            alt={dict.hero.imgAlt}
            priority
            placeholder="blur"
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
