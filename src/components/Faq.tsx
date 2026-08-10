import type { Dictionary } from "@/content";
import { ChevronDownIcon } from "./ui/icons";

// Lassie-FAQ: eine ruhige weiße Karte, Haarlinien zwischen den Fragen,
// immer nur eine Antwort offen.
export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section id="faq" className="scroll-mt-24 px-5 pb-24 md:pb-36">
      <div className="mx-auto max-w-2xl">
        <h2 className="fade-up text-center display text-[clamp(2rem,5.5vw,3.6rem)]">
          {dict.faq.heading}
        </h2>

        <div className="fade-up mt-10 overflow-hidden rounded-2xl bg-white shadow-pill md:mt-14">
          {dict.faq.items.map((item) => (
            <details
              key={item.q}
              name="faq"
              className="group border-b border-hair last:border-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDownIcon className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-[13px] leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
