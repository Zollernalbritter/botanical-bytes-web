# Botanical Bytes — Website

Die Website von **Botanical Bytes**, einem Schülerforschungsprojekt aus Tübingen:
Pflanzenwachstum messbar machen mit selbst entwickelten Sensorplatinen, einem
neuronalen Netz und Messung im Minutentakt. Teil der [TFLIT](https://tflit.com)-Familie.

Zweisprachiger Einseiter (`/de` + `/en`) im Stil von lassie.ai: Full-Screen-Hero-Video
mit Scroll-Shrink, schwebende Pill-Navigation, Feature-Karten mit Floating-UI-Kärtchen,
25-%-Stat-Collage, Meilenstein-Sektion, Infografik, FAQ und Double-Opt-in-Newsletter.

## Stack

- **Next.js 15** (App Router, Turbopack), React 19, TypeScript
- **Tailwind CSS v4** — Design-Tokens als `@theme` in `src/app/globals.css` (Paper/Sand-Grounds, Moosgrün-Akzent)
- **Fonts:** Newsreader (Serif-Display) · DM Sans (Body) · DM Mono (Messwerte), alle via `next/font`
- **Scroll-Choreografie:** CSS scroll-driven animations (`view-timeline`) mit `@supports`-Fallback und Reduced-Motion-Pfad
- **Hero-Video:** KI-generiert (Higgsfield, Seedance), Rohdatei in `assets-src/hero-raw.mp4`, Web-Fassung via `scripts/prepare-hero-video.mjs`
- **Newsletter:** [Amazon SES](https://aws.amazon.com/ses/) (Kontaktliste + Double-Opt-in mit HMAC-Tokens, keine Datenbank)

## Entwicklung

```bash
npm install
cp .env.example .env.local   # Werte eintragen
npm run dev                  # http://localhost:3000 → /de
npm run build && npm start   # Produktions-Build
```

## Inhalte & Sprachen

Alle Texte liegen in `src/content/de.ts` (Quelle der Wahrheit) und `src/content/en.ts`.
`en.ts` ist gegen den Typ von `de.ts` geprüft — fehlt ein Key, schlägt der Build fehl.

## Asset-Pipeline

Die Web-Bilder in `src/assets/img/` werden aus den Original-Fotos des Projekt-Repos
(`BWKI_24_Plant_Growth_Optimizer`) und den geretteten Bildern in `assets-src/blob/` erzeugt:

```bash
node scripts/prepare-images.mjs      # sharp: Derivate, OG-Bild, Apple-Icon
node scripts/transcode-timelapse.mjs # ffmpeg-static: Wachstum.gif → mp4/webm/poster
```

`assets-src/blob/` ist committet — diese Dateien existierten nur im v0.dev-Blob-Storage
der alten Website und sind sonst nirgends gesichert.

## Umgebungsvariablen

| Variable                | Zweck                                                          |
| ----------------------- | -------------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | IAM-Zugangsschlüssel für SES                                   |
| `AWS_SECRET_ACCESS_KEY` | dito                                                            |
| `AWS_REGION`            | SES-Region, Vorgabe `eu-central-1`                              |
| `AWS_SES_FROM_EMAIL`    | Absenderadresse — Domain muss in SES verifiziert sein           |
| `AWS_SES_FROM_NAME`     | Anzeigename des Absenders                                       |
| `SES_CONTACT_LIST`      | optional, Name der Kontaktliste (Vorgabe `botanical-bytes`)     |
| `NEWSLETTER_SECRET`     | ≥ 32 zufällige Zeichen, signiert Confirm-/Unsubscribe-Links     |
| `SITE_URL`              | Öffentliche Basis-URL (für Mails, Sitemap, OG) — auch beim Build |

### Newsletter über SES

Der Versand läuft über `@aws-sdk/client-sesv2`, die Abonnentenliste über die
SES-Kontaktlisten — dasselbe Konto wie bei tflit.com, dadurch keine zusätzliche
Datenbank und kein zweiter Dienstleister.

Der IAM-Nutzer braucht:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "ses:SendEmail",
      "ses:GetContactList", "ses:CreateContactList", "ses:ListContactLists",
      "ses:CreateContact", "ses:GetContact", "ses:UpdateContact", "ses:DeleteContact"
    ],
    "Resource": "*"
  }]
}
```

Das TFLIT-Konto (Region Frankfurt) hat Produktionszugriff. Als Absenderdomain
ist **`botanicalbytes.tflit.com`** eine eigene SES-Identität mit Easy DKIM —
bewusst nicht `tflit.com`, damit die Zustell-Reputation des Newsletters von der
Google-Workspace-Mail der Hauptdomain getrennt bleibt. Absender ist
`newsletter@botanicalbytes.tflit.com`.

DMARC erbt von `tflit.com` (`p=none`); DKIM signiert mit der Subdomain und ist
damit strikt aligned. Ein Custom-MAIL-FROM ist nicht nötig, weil die
DKIM-Ausrichtung DMARC allein erfüllt.

Die Kontaktliste legt der erste bestätigte Abonnent automatisch an. SES erlaubt
nur eine Liste pro Konto und Region; existiert bereits eine, wird sie mitbenutzt.

## Deployment (Coolify)

Die Seite läuft auf der Coolify-Instanz von TFLIT (`coolify-tflit.tflit.de`) unter
<https://botanicalbytes.tflit.com>. Gebaut wird aus dem `Dockerfile` im Repo-Root:
mehrstufiges Image auf Node 22, Next im `standalone`-Modus, Server auf Port 3000.

`SITE_URL` wird als **Build-Variable** gebraucht — `sitemap.xml`, `robots.txt` und
`metadataBase` werden beim Build vorgerendert. Die übrigen Variablen reichen zur Laufzeit.

Ein Push auf `main` löst automatisch ein Redeploy aus.

## Offene Punkte

- [x] Impressum + Datenschutzerklärung ausgefüllt — die Angaben zu Hosting, Newsletter
      und Tracking sind gegen die tatsächliche Infrastruktur geprüft. Wer den Stack
      ändert, muss `src/content/de.ts` und `en.ts` mitziehen.
- [x] SES: Absenderdomain verifiziert, Produktionszugriff vorhanden, IAM-Keys in Coolify
- [ ] Juristische Endabnahme der Datenschutzerklärung
- [ ] Auftragsverarbeitungsverträge gegenprüfen: AVV bei Hetzner abgeschlossen, AWS-DPA
      akzeptiert, und ob der AWS-Vertragspartner tatsächlich die AWS EMEA SARL ist
- [ ] Presse-Einträge bestätigen (`press.outlets` in den Dictionaries)
- [ ] Logo-Datei einsetzen, falls vorhanden (aktuell Wortmarke + `src/app/icon.svg`)
