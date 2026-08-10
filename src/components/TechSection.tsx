import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";
import { Eyebrow } from "./ui/Eyebrow";
import { Section } from "./ui/Section";
import { ImageCompare } from "./ImageCompare";
import { PcbTabs } from "./PcbTabs";
import { DownloadIcon } from "./ui/icons";

// Echter Trainingscode aus dem Projekt-Repo (Neural Network/main.py) —
// bewusst NICHT die Firmware (enthält Zugangsdaten).
const KERAS_SNIPPET = `model = Sequential()
model.add(Dense(128,
    input_dim=5,
    activation='relu'))
model.add(Dense(64,
    activation='relu'))
model.add(Dense(1,
    activation='linear'))
model.compile(
    loss='mean_squared_error',
    optimizer='adam',
    metrics=['mae'])`;

export function TechSection({ dict }: { dict: Dictionary }) {
  const t = dict.tech;
  const tabItems = [
    {
      ...t.pcb.tabs[0],
      image: images.greenhousePrototype,
      fit: "cover" as const,
      // Die Elektronik sitzt im unteren Bilddrittel des Hochformat-Fotos
      positionClass: "object-bottom",
    },
    { ...t.pcb.tabs[1], image: images.pcbV2, fit: "contain" as const },
    { ...t.pcb.tabs[2], image: images.pcbV3, fit: "contain" as const },
  ];

  return (
    <Section id="technik">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
        {t.headline}
      </h2>
      <p className="mt-3 max-w-xl text-ink/80">{t.intro}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-6">
        {/* Säule 1: Data Collector */}
        <div className="rounded-card bg-cream-soft p-6 shadow-card md:col-span-4 md:p-8">
          <h3 className="font-display text-2xl font-medium tracking-tight">
            {t.pcb.headline}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            {t.pcb.body}
          </p>
          <div className="mt-6">
            <PcbTabs items={tabItems} listLabel={t.pcb.headline} />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-sage-deep">{t.pcb.downloads}</span>
            <a
              href="/downloads/schematic.pdf"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-1.5 font-medium transition-colors hover:bg-sage/50"
            >
              <DownloadIcon className="size-4" />
              {t.pcb.downloadSchematic}
            </a>
            <a
              href="/downloads/pcb.pdf"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-1.5 font-medium transition-colors hover:bg-sage/50"
            >
              <DownloadIcon className="size-4" />
              {t.pcb.downloadPcb}
            </a>
          </div>
        </div>

        {/* Säule 2: Neuronales Netz — Code + Dashboard */}
        <div className="flex flex-col rounded-card bg-cream-soft p-6 shadow-card md:col-span-2 md:p-8">
          <h3 className="font-display text-2xl font-medium tracking-tight">
            {t.nn.headline}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">{t.nn.body}</p>
          <pre
            tabIndex={0}
            role="region"
            aria-label={t.nn.codeCaption}
            className="mt-5 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs leading-relaxed text-offwhite"
          >
            <code>{KERAS_SNIPPET}</code>
          </pre>
          <p className="mt-2 font-mono text-[11px] text-sage-deep">
            {t.nn.codeCaption}
          </p>
        </div>

        <figure className="rounded-card bg-cream-soft p-6 shadow-card md:col-span-2 md:p-8">
          <Image
            src={images.dashboard}
            alt={t.nn.dashboardAlt}
            sizes="(min-width: 768px) 320px, 100vw"
            className="w-full rounded-xl border border-ink/10"
          />
          <figcaption className="mt-3 text-sm text-sage-deep">
            {t.nn.dashboardCaption}
          </figcaption>
        </figure>

        {/* Säule 3: Edge Detection */}
        <div className="rounded-card bg-cream-soft p-6 shadow-card md:col-span-4 md:p-8">
          <h3 className="font-display text-2xl font-medium tracking-tight">
            {t.seed.headline}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            {t.seed.body}
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Image
              src={images.seedOriginal}
              alt={t.seed.originalAlt}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="w-full self-center rounded-xl"
            />
            <ImageCompare
              left={images.seedCanny}
              right={images.seedSobel}
              leftAlt={t.seed.cannyAlt}
              rightAlt={t.seed.sobelAlt}
              leftLabel="Canny"
              rightLabel="Sobel"
              sliderLabel={t.seed.compareLabel}
              hint={t.seed.compareHint}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
