import type { ReactNode } from "react";

export function Section({
  id,
  className = "",
  containerClassName = "",
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 md:py-28 ${className}`}>
      <div className={`mx-auto max-w-6xl px-5 md:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
