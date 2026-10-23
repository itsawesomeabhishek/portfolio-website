"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { createSession, deleteSession } from "@/lib/auth-session";
import { AdminLoginSchema } from "@/lib/validators";

export type AuthState = {
  error?: string;
  success?: boolean;
};

export async function loginAction(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = AdminLoginSchema.safeParse({ email, password });
  if (!result.success) {
    return { error: result.error.issues[0]?.message || "Invalid input." };
  }

  // Env-based fallback login. No built-in defaults: if these are unset,
  // only Supabase admin users can sign in.
  const envEmail = process.env.ADMIN_EMAIL;
  const envPassword = process.env.ADMIN_PASSWORD;
  const matchesEnvCredentials =
    Boolean(envEmail && envPassword) &&
    result.data.email.toLowerCase() === envEmail!.toLowerCase() &&
    result.data.password === envPassword;

  let admin: { id: string; email: string; name: string } | null = null;

  try {
    if (supabase) {
      const { data } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", result.data.email)
        .maybeSingle();

      if (data?.hashed_password) {
        const isValid = await bcrypt.compare(result.data.password, data.hashed_password);
        if (isValid) {
          admin = { id: data.id, email: data.email, name: data.name || "Admin" };
        }
      }
    }
  } catch (err) {
    console.warn("Auth lookup failed:", err);
  }

  if (!admin && matchesEnvCredentials) {
    admin = { id: "env-admin", email: envEmail!, name: "Admin" };
  }

  if (!admin) {
    return { error: "Invalid email or password." };
  }

  try {
    await createSession(admin.id, admin.email, admin.name);
  } catch (err) {
    console.error("Could not create admin session:", err);
    return { error: "Server is not configured for admin login." };
  }

  redirect("/admin");
}
export async function logoutAction() {
  await deleteSession();
  redirect("/admin/login");
}
