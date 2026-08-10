import type { Dictionary, Locale } from "@/content";
import { NewsletterForm } from "./NewsletterForm";
import { Section } from "./ui/Section";

export function NewsletterSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Section id="newsletter" className="bg-sage">
      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <div>
          <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
            {dict.newsletter.headline}
          </h2>
          <p className="mt-4 text-ink/80">{dict.newsletter.sub}</p>
        </div>
        <NewsletterForm locale={locale} t={dict.newsletter} />
      </div>
    </Section>
  );
}
