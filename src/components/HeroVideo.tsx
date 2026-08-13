"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "./ui/icons";

// Der Hero zeigt mehrere Aufnahmen nacheinander. Nur der erste Clip wird
// sofort geholt — hero.mp4 wiegt allein 2,6 MB und darf den ersten
// Seitenaufruf nicht bezahlen; die übrigen laden, wenn sie an die Reihe kommen.
//
// Der Zeitraffer des Wachstumszyklus (wachstum.mp4) lief hier als dritter Clip
// und ist bewusst raus: er erzählt eine eigene Geschichte über Tage hinweg und
// verliert sie, wenn er neun Sekunden lang hinter einer Überschrift läuft. Die
// Datei bleibt liegen — sie gehört weiter unten auf die Seite, wo sie Platz
// bekommt. src/components/TimelapseVideo.tsx wartet dafür schon.
// Der Typ steht ausgeschrieben, weil `webm` gerade an keinem Clip hängt: ohne
// ihn schlösse TypeScript, dass es die Angabe nie gibt, und die Zeile, die sie
// ausgibt, wäre ein Fehler. Sie soll aber stehen bleiben — der nächste Clip
// bringt womöglich wieder eine mit.
const clips: { mp4: string; webm?: string; poster: string }[] = [
  { mp4: "/media/hero-lab.mp4", poster: "/media/hero-lab-poster.jpg" },
  { mp4: "/media/hero.mp4", poster: "/media/hero-poster.jpg" },
];

const FADE_MS = 900; // so lange laufen zwei Clips parallel (Kreuzblende)
const WARM_AFTER = 1; // Sekunden Vorlauf, bevor der nächste Clip geholt wird
const MIN_STAGE = 4; // kurze Clips wiederholen sich, bis das erreicht ist
const MAX_STAGE = 9; // und kein Clip steht länger als das im Bild
const LOOP_GUARD = 0.4; // hält den Loop-Sprung hinter der Blende

// Hintergrund-Video mit eigenem Pause-Knopf (WCAG 2.2.2); bei reduzierter
// Bewegung startet es pausiert auf dem Poster.
export function HeroVideo({
  label,
  pauseLabel,
  playLabel,
}: {
  label: string;
  pauseLabel: string;
  playLabel: string;
}) {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  // shown steht im Bild, leaving blendet darunter aus (-1 = niemand).
  const [stage, setStage] = useState({ shown: 0, leaving: -1 });
  const [playing, setPlaying] = useState(true);
  // Bühnenzeit des sichtbaren Clips, aufsummiert aus seiner eigenen Spielzeit.
  const clock = useRef({ elapsed: 0, last: 0 });

  // Wie lange ein Clip die Bühne hält: kurze laufen mehrfach, lange werden
  // gekappt. Der Abzug sorgt dafür, dass sein Loop-Sprung erst passiert,
  // wenn die Blende schon durch ist.
  function stageTime(video: HTMLVideoElement) {
    const length = video.duration;
    if (!Number.isFinite(length) || length <= 0) return MAX_STAGE;
    const runs = Math.max(1, Math.ceil(MIN_STAGE / length));
    return Math.min(MAX_STAGE, runs * length - LOOP_GUARD);
  }

  // Der nächste Clip wird erst geholt, wenn der aktuelle schon eine Weile
  // läuft — beim ersten Aufruf soll der Hero nur seinen eigenen Clip kosten.
  function warmNext() {
    const next = videos.current[(stage.shown + 1) % clips.length];
    if (!next || next.preload === "auto") return;
    next.preload = "auto";
    next.load();
  }

  // Der Wechsel hängt an der Spielzeit des sichtbaren Clips statt an einer
  // freilaufenden Uhr: steht das Video, steht auch die Bühnenzeit.
  function handleTime(slot: number) {
    const video = videos.current[slot];
    if (slot !== stage.shown || !video) return;
    const now = video.currentTime;
    // Nach einem Loop-Sprung fällt currentTime zurück auf null.
    clock.current.elapsed +=
      now >= clock.current.last ? now - clock.current.last : now;
    clock.current.last = now;
    if (clock.current.elapsed >= WARM_AFTER) warmNext();
    if (clock.current.elapsed < stageTime(video) - FADE_MS / 1000) return;
    setStage((previous) => ({
      shown: (previous.shown + 1) % clips.length,
      leaving: previous.shown,
    }));
  }

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    videos.current.forEach((video) => video?.pause());
    setPlaying(false);
  }, []);

  useEffect(() => {
    const current = videos.current[stage.shown];
    if (!current) return;
    clock.current = { elapsed: 0, last: current.currentTime };

    // Der abtretende Clip spielt weiter, bis die Blende durch ist — sonst
    // friert er sichtbar ein. Danach zurück auf Anfang und schlafen legen,
    // damit nie mehr als zwei Videos gleichzeitig dekodiert werden.
    const timer = window.setTimeout(() => {
      videos.current.forEach((video, slot) => {
        if (!video || slot === stage.shown) return;
        video.pause();
        video.currentTime = 0;
      });
      setStage((previous) =>
        previous.leaving === -1 ? previous : { ...previous, leaving: -1 },
      );
    }, FADE_MS);
    return () => window.clearTimeout(timer);
  }, [stage.shown]);

  // document.hidden auch hier: in einem Hintergrund-Tab geöffnet, feuert
  // visibilitychange nie — die Blende liefe ins Leere.
  useEffect(() => {
    if (!playing || document.hidden) {
      videos.current.forEach((video) => video?.pause());
      return;
    }
    videos.current[stage.shown]?.play().catch(() => {});
  }, [playing, stage.shown]);

  // Im versteckten Tab dekodiert niemand weiter; die Bühnenzeit läuft mit dem
  // Video weiter, sobald er zurückkommt.
  useEffect(() => {
    function handleVisibility() {
      if (document.hidden) {
        videos.current.forEach((video) => video?.pause());
      } else if (playing) {
        videos.current[stage.shown]?.play().catch(() => {});
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [playing, stage.shown]);

  return (
    <>
      {/* Eigener Stapelkontext: die z-Werte der Clips bleiben hier drin und
          lassen die Overlays des Heros darüber. */}
      <div className="absolute inset-0 z-0">
        {clips.map((clip, slot) => (
          <video
            key={clip.mp4}
            ref={(node) => {
              videos.current[slot] = node;
            }}
            autoPlay={slot === 0}
            muted
            loop
            playsInline
            preload={slot === 0 ? "auto" : "none"}
            poster={clip.poster}
            // Die Beschreibung gilt dem Hero als Ganzem — sie hängt am ersten
            // Clip, die weiteren sind für Screenreader nur Wiederholung.
            aria-label={slot === 0 ? label : undefined}
            aria-hidden={slot === 0 ? undefined : true}
            onTimeUpdate={() => handleTime(slot)}
            style={{ transitionDuration: `${FADE_MS}ms` }}
            className={`absolute inset-0 size-full object-cover transition-opacity ease-linear ${
              slot === stage.shown
                ? "z-20 opacity-100"
                : slot === stage.leaving
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
            }`}
          >
            {clip.webm ? <source src={clip.webm} type="video/webm" /> : null}
            <source src={clip.mp4} type="video/mp4" />
          </video>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPlaying((value) => !value)}
        aria-label={playing ? pauseLabel : playLabel}
        className="absolute bottom-5 right-5 z-10 flex size-10 items-center justify-center rounded-full bg-ink/45 text-white backdrop-blur-sm transition-colors hover:bg-ink/65 focus-visible:outline-white md:bottom-8 md:right-8"
      >
        {playing ? (
          <PauseIcon className="size-4" />
        ) : (
          <PlayIcon className="size-4" />
        )}
      </button>
    </>
  );
}
