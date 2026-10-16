"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, ShieldAlert, Terminal } from "lucide-react";
import { loginAction, type AuthState } from "@/lib/actions/auth";

export default function AdminLoginPage() {
  const [state, action, isPending] = useActionState<AuthState | null, FormData>(
    loginAction,
    null
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-grid p-4 font-sans text-ink">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 border-2 border-line bg-card px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-hard-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        {/* Terminal Header Card */}
        <div className="border-2 border-line bg-card shadow-hard">
          <div className="flex items-center justify-between border-b-2 border-line bg-neo-yellow px-4 py-2.5">
            <div className="flex items-center gap-2 font-mono text-xs font-black tracking-widest text-ink uppercase">
              <Terminal className="h-4 w-4" />
              <span>ADMIN_AUTH.EXE</span>
            </div>
            <div className="flex gap-1.5">
              <span className="h-3 w-3 border border-line bg-neo-red" />
              <span className="h-3 w-3 border border-line bg-neo-yellow" />
              <span className="h-3 w-3 border border-line bg-neo-green" />
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <span className="inline-block border border-line bg-neo-cyan px-2 py-0.5 font-mono text-xs font-bold uppercase">
                RESTRICTED AREA
              </span>
              <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
                Control Panel Login
              </h1>
              <p className="mt-1 font-mono text-xs text-muted">
                Enter your credentials to modify site contents and portfolio data.
              </p>
            </div>

            {state?.error && (
              <div className="mb-6 flex items-start gap-2.5 border-2 border-line bg-neo-red/15 p-3 font-mono text-xs font-bold text-destructive">
                <ShieldAlert className="h-4 w-4 shrink-0 text-destructive" />
                <span>{state.error}</span>
              </div>
            )}

            <form action={action} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-wider"
                >
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    defaultValue="abhisheq117@gmail.com"
                    placeholder="admin@example.com"
                    className="w-full border-2 border-line bg-background py-2.5 pr-3 pl-10 font-mono text-sm text-ink outline-none transition-colors focus:bg-white focus:ring-0"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-wider"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••••••"
                    className="w-full border-2 border-line bg-background py-2.5 pr-3 pl-10 font-mono text-sm text-ink outline-none transition-colors focus:bg-white focus:ring-0"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full border-2 border-line bg-neo-green py-3 font-mono text-sm font-black uppercase tracking-wider text-ink shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 disabled:opacity-50"
                >
                  {isPending ? "AUTHENTICATING..." : "ACCESS PANEL →"}
                </button>
              </div>
            </form>

            <div className="mt-6 border-t-2 border-dashed border-line pt-4 text-center">
              <p className="font-mono text-[11px] text-muted">
                Default credentials for initial setup:{" "}
                <code className="bg-neo-yellow/30 px-1 py-0.5 font-bold text-ink">
                  Admin@12345
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
