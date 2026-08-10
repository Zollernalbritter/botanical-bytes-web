import Link from "next/link";
import { GITHUB_URL, type Dictionary, type Locale } from "@/content";
import { LeafMark } from "./LeafMark";
import { ArrowUpRightIcon } from "./ui/icons";

// Fokusring innen in der weißen Pille gezeichnet — bleibt über jedem
// Video-Frame sichtbar, egal wie hell oder dunkel der Hintergrund ist.
const pill =
  "flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-pill transition-colors hover:bg-paper focus-visible:outline-ink focus-visible:outline-offset-[-3px]";

// Schwebende Pill-Navigation nach Lassie-Vorbild — auch auf Mobile, kein Hamburger.
export function PillNav({
  locale,
  dict,
  path = "",
}: {
  locale: Locale;
  dict: Dictionary;
  path?: string;
}) {
  const other: Locale = locale === "de" ? "en" : "de";

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center md:top-5">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-0 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        {dict.nav.skip}
      </a>
      <nav className="flex items-center gap-1.5 rounded-full bg-ink/5 p-1 backdrop-blur-md">
        <Link
          href={`/${locale}`}
          aria-label={dict.nav.home}
          className={pill}
        >
          <LeafMark className="size-5" />
          <span className="hidden font-display text-[15px] tracking-tight sm:inline">
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
          <ArrowUpRightIcon className="size-3.5" />
        </a>
        <Link
          href={`/${other}${path}`}
          className="flex items-center rounded-full bg-moss-tint px-3.5 py-2 text-sm font-medium text-moss-deep shadow-pill transition-colors hover:bg-white focus-visible:outline-ink focus-visible:outline-offset-[-3px]"
        >
          {other.toUpperCase()}
          <span className="sr-only"> – {dict.nav.localeSwitch}</span>
        </Link>
      </nav>
    </header>
  );
}
