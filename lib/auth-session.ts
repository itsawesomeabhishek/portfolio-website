import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

import { getJwtKey } from "@/lib/auth-secret";

export const COOKIE_NAME = "portfolio_admin_token";

export interface SessionPayload {
  adminId: string;
  email: string;
  name: string;
  expiresAt: Date;
}

export async function encrypt(payload: Omit<SessionPayload, "expiresAt">) {
  const key = getJwtKey();
  if (!key) {
    throw new Error("JWT_SECRET must be set to at least 32 characters.");
  }
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(token: string | undefined = ""): Promise<SessionPayload | null> {
  const key = getJwtKey();
  if (!token || !key) return null;
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession(adminId: string, email: string, name: string) {
  const token = await encrypt({ adminId, email, name });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return decrypt(token);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
