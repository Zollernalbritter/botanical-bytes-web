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
    contact: "Kontakt",
    contactHref: "#kontakt",
    localeSwitch: "zur englischen Version wechseln",
  },
  // Presseband direkt unter dem Hero — dieselben Stationen wie in der
  // Bauklotz-Fassung. Die id verbindet den Eintrag mit seiner Logodatei;
  // der Pfad steht in der Komponente, weil er nicht übersetzt wird.
  //
  // `note` steht nur noch auf der Bauklotz-Seite (/v2) unter den Marken. Im
  // Band der Startseite ist die Zeile weg — dort tragen jetzt die Logos allein,
  // dafür deutlich größer. Der Schlüssel bleibt trotzdem, sonst bricht /v2.
  press: {
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
  hero: {
    headline1: "Pflanzen reden nicht.",
    headline2: "Unsere Sensoren schon.",
    sub: "Botanical Bytes macht Wachstum messbar",
    videoAlt: "Kamerafahrt hinter einer Forscherin her durch ein sonniges Gewächshaus; im Hintergrund begutachten zwei Kollegen Anzuchtschalen",
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
  stack: {
    heading1: "KI, die das",
    heading2: "Gewächshaus versteht",
    prompt: "Frag den Datensatz",
    items: [
      {
        title1: "Botanical Bytes misst",
        title2: "rund um die Uhr",
        body: "Temperatur, Luftfeuchte, CO₂, Licht und Bodenfeuchte – alle 60 Sekunden, auf SD-Karte und in die Cloud.",
        mediaAlt: "Nahaufnahme junger Kressepflanzen im Gegenlicht",
        uiTitle: "Botanical Bytes misst …",
        uiRow: "Messreihe #8.182 wird geschrieben",
        uiValue: "21,8 °C",
      },
      {
        title1: "Hält dich",
        title2: "im Bild",
        body: "Verfolge jeden Zyklus live und greif nur dort ein, wo eine Messreihe aus dem Rahmen fällt.",
        mediaAlt: "Microgreens am dritten Tag des Zyklus",
        uiTitle: "Zyklus 12 läuft",
        uiRow: "Tag 3 von 6 · nächste Messung",
        uiValue: "60 s",
      },
      {
        title1: "Und beantwortet",
        title2: "deine Fragen",
        body: "Wie lief Zyklus 12 im Vergleich? Wie viel Wasser war optimal? Der Datensatz liegt offen – frag ihn.",
        mediaAlt: "Ausgewachsene Kresse in der Anzuchtschale",
        uiTitle: "Datensatz",
        uiRow: "8.182 Messreihen geladen",
        uiValue: "bereit",
      },
    ],
  },
  orbit: {
    stat: "25 %",
    statLine1: "mehr Ertrag durch die",
    statLine2: "optimale Wassermenge",
    beat1: "Je mehr Zyklen wir messen,",
    beat2: "desto weniger müssen wir raten.",
    cards: [
      {
        title: "Zyklus 12 abgeschlossen",
        rows: [
          { label: "Ertrag", value: "+25 %" },
          { label: "Wassermenge", value: "optimiert" },
        ],
      },
      {
        title: "Wochenauswertung",
        rows: [
          { label: "Messreihen", value: "8.182" },
          { label: "Sensorkanäle", value: "6" },
          { label: "Ausreißer", value: "3" },
        ],
      },
      {
        title: "Training läuft …",
        rows: [
          { label: "Epoche", value: "940 / 1000" },
          { label: "Fehler", value: "sinkt" },
        ],
      },
    ],
  },
  trust: {
    heading1: "Offen für alle.",
    heading2: "Überall nachbaubar.",
    note: "Platinendesign, Firmware, das neuronale Netz und ein kompletter Beispieldatensatz liegen auf GitHub.",
  },
  // `logo` verweist auf die Datei in public/logos, `year` steht sichtbar
  // daneben. `org` bleibt der volle Name — er trägt die Beschriftung des
  // Logos für Screenreader, denn eine Silhouette lässt sich nicht vorlesen.
  milestones: {
    heading1: "Drei Jahre.",
    heading2: "Drei Meilensteine.",
    items: [
      {
        quote: "Juniorpreis beim Bundeswettbewerb Künstliche Intelligenz.",
        name: "Tillmann & Finn",
        org: "BWKI 2023",
        logo: "bwki",
        year: "2023",
        imgAlt: "Tillmann und Finn im Fotostudio mit Anzuchtschale und Platine",
      },
      {
        quote: "Mit dem Plant Growth Optimizer im Finale in Tübingen.",
        name: "Tillmann & Finn",
        org: "BWKI 2024",
        logo: "bwki",
        year: "2024",
        imgAlt: "Der Messestand beim BWKI-Finale mit Anzuchtschalen und Sensorik",
      },
      {
        quote: "Zwei Sonderpreise beim Landeswettbewerb Jugend forscht.",
        name: "Tillmann & Finn",
        org: "Jugend forscht 2024",
        logo: "jufo",
        year: "2024",
        imgAlt: "Tillmann und Finn am Stand beim Landeswettbewerb Jugend forscht",
      },
    ],
    outro: "Hinter allem: Tillmann Lang und Finn Paparisto aus Tübingen.",
    pressLine: "Bekannt aus: SWR · Reutlinger General-Anzeiger · DASDING",
  },
  how: {
    heading: "Wie Botanical Bytes arbeitet",
    steps: [
      {
        title: "Misst jede Minute",
        body: "Die Data-Collector-Platine sitzt unter der Anzuchtschale und erfasst sieben Größen – von Temperatur bis Bodenfeuchte.",
        pill: "Sensoren verbunden",
        top: { title: "Data Collector v3.0", label: "BME680", value: "21,8 °C" },
        rows: [
          { label: "Luftfeuchte", value: "64 %" },
          { label: "Bodenfeuchte", value: "38 %" },
          { label: "CO₂", value: "812 ppm" },
        ],
      },
      {
        title: "Lernt aus jedem Zyklus",
        body: "Standardisierte Aussaaten – immer exakt 10 Gramm Samen – machen Zyklen vergleichbar. Das neuronale Netz lernt die Zusammenhänge.",
        pill: "Zyklus vergleichbar",
        top: { title: "Aussaat Zyklus 12", label: "Kressesamen", value: "10,0 g" },
        rows: [
          { label: "Messreihen", value: "8.182" },
          { label: "Dauer", value: "5,7 Tage" },
          { label: "Epoche", value: "940 / 1000" },
        ],
      },
      {
        title: "Findet die richtige Wassermenge",
        body: "Aus den Daten wird die optimale Wassermenge. Das Ergebnis: bis zu 25 % mehr Ertrag – und ein System, das mit jedem Zyklus klüger wird.",
        pill: "Ertrag gewogen",
        top: { title: "Experiment 12", label: "Wassermenge", value: "optimiert" },
        rows: [
          { label: "Ertrag", value: "+25 %" },
          { label: "Referenz", value: "Zyklus 8" },
          { label: "Nächster Zyklus", value: "geplant" },
        ],
      },
    ],
  },
  // Prototyp-Sektion: derselbe Schaltplan in drei Lesarten — als Fluss, als
  // Originalplan, als fertige Platine. Die Knoten unten sind 1:1 die Bauteile
  // aus schematic.pdf, damit die Beschriftung überprüfbar bleibt.
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
      // ACHTUNG, derzeit unbenutzt: `tabs` trägt die Beschriftungen der drei
      // Platinen-Generationen. Seit die Prototyp-Sektion entfallen ist, zeigt
      // die Seite nur noch die dritte — als 3D-Modell. Die beiden Vorgänger
      // haben damit keinen Platz mehr.
      // Der Text bleibt stehen, bis entschieden ist, ob die Reihe „drei
      // Generationen, drei Jahre“ irgendwo wieder auftaucht. Gelöscht wäre er
      // weg, und er ist geschrieben.
      //
      // Die sieben Messgrößen stehen zwar schon im Fließtext, dort aber als
      // Aufzählung mitten im Satz. Als Tabelle mit dem jeweiligen Geber
      // dahinter sind sie nachschlagbar — und tragen die linke Spalte, die
      // ohne den Umschalter sonst halb leer bliebe.
      measuresLabel: "Sieben Messgrößen",
      // `mark` benennt das gezeichnete Instrument in MeasureMark.tsx.
      measures: [
        { mark: "temperature", name: "Temperatur", source: "BME680" },
        { mark: "pressure", name: "Luftdruck", source: "BME680" },
        { mark: "humidity", name: "Luftfeuchte", source: "BME680" },
        { mark: "gas", name: "Gaswerte", source: "BME680" },
        { mark: "co2", name: "CO₂", source: "Kanal A3" },
        { mark: "soil", name: "Bodenfeuchte", source: "XH-4AK" },
        { mark: "light", name: "Helligkeit", source: "TEMT6000" },
      ],
      // Die vierte Generation steht als achte, gedämpfte Zeile in derselben
      // Liste: was kommt, gehört neben das, was misst — nicht in einen Kasten
      // daneben.
      planned: {
        mark: "planned",
        name: "pH-Wert · Nährstoffdichte",
        source: "Geplant",
      },
      // Die dritte Generation als drehbares Modell, gewandelt aus dem
      // EasyEDA-Export. Der Export trägt nur Flächenfarben: Leiterbahnen und
      // Bestückungsdruck fehlen im Modell und stehen deshalb im Hinweis.
      model: {
        label: "Data Collector v3.0",
        alt: "Drehbares 3D-Modell der Data-Collector-Platine v3.0 mit ESP32-S3-Modul, microSD-Steckplatz, USB-C-Buchse und Sensoranschlüssen",
        rotateHint: "Ziehen zum Drehen",
        rotateReset: "Ansicht zurücksetzen",
        note: "3D-Modell aus dem Platinenentwurf · 59,3 × 36,7 mm",
      },
      // Die Pläne standen bisher unter der Prototyp-Sektion. Die ist entfallen,
      // die PDFs bleiben — sie sind der eigentliche Beleg für „alles offen“.
      downloads: {
        label: "Pläne als PDF:",
        schematic: "Schaltplan",
        pcb: "Platinen-Layout",
        github: "Firmware auf GitHub",
      },
    },
  },
  seed: {
    headline: "Jeder Samen zählt. Wörtlich.",
    body: "Mit OpenCV-Kantenerkennung analysieren wir, wie die Samen zueinander liegen – der Abstand beeinflusst die Keimung. Die Auswertung läuft noch von Hand.",
    // Drei Kacheln, drei Verfahren, EIN Ausschnitt. Vorher zeigte jede Stufe
    // ein anderes Drittel des Fotos — nebeneinander verglich man dadurch nicht
    // die Verfahren, sondern drei Stellen der Schale.
    stages: [
      {
        mark: "camera",
        label: "Original",
        note: "Wie die Kamera es sieht",
        alt: "Vier Nester Kressesamen auf Watte, unbearbeitet",
      },
      {
        mark: "edge-hard",
        label: "Canny",
        note: "Harte Kante, klarer Umriss",
        alt: "Dieselben vier Nester nach Canny-Kantenerkennung: helle Umrisse auf Schwarz",
      },
      {
        mark: "edge-soft",
        label: "Sobel",
        note: "Weicher Verlauf, Richtung der Kante",
        alt: "Dieselben vier Nester nach Sobel-Kantenerkennung: weiche Verläufe auf Grau",
      },
    ],
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
    ctaLabel: "Updates erhalten",
    colProject: "Projekt",
    colFamily: "Familie",
    colLegal: "Rechtliches",
    github: "GitHub",
    tech: "Technik",
    faq: "FAQ",
    tflit: "TFLIT",
    tflitUrl: "https://tflit.com/arbeiten/botanical-bytes",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    copyright: "© 2026 Botanical Bytes. Alle Rechte vorbehalten.\nEin Projekt der TFLIT-Familie, made in Tübingen.",
  },
  notFound: {
    headline: "Hier wächst nichts.",
    body: "Diese Seite gibt es nicht – oder noch nicht. Zurück zur Kresse?",
    cta: "Zur Startseite",
  },
  // Betreiberangaben von tflit.com übernommen — Botanical Bytes läuft unter
  // demselben Träger. Zwei Abweichungen zur Quelle sind Absicht:
  //
  // 1. Die Haftungsabschnitte zitieren das DDG, nicht das TMG. Das
  //    Telemediengesetz ist im Mai 2024 vom Digitale-Dienste-Gesetz abgelöst
  //    worden; die Paragrafen sind inhaltsgleich, aber die alte Fundstelle
  //    gibt es nicht mehr.
  // 2. Die Verantwortlichkeit steht nach § 18 Abs. 2 MStV statt § 55 Abs. 2
  //    RStV — der Rundfunkstaatsvertrag ist seit November 2020 durch den
  //    Medienstaatsvertrag ersetzt.
  impressum: {
    title: "Impressum",
    todoNote: "Es fehlt noch die E-Mail-Adresse.",
    sections: [
      {
        h: "Angaben gemäß § 5 DDG",
        lines: [
          "TFL Holding UG (haftungsbeschränkt)",
          "Gölzstraße 12",
          "72072 Tübingen",
          "Deutschland",
        ],
      },
      { h: "Vertreten durch", lines: ["Tillmann Lang, Geschäftsführer"] },
      {
        h: "Registereintrag",
        lines: [
          "Eingetragen im Handelsregister",
          "Registergericht: Amtsgericht Stuttgart",
          "Registernummer: HRB 801753",
        ],
      },
      {
        h: "Kontakt",
        lines: ["Telefon: +49 1511 4490016", "E-Mail: [TODO: E-Mail-Adresse]"],
      },
      {
        h: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        lines: ["Tillmann Lang", "Gölzstraße 12", "72072 Tübingen"],
      },
      {
        h: "EU-Streitschlichtung",
        lines: [
          "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: https://ec.europa.eu/consumers/odr",
          "Unsere E-Mail-Adresse finden Sie oben in diesem Impressum.",
          "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        ],
      },
      {
        h: "Haftung für Inhalte",
        lines: [
          "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
          "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
        ],
      },
      {
        h: "Haftung für Links",
        lines: [
          "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
          "Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
        ],
      },
      {
        h: "Urheberrecht",
        lines: [
          "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
          "Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie dennoch auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.",
        ],
      },
    ],
    backHome: "Zurück zur Startseite",
  },
  // Der Verantwortliche ist derselbe wie im Impressum — das ist keine
  // Auslegungsfrage, sondern folgt daraus. Die übrigen Abschnitte bleiben
  // bewusst als Lücke stehen: Hosting hängt am Betreibermodell (Coolify auf
  // welchem Server, in welchem Land), und Betroffenenrechte gehören von
  // jemandem geschrieben, der dafür geradesteht. Erfundene Angaben wären hier
  // schlimmer als sichtbar fehlende.
  datenschutz: {
    title: "Datenschutzerklärung",
    todoNote: "Hosting, Betroffenenrechte und Stand fehlen noch.",
    sections: [
      {
        h: "Verantwortlicher",
        lines: [
          "TFL Holding UG (haftungsbeschränkt)",
          "Gölzstraße 12, 72072 Tübingen, Deutschland",
          "Vertreten durch Tillmann Lang, Geschäftsführer",
          "Telefon: +49 1511 4490016",
          "E-Mail: [TODO: E-Mail-Adresse]",
        ],
      },
      {
        h: "Hosting",
        lines: [
          "[TODO: Hostinganbieter, Standort der Server, Auftragsverarbeitungsvertrag, Server-Logfiles und Speicherdauer ergänzen]",
        ],
      },
      {
        h: "Newsletter",
        lines: [
          "Die Anmeldung erfolgt im Double-Opt-in-Verfahren: Nach dem Eintragen erhalten Sie eine E-Mail mit einem Bestätigungslink; erst danach ist die Adresse gespeichert. Für den Versand nutzen wir Amazon Simple Email Service (Amazon Web Services, Region Frankfurt).",
          "Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können sie jederzeit über den Abmeldelink am Ende jeder E-Mail widerrufen; die Adresse wird dann gelöscht.",
          "[TODO: Auftragsverarbeitung mit Amazon Web Services (AWS DPA), Speicherdauer und Protokollierung der Einwilligung ergänzen]",
        ],
      },
      {
        h: "Ihre Rechte",
        lines: ["[TODO: Betroffenenrechte nach DSGVO aufführen]"],
      },
      { h: "Stand", lines: ["[TODO: Datum]"] },
    ],
    backHome: "Zurück zur Startseite",
  },
};
