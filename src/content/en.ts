import type { Dictionary } from "./types";

export const en: Dictionary = {
  locale: "en",
  meta: {
    title: "Botanical Bytes – Making plant growth measurable",
    description:
      "Student research project from Tübingen: self-built sensor boards, a neural network, and minute-by-minute data. BWKI Junior Prize 2023, BWKI Finalist 2024.",
    ogLocale: "en_US",
  },
  header: {
    skip: "Skip to content",
    nav: [
      { href: "#story", label: "Story" },
      { href: "#technik", label: "Technology" },
      { href: "#team", label: "Team" },
      { href: "#faq", label: "FAQ" },
    ],
    github: "GitHub",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menuLabel: "Menu",
    localeSwitch: "Switch language",
  },
  hero: {
    eyebrow: "A student research project from Tübingen",
    headline1: "Plants don't talk.",
    headline2: "Our sensors do.",
    sub: "Botanical Bytes makes plant cultivation measurable — with self-built sensor boards, a neural network, and thousands of data points per growing cycle.",
    ctaPrimary: "Explore the project",
    ctaGithub: "Code on GitHub",
    imgAlt: "Backlit close-up of young cress seedlings",
  },
  press: {
    eyebrow: "As featured in",
    ariaLabel: "Press and awards",
    outlets: ["SWR", "Reutlinger General-Anzeiger", "DASDING", "Bundeswettbewerb KI", "Jugend forscht"],
    awards: [
      "BWKI Junior Prize 2023",
      "BWKI Finalist 2024",
      "Jugend forscht 2024: Special Award of the Gesellschaft für Produktentwicklung",
      "Jugend forscht 2024: Interdisciplinary Special Award “Smart Methods in Agriculture”",
    ],
  },
  story: {
    eyebrow: "The story",
    headline: "It all started with 10 grams of cress.",
    paragraphs: [
      "In 2023 we entered Germany's national AI competition (BWKI) as botanical_bytes — and won the Junior Prize. In 2024, our follow-up project Plant Growth Optimizer made the finals in Tübingen.",
      "Our method is deliberately simple: exactly 10 grams of cress seed per sowing, on cotton wool or soil. A photo every day. At the end, the harvest goes on a kitchen scale.",
      "The conditions change. The measurement doesn't. That's what makes growing cycles comparable — minute by minute, cycle by cycle.",
    ],
    timeline: [
      { year: "2023", text: "BWKI Junior Prize as botanical_bytes" },
      { year: "2024", text: "BWKI finals in Tübingen with the Plant Growth Optimizer" },
      { year: "2024", text: "Two special awards at the Jugend forscht state competition" },
    ],
    img1Alt: "Measuring out exactly 10 grams of cress seed",
    img2Alt: "The team's booth at the BWKI finals with seed trays and sensors",
    daysHeading: "One cycle in five days",
    dayLabel: "Day",
    daysAlt: "Microgreens test series, day {n} of 5",
    videoHeading: "And in time-lapse",
    videoAlt: "Time-lapse of a cress growing cycle",
  },
  tech: {
    eyebrow: "The technology",
    headline: "Three building blocks. One goal.",
    intro: "Our own hardware, a neural network, and computer vision — all open on GitHub.",
    pcb: {
      headline: "Self-designed. Improved three times.",
      body: "Our ESP32-S3-based Data Collector board measures temperature, air pressure, humidity, gas levels, CO₂, soil moisture, and brightness. Every 60 seconds it logs to an SD card and to the cloud. The next generation adds pH and nutrient density — already designed, but it hadn't arrived by the 2024 deadline.",
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
    nn: {
      headline: "A small network. A big goal.",
      body: "Our Keras network (Dense 128 → 64 → 1) learns from the sensor data: it predicts humidity from the other channels. That's step one. The goal: a network that controls irrigation in real time. We're working on it.",
      codeCaption: "Real code from the repo — not a mockup.",
      dashboardAlt: "Dashboard showing recorded sensor data from a growing cycle",
      dashboardCaption: "The admin panel shows a cycle live.",
    },
    seed: {
      headline: "Every seed counts. Literally.",
      body: "Using OpenCV edge detection (Sobel and Canny), we analyze photos to see how seeds are spaced — because spacing affects germination. The analysis is still done by hand. Automation: on the roadmap.",
      originalAlt: "Original photo of cress seeds on cotton wool",
      compareLabel: "Canny and Sobel compared",
      compareHint: "Drag the slider: Canny on the left, Sobel on the right",
      cannyAlt: "Canny edge detection of the seeds",
      sobelAlt: "Sobel edge detection of the seeds",
    },
  },
  stats: {
    big: "Up to 25% more yield.",
    sub: "No magic. Just the experimentally determined, optimal amount of water. Weighed on a kitchen scale.",
    imgAlt: "Weighing the cress harvest on a kitchen scale",
    small: [
      { value: "8,182", label: "data rows per growing cycle" },
      { value: "60 s", label: "between two measurements" },
      { value: "3", label: "hardware generations" },
    ],
  },
  team: {
    eyebrow: "The team",
    headline: "Two minds. One greenhouse.",
    body: "Botanical Bytes is Tillmann Lang and Finn Paparisto. Brought together by the BWKI competition, grown together over cress. Botanical Bytes is part of the TFLIT family.",
    imgAlt: "Tillmann and Finn in the photo studio with a seed tray and a PCB",
    credit: "Photo: Ale Zea",
    tflitLabel: "More at TFLIT",
  },
  faq: {
    eyebrow: "FAQ",
    headline: "Good questions. Honest answers.",
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
  newsletter: {
    headline: "Cress grows fast. So does this project.",
    sub: "News from the greenhouse, straight to your inbox. Rare, but honest.",
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
    brandLine: "Botanical Bytes — part of the TFLIT family",
    tflitUrl: "https://tflit.com/en/arbeiten/botanical-bytes",
    github: "GitHub",
    impressum: "Legal notice",
    datenschutz: "Privacy",
    copyright: "© 2026 Botanical Bytes",
    tagline: "Built with real sensors and real cress.",
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
