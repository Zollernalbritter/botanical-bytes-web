import Link from "next/link";
import { getDictionary, GITHUB_URL, type Locale } from "@/content";
import type { Studio } from "@/content/studio";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Tag, Wrap } from "./primitives";

// Schlussbild der Bauklotz-Seite: eine sandfarbene Karte, die den Creme-Grund
// über die volle Breite abschließt — oben abgerundet, unten randlos. Darin
// zuerst die Newsletter-Einladung (Ankerziel #newsletter), dann Tagline und
// Linkspalten, ganz unten Copyright und ein Streifen aus fünf Bauklötzen.

type FooterLink = {
  label: string;
  href: string;
  /** "route" = interne Seite über next/link, "external" = neuer Tab.
      Ohne Angabe: Sprungmarke oder Datei aus /public, also ein schlichtes <a>. */
  kind?: "route" | "external";
};

const linkClass =
  "text-[0.9375rem] text-night/70 transition-colors hover:text-night";

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.kind === "route") {
    return (
      <Link href={link.href} className={linkClass}>
        {link.label}
      </Link>
    );
  }
  if (link.kind === "external") {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {link.label}
      </a>
    );
  }
  return (
    <a href={link.href} className={linkClass}>
      {link.label}
    </a>
  );
}

export function StudioFooter({ locale, s }: { locale: Locale; s: Studio }) {
  // Das Newsletter-Formular gehört zur bestehenden Seite und erwartet deren
  // Wörterbuch — darum hier zusätzlich zum Studio-Text geladen.
  const dict = getDictionary(locale);

  const columns: { heading: string; links: FooterLink[] }[] = [
    {
      heading: s.footer.colProject,
      links: [
        { label: s.footer.linkPlatform, href: "#plattform" },
        { label: s.footer.linkUseCases, href: "#einsatz" },
        { label: s.footer.linkFaq, href: "#faq" },
      ],
    },
    {
      heading: s.footer.colAbout,
      links: [
        { label: s.footer.linkGithub, href: GITHUB_URL, kind: "external" },
        { label: s.footer.linkSchematic, href: "/downloads/schematic.pdf" },
        { label: s.footer.linkPcb, href: "/downloads/pcb.pdf" },
        {
          label: s.footer.linkTflit,
          href: "https://tflit.com/arbeiten/botanical-bytes",
          kind: "external",
        },
      ],
    },
    {
      heading: s.footer.colLegal,
      links: [
        {
          label: s.footer.impressum,
          href: `/${locale}/impressum`,
          kind: "route",
        },
        {
          label: s.footer.datenschutz,
          href: `/${locale}/datenschutz`,
          kind: "route",
        },
        { label: s.footer.linkClassic, href: `/${locale}`, kind: "route" },
      ],
    },
  ];

  return (
    <footer>
      <div className="mt-24 rounded-t-[2.5rem] bg-shell py-14 md:py-20">
        <Wrap>
          {/* Ankerziel der Nav-Pille „Updates“ — scroll-mt hält die Überschrift
              unter einer fixierten Navigation frei. */}
          <div id="newsletter" className="mb-16 scroll-mt-28 text-center">
            <h2 className="t-section text-balance">
              {s.build.newsletterHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-[32rem] text-[0.9375rem] leading-relaxed text-night/55">
              {s.build.newsletterBody}
            </p>
            <div className="mx-auto mt-7 max-w-[32rem] text-left">
              <NewsletterForm locale={locale} t={dict.newsletter} />
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(3,0.7fr)]">
            <div>
              <p className="t-card max-w-[24rem] text-balance">
                {s.footer.tagline}
              </p>
              <div className="mt-8 space-y-1">
                <Tag>{s.footer.origin1}</Tag>
                <Tag>{s.footer.origin2}</Tag>
              </div>
            </div>

            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <Tag>{column.heading}</Tag>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-night/10 pt-8 md:flex-row md:items-center md:justify-between">
            <Tag>{s.footer.copyright}</Tag>
            {/* Die fünf Grundformen der Seite als Abbinder — reine Dekoration. */}
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="shape-arch h-4 w-6 bg-coral" />
              <span className="size-4 rounded-full bg-wheat" />
              <span className="size-4 rounded-[3px] bg-azure" />
              <span className="shape-leaf size-4 bg-leaf" />
              <span className="shape-capsule h-4 w-7 bg-clay" />
            </div>
          </div>
        </Wrap>
      </div>
    </footer>
  );
}
