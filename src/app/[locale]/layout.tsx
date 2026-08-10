import type { Metadata } from "next";
import { DM_Mono, Inter, Jost, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-jost",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: "%s · Botanical Bytes",
    },
    description: dict.meta.description,
    openGraph: {
      type: "website",
      siteName: "Botanical Bytes",
      locale: dict.meta.ogLocale,
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/og.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/og.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: "Botanical Bytes",
    alternateName: "Plant Growth Optimizer",
    url: `${SITE_URL}/${locale as Locale}`,
    parentOrganization: {
      "@type": "Organization",
      name: "TFLIT",
      url: "https://tflit.com",
    },
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${newsreader.variable} ${jost.variable} ${dmMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
