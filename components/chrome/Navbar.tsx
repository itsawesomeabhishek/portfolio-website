"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { identity } from "@/content/identity";
import { hireMe, navLinks } from "@/content/nav";

const linkClass =
  "px-3 py-1 font-mono text-sm font-bold text-ink hover:bg-neo-yellow";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-2 z-50 px-4 pt-2 sm:px-6">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-start justify-between gap-4"
      >
        <a
          href="#top"
          className="border-2 border-line bg-background px-4 py-2 font-display text-lg font-black shadow-hard transition-colors hover:bg-neo-yellow"
        >
          {identity.logo}
        </a>

        <ul className="hidden items-center gap-1 border-2 border-line bg-card p-2 shadow-hard md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={hireMe.href}
              className="border-2 border-line bg-neo-green px-3 py-1 font-mono text-sm font-bold text-ink hover:bg-ink hover:text-neo-green"
            >
              {hireMe.label}
            </a>
          </li>
        </ul>

        <div className="md:hidden">
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            className="flex size-11 items-center justify-center border-2 border-line bg-card text-ink shadow-hard"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <ul
        id={menuId}
        hidden={!open}
        className="mx-auto mt-3 max-w-6xl border-2 border-line bg-card shadow-hard md:hidden"
      >
        {[...navLinks, hireMe].map((link, index) => (
          <li key={link.href} className="border-b-2 border-line last:border-b-0">
            <a
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 font-mono text-sm font-bold text-ink hover:bg-neo-yellow"
            >
              <span className="text-muted">{String(index + 1).padStart(2, "0")}</span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}

