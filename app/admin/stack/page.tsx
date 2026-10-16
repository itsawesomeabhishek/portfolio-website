import { getStack } from "@/lib/data";
import { StackManager } from "./StackManager";

export default async function AdminStackPage() {
  const stack = await getStack();

  return (
    <div className="space-y-6">
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <span className="border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-black uppercase text-ink">
          SECTION 03
        </span>
        <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
          Tech Stack & Skills
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Add programming languages, frameworks, databases, and tools with their icons and categories.
        </p>
      </div>

      <StackManager initialStack={stack} />
    </div>
  );
}
