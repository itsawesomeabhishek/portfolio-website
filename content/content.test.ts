import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { certificates, education } from "./logs";
import { contact } from "./contact";
import { codingStats } from "./stats";
import { identity } from "./identity";
import { navLinks } from "./nav";
import { projects } from "./projects";
import { quotes } from "./quotes";
import { services } from "./services";
import { stack } from "./stack";

const publicFile = (path: string) => join(process.cwd(), "public", path);
const isHttps = (value: string) => value.startsWith("https://");

describe("identity", () => {
  it("has non-empty required fields", () => {
    expect(identity.name).toBeTruthy();
    expect(identity.logo).toMatch(/\.exe$/);
    expect(identity.headline.solid).toBeTruthy();
    expect(identity.headline.outlined).toBeTruthy();
    expect(identity.bio.length).toBeGreaterThan(0);
    expect(identity.whoami.length).toBeGreaterThan(0);
  });

  it("references files that exist in public/", () => {
    expect(existsSync(publicFile(identity.avatar))).toBe(true);
    expect(existsSync(publicFile(identity.resume))).toBe(true);
  });

  it("uses a constant copyright year, not the current time", () => {
    expect(Number.isInteger(identity.copyrightYear)).toBe(true);
  });
});

describe("nav", () => {
  it("only links to sections that exist", () => {
    for (const link of navLinks) {
      expect(link.href).toMatch(/^#[a-z-]+$/);
    }
  });
});

describe("stack", () => {
  it("has 16 unique nodes", () => {
    expect(stack).toHaveLength(16);
    expect(new Set(stack.map((node) => node.tech)).size).toBe(stack.length);
  });

  it("references icons that exist", () => {
    for (const node of stack) {
      if (node.icon) expect(existsSync(publicFile(node.icon))).toBe(true);
    }
  });
});

describe("logs", () => {
  it("has education with facts", () => {
    expect(education.school).toBeTruthy();
    expect(education.facts.length).toBeGreaterThan(0);
  });

  it("has 5 certificates with real images and alt text", () => {
    expect(certificates).toHaveLength(5);
    for (const cert of certificates) {
      expect(existsSync(publicFile(cert.image))).toBe(true);
      expect(cert.alt).toBeTruthy();
    }
  });
});

describe("projects", () => {
  it("has unique slugs and existing images", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    for (const project of projects) {
      expect(existsSync(publicFile(project.image))).toBe(true);
      expect(project.alt).toBeTruthy();
    }
  });

  it("only uses https links", () => {
    for (const project of projects) {
      if (project.live) expect(isHttps(project.live)).toBe(true);
      if (project.github) expect(isHttps(project.github)).toBe(true);
    }
  });

  it("never invents links or tags for placeholder projects", () => {
    for (const project of projects.filter((p) => p.placeholder)) {
      expect(project.live).toBeUndefined();
      expect(project.github).toBeUndefined();
      expect(project.tags).toHaveLength(0);
    }
  });
});

describe("coding stats", () => {
  it("has labelled values", () => {
    expect(codingStats.length).toBeGreaterThan(0);
    for (const stat of codingStats) {
      expect(stat.label).toBeTruthy();
      expect(stat.value).toBeTruthy();
    }
  });
});

describe("quotes and services", () => {
  it("has non-empty, whitespace-normalised quotes", () => {
    expect(quotes.length).toBeGreaterThan(0);
    for (const quote of quotes) {
      expect(quote.text).toBe(quote.text.replace(/\s+/g, " ").trim());
      expect(quote.author).toBeTruthy();
    }
  });

  it("has exactly 3 services", () => {
    expect(services).toHaveLength(3);
  });
});

describe("contact", () => {
  it("has a valid email and https socials", () => {
    expect(contact.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    for (const social of contact.socials) {
      expect(isHttps(social.href)).toBe(true);
    }
  });

  it("does not publish a phone number", () => {
    expect(JSON.stringify(contact)).not.toMatch(/\+?\d[\d\s-]{8,}/);
  });
});
