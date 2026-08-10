"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/content";

type Status = "idle" | "loading" | "success" | "error";
type BannerKind = "success" | "info" | "error";

const bannerStyles: Record<BannerKind, string> = {
  success: "bg-moss-tint",
  info: "bg-sand",
  error: "bg-[#a03325]/10 text-[#7a2417]",
};

export function NewsletterForm({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary["newsletter"];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [banner, setBanner] = useState<{
    kind: BannerKind;
    text: string;
  } | null>(null);

  // Rückkehr aus Confirm-/Unsubscribe-Flows: ?newsletter=…
  useEffect(() => {
    const state = new URLSearchParams(window.location.search).get("newsletter");
    if (state === "confirmed") setBanner({ kind: "success", text: t.confirmed });
    else if (state === "unsubscribed")
      setBanner({ kind: "info", text: t.unsubscribed });
    else if (state === "invalid")
      setBanner({ kind: "error", text: t.invalidToken });
    else if (state === "error")
      setBanner({ kind: "error", text: t.errServer });
  }, [t]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const consent = data.get("consent") === "on";
    const website = String(data.get("website") ?? "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage(t.errInvalid);
      return;
    }
    if (!consent) {
      setStatus("error");
      setMessage(t.errConsent);
      return;
    }

    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, consent, website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setMessage(t.successConfirm);
      form.reset();
    } catch {
      setStatus("error");
      setMessage(t.errServer);
    }
  }

  return (
    <div>
      {/* Immer gerendert, Text wird injiziert — sonst überhören Screenreader die Live-Region */}
      <p
        role="status"
        aria-live="polite"
        className={
          banner
            ? `mb-4 rounded-xl px-4 py-3 text-sm font-medium ${bannerStyles[banner.kind]}`
            : "sr-only"
        }
      >
        {banner?.text ?? ""}
      </p>
      <form onSubmit={onSubmit} noValidate>
        <label
          htmlFor="newsletter-email"
          className="mb-1.5 block text-xs font-medium text-ink/80"
        >
          {t.label}
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder={t.placeholder}
            autoComplete="email"
            className="w-full rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm placeholder:text-ink/55 focus:border-ink/40"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink/85 disabled:opacity-60"
          >
            {status === "loading" ? t.loading : t.button}
          </button>
        </div>

        {/* Honeypot — für Menschen unsichtbar */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <label className="mt-4 flex items-start gap-2.5 text-xs text-ink/70">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 size-4 shrink-0 accent-ink"
          />
          <span>
            {t.consentPre}{" "}
            <Link
              href={`/${locale}/datenschutz`}
              className="underline decoration-ink/40 underline-offset-2 hover:decoration-ink"
            >
              {t.consentLinkLabel}
            </Link>
            .
          </span>
        </label>

        <p aria-live="polite" className="mt-3 min-h-5 text-sm font-medium">
          {message && (
            <span className={status === "error" ? "text-[#a03325]" : ""}>
              {message}
            </span>
          )}
        </p>
        <p className="text-xs text-muted">{t.note}</p>
      </form>
    </div>
  );
}
