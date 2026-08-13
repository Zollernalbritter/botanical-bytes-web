import type { Locale } from "./index";

// Inhalte der Bauklotz-Seite (/v2). Eigenes Modul, damit die Startseite und
// ihr Wörterbuch unberührt bleiben. Deutsch ist die Quelle der Wahrheit —
// fehlt drüben ein Key, schlägt der Build fehl.
export const studioDe = {
  nav: {
    skip: "Zum Inhalt springen",
    home: "Botanical Bytes – Startseite",
    items: [
      { href: "#plattform", label: "Plattform" },
      { href: "#einsatz", label: "Einsatz" },
      { href: "#projekt", label: "Projekt" },
      { href: "#faq", label: "FAQ" },
    ],
    cta: "Updates",
    localeSwitch: "zur englischen Version wechseln",
    menu: "Menü",
    close: "Menü schließen",
  },

  hero: {
    line1: "Messbar, offen, unermüdlich.",
    line2: "Pflanzendaten für alle.",
    videoAlt:
      "Kamerafahrt durch ein sonniges Gewächshaus auf eine Schale junger Kresse zu",
    pause: "Video pausieren",
    play: "Video abspielen",
  },

  // Die id verbindet den Eintrag mit seiner Logodatei; die Datei selbst steht
  // in der Komponente, weil Pfad und Maße nicht übersetzt werden.
  trusted: {
    label: "Ausgezeichnet von & bekannt aus",
    items: [
      { id: "bwki", name: "Bundeswettbewerb Künstliche Intelligenz", note: "Juniorpreis 2023" },
      { id: "swr", name: "SWR", note: "Fernsehen" },
      { id: "jufo", name: "Jugend forscht Baden-Württemberg", note: "2 Sonderpreise 2024" },
      { id: "gea", name: "Reutlinger General-Anzeiger", note: "Presse" },
      { id: "dasding", name: "DASDING", note: "Radio" },
      { id: "tagblatt", name: "Schwäbisches Tagblatt", note: "Presse" },
      { id: "swp", name: "Südwest Presse", note: "Presse" },
      { id: "tflit", name: "TFLIT", note: "Projektfamilie" },
    ],
  },

  showcase: {
    line1: "Sieben Größen.",
    line2: "Alle 60 Sekunden.",
    videoAlt: "Zeitraffer eines kompletten Kresse-Wachstumszyklus",
    playLabel: "Zeitraffer abspielen",
    pauseLabel: "Zeitraffer pausieren",
    columns: [
      {
        title: "Für den Unterricht",
        body: "Ein kompletter Datensatz aus 8.182 Messreihen — genug für eine ganze Reihe zu Messtechnik, Statistik und maschinellem Lernen.",
      },
      {
        title: "Für Forschung",
        body: "Standardisierte Aussaat mit exakt 10 Gramm Samen macht Zyklen vergleichbar. Rohdaten, Firmware und Netz liegen offen.",
      },
      {
        title: "Für Selbstbauer",
        body: "Schaltplan und Platinen-Layout als PDF, Firmware auf GitHub. Die Platine basiert auf einem ESP32-S3 — nachbaubar ohne Speziallabor.",
      },
    ],
  },

  platform: {
    line1: "Eine offene Plattform",
    line2: "für Pflanzendaten",
    cards: {
      sensors: {
        title: "Modulare Sensorik",
        body: "Temperatur, Luftdruck, Luftfeuchte und Gaswerte über einen BME680, dazu CO₂, Bodenfeuchte und Helligkeit über eigene Kanäle.",
      },
      pcb: {
        title: "Selbst entworfen,",
        title2: "dreimal verbessert",
        body: "Data Collector v3.0: ESP32-S3, BME680, USB-C. Der Name steht im Platinendruck.",
        imgAlt: "3D-Rendering der Data-Collector-Platine Version 3.0",
      },
      cadence: {
        title: "Messung im",
        title2: "Minutentakt",
        body: "Jeder Wert landet auf SD-Karte und in der Cloud — lückenlos über den ganzen Zyklus.",
      },
      open: {
        rest: "Offen auf GitHub",
        title: "Alles offen",
        body: "Platinendesign, Firmware, das neuronale Netz und ein kompletter Beispieldatensatz — öffentlich einsehbar und nachnutzbar.",
      },
      standard: {
        title: "Standardisierte Aussaat",
        body: "Immer exakt 10 Gramm Samen, immer dieselbe Schale, immer derselbe Takt. Nur so lassen sich zwei Zyklen ehrlich vergleichen — und nur so lernt das Netz aus echten Unterschieden statt aus Zufall.",
      },
      runtime: {
        rest: "Läuft im Dauerbetrieb",
        title: "5,7 Tage am Stück",
        body: "Ein protokollierter Kresse-Zyklus dauert rund 5,7 Tage. Die Platine misst durch — ohne Betreuung, ohne Lücke.",
      },
    },
  },

  useCases: {
    line1: "Wo Messdaten",
    line2: "Wurzeln schlagen",
    items: [
      { label1: "Unterricht", label2: "& Schule", tone: "azure" },
      { label1: "Hochbeet", label2: "& Balkon", tone: "wheat" },
      { label1: "Forschung", label2: "& Studium", tone: "clay" },
      { label1: "Vertical", label2: "Farming", tone: "leaf" },
    ],
  },

  highlight: {
    qualifier: "bis zu",
    figure: "25 %",
    line1: "mehr Ertrag durch die",
    line2: "optimale Wassermenge",
    body: "Ermittelt in Versuchsreihen: verschiedene Wassermengen, jede Ernte auf der Küchenwaage gewogen, Zyklus für Zyklus verglichen. Klassische Versuchsarbeit — nicht das neuronale Netz.",
    stats: [
      { value: "8.182", label: "Messreihen je Zyklus" },
      { value: "60 s", label: "Messintervall" },
      { value: "7", label: "erfasste Größen" },
      { value: "3", label: "Platinen-Generationen" },
    ],
  },

  faq: {
    heading: "Häufige Fragen",
    items: [
      {
        q: "Was ist Botanical Bytes?",
        a: "Ein Schülerforschungsprojekt, gestartet 2023 für den Bundeswettbewerb Künstliche Intelligenz. Wir machen Pflanzenwachstum messbar — mit selbst entwickelten Sensorplatinen, standardisierten Aussaaten und einem neuronalen Netz.",
      },
      {
        q: "Steuert die KI schon die Bewässerung?",
        a: "Nein — noch nicht. Unser aktuelles Netz sagt die Luftfeuchte aus den übrigen Sensordaten voraus. Die Echtzeit-Steuerung der Bewässerung ist unser erklärtes Ziel und steht auf der Roadmap.",
      },
      {
        q: "Woher kommen die 25 % mehr Ertrag?",
        a: "Aus Experimenten mit der Wassermenge: verschiedene Mengen getestet, die Ernte auf einer Küchenwaage gewogen, die optimale Menge ermittelt. Das war klassische Versuchsarbeit — nicht das neuronale Netz.",
      },
      {
        q: "Warum ausgerechnet Kresse?",
        a: "Weil sie schnell wächst. Ein protokollierter Zyklus dauert rund 5,7 Tage und liefert bei Messungen im Minutentakt 8.182 Messreihen über sechs aufgezeichnete Sensorkanäle. Außerdem testen wir Radieschen-Microgreens.",
      },
      {
        q: "Kann ich die Platine nachbauen?",
        a: "Ja. Schaltplan und Platinen-Layout liegen als PDF bereit, die Firmware auf GitHub. Grundlage ist ein ESP32-S3 mit BME680 und USB-C.",
      },
      {
        q: "Ist das Projekt Open Source?",
        a: "Ja. Platinendesign, Firmware, das neuronale Netz und ein kompletter Beispieldatensatz liegen offen auf GitHub.",
      },
    ],
  },

  about: {
    line1: "Zwei Schüler,",
    line2: "drei Jahre Messreihen",
    badge1: "Entworfen in Tübingen.",
    badge2: "Gebaut im Kinderzimmer.",
    cta: "Code auf GitHub ansehen",
    imgAlt:
      "Tillmann und Finn im Fotostudio mit Anzuchtschale und Sensorplatine",
    milestones: [
      { year: "2023", text: "Juniorpreis beim Bundeswettbewerb KI" },
      { year: "2024", text: "Finale in Tübingen mit dem Plant Growth Optimizer" },
      { year: "2024", text: "Zwei Sonderpreise beim Landeswettbewerb Jugend forscht" },
    ],
  },

  gallery: {
    line1: "Echte Kresse,",
    line2: "echte Daten",
    alts: [
      "Aussaat: exakt 10 Gramm Kressesamen werden verteilt",
      "Anzuchtschale im Gewächshaus mit Prototyp-Elektronik",
      "Kresse an Tag 1 des Zyklus",
      "Kresse an Tag 2 des Zyklus",
      "Kresse an Tag 3 des Zyklus",
      "Kresse an Tag 4 des Zyklus",
      "Kresse an Tag 5 des Zyklus",
      "Ausgewachsene Kresse in der Anzuchtschale",
      "Der Ertrag wird auf einer Küchenwaage gewogen",
      "Exakt 10 Gramm Kressesamen auf der Waage",
      "Nahaufnahme junger Kressepflanzen im Gegenlicht",
      "Der Messestand beim BWKI-Finale",
    ],
  },

  build: {
    heading: "Bau dir deins",
    note: "Platine, Firmware und Datensatz — alles offen",
    cta: "Zum Repository",
    newsletterHeading: "Neues aus dem Gewächshaus",
    newsletterBody:
      "Ein paar Mal im Jahr: neue Platinengeneration, neue Messreihen, neue Ergebnisse.",
  },

  footer: {
    tagline:
      "Botanical Bytes macht Pflanzenwachstum messbar — mit eigener Sensorik, offenen Daten und einem neuronalen Netz.",
    origin1: "Entworfen in Tübingen.",
    origin2: "Gebaut im Kinderzimmer.",
    colProject: "Projekt",
    colAbout: "Über uns",
    colLegal: "Rechtliches",
    linkPlatform: "Plattform",
    linkUseCases: "Einsatz",
    linkFaq: "FAQ",
    linkGithub: "GitHub",
    linkSchematic: "Schaltplan (PDF)",
    linkPcb: "Platinen-Layout (PDF)",
    linkTflit: "TFLIT",
    linkClassic: "Klassische Startseite",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    copyright: "© 2026 Botanical Bytes",
  },
};

export const studioEn: typeof studioDe = {
  nav: {
    skip: "Skip to content",
    home: "Botanical Bytes – home",
    items: [
      { href: "#plattform", label: "Platform" },
      { href: "#einsatz", label: "Use cases" },
      { href: "#projekt", label: "Project" },
      { href: "#faq", label: "FAQ" },
    ],
    cta: "Updates",
    localeSwitch: "switch to the German version",
    menu: "Menu",
    close: "Close menu",
  },

  hero: {
    line1: "Measurable, open, tireless.",
    line2: "Plant data for everyone.",
    videoAlt:
      "Camera moving through a sunlit greenhouse towards a tray of young cress",
    pause: "Pause video",
    play: "Play video",
  },

  trusted: {
    label: "Awarded by & featured in",
    items: [
      { id: "bwki", name: "Bundeswettbewerb Künstliche Intelligenz — the German national AI competition", note: "Junior prize 2023" },
      { id: "swr", name: "SWR", note: "Television" },
      { id: "jufo", name: "Jugend forscht Baden-Württemberg", note: "2 special prizes 2024" },
      { id: "gea", name: "Reutlinger General-Anzeiger", note: "Press" },
      { id: "dasding", name: "DASDING", note: "Radio" },
      { id: "tagblatt", name: "Schwäbisches Tagblatt", note: "Press" },
      { id: "swp", name: "Südwest Presse", note: "Press" },
      { id: "tflit", name: "TFLIT", note: "Project family" },
    ],
  },

  showcase: {
    line1: "Seven quantities.",
    line2: "Every 60 seconds.",
    videoAlt: "Timelapse of a full cress growth cycle",
    playLabel: "Play timelapse",
    pauseLabel: "Pause timelapse",
    columns: [
      {
        title: "For the classroom",
        body: "A complete dataset of 8,182 measurement series — enough for a full unit on sensing, statistics and machine learning.",
      },
      {
        title: "For research",
        body: "Standardised sowing with exactly 10 grams of seed makes cycles comparable. Raw data, firmware and the network are all open.",
      },
      {
        title: "For makers",
        body: "Schematic and board layout as PDFs, firmware on GitHub. The board is built around an ESP32-S3 — no special lab required.",
      },
    ],
  },

  platform: {
    line1: "An open platform",
    line2: "for plant data",
    cards: {
      sensors: {
        title: "Modular sensing",
        body: "Temperature, air pressure, humidity and gas readings via a BME680, plus CO₂, soil moisture and light on dedicated channels.",
      },
      pcb: {
        title: "Designed ourselves,",
        title2: "revised three times",
        body: "Data Collector v3.0: ESP32-S3, BME680, USB-C. The name is printed right on the board.",
        imgAlt: "3D render of the Data Collector board version 3.0",
      },
      cadence: {
        title: "A reading",
        title2: "every minute",
        body: "Every value lands on the SD card and in the cloud — without a gap across the whole cycle.",
      },
      open: {
        rest: "Open on GitHub",
        title: "All of it open",
        body: "Board design, firmware, the neural network and a complete sample dataset — public and free to reuse.",
      },
      standard: {
        title: "Standardised sowing",
        body: "Always exactly 10 grams of seed, always the same tray, always the same cadence. It is the only honest way to compare two cycles — and the only way the network learns from real differences rather than noise.",
      },
      runtime: {
        rest: "Runs unattended",
        title: "5.7 days straight",
        body: "A logged cress cycle runs about 5.7 days. The board measures right through it — unattended, without a gap.",
      },
    },
  },

  useCases: {
    line1: "Where measurements",
    line2: "take root",
    items: [
      { label1: "Classroom", label2: "& school", tone: "azure" },
      { label1: "Raised bed", label2: "& balcony", tone: "wheat" },
      { label1: "Research", label2: "& study", tone: "clay" },
      { label1: "Vertical", label2: "farming", tone: "leaf" },
    ],
  },

  highlight: {
    qualifier: "up to",
    figure: "25 %",
    line1: "more yield from the",
    line2: "optimal amount of water",
    body: "Established through test series: different amounts of water, every harvest weighed on a kitchen scale, cycle compared against cycle. Classic experimental work — not the neural network.",
    stats: [
      { value: "8,182", label: "series per cycle" },
      { value: "60 s", label: "sampling interval" },
      { value: "7", label: "quantities captured" },
      { value: "3", label: "board generations" },
    ],
  },

  faq: {
    heading: "Frequently asked",
    items: [
      {
        q: "What is Botanical Bytes?",
        a: "A student research project, started in 2023 for the German national AI competition. We make plant growth measurable — with self-developed sensor boards, standardised sowing and a neural network.",
      },
      {
        q: "Does the AI already control watering?",
        a: "No — not yet. Our current network predicts humidity from the remaining sensor data. Real-time watering control is our stated goal and sits on the roadmap.",
      },
      {
        q: "Where does the 25 % more yield come from?",
        a: "From experiments with the amount of water: different amounts tested, each harvest weighed on a kitchen scale, the optimum determined. That was classic experimental work — not the neural network.",
      },
      {
        q: "Why cress of all things?",
        a: "Because it grows fast. A logged cycle runs about 5.7 days and, sampling every minute, yields 8,182 measurement series across six recorded sensor channels. We also test radish microgreens.",
      },
      {
        q: "Can I build the board myself?",
        a: "Yes. Schematic and board layout are available as PDFs, the firmware is on GitHub. It is built around an ESP32-S3 with a BME680 and USB-C.",
      },
      {
        q: "Is the project open source?",
        a: "Yes. Board design, firmware, the neural network and a complete sample dataset are openly available on GitHub.",
      },
    ],
  },

  about: {
    line1: "Two students,",
    line2: "three years of readings",
    badge1: "Designed in Tübingen.",
    badge2: "Built in a bedroom.",
    cta: "View the code on GitHub",
    imgAlt: "Tillmann and Finn in a photo studio with a seed tray and sensor board",
    milestones: [
      { year: "2023", text: "Junior prize at the German national AI competition" },
      { year: "2024", text: "Finals in Tübingen with the Plant Growth Optimizer" },
      { year: "2024", text: "Two special prizes at the Jugend forscht state finals" },
    ],
  },

  gallery: {
    line1: "Real cress,",
    line2: "real data",
    alts: [
      "Sowing: exactly 10 grams of cress seed being spread",
      "Seed tray in the greenhouse with prototype electronics",
      "Cress on day 1 of the cycle",
      "Cress on day 2 of the cycle",
      "Cress on day 3 of the cycle",
      "Cress on day 4 of the cycle",
      "Cress on day 5 of the cycle",
      "Fully grown cress in the seed tray",
      "The harvest being weighed on a kitchen scale",
      "Exactly 10 grams of cress seed on the scale",
      "Close-up of young cress plants backlit",
      "The stand at the national AI competition finals",
    ],
  },

  build: {
    heading: "Build your own",
    note: "Board, firmware and dataset — all open",
    cta: "Go to the repository",
    newsletterHeading: "News from the greenhouse",
    newsletterBody:
      "A few times a year: a new board generation, new measurement series, new results.",
  },

  footer: {
    tagline:
      "Botanical Bytes makes plant growth measurable — with our own sensing, open data and a neural network.",
    origin1: "Designed in Tübingen.",
    origin2: "Built in a bedroom.",
    colProject: "Project",
    colAbout: "About",
    colLegal: "Legal",
    linkPlatform: "Platform",
    linkUseCases: "Use cases",
    linkFaq: "FAQ",
    linkGithub: "GitHub",
    linkSchematic: "Schematic (PDF)",
    linkPcb: "Board layout (PDF)",
    linkTflit: "TFLIT",
    linkClassic: "Classic home page",
    impressum: "Imprint",
    datenschutz: "Privacy",
    copyright: "© 2026 Botanical Bytes",
  },
};

export type Studio = typeof studioDe;

export function getStudio(locale: Locale): Studio {
  return locale === "en" ? studioEn : studioDe;
}
