"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle, Save, Loader2 } from "lucide-react";
import { updateEducationAction, type ActionResponse } from "@/lib/actions/content";
import { TextField, ArrayField } from "@/components/admin/FormField";
import type { Education } from "@/content/types";

export function EducationForm({ initialData }: { initialData: Education }) {
  const [state, action, isPending] = useActionState<ActionResponse | null, FormData>(
    updateEducationAction,
    null
  );

  return (
    <form action={action} className="space-y-6">
      {state?.success && (
        <div className="flex items-center gap-2 border-2 border-line bg-neo-green/20 p-4 font-mono text-xs font-bold text-ink shadow-hard-sm">
          <CheckCircle2 className="h-5 w-5 text-neo-green shrink-0" />
          <span>{state.message || "Education details updated!"}</span>
        </div>
      )}

      {state?.error && (
        <div className="flex items-center gap-2 border-2 border-line bg-neo-red/15 p-4 font-mono text-xs font-bold text-destructive shadow-hard-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="School / University"
            name="school"
            defaultValue={initialData.school}
            required
          />
          <TextField
            label="Degree Program"
            name="degree"
            defaultValue={initialData.degree}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Start Year"
            name="start"
            defaultValue={initialData.start}
            placeholder="e.g. 2024"
            required
          />
          <TextField
            label="End Year / Status"
            name="end"
            defaultValue={initialData.end}
            placeholder="e.g. 2028 (Expected)"
            required
          />
        </div>

        <ArrayField
          label="Key Facts / Coursework Highlights"
          name="facts"
          initialValues={initialData.facts}
          placeholder="e.g. 75+ LeetCode problems solved"
        />

        <div className="flex justify-end pt-4 border-t-2 border-dashed border-line">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 border-2 border-line bg-neo-green px-6 py-2.5 font-mono text-xs font-black uppercase text-ink shadow-hard-sm hover:scale-105 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>SAVING...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>SAVE EDUCATION</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
