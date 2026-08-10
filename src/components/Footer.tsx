import Link from "next/link";
import { GITHUB_URL, type Dictionary, type Locale } from "@/content";
import { ArrowUpRightIcon } from "./ui/icons";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="bg-ink text-offwhite">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl font-medium tracking-tight">
            Botanical Bytes
          </p>
          <a
            href={dict.footer.tflitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-sm text-offwhite/70 transition-colors hover:text-offwhite"
          >
            {dict.footer.brandLine}
            <ArrowUpRightIcon className="size-3.5" />
          </a>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-offwhite/70 transition-colors hover:text-offwhite"
          >
            {dict.footer.github}
          </a>
          <Link
            href={`/${locale}/impressum`}
            className="text-offwhite/70 transition-colors hover:text-offwhite"
          >
            {dict.footer.impressum}
          </Link>
          <Link
            href={`/${locale}/datenschutz`}
            className="text-offwhite/70 transition-colors hover:text-offwhite"
          >
            {dict.footer.datenschutz}
          </Link>
        </nav>
      </div>
      <div className="border-t border-offwhite/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-5 text-xs text-offwhite/55 sm:flex-row sm:justify-between md:px-8">
          <span>{dict.footer.copyright}</span>
          <span>{dict.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
