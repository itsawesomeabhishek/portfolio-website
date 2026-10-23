const MIN_SECRET_LENGTH = 32;
const DEV_ONLY_SECRET = "dev-only-secret-never-used-in-production-0000";

/**
 * Returns the HMAC key used to sign and verify admin sessions.
 *
 * - Production: requires `JWT_SECRET` (32+ chars). If it is missing or too
 *   short this returns `null`, so every session is rejected (fail closed).
 * - Development/test: falls back to a fixed local-only secret.
 */
export function getJwtKey(
  env: Record<string, string | undefined> = process.env,
): Uint8Array | null {
  const secret = env.JWT_SECRET;
  if (secret && secret.length >= MIN_SECRET_LENGTH) {
    return new TextEncoder().encode(secret);
  }
  if (env.NODE_ENV === "production") {
    return null;
  }
  return new TextEncoder().encode(DEV_ONLY_SECRET);
}
