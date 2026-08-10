import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content";
import { Footer } from "@/components/Footer";
import { NewsletterActionCard } from "@/components/NewsletterActionCard";
import { PillNav } from "@/components/PillNav";

// Muss pro Request rendern — sonst wird ?token= beim statischen Export ignoriert
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return {
    title: dict.newsletter.unsubPage.title,
    robots: { index: false },
  };
}

export default async function NewsletterUnsubscribePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { token } = await searchParams;

  return (
    <>
      <PillNav locale={locale} dict={dict} path="" />
      <NewsletterActionCard
        locale={locale}
        dict={dict}
        action="/api/newsletter/unsubscribe"
        data={dict.newsletter.unsubPage}
        token={token}
      />
      <Footer locale={locale} dict={dict} />
    </>
  );
}
