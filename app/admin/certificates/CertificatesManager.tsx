"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, X, Save, AlertCircle, Award } from "lucide-react";
import { saveCertificateAction, deleteCertificateAction } from "@/lib/actions/content";
import { TextField } from "@/components/admin/FormField";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { Certificate } from "@/content/types";

export function CertificatesManager({
  initialCertificates,
}: {
  initialCertificates: readonly Certificate[];
}) {
  const [certificates] = useState<readonly Certificate[]>(initialCertificates);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("image", imageUrl);

    const res = await saveCertificateAction(null, formData);
    setIsPending(false);

    if (res.error) {
      setError(res.error);
    } else {
      window.location.reload();
    }
  };

  const handleDelete = async (title: string) => {
    if (!confirm(`Delete certificate '${title}'?`)) return;
    const res = await deleteCertificateAction(title);
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
          TOTAL {certificates.length} CERTIFICATES LISTED
        </div>
        <button
          type="button"
          onClick={() => {
            setIsCreating(!isCreating);
            setImageUrl("");
          }}
          className="inline-flex items-center gap-2 border-2 border-line bg-neo-green px-4 py-2 font-mono text-xs font-black uppercase text-ink shadow-hard-sm hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>ADD CERTIFICATE</span>
        </button>
      </div>

      {isCreating && (
        <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
          <div className="flex items-center justify-between border-b-2 border-dashed border-line pb-3">
            <h2 className="font-display text-xl font-black uppercase text-ink">
              Add New Certificate
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
                label="Certificate Title"
                name="title"
                placeholder="e.g. Problem Solving (Basic)"
                required
              />
              <TextField
                label="Issuing Organization"
                name="issuer"
                placeholder="e.g. HackerRank / Microsoft"
                required
              />
              <TextField
                label="Date of Issue"
                name="date"
                placeholder="e.g. Feb 2026"
                required
              />
            </div>

            <TextField
              label="Alt Description"
              name="alt"
              placeholder="e.g. HackerRank Problem Solving certificate badge"
              required
            />

            <ImageUploader
              label="Certificate Badge / Image"
              currentValue={imageUrl}
              folder="portfolio/certificates"
              onUploaded={(url) => setImageUrl(url)}
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
                <span>{isPending ? "SAVING..." : "SAVE CERTIFICATE"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of certificates */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {certificates.map((c) => (
          <div
            key={c.title}
            className="flex flex-col justify-between border-2 border-line bg-card p-4 shadow-hard"
          >
            <div>
              <div className="relative mb-3 h-36 w-full border-2 border-line bg-background p-2">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.alt || c.title}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Award className="h-10 w-10 text-muted" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="border border-line bg-neo-yellow/30 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase">
                  {c.issuer}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  {c.date}
                </span>
              </div>

              <h3 className="mt-2 font-display text-base font-black uppercase tracking-tight text-ink">
                {c.title}
              </h3>
            </div>

            <div className="mt-4 flex justify-end border-t border-dashed border-line pt-2">
              <button
                type="button"
                onClick={() => handleDelete(c.title)}
                className="text-xs font-mono font-bold text-destructive hover:underline"
              >
                REMOVE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
