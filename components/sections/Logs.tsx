import Image from "next/image";
import { certificates, education } from "@/content/logs";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import type { Education, Certificate } from "@/content/types";

export function Logs({
  educationData = education,
  certificatesData = certificates,
}: {
  educationData?: Education;
  certificatesData?: readonly Certificate[];
}) {
  return (
    <Section id="logs" labelledBy="logs-title">
      <SectionHeading id="logs-title" eyebrow="EDUCATION + CERTIFICATES">
        SYSTEM_LOGS
      </SectionHeading>

      <article className="border-2 border-line bg-card p-6 shadow-hard-lg">
        <p className="font-mono text-sm font-bold">
          <span className="bg-neo-yellow px-2 py-1">
            {educationData.start} — {educationData.end}
          </span>
        </p>
        <h3 className="mt-4 font-display text-2xl font-black uppercase sm:text-3xl">{educationData.school}</h3>
        <p className="mt-1 font-mono text-sm font-bold">{educationData.degree}</p>
        <ul className="mt-4 list-inside list-disc space-y-1">
          {educationData.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </article>

      <h3 className="mb-6 mt-16 font-mono text-xl font-bold">CERTIFICATES.log</h3>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificatesData.map((cert) => (
          <li key={cert.title} className="border-2 border-line bg-card shadow-hard">
            <div className="relative aspect-[4/3] border-b-2 border-line bg-background">
              <Image
                src={cert.image}
                alt={cert.alt}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                className="object-contain"
              />
            </div>
            <div className="p-4">
              <h4 className="font-display text-lg font-bold">{cert.title}</h4>
              <p className="mt-1 font-mono text-xs text-muted">
                {cert.issuer} · {cert.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
