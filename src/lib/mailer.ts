import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

// Der Client entsteht erst im Request, nie beim Modul-Import — sonst bräuchte
// schon der Build AWS-Credentials. Gleiches Muster wie in der tflit.com-Codebasis.
let client: SESv2Client | null = null;

export function getSes(): SESv2Client | null {
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) return null;
  client ??= new SESv2Client({
    region: AWS_REGION ?? "eu-central-1",
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });
  return client;
}

export function sesConfigured(): boolean {
  return getSes() !== null;
}

// Umlaute im Anzeigenamen müssen nach RFC 2047 kodiert werden, sonst landet
// Rohtext im From-Header.
function encodeHeaderWord(value: string): string {
  return /^[\x20-\x7e]*$/.test(value)
    ? value
    : `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function fromAddress(): string {
  const email =
    process.env.AWS_SES_FROM_EMAIL ?? "newsletter@botanicalbytes.tflit.com";
  const name = process.env.AWS_SES_FROM_NAME ?? "Botanical Bytes";
  return `${encodeHeaderWord(name)} <${email}>`;
}

type SendOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
  headers?: Record<string, string>;
};

/** Wirft, wenn SES den Versand ablehnt — die Routen fangen das ab. */
export async function sendMail({
  to,
  subject,
  text,
  html,
  headers,
}: SendOptions): Promise<void> {
  const ses = getSes();
  if (!ses) throw new Error("AWS SES is not configured");

  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: fromAddress(),
      Destination: { ToAddresses: [to] },
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: text, Charset: "UTF-8" },
            Html: { Data: html, Charset: "UTF-8" },
          },
          Headers: headers
            ? Object.entries(headers).map(([Name, Value]) => ({ Name, Value }))
            : undefined,
        },
      },
    }),
  );
}
