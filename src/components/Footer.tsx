import Link from "next/link";
import { GITHUB_URL, type Dictionary, type Locale } from "@/content";

const columnLink =
  "text-ink/75 transition-colors hover:text-ink";

// Lassie-Footer: links die große Serif-Zeile mit dunklem Knopf, rechts drei
// schmale Linkspalten. Ganz unten läuft die Wortmarke riesig über die volle
// Breite und wird am Seitenrand angeschnitten.
export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const f = dict.footer;

  return (
    <footer className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[86rem] gap-12 px-5 pb-16 pt-20 md:grid-cols-[1fr_auto] md:gap-24 md:pb-24 md:pt-28">
        <div>
          <p className="display text-[clamp(1.9rem,4.4vw,3rem)]">
            {f.tagline1}
            <br />
            <span className="italic">{f.tagline2}</span>
          </p>
          <a
            href={`#newsletter`}
            className="mt-7 inline-flex items-center rounded-lg bg-ink px-4 py-2.5 text-[13px] font-medium text-paper transition-colors hover:bg-ink/85"
          >
            {f.ctaLabel}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10 text-[13px] sm:grid-cols-3 md:gap-x-16">
          <div>
            <p className="label-mono">{f.colProject}</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={columnLink}>
                  {f.github}
                </a>
              </li>
              <li>
                <Link href={`/${locale}#technik`} className={columnLink}>
                  {f.tech}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#faq`} className={columnLink}>
                  {f.faq}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-mono">{f.colFamily}</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={f.tflitUrl} target="_blank" rel="noopener noreferrer" className={columnLink}>
                  {f.tflit}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-mono">{f.colLegal}</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href={`/${locale}/impressum`} className={columnLink}>
                  {f.impressum}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/datenschutz`} className={columnLink}>
                  {f.datenschutz}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[86rem] px-5 pb-12">
        <svg viewBox="0 0 24 24" className="size-6 text-ink" aria-hidden="true">
          <g fill="currentColor">
            <circle cx="12" cy="6.4" r="3.4" />
            <circle cx="17.3" cy="10.2" r="3.4" />
            <circle cx="15.3" cy="16.4" r="3.4" />
            <circle cx="8.7" cy="16.4" r="3.4" />
            <circle cx="6.7" cy="10.2" r="3.4" />
          </g>
        </svg>
        <p className="mt-3 whitespace-pre-line font-mono text-[11px] leading-relaxed text-muted">
          {f.copyright}
        </p>
      </div>

      {/* Riesen-Wortmarke, unten angeschnitten — Lassies Schlussbild.
          Als SVG mit textLength, damit sie in jeder Breite exakt randbündig
          sitzt, statt je nach Viewport zu überlaufen oder zu schrumpfen. */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden bg-gradient-to-b from-paper via-moss-tint/30 to-sky"
      >
        <svg
          viewBox="0 0 1000 150"
          className="block h-auto w-full"
        >
          <text
            x="500"
            y="152"
            textAnchor="middle"
            textLength="980"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="var(--font-display)"
            fontSize="200"
            fill="#ffffff"
          >
            Botanical Bytes
          </text>
        </svg>
      </div>
    </footer>
  );
}
