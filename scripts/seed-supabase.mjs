// Seed script to push static content to Supabase using @supabase/supabase-js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import bcrypt from "bcryptjs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env.local to run the seeder.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("🌱 Starting Supabase database seeding...");

  // 1. Seed Admin
  const adminEmail = process.env.ADMIN_EMAIL || "abhisheq117@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const { error: adminErr } = await supabase.from("admin_users").upsert({
    email: adminEmail,
    hashed_password: hashedPassword,
    name: "Abhishek",
  }, { onConflict: "email" });

  if (adminErr) console.warn("Admin seed note:", adminErr.message);
  else console.log(`✅ Admin account seeded: ${adminEmail}`);

  console.log("🎉 Seeding completed successfully!");
}

seed().catch(console.error);
