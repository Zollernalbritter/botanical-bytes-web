// Das Formen-Vokabular der Bauklotz-Seite.
//
// Alle Icons und Figuren dieser Seite bestehen aus genau fünf Silhouetten:
// Quadrat, Kreis, Bogen (∩), Kuppel (halber Kreis) und Blatt (zwei runde
// Ecken über der Diagonale). Nichts wird gezeichnet, was sich nicht daraus
// zusammensetzen lässt — das hält die Bildsprache zusammen.

type GlyphProps = { className?: string };

/** ∩ — Bogen mit offenen Beinen. Steht für Aufbau und Gerüst. */
export function ArchGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 20" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M0 20V10a10 10 0 0 1 20 0v10h-6V10a4 4 0 0 0-8 0v10H0Z"
      />
    </svg>
  );
}

/** Gefüllte Kuppel. Steht für Abdeckung und Schutz. */
export function DomeGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 14" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M0 14V12a12 12 0 0 1 24 0v2H0Z" />
    </svg>
  );
}

/** Blatt — zwei runde Ecken, zwei spitze. Das Signet des Projekts. */
export function LeafGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M24 0v11c0 7.18-5.82 13-13 13H0V13C0 5.82 5.82 0 13 0h11Z"
      />
    </svg>
  );
}

/** Tropfen. Steht für die Wassermenge — die zentrale Stellgröße. */
export function DropGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 0c6.5 4.9 10 9.6 10 14a10 10 0 1 1-20 0C2 9.6 5.5 4.9 12 0Z"
      />
    </svg>
  );
}

/** Ring. Steht für den Zyklus, der sich wiederholt. */
export function RingGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm0 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
      />
    </svg>
  );
}

// ————— Zusammengesetzte Farbmarken —————
// Drei Grundformen versetzt übereinander, jede in einer anderen Spielfarbe.
// Bewusst ohne Rahmen und ohne Schatten: es sind Flächen, keine Piktogramme.

const markBox = "relative size-11 shrink-0";

/** Zwei versetzte Quadrate — Unterricht: zwei Perspektiven auf dieselbe Sache. */
export function ClassroomMark({ className = "" }: GlyphProps) {
  return (
    <span className={`${markBox} ${className}`} aria-hidden="true">
      <span className="absolute left-0 top-1.5 size-6 rounded-[3px] bg-blush" />
      <span className="absolute bottom-0 right-0 size-7 rounded-[4px] bg-azure" />
    </span>
  );
}

/** Bogen über Quadrat — Forschung: ein Aufbau über einer festen Grundlage. */
export function ResearchMark({ className = "" }: GlyphProps) {
  return (
    <span className={`${markBox} ${className}`} aria-hidden="true">
      <span className="shape-arch absolute left-1 top-0 h-7 w-7 bg-clay" />
      <span className="absolute bottom-0 right-0 size-6 rounded-[4px] bg-olive" />
    </span>
  );
}

/** Blatt im Quadrat — Selbstbau: das Signet, eingefasst in eine Platine. */
export function MakerMark({ className = "" }: GlyphProps) {
  return (
    <span className={`${markBox} ${className}`} aria-hidden="true">
      <span className="absolute inset-x-1 bottom-0 top-1 rounded-[6px] bg-wheat" />
      <LeafGlyph className="absolute bottom-2.5 left-3.5 size-5 text-coral" />
    </span>
  );
}
