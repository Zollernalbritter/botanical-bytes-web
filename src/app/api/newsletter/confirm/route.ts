import { NextResponse } from "next/server";
import { isSubscribed, subscribe } from "@/lib/contacts";
import { welcomeEmail } from "@/lib/emails";
import { sendMail, sesConfigured } from "@/lib/mailer";
import { createToken, verifyToken } from "@/lib/newsletter-token";
import { resolveLocale } from "../../shared";
import { SITE_URL } from "@/lib/site";

const UNSUB_TTL_MS = 10 * 365 * 24 * 60 * 60 * 1000;

// Bewusst POST statt GET: Die Zwischenseite /{locale}/newsletter/confirm
// postet hierher. Mail-Scanner folgen GET-Links, füllen aber keine Formulare
// aus — so bleibt das Double-Opt-in echte Nutzeraktion.
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const locale = resolveLocale(form.get("locale"));
  // Zieladresse aus SITE_URL, nicht aus request.url: der Standalone-Server
  // baut die absolute URL aus HOSTNAME/PORT des Containers zusammen und
  // wuerde auf https://0.0.0.0:3000 weiterleiten.
  const back = (state: string) =>
    NextResponse.redirect(
      `${SITE_URL}/${locale}?newsletter=${state}#newsletter`,
      303,
    );

  const email = verifyToken(String(form.get("token") ?? ""), "confirm");
  if (!email) return back("invalid");

  if (!sesConfigured()) return back("error");

  try {
    // Idempotenz: Wer schon abonniert ist, bekommt keine zweite Welcome-Mail —
    // das entschärft auch Replays des Confirm-Links.
    if (await isSubscribed(email)) return back("confirmed");
    await subscribe(email, locale);
  } catch (error) {
    console.error("newsletter confirm failed:", error);
    return back("error");
  }

  const unsubToken = createToken(email, "unsub", UNSUB_TTL_MS);
  const unsubUrl = `${SITE_URL}/${locale}/newsletter/unsubscribe?token=${encodeURIComponent(
    unsubToken,
  )}`;
  const mail = welcomeEmail(locale, unsubUrl);
  await sendMail({
    to: email,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    // Ein-Klick-Abmeldung nach RFC 8058 — Gmail und Yahoo erwarten das von
    // Newsletter-Absendern. Zielt auf dieselbe Route wie der Link in der Mail.
    headers: {
      "List-Unsubscribe": `<${SITE_URL}/api/newsletter/unsubscribe?token=${encodeURIComponent(
        unsubToken,
      )}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  }).catch((error) => console.error("welcome mail failed:", error));

  return back("confirmed");
}
