import { z } from "zod";

export const AdminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const IdentitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  handle: z.string().min(1, "Handle is required"),
  logo: z.string().min(1, "Logo text is required"),
  headlineSolid: z.string().min(1, "Headline solid text is required"),
  headlineOutlined: z.string().min(1, "Headline outlined text is required"),
  heroStatus: z.string().min(1, "Hero status is required"),
  roleBannerIntro: z.string().min(1, "Role banner intro is required"),
  roleBannerSkills: z.string().min(1, "Role banner skills are required"),
  terminalTitle: z.string().min(1, "Terminal title is required"),
  whoami: z.array(z.string()).min(1, "At least one whoami entry is required"),
  location: z.string().min(1, "Location is required"),
  status: z.string().min(1, "Status is required"),
  bio: z.array(z.string()).min(1, "At least one bio paragraph is required"),
  avatar: z.string().min(1, "Avatar URL is required"),
  resume: z.string().min(1, "Resume URL is required"),
  siteUrl: z.string().url("Must be a valid URL"),
  description: z.string().min(1, "Meta description is required"),
  copyrightYear: z.coerce.number().int().min(2020),
});

export const StackNodeSchema = z.object({
  label: z.string().min(1, "Category label is required (e.g. FRONTEND)"),
  tech: z.string().min(1, "Technology name is required (e.g. React)"),
  icon: z.string().optional().nullable(),
  sortOrder: z.coerce.number().int().default(0),
});

export const ProjectSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  tags: z.array(z.string()),
  image: z.string().min(1, "Image URL is required"),
  alt: z.string().min(1, "Alt text is required"),
  live: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  placeholder: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

export const ServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  points: z.array(z.string()).min(1, "At least one point is required"),
  sortOrder: z.coerce.number().int().default(0),
});

export const StatCardSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
  note: z.string().optional().nullable(),
  sortOrder: z.coerce.number().int().default(0),
});

export const EducationSchema = z.object({
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  start: z.string().min(1, "Start year/date is required"),
  end: z.string().min(1, "End year/date is required"),
  facts: z.array(z.string()).min(1, "At least one fact is required"),
});

export const CertificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().min(1, "Date is required"),
  image: z.string().min(1, "Image URL is required"),
  alt: z.string().min(1, "Alt text is required"),
  sortOrder: z.coerce.number().int().default(0),
});

export const QuoteSchema = z.object({
  text: z.string().min(1, "Quote text is required"),
  author: z.string().min(1, "Author is required"),
  sortOrder: z.coerce.number().int().default(0),
});

export const ContactInfoSchema = z.object({
  email: z.string().email("Valid email is required"),
});

export const SocialSchema = z.object({
  label: z.string().min(1, "Platform label is required"),
  href: z.string().url("Valid URL is required"),
  sortOrder: z.coerce.number().int().default(0),
});

export const NavLinkSchema = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().min(1, "Href is required"),
  sortOrder: z.coerce.number().int().default(0),
});

export const SiteConfigSchema = z.object({
  githubProfile: z.string().url("Valid GitHub URL is required"),
});
