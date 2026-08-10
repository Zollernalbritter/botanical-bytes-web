import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/impressum", "/datenschutz"];
  return paths.flatMap((path) =>
    (["de", "en"] as const).map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          de: `${SITE_URL}/de${path}`,
          en: `${SITE_URL}/en${path}`,
        },
      },
    })),
  );
}
