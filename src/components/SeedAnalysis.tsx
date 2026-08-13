import Image from "next/image";
import type { Dictionary } from "@/content";
import { MeasureMark } from "./MeasureMark";

/**
 * Welche Datei zu welcher Stufe gehört. Steht hier und nicht im Wörterbuch:
 * die Pfade sind in beiden Sprachen dieselben. Erzeugt von
 * scripts/seed-stages.mjs — alle drei zeigen denselben Ausschnitt derselben
 * Aufnahme, nur unterschiedlich verarbeitet.
 */
const stageImages: Record<string, string> = {
  camera: "/media/seed-original.jpg",
  "edge-hard": "/media/seed-canny.jpg",
  "edge-soft": "/media/seed-sobel.jpg",
};

// Die Samenanalyse als eigene Sektion.
//
// Sie hing vorher als Anhängsel unter der Hardware und wirkte dort wie ein
// Nachtrag. Sie ist aber ein eigener Gedanke — nicht die Platine, sondern was
// man mit den Bildern macht — und bekommt deshalb ihren eigenen Raum, oberhalb
// der Hardware.
export function SeedAnalysis({ dict }: { dict: Dictionary }) {
  const s = dict.seed;

  return (
    <section className="px-5 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl">
        <header className="fade-up flex flex-col items-center gap-4 text-center">
          <h2 className="display text-[clamp(2rem,4.6vw,3.2rem)]">
            {s.headline}
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-muted">
            {s.body}
          </p>
        </header>

        {/* Drei gleich große Kacheln, an allen vier Ecken gerundet und mit Luft
            dazwischen. Der Abstand ersetzt die Trennlinien, die es brauchte,
            solange die drei Stufen in einem Bild zusammenhingen. */}
        <div className="fade-up mt-12 grid gap-5 sm:grid-cols-3 md:mt-16">
          {s.stages.map((stage) => (
            <figure key={stage.label}>
              <div className="relative aspect-[470/465] w-full overflow-hidden rounded-media bg-card">
                <Image
                  src={stageImages[stage.mark]}
                  alt={stage.alt}
                  fill
                  sizes="(min-width: 640px) 370px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3.5">
                <span className="flex items-center gap-2">
                  <MeasureMark
                    id={stage.mark}
                    className="size-[18px] shrink-0 text-ink"
                  />
                  <span className="label-mono uppercase text-ink">
                    {stage.label}
                  </span>
                </span>
                <span className="mt-1.5 block text-[13px] leading-relaxed text-muted">
                  {stage.note}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
