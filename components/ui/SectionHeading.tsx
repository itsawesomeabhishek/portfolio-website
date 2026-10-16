interface SectionHeadingProps {
  readonly id: string;
  readonly children: string;
  readonly tone?: "light" | "dark";
  readonly eyebrow?: string;
}

export function SectionHeading({
  id,
  children,
  tone = "light",
  eyebrow,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className="mb-12">
      {eyebrow ? (
        <p
          className={`mb-3 inline-block border-2 border-line px-3 py-1 font-mono text-xs font-bold ${
            dark ? "bg-neo-green text-ink" : "bg-neo-yellow text-ink"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-4xl font-black uppercase leading-none tracking-tighter [overflow-wrap:anywhere] sm:text-6xl lg:text-8xl"
      >
        {children}
      </h2>
    </div>
  );
}
