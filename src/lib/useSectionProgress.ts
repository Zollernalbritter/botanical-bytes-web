"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, type MotionValue } from "motion/react";

/**
 * Scrollfortschritt einer hohen Sektion: 0, sobald ihre Oberkante den
 * Viewport-Anfang erreicht, 1, sobald ihre Unterkante das Viewport-Ende
 * erreicht.
 *
 * Bewusst nicht `useScroll({ target })` von motion: das misst die Sektion beim
 * Mounten aus. Bilder, Schriften und Lenis verschieben die Seitenhöhe danach
 * noch, und der Fortschritt bleibt auf veralteten Werten stehen. Hier wird bei
 * jedem Scroll-Event frisch gemessen.
 */
export function useSectionProgress(
  ref: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    function update() {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) {
        progress.set(0);
        return;
      }
      progress.set(Math.min(1, Math.max(0, -rect.top / span)));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [ref, progress]);

  return progress;
}
