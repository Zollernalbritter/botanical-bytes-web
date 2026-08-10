import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LegalArticle } from "@/components/LegalArticle";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return {
    title: dict.impressum.title,
    alternates: {
      canonical: `/${locale}/impressum`,
      languages: { de: "/de/impressum", en: "/en/impressum" },
    },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} path="/impressum" />
      <main id="main">
        <LegalArticle locale={locale} data={dict.impressum} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
