"use client";

import { useState } from "react";
import { Plus, Trash2, X, Save, AlertCircle, Quote as QuoteIcon } from "lucide-react";
import { saveQuoteAction, deleteQuoteAction } from "@/lib/actions/content";
import { TextField, TextareaField } from "@/components/admin/FormField";
import type { Quote } from "@/content/types";

export function QuotesManager({
  initialQuotes,
}: {
  initialQuotes: readonly Quote[];
}) {
  const [quotes] = useState<readonly Quote[]>(initialQuotes);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await saveQuoteAction(null, formData);
    setIsPending(false);

    if (res.error) {
      setError(res.error);
    } else {
      window.location.reload();
    }
  };

  const handleDelete = async (text: string) => {
    if (!confirm("Delete quote?")) return;
    const res = await deleteQuoteAction(text);
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
          TOTAL {quotes.length} QUOTES DISPLAYED
        </div>
        <button
          type="button"
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center gap-2 border-2 border-line bg-neo-green px-4 py-2 font-mono text-xs font-black uppercase text-ink shadow-hard-sm hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>ADD QUOTE</span>
        </button>
      </div>

      {isCreating && (
        <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
          <div className="flex items-center justify-between border-b-2 border-dashed border-line pb-3">
            <h2 className="font-display text-xl font-black uppercase text-ink">
              Add New Quote
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
            <TextareaField
              label="Quote Text"
              name="text"
              rows={3}
              placeholder="e.g. Arise, awake, and stop not till the goal is reached."
              required
            />

            <TextField
              label="Author / Attribution"
              name="author"
              placeholder="e.g. Katha Upanishad or Light Yagami, Death Note"
              required
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
                <span>{isPending ? "SAVING..." : "SAVE QUOTE"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of quotes */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {quotes.map((q, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between border-2 border-line bg-card p-5 shadow-hard"
          >
            <div>
              <QuoteIcon className="h-6 w-6 text-neo-yellow mb-2" />
              <p className="font-sans text-sm italic text-ink leading-relaxed">
                &ldquo;{q.text}&rdquo;
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-dashed border-line pt-3">
              <span className="font-mono text-xs font-bold text-muted">
                — {q.author}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(q.text)}
                className="text-muted hover:text-destructive"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
