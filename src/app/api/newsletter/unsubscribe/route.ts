import { NextResponse } from "next/server";
import { unsubscribe } from "@/lib/contacts";
import { sesConfigured } from "@/lib/mailer";
import { verifyToken } from "@/lib/newsletter-token";
import { resolveLocale } from "../../shared";
import { SITE_URL } from "@/lib/site";

// POST statt GET — siehe confirm/route.ts: Mail-Scanner dürfen niemals
// versehentlich Abmeldungen auslösen.
export async function POST(request: Request) {
  const url = new URL(request.url);
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const locale = resolveLocale(form.get("locale"));
  // Siehe confirm/route.ts: request.url zeigt im Container auf 0.0.0.0:3000.
  const back = (state: string) =>
    NextResponse.redirect(
      `${SITE_URL}/${locale}?newsletter=${state}#newsletter`,
      303,
    );

  // Ein-Klick-Abmeldung nach RFC 8058: Das Mailprogramm postet ohne Formular
  // gegen die List-Unsubscribe-URL, das Token steht dann im Query-String. Es
  // erwartet eine schlichte Antwort, keinen Redirect auf die Website.
  const formToken = form.get("token");
  const oneClick = typeof formToken !== "string" || formToken === "";
  const token = oneClick ? (url.searchParams.get("token") ?? "") : formToken;

  const email = verifyToken(token, "unsub");
  if (!email) {
    return oneClick
      ? NextResponse.json({ error: "invalid_token" }, { status: 400 })
      : back("invalid");
  }

  if (!sesConfigured()) {
    return oneClick
      ? NextResponse.json({ error: "not_configured" }, { status: 500 })
      : back("error");
  }

  try {
    await unsubscribe(email);
  } catch (error) {
    console.error("unsubscribe failed:", error);
    return oneClick
      ? NextResponse.json({ error: "unsubscribe_failed" }, { status: 502 })
      : back("error");
  }

  return oneClick ? NextResponse.json({ ok: true }) : back("unsubscribed");
}
