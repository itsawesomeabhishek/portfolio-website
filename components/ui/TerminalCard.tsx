import type { ReactNode } from "react";

interface TerminalCardProps {
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
}

const dots = ["bg-neo-red", "bg-neo-yellow", "bg-neo-green"] as const;

export function TerminalCard({ title, children, className = "" }: TerminalCardProps) {
  return (
    <div
      className={`on-ink border-2 border-line bg-ink p-4 text-left font-mono text-sm text-neo-green shadow-hard ${className}`.trim()}
    >
      <div className="flex items-center gap-2">
        {dots.map((color) => (
          <span key={color} aria-hidden="true" className={`size-3 rounded-full ${color}`} />
        ))}
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-xs">{title}</p>
        {children}
      </div>
    </div>
  );
}
