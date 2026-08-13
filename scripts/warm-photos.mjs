// Stimmt die echten Projektfotos auf den Ton der Seite ab.
//
//   node scripts/warm-photos.mjs
//
// In der Collage um die 25-%-Zahl stehen echte Fotos neben erzeugten. Die
// erzeugten sind im hellen Gegenlicht entstanden, die echten auf einem
// schwarzen Tisch bei Kunstlicht — nebeneinander bricht das auseinander.
//
// Angeglichen wird nur die Anmutung, nicht der Inhalt: Schatten anheben,
// leicht aufhellen, eine Spur wärmer stimmen. Keine Retusche, kein Zuschnitt,
// nichts hinzugefügt oder entfernt. Wer das Original braucht, findet es
// unverändert daneben — die Ausgabe bekommt ein eigenes Suffix.

import sharp from "sharp";
import { stat } from "node:fs/promises";

/**
 * Die drei Fotos der Collage. `rotate` richtet die Küchenwaage auf: im
 * Original liegt sie quer und die Anzeige steht auf dem Kopf.
 */
const PHOTOS = [
  { from: "measuring-seeds.jpg", to: "measuring-seeds-warm.jpg" },
  { from: "weighing-harvest.jpg", to: "weighing-harvest-warm.jpg", rotate: 90 },
  { from: "cress-grown.jpg", to: "cress-grown-warm.jpg" },
];

const DIR = "src/assets/img";

/**
 * Warme Mischmatrix. Rot bekommt einen Hauch dazu, Blau wird zurückgenommen,
 * Grün bleibt liegen — sonst kippt die Kresse ins Gelbliche, und gerade sie
 * soll ihre Farbe behalten. Die Werte sind bewusst klein: es geht um eine
 * Angleichung, nicht um einen Filter.
 */
const WARM = [
  [1.06, 0.02, 0.0],
  [0.01, 1.0, 0.0],
  [0.0, 0.02, 0.93],
];

/**
 * Schwarz anheben, bevor aufgehellt wird. Der schwarze Tisch im Hintergrund
 * ist der eigentliche Bruch zur hellen Collage; ein reiner Helligkeitsregler
 * würde das Motiv ausbrennen, bevor der Hintergrund merklich heller wird.
 */
const LIFT = 16;

for (const photo of PHOTOS) {
  const from = `${DIR}/${photo.from}`;
  const to = `${DIR}/${photo.to}`;

  let pipeline = sharp(from);
  if (photo.rotate) pipeline = pipeline.rotate(photo.rotate);

  await pipeline
    .linear(0.94, LIFT)
    .recomb(WARM)
    .modulate({ brightness: 1.1, saturation: 1.04 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(to);

  const meta = await sharp(to).metadata();
  const { size } = await stat(to);
  console.log(
    `${photo.to.padEnd(28)} ${meta.width}x${meta.height}  ${(size / 1024).toFixed(0)} kB` +
      (photo.rotate ? `  (um ${photo.rotate}° gedreht)` : ""),
  );
}
