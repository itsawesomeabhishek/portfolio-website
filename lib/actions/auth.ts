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

  const defaultEmail = process.env.ADMIN_EMAIL || "abhisheq117@gmail.com";
  const defaultPassword = process.env.ADMIN_PASSWORD || "Admin@12345";

  try {
    if (supabase) {
      const { data: admin } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", result.data.email)
        .maybeSingle();

      if (admin && admin.hashed_password) {
        const isValid = await bcrypt.compare(result.data.password, admin.hashed_password);
        if (isValid) {
          await createSession(admin.id, admin.email, admin.name || "Abhishek");
          redirect("/admin");
        }
      }
    }

    // Fallback check: default credentials if Supabase hasn't been set up yet
    if (
      result.data.email.toLowerCase() === defaultEmail.toLowerCase() &&
      result.data.password === defaultPassword
    ) {
      await createSession("default-admin", defaultEmail, "Abhishek");
    } else {
      return { error: "Invalid email or password." };
    }
  } catch (err) {
    console.warn("Auth check failed:", err);
    if (
      result.data.email.toLowerCase() === defaultEmail.toLowerCase() &&
      result.data.password === defaultPassword
    ) {
      await createSession("default-admin", defaultEmail, "Abhishek");
    } else {
      return { error: "Invalid email or password." };
    }
  }

  redirect("/admin");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin/login");
}
