import { useId } from "react";

interface MarqueeProps {
  readonly items: readonly string[];
  readonly label: string;
  readonly direction?: "left" | "right";
  /** Repeats items inside each copy so one copy always spans wide screens. */
  readonly repeat?: number;
  readonly className?: string;
}

const SEPARATOR = "///";

export function Marquee({
  items,
  label,
  direction = "left",
  repeat = 1,
  className = "",
}: MarqueeProps) {
  const toggleId = useId();
  const animation = direction === "left" ? "animate-scroll" : "animate-scroll-reverse";
  const expanded = Array.from({ length: Math.max(1, repeat) }, () => items).flat();

  return (
    <div
      role="group"
      aria-label={label}
      className={`relative overflow-hidden border-y-4 border-line bg-neo-blue py-3 text-background ${className}`.trim()}
    >
      {/* CSS-only pause control (WCAG 2.2.2): works without JavaScript. */}
      <input
        id={toggleId}
        type="checkbox"
        aria-label={`Pause ${label.toLowerCase()} scrolling text`}
        className="peer sr-only"
      />
      <div
        data-marquee-track
        className={`flex w-max whitespace-nowrap peer-checked:[animation-play-state:paused] ${animation}`}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex shrink-0 items-center font-mono"
          >
            {expanded.map((item, index) => (
              <li
                key={`${item}-${index}`}
                aria-hidden={index >= items.length ? "true" : undefined}
                className="flex items-center"
              >
                <span className="px-6">{item}</span>
                <span aria-hidden="true" className="opacity-60">
                  {SEPARATOR}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <label
        htmlFor={toggleId}
        aria-hidden="true"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer border-2 border-line bg-card px-2 py-1 font-mono text-xs font-bold text-ink shadow-hard-sm peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground peer-checked:[&_.label-pause]:hidden peer-checked:[&_.label-play]:inline"
      >
        <span className="label-pause">PAUSE</span>
        <span className="label-play hidden">PLAY</span>
      </label>
    </div>
  );
}
