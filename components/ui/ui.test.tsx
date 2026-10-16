import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";
import { Marquee } from "./Marquee";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { TerminalCard } from "./TerminalCard";

describe("Button", () => {
  it("renders an internal link without target or rel", () => {
    render(<Button href="#about">About</Button>);
    const link = screen.getByRole("link", { name: "About" });
    expect(link).toHaveAttribute("href", "#about");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("adds noopener noreferrer to external links", () => {
    render(
      <Button href="https://github.com/x" external>
        GitHub
      </Button>,
    );
    const link = screen.getByRole("link", { name: /^GitHub/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAccessibleName("GitHub, opens in new tab");
  });

  it("appends screen-reader context to the link name", () => {
    render(
      <Button href="https://x.dev" external srContext="Debloat AI">
        LIVE
      </Button>,
    );
    expect(screen.getByRole("link")).toHaveAccessibleName("LIVE, Debloat AI, opens in new tab");
  });

  it("supports the download attribute and outline variant", () => {
    render(
      <Button href="/cv.pdf" download variant="outline">
        CV
      </Button>,
    );
    const link = screen.getByRole("link", { name: "CV" });
    expect(link).toHaveAttribute("download");
    expect(link.className).toContain("bg-card");
  });
});

describe("SectionHeading", () => {
  it("renders an h2 with the given id", () => {
    render(<SectionHeading id="about-title">ABOUT_ME</SectionHeading>);
    const heading = screen.getByRole("heading", { level: 2, name: "ABOUT_ME" });
    expect(heading).toHaveAttribute("id", "about-title");
  });

  it("renders the optional eyebrow", () => {
    render(
      <SectionHeading id="x" eyebrow="STATUS: OK">
        TITLE
      </SectionHeading>,
    );
    expect(screen.getByText("STATUS: OK")).toBeInTheDocument();
  });
});

describe("Section", () => {
  it("is labelled by its heading and applies ink tone", () => {
    render(
      <Section id="skills" tone="ink" labelledBy="skills-title">
        <h2 id="skills-title">SKILLS</h2>
      </Section>,
    );
    const region = screen.getByRole("region", { name: "SKILLS" });
    expect(region).toHaveAttribute("id", "skills");
    expect(region.className).toContain("bg-ink");
  });
});

describe("TerminalCard", () => {
  it("renders the title and body", () => {
    render(<TerminalCard title="abhishek@dev:~">$ whoami</TerminalCard>);
    expect(screen.getByText("abhishek@dev:~")).toBeInTheDocument();
    expect(screen.getByText("$ whoami")).toBeInTheDocument();
  });
});

describe("Marquee", () => {
  it("exposes content once to assistive tech and hides the duplicate", () => {
    const { container } = render(<Marquee label="Roles" items={["REACT", "NEXT.JS"]} />);
    expect(screen.getByRole("group", { name: "Roles" })).toBeInTheDocument();
    expect(container.querySelectorAll("ul[aria-hidden='true']")).toHaveLength(1);
    expect(screen.getByRole("checkbox", { name: /pause roles/i })).toBeInTheDocument();
    expect(screen.getAllByText("REACT")).toHaveLength(2);
  });

  it("uses the reverse animation for direction right", () => {
    const { container } = render(<Marquee label="Skills" items={["A"]} direction="right" />);
    expect(container.querySelector("[data-marquee-track]")?.className).toContain(
      "animate-scroll-reverse",
    );
  });
});


