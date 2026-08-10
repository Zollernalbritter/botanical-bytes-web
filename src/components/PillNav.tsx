"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GITHUB_URL, type Dictionary, type Locale } from "@/content";
import { LeafMark } from "./LeafMark";

// Fokusring innen in der weißen Pille — bleibt über jedem Video-Frame sichtbar.
const pill =
  "flex items-center rounded-full bg-white px-3.5 py-[7px] text-[13px] font-medium text-ink shadow-pill transition-colors hover:bg-paper focus-visible:outline-ink focus-visible:outline-offset-[-3px]";

// Lassies schwebende Pill-Navigation: mittig, auch auf Mobile ohne Hamburger.
// Sobald gescrollt wird, klappt der Wortlaut der Marke weg und nur das Blatt
// bleibt stehen — die Pille schrumpft dabei weich in der Breite.
export function PillNav({
  locale,
  dict,
  path = "",
}: {
  locale: Locale;
  dict: Dictionary;
  path?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const other: Locale = locale === "de" ? "en" : "de";

  useEffect(() => {
    function onScroll() {
      setCollapsed(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center md:top-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-0 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        {dict.nav.skip}
      </a>

      <nav className="flex items-center gap-1 rounded-full bg-white/45 p-1 shadow-pill backdrop-blur-md">
        <Link href={`/${locale}`} aria-label={dict.nav.home} className={pill}>
          <LeafMark className="size-[18px] shrink-0" />
          <span
            aria-hidden="true"
            className={`display overflow-hidden whitespace-nowrap text-[15px] transition-all duration-500 ease-out ${
              collapsed ? "ml-0 max-w-0 opacity-0" : "ml-1.5 max-w-40 opacity-100"
            }`}
          >
            Botanical Bytes
          </span>
        </Link>

        {dict.nav.items.map((item) => (
          <Link key={item.href} href={`/${locale}${item.href}`} className={pill}>
            {item.label}
          </Link>
        ))}

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${pill} hidden sm:flex`}
        >
          {dict.nav.github}
        </a>

        <Link
          href={`/${other}${path}`}
          className="flex items-center rounded-full bg-sand/80 px-3.5 py-[7px] text-[13px] font-medium text-ink/70 shadow-pill transition-colors hover:bg-white hover:text-ink focus-visible:outline-ink focus-visible:outline-offset-[-3px]"
        >
          {other.toUpperCase()}
          <span className="sr-only"> – {dict.nav.localeSwitch}</span>
        </Link>
      </nav>
    </header>
  );
}
