import type { ReactNode } from "react";

export type Tone = "cream" | "white" | "ink";

interface SectionProps {
  readonly id?: string;
  readonly tone?: Tone;
  readonly children: ReactNode;
  readonly className?: string;
  readonly labelledBy?: string;
}

const tones: Record<Tone, string> = {
  cream: "",
  white: "bg-card",
  ink: "on-ink border-t-4 border-line bg-ink text-background",
};

export function Section({
  id,
  tone = "cream",
  children,
  className = "",
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`px-4 py-20 sm:px-6 lg:py-24 ${tones[tone]} ${className}`.trim()}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
