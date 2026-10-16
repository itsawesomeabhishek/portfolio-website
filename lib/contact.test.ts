import { describe, expect, it } from "vitest";
import { buildMailto, validateContact } from "./contact";

const valid = { name: "Jane", email: "jane@example.com", message: "Hello, I'd like to talk." };

describe("validateContact", () => {
  it("accepts valid input", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires a name", () => {
    expect(validateContact({ ...valid, name: "   " }).name).toBeTruthy();
  });

  it("rejects an invalid email", () => {
    expect(validateContact({ ...valid, email: "nope" }).email).toBeTruthy();
    expect(validateContact({ ...valid, email: "a@b" }).email).toBeTruthy();
  });

  it("requires a message of at least 10 characters", () => {
    expect(validateContact({ ...valid, message: "short" }).message).toBeTruthy();
  });

  it("enforces maximum lengths", () => {
    expect(validateContact({ ...valid, name: "x".repeat(81) }).name).toBeTruthy();
    expect(validateContact({ ...valid, message: "x".repeat(2001) }).message).toBeTruthy();
  });

  it("reports every invalid field at once", () => {
    const errors = validateContact({ name: "", email: "", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });
});

describe("buildMailto", () => {
  it("targets the recipient and encodes subject and body", () => {
    const url = buildMailto("me@site.dev", valid);
    expect(url.startsWith("mailto:me@site.dev?")).toBe(true);
    expect(url).toContain("subject=");
    expect(url).toContain(encodeURIComponent("Hello, I'd like to talk."));
  });

  it("cannot inject extra headers through newlines in the name", () => {
    const url = buildMailto("me@site.dev", {
      ...valid,
      name: "Evil\r\nBcc: victim@example.com",
    });
    const subject = new URL(url).searchParams.get("subject") ?? "";
    expect(subject).not.toMatch(/[\r\n]/);
  });

  it("encodes reserved characters so they cannot add parameters", () => {
    const url = buildMailto("me@site.dev", { ...valid, message: "a&cc=x@y.z#b" });
    expect(url).not.toContain("&cc=");
    expect(url).toContain("a%26cc%3Dx%40y.z%23b");
  });
});
