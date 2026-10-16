"use client";

import { useActionState, useState } from "react";
import { Plus, Trash2, Save, CheckCircle2, AlertCircle, ExternalLink, Loader2 } from "lucide-react";
import { updateContactAction, saveSocialAction, deleteSocialAction, type ActionResponse } from "@/lib/actions/content";
import { TextField } from "@/components/admin/FormField";
import type { ContactInfo } from "@/content/types";

export function ContactManager({
  initialContact,
}: {
  initialContact: ContactInfo;
}) {
  const [emailState, emailAction, isEmailPending] = useActionState<ActionResponse | null, FormData>(
    updateContactAction,
    null
  );

  const [socials] = useState(initialContact.socials);
  const [isAddingSocial, setIsAddingSocial] = useState(false);
  const [socialError, setSocialError] = useState<string | null>(null);
  const [isSocialPending, setIsSocialPending] = useState(false);

  const handleSocialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSocialPending(true);
    setSocialError(null);

    const formData = new FormData(e.currentTarget);
    const res = await saveSocialAction(null, formData);
    setIsSocialPending(false);

    if (res.error) {
      setSocialError(res.error);
    } else {
      window.location.reload();
    }
  };

  const handleDeleteSocial = async (label: string) => {
    if (!confirm(`Remove link '${label}'?`)) return;
    const res = await deleteSocialAction(label);
    if (res.error) {
      alert(res.error);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      {/* Email Config Form */}
      <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
        <h2 className="font-display text-lg font-black uppercase text-ink border-b-2 border-dashed border-line pb-2">
          Contact Recipient Email
        </h2>

        {emailState?.success && (
          <div className="flex items-center gap-2 border-2 border-line bg-neo-green/20 p-3 font-mono text-xs font-bold text-ink">
            <CheckCircle2 className="h-4 w-4 text-neo-green shrink-0" />
            <span>{emailState.message}</span>
          </div>
        )}

        {emailState?.error && (
          <div className="flex items-center gap-2 border-2 border-line bg-neo-red/15 p-3 font-mono text-xs font-bold text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{emailState.error}</span>
          </div>
        )}

        <form action={emailAction} className="space-y-4">
          <TextField
            label="Inbound Message Recipient Email"
            name="email"
            type="email"
            defaultValue={initialContact.email}
            description="Visitors sending contact requests or mailto clicks will reach this address"
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isEmailPending}
              className="inline-flex items-center gap-2 border-2 border-line bg-neo-green px-5 py-2 font-mono text-xs font-black uppercase text-ink shadow-hard-sm hover:scale-105 disabled:opacity-50"
            >
              {isEmailPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>SAVING...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>UPDATE EMAIL</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Socials Manager */}
      <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
        <div className="flex items-center justify-between border-b-2 border-dashed border-line pb-3">
          <h2 className="font-display text-lg font-black uppercase text-ink">
            Social Media & External Profiles
          </h2>
          <button
            type="button"
            onClick={() => setIsAddingSocial(!isAddingSocial)}
            className="inline-flex items-center gap-1.5 border-2 border-line bg-neo-yellow px-3 py-1 font-mono text-xs font-bold text-ink shadow-hard-sm hover:scale-105"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>ADD SOCIAL LINK</span>
          </button>
        </div>

        {isAddingSocial && (
          <form onSubmit={handleSocialSubmit} className="border-2 border-line bg-background p-4 space-y-3">
            <div className="font-mono text-xs font-black uppercase">
              Add Social Profile
            </div>

            {socialError && (
              <div className="flex items-center gap-2 border-2 border-line bg-neo-red/15 p-2 font-mono text-xs font-bold text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{socialError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextField
                label="Platform Label"
                name="label"
                placeholder="e.g. TWITTER, DISCORD, LEETCODE"
                required
              />
              <TextField
                label="Profile URL"
                name="href"
                type="url"
                placeholder="https://..."
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingSocial(false)}
                className="border border-line bg-card px-3 py-1 font-mono text-xs font-bold uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSocialPending}
                className="border-2 border-line bg-neo-green px-4 py-1 font-mono text-xs font-black uppercase text-ink shadow-hard-sm hover:scale-105"
              >
                {isSocialPending ? "SAVING..." : "SAVE LINK"}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {socials.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between border-2 border-line bg-background p-3"
            >
              <div className="flex items-center gap-3">
                <span className="border border-line bg-card px-2 py-0.5 font-mono text-xs font-black uppercase text-ink">
                  {s.label}
                </span>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-muted hover:text-ink hover:underline flex items-center gap-1 truncate max-w-sm"
                >
                  <span>{s.href}</span>
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteSocial(s.label)}
                className="text-muted hover:text-destructive p-1"
                title="Remove link"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
