"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, CloseIcon, MenuIcon } from "./ui/icons";

export function MobileNav({
  items,
  github,
  openLabel,
  closeLabel,
  menuLabel,
}: {
  items: { href: string; label: string }[];
  github: { href: string; label: string };
  openLabel: string;
  closeLabel: string;
  menuLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const opener = openerRef.current;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      // Fokus bleibt im Dialog gefangen
      const focusables = overlayRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={openLabel}
        aria-expanded={open}
        className="flex size-9 items-center justify-center rounded-full border border-ink/15"
      >
        <MenuIcon className="size-5" />
      </button>

      {open && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={menuLabel}
          className="fixed inset-0 z-50 flex flex-col bg-sage"
        >
          <div className="flex shrink-0 items-center justify-end px-5 py-3">
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
              className="flex size-9 items-center justify-center rounded-full border border-ink/20"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-2 overflow-y-auto px-8 pb-16">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-medium tracking-tight text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center gap-2 font-display text-4xl font-medium tracking-tight text-ink"
            >
              {github.label}
              <ArrowUpRightIcon className="size-7" />
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
