"use client";

import { useEffect, useState } from "react";
import {
  CameraIcon,
  CloudUpIcon,
  ClockIcon,
  DatabaseIcon,
  DropletIcon,
  GaugeIcon,
  SproutIcon,
  ThermometerIcon,
} from "./ui/icons";

// Reihenfolge folgt dict.hero.chips — jedes Ereignis bekommt sein eigenes Icon,
// wie Lassies durchlaufende Status-Zeilen unter der Headline.
const icons = [
  ThermometerIcon,
  DropletIcon,
  SproutIcon,
  CloudUpIcon,
  CameraIcon,
  DatabaseIcon,
  GaugeIcon,
  ClockIcon,
];

// Rein dekorativ (aria-hidden) — Screenreader bekommen den statischen Subtext.
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

  const Icon = icons[index % icons.length];

  return (
    <div aria-hidden="true" className="mt-2.5 flex h-7 items-start justify-center">
      <p
        key={index}
        className="chip-in flex items-center gap-2 text-[13px] text-white/85"
      >
        <Icon className="size-[15px] shrink-0 opacity-80" />
        {chips[index]}
      </p>
    </div>
  );
}
