import { getIdentity } from "@/lib/data";
import { IdentityForm } from "./IdentityForm";

export default async function AdminIdentityPage() {
  const identity = await getIdentity();

  return (
    <div className="space-y-6">
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <span className="border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-black uppercase text-ink">
          SECTION 01
        </span>
        <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
          Identity, Hero & Bio
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Manage your personal brand, headlines, bio description paragraphs, avatar, and resume file.
        </p>
      </div>

      <IdentityForm initialData={identity} />
    </div>
  );
}
