"use client";

import { useState } from "react";
import { Plus, Trash2, X, Save, AlertCircle } from "lucide-react";
import { saveStatAction, deleteStatAction } from "@/lib/actions/content";
import { TextField } from "@/components/admin/FormField";
import type { StatCard } from "@/content/types";

export function StatsManager({
  initialStats,
  githubProfile,
}: {
  initialStats: readonly StatCard[];
  githubProfile: string;
}) {
  const [stats] = useState<readonly StatCard[]>(initialStats);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await saveStatAction(null, formData);
    setIsPending(false);

    if (res.error) {
      setError(res.error);
    } else {
      window.location.reload();
    }
  };

  const handleDelete = async (label: string) => {
    if (!confirm(`Delete stat card '${label}'?`)) return;
    const res = await deleteStatAction(label);
    if (res.error) {
      alert(res.error);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs font-bold text-muted">
          GITHUB TARGET: {githubProfile}
        </div>
        <button
          type="button"
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center gap-2 border-2 border-line bg-neo-green px-4 py-2 font-mono text-xs font-black uppercase text-ink shadow-hard-sm hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>ADD STAT CARD</span>
        </button>
      </div>

      {isCreating && (
        <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
          <div className="flex items-center justify-between border-b-2 border-dashed border-line pb-3">
            <h2 className="font-display text-xl font-black uppercase text-ink">
              Add New Stat Card
            </h2>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="border border-line bg-background p-1 text-ink hover:bg-neo-red hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 border-2 border-line bg-neo-red/15 p-3 font-mono text-xs font-bold text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <TextField
                label="Stat Label"
                name="label"
                placeholder="e.g. LEETCODE"
                required
              />
              <TextField
                label="Value / Count"
                name="value"
                placeholder="e.g. 75+"
                required
              />
              <TextField
                label="Sub-Note"
                name="note"
                placeholder="e.g. problems solved"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t-2 border-dashed border-line">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="border-2 border-line bg-background px-4 py-2 font-mono text-xs font-bold uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 border-2 border-line bg-neo-green px-5 py-2 font-mono text-xs font-black uppercase text-ink shadow-hard-sm hover:scale-105 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{isPending ? "SAVING..." : "SAVE STAT CARD"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col justify-between border-2 border-line bg-card p-5 shadow-hard"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-muted uppercase">
                  {s.label}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(s.label)}
                  className="text-muted hover:text-destructive"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-3 font-display text-3xl font-black text-ink">
                {s.value}
              </div>

              {s.note && (
                <div className="mt-1 font-mono text-xs text-muted">
                  {s.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
