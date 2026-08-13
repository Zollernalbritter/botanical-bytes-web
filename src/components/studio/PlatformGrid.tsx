import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Studio } from "@/content/studio";
import { images } from "@/lib/images";
import { Card, PillNote, SectionHeading, Wrap } from "./primitives";
import { ArchGlyph, DomeGlyph, DropGlyph, LeafGlyph, RingGlyph } from "./shapes";

// Das Herzstück der Seite: sechs Bento-Kacheln um eine dominante Mittelspalte.
// Links das treibende Sensorfeld, in der Mitte das Platinen-Render, rechts die
// Typo-Kachel — dazu zwei Karten, die ihren Text erst bei Hover oder Fokus zeigen.

// Streufeld der Sensorik-Kachel. Positionen, Bahnen und Versätze stehen fest
// notiert, damit sich die Formen nie überlagern und Tailwind jede Klasse findet.
const scatter = [
  { left: "3%", top: "12%", x: "10px", y: "-9px", delay: "0s", shape: "size-6 rounded-[3px] bg-shell-deep" },
  { left: "24%", top: "2%", x: "-8px", y: "12px", delay: "0.6s", shape: "size-5 rounded-full bg-olive" },
  { left: "45%", top: "9%", x: "12px", y: "9px", delay: "1.2s", shape: "size-5 rounded-[3px] bg-shell-deep" },
  { left: "66%", top: "3%", x: "-11px", y: "-7px", delay: "1.8s", shape: "size-7 rounded-[3px] bg-shell-deep" },
  { left: "80%", top: "22%", x: "-14px", y: "10px", delay: "2.4s", shape: "size-5 rounded-full bg-shell-deep" },
  { left: "1%", top: "56%", x: "13px", y: "8px", delay: "3s", shape: "size-5 rounded-full bg-olive" },
  { left: "18%", top: "74%", x: "9px", y: "-13px", delay: "3.6s", shape: "size-7 rounded-[3px] bg-shell-deep" },
  { left: "50%", top: "78%", x: "-10px", y: "-11px", delay: "4s", shape: "size-5 rounded-full bg-shell-deep" },
  { left: "76%", top: "62%", x: "-12px", y: "-8px", delay: "2s", shape: "size-6 rounded-[3px] bg-olive" },
] as const;

export function PlatformGrid({ s }: { s: Studio }) {
  const c = s.platform.cards;

  return (
    <section id="plattform" className="scroll-mt-24">
      <Wrap>
        {/* Important-Modifier, weil SectionHeading t-section fest mitbringt und
            beide Utilities gleich stark sind — sonst bliebe die Überschrift auf
            Sektionsgrad statt auf Hero-Grad. */}
        <SectionHeading
          line1={s.platform.line1}
          line2={s.platform.line2}
          className="t-hero!"
        />

        {/* Drei Zeilen, aber ungleich belegt: die Platinen-Kachel greift über
            zwei davon und macht die Mitte zur höchsten Spalte. */}
        <div className="mt-14 grid gap-3 sm:gap-4 md:grid-cols-3 md:auto-rows-[minmax(11rem,auto)]">
          {/* 1 — Sensorik: Titel oben, Streufeld in der Mitte, Text unten. */}
          <Card className="flex min-h-[19rem] flex-col items-center px-6 pb-7 pt-8 text-center md:col-start-1 md:row-start-1">
            <ArchGlyph className="size-6 text-night" />
            <h3 className="mt-3 text-[1.0625rem] font-medium">{c.sensors.title}</h3>

            <div aria-hidden="true" className="relative my-6 min-h-[8rem] w-full flex-1">
              {scatter.map((dot) => (
                <span
                  key={`${dot.left}-${dot.top}`}
                  className={`drift absolute ${dot.shape}`}
                  style={
                    {
                      left: dot.left,
                      top: dot.top,
                      "--drift-x": dot.x,
                      "--drift-y": dot.y,
                      "--drift-delay": dot.delay,
                    } as CSSProperties
                  }
                />
              ))}
              {/* Der aktive Messpunkt. Eigener Wrapper, weil pulse-soft die
                  Transform belegt und keine Zentrier-Verschiebung duldet. */}
              <span className="absolute inset-0 grid place-items-center">
                <span className="pulse-soft shape-leaf grid size-9 place-items-center bg-leaf">
                  <span className="size-3 rounded-full bg-cream" />
                </span>
              </span>
            </div>

            <p className="text-[0.875rem] leading-relaxed text-night/55">
              {c.sensors.body}
            </p>
          </Card>

          {/* 2 — Die Platine. Das Render läuft unten aus der Karte heraus. */}
          <Card className="flex min-h-[24rem] flex-col items-center px-6 pt-8 text-center md:col-start-2 md:row-start-1 md:row-span-2">
            <ArchGlyph className="size-6 text-night" />
            <h3 className="t-card mt-3">
              {c.pcb.title}
              <br />
              {c.pcb.title2}
            </h3>
            <p className="mt-3 max-w-[24rem] text-[0.875rem] leading-relaxed text-night/55">
              {c.pcb.body}
            </p>
            {/* Das Render sitzt auf einer dunklen Schale, die unten aus der
                Karte läuft. Ohne sie stünde das kräftige Platinen-Violett
                ungefasst auf dem Sandton und risse die Palette auf. */}
            <div className="-mx-6 mt-auto flex justify-center rounded-t-[1.75rem] bg-night px-6 pb-4 pt-6">
              <Image
                src={images.pcbV3}
                alt={c.pcb.imgAlt}
                sizes="(min-width: 768px) 40vw, 100vw"
                placeholder="blur"
                className="h-auto w-full max-w-[22rem] object-contain"
              />
            </div>
          </Card>

          {/* 3 — Der Takt: reine Typo-Kachel, vertikal zentriert. */}
          <Card className="flex min-h-[19rem] flex-col items-center justify-center px-7 py-10 text-center md:col-start-3 md:row-start-1">
            <RingGlyph className="size-7 text-coral" />
            <h3 className="t-card mt-4">
              {c.cadence.title}
              <br />
              {c.cadence.title2}
            </h3>
            <p className="mt-3 max-w-[22rem] text-[0.875rem] leading-relaxed text-night/55">
              {c.cadence.body}
            </p>
          </Card>

          {/* 4 — Aufdeck-Kachel: Offenheit. */}
          <RevealCard
            rest={c.open.rest}
            title={c.open.title}
            body={c.open.body}
            icon={<LeafGlyph className="mx-auto mb-3 size-5 text-leaf" />}
            className="md:col-start-1 md:row-start-2 md:row-span-2"
          />

          {/* 5 — Aussaat: nur Form, Titel, Text. */}
          <Card className="flex min-h-[15rem] flex-col items-center justify-center px-7 py-10 text-center md:col-start-2 md:row-start-3">
            <DomeGlyph className="size-6 text-night" />
            <h3 className="mt-4 text-[1.0625rem] font-medium">{c.standard.title}</h3>
            <p className="mt-3 max-w-[24rem] text-[0.875rem] leading-relaxed text-night/55">
              {c.standard.body}
            </p>
          </Card>

          {/* 6 — Aufdeck-Kachel: Dauerbetrieb. */}
          <RevealCard
            rest={c.runtime.rest}
            title={c.runtime.title}
            body={c.runtime.body}
            icon={<DropGlyph className="mx-auto mb-3 size-5 text-azure" />}
            className="md:col-start-3 md:row-start-2 md:row-span-2"
          />
        </div>
      </Wrap>
    </section>
  );
}

/**
 * Karte, die im Ruhezustand nur eine Pille zeigt und bei Hover oder Fokus den
 * Text darunter aufdeckt. Der Wechsel steckt vollständig im CSS (.reveal-card),
 * darum bleibt die Karte eine Server-Komponente.
 */
function RevealCard({
  rest,
  title,
  body,
  icon,
  className,
}: {
  rest: string;
  title: string;
  body: string;
  icon: ReactNode;
  className: string;
}) {
  return (
    <Card className={`reveal-card min-h-[15rem] ${className}`}>
      {/* Fokussierbar, damit die Aufdeckung auch ohne Maus erreichbar ist:
          :focus-within an der Karte reagiert auf dieses Kind. Der Fokusring
          liegt innen, weil die Karte alles außerhalb ihres Radius abschneidet. */}
      <div
        tabIndex={0}
        className="absolute inset-0 rounded-bento focus-visible:outline-offset-[-6px]"
      >
        <div className="reveal-rest absolute inset-0 grid place-items-center">
          <PillNote ground="shell">{rest}</PillNote>
        </div>
        <div className="reveal-open absolute inset-0 flex flex-col justify-center px-7 text-center">
          {icon}
          <h3 className="text-[1.0625rem] font-medium">{title}</h3>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-night/55">{body}</p>
        </div>
      </div>
    </Card>
  );
}
