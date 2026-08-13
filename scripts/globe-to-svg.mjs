// Zeichnet den Punkte-Globus einmal als SVG — dieselbe Kugel, dieselbe
// Landmaske, dieselbe Ruhelage wie DottedGlobe.tsx, nur eingefroren.
//
// Zweck: die Design-Datei in Paper braucht den Globus als Vektor. Ein
// Bildschirmfoto der Leinwand wäre ein totes Pixelbild; so lässt sich in
// Paper jeder Punkt anfassen, und die Datei bleibt klein.
//
// Die Konstanten sind absichtlich hier kopiert und nicht importiert: das
// Skript läuft ohne TypeScript-Werkzeug. Wer DottedGlobe.tsx ändert, muss
// hier nachziehen — darum stehen die Namen genau wie dort.
//
//   node scripts/globe-to-svg.mjs > public/media/globe.svg

import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/land-mask.ts", "utf8");

// ————— Landmaske aus der TS-Quelle ziehen —————
// PACKED steht dort als mehrzeiliges Template-Literal; Zeilenumbrüche und
// Einrückung gehören nicht zum Base64 und müssen vorher raus.
const packed = /const PACKED = `([\s\S]*?)`/.exec(src);
if (!packed) throw new Error("PACKED nicht gefunden");
const MASK = Buffer.from(packed[1].replace(/\s+/g, ""), "base64");
const ROWS = 180;
const COLS = 360;

const polygon = (name) => {
  const block = new RegExp(`const ${name}[^=]*=\\s*\\[([\\s\\S]*?)\\];`).exec(src);
  if (!block) throw new Error(`${name} nicht gefunden`);
  return [...block[1].matchAll(/\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\]/g)].map((m) => [
    Number(m[1]),
    Number(m[2]),
  ]);
};
const EUROPE = polygon("EUROPE");
const GERMANY = polygon("GERMANY");

// Beide Funktionen sind Zeile für Zeile aus land-mask.ts übernommen. Die
// Stützpunkte stehen dort als [lon, lat] — wer das dreht, bekommt eine
// plausibel aussehende, aber falsche Karte.
function isLand(lat, lon) {
  const column = ((Math.floor(lon + 180) % COLS) + COLS) % COLS;
  const row = Math.min(ROWS - 1, Math.max(0, Math.floor(90 - lat)));
  const index = row * COLS + column;
  return (MASK[index >> 3] & (128 >> (index & 7))) !== 0;
}

function inside(lat, lon, outline) {
  let hit = false;
  for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
    const [xi, yi] = outline[i];
    const [xj, yj] = outline[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      hit = !hit;
    }
  }
  return hit;
}

function terrainAt(lat, lon) {
  if (!isLand(lat, lon)) return 0;
  if (inside(lat, lon, GERMANY)) return 3;
  if (inside(lat, lon, EUROPE)) return 2;
  return 1;
}

// ————— Kugel —————
const DOTS = 3000;
const TILT = 0.35;
const STILL_LON = 12;
const SIZE = 500;

const LAYERS = [
  { rgb: "169, 203, 216", radius: [0.9, 1.3], alpha: [0.35, 0.66] },
  { rgb: "99, 164, 188", radius: [1.8, 2.7], alpha: [0.75, 1] },
  { rgb: "47, 109, 136", radius: [1.9, 2.85], alpha: [0.82, 1] },
  { rgb: "47, 109, 136", radius: [2.2, 3.2], alpha: [0.9, 1] },
];

const markers = [
  [48.5, 9.1, 1.5], [52.5, 13.4, 0.8], [51.5, -0.1, 0.85], [40.7, -74.0, 1],
  [37.8, -122.4, 0.95], [-23.5, -46.6, 0.75], [35.7, 139.7, 0.9], [28.6, 77.2, 0.85],
  [-33.9, 151.2, 0.7], [-1.3, 36.8, 0.7], [55.8, 37.6, 0.7], [1.35, 103.8, 0.65],
];

const cx = SIZE / 2;
const cy = SIZE / 2;
const R = (SIZE / 2) * 0.94;
const unit = Math.max(0.8, SIZE / 500);
const angle = (-STILL_LON * Math.PI) / 180;
const sin = Math.sin(angle);
const cos = Math.cos(angle);
const tiltSin = Math.sin(TILT);
const tiltCos = Math.cos(TILT);

const project = (v) => {
  const spun = -v.x * sin + v.z * cos;
  return {
    x: cx + (v.x * cos + v.z * sin) * R,
    y: cy - (v.y * tiltCos - spun * tiltSin) * R,
    z: v.y * tiltSin + spun * tiltCos,
  };
};

const toVector = (lat, lon) => {
  const p = (lat * Math.PI) / 180;
  const t = (lon * Math.PI) / 180;
  return { x: Math.cos(p) * Math.sin(t), y: Math.sin(p), z: Math.cos(p) * Math.cos(t) };
};

const out = [];
out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">`);
out.push(`<circle cx="${cx}" cy="${cy}" r="${R.toFixed(1)}" fill="none" stroke="rgba(47,109,136,0.14)" stroke-width="1"/>`);

const golden = Math.PI * (3 - Math.sqrt(5));
const dots = [];
for (let i = 0; i < DOTS; i++) {
  const y = 1 - (i / (DOTS - 1)) * 2;
  const ring = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = golden * i;
  const v = { x: Math.cos(theta) * ring, y, z: Math.sin(theta) * ring };
  const kind = terrainAt((Math.asin(y) * 180) / Math.PI, (Math.atan2(v.x, v.z) * 180) / Math.PI);
  const p = project(v);
  if (p.z <= 0) continue; // Rückseite bleibt weg
  const depth = p.z; // 0 am Rand, 1 in der Mitte
  const L = LAYERS[kind];
  const r = (L.radius[0] + (L.radius[1] - L.radius[0]) * depth) * unit;
  const a = L.alpha[0] + (L.alpha[1] - L.alpha[0]) * depth;
  dots.push({ x: p.x, y: p.y, r, a, rgb: L.rgb, z: p.z });
}
// Hintere Punkte zuerst, damit die vorderen oben liegen.
dots.sort((a, b) => a.z - b.z);
for (const d of dots) {
  out.push(`<circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${d.r.toFixed(2)}" fill="rgba(${d.rgb},${d.a.toFixed(2)})"/>`);
}

// Blüten an den Standorten: fünf Blätter um eine helle Mitte.
for (const [lat, lon, size] of markers) {
  const p = project(toVector(lat, lon));
  if (p.z <= 0) continue;
  const r = 5.4 * size * unit;
  const alpha = (0.45 + 0.55 * p.z).toFixed(2);
  const petals = [];
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    petals.push(
      `<circle cx="${(p.x + Math.cos(a) * r * 0.62).toFixed(1)}" cy="${(p.y + Math.sin(a) * r * 0.62).toFixed(1)}" r="${(r * 0.55).toFixed(2)}" fill="rgba(26,22,19,${alpha})"/>`,
    );
  }
  out.push(`<g>${petals.join("")}<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(r * 0.26).toFixed(2)}" fill="#f9f8f5"/></g>`);
}

out.push("</svg>");
process.stdout.write(out.join("\n"));
