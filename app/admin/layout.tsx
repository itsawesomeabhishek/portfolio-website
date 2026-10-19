import { Suspense } from "react";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth-session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export const metadata: Metadata = {
  title: "Admin Panel | Abhishek Portfolio",
  description: "Management dashboard for portfolio content and settings",
};

async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // If no session is active (e.g., viewing /admin/login), don't render admin shell
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-sans text-ink">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto bg-grid p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="p-8 font-mono text-sm text-ink" role="status">
          Loading admin...
        </div>
      }
    >
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
