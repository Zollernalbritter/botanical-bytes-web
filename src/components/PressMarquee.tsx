import type { Dictionary } from "@/content";
import { Eyebrow } from "./ui/Eyebrow";

export function PressMarquee({ dict }: { dict: Dictionary }) {
  const track = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-3 pr-3 ${
        hidden ? "motion-reduce:hidden" : ""
      }`}
    >
      {dict.press.outlets.map((outlet) => (
        <li
          key={outlet}
          className="whitespace-nowrap rounded-full border border-ink/10 bg-cream-soft px-6 py-2.5 font-eyebrow text-sm uppercase tracking-[0.18em] text-sage-deep"
        >
          {outlet}
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={dict.press.ariaLabel} className="py-10 md:py-14">
      <Eyebrow className="text-center">{dict.press.eyebrow}</Eyebrow>
      {/* Fokussierbar: Hover ODER Tastatur-Fokus pausiert den Lauf (WCAG 2.2.2);
          bei reduzierter Bewegung steht er und wird manuell scrollbar */}
      <div
        tabIndex={0}
        role="group"
        aria-label={dict.press.ariaLabel}
        className="marquee-mask group mt-6 overflow-hidden motion-reduce:overflow-x-auto"
      >
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus:[animation-play-state:paused]">
          {track(false)}
          {track(true)}
        </div>
      </div>
      <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-1.5 px-5 text-center text-xs text-sage-deep md:px-8">
        {dict.press.awards.map((award) => (
          <li key={award}>{award}</li>
        ))}
      </ul>
    </section>
  );
}
