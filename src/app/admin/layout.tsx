"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    MessageSquare,
    Quote,
    Users,
    Settings,
    LogOut,
    Star,
    Mail,
} from "lucide-react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/testimonials", label: "Testimonials", icon: Star },
    { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
    { href: "/admin/quotes", label: "Quotes", icon: Quote },
    { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
    { href: "/admin/users", label: "Team", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-brushedAnthracite border-r border-white/5 flex flex-col z-50">
            {/* Logo */}
            <div className="p-6 border-b border-white/5">
                <Link href="/admin" className="text-xl font-heading font-bold text-whiteChrome tracking-tighter">
                    TEJNAVI<span className="text-liquidSilver">.</span>
                    <span className="text-xs text-ashGrey font-normal ml-2 tracking-normal">Admin</span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${isActive
                                    ? "bg-white/10 text-whiteChrome font-medium"
                                    : "text-ashGrey hover:text-whiteChrome hover:bg-white/5"
                                }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User + Logout */}
            <div className="p-4 border-t border-white/5">
                <div className="text-sm text-ashGrey mb-3 px-4">
                    <div className="text-whiteChrome font-medium truncate">{session?.user?.name || "Admin"}</div>
                    <div className="text-xs truncate">{session?.user?.email}</div>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-ashGrey hover:text-red-400 transition-colors w-full"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return <div className="min-h-screen bg-matteCarbon">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-matteCarbon">
            <AdminSidebar />
            <main className="ml-64 p-8">{children}</main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AdminLayoutInner>{children}</AdminLayoutInner>
        </SessionProvider>
    );
}
