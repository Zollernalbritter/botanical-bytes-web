import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { getStudio } from "@/content/studio";
import { AboutSplit } from "@/components/studio/AboutSplit";
import { BuildYours } from "@/components/studio/BuildYours";
import { HighlightStats } from "@/components/studio/HighlightStats";
import { PhotoStrips } from "@/components/studio/PhotoStrips";
import { PlatformGrid } from "@/components/studio/PlatformGrid";
import { ShowcaseVideo } from "@/components/studio/ShowcaseVideo";
import { StudioFaq } from "@/components/studio/StudioFaq";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { StudioHero } from "@/components/studio/StudioHero";
import { StudioNav } from "@/components/studio/StudioNav";
import { TrustedMarquee } from "@/components/studio/TrustedMarquee";
import { UseCaseCollage } from "@/components/studio/UseCaseCollage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}/v2`,
      languages: { de: "/de/v2", en: "/en/v2", "x-default": "/de/v2" },
    },
    // Zweitfassung des Auftritts — soll nicht mit der Startseite um Ranking konkurrieren.
    robots: { index: false, follow: true },
  };
}

// Bauklotz-Fassung des Auftritts. Der Rhythmus folgt der Referenz:
// Behauptung → Beleg → Plattform → Einsatz → Zahlen → Fragen → Menschen →
// Bilder → Einladung. Zwischen den Sektionen liegt bewusst viel Luft.
export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = getStudio(locale);

  return (
    <>
      <StudioNav locale={locale} s={s} />

      <main id="main">
        <StudioHero s={s} />

        <div className="mt-20 md:mt-28">
          <TrustedMarquee s={s} />
        </div>

        <section className="fade-up mt-28 md:mt-44">
          <ShowcaseVideo s={s} />
        </section>

        <div className="fade-up mt-28 md:mt-44">
          <PlatformGrid s={s} />
        </div>

        <div className="fade-up mt-28 md:mt-44">
          <UseCaseCollage s={s} />
        </div>

        <div className="fade-up mt-28 md:mt-44">
          <HighlightStats s={s} />
        </div>

        <div className="fade-up mt-28 md:mt-44">
          <StudioFaq s={s} />
        </div>

        <div className="fade-up mt-28 md:mt-44">
          <AboutSplit s={s} />
        </div>

        <div className="fade-up mt-28 md:mt-44">
          <PhotoStrips s={s} />
        </div>

        <div className="fade-up mt-28 md:mt-44">
          <BuildYours s={s} locale={locale} />
        </div>
      </main>

      <StudioFooter locale={locale} s={s} />
    </>
  );
}
