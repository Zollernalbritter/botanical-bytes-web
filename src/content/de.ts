export const de = {
  locale: "de",
  meta: {
    title: "Botanical Bytes – Pflanzenwachstum messbar machen",
    description:
      "Schülerforschungsprojekt aus Tübingen: selbst entwickelte Sensorplatinen, ein neuronales Netz und Messung im Minutentakt. BWKI-Juniorpreis 2023, BWKI-Finalist 2024.",
    ogLocale: "de_DE",
  },
  nav: {
    skip: "Zum Inhalt springen",
    home: "Botanical Bytes – Startseite",
    items: [
      { href: "#technik", label: "Technik" },
      { href: "#faq", label: "FAQ" },
    ],
    github: "GitHub",
    localeSwitch: "zur englischen Version wechseln",
  },
  hero: {
    headline1: "Pflanzen reden nicht.",
    headline2: "Unsere Sensoren schon.",
    sub: "Botanical Bytes macht Wachstum messbar",
    videoAlt: "Kamerafahrt durch ein sonniges Gewächshaus auf eine Schale junger Kresse zu",
    chips: [
      "21,8 °C Lufttemperatur erfasst",
      "Luftfeuchte bei 64 % gemessen",
      "Bodenfeuchte geprüft",
      "Messwerte in die Cloud geschrieben",
      "Foto von Tag 3 aufgenommen",
      "8.182 Messreihen gespeichert",
      "986 hPa Luftdruck geloggt",
      "Nächste Messung in 60 Sekunden",
    ],
    emailPlaceholder: "Deine E-Mail",
    emailButton: "Updates erhalten",
    emailLegal: "Double-Opt-in, kein Spam. Mit dem Absenden stimmst du der Speicherung zu –",
    emailLegalLink: "Datenschutzerklärung",
    pause: "Video pausieren",
    play: "Video abspielen",
  },
  features: {
    heading1: "Messen, lernen,",
    heading2: "wachsen.",
    blocks: [
      {
        title: "Misst rund um die Uhr",
        body: "Alle 60 Sekunden erfasst unsere eigene Platine Temperatur, Luftfeuchte, CO₂, Licht und Bodenfeuchte – auf SD-Karte und in die Cloud.",
        mediaAlt: "Zeitraffer eines Kresse-Wachstumszyklus",
        card: {
          title: "Data Collector v3.0",
          rows: [
            { label: "Temperatur", value: "21,8 °C" },
            { label: "Luftfeuchte", value: "64 %" },
            { label: "Nächste Messung", value: "60 s" },
          ],
        },
      },
      {
        title: "Lernt aus jedem Zyklus",
        body: "Ein Anbauzyklus liefert 8.182 Messreihen über sechs Kanäle. Unser neuronales Netz lernt daraus, wie die Bedingungen zusammenhängen.",
        mediaAlt: "Anzuchtschale im Gewächshaus mit sichtbarer Prototyp-Elektronik",
        card: {
          title: "Training läuft …",
          rows: [
            { label: "Epoche", value: "940 / 1000" },
            { label: "Datenpunkte", value: "8.182" },
            { label: "Fehler", value: "sinkt ✓" },
          ],
        },
      },
      {
        title: "Findet die richtige Wassermenge",
        body: "In Experimenten haben wir die optimale Wassermenge ermittelt – gewogen auf der Küchenwaage, Zyklus für Zyklus. Das Ziel: Empfehlungen in Echtzeit.",
        mediaAlt: "Der Kresse-Ertrag wird auf einer Küchenwaage gewogen",
        card: {
          title: "Experiment 12",
          rows: [
            { label: "Aussaat", value: "10 g Kresse" },
            { label: "Wassermenge", value: "optimiert" },
            { label: "Ertrag", value: "+25 % ✓" },
          ],
        },
      },
    ],
  },
  collage: {
    qualifier: "bis zu",
    big: "25 %",
    line1: "mehr Ertrag durch die",
    line2: "optimale Wassermenge",
    sub1: "Je mehr Zyklen wir messen,",
    sub2: "desto besser verstehen wir Wachstum",
    cards: [
      { title: "Messreihe #4.211", rows: ["21,4 °C", "78 % rF", "986 hPa"] },
      { title: "Ernte gewogen", rows: ["Zyklus 12", "+25 % vs. Referenz"] },
    ],
    imgAlts: [
      "Nahaufnahme junger Kressepflanzen im Gegenlicht",
      "Microgreens am fünften Tag des Zyklus",
    ],
  },
  milestones: {
    heading1: "Drei Jahre.",
    heading2: "Drei Meilensteine.",
    items: [
      {
        quote: "Juniorpreis beim Bundeswettbewerb Künstliche Intelligenz.",
        meta: "2023 · als botanical_bytes",
        imgAlt: "Tillmann und Finn im Fotostudio mit Anzuchtschale und Platine",
      },
      {
        quote: "Mit dem Plant Growth Optimizer im Finale in Tübingen.",
        meta: "2024 · Bundeswettbewerb KI",
        imgAlt: "Der Messestand beim BWKI-Finale mit Anzuchtschalen und Sensorik",
      },
      {
        quote: "Zwei Sonderpreise beim Landeswettbewerb Jugend forscht.",
        meta: "2024 · Jugend forscht",
        imgAlt: "Tillmann und Finn am Stand beim Landeswettbewerb Jugend forscht",
      },
    ],
    outro: "Hinter allem: Tillmann Lang und Finn Paparisto aus Tübingen.",
    pressLine: "Bekannt aus: SWR · Reutlinger General-Anzeiger · DASDING",
  },
  how: {
    heading: "Wie es funktioniert",
    steps: [
      {
        title: "Messen",
        body: "Die Data-Collector-Platine sitzt unter der Anzuchtschale und erfasst sieben Größen im Minutentakt – von Temperatur bis Bodenfeuchte.",
        imgAlt: "3D-Rendering der Data-Collector-Platine Version 3.0",
      },
      {
        title: "Lernen",
        body: "Standardisierte Aussaaten – immer exakt 10 Gramm Samen – machen Zyklen vergleichbar. Das neuronale Netz lernt die Zusammenhänge.",
        imgAlt: "Exakt 10 Gramm Kressesamen auf der Waage",
      },
      {
        title: "Optimieren",
        body: "Aus den Daten wird die optimale Wassermenge. Das Ergebnis: bis zu 25 % mehr Ertrag – und ein System, das mit jedem Zyklus klüger wird.",
        imgAlt: "Ausgewachsene Kresse in der Anzuchtschale",
      },
    ],
    diagram: {
      ariaLabel:
        "Ablaufdiagramm: Die Platine misst die Pflanze im Minutentakt, die Daten trainieren das neuronale Netz – die Empfehlung soll künftig automatisch zur Pflanze zurückfließen",
      nodes: ["Pflanze", "Platine", "Daten", "Neuronales Netz", "Empfehlung"],
      measureLabel: "alle 60 Sekunden",
      loopLabel: "Rückführung geplant",
    },
  },
  tech: {
    heading: "Die Hardware im Detail",
    intro: "Platinendesign, Firmware, Netz und Datensatz – alles offen auf GitHub.",
    pcb: {
      headline: "Selbst entworfen. Dreimal verbessert.",
      body: "Unsere Data-Collector-Platine auf ESP32-S3-Basis misst Temperatur, Luftdruck, Luftfeuchte, Gaswerte, CO₂, Bodenfeuchte und Helligkeit. Die nächste Generation soll zusätzlich pH-Wert und Nährstoffdichte messen – entworfen ist sie schon, angekommen war sie zur Abgabe 2024 noch nicht.",
      tabs: [
        {
          label: "Prototyp",
          caption: "Der Anfang: Steckbrett-Elektronik unter der Anzuchtschale im Gewächshaus.",
          alt: "Anzuchtschale im Gewächshaus mit sichtbarer Prototyp-Elektronik",
        },
        {
          label: "Platine v2",
          caption: "Die eigene Platine: SD-Karten-Logger mit Anschlüssen für CO₂- und Bodensensor.",
          alt: "3D-Rendering einer frühen Data-Collector-Platine",
        },
        {
          label: "v3.0",
          caption: "Plant Growth Optimizer v.3.0: ESP32-S3, BME680 und USB-C – der Name steht im Platinendruck.",
          alt: "3D-Rendering der Data-Collector-Platine Version 3.0",
        },
      ],
      downloads: "Pläne als PDF:",
      downloadSchematic: "Schaltplan",
      downloadPcb: "Platinen-Layout",
    },
    seed: {
      headline: "Jeder Samen zählt. Wörtlich.",
      body: "Mit OpenCV-Kantenerkennung analysieren wir, wie die Samen zueinander liegen – der Abstand beeinflusst die Keimung. Die Auswertung läuft noch von Hand.",
      originalAlt: "Originalfoto der Kressesamen auf Watte",
      compareLabel: "Canny und Sobel im Vergleich",
      compareHint: "Regler ziehen: links Canny, rechts Sobel",
      cannyAlt: "Canny-Kantenerkennung der Samen",
      sobelAlt: "Sobel-Kantenerkennung der Samen",
    },
  },
  faq: {
    heading: "FAQ",
    items: [
      {
        q: "Was ist Botanical Bytes?",
        a: "Ein Schülerforschungsprojekt, gestartet 2023 für den Bundeswettbewerb Künstliche Intelligenz (BWKI). Wir machen Pflanzenwachstum messbar – mit selbst entwickelten Sensorplatinen, standardisierten Aussaaten und einem neuronalen Netz.",
      },
      {
        q: "Steuert die KI schon die Bewässerung?",
        a: "Nein – noch nicht. Unser aktuelles Netz sagt die Luftfeuchte aus den übrigen Sensordaten voraus. Die Echtzeit-Steuerung der Bewässerung ist unser erklärtes Ziel und steht auf der Roadmap.",
      },
      {
        q: "Woher kommen die 25 % mehr Ertrag?",
        a: "Aus Experimenten mit der Wassermenge: Wir haben verschiedene Mengen getestet, die Ernte auf einer Küchenwaage gewogen und die optimale Menge ermittelt. Das war klassische Versuchsarbeit – nicht das neuronale Netz.",
      },
      {
        q: "Warum ausgerechnet Kresse?",
        a: "Weil sie schnell wächst. Ein protokollierter Zyklus dauert rund 5,7 Tage und liefert bei Messungen im Minutentakt 8.182 Messreihen über sechs aufgezeichnete Sensorkanäle. Außerdem testen wir Radieschen-Microgreens.",
      },
      {
        q: "Was misst die Platine genau?",
        a: "Temperatur, Luftdruck, Luftfeuchte und Gaswerte (BME680), dazu CO₂, Bodenfeuchte und Helligkeit. Alle 60 Sekunden auf SD-Karte und in die Cloud. Die nächste Platinengeneration soll zusätzlich pH-Wert und Nährstoffdichte erfassen.",
      },
      {
        q: "Ist das Projekt Open Source?",
        a: "Ja. Platinendesign, Firmware, das neuronale Netz und ein kompletter Beispieldatensatz liegen offen auf GitHub.",
      },
    ],
  },
  cta: {
    heading1: "Neues aus dem",
    heading2: "Gewächshaus.",
    imgAlt: "Nahaufnahme junger Kressepflanzen im Gegenlicht",
  },
  newsletter: {
    label: "E-Mail-Adresse",
    placeholder: "du@beispiel.de",
    button: "Abonnieren",
    loading: "Wird gesendet …",
    consentPre:
      "Ich bin einverstanden, dass meine E-Mail-Adresse zum Versand des Newsletters gespeichert wird. Details in der",
    consentLinkLabel: "Datenschutzerklärung",
    successConfirm: "Fast geschafft. Bitte bestätige deine E-Mail.",
    confirmed: "Danke! Dein Abo ist bestätigt.",
    unsubscribed: "Du bist abgemeldet. Schade – aber jederzeit wieder willkommen.",
    invalidToken: "Dieser Link ist ungültig oder abgelaufen. Bitte trag dich noch einmal ein.",
    errInvalid: "Das sieht nicht nach einer E-Mail-Adresse aus.",
    errConsent: "Bitte bestätige die Einwilligung.",
    errServer: "Etwas ist schiefgelaufen. Bitte versuch es später noch einmal.",
    note: "Kein Spam. Abmeldung jederzeit.",
    confirmPage: {
      title: "Anmeldung bestätigen",
      body: "Ein Klick, und du bist dabei: Bestätige, dass du den Botanical-Bytes-Newsletter erhalten möchtest.",
      button: "Jetzt bestätigen",
    },
    unsubPage: {
      title: "Vom Newsletter abmelden",
      body: "Schade! Ein Klick, und du bekommst keine Mails mehr von uns.",
      button: "Jetzt abmelden",
    },
  },
  footer: {
    tagline1: "Pflanzenwachstum",
    tagline2: "messbar machen.",
    githubCta: "Code auf GitHub ansehen",
    colProject: "Projekt",
    colLegal: "Rechtliches",
    tflit: "TFLIT",
    tflitUrl: "https://tflit.com/arbeiten/botanical-bytes",
    github: "GitHub",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    copyright: "© 2026 Botanical Bytes. Made in Tübingen.",
    family: "Ein Projekt der TFLIT-Familie",
  },
  notFound: {
    headline: "Hier wächst nichts.",
    body: "Diese Seite gibt es nicht – oder noch nicht. Zurück zur Kresse?",
    cta: "Zur Startseite",
  },
  impressum: {
    title: "Impressum",
    todoNote: "Platzhalter – vor Veröffentlichung ausfüllen.",
    sections: [
      { h: "Angaben gemäß § 5 DDG", lines: ["[TODO: Vor- und Nachname]", "[TODO: Straße und Hausnummer]", "[TODO: PLZ und Ort]"] },
      { h: "Kontakt", lines: ["[TODO: E-Mail-Adresse]"] },
      { h: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV", lines: ["[TODO: Name und Anschrift]"] },
    ],
    backHome: "Zurück zur Startseite",
  },
  datenschutz: {
    title: "Datenschutzerklärung",
    todoNote: "Platzhalter-Struktur – vor Veröffentlichung durch geprüfte Texte ersetzen.",
    sections: [
      { h: "Verantwortlicher", lines: ["[TODO: Name und Kontaktdaten des Verantwortlichen]"] },
      {
        h: "Hosting",
        lines: [
          "Diese Website wird bei Vercel Inc. gehostet. [TODO: Hinweise zu Auftragsverarbeitung, Server-Logs und Standardvertragsklauseln ergänzen]",
        ],
      },
      {
        h: "Newsletter",
        lines: [
          "Die Anmeldung erfolgt im Double-Opt-in-Verfahren. Zum Versand nutzen wir den Dienst Resend. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung kann jederzeit über den Abmeldelink widerrufen werden. [TODO: vollständigen Text ergänzen]",
        ],
      },
      { h: "Ihre Rechte", lines: ["[TODO: Betroffenenrechte nach DSGVO aufführen]"] },
      { h: "Stand", lines: ["[TODO: Datum]"] },
    ],
    backHome: "Zurück zur Startseite",
  },
};
