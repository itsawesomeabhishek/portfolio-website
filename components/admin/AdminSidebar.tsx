"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  BarChart3,
  GraduationCap,
  Award,
  Quote as QuoteIcon,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  Terminal,
} from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/identity", label: "Identity & Bio", icon: User },
  { href: "/admin/stack", label: "Tech Stack", icon: Cpu },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/stats", label: "Coding Stats", icon: BarChart3 },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/quotes", label: "Quotes", icon: QuoteIcon },
  { href: "/admin/contact", label: "Contact & Socials", icon: Mail },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r-2 border-line bg-card">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 border-b-2 border-line bg-neo-yellow p-4">
        <Terminal className="h-5 w-5 text-ink" />
        <div>
          <div className="font-mono text-xs font-black tracking-widest text-ink uppercase">
            ABHISHEK.EXE
          </div>
          <div className="font-mono text-[10px] font-bold text-ink/75">
            ADMIN CONSOLE v1.0
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <div className="px-2 py-1 font-mono text-[10px] font-bold tracking-wider text-muted uppercase">
          Content Modules
        </div>
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 border-2 px-3 py-2 font-mono text-xs font-bold transition-all ${
                isActive
                  ? "border-line bg-neo-green text-ink shadow-hard-sm"
                  : "border-transparent text-ink hover:border-line hover:bg-background"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="border-t-2 border-line p-3 space-y-2 bg-background/50">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between border-2 border-line bg-card px-3 py-2 font-mono text-xs font-bold text-ink shadow-hard-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Live Website
          </span>
          <span className="bg-neo-blue/20 border border-line px-1 text-[9px]">
            VIEW
          </span>
        </Link>

        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 border-2 border-line bg-neo-red/10 px-3 py-2 font-mono text-xs font-bold text-destructive transition-colors hover:bg-neo-red hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            <span>TERMINATE SESSION</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
