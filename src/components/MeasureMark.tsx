// Ein gezeichnetes Instrument je Messgröße.
//
// Bewusst keine Kästchen-und-Leitung-Zeichnung und kein Piktogramm aus einem
// Symbolsatz: die Marken sind Messgeräte, keine Systemdiagramme. Alle sitzen
// im selben 24er-Raster, laufen auf derselben Strichstärke und erben ihre
// Farbe vom Text daneben — damit stehen sie in der Liste wie Satzzeichen und
// nicht wie Bildchen.
//
// Die Schlüssel sind exakt die `source`-losen Namen aus dict.tech.pcb.measures,
// verbunden über `mark` im Wörterbuch. Fehlt eine Marke, bleibt der Platz leer
// und die Zeile steht trotzdem in ihrer Spur.

export type MarkId =
  | "temperature"
  | "pressure"
  | "humidity"
  | "gas"
  | "co2"
  | "soil"
  | "light"
  | "planned"
  | "camera"
  | "edge-hard"
  | "edge-soft";

const paths: Record<MarkId, React.ReactNode> = {
  temperature: (
    <>
      <path d="M13.9 13.9V4.9a1.9 1.9 0 1 0-3.8 0v9a3.7 3.7 0 1 0 3.8 0Z" />
      <path d="M12 8.4v7" />
    </>
  ),
  pressure: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 12 15.8 8.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  humidity: (
    <path d="M12 3.4c3.5 4.1 5.5 6.8 5.5 9.2a5.5 5.5 0 0 1-11 0c0-2.4 2-5.1 5.5-9.2Z" />
  ),
  gas: (
    <>
      <path d="M4 16.6c1.7-2.4 3.4-2.4 5.1 0s3.4 2.4 5.1 0 3.4-2.4 5.1 0" />
      <path
        d="M4 10.6c1.7-2.4 3.4-2.4 5.1 0s3.4 2.4 5.1 0 3.4-2.4 5.1 0"
        opacity="0.55"
      />
    </>
  ),
  co2: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="4.3" cy="12" r="2.3" />
      <circle cx="19.7" cy="12" r="2.3" />
      <path d="M6.6 12h1.8M15.6 12h1.8" />
    </>
  ),
  soil: (
    <>
      <path d="M12 2.6c2.8 3.3 4.4 5.5 4.4 7.4a4.4 4.4 0 0 1-8.8 0c0-1.9 1.6-4.1 4.4-7.4Z" />
      <path d="M3.4 16.4h17.2M5.6 20h12.8" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.4v2.3M12 19.3v2.3M2.4 12h2.3M19.3 12h2.3M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </>
  ),
  // Noch nicht gebaut: gestrichelter Ring statt geschlossener Form.
  planned: (
    <>
      <path d="M12 3.6v16.8M3.6 12h16.8" />
      <circle cx="12" cy="12" r="8.4" strokeDasharray="3 3" />
    </>
  ),

  // ————— Stufen der Samenanalyse —————
  // Die drei folgen derselben Logik wie die Messgrößen: sie zeigen das
  // Werkzeug, nicht das Ergebnis. Die Kamera nimmt auf, die harte Kante
  // schneidet, der weiche Verlauf tastet ab.
  camera: (
    <>
      <path d="M3.4 8.2a1.8 1.8 0 0 1 1.8-1.8h2.3l1.3-2h6.4l1.3 2h2.3a1.8 1.8 0 0 1 1.8 1.8v9a1.8 1.8 0 0 1-1.8 1.8H5.2a1.8 1.8 0 0 1-1.8-1.8Z" />
      <circle cx="12" cy="12.6" r="3.5" />
    </>
  ),
  "edge-hard": (
    <>
      {/* Sprung: zwei Stufen mit einer harten Flanke dazwischen. */}
      <path d="M3.4 17.6h6.2V6.4h11" />
      <path d="M9.6 6.4v11.2" strokeDasharray="2.4 2.4" opacity="0.5" />
    </>
  ),
  "edge-soft": (
    <>
      {/* Übergang: dieselbe Stufe, aber als Rampe. */}
      <path d="M3.4 17.6h4.4c3.4 0 3 -11.2 6.4 -11.2h6.4" />
      <path d="M7.8 17.6v-11.2" strokeDasharray="2.4 2.4" opacity="0.35" />
    </>
  ),
};

export function MeasureMark({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const shape = paths[id as MarkId];
  if (!shape) return <span aria-hidden="true" className={className} />;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {shape}
    </svg>
  );
}
