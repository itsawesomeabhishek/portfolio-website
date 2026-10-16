"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, AlertCircle, Save, Loader2 } from "lucide-react";
import { updateIdentityAction, type ActionResponse } from "@/lib/actions/content";
import { TextField, TextareaField, ArrayField } from "@/components/admin/FormField";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { Identity } from "@/content/types";

export function IdentityForm({ initialData }: { initialData: Identity }) {
  const [state, action, isPending] = useActionState<ActionResponse | null, FormData>(
    updateIdentityAction,
    null
  );

  const [avatarUrl, setAvatarUrl] = useState<string>(initialData.avatar);
  const [resumeUrl, setResumeUrl] = useState<string>(initialData.resume);

  return (
    <form action={action} className="space-y-6">
      {/* Toast Alert */}
      {state?.success && (
        <div className="flex items-center gap-2 border-2 border-line bg-neo-green/20 p-4 font-mono text-xs font-bold text-ink shadow-hard-sm">
          <CheckCircle2 className="h-5 w-5 text-neo-green shrink-0" />
          <span>{state.message || "Identity changes saved successfully!"}</span>
        </div>
      )}

      {state?.error && (
        <div className="flex items-center gap-2 border-2 border-line bg-neo-red/15 p-4 font-mono text-xs font-bold text-destructive shadow-hard-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Basic Info Card */}
      <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
        <h2 className="font-display text-lg font-black uppercase text-ink border-b-2 border-dashed border-line pb-2">
          Basic Identity
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField
            label="Full Name"
            name="name"
            defaultValue={initialData.name}
            required
          />
          <TextField
            label="Handle / Tag"
            name="handle"
            defaultValue={initialData.handle}
            required
          />
          <TextField
            label="Logo Text"
            name="logo"
            defaultValue={initialData.logo}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Headline Solid"
            name="headlineSolid"
            defaultValue={initialData.headline.solid}
            description="e.g. FULL-STACK"
            required
          />
          <TextField
            label="Headline Outlined"
            name="headlineOutlined"
            defaultValue={initialData.headline.outlined}
            description="e.g. DEVELOPER"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Hero Status Badge"
            name="heroStatus"
            defaultValue={initialData.heroStatus}
            required
          />
          <TextField
            label="Location"
            name="location"
            defaultValue={initialData.location}
            required
          />
        </div>

        <TextField
          label="Current Availability Status"
          name="status"
          defaultValue={initialData.status}
          description="Displayed on About section"
          required
        />
      </div>

      {/* Role Banner & Terminal */}
      <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
        <h2 className="font-display text-lg font-black uppercase text-ink border-b-2 border-dashed border-line pb-2">
          Role Banner & Terminal Box
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Role Banner Intro"
            name="roleBannerIntro"
            defaultValue={initialData.roleBanner.intro}
            required
          />
          <TextField
            label="Role Banner Skills"
            name="roleBannerSkills"
            defaultValue={initialData.roleBanner.skills}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Terminal Title"
            name="terminalTitle"
            defaultValue={initialData.terminalTitle}
            required
          />
          <TextField
            label="Site Base URL"
            name="siteUrl"
            type="url"
            defaultValue={initialData.siteUrl}
            required
          />
        </div>

        <ArrayField
          label="Terminal Whoami Tags"
          name="whoami"
          initialValues={initialData.whoami}
          placeholder="e.g. full-stack-dev | cs-student"
        />
      </div>

      {/* Bio Paragraphs */}
      <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
        <h2 className="font-display text-lg font-black uppercase text-ink border-b-2 border-dashed border-line pb-2">
          Bio & Description
        </h2>

        <ArrayField
          label="Bio Paragraphs (Displayed in About Section)"
          name="bio"
          initialValues={initialData.bio}
          placeholder="Write bio paragraph here..."
        />

        <TextareaField
          label="Meta SEO Description"
          name="description"
          defaultValue={initialData.description}
          rows={3}
          required
        />

        <div className="w-48">
          <TextField
            label="Copyright Year"
            name="copyrightYear"
            type="number"
            defaultValue={initialData.copyrightYear}
            required
          />
        </div>
      </div>

      {/* Assets / Media */}
      <div className="border-2 border-line bg-card p-6 shadow-hard space-y-6">
        <h2 className="font-display text-lg font-black uppercase text-ink border-b-2 border-dashed border-line pb-2">
          Avatar & Resume Assets
        </h2>

        <input type="hidden" name="avatar" value={avatarUrl} />
        <ImageUploader
          label="Profile Avatar Image"
          currentValue={avatarUrl}
          folder="portfolio/avatar"
          onUploaded={(url) => setAvatarUrl(url)}
        />

        <div className="border-t-2 border-dashed border-line pt-4">
          <input type="hidden" name="resume" value={resumeUrl} />
          <ImageUploader
            label="Resume PDF File"
            currentValue={resumeUrl}
            folder="portfolio/resume"
            accept=".pdf,application/pdf"
            onUploaded={(url) => setResumeUrl(url)}
          />
        </div>
      </div>

      {/* Save Button Bar */}
      <div className="sticky bottom-4 z-20 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 border-2 border-line bg-neo-green px-6 py-3 font-mono text-sm font-black uppercase tracking-wider text-ink shadow-hard-lg transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-xl disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>SAVING IDENTITY...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>SAVE IDENTITY CHANGES</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
