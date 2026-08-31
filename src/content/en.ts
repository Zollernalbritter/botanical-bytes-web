import type { Dictionary } from "./types";

export const en: Dictionary = {
  locale: "en",
  meta: {
    title: "Botanical Bytes — Making plant growth measurable",
    description:
      "Student research project from Tübingen: self-built sensor boards, a neural network, and minute-by-minute data. BWKI Junior Prize 2023, BWKI Finalist 2024.",
    ogLocale: "en_US",
  },
  nav: {
    skip: "Skip to content",
    home: "Botanical Bytes — home",
    items: [
      { href: "#technik", label: "Technology" },
      { href: "#faq", label: "FAQ" },
    ],
    github: "GitHub",
    contact: "Contact",
    contactHref: "#kontakt",
    localeSwitch: "switch to the German version",
  },
  press: {
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
  hero: {
    headline1: "Plants don't talk.",
    headline2: "Our sensors do.",
    sub: "Botanical Bytes makes growth measurable",
    videoAlt: "Camera following a researcher through a sunlit greenhouse; two colleagues examine seedling trays in the background",
    chips: [
      "Logged 21.8 °C air temperature",
      "Measured humidity at 64%",
      "Checked soil moisture",
      "Synced readings to the cloud",
      "Captured photo of day 3",
      "Stored 8,182 data rows",
      "Logged 986 hPa air pressure",
      "Next reading in 60 seconds",
    ],
    emailPlaceholder: "Your email",
    emailButton: "Get updates",
    emailLegal: "Double opt-in, no spam. By submitting you agree to storage —",
    emailLegalLink: "privacy policy",
    pause: "Pause video",
    play: "Play video",
  },
  stack: {
    heading1: "AI that understands",
    heading2: "the greenhouse",
    prompt: "Ask the dataset",
    items: [
      {
        title1: "Botanical Bytes measures",
        title2: "around the clock",
        body: "Temperature, humidity, CO₂, light, and soil moisture — every 60 seconds, to an SD card and the cloud.",
        mediaAlt: "Backlit close-up of young cress seedlings",
        uiTitle: "Botanical Bytes measuring …",
        uiRow: "Writing data row #8,182",
        uiValue: "21.8 °C",
      },
      {
        title1: "Keeps you",
        title2: "in the loop",
        body: "Follow every cycle live and step in only where a reading falls outside the expected range.",
        mediaAlt: "Microgreens on day three of the cycle",
        uiTitle: "Cycle 12 running",
        uiRow: "Day 3 of 6 · next reading",
        uiValue: "60 s",
      },
      {
        title1: "And answers",
        title2: "your questions",
        body: "How did cycle 12 compare? How much water was optimal? The dataset is public — just ask it.",
        mediaAlt: "Fully grown cress in the seed tray",
        uiTitle: "Dataset",
        uiRow: "8,182 data rows loaded",
        uiValue: "ready",
      },
    ],
  },
  orbit: {
    stat: "25%",
    statLine1: "more yield through the",
    statLine2: "optimal amount of water",
    beat1: "The more cycles we measure,",
    beat2: "the less we have to guess.",
    cards: [
      {
        title: "Cycle 12 complete",
        rows: [
          { label: "Yield", value: "+25%" },
          { label: "Water", value: "optimized" },
        ],
      },
      {
        title: "Weekly review",
        rows: [
          { label: "Data rows", value: "8,182" },
          { label: "Sensor channels", value: "6" },
          { label: "Outliers", value: "3" },
        ],
      },
      {
        title: "Training …",
        rows: [
          { label: "Epoch", value: "940 / 1000" },
          { label: "Error", value: "falling" },
        ],
      },
    ],
  },
  trust: {
    heading1: "Open to everyone.",
    heading2: "Rebuildable anywhere.",
    note: "Board design, firmware, the neural network, and a complete sample dataset are all on GitHub.",
  },
  // `logo` verweist auf die Datei in public/logos, `year` steht sichtbar
  // daneben. `org` bleibt der volle Name — er trägt die Beschriftung des
  // Logos für Screenreader, denn eine Silhouette lässt sich nicht vorlesen.
  milestones: {
    heading1: "Three years.",
    heading2: "Three milestones.",
    items: [
      {
        quote: "Junior Prize at Germany's national AI competition.",
        name: "Tillmann & Finn",
        org: "BWKI 2023",
        logo: "bwki",
        year: "2023",
        imgAlt: "Tillmann and Finn in the photo studio with a seed tray and a PCB",
      },
      {
        quote: "Finalists in Tübingen with the Plant Growth Optimizer.",
        name: "Tillmann & Finn",
        org: "BWKI 2024",
        logo: "bwki",
        year: "2024",
        imgAlt: "The team's booth at the BWKI finals with seed trays and sensors",
      },
      {
        quote: "Two special awards at the Jugend forscht state competition.",
        name: "Tillmann & Finn",
        org: "Jugend forscht 2024",
        logo: "jufo",
        year: "2024",
        imgAlt: "Tillmann and Finn at their booth at the Jugend forscht state competition",
      },
    ],
    outro: "Behind it all: Tillmann Lang and Finn Paparisto from Tübingen.",
    pressLine: "As seen in: SWR · Reutlinger General-Anzeiger · DASDING",
  },
  how: {
    heading: "How Botanical Bytes works",
    steps: [
      {
        title: "Measures every minute",
        body: "The Data Collector board sits under the seed tray and records seven variables — from temperature to soil moisture.",
        pill: "Sensors connected",
        top: { title: "Data Collector v3.0", label: "BME680", value: "21.8 °C" },
        rows: [
          { label: "Humidity", value: "64%" },
          { label: "Soil moisture", value: "38%" },
          { label: "CO₂", value: "812 ppm" },
        ],
      },
      {
        title: "Learns from every cycle",
        body: "Standardized sowings — always exactly 10 grams of seed — make cycles comparable. The neural network learns how they relate.",
        pill: "Cycle comparable",
        top: { title: "Sowing cycle 12", label: "Cress seed", value: "10.0 g" },
        rows: [
          { label: "Data rows", value: "8,182" },
          { label: "Duration", value: "5.7 days" },
          { label: "Epoch", value: "940 / 1000" },
        ],
      },
      {
        title: "Finds the right amount of water",
        body: "The data yields the optimal amount of water. The result: up to 25% more yield — and a system that gets smarter with every cycle.",
        pill: "Yield weighed",
        top: { title: "Experiment 12", label: "Water", value: "optimized" },
        rows: [
          { label: "Yield", value: "+25%" },
          { label: "Reference", value: "cycle 8" },
          { label: "Next cycle", value: "planned" },
        ],
      },
    ],
  },
  tech: {
    heading: "The hardware in detail",
    intro: "Board design, firmware, network, and dataset — all open on GitHub.",
    pcb: {
      headline: "Self-designed. Improved three times.",
      body: "Our ESP32-S3-based Data Collector board measures temperature, air pressure, humidity, gas levels, CO₂, soil moisture, and brightness. The next generation adds pH and nutrient density — already designed, but it hadn't arrived by the 2024 deadline.",
      tabs: [
        {
          label: "Prototype",
          caption: "The beginning: breadboard electronics under the seed tray in the greenhouse.",
          alt: "Seed tray in the greenhouse with visible prototype electronics",
        },
        {
          label: "Board v2",
          caption: "Our own PCB: an SD-card logger with connectors for CO₂ and soil sensors.",
          alt: "3D render of an early Data Collector board",
        },
        {
          label: "v3.0",
          caption: "Plant Growth Optimizer v.3.0: ESP32-S3, BME680, and USB-C — the name is in the silkscreen.",
          alt: "3D render of the Data Collector board revision 3.0",
        },
      ],
      measuresLabel: "Seven measurements",
      measures: [
        { mark: "temperature", name: "Temperature", source: "BME680" },
        { mark: "pressure", name: "Air pressure", source: "BME680" },
        { mark: "humidity", name: "Humidity", source: "BME680" },
        { mark: "gas", name: "Gas levels", source: "BME680" },
        { mark: "co2", name: "CO₂", source: "Channel A3" },
        { mark: "soil", name: "Soil moisture", source: "XH-4AK" },
        { mark: "light", name: "Brightness", source: "TEMT6000" },
      ],
      planned: {
        mark: "planned",
        name: "pH · nutrient density",
        source: "Planned",
      },
      model: {
        label: "Data Collector v3.0",
        alt: "Rotatable 3D model of the Data Collector board v3.0 with ESP32-S3 module, microSD slot, USB-C socket, and sensor connectors",
        rotateHint: "Drag to rotate",
        rotateReset: "Reset the view",
        note: "3D model from the board design · 59.3 × 36.7 mm",
      },
      downloads: {
        label: "Plans as PDF:",
        schematic: "Schematic",
        pcb: "Board layout",
        github: "Firmware on GitHub",
      },
    },
  },
  seed: {
    headline: "Every seed counts. Literally.",
    body: "Using OpenCV edge detection we analyze how seeds are spaced — spacing affects germination. The analysis is still done by hand.",
    stages: [
      {
        mark: "camera",
        label: "Original",
        note: "As the camera sees it",
        alt: "Four clusters of cress seeds on cotton wool, unprocessed",
      },
      {
        mark: "edge-hard",
        label: "Canny",
        note: "Hard edge, clear outline",
        alt: "The same four clusters after Canny edge detection: bright outlines on black",
      },
      {
        mark: "edge-soft",
        label: "Sobel",
        note: "Soft gradient, edge direction",
        alt: "The same four clusters after Sobel edge detection: soft gradients on grey",
      },
    ],
  },
  faq: {
    heading: "FAQ",
    items: [
      {
        q: "What is Botanical Bytes?",
        a: "A student research project, started in 2023 for Germany's national AI competition (BWKI). We make plant growth measurable — with self-built sensor boards, standardized sowings, and a neural network.",
      },
      {
        q: "Does the AI control irrigation yet?",
        a: "No — not yet. Our current network predicts humidity from the other sensor channels. Real-time irrigation control is our stated goal and on the roadmap.",
      },
      {
        q: "Where does the 25% more yield come from?",
        a: "From experiments with the amount of water: we tested different amounts, weighed each harvest on a kitchen scale, and found the optimum. That was classic experimentation — not the neural network.",
      },
      {
        q: "Why cress, of all plants?",
        a: "Because it grows fast. One logged cycle takes about 5.7 days and yields 8,182 rows of minute-by-minute data across six recorded sensor channels. We also test radish microgreens.",
      },
      {
        q: "What exactly does the board measure?",
        a: "Temperature, air pressure, humidity, and gas levels (BME680), plus CO₂, soil moisture, and brightness. Every 60 seconds, to SD card and the cloud. The next board generation will add pH and nutrient density.",
      },
      {
        q: "Is the project open source?",
        a: "Yes. Board design, firmware, the neural network, and a full sample dataset are open on GitHub.",
      },
    ],
  },
  cta: {
    heading1: "News from the",
    heading2: "greenhouse.",
    imgAlt: "Backlit close-up of young cress seedlings",
  },
  newsletter: {
    label: "Email address",
    placeholder: "you@example.com",
    button: "Subscribe",
    loading: "Sending…",
    consentPre:
      "I agree that my email address will be stored to send the newsletter. Details in the",
    consentLinkLabel: "privacy policy",
    successConfirm: "Almost there. Please confirm your email.",
    confirmed: "Thanks! Your subscription is confirmed.",
    unsubscribed: "You're unsubscribed. Sad to see you go — welcome back anytime.",
    invalidToken: "This link is invalid or has expired. Please sign up again.",
    errInvalid: "That doesn't look like an email address.",
    errConsent: "Please confirm your consent.",
    errServer: "Something went wrong. Please try again later.",
    note: "No spam. Unsubscribe anytime.",
    confirmPage: {
      title: "Confirm your subscription",
      body: "One click and you're in: confirm that you'd like to receive the Botanical Bytes newsletter.",
      button: "Confirm now",
    },
    unsubPage: {
      title: "Unsubscribe from the newsletter",
      body: "Sad to see you go! One click and you won't get any more emails from us.",
      button: "Unsubscribe now",
    },
  },
  footer: {
    tagline1: "Making plant growth",
    tagline2: "measurable.",
    ctaLabel: "Get updates",
    colProject: "Project",
    colFamily: "Family",
    colLegal: "Legal",
    github: "GitHub",
    tech: "Technology",
    faq: "FAQ",
    tflit: "TFLIT",
    tflitUrl: "https://tflit.com/arbeiten/botanical-bytes",
    impressum: "Legal notice",
    datenschutz: "Privacy",
    copyright: "© 2026 Botanical Bytes. All rights reserved.\nA TFLIT family project, made in Tübingen.",
  },
  notFound: {
    headline: "Nothing grows here.",
    body: "This page doesn't exist — or not yet. Back to the cress?",
    cta: "Back to home",
  },
  impressum: {
    title: "Legal notice (Impressum)",
    note: "The German version is legally binding.",
    sections: [
      {
        h: "Information according to § 5 DDG",
        lines: [
          "TFL Holding UG (haftungsbeschränkt)",
          "Gölzstraße 12",
          "72072 Tübingen",
          "Germany",
        ],
      },
      { h: "Represented by", lines: ["Tillmann Lang, Managing Director"] },
      {
        h: "Register entry",
        lines: [
          "Entered in the commercial register",
          "Register court: Amtsgericht Stuttgart",
          "Register number: HRB 801753",
        ],
      },
      {
        h: "Contact",
        lines: ["Phone: +49 1511 4490016", "E-mail: info@tflit.com"],
      },
      {
        h: "Responsible for content according to § 18 (2) MStV",
        lines: ["Tillmann Lang", "Gölzstraße 12", "72072 Tübingen"],
      },
      {
        h: "EU dispute resolution",
        lines: [
          "The European Commission provides a platform for online dispute resolution: https://ec.europa.eu/consumers/odr",
          "You will find our e-mail address above in this legal notice.",
          "We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.",
        ],
      },
      {
        h: "Liability for content",
        lines: [
          "As a service provider we are responsible for our own content on these pages under the general laws, in accordance with § 7 (1) DDG. Under §§ 8 to 10 DDG, however, we are not obliged to monitor transmitted or stored third-party information, or to investigate circumstances that indicate unlawful activity.",
          "Obligations to remove or block the use of information under the general laws remain unaffected. Liability in this respect is only possible from the point in time at which we become aware of a specific infringement. If we become aware of such infringements, we will remove the content immediately.",
        ],
      },
      {
        h: "Liability for links",
        lines: [
          "Our website contains links to external third-party websites over whose content we have no influence. We therefore cannot accept any liability for this third-party content. The respective provider or operator of the linked pages is always responsible for their content.",
          "The linked pages were checked for possible legal violations at the time of linking. Unlawful content was not recognisable at that time. If we become aware of any infringements, we will remove such links immediately.",
        ],
      },
      {
        h: "Copyright",
        lines: [
          "The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator.",
          "Where the content on this page was not created by the operator, the copyrights of third parties are respected. Should you nevertheless become aware of a copyright infringement, please let us know.",
        ],
      },
    ],
    backHome: "Back to home",
  },
  datenschutz: {
    title: "Privacy policy",
    note: "The German version is legally binding.",
    sections: [
      {
        h: "Controller",
        lines: [
          "TFL Holding UG (haftungsbeschränkt)",
          "Gölzstraße 12, 72072 Tübingen, Germany",
          "Represented by Tillmann Lang, Managing Director",
          "Phone: +49 1511 4490016",
          "E-mail: info@tflit.com",
        ],
      },
      {
        h: "Hosting and server log files",
        lines: [
          "The website runs on a server operated by Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Germany. The server is located in the Falkenstein data centre in Germany; the data does not leave the European Union. A data processing agreement under Art. 28 GDPR is in place with Hetzner.",
          "When you open the website, the server infrastructure processes technically necessary connection data: IP address, date and time of the request, the address requested, the status code, the amount of data transferred and the identifier sent by your browser. The legal basis is our legitimate interest in secure and trouble-free operation under Art. 6 (1) (f) GDPR.",
          "We evaluate this connection data solely for technical operation and troubleshooting. It is not combined with other data and is deleted once it is no longer needed for that purpose.",
          "DNS resolution for tflit.com runs through Cloudflare. The page itself is served directly from our server — Cloudflare is not placed in front of the web server and does not see individual page views.",
          "We use no cookies, no web analytics and no tracking. Fonts, images and videos are served from our own server; no external fonts or content delivery networks are embedded.",
        ],
      },
      {
        h: "Contacting us",
        lines: [
          "If you contact us by e-mail or phone, we process your details solely to handle your enquiry. The legal basis is Art. 6 (1) (f) GDPR, or Art. 6 (1) (b) GDPR for contract-related enquiries. We delete the messages once the enquiry has been dealt with and no statutory retention periods apply.",
        ],
      },
      {
        h: "Newsletter",
        lines: [
          "Sign-up uses a double opt-in procedure: after entering your address you receive an e-mail with a confirmation link; only then is the address stored. If you do not confirm, nothing is stored — the link expires after 48 hours.",
          "For sending and for the recipient list we use Amazon Simple Email Service provided by Amazon Web Services EMEA SARL, 38 Avenue John F. Kennedy, 1855 Luxembourg. Processing takes place in the Frankfurt region. A data processing agreement (AWS GDPR Data Processing Addendum) is in place.",
          "We store your e-mail address, the time of your confirmation and the language you chose. The timestamp serves as proof of your consent under Art. 7 (1) GDPR.",
          "The legal basis is your consent under Art. 6 (1) (a) GDPR. You can withdraw it at any time via the unsubscribe link at the end of every e-mail; the address is then deleted. Until then we store it in order to send you the newsletter.",
          "Our e-mails contain no tracking pixels. We measure neither whether you open a message nor whether you click a link in it.",
        ],
      },
      {
        h: "Your rights",
        lines: [
          "You have the right to obtain information about the data stored about you (Art. 15 GDPR), to have inaccurate data corrected (Art. 16 GDPR), to erasure (Art. 17 GDPR), to restriction of processing (Art. 18 GDPR) and to receive your data in a commonly used format (Art. 20 GDPR).",
          "You may object to processing based on a legitimate interest under Art. 21 GDPR. You can withdraw consent at any time with effect for the future (Art. 7 (3) GDPR); this does not affect the lawfulness of processing carried out before the withdrawal.",
          "An informal message to info@tflit.com is enough for all of this.",
          "Independently of that, you may lodge a complaint with a supervisory authority (Art. 77 GDPR). The authority responsible for us is the Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart, Germany.",
        ],
      },
      { h: "Last updated", lines: ["31 August 2026"] },
    ],
    backHome: "Back to home",
  },
};
