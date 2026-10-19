"use client";

import { usePathname } from "next/navigation";
import { Database } from "lucide-react";

export function AdminTopbar() {
  const pathname = usePathname();
  const segment = pathname.split("/")[2] || "Dashboard";
  const title = segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <header className="flex h-16 items-center justify-between border-b-2 border-line bg-card px-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-bold text-muted uppercase">
          ADMIN /
        </span>
        <h1 className="font-display text-lg font-black tracking-tight text-ink uppercase">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* DB Connection Badge */}
        <div className="hidden items-center gap-2 border-2 border-line bg-background px-2.5 py-1 font-mono text-[11px] font-bold sm:flex">
          <Database className="h-3.5 w-3.5 text-neo-blue" />
          <span>DB: SUPABASE / READY</span>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 border-2 border-line bg-neo-green/20 px-2.5 py-1 font-mono text-[11px] font-bold text-ink">
          <span className="h-2 w-2 rounded-full bg-neo-green animate-pulse" />
          <span>SESSION ACTIVE</span>
        </div>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2 border-2 border-line bg-neo-yellow px-2 py-1 font-mono text-xs font-black">
          <span>ABHISHEK</span>
        </div>
      </div>
    </header>
  );
}
