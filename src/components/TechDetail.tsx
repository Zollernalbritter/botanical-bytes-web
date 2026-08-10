import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";
import { ImageCompare } from "./ImageCompare";
import { PcbTabs } from "./PcbTabs";
import { DownloadIcon } from "./ui/icons";

// Ruhige Detail-Ebene für Neugierige: Platinen-Generationen + Samen-Analyse.
export function TechDetail({ dict }: { dict: Dictionary }) {
  const t = dict.tech;
  const tabItems = [
    {
      ...t.pcb.tabs[0],
      image: images.greenhousePrototype,
      fit: "cover" as const,
      positionClass: "object-bottom",
    },
    { ...t.pcb.tabs[1], image: images.pcbV2, fit: "contain" as const },
    { ...t.pcb.tabs[2], image: images.pcbV3, fit: "contain" as const },
  ];

  return (
    <section className="px-5 pb-24 md:pb-36">
      <div className="mx-auto max-w-6xl">
        <h2 className="fade-up text-center font-display text-3xl font-medium tracking-tight md:text-4xl">
          {t.heading}
        </h2>
        <p className="fade-up mt-3 text-center text-muted">{t.intro}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="fade-up rounded-media bg-white p-6 shadow-pill md:p-8">
            <h3 className="font-display text-2xl font-medium tracking-tight">
              {t.pcb.headline}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t.pcb.body}
            </p>
            <div className="mt-6">
              <PcbTabs items={tabItems} listLabel={t.pcb.headline} />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-muted">{t.pcb.downloads}</span>
              <a
                href="/downloads/schematic.pdf"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-1.5 font-medium transition-colors hover:bg-sand/50"
              >
                <DownloadIcon className="size-4" />
                {t.pcb.downloadSchematic}
              </a>
              <a
                href="/downloads/pcb.pdf"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-1.5 font-medium transition-colors hover:bg-sand/50"
              >
                <DownloadIcon className="size-4" />
                {t.pcb.downloadPcb}
              </a>
            </div>
          </div>

          <div className="fade-up rounded-media bg-white p-6 shadow-pill md:p-8">
            <h3 className="font-display text-2xl font-medium tracking-tight">
              {t.seed.headline}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t.seed.body}
            </p>
            <Image
              src={images.seedOriginal}
              alt={t.seed.originalAlt}
              sizes="(min-width: 768px) 520px, 100vw"
              className="mt-6 w-full rounded-xl"
            />
            <div className="mt-4">
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
      </div>
    </section>
  );
}
