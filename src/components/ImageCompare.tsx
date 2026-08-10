"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

export function ImageCompare({
  left,
  right,
  leftAlt,
  rightAlt,
  leftLabel,
  rightLabel,
  sliderLabel,
  hint,
}: {
  left: StaticImageData;
  right: StaticImageData;
  leftAlt: string;
  rightAlt: string;
  leftLabel: string;
  rightLabel: string;
  sliderLabel: string;
  hint: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl bg-ink">
        <Image src={left} alt={leftAlt} className="w-full" />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <Image
            src={right}
            alt={rightAlt}
            className="size-full object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-moss"
          style={{ left: `${pos}%` }}
        />
        <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-paper">
          {leftLabel}
        </span>
        <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-paper">
          {rightLabel}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={sliderLabel}
        className="mt-3 w-full accent-ink"
      />
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}
