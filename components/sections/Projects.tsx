import Image from "next/image";
import { projects } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import type { Project } from "@/content/types";

export function Projects({ items = projects }: { items?: readonly Project[] }) {
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading id="projects-title" eyebrow="SELECTED WORK">
        PROJECTS
      </SectionHeading>

      <ul className="grid gap-10 lg:grid-cols-2">
        {items.map((project) => (
          <li key={project.slug}>
            <article className="flex h-full flex-col border-2 border-line bg-card shadow-hard-lg">
              <div className="relative aspect-video border-b-2 border-line bg-background">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="font-display text-2xl font-black uppercase">{project.title}</h3>
                <p className={project.placeholder ? "font-mono text-sm text-muted" : ""}>
                  {project.summary}
                </p>
                {project.tags.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border-2 border-line bg-neo-yellow px-2 py-1 font-mono text-xs font-bold"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {project.live || project.github ? (
                  <div className="mt-auto flex flex-wrap gap-3 pt-2">
                    {project.live ? (
                      <Button href={project.live} external srContext={project.title}>
                        LIVE
                      </Button>
                    ) : null}
                    {project.github ? (
                      <Button
                        href={project.github}
                        external
                        variant="outline"
                        srContext={project.title}
                      >
                        CODE
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
