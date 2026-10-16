import { services } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import type { Service } from "@/content/types";

const accents = ["bg-neo-yellow", "bg-neo-pink", "bg-neo-cyan"] as const;

export function Services({ items = services }: { items?: readonly Service[] }) {
  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeading id="services-title" eyebrow="WHAT I CAN BUILD">
        SERVICES
      </SectionHeading>

      <ul className="grid gap-8 md:grid-cols-3">
        {items.map((service, index) => (
          <li key={service.title}>
            <article className="flex h-full flex-col border-2 border-line bg-card shadow-hard-lg">
              <h3
                className={`border-b-2 border-line px-5 py-4 font-display text-xl font-black ${accents[index % accents.length]}`}
              >
                {service.title}
              </h3>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <p>{service.summary}</p>
                <ul className="mt-auto space-y-1 font-mono text-sm font-bold">
                  {service.points.map((point) => (
                    <li key={point}>&gt; {point}</li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
