import { supabase } from "@/lib/supabase";
import { identity as staticIdentity } from "@/content/identity";
import { stack as staticStack } from "@/content/stack";
import { projects as staticProjects } from "@/content/projects";
import { services as staticServices } from "@/content/services";
import { codingStats as staticStats, githubProfile as staticGithub } from "@/content/stats";
import { education as staticEducation, certificates as staticCertificates } from "@/content/logs";
import { quotes as staticQuotes } from "@/content/quotes";
import { contact as staticContact } from "@/content/contact";
import { navLinks as staticNavLinks, hireMe as staticHireMe } from "@/content/nav";
import type {
  Identity,
  StackNode,
  Project,
  Service,
  StatCard,
  Education,
  Certificate,
  Quote,
  ContactInfo,
  NavLink,
} from "@/content/types";

// ─── 1. Identity ─────────────────────────────────────────
export async function getIdentity(): Promise<Identity> {
  if (!supabase) return staticIdentity;
  try {
    const { data, error } = await supabase
      .from("identity")
      .select("*")
      .eq("id", "singleton")
      .maybeSingle();

    if (error || !data) return staticIdentity;

    return {
      name: data.name,
      handle: data.handle,
      logo: data.logo,
      headline: { solid: data.headline_solid, outlined: data.headline_outlined },
      heroStatus: data.hero_status,
      roleBanner: { intro: data.role_banner_intro, skills: data.role_banner_skills },
      whoami: data.whoami || staticIdentity.whoami,
      terminalTitle: data.terminal_title,
      location: data.location,
      status: data.status,
      bio: data.bio || staticIdentity.bio,
      avatar: data.avatar,
      resume: data.resume,
      siteUrl: data.site_url,
      description: data.description,
      copyrightYear: data.copyright_year,
    };
  } catch {
    return staticIdentity;
  }
}

// ─── 2. Tech Stack ───────────────────────────────────────
export async function getStack(): Promise<readonly StackNode[]> {
  if (!supabase) return staticStack;
  try {
    const { data, error } = await supabase
      .from("stack_nodes")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticStack;

    return data.map((i) => ({
      label: i.label,
      tech: i.tech,
      icon: i.icon || undefined,
    }));
  } catch {
    return staticStack;
  }
}

// ─── 3. Projects ─────────────────────────────────────────
export async function getProjects(): Promise<readonly Project[]> {
  if (!supabase) return staticProjects;
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticProjects;

    return data.map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      tags: p.tags || [],
      image: p.image,
      alt: p.alt,
      live: p.live || undefined,
      github: p.github || undefined,
      placeholder: p.placeholder ?? false,
    }));
  } catch {
    return staticProjects;
  }
}

// ─── 4. Services ─────────────────────────────────────────
export async function getServices(): Promise<readonly Service[]> {
  if (!supabase) return staticServices;
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticServices;

    return data.map((s) => ({
      title: s.title,
      summary: s.summary,
      points: s.points || [],
    }));
  } catch {
    return staticServices;
  }
}

// ─── 5. Stats ────────────────────────────────────────────
export async function getStats(): Promise<{ stats: readonly StatCard[]; githubProfile: string }> {
  if (!supabase) return { stats: staticStats, githubProfile: staticGithub };
  try {
    const { data: list, error: statsError } = await supabase
      .from("stat_cards")
      .select("*")
      .order("sort_order", { ascending: true });

    const { data: config } = await supabase
      .from("site_config")
      .select("github_profile")
      .eq("id", "singleton")
      .maybeSingle();

    const stats =
      !statsError && list && list.length > 0
        ? list.map((s) => ({
            label: s.label,
            value: s.value,
            note: s.note || undefined,
          }))
        : staticStats;

    const github = config?.github_profile || staticGithub;

    return { stats, githubProfile: github };
  } catch {
    return { stats: staticStats, githubProfile: staticGithub };
  }
}

// ─── 6. Education & Certificates ──────────────────────────
export async function getEducation(): Promise<Education> {
  if (!supabase) return staticEducation;
  try {
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .eq("id", "singleton")
      .maybeSingle();

    if (error || !data) return staticEducation;

    return {
      school: data.school,
      degree: data.degree,
      start: data.start,
      end: data.end,
      facts: data.facts || staticEducation.facts,
    };
  } catch {
    return staticEducation;
  }
}

export async function getCertificates(): Promise<readonly Certificate[]> {
  if (!supabase) return staticCertificates;
  try {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticCertificates;

    return data.map((c) => ({
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      image: c.image,
      alt: c.alt,
    }));
  } catch {
    return staticCertificates;
  }
}

// ─── 7. Quotes ───────────────────────────────────────────
export async function getQuotes(): Promise<readonly Quote[]> {
  if (!supabase) return staticQuotes;
  try {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticQuotes;

    return data.map((q) => ({
      text: q.text,
      author: q.author,
    }));
  } catch {
    return staticQuotes;
  }
}

// ─── 8. Contact & Socials ────────────────────────────────
export async function getContact(): Promise<ContactInfo> {
  if (!supabase) return staticContact;
  try {
    const { data: info } = await supabase
      .from("contact_info")
      .select("email")
      .eq("id", "singleton")
      .maybeSingle();

    const { data: socialsList } = await supabase
      .from("socials")
      .select("*")
      .order("sort_order", { ascending: true });

    const email = info?.email || staticContact.email;
    const socials =
      socialsList && socialsList.length > 0
        ? socialsList.map((s) => ({ label: s.label, href: s.href }))
        : staticContact.socials;

    return { email, socials };
  } catch {
    return staticContact;
  }
}

// ─── 9. Nav Links ────────────────────────────────────────
export async function getNavLinks(): Promise<{ navLinks: readonly NavLink[]; hireMe: NavLink }> {
  if (!supabase) return { navLinks: staticNavLinks, hireMe: staticHireMe };
  try {
    const { data: list } = await supabase
      .from("nav_links")
      .select("*")
      .order("sort_order", { ascending: true });

    const links =
      list && list.length > 0
        ? list.map((n) => ({ label: n.label, href: n.href }))
        : staticNavLinks;

    return { navLinks: links, hireMe: staticHireMe };
  } catch {
    return { navLinks: staticNavLinks, hireMe: staticHireMe };
  }
}
