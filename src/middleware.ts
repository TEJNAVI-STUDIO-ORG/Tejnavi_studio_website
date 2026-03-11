import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isAuthenticated = !!req.auth;

    // If user is already logged in, prevent them from going back to the login page
    if (pathname.toLowerCase().startsWith("/admin/login")) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
    }

    // Protect /admin/* routes (except /admin/login)
    if (pathname.startsWith("/admin") && !pathname.toLowerCase().startsWith("/admin/login")) {
        if (!isAuthenticated) {
            const loginUrl = new URL("/admin/login", req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Protect /api/admin/* routes
    if (pathname.startsWith("/api/admin")) {
        if (!isAuthenticated) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    // If no specific action is taken, allow the request to proceed
    // The `auth` wrapper implicitly calls NextResponse.next() if no response is returned.
});

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
