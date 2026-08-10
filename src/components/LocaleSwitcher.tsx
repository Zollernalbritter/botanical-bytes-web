import Link from "next/link";
import type { Locale } from "@/content";

export function LocaleSwitcher({
  locale,
  path,
  label,
}: {
  locale: Locale;
  path: string;
  label: string;
}) {
  const item = (target: Locale) => {
    const active = locale === target;
    return (
      <Link
        href={`/${target}${path}`}
        aria-current={active ? "page" : undefined}
        className={
          active
            ? "rounded-full bg-ink px-2.5 py-1 text-offwhite"
            : "rounded-full px-2.5 py-1 text-ink/75 transition-colors hover:text-ink"
        }
      >
        {target.toUpperCase()}
      </Link>
    );
  };

  return (
    <nav
      aria-label={label}
      className="flex items-center rounded-full border border-ink/15 p-0.5 text-xs font-medium"
    >
      {item("de")}
      {item("en")}
    </nav>
  );
}
