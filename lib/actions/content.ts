"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/auth-session";
import {
  IdentitySchema,
  ProjectSchema,
  StackNodeSchema,
  ServiceSchema,
  StatCardSchema,
  EducationSchema,
  CertificateSchema,
  QuoteSchema,
} from "@/lib/validators";

async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized access. Please login first.");
  }
}

export type ActionResponse = {
  success?: boolean;
  error?: string;
  message?: string;
};

// ─── 1. Identity Action ──────────────────────────────────
export async function updateIdentityAction(
  _prev: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAuth();

  const rawWhoami = formData.getAll("whoami[]") as string[];
  const rawBio = formData.getAll("bio[]") as string[];

  const raw = {
    name: formData.get("name") as string,
    handle: formData.get("handle") as string,
    logo: formData.get("logo") as string,
    headlineSolid: formData.get("headlineSolid") as string,
    headlineOutlined: formData.get("headlineOutlined") as string,
    heroStatus: formData.get("heroStatus") as string,
    roleBannerIntro: formData.get("roleBannerIntro") as string,
    roleBannerSkills: formData.get("roleBannerSkills") as string,
    terminalTitle: formData.get("terminalTitle") as string,
    whoami: rawWhoami.filter(Boolean),
    location: formData.get("location") as string,
    status: formData.get("status") as string,
    bio: rawBio.filter(Boolean),
    avatar: formData.get("avatar") as string,
    resume: formData.get("resume") as string,
    siteUrl: formData.get("siteUrl") as string,
    description: formData.get("description") as string,
    copyrightYear: Number(formData.get("copyrightYear") || 2026),
  };

  const parsed = IdentitySchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Validation failed." };
  }

  if (supabase) {
    const { error } = await supabase.from("identity").upsert({
      id: "singleton",
      name: parsed.data.name,
      handle: parsed.data.handle,
      logo: parsed.data.logo,
      headline_solid: parsed.data.headlineSolid,
      headline_outlined: parsed.data.headlineOutlined,
      hero_status: parsed.data.heroStatus,
      role_banner_intro: parsed.data.roleBannerIntro,
      role_banner_skills: parsed.data.roleBannerSkills,
      terminal_title: parsed.data.terminalTitle,
      whoami: parsed.data.whoami,
      location: parsed.data.location,
      status: parsed.data.status,
      bio: parsed.data.bio,
      avatar: parsed.data.avatar,
      resume: parsed.data.resume,
      site_url: parsed.data.siteUrl,
      description: parsed.data.description,
      copyright_year: parsed.data.copyrightYear,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      return { error: `Database error: ${error.message}` };
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/identity");
  return { success: true, message: "Identity updated successfully!" };
}

// ─── 2. Projects Actions ─────────────────────────────────
export async function saveProjectAction(
  _prev: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAuth();

  const rawTags = (formData.get("tags") as string)
    ?.split(",")
    .map((t) => t.trim())
    .filter(Boolean) || [];

  const raw = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    tags: rawTags,
    image: formData.get("image") as string,
    alt: formData.get("alt") as string,
    live: (formData.get("live") as string) || "",
    github: (formData.get("github") as string) || "",
    placeholder: formData.get("placeholder") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  const parsed = ProjectSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid project data" };
  }

  if (supabase) {
    const { error } = await supabase.from("projects").upsert(
      {
        slug: parsed.data.slug,
        title: parsed.data.title,
        summary: parsed.data.summary,
        tags: parsed.data.tags,
        image: parsed.data.image,
        alt: parsed.data.alt,
        live: parsed.data.live || null,
        github: parsed.data.github || null,
        placeholder: parsed.data.placeholder,
        sort_order: parsed.data.sortOrder,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );

    if (error) {
      return { error: `Database error: ${error.message}` };
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  return { success: true, message: "Project saved successfully!" };
}

export async function deleteProjectAction(slug: string): Promise<ActionResponse> {
  await requireAuth();

  if (supabase) {
    const { error } = await supabase.from("projects").delete().eq("slug", slug);
    if (error) return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true, message: "Project deleted." };
}

// ─── 3. Tech Stack Actions ───────────────────────────────
export async function saveStackItemAction(
  _prev: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAuth();

  const id = formData.get("id") as string | null;
  const raw = {
    label: formData.get("label") as string,
    tech: formData.get("tech") as string,
    icon: (formData.get("icon") as string) || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  const parsed = StackNodeSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid skill data" };
  }

  if (supabase) {
    if (id) {
      await supabase.from("stack_nodes").update({
        label: parsed.data.label,
        tech: parsed.data.tech,
        icon: parsed.data.icon,
        sort_order: parsed.data.sortOrder,
      }).eq("id", id);
    } else {
      await supabase.from("stack_nodes").insert({
        label: parsed.data.label,
        tech: parsed.data.tech,
        icon: parsed.data.icon,
        sort_order: parsed.data.sortOrder,
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/stack");
  return { success: true, message: "Skill saved successfully!" };
}

export async function deleteStackItemAction(id: string): Promise<ActionResponse> {
  await requireAuth();
  if (supabase) {
    await supabase.from("stack_nodes").delete().eq("id", id);
  }
  revalidatePath("/");
  revalidatePath("/admin/stack");
  return { success: true, message: "Skill removed." };
}

// ─── 4. Services Actions ─────────────────────────────────
export async function saveServiceAction(
  _prev: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAuth();
  const id = formData.get("id") as string | null;
  const rawPoints = (formData.getAll("points[]") as string[]).filter(Boolean);

  const raw = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    points: rawPoints,
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  const parsed = ServiceSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid service data" };
  }

  if (supabase) {
    if (id) {
      await supabase.from("services").update({
        title: parsed.data.title,
        summary: parsed.data.summary,
        points: parsed.data.points,
        sort_order: parsed.data.sortOrder,
      }).eq("id", id);
    } else {
      await supabase.from("services").insert({
        title: parsed.data.title,
        summary: parsed.data.summary,
        points: parsed.data.points,
        sort_order: parsed.data.sortOrder,
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true, message: "Service saved successfully!" };
}

export async function deleteServiceAction(id: string): Promise<ActionResponse> {
  await requireAuth();
  if (supabase) {
    await supabase.from("services").delete().eq("id", id);
  }
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true, message: "Service removed." };
}

// ─── 5. Stats Actions ────────────────────────────────────
export async function saveStatAction(
  _prev: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAuth();
  const id = formData.get("id") as string | null;

  const raw = {
    label: formData.get("label") as string,
    value: formData.get("value") as string,
    note: (formData.get("note") as string) || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  const parsed = StatCardSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid stat data" };
  }

  if (supabase) {
    if (id) {
      await supabase.from("stat_cards").update({
        label: parsed.data.label,
        value: parsed.data.value,
        note: parsed.data.note,
        sort_order: parsed.data.sortOrder,
      }).eq("id", id);
    } else {
      await supabase.from("stat_cards").insert({
        label: parsed.data.label,
        value: parsed.data.value,
        note: parsed.data.note,
        sort_order: parsed.data.sortOrder,
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/stats");
  return { success: true, message: "Stat card saved!" };
}

export async function deleteStatAction(id: string): Promise<ActionResponse> {
  await requireAuth();
  if (supabase) {
    await supabase.from("stat_cards").delete().eq("id", id);
  }
  revalidatePath("/");
  revalidatePath("/admin/stats");
  return { success: true, message: "Stat card deleted." };
}

// ─── 6. Education Action ─────────────────────────────────
export async function updateEducationAction(
  _prev: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAuth();
  const rawFacts = (formData.getAll("facts[]") as string[]).filter(Boolean);

  const raw = {
    school: formData.get("school") as string,
    degree: formData.get("degree") as string,
    start: formData.get("start") as string,
    end: formData.get("end") as string,
    facts: rawFacts,
  };

  const parsed = EducationSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid education info" };
  }

  if (supabase) {
    await supabase.from("education").upsert({
      id: "singleton",
      school: parsed.data.school,
      degree: parsed.data.degree,
      start: parsed.data.start,
      end: parsed.data.end,
      facts: parsed.data.facts,
      updated_at: new Date().toISOString(),
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/education");
  return { success: true, message: "Education details updated!" };
}

// ─── 7. Certificates Actions ─────────────────────────────
export async function saveCertificateAction(
  _prev: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAuth();
  const id = formData.get("id") as string | null;

  const raw = {
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    date: formData.get("date") as string,
    image: formData.get("image") as string,
    alt: formData.get("alt") as string,
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  const parsed = CertificateSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid certificate data" };
  }

  if (supabase) {
    if (id) {
      await supabase.from("certificates").update({
        title: parsed.data.title,
        issuer: parsed.data.issuer,
        date: parsed.data.date,
        image: parsed.data.image,
        alt: parsed.data.alt,
        sort_order: parsed.data.sortOrder,
      }).eq("id", id);
    } else {
      await supabase.from("certificates").insert({
        title: parsed.data.title,
        issuer: parsed.data.issuer,
        date: parsed.data.date,
        image: parsed.data.image,
        alt: parsed.data.alt,
        sort_order: parsed.data.sortOrder,
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/certificates");
  return { success: true, message: "Certificate saved successfully!" };
}

export async function deleteCertificateAction(id: string): Promise<ActionResponse> {
  await requireAuth();
  if (supabase) {
    await supabase.from("certificates").delete().eq("id", id);
  }
  revalidatePath("/");
  revalidatePath("/admin/certificates");
  return { success: true, message: "Certificate removed." };
}

// ─── 8. Quotes Actions ───────────────────────────────────
export async function saveQuoteAction(
  _prev: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAuth();
  const id = formData.get("id") as string | null;

  const raw = {
    text: formData.get("text") as string,
    author: formData.get("author") as string,
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  const parsed = QuoteSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid quote data" };
  }

  if (supabase) {
    if (id) {
      await supabase.from("quotes").update({
        text: parsed.data.text,
        author: parsed.data.author,
        sort_order: parsed.data.sortOrder,
      }).eq("id", id);
    } else {
      await supabase.from("quotes").insert({
        text: parsed.data.text,
        author: parsed.data.author,
        sort_order: parsed.data.sortOrder,
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/quotes");
  return { success: true, message: "Quote saved!" };
}

export async function deleteQuoteAction(id: string): Promise<ActionResponse> {
  await requireAuth();
  if (supabase) {
    await supabase.from("quotes").delete().eq("id", id);
  }
  revalidatePath("/");
  revalidatePath("/admin/quotes");
  return { success: true, message: "Quote removed." };
}

// ─── 9. Contact & Socials Actions ────────────────────────
export async function updateContactAction(
  _prev: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAuth();
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Please provide a valid email." };
  }

  if (supabase) {
    await supabase.from("contact_info").upsert({
      id: "singleton",
      email,
      updated_at: new Date().toISOString(),
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/contact");
  return { success: true, message: "Contact email updated!" };
}

export async function saveSocialAction(
  _prev: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAuth();
  const id = formData.get("id") as string | null;
  const label = formData.get("label") as string;
  const href = formData.get("href") as string;
  const sortOrder = Number(formData.get("sortOrder") || 0);

  if (!label || !href) {
    return { error: "Label and link are required." };
  }

  if (supabase) {
    if (id) {
      await supabase.from("socials").update({ label, href, sort_order: sortOrder }).eq("id", id);
    } else {
      await supabase.from("socials").insert({ label, href, sort_order: sortOrder });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/contact");
  return { success: true, message: "Social link saved!" };
}

export async function deleteSocialAction(id: string): Promise<ActionResponse> {
  await requireAuth();
  if (supabase) {
    await supabase.from("socials").delete().eq("id", id);
  }
  revalidatePath("/");
  revalidatePath("/admin/contact");
  return { success: true, message: "Social link deleted." };
}
