import { Download, FolderGit2 } from "lucide-react";
import { identity } from "@/content/identity";
import { Button } from "@/components/ui/Button";
import { TerminalCard } from "@/components/ui/TerminalCard";

import type { Identity } from "@/content/types";

export function Hero({ data = identity }: { data?: Identity }) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-screen flex-col items-center overflow-hidden px-4 pb-16 pt-32 sm:px-6"
    >
      {/* Decorative shapes (hidden from assistive tech, desktop only). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <span className="absolute right-[8%] top-[10%] select-none font-display text-[8rem] font-black leading-none text-ink/5">
          CODE
        </span>
        <span className="absolute left-[10%] top-[31%] size-16 animate-bounce border-4 border-line bg-neo-blue shadow-hard" />
        <span className="absolute right-[8%] top-[54%] size-24 animate-pulse rounded-full border-4 border-line bg-neo-green shadow-hard" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <p className="inline-flex items-center gap-2 border-2 border-line bg-background px-4 py-1 font-mono text-sm font-bold shadow-hard">
          <span aria-hidden="true" className="bg-ink px-2 text-neo-green">
            ●
          </span>
          {data.heroStatus}
        </p>

        <h1
          id="hero-title"
          className="mt-6 font-display text-[clamp(3rem,8vw,6.4rem)] font-black uppercase leading-[0.85] tracking-[-0.05em]"
        >
          <span className="block">{data.headline.solid}</span>
          <span className="text-outline mt-2 block">{data.headline.outlined}</span>
        </h1>

        <p className="mt-6 w-full max-w-3xl border-2 border-line bg-neo-green p-4 font-mono text-base text-ink shadow-hard sm:text-2xl">
          <span className="block">{data.roleBanner.intro}</span>
          <span className="block font-bold">{data.roleBanner.skills}</span>
        </p>

        <TerminalCard title={data.terminalTitle} className="mt-6 w-full max-w-md">
          <p className="animate-typing overflow-hidden whitespace-nowrap">$ whoami</p>
          {data.whoami.map((line) => (
            <p key={line} className="text-neo-cyan">
              {line}
              <span className="animate-blink" aria-hidden="true">_</span>
            </p>
          ))}
        </TerminalCard>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <Button href="#projects" variant="dark" size="lg">
            <FolderGit2 className="size-5" aria-hidden="true" />
            VIEW PROJECTS
          </Button>
          <Button href={data.resume} variant="outline" size="lg" download>
            <Download className="size-5" aria-hidden="true" />
            DOWNLOAD CV
          </Button>
        </div>
      </div>
    </section>
  );
}
