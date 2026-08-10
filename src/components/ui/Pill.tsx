import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  ink: "bg-ink text-offwhite hover:bg-ink/85",
  lime: "bg-lime text-ink hover:bg-lime/85",
  outline: "border border-ink/25 text-ink hover:border-ink/60 hover:bg-cream-soft",
} as const;

export function PillLink({
  href,
  variant = "ink",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = `inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
