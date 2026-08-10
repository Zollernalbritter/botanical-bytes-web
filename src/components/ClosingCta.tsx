import Image from "next/image";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/lib/images";
import { HeroSignup } from "./HeroSignup";

// Lassies Abschluss: ein randabfallendes Naturbild als große Karte, darin die
// weiße Blütenmarke, die Serif-Zeile und noch einmal das E-Mail-Feld.
export function ClosingCta({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="newsletter" className="scroll-mt-24 px-5 pb-6">
      <div className="on-dark relative mx-auto flex min-h-[36rem] max-w-[86rem] flex-col items-center justify-center overflow-hidden rounded-[2rem] px-5 py-24 text-center md:min-h-[42rem]">
        <Image
          src={images.heroCress}
          alt={dict.cta.imgAlt}
          placeholder="blur"
          fill
          sizes="(min-width: 1440px) 1376px, 100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/25" />

        <div className="relative flex flex-col items-center">
          <svg viewBox="0 0 24 24" className="size-11 text-white" aria-hidden="true">
            <g fill="currentColor">
              <circle cx="12" cy="6.4" r="3.4" />
              <circle cx="17.3" cy="10.2" r="3.4" />
              <circle cx="15.3" cy="16.4" r="3.4" />
              <circle cx="8.7" cy="16.4" r="3.4" />
              <circle cx="6.7" cy="10.2" r="3.4" />
            </g>
            <circle cx="12" cy="12.2" r="1.7" fill="#1a1613" fillOpacity="0.25" />
          </svg>

          <h2 className="mt-5 display text-[clamp(2rem,6vw,4rem)] text-white">
            {dict.cta.heading1}
            <br />
            {dict.cta.heading2}
          </h2>

          <div className="mt-8 w-full max-w-sm">
            <HeroSignup
              locale={locale}
              hero={dict.hero}
              newsletter={dict.newsletter}
              id="cta-email"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
