import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BOOT_ATTRIBUTE, BOOT_STORAGE_KEY } from "@/lib/boot";
import { BootScreen } from "./BootScreen";

describe("BootScreen", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    sessionStorage.clear();
    document.documentElement.removeAttribute(BOOT_ATTRIBUTE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the splash with a progressbar on a first visit", () => {
    render(<BootScreen />);
    expect(screen.getByText(/initializing system/i)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("completes, unmounts, and remembers the session", () => {
    render(<BootScreen />);
    for (let i = 0; i < 60; i += 1) {
      act(() => {
        vi.advanceTimersByTime(100);
      });
    }
    expect(screen.queryByText(/initializing system/i)).not.toBeInTheDocument();
    expect(sessionStorage.getItem(BOOT_STORAGE_KEY)).toBe("1");
    expect(document.documentElement.getAttribute(BOOT_ATTRIBUTE)).toBe("true");
  });

  it("renders nothing for a returning visitor and re-applies the html flag", () => {
    sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    render(<BootScreen />);
    expect(screen.queryByText(/initializing system/i)).not.toBeInTheDocument();
    expect(document.documentElement.getAttribute(BOOT_ATTRIBUTE)).toBe("true");
  });
});
