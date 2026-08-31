import type { Locale } from "@/content";

export function resolveLocale(value: unknown): Locale {
  return value === "en" ? "en" : "de";
}
