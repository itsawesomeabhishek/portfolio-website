import Image from "next/image";
import { stack } from "@/content/stack";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import type { StackNode } from "@/content/types";

export function TechStack({ items = stack }: { items?: readonly StackNode[] }) {
  return (
    <Section id="skills" tone="ink" labelledBy="skills-title">
      <SectionHeading id="skills-title" tone="dark" eyebrow="SYSTEM.STACK">
        TECH_STACK
      </SectionHeading>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((node) => (
          <li
            key={node.tech}
            className="flex items-center gap-4 border-2 border-neo-green bg-ink p-4 transition-colors hover:bg-neo-green hover:text-ink"
          >
            {node.icon ? (
              <span className="flex size-10 shrink-0 items-center justify-center bg-background p-1">
                <Image src={node.icon} alt="" width={32} height={32} className="size-8 object-contain" />
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center border-2 border-current font-mono text-xs font-bold"
              >
                {node.tech.slice(0, 2).toUpperCase()}
              </span>
            )}
            <div>
              <p className="font-mono text-xs opacity-70">{node.label}</p>
              <p className="font-display text-lg font-bold">{node.tech}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
