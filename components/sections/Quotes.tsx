import { quotes } from "@/content/quotes";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import type { Quote } from "@/content/types";

export function Quotes({ items = quotes }: { items?: readonly Quote[] }) {
  return (
    <Section id="quotes" tone="ink" labelledBy="quotes-title">
      <SectionHeading id="quotes-title" tone="dark" eyebrow="QUOTES.txt">
        WORDS_I_LIVE_BY
      </SectionHeading>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((quote) => (
          <li key={quote.text}>
            <figure className="h-full border-2 border-neo-green p-6">
              <blockquote className="text-lg leading-relaxed">“{quote.text}”</blockquote>
              <figcaption className="mt-4 font-mono text-sm font-bold text-neo-green">
                — {quote.author}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
