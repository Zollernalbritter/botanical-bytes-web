"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";

export type PcbTabItem = {
  label: string;
  caption: string;
  alt: string;
  image: StaticImageData;
  fit: "cover" | "contain";
  positionClass?: string;
};

export function PcbTabs({
  items,
  listLabel,
}: {
  items: PcbTabItem[];
  listLabel: string;
}) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    let next = selected;
    if (event.key === "ArrowRight") next = (selected + 1) % items.length;
    else if (event.key === "ArrowLeft")
      next = (selected - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  const item = items[selected];

  return (
    <div>
      <div
        role="tablist"
        aria-label={listLabel}
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2"
      >
        {items.map((tab, i) => (
          <button
            key={tab.label}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`pcb-tab-${i}`}
            aria-selected={i === selected}
            aria-controls="pcb-panel"
            tabIndex={i === selected ? 0 : -1}
            onClick={() => setSelected(i)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              i === selected
                ? "bg-ink text-offwhite"
                : "border border-ink/15 text-ink/70 hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <figure
        role="tabpanel"
        id="pcb-panel"
        aria-labelledby={`pcb-tab-${selected}`}
        className="mt-4"
      >
        <div className="overflow-hidden rounded-xl bg-sage/50">
          <Image
            src={item.image}
            alt={item.alt}
            sizes="(min-width: 768px) 640px, 100vw"
            className={`aspect-[16/9] w-full ${
              item.fit === "cover"
                ? `object-cover ${item.positionClass ?? ""}`
                : "object-contain p-3"
            }`}
          />
        </div>
        <figcaption className="mt-2 text-sm text-sage-deep">
          {item.caption}
        </figcaption>
      </figure>
    </div>
  );
}
