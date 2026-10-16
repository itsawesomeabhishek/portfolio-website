import Image from "next/image";
import { identity } from "@/content/identity";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import type { Identity } from "@/content/types";

export function About({ data = identity }: { data?: Identity }) {
  return (
    <Section id="about" tone="white" labelledBy="about-title">
      <SectionHeading id="about-title" eyebrow={`STATUS: ${data.status}`}>
        ABOUT_ME
      </SectionHeading>

      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="relative mx-auto aspect-square w-full max-w-sm border-2 border-line bg-neo-yellow shadow-hard-lg">
          <Image
            src={data.avatar}
            alt={`Portrait of ${data.name}`}
            fill
            sizes="(min-width: 1024px) 384px, 90vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          {data.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className="grid gap-4 font-mono text-sm sm:grid-cols-2">
            <div className="border-2 border-line bg-background p-4 shadow-hard">
              <dt className="text-muted">LOCATION</dt>
              <dd className="mt-1 font-bold">{data.location}</dd>
            </div>
            <div className="border-2 border-line bg-background p-4 shadow-hard">
              <dt className="text-muted">STATUS</dt>
              <dd className="mt-1 font-bold">{data.status}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
