"use client";

import { useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";
import { hasBooted, markBooted, nextProgress } from "@/lib/boot";

const TICK_MS = 60;
const EXIT_DELAY_MS = 250;

const subscribeNever = () => () => {};
const readBooted = () => hasBooted(window.sessionStorage);
const serverBooted = () => false;

export function BootScreen() {
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const alreadyBooted = useSyncExternalStore(subscribeNever, readBooted, serverBooted);
  const done = finished || alreadyBooted;

  // React Strict Mode (dev) clears attributes the inline script set; re-apply before paint.
  useLayoutEffect(() => {
    if (alreadyBooted) markBooted(window.sessionStorage, document.documentElement);
  }, [alreadyBooted]);

  useEffect(() => {
    if (done) return;
    const timer = window.setInterval(() => {
      setProgress((value) => nextProgress(value));
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [done]);

  useEffect(() => {
    if (progress < 100 || done) return;
    const timer = window.setTimeout(() => {
      markBooted(window.sessionStorage, document.documentElement);
      setFinished(true);
    }, EXIT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [progress, done]);

  if (done) return null;

  return (
    <div
      data-boot-screen
      className="bg-grid fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 px-6"
    >
      <div className="border-2 border-line bg-card px-6 py-4 shadow-hard-lg">
        <p className="font-display text-4xl font-black tracking-tight sm:text-6xl">
          ABHI<span className="ml-1 bg-neo-yellow px-2">SHEK</span>
        </p>
      </div>

      <p className="border-2 border-line bg-ink px-4 py-2 font-mono text-sm font-bold text-neo-green">
        $ initializing system
        <span className="animate-blink ml-1" aria-hidden="true">
          ▌
        </span>
      </p>

      <div className="w-full max-w-md">
        <div
          role="progressbar"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="h-8 border-2 border-line bg-card shadow-hard"
        >
          <div className="h-full bg-neo-green transition-[width] duration-75" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-3 flex justify-between font-mono text-xs font-bold">
          <span>LOADING ASSETS</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
