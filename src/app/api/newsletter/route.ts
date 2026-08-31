import { NextResponse } from "next/server";
import { confirmEmail } from "@/lib/emails";
import { sendMail, sesConfigured } from "@/lib/mailer";
import { createToken } from "@/lib/newsletter-token";
import { resolveLocale } from "../shared";
import { SITE_URL } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONFIRM_TTL_MS = 48 * 60 * 60 * 1000;

// Best-effort-Rate-Limit: pro Serverless-Instanz, reicht für dieses Traffic-Profil.
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  // Sweep verhindert unbegrenztes Wachstum bei vielen unterschiedlichen Keys
  if (hits.size > 500) {
    for (const [key, value] of hits) {
      if (now - value.windowStart > 60_000) hits.delete(key);
    }
  }
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > 60_000) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(request: Request) {
  let body: {
    email?: unknown;
    locale?: unknown;
    consent?: unknown;
    website?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: Bots bekommen einen Fake-Erfolg, es passiert nichts.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: "consent_required" }, { status: 400 });
  }
  const locale = resolveLocale(body.locale);

  const ip = (request.headers.get("x-forwarded-for") ?? "local")
    .split(",")[0]
    .trim()
    .slice(0, 64);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  if (!sesConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  // Hier wird noch nichts gespeichert: Das Token trägt die Adresse signiert
  // durch das Double-Opt-in, der Kontakt entsteht erst beim Bestätigen — so,
  // wie es die Datenschutzerklärung zusagt.
  const token = createToken(email, "confirm", CONFIRM_TTL_MS);
  // Link führt auf eine Zwischenseite; die Mutation passiert erst per POST —
  // sonst bestätigen Mail-Scanner (SafeLinks & Co.) das Abo von selbst.
  const confirmUrl = `${SITE_URL}/${locale}/newsletter/confirm?token=${encodeURIComponent(
    token,
  )}`;
  const mail = confirmEmail(locale, confirmUrl);

  try {
    await sendMail({
      to: email,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
  } catch (error) {
    console.error("newsletter confirm mail failed:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
