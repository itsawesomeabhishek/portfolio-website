"use client";

import { CheckCircle2, AlertTriangle, Database, Cloud, ShieldCheck } from "lucide-react";
import type { NavLink } from "@/content/types";

export function SettingsManager({
  initialNavLinks,
  hireMe,
  githubProfile,
}: {
  initialNavLinks: readonly NavLink[];
  hireMe: NavLink;
  githubProfile: string;
}) {
  return (
    <div className="space-y-8">
      {/* Cloud Integrations Status */}
      <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
        <h2 className="font-display text-lg font-black uppercase text-ink border-b-2 border-dashed border-line pb-2">
          Cloud Integrations & Credentials Status
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Supabase Status */}
          <div className="border-2 border-line bg-background p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-neo-blue" />
                <span className="font-mono text-xs font-black uppercase">Supabase DB</span>
              </div>
              <p className="font-mono text-[11px] text-muted leading-relaxed">
                PostgreSQL database storing portfolio content. When connection strings are added in <code className="bg-neo-yellow/30 px-1 font-bold">.env.local</code>, live edits sync automatically.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] font-bold text-neo-green">
              <CheckCircle2 className="h-4 w-4" />
              <span>FALLBACK READY</span>
            </div>
          </div>

          {/* Cloudinary Status */}
          <div className="border-2 border-line bg-background p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="h-5 w-5 text-neo-yellow" />
                <span className="font-mono text-xs font-black uppercase">Cloudinary CDN</span>
              </div>
              <p className="font-mono text-[11px] text-muted leading-relaxed">
                Image & PDF upload pipeline. If keys are missing, uploads are safely stored in <code className="bg-neo-yellow/30 px-1 font-bold">/public/uploads</code>.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] font-bold text-neo-green">
              <CheckCircle2 className="h-4 w-4" />
              <span>STORAGE READY</span>
            </div>
          </div>

          {/* NextAuth / JWT Status */}
          <div className="border-2 border-line bg-background p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-neo-green" />
                <span className="font-mono text-xs font-black uppercase">Admin Auth</span>
              </div>
              <p className="font-mono text-[11px] text-muted leading-relaxed">
                Secured via HTTP-only JWT cookies, encrypted session tokens, and Next.js 16 Proxy route guards.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] font-bold text-neo-green">
              <CheckCircle2 className="h-4 w-4" />
              <span>ACTIVE SESSION</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu Configuration */}
      <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
        <h2 className="font-display text-lg font-black uppercase text-ink border-b-2 border-dashed border-line pb-2">
          Public Navigation Links
        </h2>

        <div className="space-y-2">
          {initialNavLinks.map((link) => (
            <div
              key={link.label}
              className="flex items-center justify-between border-2 border-line bg-background p-3"
            >
              <div className="flex items-center gap-3">
                <span className="border border-line bg-card px-2 py-0.5 font-mono text-xs font-black text-ink">
                  {link.label}
                </span>
                <span className="font-mono text-xs text-muted">
                  Targets: {link.href}
                </span>
              </div>
              <span className="border border-line bg-neo-green/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink">
                ACTIVE
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between border-2 border-line bg-background p-3">
            <div className="flex items-center gap-3">
              <span className="border border-line bg-neo-yellow px-2 py-0.5 font-mono text-xs font-black text-ink">
                {hireMe.label}
              </span>
              <span className="font-mono text-xs text-muted">
                Targets: {hireMe.href}
              </span>
            </div>
            <span className="border border-line bg-neo-yellow/30 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink">
              PRIMARY CTA
            </span>
          </div>
        </div>
      </div>

      {/* Global Config Card */}
      <div className="border-2 border-line bg-card p-6 shadow-hard space-y-4">
        <h2 className="font-display text-lg font-black uppercase text-ink border-b-2 border-dashed border-line pb-2">
          Site Constants
        </h2>
        <div className="font-mono text-xs text-ink space-y-2">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <span className="text-muted">GLOBAL GITHUB URL:</span>
            <span className="font-bold">{githubProfile}</span>
          </div>
          <div className="flex items-center justify-between border-b border-line pb-2">
            <span className="text-muted">ADMIN ACCESS ROUTE:</span>
            <span className="font-bold">/admin</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted">MEDIA UPLOAD API:</span>
            <span className="font-bold">/api/upload</span>
          </div>
        </div>
      </div>
    </div>
  );
}
