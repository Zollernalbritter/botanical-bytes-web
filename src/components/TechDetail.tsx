import { GITHUB_URL, type Dictionary } from "@/content";
import { images } from "@/lib/images";
import { DownloadIcon, GitHubIcon } from "@/components/ui/icons";
import { BoardModel } from "./BoardModel";
import { MeasureMark } from "./MeasureMark";

type Measure = { mark: string; name: string; source: string };

// Eine Zeile der Messgrößen-Liste. Feste Spuren links und rechts: das Zeichen
// steht in einem Slot fester Breite, der Geber rechtsbündig — sonst tanzen die
// Namen mit ihrer Textlänge und die Liste franst aus.
function MeasureRow({ item, dim }: { item: Measure; dim?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3.5 border-t border-hair py-2.5 ${
        dim ? "opacity-55" : ""
      }`}
    >
      <MeasureMark id={item.mark} className="size-[22px] shrink-0 text-ink" />
      <span className="min-w-0 flex-1 text-sm">{item.name}</span>
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
        {item.source}
      </span>
    </div>
  );
}

// Die Hardware im Detail.
//
// Aufbau: Überschrift mittig wie in den Nachbarabschnitten, darunter eine
// breite Karte — links die Platine als drehbares Modell auf einem Drehteller,
// rechts die Messgrößen als Liste. Darunter die Samenanalyse mit dem
// Wischregler.
//
// Bewusst nicht mehr da: die kursive Zeile in Moosgrün, der azurne Kasten und
// jedes Kästchen-und-Leitung-Schaubild. Der Abschnitt lief damit aus der
// Bildsprache der übrigen Seite heraus.
export function TechDetail({ dict }: { dict: Dictionary }) {
  const t = dict.tech;
  const p = t.pcb;

  return (
    <section className="px-5 pb-24 md:pb-36">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <header className="fade-up flex flex-col items-center gap-4 text-center">
          <h2 className="display text-[clamp(2.1rem,5vw,3.6rem)]">{t.heading}</h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-muted">
            {t.intro}
          </p>
        </header>

        {/* Ein weißer Körper, nicht mehr der getönte: Weiß hebt die Sektion aus
            dem Papierton heraus, statt sie darin zu vergraben — und die Karten
            der Nachbarabschnitte stehen ohnehin auf Weiß.

            Innen zwei sehr ungleiche Hälften: links ein Gegenstand, rechts eine
            Tabelle. `items-stretch` hält beide auf einer Höhe, damit die
            getönte Bühne nicht auf halber Strecke abbricht.

            Kein Schlagschatten: er ließ den Körper über der Seite schweben und
            zog mehr Aufmerksamkeit auf sich als die Platine darin. Eine
            Haarlinie genügt, um ihn vom Papier abzusetzen — so steht er so
            ruhig da wie die Karten in „Wie Botanical Bytes arbeitet“. */}
        <div className="fade-up mt-12 w-full overflow-hidden rounded-media border border-hair bg-white md:mt-16">
          <div className="flex flex-col items-stretch lg:flex-row">
            {/* Kein gezeichneter Drehteller: der Betrachter wirft dem Modell
                seinen eigenen Kontaktschatten, und der sitzt immer da, wo die
                Platine gerade steht. Eine gemalte Ellipse müsste jeder Drehung
                hinterherlaufen und läge spätestens beim Kippen daneben. */}
            <div className="relative flex shrink-0 items-center justify-center bg-card px-6 py-10 lg:w-[54%]">
              <span className="label-mono absolute left-6 top-6 z-10">
                {p.model.label}
              </span>

              <BoardModel
                src="/media/pcb-v3.glb"
                poster={images.pcbV3}
                alt={p.model.alt}
                hint={p.model.rotateHint}
                reset={p.model.rotateReset}
                className="min-h-[340px] w-full sm:min-h-[460px]"
              />
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:w-[46%]">
              <h3 className="display text-[clamp(1.5rem,2.6vw,2.15rem)]">
                {p.headline}
              </h3>
              <p className="mt-3.5 text-sm leading-relaxed text-muted">
                {p.body}
              </p>

              <div className="mt-7">
                {p.measures.map((m) => (
                  <MeasureRow key={m.name} item={m} />
                ))}
                {/* Was noch kommt, steht in derselben Liste — gedämpft, aber
                    nicht weggesperrt. */}
                <MeasureRow item={p.planned} dim />
              </div>

              <p className="mt-5 font-mono text-[11px] text-muted">
                {p.model.note}
              </p>
            </div>
          </div>

          {/* Die Pläne sitzen im Fuß desselben Körpers, nicht in einer eigenen
              Leiste darunter: sie gehören zur Platine darüber, und als
              freistehender Balken zerschnitten sie die Sektion in zwei Hälften,
              zwischen denen nichts vermittelt. */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 border-t border-hair px-7 py-5 sm:px-10">
            <span className="label-mono uppercase">{p.downloads.label}</span>
            <a
              href="/downloads/schematic.pdf"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <DownloadIcon className="size-4 shrink-0" />
              {p.downloads.schematic}
            </a>
            <a
              href="/downloads/pcb.pdf"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <DownloadIcon className="size-4 shrink-0" />
              {p.downloads.pcb}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <GitHubIcon className="size-4 shrink-0" />
              {p.downloads.github}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
