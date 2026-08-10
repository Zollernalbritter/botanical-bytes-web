"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale } from "@/content";

type Status = "idle" | "loading" | "success" | "error";

// Schwebendes E-Mail-Pill-Formular im Hero (Lassie-Prinzip). Die Einwilligung
// steht als Klartext direkt unter dem Feld; bestätigt wird per Double-Opt-in.
export function HeroSignup({
  locale,
  hero,
  newsletter,
  // das Formular steht zweimal auf der Seite — die ID muss eindeutig bleiben
  id = "hero-email",
}: {
  locale: Locale;
  hero: Dictionary["hero"];
  newsletter: Dictionary["newsletter"];
  id?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage(newsletter.errInvalid);
      return;
    }
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, consent: true, website: "" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setMessage(newsletter.successConfirm);
      form.reset();
    } catch {
      setStatus("error");
      setMessage(newsletter.errServer);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <form
        onSubmit={onSubmit}
        noValidate
        className="flex items-center gap-1 rounded-full bg-white/95 p-1 shadow-float focus-within:ring-2 focus-within:ring-ink"
      >
        <label htmlFor={id} className="sr-only">
          {newsletter.label}
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          placeholder={hero.emailPlaceholder}
          autoComplete="email"
          className="w-full min-w-0 bg-transparent px-4 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink/85 focus-visible:outline-ink disabled:opacity-60"
        >
          {status === "loading" ? newsletter.loading : hero.emailButton}
        </button>
      </form>
      <p aria-live="polite" className="mt-2 min-h-4 text-center text-xs font-medium text-white">
        {message ?? ""}
      </p>
      <p className="text-center text-[11px] leading-snug text-white/75">
        {hero.emailLegal}{" "}
        <Link
          href={`/${locale}/datenschutz`}
          className="underline decoration-white/50 underline-offset-2 hover:decoration-white"
        >
          {hero.emailLegalLink}
        </Link>
      </p>
    </div>
  );
}
