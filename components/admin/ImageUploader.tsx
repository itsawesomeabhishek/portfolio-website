"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  currentValue?: string;
  folder?: string;
  accept?: string;
  onUploaded: (url: string) => void;
}

export function ImageUploader({
  label,
  currentValue = "",
  folder = "portfolio",
  accept = "image/*",
  onUploaded,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(currentValue);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Upload failed");
      }

      setPreview(data.url);
      onUploaded(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setPreview("");
    onUploaded("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-ink">
        {label}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Preview box */}
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center border-2 border-line bg-background p-1 shadow-hard-sm">
          {preview ? (
            preview.endsWith(".pdf") ? (
              <div className="flex flex-col items-center justify-center text-center">
                <span className="font-mono text-[10px] font-bold text-ink">PDF FILE</span>
                <span className="text-[9px] text-muted truncate max-w-[80px]">Uploaded</span>
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={preview}
                  alt="Upload preview"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )
          ) : (
            <UploadCloud className="h-6 w-6 text-muted" />
          )}

          {preview && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center border border-line bg-neo-red text-white shadow-hard-sm hover:scale-110"
              title="Remove"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Upload Button and URL input */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              id={`upload-${label.replace(/\s+/g, "-")}`}
            />
            <label
              htmlFor={`upload-${label.replace(/\s+/g, "-")}`}
              className={`inline-flex cursor-pointer items-center gap-2 border-2 border-line px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                uploading
                  ? "bg-muted text-white pointer-events-none"
                  : "bg-neo-yellow text-ink"
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="h-3.5 w-3.5" />
                  <span>Choose File</span>
                </>
              )}
            </label>

            {preview && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-neo-green">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Uploaded</span>
              </span>
            )}
          </div>

          <input
            type="text"
            value={preview}
            onChange={(e) => {
              setPreview(e.target.value);
              onUploaded(e.target.value);
            }}
            placeholder="Or enter direct URL / path (e.g. /assets/avatar.png)"
            className="w-full border-2 border-line bg-card px-3 py-1.5 font-mono text-xs text-ink outline-none focus:bg-white"
          />

          {error && (
            <div className="flex items-center gap-1 font-mono text-[11px] text-destructive">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
