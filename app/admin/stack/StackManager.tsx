"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, X, Save, AlertCircle, Cpu } from "lucide-react";
import { saveStackItemAction, deleteStackItemAction } from "@/lib/actions/content";
import { TextField } from "@/components/admin/FormField";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { StackNode } from "@/content/types";

export function StackManager({
  initialStack,
}: {
  initialStack: readonly StackNode[];
}) {
  const [items] = useState<readonly StackNode[]>(initialStack);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [iconUrl, setIconUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("icon", iconUrl);

    const res = await saveStackItemAction(null, formData);
    setIsPending(false);

    if (res.error) {
      setError(res.error);
    } else {
      window.location.reload();
    }
  };

  const handleDelete = async (tech: string) => {
    if (!confirm(`Remove skill '${tech}'?`)) return;
    const res = await deleteStackItemAction(tech);
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
          TOTAL {items.length} SKILLS CONFIGURED
        </div>
        <button
          type="button"
          onClick={() => {
            setIsCreating(!isCreating);
            setIconUrl("");
          }}
          className="inline-flex items-center gap-2 border-2 border-line bg-neo-green px-4 py-2 font-mono text-xs font-black uppercase text-ink shadow-hard-sm hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>ADD NEW SKILL</span>
        </button>
      </div>

      {isCreating && (
        <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
          <div className="flex items-center justify-between border-b-2 border-dashed border-line pb-3">
            <h2 className="font-display text-xl font-black uppercase text-ink">
              Add New Tech Skill
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
                label="Category / Label"
                name="label"
                placeholder="e.g. FRONTEND, DATABASE, CLOUD"
                required
              />
              <TextField
                label="Technology Name"
                name="tech"
                placeholder="e.g. Next.js, PostgreSQL"
                required
              />
              <TextField
                label="Sort Order"
                name="sortOrder"
                type="number"
                defaultValue={items.length}
              />
            </div>

            <ImageUploader
              label="Skill Logo / Icon"
              currentValue={iconUrl}
              folder="portfolio/skills"
              onUploaded={(url) => setIconUrl(url)}
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
                <span>{isPending ? "SAVING..." : "SAVE SKILL"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of skills */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((node) => (
          <div
            key={node.tech}
            className="flex flex-col justify-between border-2 border-line bg-card p-3 shadow-hard transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="border border-line bg-background px-1.5 py-0.5 font-mono text-[9px] font-bold text-muted uppercase">
                  {node.label}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(node.tech)}
                  className="text-muted hover:text-destructive"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center border border-line bg-background p-1">
                  {node.icon ? (
                    <Image
                      src={node.icon}
                      alt={node.tech}
                      fill
                      className="object-contain p-0.5"
                      unoptimized
                    />
                  ) : (
                    <Cpu className="h-4 w-4 text-muted" />
                  )}
                </div>
                <div className="font-display text-sm font-black text-ink uppercase truncate">
                  {node.tech}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
