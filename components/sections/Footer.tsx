import { Briefcase, Code, FileText, FolderGit2, Home, Mail, Shield, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { contact } from "@/content/contact";
import { identity } from "@/content/identity";

interface FooterLink {
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
  readonly external?: boolean;
  readonly download?: boolean;
}

const socialIcons: Record<string, LucideIcon> = { GITHUB: Code, LINKEDIN: Briefcase };

const socialLinks: readonly FooterLink[] = [
  ...contact.socials.map((social) => ({
    label: social.label === "GITHUB" ? "GitHub" : "LinkedIn",
    href: social.href,
    icon: socialIcons[social.label] ?? Code,
    external: true,
  })),
  { label: "Email", href: `mailto:${contact.email}`, icon: Mail },
  { label: "Download CV", href: identity.resume, icon: FileText, download: true },
];

const pageLinks: readonly FooterLink[] = [
  { label: "Home", href: "#top", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function Footer() {
  return (
    <footer className="on-ink relative overflow-hidden border-t-4 border-neo-green bg-ink px-4 pb-24 pt-12 text-background sm:px-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[10rem] font-black leading-none text-background/5 sm:text-[16rem]"
      >
        BUILD
      </span>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3">
          <Shield className="size-5 text-neo-green" aria-hidden="true" />
          <p className="font-display text-4xl font-black sm:text-5xl">{identity.handle}</p>
          <Shield className="size-5 text-neo-green" aria-hidden="true" />
        </div>

        <p className="font-mono text-sm font-bold text-neo-green">&lt; Full-Stack Developer /&gt;</p>

        <ul className="flex flex-wrap justify-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon, external, download }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                download={download || undefined}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex size-11 items-center justify-center border border-background/30 bg-background/10 transition-colors hover:bg-neo-green hover:text-ink"
              >
                <Icon className="size-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-3">
            {pageLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-4 py-2 font-mono text-sm font-bold transition-colors hover:bg-neo-green hover:text-ink"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-4 w-full max-w-3xl border-t border-background/15 pt-6 font-mono">
          <p className="text-xs font-bold opacity-80 sm:text-sm">
            © {identity.copyrightYear} {identity.handle}. ALL RIGHTS RESERVED.
          </p>
          <p className="mt-2 text-xs opacity-70">
            <span className="text-neo-green" aria-hidden="true">•</span> BUILT WITH NEXT.JS{" "}
            <span className="text-neo-green" aria-hidden="true">•</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
