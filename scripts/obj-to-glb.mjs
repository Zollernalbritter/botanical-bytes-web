// Wandelt den 3D-Export der Platine aus EasyEDA (OBJ + MTL) in eine GLB-Datei
// für den Browser.
//
//   node scripts/obj-to-glb.mjs <eingabe.obj> <ausgabe.glb> [mm-pro-einheit]
//                               [traeger-material] [lack-farbe] [textur.png]
//
// Warum ein eigenes Skript und kein fertiges Werkzeug: der Export kommt weit
// vom Ursprung (X um 4000), steht auf der falschen Achse und trägt seine Maße
// in EasyEDA-Einheiten. Alles drei muss vor dem Packen geradegezogen werden,
// sonst steht das Modell in der Ansicht neben dem Bild, liegt auf der Seite
// oder ist tausendfach zu groß. Ein Wandler von der Stange macht davon nichts.
//
// Drei Umrechnungen passieren hier:
//   1. Verschieben — Mitte der Platine auf X/Z null, Unterkante auf Y null.
//   2. Drehen — OBJ hat die Höhe auf Z, glTF erwartet sie auf Y: (x,y,z) → (x,z,−y).
//   3. Skalieren — EasyEDA-Einheiten in Meter, denn glTF rechnet in Metern.
//
// Die Materialien des Exports sind reine Flächenfarben: Leiterbahnen, Pads und
// der Bestückungsdruck („Plant Growth Optimizer v.3.0“) fehlen darin. Wird eine
// Textur mitgegeben — scripts/pcb-texture.mjs baut sie aus dem 2D-Export —, dann
// bekommt allein die Deckfläche der Trägerplatte sie aufgelegt. Ohne das
// Argument arbeitet das Skript wie zuvor.

import { readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [objPath, glbPath, mmPerUnitArg, substrateArg, maskArg, textureArg] = process.argv.slice(2);
if (!objPath || !glbPath) {
  console.error(
    "Aufruf: node scripts/obj-to-glb.mjs <eingabe.obj> <ausgabe.glb> [mm-pro-einheit] [traeger-material] [lack-farbe] [textur.png]",
  );
  process.exit(1);
}
const MM_PER_UNIT = Number(mmPerUnitArg ?? 0.16);

// EasyEDA exportiert den Träger im Farbton des nackten FR4 — blassgelb. Der
// Lötstopplack, der die Platine in Wirklichkeit violett macht, steht im OBJ
// nicht. Diese beiden Werte tragen ihn nach; der Vorgabewert ist aus dem
// Rendering der fertigen Platine abgegriffen.
const SUBSTRATE = substrateArg ?? "mtl1";
const MASK_COLOR = maskArg ?? "#680878";

/**
 * MTL-Farben sind sRGB, glTF rechnet in linearem Licht. Ohne diese Umrechnung
 * kommt alles zu hell und zu flau heraus — besonders die dunklen Bauteile,
 * die dann grau statt schwarz wirken.
 */
function toLinear(c) {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function hexToLinear(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => toLinear(v / 255));
}

const src = readFileSync(objPath, "utf8");

// ————— MTL lesen —————
const mtlName = /^mtllib\s+(.+)$/m.exec(src)?.[1]?.trim();
const materials = new Map();
if (mtlName) {
  const mtlText = readFileSync(resolve(dirname(objPath), mtlName), "utf8");
  let current = null;
  for (const line of mtlText.split(/\r?\n/)) {
    const [key, ...rest] = line.trim().split(/\s+/);
    if (key === "newmtl") {
      current = rest.join(" ");
      materials.set(current, { kd: [0.8, 0.8, 0.8], ks: [0, 0, 0] });
    } else if (current && (key === "Kd" || key === "Ks")) {
      materials.get(current)[key.toLowerCase()] = rest.slice(0, 3).map(Number);
    }
  }
}

// ————— OBJ lesen —————
const positions = [];
const normals = [];
/** Je Material ein eigener Zeichenaufruf; der Schlüssel ist der Materialname. */
const groups = new Map();
let active = "__standard";

function group() {
  let g = groups.get(active);
  if (!g) {
    // mtl merkt sich, aus welchem MTL-Eintrag die Farbe kommt. Der Schlüssel der
    // Gruppe darf davon abweichen, sobald eine Gruppe aufgeteilt wird.
    g = { mtl: active, pos: [], nor: [], idx: [], seen: new Map() };
    groups.set(active, g);
  }
  return g;
}

/** Ein Eckpunkt ist erst durch Ort UND Normale bestimmt: dieselbe Ecke an
 *  zwei Flächen mit verschiedenen Normalen sind in glTF zwei Eckpunkte. */
function pushVertex(g, vi, ni) {
  const key = `${vi}/${ni}`;
  const hit = g.seen.get(key);
  if (hit !== undefined) return hit;

  const p = positions[vi];
  const n = ni >= 0 ? normals[ni] : [0, 1, 0];
  const at = g.pos.length / 3;
  g.pos.push(p[0], p[1], p[2]);
  g.nor.push(n[0], n[1], n[2]);
  g.seen.set(key, at);
  return at;
}

for (const raw of src.split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line[0] === "#") continue;
  const sp = line.indexOf(" ");
  const key = sp < 0 ? line : line.slice(0, sp);
  const rest = sp < 0 ? "" : line.slice(sp + 1);

  if (key === "v") {
    const [x, y, z] = rest.split(/\s+/).map(Number);
    positions.push([x, y, z]);
  } else if (key === "vn") {
    // Die Normalen im Export sind nicht auf Länge eins gebracht — glTF verlangt das.
    const [x, y, z] = rest.split(/\s+/).map(Number);
    const len = Math.hypot(x, y, z) || 1;
    normals.push([x / len, y / len, z / len]);
  } else if (key === "usemtl") {
    active = rest.trim();
  } else if (key === "f") {
    const parts = rest.split(/\s+/).map((tok) => {
      const [v, , n] = tok.split("/");
      return [Number(v) - 1, n ? Number(n) - 1 : -1];
    });
    const g = group();
    // Fächer-Zerlegung, falls doch einmal ein Viereck kommt.
    for (let i = 1; i < parts.length - 1; i += 1) {
      g.idx.push(
        pushVertex(g, parts[0][0], parts[0][1]),
        pushVertex(g, parts[i][0], parts[i][1]),
        pushVertex(g, parts[i + 1][0], parts[i + 1][1]),
      );
    }
  }
}

// ————— Verschieben, drehen, skalieren —————
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
for (const [x, y, z] of positions) {
  if (x < minX) minX = x; if (x > maxX) maxX = x;
  if (y < minY) minY = y; if (y > maxY) maxY = y;
  if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
}
const cx = (minX + maxX) / 2;
const cy = (minY + maxY) / 2;
const scale = MM_PER_UNIT / 1000; // Einheiten → Meter

for (const g of groups.values()) {
  for (let i = 0; i < g.pos.length; i += 3) {
    const x = (g.pos[i] - cx) * scale;
    const y = (g.pos[i + 1] - cy) * scale;
    const z = (g.pos[i + 2] - minZ) * scale;
    g.pos[i] = x;
    g.pos[i + 1] = z;   // Höhe wandert auf Y
    g.pos[i + 2] = -y;
    const nx = g.nor[i], ny = g.nor[i + 1], nz = g.nor[i + 2];
    g.nor[i] = nx;
    g.nor[i + 1] = nz;
    g.nor[i + 2] = -ny;
  }
}

// ————— Deckfläche der Trägerplatte heraustrennen —————
// Nur sie darf die Textur tragen; Kanten und Unterseite bleiben einfarbiger Lack.
// Das Vorzeichen der Normale taugt nicht zur Erkennung: EasyEDA exportiert die
// obenliegenden Flächen mit nach unten gedrehter Normale. Verlässlich ist die
// Höhe — die Deckfläche ist die einzige Fläche der Platte, deren Ecken alle auf
// der Oberkante liegen. Die Normale prüfen wir nur noch darauf, dass sie
// überhaupt senkrecht steht.
const TOP_SUFFIX = " (Deckfläche)";

function splitSubstrateTop(g) {
  let yTop = -Infinity;
  for (let i = 1; i < g.pos.length; i += 3) if (g.pos[i] > yTop) yTop = g.pos[i];
  const eps = 1e-6; // eine Tausendstel Plattendicke, in Metern

  const make = () => ({ mtl: g.mtl, pos: [], nor: [], idx: [], seen: new Map() });
  const top = make();
  const rest = make();

  const take = (ziel, k) => {
    const hit = ziel.seen.get(k);
    if (hit !== undefined) return hit;
    const at = ziel.pos.length / 3;
    ziel.pos.push(g.pos[k * 3], g.pos[k * 3 + 1], g.pos[k * 3 + 2]);
    ziel.nor.push(g.nor[k * 3], g.nor[k * 3 + 1], g.nor[k * 3 + 2]);
    ziel.seen.set(k, at);
    return at;
  };

  for (let f = 0; f < g.idx.length; f += 3) {
    const ecken = [g.idx[f], g.idx[f + 1], g.idx[f + 2]];
    const oben =
      ecken.every((k) => yTop - g.pos[k * 3 + 1] < eps) &&
      ecken.every((k) => Math.abs(g.nor[k * 3 + 1]) > 0.9);
    const ziel = oben ? top : rest;
    for (const k of ecken) ziel.idx.push(take(ziel, k));
  }

  return { top, rest };
}

if (textureArg) {
  const substrate = groups.get(SUBSTRATE);
  if (!substrate) {
    console.error(`Material „${SUBSTRATE}“ steckt nicht im OBJ — keine Fläche für die Textur.`);
    process.exit(1);
  }
  const { top, rest } = splitSubstrateTop(substrate);
  if (!top.idx.length) {
    console.error(`Keine waagerechte Deckfläche in „${SUBSTRATE}“ gefunden.`);
    process.exit(1);
  }

  // Planare Projektion von oben. Die Textur ist auf denselben Ausschnitt
  // zugeschnitten wie die Platte, also genügt eine lineare Abbildung der
  // Grundfläche auf das Einheitsquadrat.
  //
  // Zur V-Richtung: in glTF wächst Z nach hinten, im 2D-Export wächst Y nach
  // unten — und beides zeigt auf dieselbe Kante der Platine. V darf deshalb
  // ungespiegelt mitlaufen, sonst stünde der Bestückungsdruck seitenverkehrt.
  let xMin = Infinity, xMax = -Infinity, zMin = Infinity, zMax = -Infinity;
  for (let i = 0; i < top.pos.length; i += 3) {
    if (top.pos[i] < xMin) xMin = top.pos[i];
    if (top.pos[i] > xMax) xMax = top.pos[i];
    if (top.pos[i + 2] < zMin) zMin = top.pos[i + 2];
    if (top.pos[i + 2] > zMax) zMax = top.pos[i + 2];
  }
  top.uv = [];
  for (let i = 0; i < top.pos.length; i += 3) {
    top.uv.push((top.pos[i] - xMin) / (xMax - xMin), (top.pos[i + 2] - zMin) / (zMax - zMin));
  }

  groups.set(SUBSTRATE, rest);
  groups.set(SUBSTRATE + TOP_SUFFIX, top);
}

// ————— glTF zusammensetzen —————
const bin = [];
let offset = 0;
const bufferViews = [];
const accessors = [];

function addView(typedArray, target) {
  const bytes = Buffer.from(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
  const pad = (4 - (offset % 4)) % 4;
  if (pad) { bin.push(Buffer.alloc(pad)); offset += pad; }
  bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: bytes.length, target });
  bin.push(bytes);
  offset += bytes.length;
  return bufferViews.length - 1;
}

function addAccessor(view, componentType, count, type, minMax) {
  accessors.push({ bufferView: view, componentType, count, type, ...minMax });
  return accessors.length - 1;
}

const gltfMaterials = [];
const materialIndex = new Map();
const meshPrimitives = [];

// Das PNG wandert unverändert als eigener bufferView ins GLB — ein zweites
// Beiwerk neben der .glb würde beim Ausliefern nur verlorengehen.
const images = [];
const samplers = [];
const textures = [];
if (textureArg) {
  const png = readFileSync(textureArg);
  images.push({ bufferView: addView(png), mimeType: "image/png", name: "pcb-top" });
  samplers.push({ magFilter: 9729, minFilter: 9987, wrapS: 33071, wrapT: 33071 });
  textures.push({ source: 0, sampler: 0 });
}

for (const [name, g] of groups) {
  if (!g.idx.length) continue;

  const pos = new Float32Array(g.pos);
  const nor = new Float32Array(g.nor);
  const idx = new Uint32Array(g.idx);

  let pMin = [Infinity, Infinity, Infinity], pMax = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < pos.length; i += 3) {
    for (let k = 0; k < 3; k += 1) {
      if (pos[i + k] < pMin[k]) pMin[k] = pos[i + k];
      if (pos[i + k] > pMax[k]) pMax[k] = pos[i + k];
    }
  }

  const aPos = addAccessor(addView(pos, 34962), 5126, pos.length / 3, "VEC3", { min: pMin, max: pMax });
  const aNor = addAccessor(addView(nor, 34962), 5126, nor.length / 3, "VEC3", {});
  const aIdx = addAccessor(addView(idx, 34963), 5125, idx.length, "SCALAR", {});

  if (!materialIndex.has(name)) {
    const m = materials.get(g.mtl) ?? { kd: [0.8, 0.8, 0.8], ks: [0, 0, 0] };
    // Aus Ks wird der Metallgrad geschätzt: EasyEDA setzt bei Kupfer, Zinn und
    // Blech hohe Glanzwerte, bei Kunststoff und Lötstopplack niedrige.
    const shine = (m.ks[0] + m.ks[1] + m.ks[2]) / 3;
    const isSubstrate = g.mtl === SUBSTRATE;
    const pbr = {
      baseColorFactor: [
        ...(isSubstrate ? hexToLinear(MASK_COLOR) : m.kd.map(toLinear)),
        1,
      ],
      metallicFactor: isSubstrate ? 0 : shine > 0.55 ? 1 : shine > 0.2 ? 0.45 : 0,
      // Lötstopplack ist matt, aber nicht stumpf — er hat einen leichten Seidenglanz.
      roughnessFactor: isSubstrate ? 0.62 : Math.max(0.12, 1 - shine),
    };
    if (g.uv) {
      // Die Textur bringt den Lack schon mit, der Faktor darf sie also nicht
      // noch einmal einfärben.
      pbr.baseColorTexture = { index: 0 };
      pbr.baseColorFactor = [1, 1, 1, 1];
    }
    gltfMaterials.push({
      name: isSubstrate && !g.uv ? `${name} (Lötstopplack)` : name,
      pbrMetallicRoughness: pbr,
      doubleSided: true,
    });
    materialIndex.set(name, gltfMaterials.length - 1);
  }

  const attributes = { POSITION: aPos, NORMAL: aNor };
  if (g.uv) {
    const uv = new Float32Array(g.uv);
    attributes.TEXCOORD_0 = addAccessor(addView(uv, 34962), 5126, uv.length / 2, "VEC2", {});
  }

  meshPrimitives.push({
    attributes,
    indices: aIdx,
    material: materialIndex.get(name),
  });
}

const binBuffer = Buffer.concat(bin);
const gltf = {
  asset: { version: "2.0", generator: "botanical-bytes obj-to-glb" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: "Data Collector v3.0" }],
  meshes: [{ name: "pcb", primitives: meshPrimitives }],
  materials: gltfMaterials,
  ...(textures.length ? { images, samplers, textures } : {}),
  buffers: [{ byteLength: binBuffer.length }],
  bufferViews,
  accessors,
};

const jsonBuffer = Buffer.from(JSON.stringify(gltf), "utf8");
const jsonPad = (4 - (jsonBuffer.length % 4)) % 4;
const binPad = (4 - (binBuffer.length % 4)) % 4;
const jsonChunk = Buffer.concat([jsonBuffer, Buffer.alloc(jsonPad, 0x20)]);
const binChunk = Buffer.concat([binBuffer, Buffer.alloc(binPad, 0)]);

const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0); // "glTF"
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jsonChunk.length + 8 + binChunk.length, 8);

const jsonHeader = Buffer.alloc(8);
jsonHeader.writeUInt32LE(jsonChunk.length, 0);
jsonHeader.writeUInt32LE(0x4e4f534a, 4); // "JSON"

const binHeader = Buffer.alloc(8);
binHeader.writeUInt32LE(binChunk.length, 0);
binHeader.writeUInt32LE(0x004e4942, 4); // "BIN"

writeFileSync(glbPath, Buffer.concat([header, jsonHeader, jsonChunk, binHeader, binChunk]));

const mmX = (maxX - minX) * MM_PER_UNIT;
const mmY = (maxY - minY) * MM_PER_UNIT;
const mmZ = (maxZ - minZ) * MM_PER_UNIT;
console.log(
  `${glbPath}\n` +
    `  Materialien: ${gltfMaterials.length}, Zeichenaufrufe: ${meshPrimitives.length}\n` +
    `  Dreiecke:    ${meshPrimitives.reduce((n, p) => n + accessors[p.indices].count / 3, 0)}\n` +
    `  Maße:        ${mmX.toFixed(1)} × ${mmY.toFixed(1)} × ${mmZ.toFixed(1)} mm  (bei ${MM_PER_UNIT} mm je Einheit)\n` +
    `  Textur:      ${textureArg ?? "keine"}\n` +
    `  Dateigröße:  ${(statSync(glbPath).size / 1024 / 1024).toFixed(2)} MB`,
);
