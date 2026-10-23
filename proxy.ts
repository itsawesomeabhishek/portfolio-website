import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

import { getJwtKey } from "@/lib/auth-secret";

const COOKIE_NAME = "portfolio_admin_token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    let isAuthenticated = false;
    const key = getJwtKey();

    if (token && key) {
      try {
        await jwtVerify(token, key, { algorithms: ["HS256"] });
        isAuthenticated = true;
      } catch {
        isAuthenticated = false;
      }
    }

    // If on login page and already authenticated, go to dashboard
    if (pathname === "/admin/login") {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    // If trying to access protected admin page without auth, go to login
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
