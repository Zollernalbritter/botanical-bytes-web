import Image from "next/image";
import { GITHUB_URL } from "@/content";
import type { Studio } from "@/content/studio";
import { images } from "@/lib/images";
import { Card, PillAnchor, Tag, Wrap } from "./primitives";
import { DomeGlyph } from "./shapes";

// Projekt-Sektion, zweigeteilt: links eine hohe Bogen-Karte mit Herkunft und
// Meilensteinen, rechts das Teamfoto als große Rahmenkarte mit Bildunterschrift.
export function AboutSplit({ s }: { s: Studio }) {
  return (
    <section id="projekt" className="scroll-mt-24">
      <Wrap>
        <div className="grid gap-4 lg:grid-cols-[0.62fr_1fr]">
          {/* Die Pille sitzt unter der Karte statt in ihr — so bleibt der Bogen
              als geschlossene Fläche stehen. */}
          <div className="flex flex-col">
            <div className="flex min-h-[26rem] flex-1 flex-col items-center justify-center rounded-t-[14rem] rounded-b-bento bg-shell px-8 py-14 text-center">
              <DomeGlyph className="mx-auto size-8 text-wheat" />

              <p className="mt-6 text-[1.0625rem] font-medium">
                {s.about.badge1}
                <br />
                {s.about.badge2}
              </p>

              <ul className="mx-auto mt-8 flex max-w-[16rem] flex-col gap-3 text-left">
                {s.about.milestones.map((milestone) => (
                  <li key={milestone.text}>
                    <Tag>{milestone.year}</Tag>
                    <p className="mt-1 text-[0.875rem] text-night/55">
                      {milestone.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <PillAnchor
              href={GITHUB_URL}
              tone="azure"
              external
              className="mt-3 w-full"
            >
              {s.about.cta}
            </PillAnchor>
          </div>

          <Card className="rounded-frame aspect-[4/3] lg:aspect-auto lg:h-full">
            <Image
              src={images.teamStudio}
              alt={s.about.imgAlt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />

            {/* Der Titel liegt im Bild; der leichte Abdunkler dahinter hält ihn
                lesbar, egal wie hell die Stelle des Fotos gerade ist. */}
            <h2 className="absolute left-4 top-4 rounded-bento bg-night/25 px-5 py-4 t-card text-cream backdrop-blur-[2px] sm:left-6 sm:top-6">
              {s.about.line1}
              <br />
              {s.about.line2}
            </h2>
          </Card>
        </div>
      </Wrap>
    </section>
  );
}
