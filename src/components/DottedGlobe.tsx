"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";
import { GERMANY_CENTER, terrainAt } from "@/lib/land-mask";

// Standorte, an denen Blüten aufgehen. Tübingen zuerst — von dort kommt alles.
// Jeder Punkt ist eine echte Stadt und liegt in der Landmaske auf Land; ein
// Küstenname wie New York fällt bei einem Grad Rasterweite ins Wasser und
// wurde deshalb durch eine Stadt weiter im Landesinneren ersetzt.
// Der kleinste Abstand zweier Blüten beträgt 10,1° — darunter schiebt die
// Drehung sie am Kugelrand ineinander, weil die Projektion dort staucht.
const markers: { lat: number; lon: number; size: number }[] = [
  // Europa: sechs von zweiunddreißig Blüten auf sieben Prozent der Landfläche
  { lat: 48.5, lon: 9.1, size: 1.5 }, // Tübingen
  { lat: 40.4, lon: -3.7, size: 0.7 }, // Madrid
  { lat: 38.0, lon: 23.7, size: 0.75 }, // Athen
  { lat: 59.9, lon: 17.6, size: 0.7 }, // Uppsala
  { lat: 50.4, lon: 30.5, size: 0.7 }, // Kyiv
  { lat: 64.1, lon: -21.9, size: 0.65 }, // Reykjavík
  // Afrika
  { lat: 30.0, lon: 31.2, size: 0.8 }, // Kairo
  { lat: 12.65, lon: -8.0, size: 0.7 }, // Bamako
  { lat: 6.5, lon: 3.4, size: 0.8 }, // Lagos
  { lat: -4.3, lon: 15.3, size: 0.7 }, // Kinshasa
  { lat: -1.3, lon: 36.8, size: 0.8 }, // Nairobi
  { lat: -33.9, lon: 18.4, size: 0.75 }, // Kapstadt
  // Asien
  { lat: 35.7, lon: 51.4, size: 0.75 }, // Teheran
  { lat: 43.2, lon: 76.9, size: 0.7 }, // Almaty
  { lat: 28.6, lon: 77.2, size: 0.9 }, // Delhi
  { lat: 12.97, lon: 77.6, size: 0.75 }, // Bengaluru
  { lat: 55.0, lon: 82.9, size: 0.7 }, // Nowosibirsk
  { lat: 47.9, lon: 106.9, size: 0.65 }, // Ulaanbaatar
  { lat: 39.9, lon: 116.4, size: 0.85 }, // Peking
  { lat: 35.7, lon: 139.7, size: 0.9 }, // Tokio
  { lat: 13.8, lon: 100.5, size: 0.75 }, // Bangkok
  { lat: -6.2, lon: 106.8, size: 0.75 }, // Jakarta
  // Amerika
  { lat: 38.6, lon: -121.5, size: 0.8 }, // Sacramento
  { lat: 41.9, lon: -87.6, size: 0.85 }, // Chicago
  { lat: 19.4, lon: -99.1, size: 0.85 }, // Mexiko-Stadt
  { lat: 4.7, lon: -74.1, size: 0.75 }, // Bogotá
  { lat: -12.0, lon: -77.0, size: 0.7 }, // Lima
  { lat: -23.5, lon: -46.6, size: 0.85 }, // São Paulo
  { lat: -34.6, lon: -58.4, size: 0.75 }, // Buenos Aires
  // Ozeanien
  { lat: -23.7, lon: 133.9, size: 0.65 }, // Alice Springs
  { lat: -35.3, lon: 149.1, size: 0.8 }, // Canberra
  { lat: -36.85, lon: 174.76, size: 0.7 }, // Auckland
];

const DOTS = 3000;
const INK = "26, 22, 19";
const PAPER = "#f9f8f5";

// Blickachse: der Nordpol kippt zum Betrachter. Ohne die Neigung klebt Europa
// am oberen Rand der Kugel und die Hervorhebung verschenkt ihre Wirkung.
const TILT = 0.35;
// Europa steht zu Beginn links der Mitte und wandert durch sie hindurch.
const START_LON = 26;
// Ruhelage ohne Drehung: dann soll Europa gleich mittig stehen.
const STILL_LON = 12;
const SPIN = 0.045;

// Farbe, Radius und Deckkraft je Kategorie, in der Reihenfolge von `Terrain`:
// Meer blass, Landmasse azur, Europa und Deutschland im tiefen Azur. Die
// beiden Zahlenpaare laufen von der Kugelkante zur Mitte.
const LAYERS = [
  { rgb: "169, 203, 216", radius: [0.9, 1.3], alpha: [0.35, 0.66] },
  { rgb: "99, 164, 188", radius: [1.8, 2.7], alpha: [0.75, 1] },
  { rgb: "47, 109, 136", radius: [1.9, 2.85], alpha: [0.82, 1] },
  { rgb: "47, 109, 136", radius: [2.2, 3.2], alpha: [0.9, 1] },
];

// Tiefenstufen: alle Punkte einer Stufe wandern in denselben Pfad und werden
// in einem Zug gefüllt. Ein eigener Füllstil je Punkt kostet auf der Leinwand
// mehr als die ganze Rechnerei drumherum.
const DEPTH_STEPS = 8;

const FILL = LAYERS.map((layer) =>
  Array.from({ length: DEPTH_STEPS }, (_, i) => {
    const depth = (i + 0.5) / DEPTH_STEPS;
    const alpha = layer.alpha[0] + (layer.alpha[1] - layer.alpha[0]) * depth;
    return `rgba(${layer.rgb}, ${alpha.toFixed(3)})`;
  }),
);

const SIZE_AT = LAYERS.map((layer) =>
  Array.from({ length: DEPTH_STEPS }, (_, i) => {
    const depth = (i + 0.5) / DEPTH_STEPS;
    return layer.radius[0] + (layer.radius[1] - layer.radius[0]) * depth;
  }),
);

function toVector(lat: number, lon: number) {
  const phi = (lat * Math.PI) / 180;
  const lambda = (lon * Math.PI) / 180;
  return {
    x: Math.cos(phi) * Math.sin(lambda),
    y: Math.sin(phi),
    z: Math.cos(phi) * Math.cos(lambda),
  };
}

// Lassies Blütenmarke, direkt auf die Leinwand gezeichnet: fünf Blätter um
// einen hellen Kern.
function drawBloom(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number,
) {
  ctx.fillStyle = `rgba(${INK}, ${alpha})`;
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(
      x + Math.cos(angle) * radius * 0.62,
      y + Math.sin(angle) * radius * 0.62,
      radius * 0.55,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
  ctx.fillStyle = PAPER;
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.26, 0, Math.PI * 2);
  ctx.fill();
}

// Gepunkteter Globus mit echten Landmassen, der sich langsam dreht. `bloom`
// (0–1) lässt die Standort-Blüten beim Scrollen aufgehen.
export function DottedGlobe({
  bloom,
  className = "",
}: {
  bloom?: MotionValue<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Alles Statische einmal vorab: Fibonacci-Gitter (gleichmäßig verteilte
    // Punkte auf der Kugel) und die Frage, was an jedem Punkt liegt. Pro Bild
    // bleibt nur noch Drehen und Zeichnen.
    const gridX = new Float32Array(DOTS);
    const gridY = new Float32Array(DOTS);
    const gridZ = new Float32Array(DOTS);
    const ground = new Uint8Array(DOTS);
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < DOTS; i++) {
      const y = 1 - (i / (DOTS - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const x = Math.cos(theta) * ring;
      const z = Math.sin(theta) * ring;
      gridX[i] = x;
      gridY[i] = y;
      gridZ[i] = z;
      ground[i] = terrainAt(
        (Math.asin(y) * 180) / Math.PI,
        (Math.atan2(x, z) * 180) / Math.PI,
      );
    }

    const pins = markers.map((m) => ({ ...toVector(m.lat, m.lon), size: m.size }));
    const home = toVector(GERMANY_CENTER.lat, GERMANY_CENTER.lon);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tiltSin = Math.sin(TILT);
    const tiltCos = Math.cos(TILT);
    const base = (-(reduced ? STILL_LON : START_LON) * Math.PI) / 180;

    let size = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let frame = 0;
    let last = 0;
    let turned = 0;

    function render(now: number) {
      if (!canvas || !ctx) return;
      // Nur die im Bild verbrachte Zeit dreht die Kugel weiter; nach einer
      // Pause im Hintergrund soll sie nicht springen.
      if (!reduced) turned += Math.min(0.1, (now - last) / 1000) * SPIN;
      last = now;

      const angle = base + turned;
      const radius = (size / 2) * 0.94;
      const cx = size / 2;
      const cy = size / 2;
      // Punktgrößen skalieren mit der Kugel, aber nicht beliebig weit nach
      // unten: auf dem Telefon blieben sonst kaum sichtbare Krümel übrig.
      const unit = Math.max(0.8, size / 500);
      const factor = bloom?.get() ?? 1;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      // Drehung um die Polachse, danach die Neigung zum Betrachter.
      const project = (v: { x: number; y: number; z: number }) => {
        const spun = -v.x * sin + v.z * cos;
        return {
          x: cx + (v.x * cos + v.z * sin) * radius,
          y: cy - (v.y * tiltCos - spun * tiltSin) * radius,
          z: v.y * tiltSin + spun * tiltCos,
        };
      };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // Kugelsilhouette, damit die Punktwolke einen Rand bekommt.
      ctx.strokeStyle = "rgba(99, 164, 188, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Deutschland ist bei diesem Punktabstand nur eine Handvoll Punkte. Ein
      // Ring darum macht daraus eine Markierung; er schrumpft zur Kugelkante
      // hin mit, damit er auf der Kugel zu liegen scheint.
      const here = project(home);
      if (here.z > 0.02) {
        const mark = size * 0.045 * (0.5 + 0.5 * here.z);
        const edge = Math.min(1, here.z / 0.25);
        ctx.fillStyle = `rgba(47, 109, 136, ${0.1 * edge})`;
        ctx.beginPath();
        ctx.arc(here.x, here.y, mark, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(47, 109, 136, ${0.45 * edge})`;
        ctx.lineWidth = Math.max(1, unit);
        ctx.stroke();
      }

      const buckets: (Path2D | undefined)[] = [];
      for (let i = 0; i < DOTS; i++) {
        const spun = -gridX[i] * sin + gridZ[i] * cos;
        const z = gridY[i] * tiltSin + spun * tiltCos;
        if (z <= 0) continue;
        const x = cx + (gridX[i] * cos + gridZ[i] * sin) * radius;
        const y = cy - (gridY[i] * tiltCos - spun * tiltSin) * radius;
        const layer = ground[i];
        const depth = Math.min(DEPTH_STEPS - 1, (z * DEPTH_STEPS) | 0);
        const slot = layer * DEPTH_STEPS + depth;
        const path = buckets[slot] ?? (buckets[slot] = new Path2D());
        const dot = SIZE_AT[layer][depth] * unit;
        // ohne moveTo hängt die Leinwand die Kreise zu einem Pfad zusammen
        path.moveTo(x + dot, y);
        path.arc(x, y, dot, 0, Math.PI * 2);
      }

      for (let slot = 0; slot < buckets.length; slot++) {
        const path = buckets[slot];
        if (!path) continue;
        ctx.fillStyle = FILL[(slot / DEPTH_STEPS) | 0][slot % DEPTH_STEPS];
        ctx.fill(path);
      }

      if (factor > 0.01) {
        for (const pin of pins) {
          const point = project(pin);
          if (point.z <= 0.06) continue;
          // am Rand ausblenden, damit nichts über die Kugelkante kippt
          const edge = Math.min(1, (point.z - 0.06) / 0.24);
          drawBloom(
            ctx,
            point.x,
            point.y,
            // etwas kleiner als früher: die Blüten sollen die Landmasse
            // markieren, nicht halb Europa zudecken. Zum Rand hin schrumpfen
            // sie mit — wie der Ring um Deutschland, und weil die Projektion
            // dort Abstände staucht, die auf der Kugel großzügig sind.
            size * 0.015 * pin.size * factor * (0.6 + 0.4 * point.z),
            (0.55 + point.z * 0.4) * edge,
          );
        }
      }

      frame = requestAnimationFrame(render);
    }

    // Erst zeichnen, wenn die Kugel im Bild ist: das spart die Rechenzeit auf
    // dem Rest der Seite und hält die Startdrehung für den ersten Blick auf.
    let showing = false;
    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === showing) return;
        showing = entry.isIntersecting;
        if (showing) {
          last = performance.now();
          frame = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "120px" },
    );
    watcher.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      watcher.disconnect();
    };
  }, [bloom]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`aspect-square ${className}`}
    />
  );
}
