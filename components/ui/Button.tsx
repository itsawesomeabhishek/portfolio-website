import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "dark";
type Size = "md" | "lg";

interface ButtonProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: Variant;
  readonly size?: Size;
  readonly external?: boolean;
  readonly download?: boolean;
  readonly className?: string;
  /** Visually hidden context appended to the link name, e.g. the project title. */
  readonly srContext?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 border-2 border-line font-bold shadow-hard transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 font-mono text-sm uppercase",
  lg: "px-8 py-4 font-display text-lg sm:px-10 sm:py-5 sm:text-xl",
};

const variants: Record<Variant, string> = {
  primary: "bg-neo-green text-ink hover:bg-ink hover:text-neo-green",
  outline: "bg-card text-ink hover:bg-neo-yellow",
  dark: "bg-ink text-background hover:bg-neo-green hover:text-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  download = false,
  className = "",
  srContext,
}: ButtonProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      download={download || undefined}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()}
      {...externalProps}
    >
      {children}
      {srContext ? <span className="sr-only">, {srContext}</span> : null}
      {external ? <span className="sr-only">, opens in new tab</span> : null}
    </a>
  );
}
