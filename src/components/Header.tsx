import Link from "next/link";
import { GITHUB_URL, type Dictionary, type Locale } from "@/content";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import { ArrowUpRightIcon } from "./ui/icons";

export function LeafMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <rect width="512" height="512" rx="112" fill="#94C11F" />
      <path
        d="M256 428V268"
        stroke="#123007"
        strokeWidth="34"
        strokeLinecap="round"
      />
      <path
        d="M254 292C254 210 198 158 116 150c4 84 62 134 138 142z"
        fill="#123007"
      />
      <path
        d="M258 244c0-66 46-108 116-114-4 68-52 110-116 114z"
        fill="#123007"
      />
    </svg>
  );
}

export function Header({
  locale,
  dict,
  path = "",
}: {
  locale: Locale;
  dict: Dictionary;
  path?: string;
}) {
  const nav = dict.header.nav.map((item) => ({
    ...item,
    href: `/${locale}${item.href}`,
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/85 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-offwhite"
      >
        {dict.header.skip}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-2.5 font-display text-lg font-medium tracking-tight"
        >
          <LeafMark />
          Botanical Bytes
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink/75 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-ink/75 transition-colors hover:text-ink"
          >
            {dict.header.github}
            <ArrowUpRightIcon className="size-3.5" />
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher
            locale={locale}
            path={path}
            label={dict.header.localeSwitch}
          />
          <MobileNav
            items={nav}
            github={{ href: GITHUB_URL, label: dict.header.github }}
            openLabel={dict.header.menuOpen}
            closeLabel={dict.header.menuClose}
            menuLabel={dict.header.menuLabel}
          />
        </div>
      </div>
    </header>
  );
}
