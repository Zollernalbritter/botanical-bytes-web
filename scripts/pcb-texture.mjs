// Rastert den flachen EasyEDA-Export der Platinenoberseite zu einer Textur für
// das 3D-Modell.
//
//   node scripts/pcb-texture.mjs [eingabe.svg] [ausgabe.png]
//
// Warum überhaupt: der OBJ-Export von EasyEDA kennt nur Vollflächen. Leiterbahnen,
// Pads und der Bestückungsdruck („Plant Growth Optimizer v.3.0“) stehen dort nicht
// drin — sie stecken nur im 2D-Export. Diese Textur holt sie zurück auf die Platte.
//
// Zwei Dinge macht das Skript am SVG, bevor sharp es rastert:
//   1. Den <style>-Block ersetzen. EasyEDA malt alles schwarz, das ist die
//      Fabrikationsansicht. Wir wollen das Aussehen der echten Platine, also
//      Lack, Kupfer, Zinn und weißen Druck in eigenen Farben.
//   2. Die viewBox auf den Platinenumriss zusammenziehen. Der Export enthält
//      ringsum Leerraum; die Textur muss aber exakt am Rand der Platte anfangen
//      und aufhören, sonst schwimmt der Druck auf dem Modell.
//
// Der Umriss steht auf Layer 10 und wird aus dem SVG selbst gelesen — keine
// abgeschriebenen Zahlen, die beim nächsten Export still falsch werden.

import { readFileSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const [svgArg, pngArg] = process.argv.slice(2);
const svgPath = svgArg ?? "C:/Users/langt/Downloads/PCB_PCB_ESP32-Basis-Conf_3-copy_2026-08-13.svg";
const pngPath = pngArg ?? fileURLToPath(new URL("../public/media/pcb-top.png", import.meta.url));

/** Lange Kante der Textur in Pixeln. */
const LONG_EDGE = 2048;

// Farben der fertigen Platine, nicht der Fertigungsunterlage.
const LACK = "#680878";   // Lötstopplack, aus dem Rendering abgegriffen
const KUPFER = "#7b2091"; // eine Spur heller als der Lack: Bahnen als Relief
const ZINN = "#c9b273";   // blanke Pads und Durchkontaktierungen
const DRUCK = "#eeeae2";  // Bestückungsdruck
const BOHRUNG = "#2a0530"; // Löcher, dunkler als alles andere

// EasyEDA-Layerbelegung: 1 Kupfer oben, 2 Kupfer unten, 3 Bestückungsdruck oben,
// 10 Platinenumriss, 11 Multi-Layer (Pads und Durchkontaktierungen).
const STYLE = `
*[layerid="1"] {stroke:${KUPFER};fill:${KUPFER};}
*[layerid="3"] {stroke:${DRUCK};fill:${DRUCK};}
*[layerid="11"] {stroke:${ZINN};fill:${ZINN};}
*[layerid="2"] {display:none;}
*[layerid="10"] {display:none;}
*[fill="none"] {fill:none;}
*[stroke="none"] {stroke:none;}
[c_etype="pad_shell"] {fill:${ZINN};stroke:${ZINN};}
[c_etype="pad_hole"] {fill:${BOHRUNG};stroke:none;}
g[c_partid="part_hole"] > circle {fill:${BOHRUNG};fill-opacity:1;stroke:${BOHRUNG};}
path, polyline, polygon, line {stroke-linecap:round;stroke-linejoin:round;}
`;

const src = readFileSync(svgPath, "utf8");

// ————— Platinenumriss suchen —————

/**
 * Sammelt die Stützpunkte eines Umriss-Elements. Bei Pfaden zählen nur „M“ und
 * das Ziel eines „A“-Bogens: die Radien im A-Befehl sind keine Koordinaten und
 * würden die Hülle sonst um 31 Einheiten aufblähen.
 */
function stuetzpunkte(el) {
  const punkte = [];
  const paare = (zahlen) => {
    for (let i = 0; i + 1 < zahlen.length; i += 2) punkte.push([zahlen[i], zahlen[i + 1]]);
  };
  const zerlegen = (text) => text.trim().split(/[\s,]+/).filter(Boolean).map(Number);

  const pts = /points="([^"]+)"/.exec(el);
  if (pts) paare(zerlegen(pts[1]));

  const d = /\bd="([^"]+)"/.exec(el);
  if (d) {
    for (const [, befehl, rest] of d[1].matchAll(/([MLA])([^A-Za-z]*)/g)) {
      const zahlen = zerlegen(rest);
      if (befehl === "A") {
        for (let i = 5; i + 1 < zahlen.length; i += 7) punkte.push([zahlen[i], zahlen[i + 1]]);
      } else {
        paare(zahlen);
      }
    }
  }
  return punkte;
}

let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
for (const [el] of src.matchAll(/<(?:polyline|polygon|line|path)\b[^>]*layerid="10"[^>]*>/g)) {
  for (const [x, y] of stuetzpunkte(el)) {
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
}
if (!Number.isFinite(x0)) {
  console.error("Kein Platinenumriss (layerid=10) im SVG gefunden.");
  process.exit(1);
}
const breite = x1 - x0;
const hoehe = y1 - y0;

// ————— SVG umfärben und zuschneiden —————
const px = breite >= hoehe ? LONG_EDGE : Math.round((LONG_EDGE * breite) / hoehe);
const py = breite >= hoehe ? Math.round((LONG_EDGE * hoehe) / breite) : LONG_EDGE;

let svg = src.replace(/<style[^>]*>[\s\S]*?<\/style>/, `<style type="text/css">${STYLE}</style>`);
svg = svg.replace(
  /<svg\b([^>]*)>/,
  (ganz, attrs) =>
    `<svg${attrs
      .replace(/\swidth="[^"]*"/, "")
      .replace(/\sheight="[^"]*"/, "")
      .replace(/\sviewBox="[^"]*"/, "")} width="${px}" height="${py}" viewBox="${x0} ${y0} ${breite} ${hoehe}">`,
);
// Die weiße Grundplatte des Exports trägt jetzt den Lack — dadurch braucht die
// Textur keinen Alphakanal, und Lücken zwischen den Bahnen sehen richtig aus.
svg = svg.replace(/(<rect\b[^>]*?)fill="#FFFFFF"/, `$1fill="${LACK}"`);

// density 72 heißt: eine SVG-Nutzereinheit ist ein Pixel — nur so kommen die
// oben gesetzten width/height wirklich als Pixelmaße heraus.
const png = await sharp(Buffer.from(svg), { density: 72 })
  .flatten({ background: LACK })
  .png({ compressionLevel: 9 })
  .toBuffer();
writeFileSync(pngPath, png);

const { width, height } = await sharp(png).metadata();
console.log(
  `${pngPath}\n` +
    `  Umriss:      x ${x0} .. ${x1}, y ${y0} .. ${y1}` +
    `  (${breite.toFixed(2)} × ${hoehe.toFixed(2)} Einheiten)\n` +
    `  Auflösung:   ${width} × ${height} px\n` +
    `  Dateigröße:  ${(statSync(pngPath).size / 1024).toFixed(0)} kB`,
);
