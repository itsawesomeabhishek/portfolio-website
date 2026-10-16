"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center border-2 border-line bg-neo-cyan text-ink shadow-hard transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
