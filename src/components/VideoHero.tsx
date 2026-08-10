import type { Dictionary, Locale } from "@/content";
import { HeroChips } from "./HeroChips";
import { HeroSignup } from "./HeroSignup";
import { HeroVideo } from "./HeroVideo";

// Lassie-Hero: Full-Bleed-Video, weiße Serif-Headline mittig, rotierende
// Status-Chips, schwebendes E-Mail-Pill unten. Beim Scrollen schrumpft das
// Video in eine abgerundete Karte (CSS scroll-driven, mit Fallback).
export function VideoHero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="hero-scroll relative">
      <div className="sticky top-0 h-svh overflow-clip">
        <div className="hero-frame absolute inset-0 overflow-hidden">
          <HeroVideo
            label={dict.hero.videoAlt}
            pauseLabel={dict.hero.pause}
            playLabel={dict.hero.play}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/10 to-ink/40"
          />
        </div>

        <div className="hero-content on-video pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 pb-28 pt-16 text-center text-white">
          <h1 className="font-display text-[clamp(2rem,10vw,2.6rem)] font-medium leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
            {dict.hero.headline1}
            <br />
            <span className="italic">{dict.hero.headline2}</span>
          </h1>
          <p className="mt-6 text-sm font-medium md:text-base">
            {dict.hero.sub}
          </p>
          <HeroChips chips={dict.hero.chips} />
        </div>

        <div className="hero-content on-video absolute inset-x-0 bottom-6 flex justify-center px-5 md:bottom-9">
          <HeroSignup
            locale={locale}
            hero={dict.hero}
            newsletter={dict.newsletter}
          />
        </div>
      </div>
    </section>
  );
}
