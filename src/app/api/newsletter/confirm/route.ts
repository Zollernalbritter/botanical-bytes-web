import { NextResponse } from "next/server";
import { Resend } from "resend";
import { welcomeEmail } from "@/lib/emails";
import { createToken, verifyToken } from "@/lib/newsletter-token";
import { NEWSLETTER_FROM, resolveLocale } from "../../shared";
import { SITE_URL } from "@/lib/site";

const UNSUB_TTL_MS = 10 * 365 * 24 * 60 * 60 * 1000;

// Bewusst POST statt GET: Die Zwischenseite /{locale}/newsletter/confirm
// postet hierher. Mail-Scanner folgen GET-Links, füllen aber keine Formulare
// aus — so bleibt das Double-Opt-in echte Nutzeraktion.
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const locale = resolveLocale(form.get("locale"));
  const back = (state: string) =>
    NextResponse.redirect(
      `${origin}/${locale}?newsletter=${state}#newsletter`,
      303,
    );

  const email = verifyToken(String(form.get("token") ?? ""), "confirm");
  if (!email) return back("invalid");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return back("error");
  const resend = new Resend(apiKey);

  // Idempotenz: Wer schon abonniert ist, bekommt keine zweite Welcome-Mail —
  // das entschärft auch Replays des Confirm-Links.
  const existing = await resend.contacts.get({ email }).catch(() => null);
  if (existing?.data && existing.data.unsubscribed === false) {
    return back("confirmed");
  }

  const updated = await resend.contacts.update({ email, unsubscribed: false });
  if (updated.error) {
    const created = await resend.contacts.create({ email, unsubscribed: false });
    if (created.error) {
      console.error("newsletter confirm failed:", created.error);
      return back("error");
    }
  }

  const unsubToken = createToken(email, "unsub", UNSUB_TTL_MS);
  const unsubUrl = `${SITE_URL}/${locale}/newsletter/unsubscribe?token=${encodeURIComponent(
    unsubToken,
  )}`;
  const mail = welcomeEmail(locale, unsubUrl);
  await resend.emails
    .send({
      from: NEWSLETTER_FROM,
      to: email,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    })
    .catch((error) => console.error("welcome mail failed:", error));

  return back("confirmed");
}
