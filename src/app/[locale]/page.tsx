import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content";
import { ClosingCta } from "@/components/ClosingCta";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import { PillNav } from "@/components/PillNav";
import { PressBand } from "@/components/PressBand";
import { SeedAnalysis } from "@/components/SeedAnalysis";
import { SmoothScroll } from "@/components/SmoothScroll";
import { StatOrbit } from "@/components/StatOrbit";
import { StickyStack } from "@/components/StickyStack";
import { TechDetail } from "@/components/TechDetail";
import { TrustGlobe } from "@/components/TrustGlobe";
import { VideoHero } from "@/components/VideoHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: { de: "/de", en: "/en", "x-default": "/de" },
    },
  };
}

// Aufbau in Lassies Reihenfolge, um zwei eigene Beats erweitert: Video-Hero →
// Presseband → Aussage mit gestapelten Karten → große Zahl in fliegender
// Collage → Globus mit Zitaten → Wie es arbeitet → Samenanalyse → Hardware im
// Detail → FAQ →
// Abschluss-Karte → Footer.
//
// Das Presseband steht bewusst direkt unter dem Hero: die Auszeichnungen
// tragen die Behauptung der Headline, bevor irgendetwas erklärt wird.
//
// Die frühere Prototyp-Sektion mit Stromfluss-Schaubild und Schaltplan ist
// entfallen. Was von ihr bleibt — die Platine und die Pläne zum Herunterladen —
// steht jetzt in der Hardware-Sektion; das Schaubild aus Kästchen und Leitungen
// passte nie zur Bildsprache der übrigen Seite.
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <SmoothScroll />
      <PillNav locale={locale} dict={dict} path="" />
      <main id="main">
        <VideoHero locale={locale} dict={dict} />
        <PressBand dict={dict} />
        <StickyStack dict={dict} />
        <StatOrbit dict={dict} />
        <TrustGlobe dict={dict} />
        <HowItWorks dict={dict} />
        <SeedAnalysis dict={dict} />
        <TechDetail dict={dict} />
        <Faq dict={dict} />
        <ClosingCta locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
