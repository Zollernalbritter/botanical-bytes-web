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
    videoAlt: "Camera gliding through a sunlit greenhouse toward a tray of young cress",
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
  features: {
    heading1: "Measure, learn,",
    heading2: "grow.",
    blocks: [
      {
        title: "Measures around the clock",
        body: "Every 60 seconds, our self-built board records temperature, humidity, CO₂, light, and soil moisture — to an SD card and the cloud.",
        mediaAlt: "Time-lapse of a cress growing cycle",
        card: {
          title: "Data Collector v3.0",
          rows: [
            { label: "Temperature", value: "21.8 °C" },
            { label: "Humidity", value: "64%" },
            { label: "Next reading", value: "60 s" },
          ],
        },
      },
      {
        title: "Learns from every cycle",
        body: "One growing cycle yields 8,182 data rows across six channels. Our neural network learns how the conditions relate.",
        mediaAlt: "Seed tray in the greenhouse with visible prototype electronics",
        card: {
          title: "Training …",
          rows: [
            { label: "Epoch", value: "940 / 1000" },
            { label: "Data points", value: "8,182" },
            { label: "Error", value: "falling ✓" },
          ],
        },
      },
      {
        title: "Finds the right amount of water",
        body: "Through experiments we determined the optimal amount of water — weighed on a kitchen scale, cycle by cycle. The goal: real-time recommendations.",
        mediaAlt: "Weighing the cress harvest on a kitchen scale",
        card: {
          title: "Experiment 12",
          rows: [
            { label: "Sowing", value: "10 g cress" },
            { label: "Water", value: "optimized" },
            { label: "Yield", value: "+25% ✓" },
          ],
        },
      },
    ],
  },
  collage: {
    qualifier: "up to",
    big: "25%",
    line1: "more yield through the",
    line2: "optimal amount of water",
    sub1: "The more cycles we measure,",
    sub2: "the better we understand growth",
    cards: [
      { title: "Data row #4,211", rows: ["21.4 °C", "78% RH", "986 hPa"] },
      { title: "Harvest weighed", rows: ["Cycle 12", "+25% vs. reference"] },
    ],
    imgAlts: [
      "Backlit close-up of young cress seedlings",
      "Microgreens on day five of the cycle",
    ],
  },
  milestones: {
    heading1: "Three years.",
    heading2: "Three milestones.",
    items: [
      {
        quote: "Junior Prize at Germany's national AI competition.",
        meta: "2023 · as botanical_bytes",
        imgAlt: "Tillmann and Finn in the photo studio with a seed tray and a PCB",
      },
      {
        quote: "Finalists in Tübingen with the Plant Growth Optimizer.",
        meta: "2024 · BWKI",
        imgAlt: "The team's booth at the BWKI finals with seed trays and sensors",
      },
      {
        quote: "Two special awards at the Jugend forscht state competition.",
        meta: "2024 · Jugend forscht",
        imgAlt: "Tillmann and Finn at their Jugend forscht state competition booth",
      },
    ],
    outro: "Behind it all: Tillmann Lang and Finn Paparisto from Tübingen.",
    pressLine: "As featured in: SWR · Reutlinger General-Anzeiger · DASDING",
  },
  how: {
    heading: "How it works",
    steps: [
      {
        title: "Measure",
        body: "The Data Collector board sits beneath the seed tray and records seven quantities every minute — from temperature to soil moisture.",
        imgAlt: "3D render of the Data Collector board revision 3.0",
      },
      {
        title: "Learn",
        body: "Standardized sowings — always exactly 10 grams of seed — make cycles comparable. The neural network learns the relationships.",
        imgAlt: "Exactly 10 grams of cress seed on the scale",
      },
      {
        title: "Optimize",
        body: "The data yields the optimal amount of water. The result: up to 25% more yield — and a system that gets smarter with every cycle.",
        imgAlt: "Fully grown cress in the seed tray",
      },
    ],
    diagram: {
      ariaLabel:
        "Flow diagram: the board measures the plant every minute, the data trains the neural network — the recommendation is planned to flow back to the plant automatically",
      nodes: ["Plant", "Board", "Data", "Neural network", "Recommendation"],
      measureLabel: "every 60 seconds",
      loopLabel: "return loop planned",
    },
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
    githubCta: "View the code on GitHub",
    colProject: "Project",
    colLegal: "Legal",
    tflit: "TFLIT",
    tflitUrl: "https://tflit.com/en/arbeiten/botanical-bytes",
    github: "GitHub",
    impressum: "Legal notice",
    datenschutz: "Privacy",
    copyright: "© 2026 Botanical Bytes. Made in Tübingen.",
    family: "Part of the TFLIT family",
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
