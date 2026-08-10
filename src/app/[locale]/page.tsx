import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NewsletterSection } from "@/components/NewsletterSection";
import { PressMarquee } from "@/components/PressMarquee";
import { StatsSection } from "@/components/StatsSection";
import { StorySection } from "@/components/StorySection";
import { TeamSection } from "@/components/TeamSection";
import { TechSection } from "@/components/TechSection";

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
      <Header locale={locale} dict={dict} path="" />
      <main id="main">
        <Hero locale={locale} dict={dict} />
        <PressMarquee dict={dict} />
        <StorySection dict={dict} />
        <TechSection dict={dict} />
        <StatsSection dict={dict} />
        <TeamSection dict={dict} />
        <Faq dict={dict} />
        <NewsletterSection locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
