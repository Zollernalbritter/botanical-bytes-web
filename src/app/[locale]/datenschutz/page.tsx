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
    title: dict.datenschutz.title,
    alternates: {
      canonical: `/${locale}/datenschutz`,
      languages: { de: "/de/datenschutz", en: "/en/datenschutz" },
    },
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} path="/datenschutz" />
      <main id="main">
        <LegalArticle locale={locale} data={dict.datenschutz} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
