import type { Dictionary } from "@/content";
import { Eyebrow } from "./ui/Eyebrow";
import { Section } from "./ui/Section";
import { ChevronDownIcon } from "./ui/icons";

export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <Section id="faq">
      <Eyebrow>{dict.faq.eyebrow}</Eyebrow>
      <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
        {dict.faq.headline}
      </h2>
      <div className="mt-8 max-w-3xl space-y-3">
        {dict.faq.items.map((item) => (
          <details
            key={item.q}
            name="faq"
            className="rounded-card bg-cream-soft px-6 py-4 shadow-card"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDownIcon className="faq-chevron size-5 shrink-0 text-sage-deep" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
