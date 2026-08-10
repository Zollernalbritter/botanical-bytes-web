// Erzeugt Web-Derivate aus den Original-Fotos des Projekt-Repos und den
// geretteten Blob-Bildern. Quelle der Wahrheit für alle Bildzuordnungen.
// Aufruf: node scripts/prepare-images.mjs
import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const BWKI = "C:/Users/langt/Documents/Programmieren/BWKI_24_Plant_Growth_Optimizer";
const ORIG = `${BWKI}/Dokumentation des Anbaus/Orginal`;
const BLOB = "assets-src/blob";
const OUT = "src/assets/img";

const photos = [
  // [Quelle, Ziel, max. Breite]
  [`${ORIG}/Nahaufnahme Kresse.jpeg`, "hero-cress.jpg", 2400],
  [`${ORIG}/Abmessen der Kressesamen.jpeg`, "measuring-seeds.jpg", 1600],
  [`${ORIG}/Aussat der Kressesamen.jpeg`, "sowing-seeds.jpg", 1600],
  [`${ORIG}/Kresse Ausgewachsen.jpeg`, "cress-grown.jpg", 1600],
  [`${ORIG}/Test aufbau in Gewächshaus.jpeg`, "greenhouse-prototype.jpg", 1600],
  [`${ORIG}/Abwiegen des Ertrags 1.jpeg`, "weighing-harvest.jpg", 1600],
  // Tag 0 und Tag 1 sind byte-identisch — die Serie beginnt bei Tag 1.
  [`${ORIG}/Microgreens Test (Tag 1).jpeg`, "day1.jpg", 1000],
  [`${ORIG}/Microgreens Test (Tag 2).jpeg`, "day2.jpg", 1000],
  [`${ORIG}/Microgreens Test (Tag 3).jpeg`, "day3.jpg", 1000],
  [`${ORIG}/Microgreens Test (Tag 4).jpeg`, "day4.jpg", 1000],
  [`${ORIG}/Microgreens Test (Tag 5).jpeg`, "day5.jpg", 1000],
  [`${BLOB}/team-studio.jpeg`, "team-studio.jpg", 2000],
  [`${BLOB}/bwki-stage.png`, "bwki-stage.jpg", 1600],
  [`${BLOB}/jufo-regional.png`, "jufo-regional.jpg", 1600],
  [`${BLOB}/jufo-landeswettbewerb.png`, "jufo-landeswettbewerb.jpg", 1600],
];

const pngs = [
  [`${BLOB}/pcb-v2.png`, "pcb-v2.png", 1600],
  [`${BLOB}/pcb-v3.png`, "pcb-v3.png", 1600],
  [`${BWKI}/Edge Detection Seed/Seed.png`, "seed-original.png", 1600],
];

const copies = [
  // klein genug bzw. verlustfrei zu übernehmen
  [`${BLOB}/dashboard.png`, `${OUT}/dashboard.png`],
  [`${BWKI}/Edge Detection Seed/Edge Detection Seed Output Canny.png`, `${OUT}/seed-canny.png`],
  [`${BWKI}/Edge Detection Seed/Edge Detection Seed Output Sobel.png`, `${OUT}/seed-sobel.png`],
  [`${BWKI}/Platine/Schematic.pdf`, "public/downloads/schematic.pdf"],
  [`${BWKI}/Platine/PCB.pdf`, "public/downloads/pcb.pdf"],
];

await mkdir(OUT, { recursive: true });
await mkdir("public/downloads", { recursive: true });
await mkdir("public/media", { recursive: true });

for (const [src, name, width] of photos) {
  await sharp(src)
    .rotate() // EXIF-Orientierung einbrennen
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(OUT, name));
  console.log("photo ", name);
}

for (const [src, name, width] of pngs) {
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, name));
  console.log("png   ", name);
}

for (const [src, dst] of copies) {
  await copyFile(src, dst);
  console.log("copy  ", path.basename(dst));
}

// OG-Bild: Hero-Crop 1200×630 mit dezentem Ink-Verlauf unten
const gradient = Buffer.from(
  `<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0" stop-color="#123007" stop-opacity="0.55"/>
    <stop offset="0.45" stop-color="#123007" stop-opacity="0"/>
  </linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`
);
await sharp(`${ORIG}/Nahaufnahme Kresse.jpeg`)
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .composite([{ input: gradient }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/og.jpg");
console.log("og.jpg");

// Apple-Touch-Icon aus dem SVG-Favicon rastern
await sharp("src/app/icon.svg", { density: 300 })
  .resize(180, 180)
  .png()
  .toFile("src/app/apple-icon.png");
console.log("apple-icon.png");

console.log("done");
