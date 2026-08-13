import Link from "next/link";
import type { Locale } from "@/content";
import type { Studio } from "@/content/studio";
import { LeafMark } from "@/components/LeafMark";
import { PillAnchor, Wrap } from "./primitives";

// Schwebende Leiste über der ganzen Seite: Wortmarke links, Ankerlinks und
// Sprachwechsel in einer Pille rechts, die Einladung als eigene Pille daneben.
// Kein Hamburger — auf schmalen Schirmen fallen nur die Ankerlinks weg, weil
// der Fuß dieselben Ziele noch einmal führt.

const navLink =
  "rounded-full px-3 py-1.5 text-[13px] text-night/70 transition-colors hover:text-night";

export function StudioNav({ locale, s }: { locale: Locale; s: Studio }) {
  const other: Locale = locale === "de" ? "en" : "de";

  return (
    <header className="fixed inset-x-0 top-3 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-0 focus:rounded-full focus:bg-night focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        {s.nav.skip}
      </a>

      <Wrap className="flex items-center justify-between gap-2">
        <Link
          href={`/${locale}/v2`}
          aria-label={s.nav.home}
          className="flex shrink-0 items-center gap-2 rounded-full py-1 text-[15px] font-medium"
        >
          {/* Das echte Signet des Projekts, nicht das Blatt aus dem Formen-
              Vokabular: eine Marke gehört über die Palette. Sein Moosgrün steht
              dicht genug an leaf, um nicht als Fremdkörper zu lesen — und es ist
              die einzige Stelle der Seite, an der es auftaucht. */}
          <LeafMark className="size-5 shrink-0" />
          {/* Eigenname, bewusst unübersetzt — vorgelesen wird das aria-label. */}
          <span aria-hidden="true" className="whitespace-nowrap">
            Botanical Bytes
          </span>
        </Link>

        <nav aria-label={s.nav.menu} className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-shell/80 p-1 backdrop-blur-md">
            <ul className="hidden items-center gap-0.5 md:flex">
              {s.nav.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <Link href={`/${other}/v2`} className={`${navLink} font-medium`}>
              {other.toUpperCase()}
              <span className="sr-only"> – {s.nav.localeSwitch}</span>
            </Link>
          </div>

          <PillAnchor
            href="#newsletter"
            tone="coral"
            className="shrink-0 whitespace-nowrap"
          >
            {s.nav.cta}
          </PillAnchor>
        </nav>
      </Wrap>
    </header>
  );
}
