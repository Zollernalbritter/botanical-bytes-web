"use client";

import { useEffect, useState } from "react";

// Rotierende Sensor-Ereignisse wie Lassies Status-Chips. Rein dekorativ
// (aria-hidden) — Screenreader bekommen den statischen Subtext darüber.
export function HeroChips({ chips }: { chips: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setIndex((value) => (value + 1) % chips.length),
      2600,
    );
    return () => clearInterval(timer);
  }, [chips.length]);

  return (
    <div aria-hidden="true" className="mt-2 flex h-9 items-start justify-center">
      <p
        key={index}
        className="chip-in flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm"
      >
        <span className="size-1.5 rounded-full bg-white/80" />
        {chips[index]}
      </p>
    </div>
  );
}
