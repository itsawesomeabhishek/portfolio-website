import { getQuotes } from "@/lib/data";
import { QuotesManager } from "./QuotesManager";

export default async function AdminQuotesPage() {
  const quotes = await getQuotes();

  return (
    <div className="space-y-6">
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <span className="border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-black uppercase text-ink">
          SECTION 08
        </span>
        <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
          Quotes & Philosophies
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Manage the rotating quotes from scriptures, anime, and philosophers displayed across your website.
        </p>
      </div>

      <QuotesManager initialQuotes={quotes} />
    </div>
  );
}
