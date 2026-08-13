// Zieht den Schaltplan aus dem jsPDF-Export in ein themebares SVG.
// jsPDF legt den Content-Stream unkomprimiert und ohne /Filter ab, deshalb
// reicht ein eigener Mini-Interpreter — kein pdf.js, keine neue Abhängigkeit.
// Aufruf aus dem Projektwurzelverzeichnis: node scripts/extract-schematic.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const SRC = "public/downloads/schematic.pdf";
const OUT = "public/media/schematic.svg";
const TITLE = "Schaltplan der Sensorplatine (ESP32-S3)";

// Die beiden XObjects sind Fremdlogo und Titelbild — für den Plan belanglos.
const SKIP_XOBJECTS = true;

// ---------------------------------------------------------------- PDF lesen

// latin1, damit jedes Byte als ein Zeichen erhalten bleibt: die Strings im
// Stream sind Bytefolgen, keine Unicode-Zeichen.
const pdf = readFileSync(SRC, "latin1");

function findObject(num) {
  const start = pdf.search(new RegExp(`(^|[^0-9])${num}\\s+0\\s+obj`, "m"));
  if (start < 0) throw new Error(`Objekt ${num} nicht gefunden`);
  return pdf.slice(start, pdf.indexOf("endobj", start));
}

function contentStream() {
  const page = pdf.slice(pdf.indexOf("/Type /Page"));
  const num = /\/Contents\s+(\d+)\s+0\s+R/.exec(page)?.[1];
  if (!num) throw new Error("Kein /Contents am Seitenobjekt");
  const obj = findObject(num);
  if (/\/Filter/.test(obj.slice(0, obj.indexOf("stream")))) {
    throw new Error("Content-Stream ist komprimiert — dieses Skript kann nur Klartext");
  }
  const from = obj.indexOf("stream") + "stream".length;
  return obj.slice(from, obj.lastIndexOf("endstream")).replace(/^\r?\n/, "");
}

function mediaBox() {
  const m = /\/MediaBox\s*\[\s*([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)/.exec(pdf);
  if (!m) throw new Error("Keine /MediaBox");
  return m.slice(1).map(Number);
}

// Schriften aus dem Ressourcen-Dictionary auflösen, statt /F1../F4 zu raten:
// nur so wissen wir, welche Schrift Zwei-Byte-Codes (Type0/CID) benutzt.
const FAMILIES = {
  Verdana: "Verdana, 'DejaVu Sans', sans-serif",
  Arial: "Arial, Helvetica, sans-serif",
  "Times-Roman": "'Times New Roman', Times, serif",
  simhei: "'Segoe UI Symbol', 'Noto Sans Symbols 2', sans-serif",
};

function fonts() {
  const dict = /\/Font\s*<<([\s\S]*?)>>/.exec(pdf)?.[1] ?? "";
  const out = {};
  for (const [, name, num] of dict.matchAll(/\/(\w+)\s+(\d+)\s+0\s+R/g)) {
    const obj = findObject(num);
    const base = /\/BaseFont\s*\/([\w+\-]+)/.exec(obj)?.[1] ?? "Helvetica";
    out[name] = {
      family: FAMILIES[base] ?? "sans-serif",
      // Type0 kodiert je Glyphe zwei Bytes; hier UniGB-UCS2-H, also UTF-16BE.
      twoByte: /\/Subtype\s*\/Type0/.test(obj),
    };
  }
  return out;
}

// ------------------------------------------------------------ Tokenisierung

// WinAnsi weicht nur im Bereich 0x80–0x9F von Latin-1 ab.
const WINANSI_HIGH =
  "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž�" +
  "�‘’“”•–—˜™š›œ�žŸ";

const DELIM = " \t\r\n\f\0()<>[]{}/%";

function readLiteralString(src, i) {
  let depth = 0;
  let out = "";
  for (let j = i; j < src.length; j++) {
    const ch = src[j];
    if (ch === "\\") {
      const oct = /^[0-7]{1,3}/.exec(src.slice(j + 1, j + 4));
      if (oct) {
        out += String.fromCharCode(parseInt(oct[0], 8) & 0xff);
        j += oct[0].length;
        continue;
      }
      const next = src[++j];
      if (next === "\n" || next === "\r") continue; // Zeilenfortsetzung
      out += { n: "\n", r: "\r", t: "\t", b: "\b", f: "\f" }[next] ?? next;
      continue;
    }
    if (ch === "(") {
      depth++;
      if (depth === 1) continue;
    }
    if (ch === ")") {
      depth--;
      if (depth === 0) return [out, j + 1];
    }
    out += ch;
  }
  throw new Error("Unbeendeter String im Content-Stream");
}

function tokenize(src) {
  const tokens = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (" \t\r\n\f\0".includes(ch)) {
      i++;
    } else if (ch === "%") {
      while (i < src.length && src[i] !== "\n" && src[i] !== "\r") i++;
    } else if (ch === "/") {
      let j = i + 1;
      while (j < src.length && !DELIM.includes(src[j])) j++;
      tokens.push({ t: "name", v: src.slice(i + 1, j) });
      i = j;
    } else if (ch === "(") {
      const [v, next] = readLiteralString(src, i);
      tokens.push({ t: "str", v });
      i = next;
    } else if (ch === "<" && src[i + 1] !== "<") {
      const end = src.indexOf(">", i);
      const hex = src.slice(i + 1, end).replace(/[^0-9a-fA-F]/g, "");
      let v = "";
      for (let k = 0; k < hex.length; k += 2) v += String.fromCharCode(parseInt(hex.slice(k, k + 2).padEnd(2, "0"), 16));
      tokens.push({ t: "str", v });
      i = end + 1;
    } else if (ch === "[") {
      const end = src.indexOf("]", i);
      tokens.push({ t: "arr", v: (src.slice(i + 1, end).match(/[-+]?[\d.]+/g) ?? []).map(Number) });
      i = end + 1;
    } else if (/[-+.\d]/.test(ch)) {
      const m = /^[-+]?[\d.]+/.exec(src.slice(i));
      tokens.push({ t: "num", v: Number(m[0]) });
      i += m[0].length;
    } else {
      let j = i;
      while (j < src.length && !DELIM.includes(src[j])) j++;
      tokens.push({ t: "op", v: src.slice(i, j === i ? i + 1 : j) });
      i = j === i ? i + 1 : j;
    }
  }
  return tokens;
}

// ------------------------------------------------------------------ Matrizen

// PDF-Konvention: Zeilenvektor mal [a b 0 / c d 0 / e f 1].
const mul = (m, n) => [
  m[0] * n[0] + m[1] * n[2],
  m[0] * n[1] + m[1] * n[3],
  m[2] * n[0] + m[3] * n[2],
  m[2] * n[1] + m[3] * n[3],
  m[4] * n[0] + m[5] * n[2] + n[4],
  m[4] * n[1] + m[5] * n[3] + n[5],
];
const apply = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];

// --------------------------------------------------------------- Farbrollen

// Der Export kennt nur eine Handvoll Quellfarben. Wir sortieren sie in vier
// Rollen und schreiben sie als var(--rolle, originalfarbe): die Seite kann den
// Plan damit umfärben, ohne dass das SVG selbst eine Palette festnagelt.
const ROLE_VAR = {
  frame: "--sch-frame", // Blattrahmen, Randraster, Bauteilumrisse (dunkelrot)
  wire: "--sch-wire", // Leitungen (grün)
  label: "--sch-label", // Netznamen und Werte (blau)
  part: "--sch-part", // Bauteiltext und Blockrahmen (schwarz)
  paper: "--sch-paper", // Blattfläche; auf transparent setzbar
};

function role([r, g, b]) {
  if (r === g && g === b) return r > 0.9 ? "paper" : "part";
  if (r > g && r > b) return "frame";
  if (g > r && g > b) return "wire";
  return "label";
}

const hex = (c) => "#" + c.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
const paint = (c) => `var(${ROLE_VAR[role(c)]}, ${hex(c)})`;

// ------------------------------------------------------------- Interpreter

const CAPS = ["butt", "round", "square"];
const JOINS = ["miter", "round", "bevel"];

// Zwei Nachkommastellen reichen: die Quelle rastert ohnehin auf halbe Punkte.
const num = (n) => String(Math.round(n * 100) / 100);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function decode(bytes, font) {
  if (!font?.twoByte) {
    return [...bytes]
      .map((ch) => {
        const c = ch.charCodeAt(0);
        return c >= 0x80 && c <= 0x9f ? WINANSI_HIGH[c - 0x80] : ch;
      })
      .join("");
  }
  let out = "";
  for (let i = 0; i + 1 < bytes.length; i += 2) {
    out += String.fromCharCode((bytes.charCodeAt(i) << 8) | bytes.charCodeAt(i + 1));
  }
  return out;
}

function interpret(tokens, fontMap) {
  const els = [];
  const stack = [];
  let gs = { ctm: [1, 0, 0, 1, 0, 0], stroke: [0, 0, 0], fill: [0, 0, 0], w: 1, cap: 0, join: 0, dash: [] };
  let ops = [];

  let d = ""; // aufgesammelte Pfaddaten in Nutzerkoordinaten
  let cur = [0, 0];
  let start = [0, 0];

  const text = { on: false, tm: null, tlm: null, font: null, size: 0, runs: [] };

  const moveTo = (x, y) => {
    cur = start = apply(gs.ctm, x, y);
    d += `M${num(cur[0])} ${num(cur[1])}`;
  };
  const lineTo = (x, y) => {
    cur = apply(gs.ctm, x, y);
    d += `L${num(cur[0])} ${num(cur[1])}`;
  };

  function strokeAttrs(a) {
    a.push(`stroke="${paint(gs.stroke)}"`);
    if (gs.w !== 1) a.push(`stroke-width="${num(gs.w)}"`);
    if (gs.cap !== 1) a.push(`stroke-linecap="${CAPS[gs.cap]}"`);
    if (gs.join !== 1) a.push(`stroke-linejoin="${JOINS[gs.join]}"`);
    if (gs.dash.length) a.push(`stroke-dasharray="${gs.dash.map(num).join(" ")}"`);
  }

  function paintPath(op) {
    if (!d) return;
    const filled = /^[fFbB]/.test(op);
    const stroked = /^[SsbB]/.test(op);
    if (/^[sbB]/.test(op) && op !== "S") d += "Z";
    const a = [];
    if (filled) {
      a.push(`fill="${paint(gs.fill)}"`);
      if (op.endsWith("*")) a.push('fill-rule="evenodd"');
    }
    if (stroked) strokeAttrs(a);
    els.push(`<path ${a.join(" ")} d="${d}"/>`);
    d = "";
  }

  function flushText() {
    if (!text.runs.length) return;
    // Textmatrix mal CTM ergibt die Abbildung Textraum -> Seitenraum. Die
    // äußere Gruppe spiegelt die Seite, deshalb muss jedes Textelement mit
    // scale(1,-1) gegenspiegeln — sonst steht die Schrift auf dem Kopf.
    // Ausmultipliziert: matrix(a, b, -c, -d, e, f).
    const [a, b, c, dd, e, f] = mul(text.tm ?? [1, 0, 0, 1, 0, 0], gs.ctm);
    const tf = `matrix(${[a, b, -c, -dd, e, f].map(num).join(" ")})`;
    const first = text.runs[0];
    const attrs = [`transform="${tf}"`, `font-family="${esc(first.family)}"`, `font-size="${num(first.size)}"`];
    const uniform = text.runs.every((r) => r.family === first.family && r.size === first.size && r.color === first.color);
    if (uniform) attrs.push(`fill="${first.color}"`);
    const body = uniform
      ? esc(text.runs.map((r) => r.text).join(""))
      : text.runs
          .map((r) => `<tspan font-family="${esc(r.family)}" font-size="${num(r.size)}" fill="${r.color}">${esc(r.text)}</tspan>`)
          .join("");
    els.push(`<text ${attrs.join(" ")}>${body}</text>`);
    text.runs = [];
  }

  for (const tok of tokens) {
    if (tok.t !== "op") {
      ops.push(tok);
      continue;
    }
    const n = (i) => ops[i]?.v ?? 0;
    switch (tok.v) {
      case "q":
        stack.push({ ...gs });
        break;
      case "Q":
        gs = stack.pop() ?? gs;
        break;
      case "cm":
        gs.ctm = mul(ops.slice(0, 6).map((o) => o.v), gs.ctm);
        break;
      case "w":
        gs.w = n(0);
        break;
      case "J":
        gs.cap = n(0);
        break;
      case "j":
        gs.join = n(0);
        break;
      case "d":
        gs.dash = ops[0]?.v ?? [];
        break;
      case "RG":
        gs.stroke = [n(0), n(1), n(2)];
        break;
      case "rg":
        gs.fill = [n(0), n(1), n(2)];
        break;
      case "G":
        gs.stroke = [n(0), n(0), n(0)];
        break;
      case "g":
        gs.fill = [n(0), n(0), n(0)];
        break;
      case "K":
      case "k": // CMYK kommt im Export nicht vor, wird aber sauber ignoriert
        break;
      case "m":
        moveTo(n(0), n(1));
        break;
      case "l":
        lineTo(n(0), n(1));
        break;
      case "c": {
        const p1 = apply(gs.ctm, n(0), n(1));
        const p2 = apply(gs.ctm, n(2), n(3));
        cur = apply(gs.ctm, n(4), n(5));
        d += `C${num(p1[0])} ${num(p1[1])} ${num(p2[0])} ${num(p2[1])} ${num(cur[0])} ${num(cur[1])}`;
        break;
      }
      case "v": {
        const p2 = apply(gs.ctm, n(0), n(1));
        const p3 = apply(gs.ctm, n(2), n(3));
        d += `C${num(cur[0])} ${num(cur[1])} ${num(p2[0])} ${num(p2[1])} ${num(p3[0])} ${num(p3[1])}`;
        cur = p3;
        break;
      }
      case "y": {
        const p1 = apply(gs.ctm, n(0), n(1));
        const p3 = apply(gs.ctm, n(2), n(3));
        d += `C${num(p1[0])} ${num(p1[1])} ${num(p3[0])} ${num(p3[1])} ${num(p3[0])} ${num(p3[1])}`;
        cur = p3;
        break;
      }
      case "re": {
        // Breite/Höhe dürfen negativ sein; über die vier Ecken bleibt das egal.
        const [x, y, w, h] = [n(0), n(1), n(2), n(3)];
        moveTo(x, y);
        lineTo(x + w, y);
        lineTo(x + w, y + h);
        lineTo(x, y + h);
        d += "Z";
        cur = start;
        break;
      }
      case "h":
        d += "Z";
        cur = start;
        break;
      case "S":
      case "s":
      case "f":
      case "F":
      case "f*":
      case "B":
      case "B*":
      case "b":
      case "b*":
        paintPath(tok.v);
        break;
      case "n":
        d = "";
        break;
      case "BT":
        text.on = true;
        text.tm = text.tlm = [1, 0, 0, 1, 0, 0];
        text.runs = [];
        break;
      case "ET":
        flushText();
        text.on = false;
        break;
      case "Tf":
        text.font = fontMap[ops[0]?.v] ?? { family: "sans-serif" };
        text.size = n(1);
        break;
      case "Td":
      case "TD": // TD setzt zusätzlich den Zeilenabstand — ungenutzt, es gibt kein T*
        text.tlm = mul([1, 0, 0, 1, n(0), n(1)], text.tlm);
        text.tm = text.tlm;
        break;
      case "Tm":
        text.tm = text.tlm = ops.slice(0, 6).map((o) => o.v);
        break;
      case "Tj":
      case "TJ": {
        // Mehrere Tj in einem BT-Block laufen als tspans in EIN <text>: so
        // rückt der Browser sie selbst weiter, wir brauchen keine Glyphbreiten.
        const parts = tok.v === "Tj" ? [ops[0]?.v ?? ""] : (ops[0]?.v ?? []).filter((p) => typeof p === "string");
        const s = decode(parts.join(""), text.font);
        if (s) text.runs.push({ text: s, family: text.font?.family ?? "sans-serif", size: text.size, color: paint(gs.fill) });
        break;
      }
      case "Do":
        if (!SKIP_XOBJECTS) console.warn("XObject übersprungen:", ops[0]?.v);
        break;
      default:
        break;
    }
    ops = [];
  }
  return els;
}

// ------------------------------------------------------------------ Ausgabe

const [, , mbW, mbH] = mediaBox();
const els = interpret(tokenize(contentStream()), fonts());

// Bewusst nur role="img" + <title>, kein aria-labelledby: so kann eine
// einbettende Komponente den Namen per aria-label aus dem Wörterbuch
// überschreiben — aria-labelledby hätte Vorrang und würde das verhindern.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${num(mbW)} ${num(mbH)}" role="img" shape-rendering="geometricPrecision" xml:space="preserve">
<title>${esc(TITLE)}</title>
<!-- Der Hinweis steht in <metadata> statt in einem Kommentar: XML-Kommentare
     dürfen keine doppelten Bindestriche enthalten, CSS-Variablen aber schon. -->
<metadata>Aus ${esc(path.basename(SRC))} erzeugt von scripts/extract-schematic.mjs, nicht von Hand bearbeiten.
Umfärbbar über ${esc(Object.values(ROLE_VAR).join(", "))}; ohne Vorgabe gelten die Originalfarben.</metadata>
<g transform="translate(0,${num(mbH)}) scale(1,-1)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="100">
${els.join("\n")}
</g>
</svg>
`;

mkdirSync(path.dirname(OUT), { recursive: true });
writeFileSync(OUT, svg, "utf8");

const paths = (svg.match(/<path /g) ?? []).length;
const texts = (svg.match(/<text /g) ?? []).length;
console.log(`${OUT}: ${paths} Pfade, ${texts} Textelemente, ${(svg.length / 1024).toFixed(0)} kB`);
