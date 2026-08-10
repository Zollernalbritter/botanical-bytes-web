import type { Locale } from "@/content";

// Bis eine eigene Domain bei Resend verifiziert ist, funktioniert nur der
// Onboarding-Absender (Zustellung dann nur an die eigene Account-Adresse).
export const NEWSLETTER_FROM =
  process.env.NEWSLETTER_FROM ?? "Botanical Bytes <onboarding@resend.dev>";

export function resolveLocale(value: unknown): Locale {
  return value === "en" ? "en" : "de";
}
