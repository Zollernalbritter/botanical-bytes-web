// Ruhige Zahlen-Sektion: links die eine große Aussage, rechts vier Kennwerte
// als kleines Kachelraster. Keine Bewegung, nur Flächen und Radien.

import type { Studio } from "@/content/studio";
import { Card, Tag, Wrap } from "./primitives";

// Eine Grundform je Kachel, in fester Reihenfolge. Ausgeschriebene
// Klassenstrings, damit Tailwind sie beim Scannen findet.
const statDecor = [
  "size-4 rounded-full bg-leaf",
  "size-4 rounded-[3px] bg-azure",
  "shape-arch h-4 w-5 bg-wheat",
  "shape-leaf size-4 bg-clay",
];

export function HighlightStats({ s }: { s: Studio }) {
  const h = s.highlight;

  return (
    <section>
      <Wrap>
        <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <Card className="flex min-h-[22rem] flex-col justify-center p-8 md:p-12">
            <Tag>{h.qualifier}</Tag>
            {/* Zahl und Satz bilden eine Überschrift — vorgelesen ergibt das
                einen zusammenhängenden Satz, nicht drei Bruchstücke. */}
            <h2 className="mt-2">
              <span className="t-mega block text-coral">{h.figure}</span>
              <span className="t-card mt-3 block">
                {h.line1}
                <br />
                {h.line2}
              </span>
            </h2>
            <p className="mt-5 max-w-[30rem] text-[0.9375rem] leading-relaxed text-night/55">
              {h.body}
            </p>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {h.stats.map((stat, i) => (
              <Card
                key={stat.label}
                className="flex min-h-[10.5rem] flex-col justify-end p-7"
              >
                <span
                  aria-hidden="true"
                  className={`absolute right-6 top-6 ${statDecor[i]}`}
                />
                <p className="text-[2rem] font-medium leading-none tracking-tight">
                  {stat.value}
                </p>
                <Tag className="mt-2">{stat.label}</Tag>
              </Card>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
