import Link from "next/link";
import { de } from "@/content/de";
import { en } from "@/content/en";

// not-found erhält keine Params — daher zweisprachig, Deutsch zuerst.
export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight md:text-5xl">
        {de.notFound.headline}
      </h1>
      <p className="mt-4 max-w-md text-muted">{de.notFound.body}</p>
      <Link
        href="/de"
        className="mt-7 inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink/85"
      >
        {de.notFound.cta}
      </Link>
      <p className="mt-12 text-sm text-muted">
        {en.notFound.headline}{" "}
        <Link
          href="/en"
          className="underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
        >
          {en.notFound.cta}
        </Link>
      </p>
    </main>
  );
}
