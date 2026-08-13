// Band unter dem Hero: ein winziges Label, darunter ein endlos wanderndes
// Laufband aus flachen Karten mit den echten Logos der Auszeichner und Medien.

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Studio } from "@/content/studio";
import { Tag } from "./primitives";

type TrustedItems = Studio["trusted"]["items"];

/**
 * Logodateien liegen unter /public/logos und stehen hier statt im Wörterbuch:
 * Pfad und Maße sind in beiden Sprachen gleich.
 *
 * Die Maße sind nicht die Originalmaße, sondern optisch ausgeglichen — gleich
 * hohe Logos wirken ungleich schwer, weil ein breiter Schriftzug mehr Fläche
 * belegt als eine quadratische Marke. Darum sind die Wortmarken flacher und
 * die quadratischen kleiner gesetzt.
 *
 * `knockout` trennt zwei Bauarten, die unterschiedlich behandelt werden müssen:
 * Bei den meisten Logos trägt der Alphakanal die Gestalt, sie lassen sich als
 * Maske einfärben. Bei DASDING, Südwest Presse und TFLIT steckt die Marke aber
 * in der Aussparung einer Vollfläche — maskiert würde daraus ein Klotz. Die
 * laufen deshalb als entsättigtes Bild.
 */
const logos: Record<
  string,
  { src: string; w: number; h: number; knockout?: true }
> = {
  // Größer als die Nachbarn, weil hier der halbe Platz auf die Netzgrafik geht
  // und der Schriftzug sonst zu klein gerät.
  bwki: { src: "/logos/bwki.png", w: 116, h: 50 },
  swr: { src: "/logos/swr.svg", w: 82, h: 25 },
  jufo: { src: "/logos/jugend-forscht.png", w: 140, h: 21 },
  gea: { src: "/logos/gea.png", w: 106, h: 23 },
  tagblatt: { src: "/logos/tagblatt.png", w: 90, h: 25 },
  dasding: { src: "/logos/dasding.png", w: 74, h: 25, knockout: true },
  swp: { src: "/logos/swp.png", w: 34, h: 34, knockout: true },
  tflit: { src: "/logos/tflit.png", w: 30, h: 30, knockout: true },
};

/**
 * Das Logo wird nicht als Bild gezeigt, sondern als Maske: die Fläche dahinter
 * ist Tinte, die Datei gibt nur die Silhouette vor. So tragen alle Marken
 * denselben Ton, egal welche Hausfarbe sie mitbringen — ein Graustufenfilter
 * käme je nach Helligkeit unterschiedlich heraus.
 */
function Logo({ id, label }: { id: string; label: string }) {
  const logo = logos[id];
  if (!logo) return <span className="text-[0.95rem] font-medium">{label}</span>;

  if (logo.knockout) {
    return (
      <Image
        src={logo.src}
        alt={label}
        width={logo.w}
        height={logo.h}
        className="shrink-0 opacity-70 grayscale transition-opacity duration-300 group-hover/card:opacity-100"
        style={{ width: logo.w, height: logo.h }}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={label}
      className="block shrink-0 bg-night/50 transition-colors duration-300 group-hover/card:bg-night"
      style={{
        width: logo.w,
        height: logo.h,
        maskImage: `url(${logo.src})`,
        WebkitMaskImage: `url(${logo.src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

/** Eine Hälfte des Bandes. Der Track enthält sie zweimal. */
function Strip({ items, mirror = false }: { items: TrustedItems; mirror?: boolean }) {
  return (
    // Die Kopie ist reine Optik — für Screenreader stünde sonst alles doppelt.
    <div className="flex shrink-0" aria-hidden={mirror ? true : undefined}>
      {items.map((item) => (
        <div
          key={item.id}
          className="group/card mx-2 flex h-24 min-w-[15rem] flex-col items-center justify-center gap-2.5 rounded-bento bg-shell px-8 text-center"
        >
          <Logo id={item.id} label={item.name} />
          <Tag>{item.note}</Tag>
        </div>
      ))}
    </div>
  );
}

export function TrustedMarquee({ s }: { s: Studio }) {
  return (
    // Ohne eigene Außenabstände — den Rhythmus setzt die Seite.
    <section role="region" aria-label={s.trusted.label}>
      <Tag className="mb-6 text-center">{s.trusted.label}</Tag>

      {/* Fokussierbar, weil der Lauf bei Fokus stoppt (WCAG 2.2.2) und das
          Band bei reduzierter Bewegung zum scrollbaren Streifen wird. */}
      <div className="marquee" tabIndex={0}>
        <div
          className="marquee-track"
          style={{ "--marquee-duration": "58s" } as CSSProperties}
        >
          <Strip items={s.trusted.items} />
          <Strip items={s.trusted.items} mirror />
        </div>
      </div>
    </section>
  );
}
