import { githubProfile, codingStats } from "@/content/stats";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import type { StatCard } from "@/content/types";

export function CodingStats({
  items = codingStats,
  profileUrl = githubProfile,
}: {
  items?: readonly StatCard[];
  profileUrl?: string;
}) {
  return (
    <Section id="coding-stats" tone="ink" labelledBy="stats-title">
      <SectionHeading id="stats-title" tone="dark" eyebrow="LIVE.STATS">
        CODING_STATS
      </SectionHeading>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((stat) => (
          <div key={stat.label} className="min-w-0 border-2 border-neo-green p-5">
            <dt className="font-mono text-xs text-neo-green">{stat.label}</dt>
            <dd
              className={`mt-2 font-display font-black [overflow-wrap:anywhere] ${
                stat.value.length > 8 ? "text-xl" : "text-3xl sm:text-4xl"
              }`}
            >
              {stat.value}
            </dd>
            {stat.note ? <dd className="mt-1 font-mono text-xs opacity-70">{stat.note}</dd> : null}
          </div>
        ))}
      </dl>

      <div className="mt-10">
        <Button href={profileUrl} external>
          VIEW GITHUB PROFILE
        </Button>
      </div>
    </Section>
  );
}
