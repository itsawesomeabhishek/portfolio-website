import { describe, expect, it } from "vitest";
import { getJwtKey } from "./auth-secret";

const LONG = "x".repeat(32);

describe("getJwtKey", () => {
  it("uses JWT_SECRET when it is long enough", () => {
    const key = getJwtKey({ JWT_SECRET: LONG, NODE_ENV: "production" });
    expect(key).not.toBeNull();
    expect(new TextDecoder().decode(key!)).toBe(LONG);
  });

  it("fails closed in production when the secret is missing", () => {
    expect(getJwtKey({ NODE_ENV: "production" })).toBeNull();
  });

  it("fails closed in production when the secret is too short", () => {
    expect(getJwtKey({ JWT_SECRET: "short", NODE_ENV: "production" })).toBeNull();
  });

  it("falls back to a dev-only key outside production", () => {
    expect(getJwtKey({ NODE_ENV: "development" })).not.toBeNull();
  });
});
