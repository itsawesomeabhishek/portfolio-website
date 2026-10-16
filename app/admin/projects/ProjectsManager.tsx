"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, ExternalLink, GitBranch, X, Save, AlertCircle } from "lucide-react";
import { saveProjectAction, deleteProjectAction } from "@/lib/actions/content";
import { TextField, TextareaField } from "@/components/admin/FormField";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { Project } from "@/content/types";

export function ProjectsManager({
  initialProjects,
}: {
  initialProjects: readonly Project[];
}) {
  const [projects] = useState<readonly Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const startCreate = () => {
    setEditingProject(null);
    setImageUrl("");
    setError(null);
    setIsCreating(true);
  };

  const startEdit = (p: Project) => {
    setIsCreating(false);
    setEditingProject(p);
    setImageUrl(p.image);
    setError(null);
  };

  const cancelForm = () => {
    setEditingProject(null);
    setIsCreating(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("image", imageUrl);

    const res = await saveProjectAction(null, formData);
    setIsPending(false);

    if (res.error) {
      setError(res.error);
    } else {
      window.location.reload();
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete project '${slug}'?`)) return;
    const res = await deleteProjectAction(slug);
    if (res.error) {
      alert(res.error);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs font-bold text-muted">
          SHOWING {projects.length} PROJECTS
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 border-2 border-line bg-neo-green px-4 py-2 font-mono text-xs font-black uppercase text-ink shadow-hard-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          <span>ADD NEW PROJECT</span>
        </button>
      </div>

      {/* Create / Edit Form Modal / Box */}
      {(isCreating || editingProject) && (
        <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
          <div className="flex items-center justify-between border-b-2 border-dashed border-line pb-3">
            <h2 className="font-display text-xl font-black uppercase text-ink">
              {isCreating ? "Add New Project" : `Edit Project: ${editingProject?.title}`}
            </h2>
            <button
              type="button"
              onClick={cancelForm}
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField
                label="Project Title"
                name="title"
                defaultValue={editingProject?.title || ""}
                placeholder="e.g. Debloat AI"
                required
              />
              <TextField
                label="URL Slug (unique ID)"
                name="slug"
                defaultValue={editingProject?.slug || ""}
                placeholder="e.g. debloat-ai"
                required
              />
            </div>

            <TextareaField
              label="Summary / Write-up"
              name="summary"
              rows={3}
              defaultValue={editingProject?.summary || ""}
              placeholder="Describe what the project does, tech used, and problems solved..."
              required
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField
                label="Tags (Comma Separated)"
                name="tags"
                defaultValue={editingProject?.tags?.join(", ") || ""}
                placeholder="React, Next.js, TypeScript, Tailwind"
              />
              <TextField
                label="Image Alt Text"
                name="alt"
                defaultValue={editingProject?.alt || ""}
                placeholder="Debloat AI screenshot"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField
                label="Live Demo URL"
                name="live"
                type="url"
                defaultValue={editingProject?.live || ""}
                placeholder="https://myproject.com"
              />
              <TextField
                label="GitHub Repo URL"
                name="github"
                type="url"
                defaultValue={editingProject?.github || ""}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-ink cursor-pointer pt-3">
                  <input
                    type="checkbox"
                    name="placeholder"
                    defaultChecked={editingProject?.placeholder ?? false}
                    className="h-4 w-4 rounded-none border-2 border-line text-neo-green focus:ring-0"
                  />
                  <span>Mark as Placeholder (Coming Soon)</span>
                </label>
              </div>
              <TextField
                label="Sort Order"
                name="sortOrder"
                type="number"
                defaultValue={0}
              />
            </div>

            <ImageUploader
              label="Project Screenshot / Preview Image"
              currentValue={imageUrl}
              folder="portfolio/projects"
              onUploaded={(url) => setImageUrl(url)}
            />

            <div className="flex justify-end gap-3 pt-3 border-t-2 border-dashed border-line">
              <button
                type="button"
                onClick={cancelForm}
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
                <span>{isPending ? "SAVING..." : "SAVE PROJECT"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.slug}
            className="flex flex-col justify-between border-2 border-line bg-card p-5 shadow-hard"
          >
            <div>
              {/* Image Preview */}
              <div className="relative mb-4 h-48 w-full border-2 border-line bg-background overflow-hidden">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.alt || p.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted">
                    NO IMAGE
                  </div>
                )}
                {p.placeholder && (
                  <span className="absolute top-2 right-2 border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase">
                    COMING SOON
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-ink">
                  {p.title}
                </h3>
                <span className="border border-line bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted">
                  /{p.slug}
                </span>
              </div>

              <p className="mt-2 font-mono text-xs text-muted line-clamp-3">
                {p.summary}
              </p>

              {/* Tags */}
              {p.tags && p.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-line bg-background px-2 py-0.5 font-mono text-[10px] font-bold text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="mt-4 flex items-center justify-between border-t-2 border-dashed border-line pt-3">
              <div className="flex items-center gap-2">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-line bg-card p-1.5 text-ink hover:bg-neo-yellow"
                    title="Live preview"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-line bg-card p-1.5 text-ink hover:bg-neo-yellow"
                    title="GitHub Repository"
                  >
                    <GitBranch className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(p)}
                  className="inline-flex items-center gap-1 border-2 border-line bg-neo-yellow px-2.5 py-1 font-mono text-xs font-bold text-ink shadow-hard-sm hover:scale-105"
                >
                  <Edit2 className="h-3 w-3" />
                  <span>EDIT</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p.slug)}
                  className="inline-flex items-center gap-1 border-2 border-line bg-neo-red/10 px-2.5 py-1 font-mono text-xs font-bold text-destructive hover:bg-neo-red hover:text-white"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>DELETE</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
