"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type FC, type HTMLAttributes } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

// Die echte Platine zum Drehen — kein Standbild und keine Kippkulisse mehr,
// sondern die Geometrie aus dem EasyEDA-Export.
//
// Zwei Dinge kosten hier Sorgfalt:
//
// Erstens das Gewicht. Das Modell wiegt roh 3,4 MB, übertragen rund 0,7 MB,
// und die Betrachter-Bibliothek bringt three.js mit. Beides darf die Seite
// nicht beim ersten Bild bezahlen. Darum wird die Bibliothek erst geladen,
// wenn dieser Baustein wirklich im Blickfeld steht, und bis dahin steht das
// bekannte Standbild an derselben Stelle. Wer die Platinen-Ansicht nie
// öffnet, lädt nichts davon.
//
// Zweitens der Bestückungsdruck. Der OBJ-Export trägt nur Flächenfarben,
// keine Texturen — „Plant Growth Optimizer v.3.0“ steht im Modell also
// nirgends. Deshalb bleibt das gerenderte Standbild als Startbild sichtbar:
// es zeigt genau das, was das Modell nicht zeigen kann.

// `model-viewer` ist ein Web-Component und kein React-Baustein. Über diesen
// Alias bekommt es trotzdem eine Typprüfung, ohne dass wir die globale
// JSX-Namensliste anfassen müssen.
type ModelViewerProps = HTMLAttributes<HTMLElement> & Record<string, unknown>;
const ModelViewer = "model-viewer" as unknown as FC<ModelViewerProps>;

export function BoardModel({
  src,
  poster,
  alt,
  hint,
  reset,
  className,
}: {
  src: string;
  poster: StaticImageData;
  alt: string;
  hint: string;
  reset: string;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const viewer = useRef<HTMLElement>(null);
  const [wanted, setWanted] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();

  // Der Baustein steht mitten auf der Seite und wird bei jedem Aufruf
  // mitgeliefert. Modell und Bibliothek dürfen deshalb erst laden, wenn
  // jemand tatsächlich hinschaut — zusammen sind sie schwerer als die ganze
  // übrige Seite.
  //
  // Zwei Auslöser, weil einer allein nicht reicht: der Beobachter meldet das
  // Heranscrollen, der Zeiger fängt die Fälle, in denen das Fenster im
  // Hintergrund liegt. Chrome bedient dort die Beobachter nämlich gar nicht —
  // was richtig ist, solange niemand hinsieht, aber sobald doch jemand mit der
  // Maus hineinfährt, soll das Modell nicht kalt bleiben.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setWanted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setWanted(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);

    const wake = () => setWanted(true);
    el.addEventListener("pointerenter", wake, { once: true });
    el.addEventListener("focusin", wake, { once: true });

    return () => {
      io.disconnect();
      el.removeEventListener("pointerenter", wake);
      el.removeEventListener("focusin", wake);
    };
  }, []);

  useEffect(() => {
    if (!wanted) return;
    let cancelled = false;
    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch((error) => {
        // Kein WebGL, kein Netz, blockiertes Modul: das Standbild bleibt
        // stehen und die Sektion funktioniert weiter. Stillschweigend darf das
        // aber nicht passieren — sonst sucht man den Grund im Leeren.
        console.warn("[BoardModel] 3D-Ansicht nicht verfügbar:", error);
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [wanted]);

  const handleReset = () => {
    const el = viewer.current as (HTMLElement & { resetTurntableRotation?: (r?: number) => void }) | null;
    if (!el) return;
    el.resetTurntableRotation?.(0);
    el.setAttribute("camera-orbit", "-24deg 66deg auto");
  };

  return (
    <div ref={host} className={`relative ${className ?? ""}`}>
      {ready && !failed ? (
        <>
          <ModelViewer
            ref={viewer}
            src={src}
            alt={alt}
            camera-controls=""
            touch-action="pan-y"
            interaction-prompt="none"
            // `model-viewer` wartet von sich aus noch einmal, bis es im
            // Blickfeld steht. Diese zweite Prüfung ist hier überflüssig: das
            // Element entsteht überhaupt erst, wenn oben schon entschieden
            // wurde, dass geladen werden soll. Sie würde nur verzögern.
            loading="eager"
            camera-orbit="-24deg 66deg auto"
            min-camera-orbit="auto 0deg auto"
            max-camera-orbit="auto 180deg auto"
            shadow-intensity="0.9"
            shadow-softness="0.75"
            exposure="1.0"
            environment-image="neutral"
            // Alle vier Angaben sind nötig, und keine ist überflüssig:
            // `position: absolute` gibt dem Element den Rahmen als Bezug, damit
            // die Prozenthöhe überhaupt aufgeht (die Elternhöhe kommt aus
            // `min-height`, und dagegen löst `height: 100%` nicht auf).
            // `width`/`height` müssen mit, weil `model-viewer` sich von Haus
            // aus auf 300 × 150 setzt — wie eine Leinwand. Ohne sie bleibt es
            // bei der Briefmarke, und man sieht nur den Drehteller.
            style={
              {
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                "--poster-color": "transparent",
              } as CSSProperties
            }
          />
          <p className="pointer-events-none absolute inset-x-0 bottom-2 hidden justify-center font-mono text-[11px] text-muted [@media(pointer:fine)]:flex">
            {hint}
          </p>
          {/* Nur ein Zeichen in der Ecke, keine beschriftete Pille: die Taste
              wird selten gebraucht und soll dem Modell nicht die Schau stehlen.
              Der Text steht als Beschriftung dran, damit sie trotzdem benannt
              ist — für Screenreader und als Tooltip. */}
          <button
            type="button"
            onClick={handleReset}
            aria-label={reset}
            title={reset}
            className="absolute right-0 top-0 inline-flex size-8 items-center justify-center rounded-full border border-ink/12 bg-paper/70 text-muted backdrop-blur-sm transition-colors hover:border-ink/35 hover:text-ink"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M3.6 10a6.4 6.4 0 0 1 11-4.5" />
              <path d="M16.4 10a6.4 6.4 0 0 1-11 4.5" />
              <path d="M14.8 2.4v3.2h-3.2" />
              <path d="M5.2 17.6v-3.2h3.2" />
            </svg>
          </button>
        </>
      ) : (
        // Startbild: dasselbe Rendering wie zuvor, damit an dieser Stelle nie
        // ein Loch steht — weder beim Laden noch wenn WebGL fehlt.
        <Image
          src={poster}
          alt={alt}
          sizes="(min-width: 1024px) 660px, 92vw"
          priority={false}
          className={`absolute inset-0 size-full object-contain transition-opacity duration-500 ${
            failed || reduced ? "opacity-100" : "opacity-70"
          } [filter:drop-shadow(0_18px_26px_rgb(26_22_19/0.22))]`}
        />
      )}
    </div>
  );
}
