import Link from "next/link";
import {
  FolderGit2,
  Cpu,
  Award,
  Briefcase,
  User,
  BarChart3,
  GraduationCap,
  Quote as QuoteIcon,
  Mail,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Server,
  Database,
  Cloud,
} from "lucide-react";
import {
  getProjects,
  getStack,
  getCertificates,
  getServices,
  getIdentity,
  getStats,
} from "@/lib/data";

export default async function AdminDashboardPage() {
  const [projects, stack, certificates, services, identity, { stats }] =
    await Promise.all([
      getProjects(),
      getStack(),
      getCertificates(),
      getServices(),
      getIdentity(),
      getStats(),
    ]);

  const quickStats = [
    {
      label: "TOTAL PROJECTS",
      value: projects.length.toString(),
      sub: `${projects.filter((p) => !p.placeholder).length} live write-ups`,
      href: "/admin/projects",
      color: "bg-neo-yellow",
      icon: FolderGit2,
    },
    {
      label: "TECH STACK",
      value: stack.length.toString(),
      sub: "languages & frameworks",
      href: "/admin/stack",
      color: "bg-neo-green",
      icon: Cpu,
    },
    {
      label: "CERTIFICATES",
      value: certificates.length.toString(),
      sub: "verified credentials",
      href: "/admin/certificates",
      color: "bg-neo-cyan",
      icon: Award,
    },
    {
      label: "SERVICES",
      value: services.length.toString(),
      sub: "client offerings",
      href: "/admin/services",
      color: "bg-neo-pink",
      icon: Briefcase,
    },
  ];

  const modules = [
    {
      title: "Identity & Bio",
      desc: "Edit your name, headline, bio paragraphs, avatar, resume URL, and current status.",
      href: "/admin/identity",
      icon: User,
      badge: identity.status,
    },
    {
      title: "Projects Showcase",
      desc: "Add new projects, upload screenshots, write summaries, and add live/github links.",
      href: "/admin/projects",
      icon: FolderGit2,
      badge: `${projects.length} Items`,
    },
    {
      title: "Tech Stack & Skills",
      desc: "Manage tech badges (React, Next.js, Node.js, PostgreSQL) and reorder display priority.",
      href: "/admin/stack",
      icon: Cpu,
      badge: `${stack.length} Skills`,
    },
    {
      title: "Certificates & Badges",
      desc: "Add HackerRank, Microsoft, or cloud certificates with badge images and issue dates.",
      href: "/admin/certificates",
      icon: Award,
      badge: `${certificates.length} Certs`,
    },
    {
      title: "Coding Stats",
      desc: "Update LeetCode problem count, GitHub profile status, and key achievements.",
      href: "/admin/stats",
      icon: BarChart3,
      badge: `${stats.length} Metrics`,
    },
    {
      title: "Services & Offerings",
      desc: "Configure services you offer (Web Dev, Full-Stack, UI) and bullet points.",
      href: "/admin/services",
      icon: Briefcase,
      badge: `${services.length} Services`,
    },
    {
      title: "Education & Coursework",
      desc: "Update university name, degree, graduation year, and degree highlight bullet points.",
      href: "/admin/education",
      icon: GraduationCap,
      badge: "Degree Info",
    },
    {
      title: "Quotes & Mantras",
      desc: "Customize the rotating philosophical and inspirational quotes on your portfolio.",
      href: "/admin/quotes",
      icon: QuoteIcon,
      badge: "Inspirations",
    },
    {
      title: "Contact & Socials",
      desc: "Change your contact receiving email and update GitHub, LinkedIn, or Twitter links.",
      href: "/admin/contact",
      icon: Mail,
      badge: "Email & Socials",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="border border-line bg-neo-green px-2 py-0.5 font-mono text-[10px] font-black uppercase text-ink">
                SYSTEM ONLINE
              </span>
              <span className="font-mono text-xs text-muted">
                Logged in as {identity.name}
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-ink md:text-4xl">
              Control Panel Overview
            </h1>
            <p className="mt-1 font-mono text-xs text-muted">
              Select any section below to update live portfolio information and assets.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 border-2 border-line bg-neo-yellow px-4 py-2 font-mono text-xs font-black uppercase text-ink shadow-hard-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <ExternalLink className="h-4 w-4" />
              View Public Site
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group border-2 border-line bg-card p-5 shadow-hard transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-muted uppercase">
                  {stat.label}
                </span>
                <div
                  className={`flex h-8 w-8 items-center justify-center border-2 border-line ${stat.color} shadow-hard-sm`}
                >
                  <Icon className="h-4 w-4 text-ink" />
                </div>
              </div>
              <div className="mt-3 font-display text-3xl font-black text-ink">
                {stat.value}
              </div>
              <div className="mt-1 flex items-center justify-between font-mono text-xs text-muted">
                <span>{stat.sub}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Management Modules Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-ink" />
            <h2 className="font-display text-xl font-black uppercase tracking-tight text-ink">
              Content Management Modules
            </h2>
          </div>
          <span className="font-mono text-xs text-muted">
            Click any module to edit
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.title}
                href={m.href}
                className="group flex flex-col justify-between border-2 border-line bg-card p-5 shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center border-2 border-line bg-background shadow-hard-sm">
                      <Icon className="h-5 w-5 text-ink" />
                    </div>
                    {m.badge && (
                      <span className="max-w-[150px] truncate border border-line bg-background px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-muted">
                        {m.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-black uppercase tracking-tight text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-muted leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1 border-t-2 border-dashed border-line pt-3 font-mono text-xs font-bold text-ink">
                  <span>CONFIGURE</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Architecture & Stack Info Card */}
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <h3 className="font-display text-lg font-black uppercase tracking-tight text-ink">
          System Infrastructure
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-3 border-2 border-line bg-background p-3.5">
            <Server className="h-5 w-5 shrink-0 text-neo-green" />
            <div>
              <div className="font-mono text-xs font-bold uppercase">App Router</div>
              <div className="font-mono text-[11px] text-muted">
                Next.js 16 with Partial Prerendering & Server Actions
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 border-2 border-line bg-background p-3.5">
            <Database className="h-5 w-5 shrink-0 text-neo-blue" />
            <div>
              <div className="font-mono text-xs font-bold uppercase">PostgreSQL / Supabase</div>
              <div className="font-mono text-[11px] text-muted">
                Prisma ORM with type-safe schemas & migrations
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 border-2 border-line bg-background p-3.5">
            <Cloud className="h-5 w-5 shrink-0 text-neo-yellow" />
            <div>
              <div className="font-mono text-xs font-bold uppercase">Cloudinary CDN</div>
              <div className="font-mono text-[11px] text-muted">
                Media upload pipeline for project screenshots & certs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
