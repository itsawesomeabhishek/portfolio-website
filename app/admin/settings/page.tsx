import { getNavLinks, getStats } from "@/lib/data";
import { SettingsManager } from "./SettingsManager";

export default async function AdminSettingsPage() {
  const [{ navLinks, hireMe }, { githubProfile }] = await Promise.all([
    getNavLinks(),
    getStats(),
  ]);

  return (
    <div className="space-y-6">
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <span className="border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-black uppercase text-ink">
          SECTION 10
        </span>
        <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
          Site Configuration & Cloud Integrations
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Inspect cloud service statuses (Supabase, Cloudinary) and manage navbar menu links.
        </p>
      </div>

      <SettingsManager
        initialNavLinks={navLinks}
        hireMe={hireMe}
        githubProfile={githubProfile}
      />
    </div>
  );
}
