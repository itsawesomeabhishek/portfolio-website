import { getStats } from "@/lib/data";
import { StatsManager } from "./StatsManager";

export default async function AdminStatsPage() {
  const { stats, githubProfile } = await getStats();

  return (
    <div className="space-y-6">
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <span className="border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-black uppercase text-ink">
          SECTION 05
        </span>
        <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
          Coding Stats & Metrics
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Update your LeetCode problem counter, certificates count, GitHub handle, and achievement cards.
        </p>
      </div>

      <StatsManager initialStats={stats} githubProfile={githubProfile} />
    </div>
  );
}
