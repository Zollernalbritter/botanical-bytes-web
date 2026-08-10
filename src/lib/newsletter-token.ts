import { createHmac, timingSafeEqual } from "node:crypto";

// Zustandslose Double-Opt-in-Tokens: base64url(payload) + HMAC-SHA256.
// Kein Datenbank-Zwang — die Signatur beweist, dass der Link von uns stammt.

export type TokenPurpose = "confirm" | "unsub";

type TokenPayload = { email: string; purpose: TokenPurpose; exp: number };

function getSecret(): string {
  const secret = process.env.NEWSLETTER_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("NEWSLETTER_SECRET is missing or too short");
  }
  return secret;
}

export function createToken(
  email: string,
  purpose: TokenPurpose,
  ttlMs: number,
): string {
  const payload: TokenPayload = { email, purpose, exp: Date.now() + ttlMs };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifyToken(
  token: string,
  purpose: TokenPurpose,
): string | null {
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;

  let expected: Buffer;
  try {
    expected = createHmac("sha256", getSecret()).update(data).digest();
  } catch {
    return null;
  }
  const given = Buffer.from(sig, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString(),
    ) as TokenPayload;
    if (payload.purpose !== purpose) return null;
    if (typeof payload.email !== "string") return null;
    if (Date.now() > payload.exp) return null;
    return payload.email;
  } catch {
    return null;
  }
}
