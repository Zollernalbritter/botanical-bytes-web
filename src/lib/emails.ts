import type { Locale } from "@/content";

type Mail = { subject: string; html: string; text: string };

function shell(body: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f8f0e3;font-family:Arial,Helvetica,sans-serif;color:#123007;">
    <div style="max-width:520px;margin:0 auto;padding:32px 24px;">
      <p style="font-size:20px;font-weight:bold;margin:0 0 24px;">Botanical Bytes</p>
      ${body}
      <p style="font-size:12px;color:#5c6b57;margin-top:32px;">Botanical Bytes · TFLIT</p>
    </div>
  </body>
</html>`;
}

function button(href: string, label: string): string {
  return `<p style="margin:24px 0;"><a href="${href}" style="background:#123007;color:#f6faef;text-decoration:none;padding:12px 24px;border-radius:999px;font-size:14px;display:inline-block;">${label}</a></p>`;
}

export function confirmEmail(locale: Locale, confirmUrl: string): Mail {
  if (locale === "en") {
    return {
      subject: "Please confirm your subscription",
      html: shell(
        `<p style="font-size:15px;line-height:1.6;">Almost there. Click the button to confirm your Botanical Bytes newsletter subscription.</p>
         ${button(confirmUrl, "Confirm subscription")}
         <p style="font-size:13px;color:#5c6b57;line-height:1.6;">If you didn't request this, just ignore this email — nothing will be sent. The link is valid for 48 hours.</p>`,
      ),
      text: `Almost there. Confirm your Botanical Bytes newsletter subscription:\n\n${confirmUrl}\n\nIf you didn't request this, just ignore this email. The link is valid for 48 hours.`,
    };
  }
  return {
    subject: "Bitte bestätige deine Anmeldung",
    html: shell(
      `<p style="font-size:15px;line-height:1.6;">Fast geschafft. Klick auf den Button, um deine Anmeldung zum Botanical-Bytes-Newsletter zu bestätigen.</p>
       ${button(confirmUrl, "Anmeldung bestätigen")}
       <p style="font-size:13px;color:#5c6b57;line-height:1.6;">Wenn du das nicht warst, ignoriere diese E-Mail einfach – es wird nichts verschickt. Der Link ist 48 Stunden gültig.</p>`,
    ),
    text: `Fast geschafft. Bestätige deine Anmeldung zum Botanical-Bytes-Newsletter:\n\n${confirmUrl}\n\nWenn du das nicht warst, ignoriere diese E-Mail einfach. Der Link ist 48 Stunden gültig.`,
  };
}

export function welcomeEmail(locale: Locale, unsubUrl: string): Mail {
  if (locale === "en") {
    return {
      subject: "Welcome to the greenhouse",
      html: shell(
        `<p style="font-size:15px;line-height:1.6;">Thanks for confirming! From now on you'll get news from the greenhouse — rare, but honest.</p>
         <p style="font-size:13px;color:#5c6b57;line-height:1.6;">No longer interested? <a href="${unsubUrl}" style="color:#5c6b57;">Unsubscribe</a> anytime.</p>`,
      ),
      text: `Thanks for confirming! From now on you'll get news from the greenhouse — rare, but honest.\n\nUnsubscribe anytime: ${unsubUrl}`,
    };
  }
  return {
    subject: "Willkommen im Gewächshaus",
    html: shell(
      `<p style="font-size:15px;line-height:1.6;">Danke für deine Bestätigung! Ab jetzt bekommst du Neues aus dem Gewächshaus – selten, aber ehrlich.</p>
       <p style="font-size:13px;color:#5c6b57;line-height:1.6;">Kein Interesse mehr? Hier kannst du dich jederzeit <a href="${unsubUrl}" style="color:#5c6b57;">abmelden</a>.</p>`,
    ),
    text: `Danke für deine Bestätigung! Ab jetzt bekommst du Neues aus dem Gewächshaus – selten, aber ehrlich.\n\nJederzeit abmelden: ${unsubUrl}`,
  };
}
