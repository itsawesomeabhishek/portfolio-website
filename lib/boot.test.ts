import { beforeEach, describe, expect, it } from "vitest";
import {
  BOOT_ATTRIBUTE,
  BOOT_STORAGE_KEY,
  bootInlineScript,
  hasBooted,
  markBooted,
  nextProgress,
} from "./boot";

const throwingStorage = {
  getItem: () => {
    throw new Error("blocked");
  },
  setItem: () => {
    throw new Error("blocked");
  },
};

describe("boot session state", () => {
  beforeEach(() => {
    sessionStorage.clear();
    document.documentElement.removeAttribute(BOOT_ATTRIBUTE);
  });

  it("is not booted on a fresh session", () => {
    expect(hasBooted(sessionStorage)).toBe(false);
  });

  it("is booted after markBooted and sets the html attribute", () => {
    markBooted(sessionStorage, document.documentElement);
    expect(hasBooted(sessionStorage)).toBe(true);
    expect(document.documentElement.getAttribute(BOOT_ATTRIBUTE)).toBe("true");
  });

  it("treats unavailable storage as not booted instead of throwing", () => {
    expect(hasBooted(throwingStorage)).toBe(false);
    expect(hasBooted(null)).toBe(false);
  });

  it("still hides the splash when storage writes fail", () => {
    markBooted(throwingStorage, document.documentElement);
    expect(document.documentElement.getAttribute(BOOT_ATTRIBUTE)).toBe("true");
  });
});

describe("bootInlineScript", () => {
  beforeEach(() => {
    sessionStorage.clear();
    document.documentElement.removeAttribute(BOOT_ATTRIBUTE);
  });

  it("does nothing on a first visit", () => {
    new Function(bootInlineScript)();
    expect(document.documentElement.hasAttribute(BOOT_ATTRIBUTE)).toBe(false);
  });

  it("sets the attribute for a returning visitor", () => {
    sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    new Function(bootInlineScript)();
    expect(document.documentElement.getAttribute(BOOT_ATTRIBUTE)).toBe("true");
  });
});

describe("nextProgress", () => {
  it("always increases and never exceeds 100", () => {
    let value = 0;
    let guard = 0;
    while (value < 100 && guard < 200) {
      const next = nextProgress(value);
      expect(next).toBeGreaterThan(value);
      expect(next).toBeLessThanOrEqual(100);
      value = next;
      guard += 1;
    }
    expect(value).toBe(100);
  });

  it("stays at 100 once complete", () => {
    expect(nextProgress(100)).toBe(100);
  });
});
