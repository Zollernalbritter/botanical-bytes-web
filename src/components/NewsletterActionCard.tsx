import Link from "next/link";
import type { Dictionary, Locale } from "@/content";

// Zwischenseite für Confirm/Unsubscribe: Der Mail-Link landet hier (GET,
// nebenwirkungsfrei), erst der Button löst die Mutation per POST aus.
export function NewsletterActionCard({
  locale,
  dict,
  action,
  data,
  token,
}: {
  locale: Locale;
  dict: Dictionary;
  action: string;
  data: { title: string; body: string; button: string };
  token?: string;
}) {
  return (
    <main
      id="main"
      className="flex min-h-[70vh] items-center justify-center px-5 py-16"
    >
      <div className="w-full max-w-md rounded-card bg-cream-soft p-8 text-center shadow-card">
        <h1 className="font-display text-3xl font-medium tracking-tight">
          {data.title}
        </h1>
        {token ? (
          <>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              {data.body}
            </p>
            <form method="POST" action={action} className="mt-6">
              <input type="hidden" name="token" value={token} />
              <input type="hidden" name="locale" value={locale} />
              <button
                type="submit"
                className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-offwhite transition-colors hover:bg-ink/85"
              >
                {data.button}
              </button>
            </form>
          </>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            {dict.newsletter.invalidToken}
          </p>
        )}
        <p className="mt-6 text-xs">
          <Link
            href={`/${locale}`}
            className="underline decoration-ink/40 underline-offset-2 hover:decoration-ink"
          >
            {dict.notFound.cta}
          </Link>
        </p>
      </div>
    </main>
  );
}
