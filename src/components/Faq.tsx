import type { Dictionary } from "@/content";
import { ChevronDownIcon } from "./ui/icons";

// Minimales Lassie-FAQ: Serif-Überschrift, Haarlinien statt Karten.
export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section id="faq" className="scroll-mt-6 px-5 py-24 md:py-36">
      <div className="mx-auto max-w-2xl">
        <h2 className="fade-up text-center font-display text-4xl font-medium tracking-tight md:text-6xl">
          {dict.faq.heading}
        </h2>
        <div className="fade-up mt-12 border-t border-ink/10">
          {dict.faq.items.map((item) => (
            <details
              key={item.q}
              name="faq"
              className="group border-b border-ink/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDownIcon className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-6 text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
