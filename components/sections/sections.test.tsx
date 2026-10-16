import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { certificates } from "@/content/logs";
import { projects } from "@/content/projects";
import { quotes } from "@/content/quotes";
import { services } from "@/content/services";
import { stack } from "@/content/stack";
import { About } from "./About";
import { CodingStats } from "./CodingStats";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Logs } from "./Logs";
import { Projects } from "./Projects";
import { Quotes } from "./Quotes";
import { Services } from "./Services";
import { TechStack } from "./TechStack";

describe("Hero", () => {
  it("has one h1 with both headline lines and the two calls to action", () => {
    render(<Hero />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("FULL-STACK");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("DEVELOPER");
    expect(screen.getByRole("link", { name: /view projects/i })).toHaveAttribute(
      "href",
      "#projects",
    );
    const cv = screen.getByRole("link", { name: /download cv/i });
    expect(cv).toHaveAttribute("href", "/resume/abhishek-resume.pdf");
    expect(cv).toHaveAttribute("download");
  });

  it("shows the whoami terminal", () => {
    render(<Hero />);
    expect(screen.getByText("$ whoami")).toBeInTheDocument();
    expect(screen.getByText("full-stack-dev | cs-student")).toBeInTheDocument();
  });
});

describe("About", () => {
  it("shows a portrait with alt text and location/status", () => {
    render(<About />);
    expect(screen.getByRole("img", { name: /portrait of abhishek/i })).toBeInTheDocument();
    expect(screen.getByText("Dasuya, Punjab, India")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "ABOUT_ME" })).toBeInTheDocument();
  });
});

describe("TechStack", () => {
  it("lists every stack node", () => {
    render(<TechStack />);
    expect(within(screen.getByRole("region", { name: "TECH_STACK" })).getAllByRole("listitem")).toHaveLength(
      stack.length,
    );
  });
});

describe("Logs", () => {
  it("shows education and one card per certificate with an image", () => {
    render(<Logs />);
    expect(screen.getByText("Lovely Professional University")).toBeInTheDocument();
    for (const cert of certificates) {
      expect(screen.getByRole("img", { name: cert.alt })).toBeInTheDocument();
    }
  });
});

describe("Projects", () => {
  it("renders every project and labels placeholders honestly", () => {
    render(<Projects />);
    for (const project of projects) {
      expect(screen.getByRole("heading", { level: 3, name: project.title })).toBeInTheDocument();
      expect(screen.getByRole("img", { name: project.alt })).toBeInTheDocument();
    }
    expect(screen.getAllByText("Project write-up coming soon.")).toHaveLength(projects.length);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});

describe("CodingStats", () => {
  it("shows the stats and a hardened GitHub link", () => {
    render(<CodingStats />);
    expect(screen.getByText("75+")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /view github profile/i });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("Quotes", () => {
  it("renders every quote with its author and the honest QUOTES.txt label", () => {
    render(<Quotes />);
    expect(screen.getByText("QUOTES.txt")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(quotes.length);
    expect(screen.getByText(/George Savile/)).toBeInTheDocument();
  });
});

describe("Services", () => {
  it("renders the three services", () => {
    render(<Services />);
    for (const service of services) {
      expect(screen.getByRole("heading", { level: 3, name: service.title })).toBeInTheDocument();
    }
  });
});

describe("Contact", () => {
  it("shows email, hardened social links, and the form", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: "abhisheq117@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:abhisheq117@gmail.com",
    );
    for (const name of [/^github/i, /^linkedin/i]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("uses the constant copyright year", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 ABHISHEK/)).toBeInTheDocument();
  });

  it("has hardened social links, a CV download and page links", () => {
    render(<Footer />);
    for (const name of ["GitHub", "LinkedIn"]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAttribute("target", "_blank");
    }
    expect(screen.getByRole("link", { name: "Download CV" })).toHaveAttribute("download");
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:abhisheq117@gmail.com",
    );
    const nav = screen.getByRole("navigation", { name: "Footer" });
    for (const [label, href] of [
      ["Home", "#top"],
      ["About", "#about"],
      ["Projects", "#projects"],
      ["Contact", "#contact"],
    ]) {
      expect(within(nav).getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
  });
});
