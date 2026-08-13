import type { Studio } from "@/content/studio";
import { SectionHeading, Wrap } from "./primitives";

// FAQ: eine schmale, zentrierte Spalte mit Haarlinien zwischen den Fragen.
// Kein Rahmen, keine Karte — nur Text und Trennlinien auf dem Creme-Grund.
export function StudioFaq({ s }: { s: Studio }) {
  return (
    <section id="faq" className="scroll-mt-24">
      {/* Das Ausrufezeichen ist nötig: Wraps eigenes max-w-[76rem] steht im
          Stylesheet hinter dem schmaleren Wert und gewänne sonst. */}
      <Wrap className="max-w-[52rem]!">
        <SectionHeading line1={s.faq.heading} />

        <div className="mt-12">
          {s.faq.items.map((item) => (
            // Das native name-Attribut hält immer nur eine Antwort offen —
            // ein Exklusiv-Akkordeon ganz ohne JavaScript.
            <details
              key={item.q}
              name="studio-faq"
              className="group border-b border-night/10 last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-md py-6 text-left text-[1.0625rem] font-medium marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
                {item.q}
                {/* Plus wird zu Minus: der senkrechte Balken dreht sich weg,
                    statt ihn auszublenden — das liest sich als eine Bewegung. */}
                <span
                  aria-hidden="true"
                  className="relative block size-4 shrink-0"
                >
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-night" />
                  <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-night transition-transform group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>

              <p className="pb-7 pr-10 text-[0.9375rem] leading-relaxed text-night/60">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
