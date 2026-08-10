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
    localeSwitch: "switch to the German version",
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
  milestones: {
    heading1: "Three years.",
    heading2: "Three milestones.",
    items: [
      {
        quote: "Junior Prize at Germany's national AI competition.",
        name: "Tillmann & Finn",
        org: "BWKI 2023",
        imgAlt: "Tillmann and Finn in the photo studio with a seed tray and a PCB",
      },
      {
        quote: "Finalists in Tübingen with the Plant Growth Optimizer.",
        name: "Tillmann & Finn",
        org: "BWKI 2024",
        imgAlt: "The team's booth at the BWKI finals with seed trays and sensors",
      },
      {
        quote: "Two special awards at the Jugend forscht state competition.",
        name: "Tillmann & Finn",
        org: "Jugend forscht 2024",
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
      downloads: "Plans as PDF:",
      downloadSchematic: "Schematic",
      downloadPcb: "PCB layout",
    },
    seed: {
      headline: "Every seed counts. Literally.",
      body: "Using OpenCV edge detection we analyze how seeds are spaced — spacing affects germination. The analysis is still done by hand.",
      originalAlt: "Original photo of cress seeds on cotton wool",
      compareLabel: "Canny and Sobel compared",
      compareHint: "Drag the slider: Canny on the left, Sobel on the right",
      cannyAlt: "Canny edge detection of the seeds",
      sobelAlt: "Sobel edge detection of the seeds",
    },
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
    todoNote: "Placeholder — fill in before publishing. The German version is legally binding.",
    sections: [
      { h: "Information according to § 5 DDG", lines: ["[TODO: full name]", "[TODO: street and number]", "[TODO: postal code and city]"] },
      { h: "Contact", lines: ["[TODO: email address]"] },
      { h: "Responsible for content according to § 18 (2) MStV", lines: ["[TODO: name and address]"] },
    ],
    backHome: "Back to home",
  },
  datenschutz: {
    title: "Privacy policy",
    todoNote: "Placeholder structure — replace with reviewed text before publishing. The German version is legally binding.",
    sections: [
      { h: "Controller", lines: ["[TODO: name and contact details of the controller]"] },
      {
        h: "Hosting",
        lines: [
          "This website is hosted by Vercel Inc. [TODO: add notes on data processing, server logs, and standard contractual clauses]",
        ],
      },
      {
        h: "Newsletter",
        lines: [
          "Sign-up uses a double-opt-in process. We use the service Resend for sending. The legal basis is Art. 6 (1) (a) GDPR; consent can be withdrawn at any time via the unsubscribe link. [TODO: add full text]",
        ],
      },
      { h: "Your rights", lines: ["[TODO: list data-subject rights under the GDPR]"] },
      { h: "Last updated", lines: ["[TODO: date]"] },
    ],
    backHome: "Back to home",
  },
};
