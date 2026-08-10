import Link from "next/link";
import type { Locale } from "@/content";
import { Section } from "./ui/Section";
import { ArrowRightIcon } from "./ui/icons";

export type LegalData = {
  title: string;
  todoNote: string;
  sections: { h: string; lines: string[] }[];
  backHome: string;
};

export function LegalArticle({
  locale,
  data,
}: {
  locale: Locale;
  data: LegalData;
}) {
  return (
    <Section containerClassName="max-w-3xl">
      <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
        {data.title}
      </h1>
      <p className="mt-4 inline-block rounded-full bg-moss-tint px-3.5 py-1.5 text-xs font-medium">
        {data.todoNote}
      </p>
      {data.sections.map((section) => (
        <section key={section.h} className="mt-8">
          <h2 className="font-display text-xl font-medium tracking-tight">
            {section.h}
          </h2>
          {section.lines.map((line) => (
            <p key={line} className="mt-2 text-sm leading-relaxed text-ink/80">
              {line}
            </p>
          ))}
        </section>
      ))}
      <Link
        href={`/${locale}`}
        className="mt-10 inline-flex items-center gap-2 text-sm font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
      >
        <ArrowRightIcon className="size-4 rotate-180" />
        {data.backHome}
      </Link>
    </Section>
  );
}
