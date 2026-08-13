import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/content";

// Presseband direkt unter dem Hero: ein Monolabel, darunter ein endlos
// wanderndes Band aus den Marken der Auszeichner und Medien.
//
// Die Bauklotz-Fassung stellt dieselben Stationen auf sandfarbene Karten. Hier
// nicht: unter einem Video-Hero wäre ein Kartenraster ein zweiter lauter Block.
// Auf dem Papierton trägt allein die Silhouette in Tinte — das Band bleibt
// Fußnote zum Hero, nicht Konkurrenz.

type PressItem = Dictionary["press"]["items"][number];

/**
 * Zuordnung id → Datei samt Maßen. Beides steht hier und nicht im Wörterbuch,
 * weil sich weder Pfad noch Größe zwischen den Sprachen ändern.
 *
 * Die Maße sind nicht die Originalmaße, sondern optisch ausgeglichen: gleich
 * hohe Logos wirken ungleich schwer, weil ein breiter Schriftzug mehr Fläche
 * belegt als eine quadratische Marke. Wortmarken laufen darum flacher, Quadrate
 * kleiner. Nur das BWKI-Signet braucht Höhe — es ist zweizeilig gesetzt und
 * fiele auf Schriftzughöhe unter die Lesbarkeitsgrenze.
 *
 * `dim` trennt zwei Bauarten, die unterschiedlich behandelt werden müssen:
 * Bei den meisten Logos trägt der Alphakanal die Gestalt, sie lassen sich als
 * Maske in Tinte umfärben und liegen damit von selbst auf einem Gewicht. Bei
 * DASDING, Südwest Presse und TFLIT steckt die Marke dagegen in der Aussparung
 * einer Vollfläche — maskiert bliebe davon ein Klotz. Die laufen als
 * entsättigtes Bild mit, und dort muss die Ruheopazität einzeln gesetzt werden:
 * DASDING ist fast schwarz und knallt sonst als Block aus dem Band, die beiden
 * mitteltonigen Quadrate verschwinden bei demselben Wert dagegen fast.
 */
const logos: Record<
  string,
  { src: string; w: number; h: number; dim?: number }
> = {
  bwki: { src: "/logos/bwki.png", w: 150, h: 65 },
  swr: { src: "/logos/swr.svg", w: 110, h: 34 },
  jufo: { src: "/logos/jugend-forscht.png", w: 196, h: 29 },
  gea: { src: "/logos/gea.png", w: 150, h: 32 },
  dasding: { src: "/logos/dasding.png", w: 98, h: 34, dim: 0.46 },
  tagblatt: { src: "/logos/tagblatt.png", w: 126, h: 35 },
  swp: { src: "/logos/swp.png", w: 54, h: 54, dim: 0.78 },
  tflit: { src: "/logos/tflit.png", w: 50, h: 50, dim: 0.78 },
};

/**
 * Im Normalfall wird das Logo nicht als Bild gezeigt, sondern als Maske: die
 * Fläche dahinter ist Tinte, die Datei gibt nur die Silhouette vor. So tragen
 * alle Marken denselben warmen Ton wie die Schrift ringsum, egal welche
 * Hausfarbe sie mitbringen — ein Graustufenfilter käme je nach Helligkeit
 * anders heraus und würde auf dem warmen Papier kühl liegen.
 *
 * Nebenbei bleibt so auch das SWR-SVG vom Bildoptimierer verschont, der SVG
 * ohne `dangerouslyAllowSVG` ablehnt. Wer es später auf <Image> umstellt,
 * bricht den Build.
 */
function Logo({ id, name }: { id: string; name: string }) {
  const logo = logos[id];
  // Fehlt die Datei, springt der Name ein — das Band bleibt vollzählig.
  if (!logo) return <span className="display text-[15px] text-ink/60">{name}</span>;

  // Ausgesparte Marken: Opazität kommt pro Logo, darum über eine Variable statt
  // über eine feste Klasse. Beim Zeigen hellt jede um denselben Betrag auf.
  if (logo.dim !== undefined) {
    return (
      <Image
        src={logo.src}
        alt={name}
        width={logo.w}
        height={logo.h}
        className="shrink-0 grayscale opacity-[var(--dim)] transition-opacity duration-500 group-hover/item:opacity-[var(--lit)]"
        style={
          {
            width: logo.w,
            height: logo.h,
            "--dim": logo.dim,
            "--lit": Math.min(1, logo.dim + 0.3),
          } as CSSProperties
        }
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={name}
      // Eine Stufe kräftiger als zuvor: die Marken laufen jetzt deutlich
      // größer, und auf mehr Fläche liest sich derselbe Grauwert blasser.
      className="block shrink-0 bg-ink/55 transition-colors duration-500 group-hover/item:bg-ink/85"
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

function Item({ item }: { item: PressItem }) {
  return (
    <li className="group/item flex shrink-0 items-center">
      {/* Trennzeichen ist ein Punkt, keine Linie und keine Kartenkante: er
          gliedert das Band, ohne es in Felder zu zerschneiden. */}
      <span aria-hidden="true" className="flex h-20 items-center">
        <span className="size-[3px] rounded-full bg-sand" />
      </span>

      {/* Kein fester Slot mehr, sondern nur noch Luft links und rechts: die
          Breite kommt jetzt vom Logo selbst. Vorher zwang eine feste Spalte
          jedes Zeichen in dieselbe Kachelbreite — ein Schriftzug und ein
          quadratisches Signet standen dadurch gleich weit auseinander, obwohl
          sie ungleich viel Fläche belegen, und das Band lief auseinander.
          Die gemeinsame Höhe bleibt: sie legt flache Wortmarken und hohe
          Signets auf eine Mittellinie, sonst tanzt jedes Logo auf eigener. */}
      <span className="flex h-20 items-center justify-center px-7">
        <Logo id={item.id} name={item.name} />
      </span>
    </li>
  );
}

/**
 * Ein Durchlauf des Bandes. Der Track enthält ihn mehrfach (siehe COPIES). Die
 * Kopien sind reine Optik — ohne `aria-hidden` läse ein Screenreader acht
 * Stationen als vierundzwanzig.
 */
function Strip({ items, clone = false }: { items: PressItem[]; clone?: boolean }) {
  return (
    <ul className="flex shrink-0" aria-hidden={clone ? true : undefined}>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
}

/**
 * Wie oft die Liste im Track steht. Die Schleife springt nach genau einem
 * Durchlauf zurück; danach füllen nur noch die übrigen Kopien das Fenster.
 * Tragfähige Breite ist also (COPIES − 1) × Durchlaufbreite.
 *
 * Ein Durchlauf misst 1406 px: acht Stationen, jede aus 3 px Trennpunkt plus
 * 2 × 28 px Luft (px-7) plus der Logobreite oben, also 8 × 59 px = 472 px fest
 * und 934 px Logo (150+110+196+150+98+126+54+50).
 *
 * Zwei Kopien trugen damit nur 1406 px — auf jedem Bildschirm ab 1440 px riss
 * das Band am Ende der Schleife sichtbar auf. Vier tragen 3 × 1406 = 4218 px:
 * das deckt die geforderten 2560 px und obendrein 4K-Panels mit 3840 px, für
 * die drei Kopien (2812 px) knapp nicht gereicht hätten. Wer Logos verkleinert
 * oder Stationen streicht, muss hier nachrechnen.
 */
const COPIES = 4;

export function PressBand({ dict }: { dict: Dictionary }) {
  const p = dict.press;

  return (
    <section aria-labelledby="press-label" className="py-14 md:py-20">
      <p id="press-label" className="label-mono mb-8 text-center">
        {p.label}
      </p>

      {/* Fokussierbar, weil der Lauf bei Fokus stoppt (WCAG 2.2.2) und das Band
          bei reduzierter Bewegung zum scrollbaren Streifen wird — beides regelt
          .marquee in globals.css. Deutlich langsamer als in der Bauklotz-
          Fassung: das Band soll neben dem Video im Augenwinkel bleiben. */}
      <div className="marquee" tabIndex={0}>
        <div
          className="marquee-track"
          style={
            {
              "--marquee-duration": "64s",
              "--marquee-copies": COPIES,
            } as CSSProperties
          }
        >
          {Array.from({ length: COPIES }, (_, i) => (
            <Strip key={i} items={p.items} clone={i > 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
