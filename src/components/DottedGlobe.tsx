"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";

// Standorte, an denen Blüten aufgehen. Tübingen zuerst — von dort kommt alles.
const markers: { lat: number; lon: number; size: number }[] = [
  { lat: 48.5, lon: 9.1, size: 1.5 },
  { lat: 52.5, lon: 13.4, size: 0.8 },
  { lat: 51.5, lon: -0.1, size: 0.85 },
  { lat: 40.7, lon: -74.0, size: 1 },
  { lat: 37.8, lon: -122.4, size: 0.95 },
  { lat: -23.5, lon: -46.6, size: 0.75 },
  { lat: 35.7, lon: 139.7, size: 0.9 },
  { lat: 28.6, lon: 77.2, size: 0.85 },
  { lat: -33.9, lon: 151.2, size: 0.7 },
  { lat: -1.3, lon: 36.8, size: 0.7 },
  { lat: 55.8, lon: 37.6, size: 0.7 },
  { lat: 1.35, lon: 103.8, size: 0.65 },
];

const DOTS = 1600;
const INK = "26, 22, 19";
const PAPER = "#f9f8f5";

// Fibonacci-Gitter: gleichmäßig verteilte Punkte auf der Kugel.
function sphereGrid(count: number) {
  const points: { x: number; y: number; z: number }[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
  }
  return points;
}

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

// Gepunkteter Globus, der sich langsam dreht. `bloom` (0–1) lässt die
// Standort-Blüten beim Scrollen aufgehen.
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

    const grid = sphereGrid(DOTS);
    const pins = markers.map((m) => ({ ...toVector(m.lat, m.lon), size: m.size }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    const start = performance.now();

    function render(now: number) {
      if (!canvas || !ctx) return;
      // Startdrehung zeigt Europa nach vorn; danach langsames Weiterdrehen.
      const angle = 0.35 + (reduced ? 0 : ((now - start) / 1000) * 0.055);
      const radius = (size / 2) * 0.94;
      const cx = size / 2;
      const cy = size / 2;
      const factor = bloom?.get() ?? 1;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      for (const point of grid) {
        const z = -point.x * sin + point.z * cos;
        if (z <= 0) continue;
        const x = point.x * cos + point.z * sin;
        ctx.fillStyle = `rgba(${INK}, ${0.1 + z * 0.24})`;
        ctx.beginPath();
        ctx.arc(cx + x * radius, cy - point.y * radius, 1.3 + z * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      if (factor > 0.01) {
        for (const pin of pins) {
          const z = -pin.x * sin + pin.z * cos;
          if (z <= 0.06) continue;
          const x = pin.x * cos + pin.z * sin;
          // am Rand ausblenden, damit nichts über die Kugelkante kippt
          const edge = Math.min(1, (z - 0.06) / 0.24);
          drawBloom(
            ctx,
            cx + x * radius,
            cy - pin.y * radius,
            size * 0.021 * pin.size * factor,
            (0.55 + z * 0.4) * edge,
          );
        }
      }

      frame = requestAnimationFrame(render);
    }

    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
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
