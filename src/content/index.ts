import { de } from "./de";
import { en } from "./en";
import type { Dictionary } from "./types";

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const GITHUB_URL =
  "https://github.com/Zollernalbritter/BWKI_24_Plant_Growth_Optimizer";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return locale === "en" ? en : de;
}

export type { Dictionary };
