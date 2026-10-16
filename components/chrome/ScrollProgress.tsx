"use client";

import { useEffect, useState } from "react";

function readProgress(): number {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100)));
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => setProgress(readProgress());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-scroll-progress={progress}
      className="fixed inset-x-0 top-0 z-[60] h-2 border-b-2 border-line bg-transparent"
    >
      <div className="h-full bg-neo-green" style={{ width: `${progress}%` }} />
    </div>
  );
}

