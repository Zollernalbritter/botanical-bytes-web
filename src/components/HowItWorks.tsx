import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/lib/images";
import { FlowDiagram } from "./FlowDiagram";

// Lassies "How Lassie works": drei ruhige Schritte + Infografik des Kreislaufs.
export function HowItWorks({ dict }: { dict: Dictionary }) {
  const h = dict.how;
  const photos = [images.pcbV3, images.measuringSeeds, images.cressGrown];

  return (
    <section id="technik" className="scroll-mt-6 px-5 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <h2 className="fade-up text-center font-display text-4xl font-medium tracking-tight md:text-6xl">
          {h.heading}
        </h2>

        <div
          tabIndex={0}
          role="group"
          aria-label={h.diagram.ariaLabel}
          className="fade-up mt-14 overflow-x-auto rounded-media bg-white p-6 shadow-pill md:p-10"
        >
          <FlowDiagram
            nodes={h.diagram.nodes}
            measureLabel={h.diagram.measureLabel}
            loopLabel={h.diagram.loopLabel}
          />
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {h.steps.map((step, i) => (
            <div key={step.title} className="fade-up">
              <Image
                src={photos[i]}
                alt={step.imgAlt}
                placeholder={i === 0 ? undefined : "blur"}
                sizes="(min-width: 768px) 360px, 100vw"
                className={`aspect-[4/3] w-full rounded-media ${
                  i === 0
                    ? "bg-white object-contain p-4 shadow-pill"
                    : "object-cover"
                }`}
              />
              <p className="mt-5 font-mono text-xs text-muted">0{i + 1}</p>
              <h3 className="mt-1 font-display text-2xl font-medium tracking-tight md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
