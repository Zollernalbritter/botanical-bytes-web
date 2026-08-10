import type { Dictionary } from "@/content";
import { LeafMark } from "./LeafMark";
import { CheckCircleIcon } from "./ui/icons";

// Lassies „How it works“: drei große, ruhige Karten. In jeder schwebt ein
// Ausschnitt der echten Oberfläche, verbunden durch eine gepunktete Linie mit
// einem Status-Pill in der Mitte.
export function HowItWorks({ dict }: { dict: Dictionary }) {
  const h = dict.how;

  return (
    <section id="technik" className="scroll-mt-24 px-5 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <h2 className="fade-up text-center display text-[clamp(2rem,5.5vw,3.6rem)]">
          {h.heading}
        </h2>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3">
          {h.steps.map((step) => (
            <article key={step.title} className="fade-up">
              <div className="flex h-[26rem] flex-col items-center justify-center gap-0 rounded-[1.75rem] bg-card px-5 md:h-[28rem]">
                {/* obere Mini-Karte */}
                <div className="w-full max-w-[17rem] rounded-xl bg-white p-3 shadow-pill">
                  <p className="flex items-center gap-2 text-[13px] font-medium">
                    <LeafMark className="size-4 shrink-0" />
                    {step.top.title}
                  </p>
                  <div className="mt-2.5 flex items-baseline justify-between border-t border-hair pt-2">
                    <span className="text-[12px] text-muted">{step.top.label}</span>
                    <span className="font-mono text-[12px]">{step.top.value}</span>
                  </div>
                </div>

                {/* Verbindung mit Status-Pill */}
                <div
                  aria-hidden="true"
                  className="h-5 w-px border-l border-dashed border-ink/20"
                />
                <p className="inline-flex items-center gap-1.5 rounded-md bg-moss-tint px-2 py-1 font-mono text-[11px] text-moss-deep">
                  <CheckCircleIcon className="size-3 shrink-0" />
                  {step.pill}
                </p>
                <div
                  aria-hidden="true"
                  className="h-5 w-px border-l border-dashed border-ink/20"
                />

                {/* untere Mini-Karte */}
                <ul className="w-full max-w-[17rem] rounded-xl bg-white p-3 shadow-pill">
                  {step.rows.map((row, i) => (
                    <li
                      key={row.label}
                      className={`flex items-baseline justify-between py-1.5 ${
                        i > 0 ? "border-t border-hair" : ""
                      }`}
                    >
                      <span className="text-[12px] text-muted">{row.label}</span>
                      <span className="font-mono text-[12px]">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="mt-5 text-[15px] font-medium">{step.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
