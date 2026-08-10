import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-eyebrow text-xs font-medium uppercase tracking-[0.25em] text-sage-deep ${className}`}
    >
      {children}
    </p>
  );
}
