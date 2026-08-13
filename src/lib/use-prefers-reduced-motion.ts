"use client";

import { useEffect, useState } from "react";

/**
 * Eigene Abfrage statt `useReducedMotion` aus motion/react: die liefert schon
 * im ersten Rendering im Browser den echten Wert, während der Server immer
 * „nein“ gerendert hat — das gäbe eine Hydrations-Abweichung. Hier bleibt der
 * erste Durchlauf still, die Wahrheit kommt einen Tick später.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
