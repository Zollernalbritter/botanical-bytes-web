import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content";
import { ClosingCta } from "@/components/ClosingCta";
import { Faq } from "@/components/Faq";
import { FeatureBlocks } from "@/components/FeatureBlocks";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import { Milestones } from "@/components/Milestones";
import { PillNav } from "@/components/PillNav";
import { StatCollage } from "@/components/StatCollage";
import { TechDetail } from "@/components/TechDetail";
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
      <PillNav locale={locale} dict={dict} path="" />
      <main id="main">
        <VideoHero locale={locale} dict={dict} />
        <FeatureBlocks dict={dict} />
        <StatCollage dict={dict} />
        <Milestones dict={dict} />
        <HowItWorks dict={dict} />
        <TechDetail dict={dict} />
        <Faq dict={dict} />
        <ClosingCta locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
