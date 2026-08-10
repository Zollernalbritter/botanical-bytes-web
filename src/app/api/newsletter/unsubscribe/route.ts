import { NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyToken } from "@/lib/newsletter-token";
import { resolveLocale } from "../../shared";

// POST statt GET — siehe confirm/route.ts: Mail-Scanner dürfen niemals
// versehentlich Abmeldungen auslösen.
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

  const email = verifyToken(String(form.get("token") ?? ""), "unsub");
  if (!email) return back("invalid");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return back("error");
  const resend = new Resend(apiKey);

  const updated = await resend.contacts.update({ email, unsubscribed: true });
  if (updated.error) {
    console.error("unsubscribe failed:", updated.error);
    return back("error");
  }

  return back("unsubscribed");
}
