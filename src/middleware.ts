import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // We use NextAuth's JWT getToken helper which works perfectly on the Edge runtime
    // We must pass the request and the secret explicitly
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthenticated = !!token;

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

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
