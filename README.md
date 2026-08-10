# Botanical Bytes — Website

Die Website von **Botanical Bytes**, einem Schülerforschungsprojekt aus Tübingen:
Pflanzenwachstum messbar machen mit selbst entwickelten Sensorplatinen, einem
neuronalen Netz und Messung im Minutentakt. Teil der [TFLIT](https://tflit.com)-Familie.

Zweisprachiger Einseiter (`/de` + `/en`) mit Presse-Marquee, Story, Technik-Bento,
Stat-Sektion, Team, FAQ und Double-Opt-in-Newsletter.

## Stack

- **Next.js 15** (App Router, Turbopack), React 19, TypeScript
- **Tailwind CSS v4** — Design-Tokens als `@theme` in `src/app/globals.css`
- **Fonts:** Newsreader (Serif-Display) · Inter (Body) · Jost (Eyebrows) · DM Mono (Messwerte), alle via `next/font`
- **Newsletter:** [Resend](https://resend.com) (Contacts + Double-Opt-in mit HMAC-Tokens, keine Datenbank)
- Nur 4 kleine Client-Islands (MobileNav, PcbTabs, ImageCompare, NewsletterForm) — der Rest sind Server Components

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

| Variable            | Zweck                                                        |
| ------------------- | ------------------------------------------------------------ |
| `RESEND_API_KEY`    | Resend-API-Key                                               |
| `NEWSLETTER_SECRET` | ≥ 32 zufällige Zeichen, signiert Confirm-/Unsubscribe-Links |
| `SITE_URL`          | Öffentliche Basis-URL (für Mails, Sitemap, OG)              |
| `NEWSLETTER_FROM`   | Absender (erst nach Domain-Verifizierung bei Resend ändern) |

## Offene Punkte vor Veröffentlichung

- [ ] Impressum + Datenschutzerklärung ausfüllen (`src/content/de.ts` / `en.ts`, Platzhalter sind markiert)
- [ ] Presse-Einträge bestätigen (`press.outlets` in den Dictionaries)
- [ ] Resend: Domain verifizieren, Env-Vars in Vercel setzen
- [ ] Logo-Datei einsetzen, falls vorhanden (aktuell Wortmarke + `src/app/icon.svg`)
