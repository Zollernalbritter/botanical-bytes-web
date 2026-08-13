"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GITHUB_URL, type Dictionary, type Locale } from "@/content";
import { LeafMark } from "./LeafMark";

// Ein Feld der Referenz-Navigation: weiches Rechteck statt Halbkreis. Der
// Fokusring liegt nach innen versetzt, sonst verschwände er über dem hellen
// Hero-Video. Unter sm sind Grad und Polster kleiner — nur so stehen alle
// Felder auf 375 px nebeneinander, ohne dass ein Hamburger nötig wird.
const field =
  "flex shrink-0 items-center rounded-nav-item px-2 py-[7px] text-[12px] font-medium transition-colors focus-visible:outline-offset-[-3px] sm:px-3.5 sm:text-[13px]";

// Weiße Felder auf halbtransparenter Leiste: zwischen ihnen bleibt nur eine
// schmale Kerbe, durch die der Untergrund durchscheint.
const linkField = `${field} bg-white text-ink hover:bg-paper focus-visible:outline-ink`;

// Kontakt ist das hervorgehobene Aktionsfeld ganz rechts — dunkel gefüllt,
// deshalb braucht es den hellen Fokusring.
const actionField = `${field} bg-ink text-paper hover:bg-moss-deep focus-visible:outline-paper`;

// Der Sprachumschalter ist kein Navigationsziel im gleichen Sinn: eigene
// Füllung und ein breiterer Spalt setzen ihn vom Rest ab.
const localeField = `${field} ml-1 bg-sand/85 text-ink/70 hover:bg-white hover:text-ink focus-visible:outline-ink sm:ml-1.5`;

// Schwebende Navigationsleiste: mittig, auch auf Mobile ohne Hamburger.
// Sobald gescrollt wird, klappt der Wortlaut der Marke weg und nur das Blatt
// bleibt stehen — die Leiste schrumpft dabei weich in der Breite. Unter sm ist
// der Wortlaut von Anfang an eingeklappt, weil dort jeder Pixel zählt.
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
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-2 sm:px-3 md:top-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-0 focus:z-50 focus:rounded-nav-item focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        {dict.nav.skip}
      </a>

      {/* Letzte Rückfalllinie fürs Platzproblem: reicht die Breite doch nicht
          (sehr schmale Geräte, sehr lange Übersetzungen), schiebt sich die
          Leiste seitlich, statt zu brechen. Die Rollleiste bleibt unsichtbar. */}
      <nav
        className="flex max-w-full items-center gap-[2px] overflow-x-auto overscroll-x-contain rounded-nav bg-white/45 p-[2px] shadow-pill backdrop-blur-md [scrollbar-width:none] sm:gap-[3px] sm:p-[3px] [&::-webkit-scrollbar]:hidden"
      >
        <Link
          href={`/${locale}`}
          aria-label={dict.nav.home}
          className={linkField}
        >
          <LeafMark className="size-[18px] shrink-0" />
          <span
            aria-hidden="true"
            className={`display ml-0 max-w-0 overflow-hidden whitespace-nowrap text-[15px] opacity-0 transition-all duration-500 ease-out ${
              collapsed ? "" : "sm:ml-1.5 sm:max-w-40 sm:opacity-100"
            }`}
          >
            Botanical Bytes
          </span>
        </Link>

        {dict.nav.items.map((item) => (
          <Link
            key={item.href}
            href={`/${locale}${item.href}`}
            className={linkField}
          >
            {item.label}
          </Link>
        ))}

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkField} hidden sm:flex`}
        >
          {dict.nav.github}
        </a>

        <Link href={`/${locale}${dict.nav.contactHref}`} className={actionField}>
          {dict.nav.contact}
        </Link>

        <Link href={`/${other}${path}`} className={localeField}>
          {other.toUpperCase()}
          <span className="sr-only"> – {dict.nav.localeSwitch}</span>
        </Link>
      </nav>
    </header>
  );
}
