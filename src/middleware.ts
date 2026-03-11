import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { pathname } = req.nextUrl;

    // If user is already logged in, prevent them from going back to the login page
    if (pathname.toLowerCase().startsWith("/admin/login")) {
        if (req.auth) {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
    }

    // Protect /admin/* routes (except /admin/login)
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        if (!req.auth) {
            const loginUrl = new URL("/admin/login", req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Protect /api/admin/* routes
    if (pathname.startsWith("/api/admin")) {
        if (!req.auth) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
