import Image from "next/image";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/lib/images";
import { NewsletterForm } from "./NewsletterForm";

// Lassies Abschluss: Naturfoto, große Serif-Zeile, E-Mail-Formular — auf Sand.
export function ClosingCta({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="newsletter" className="scroll-mt-6 bg-sand px-5 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Image
          src={images.heroCress}
          alt={dict.cta.imgAlt}
          placeholder="blur"
          sizes="(min-width: 640px) 420px, 80vw"
          className="fade-up mx-auto aspect-[3/2] w-full max-w-sm rounded-media object-cover shadow-float"
        />
        <h2 className="fade-up mt-10 font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          {dict.cta.heading1}
          <br />
          <span className="italic">{dict.cta.heading2}</span>
        </h2>
        <div className="fade-up mx-auto mt-10 max-w-md text-left">
          <NewsletterForm locale={locale} t={dict.newsletter} />
        </div>
      </div>
    </section>
  );
}
