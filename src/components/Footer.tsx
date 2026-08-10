import Link from "next/link";
import { GITHUB_URL, type Dictionary, type Locale } from "@/content";
import { ArrowUpRightIcon } from "./ui/icons";

// Lassie-Footer: große Serif-Zeile, wenige Spalten, ruhige Schlusszeile.
export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="bg-ink px-5 py-16 text-paper md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              {dict.footer.tagline1}
              <br />
              <span className="italic">{dict.footer.tagline2}</span>
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sand"
            >
              {dict.footer.githubCta}
              <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-paper/50">
                {dict.footer.colProject}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper/80 transition-colors hover:text-paper"
                  >
                    {dict.footer.github}
                  </a>
                </li>
                <li>
                  <a
                    href={dict.footer.tflitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper/80 transition-colors hover:text-paper"
                  >
                    {dict.footer.tflit}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-paper/50">
                {dict.footer.colLegal}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href={`/${locale}/impressum`}
                    className="text-paper/80 transition-colors hover:text-paper"
                  >
                    {dict.footer.impressum}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/datenschutz`}
                    className="text-paper/80 transition-colors hover:text-paper"
                  >
                    {dict.footer.datenschutz}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-1 border-t border-paper/10 pt-6 text-xs text-paper/50 sm:flex-row sm:justify-between">
          <span>{dict.footer.copyright}</span>
          <a
            href={dict.footer.tflitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-paper"
          >
            {dict.footer.family}
          </a>
        </div>
      </div>
    </footer>
  );
}
