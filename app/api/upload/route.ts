import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-session";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  // 1. Authenticate user
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "portfolio";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary credentials are configured, upload to Cloudinary
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
      const result = await uploadToCloudinary(
        buffer,
        folder,
        isPdf ? "raw" : "image"
      );
      return NextResponse.json({ url: result.url, success: true });
    }

    // Fallback: save to local /public/uploads directory
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadsDir, safeName);
    await writeFile(filePath, buffer);

    const localUrl = `/uploads/${safeName}`;
    return NextResponse.json({ url: localUrl, success: true });
  } catch (err: unknown) {
    console.error("Upload handler error:", err);
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
