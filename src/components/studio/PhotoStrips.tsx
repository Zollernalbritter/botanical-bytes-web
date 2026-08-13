import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import type { Studio } from "@/content/studio";
import { images } from "@/lib/images";
import { Wrap } from "./primitives";

// Riesentitel über einem endlos wandernden Band: zwölf sehr schmale
// Hochkant-Streifen aus einem echten Kresse-Zyklus, jeder zur Kapsel gerundet.

// Reihenfolge ist Vertrag: sie deckt sich Position für Position mit
// s.gallery.alts — nur so gehört zu jedem Streifen sein eigener alt-Text.
const strips: StaticImageData[] = [
  images.sowingSeeds,
  images.greenhousePrototype,
  images.days[0],
  images.days[1],
  images.days[2],
  images.days[3],
  images.days[4],
  images.cressGrown,
  images.weighingHarvest,
  images.measuringSeeds,
  images.heroCress,
  images.bwkiStage,
];

// Jeder dritte Streifen ist kürzer, sonst steht die Reihe da wie ein Lattenzaun.
const heights = [
  "h-[20rem] md:h-[26rem]",
  "h-[20rem] md:h-[26rem]",
  "h-[18rem] md:h-[24rem]",
];

function Strip({
  image,
  alt,
  index,
}: {
  image: StaticImageData;
  alt: string;
  index: number;
}) {
  return (
    <div
      className={`relative mx-1 w-14 shrink-0 overflow-hidden rounded-full sm:w-16 md:w-[4.5rem] ${
        heights[index % heights.length]
      }`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="80px"
        placeholder="blur"
        className="object-cover"
      />
    </div>
  );
}

export function PhotoStrips({ s }: { s: Studio }) {
  const label = `${s.gallery.line1} ${s.gallery.line2}`;

  // Die Schleife springt bei -50 %, also darf eine Bandhälfte nie schmaler sein
  // als der Ausschnitt — sonst läuft rechts der Creme-Grund auf. Zwölf Streifen
  // messen nur rund 960 px, darum läuft die Reihe je Hälfte zweimal durch.
  // Nur der allererste Durchlauf trägt die alt-Texte; alles Weitere ist
  // Wiederholung und bleibt für Screenreader stumm.
  const half = (duplicate: boolean) =>
    [0, 1].flatMap((pass) =>
      strips.map((image, index) => (
        <Strip
          key={`${pass}-${image.src}`}
          image={image}
          index={index}
          alt={duplicate || pass > 0 ? "" : s.gallery.alts[index]}
        />
      )),
    );

  return (
    <section>
      <Wrap>
        <h2 className="t-mega text-balance text-center">
          {s.gallery.line1}
          <br />
          {s.gallery.line2}
        </h2>
      </Wrap>

      {/* tabIndex, weil das Band bei :focus-within stoppt: erst damit haben
          auch Tastaturnutzer einen Halt für die Bewegung (WCAG 2.2.2). */}
      <div
        className="marquee mt-16"
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <div
          className="marquee-track"
          style={{ "--marquee-duration": "60s" } as CSSProperties}
        >
          {/* items-center, weil die kürzeren Streifen sonst oben hängen und
              die Reihe unten ausfranst statt zu atmen. */}
          <div className="flex shrink-0 items-center">{half(false)}</div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {half(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
