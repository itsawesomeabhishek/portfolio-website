"use client";

import { useState } from "react";
import { Plus, Trash2, X, Save, AlertCircle, Check } from "lucide-react";
import { saveServiceAction, deleteServiceAction } from "@/lib/actions/content";
import { TextField, TextareaField, ArrayField } from "@/components/admin/FormField";
import type { Service } from "@/content/types";

export function ServicesManager({
  initialServices,
}: {
  initialServices: readonly Service[];
}) {
  const [services] = useState<readonly Service[]>(initialServices);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await saveServiceAction(null, formData);
    setIsPending(false);

    if (res.error) {
      setError(res.error);
    } else {
      window.location.reload();
    }
  };

  const handleDelete = async (title: string) => {
    if (!confirm(`Delete service '${title}'?`)) return;
    const res = await deleteServiceAction(title);
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
          TOTAL {services.length} SERVICES CONFIGURED
        </div>
        <button
          type="button"
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center gap-2 border-2 border-line bg-neo-green px-4 py-2 font-mono text-xs font-black uppercase text-ink shadow-hard-sm hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>ADD SERVICE</span>
        </button>
      </div>

      {isCreating && (
        <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
          <div className="flex items-center justify-between border-b-2 border-dashed border-line pb-3">
            <h2 className="font-display text-xl font-black uppercase text-ink">
              Add New Service
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
            <TextField
              label="Service Title"
              name="title"
              placeholder="e.g. FULL-STACK WEB APPS"
              required
            />

            <TextareaField
              label="Summary"
              name="summary"
              rows={2}
              placeholder="End-to-end applications from database to responsive interface..."
              required
            />

            <ArrayField
              label="Bullet Points / Offerings"
              name="points"
              initialValues={["Next.js & React", "Responsive layouts", "SEO-friendly"]}
              placeholder="e.g. Node.js & TypeScript"
            />

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
                <span>{isPending ? "SAVING..." : "SAVE SERVICE"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of services */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="flex flex-col justify-between border-2 border-line bg-card p-6 shadow-hard"
          >
            <div>
              <div className="flex items-center justify-between border-b-2 border-dashed border-line pb-3">
                <h3 className="font-display text-lg font-black uppercase tracking-tight text-ink">
                  {s.title}
                </h3>
                <button
                  type="button"
                  onClick={() => handleDelete(s.title)}
                  className="text-muted hover:text-destructive"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-3 font-mono text-xs text-muted leading-relaxed">
                {s.summary}
              </p>

              <ul className="mt-4 space-y-2 font-mono text-xs text-ink">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center border border-line bg-neo-green">
                      <Check className="h-3 w-3 text-ink" />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
