import Link from "next/link";
import type { ReactNode } from "react";

// Gemeinsame Bausteine der Bauklotz-Seite. Jede Sektion greift hierauf zu,
// damit Radien, Innenabstände und Pillenhöhen über die ganze Seite gleich sind.

/** Maximalbreite und Seitenränder — identisch in jeder Sektion. */
export function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[76rem] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Kleines Monospace-Label über einer Sektion. */
export function Tag({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`t-tag text-night/45 ${className}`}>{children}</p>
  );
}

/** Zentrierte Sektionsüberschrift, zweizeilig gesetzt wie in der Referenz. */
export function SectionHeading({
  line1,
  line2,
  className = "",
}: {
  line1: string;
  line2?: string;
  className?: string;
}) {
  return (
    <h2 className={`t-section text-balance text-center ${className}`}>
      {line1}
      {line2 ? (
        <>
          <br />
          {line2}
        </>
      ) : null}
    </h2>
  );
}

const toneClass = {
  coral: "bg-coral text-cream hover:bg-coral/90",
  night: "bg-night text-cream hover:bg-night/85",
  shell: "bg-shell text-night hover:bg-shell-deep",
  azure: "bg-azure text-cream hover:bg-azure/90",
  leaf: "bg-leaf text-cream hover:bg-leaf/90",
} as const;

export type PillTone = keyof typeof toneClass;

const pillBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.9375rem] font-medium leading-none transition-colors focus-visible:outline-offset-2";

/** Pille als interner Link. */
export function PillLink({
  href,
  tone = "coral",
  className = "",
  children,
}: {
  href: string;
  tone?: PillTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${pillBase} ${toneClass[tone]} ${className}`}>
      {children}
    </Link>
  );
}

/** Pille als externer Link — öffnet in neuem Tab. */
export function PillAnchor({
  href,
  tone = "coral",
  external = false,
  className = "",
  children,
}: {
  href: string;
  tone?: PillTone;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${pillBase} ${toneClass[tone]} ${className}`}
    >
      {children}
    </a>
  );
}

/**
 * Statische Pille ohne Ziel — trägt nur einen Hinweis.
 * `ground` sagt, worauf sie liegt: auf Creme reicht der Sandton, auf einer
 * Sandkarte muss sie eine Stufe dunkler werden, sonst verschwindet sie darin.
 */
export function PillNote({
  ground = "cream",
  className = "",
  children,
}: {
  ground?: "cream" | "shell";
  className?: string;
  children: ReactNode;
}) {
  const fill = ground === "shell" ? "bg-shell-deep" : "bg-shell";
  return (
    <span className={`${pillBase} ${fill} text-night/70 ${className}`}>
      {children}
    </span>
  );
}

/** Bento-Kachel: sandfarbener Grund, 32-px-Radius, keine Ränder. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-bento bg-shell ${className}`}
    >
      {children}
    </div>
  );
}
