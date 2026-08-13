// Setzt die drei Verarbeitungsstufen des Kressesamen-Fotos zu EINEM Bild
// zusammen: linkes Drittel Original, mittleres Canny, rechtes Sobel. An
// denselben Samen nebeneinander ist der Unterschied ablesbar, ohne dass der
// Betrachter zwischen Bildern wechseln muss.
//
// Die drei Quellen sind nicht deckungsgleich: die Kantenbilder stammen aus dem
// matplotlib-Export des Notebooks und zeigen bei gleicher Hoehe gut zwei
// Prozent mehr Bildbreite als das Foto. Einfach auf ein Mass gezogen saessen
// die Samen um bis zu zwanzig Pixel versetzt — ausgerechnet an den Kanten, wo
// verglichen wird. Darum richtet das Skript jede Quelle ueber ihr waagerechtes
// Kantenprofil am Foto aus, statt sie nur gleich gross zu machen.
//
// Beschriftungen kommen bewusst nicht ins Bild: die Seite legt sie als echten
// Text darueber, eingebrannt waeren sie weder uebersetzbar noch vorlesbar.
//
// Aufruf aus dem Projektwurzelverzeichnis: node scripts/seed-stages.mjs
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "src/assets/img";
const OUT_DIR = "public/media";

// Reihenfolge = Reihenfolge der Zonen von links nach rechts. Das Foto steht
// vorne, weil es zugleich die geometrische Referenz fuer die anderen beiden ist.
const STAGES = [
  ["seed-original.png", "Original"],
  ["seed-canny.png", "Canny"],
  ["seed-sobel.png", "Sobel"],
];

// Trennlinien braucht es nicht mehr: die drei Zonen werden getrennt
// ausgegeben und die Seite setzt sie als eigene Kacheln mit Abstand.
const MAX_EDGE = 1800; // Das Bild ist ein breiter Streifen, die Breite ist die lange Kante.

// Ab hier waere ein senkrechter Versatz an der Schnittkante zu sehen; darunter
// liegt er unter dem, was die Zeilenprofile ueberhaupt aufloesen.
const VERTICAL_TOLERANCE = 0.02;

// Korrelation, unter der die Registrierung als geraten gilt.
const MIN_QUALITY = 0.5;

// ------------------------------------------------------- Registrierung

// Analysegroesse fuer die Kantenprofile. Quadratisch und fuer alle Quellen
// gleich, damit beide Achsen unabhaengig von den Originalmassen in [0,1] liegen.
const N = 512;

// Kantenprofile statt Helligkeitsprofile: Foto (helle Watte), Canny (schwarz)
// und Sobel (grau) haben voellig verschiedene Tonwerte, aber ihre Kanten sitzen
// an denselben Stellen — nur darauf laesst sich vergleichen.
async function profiles(file) {
  const { data } = await sharp(file)
    .removeAlpha()
    .greyscale()
    .resize(N, N, { fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const columns = new Float64Array(N);
  const rows = new Float64Array(N);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const v = data[y * N + x];
      if (x + 1 < N) columns[x] += Math.abs(data[y * N + x + 1] - v);
      if (y + 1 < N) rows[y] += Math.abs(data[(y + 1) * N + x] - v);
    }
  }
  return { columns, rows };
}

// Pearson-Korrelation von ref mit dem um (scale, shift) umgerechneten src;
// scale/shift bilden Referenzkoordinate -> Quellkoordinate ab, beide in [0,1].
// Mittelwert und Streuung werden ueber genau den ueberlappenden Bereich
// gebildet: sonst gewinnt der Versatz, der die schlecht passenden Raender
// wegschneidet, statt des Versatzes, der die Samen trifft.
function correlate(ref, src, scale, shift) {
  let n = 0;
  let sa = 0;
  let sb = 0;
  let saa = 0;
  let sbb = 0;
  let sab = 0;
  for (let i = 0; i < N; i++) {
    const p = (i / N) * scale + shift;
    if (p < 0 || p >= 1) continue;
    const t = p * N;
    const j = Math.min(N - 2, Math.floor(t));
    const f = t - j;
    const b = src[j] * (1 - f) + src[j + 1] * f;
    const a = ref[i];
    n++;
    sa += a;
    sb += b;
    saa += a * a;
    sbb += b * b;
    sab += a * b;
  }
  if (n < N * 0.8) return -1; // zu wenig Ueberlappung, um vergleichbar zu sein
  const cov = sab / n - (sa / n) * (sb / n);
  const va = saa / n - (sa / n) ** 2;
  const vb = sbb / n - (sb / n) ** 2;
  return va > 0 && vb > 0 ? cov / Math.sqrt(va * vb) : -1;
}

const SCALE_RANGE = 0.1; // Suchfenster: +-10 % Massstab, +-8 % Versatz
const SHIFT_RANGE = 0.08;
const STEP = 0.001; // 0,1 % Bildkante, beim Foto also gut anderthalb Pixel

function fit(ref, src) {
  let best = { scale: 1, shift: 0, quality: -2 };
  for (let scale = 1 - SCALE_RANGE; scale <= 1 + SCALE_RANGE + 1e-9; scale += STEP) {
    for (let shift = -SHIFT_RANGE; shift <= SHIFT_RANGE + 1e-9; shift += STEP) {
      const quality = correlate(ref, src, scale, shift);
      if (quality > best.quality) best = { scale, shift, quality };
    }
  }
  return best;
}

// Waagerechter Ausschnitt in Quellpixeln. Er darf ueber den Rand hinausragen —
// der Ueberhang wird mit wiederholten Randpixeln aufgefuellt. Ihn stattdessen
// zurechtzustutzen waere schlimmer als das Problem: das Fenster wuerde schmaler
// und mit ihm der Massstab, und dann sitzt jeder Samen falsch.
function windowOf(scale, shift, size) {
  return { start: Math.round(shift * size), length: Math.max(1, Math.round(scale * size)) };
}

// --------------------------------------------------------------- Aufbau

const reference = await profiles(path.join(SRC, STAGES[0][0]));
const refMeta = await sharp(path.join(SRC, STAGES[0][0])).metadata();

// Breite durch drei teilbar, damit die Schnitte exakt auf den Dritteln sitzen,
// und nie ueber die Aufloesung des Fotos hinaus — die Kantenbilder muessen
// ohnehin hochskaliert werden, das Foto soll es nicht auch noch.
const width = Math.floor(Math.min(MAX_EDGE, refMeta.width) / 3) * 3;
const height = Math.round((width * refMeta.height) / refMeta.width);

/**
 * Alle drei Kacheln zeigen DENSELBEN Ausschnitt. Vorher bekam jede Stufe ihr
 * eigenes Drittel des Fotos — nebeneinander verglich man dadurch nicht die
 * Verfahren, sondern drei verschiedene Stellen der Schale. Der Unterschied
 * zwischen Canny und Sobel ist aber nur an denselben Samen zu sehen.
 *
 * Der Ausschnitt liegt auf der linken Schale und fasst vier Nester, zwei oben
 * und zwei unten. Die Werte beziehen sich auf das Referenzbild in seiner
 * ausgerichteten Größe, deshalb als Anteil und nicht in Pixeln — so bleiben sie
 * gültig, wenn MAX_EDGE sich ändert.
 */
const CROP = { x: 0.037, y: 0.1, w: 0.294, h: 0.795 };
const crop = {
  left: Math.round(CROP.x * width),
  top: Math.round(CROP.y * height),
  width: Math.round(CROP.w * width),
  height: Math.round(CROP.h * height),
};

const percent = (v) => `${v >= 0 ? "+" : ""}${(v * 100).toFixed(1)} %`;
const zones = [];

for (const [index, [file, label]] of STAGES.entries()) {
  const src = path.join(SRC, file);
  const meta = await sharp(src).metadata();
  const p = await profiles(src);
  const x = fit(reference.columns, p.columns);
  const y = fit(reference.rows, p.rows);

  // Korrigiert wird nur waagerecht. Dort sitzt die Abweichung, dort schneiden
  // wir, und dort ist der Ausschlag scharf: die sechs Samengruppen stehen in
  // sechs Spalten. Senkrecht gibt es nur zwei Samenreihen, an denen sich ein
  // Profil festhalten koennte — das Optimum ist entsprechend flach und liegt
  // beim Sobel-Bild sogar am Rand des Suchfensters. Die Reihen sitzen ohnehin
  // schon auf denselben Hoehen; eine Korrektur von unter einem Prozent waere
  // hier geraten. Der Wert wird darum nur gemessen und gemeldet.
  const drift = Math.abs(y.scale - 1) + Math.abs(y.shift);
  if (index > 0 && drift > VERTICAL_TOLERANCE) {
    console.warn(`  ! ${file}: senkrecht um ${percent(drift)} verschoben, das korrigiert dieses Skript nicht`);
  }
  // Eine schlechte Korrelation heisst: das Profil hat nichts Gemeinsames
  // gefunden und die Zahlen sind geraten. Dann lieber laut sein, als die Samen
  // still verrutschen zu lassen.
  if (x.quality < MIN_QUALITY) {
    console.warn(`  ! ${file}: waagerechte Registrierung unsicher (${x.quality.toFixed(2)})`);
  }

  const h = windowOf(x.scale, x.shift, meta.width);
  const pad = { left: Math.max(0, -h.start), right: Math.max(0, h.start + h.length - meta.width) };

  // Eigener Durchgang, denn sharp fuehrt extend erst nach extract aus, egal in
  // welcher Reihenfolge man beides aufruft. "copy" wiederholt die Randpixel: es
  // geht um wenige Pixel ganz aussen, und ein einfarbiger Rand faellt dort mehr
  // auf als ein verschmierter.
  const padded = await sharp(src)
    .removeAlpha()
    .toColorspace("srgb")
    .extend({ ...pad, top: 0, bottom: 0, extendWith: "copy" })
    .png()
    .toBuffer();

  // fit: "fill" ist hier richtig und nicht etwa nachlaessig: waagerecht und
  // senkrecht wird verschieden stark skaliert, weil die Kantenbilder bei
  // gleicher Hoehe mehr Breite zeigen. Genau das gleicht der Schritt aus.
  const aligned = await sharp(padded)
    .extract({ left: h.start + pad.left, top: 0, width: h.length, height: meta.height })
    .resize(width, height, { fit: "fill" })
    .png()
    .toBuffer();

  zones.push({
    file,
    label,
    // Jede Stufe zeigt ihr eigenes Drittel des Fotos — die Zone, in der sie
    // auf der Seite steht. Zusammengelegt ergaeben die drei wieder das ganze
    // Bild; getrennt bekommt jede ihre eigene Rundung.
    data: await sharp(aligned).extract(crop).toBuffer(),
  });

  const congruent = meta.width === refMeta.width && meta.height === refMeta.height;
  console.log(
    `${label.padEnd(8)} ${file.padEnd(20)} ${meta.width}x${meta.height}` +
      (index === 0
        ? "  (Referenz)"
        : `  ${congruent ? "deckungsgleich" : "abweichende Masse"}` +
          `, Ausschnitt waagerecht ${percent(x.scale - 1)} Breite / ${percent(x.shift)} Versatz` +
          ` (q ${x.quality.toFixed(2)}), senkrecht ${percent(drift)} Restversatz`),
  );
}

// Drei Dateien statt einer Montage. Zusammengeschoben brauchte es Trennlinien,
// damit der Wechsel nicht wie ein Bildfehler aussieht; als getrennte Kacheln
// mit eigener Rundung uebernimmt der Abstand diese Arbeit — und jede Stufe
// kann fuer sich beschriftet und angeklickt werden.
await mkdir(OUT_DIR, { recursive: true });
for (const z of zones) {
  const target = path.join(OUT_DIR, path.basename(z.file, ".png") + ".jpg");
  await sharp(z.data).jpeg({ quality: 82, mozjpeg: true }).toFile(target);
  const { size } = await stat(target);
  console.log(`${target}: ${crop.width}x${crop.height}, ${(size / 1024).toFixed(0)} kB  (${z.label})`);
}
