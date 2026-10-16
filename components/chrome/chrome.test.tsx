import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BackToTop } from "./BackToTop";
import { Navbar } from "./Navbar";
import { ScrollProgress } from "./ScrollProgress";

function setScroll(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  fireEvent.scroll(window);
}

afterEach(() => {
  setScroll(0);
});

describe("Navbar", () => {
  it("renders the logo and section links", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "ABHISHEK.exe" })).toHaveAttribute("href", "#top");
    for (const label of ["/ABOUT", "/SKILLS", "/LOGS", "/WORK"]) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }
  });

  it("toggles the mobile menu with correct aria state", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /menu/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(button.getAttribute("aria-controls") ?? "")).toBeVisible();
  });

  it("closes the menu on Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /menu/i });
    await user.click(button);
    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
  });

  it("closes the menu after choosing a link", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /menu/i });
    await user.click(button);
    const mobileLinks = screen.getAllByRole("link", { name: /\/WORK/ });
    await user.click(mobileLinks[mobileLinks.length - 1]);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});

describe("ScrollProgress", () => {
  it("reflects scroll position as a percentage", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", { value: 1000, configurable: true });
    const { container } = render(<ScrollProgress />);
    act(() => setScroll(500));
    expect(container.querySelector("[data-scroll-progress]")).toHaveAttribute(
      "data-scroll-progress",
      "50",
    );
  });

  it("stays at 0 when the page does not scroll", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", { value: 1000, configurable: true });
    const { container } = render(<ScrollProgress />);
    act(() => setScroll(0));
    expect(container.querySelector("[data-scroll-progress]")).toHaveAttribute(
      "data-scroll-progress",
      "0",
    );
  });
});

describe("BackToTop", () => {
  it("is hidden at the top and appears after scrolling", () => {
    render(<BackToTop />);
    expect(screen.queryByRole("button", { name: /back to top/i })).not.toBeInTheDocument();
    act(() => setScroll(900));
    expect(screen.getByRole("button", { name: /back to top/i })).toBeInTheDocument();
  });

  it("scrolls to top when clicked", async () => {
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
    render(<BackToTop />);
    act(() => setScroll(900));
    await userEvent.setup().click(screen.getByRole("button", { name: /back to top/i }));
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  });
});

