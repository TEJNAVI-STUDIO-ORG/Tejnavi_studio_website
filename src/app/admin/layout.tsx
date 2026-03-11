"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
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
    X,
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

function AdminSidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen w-64 bg-brushedAnthracite border-r border-white/5 flex flex-col z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {/* Logo */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <Link href="/admin" onClick={() => setIsOpen(false)} className="text-xl font-heading font-bold text-whiteChrome tracking-tighter">
                        TEJNAVI<span className="text-liquidSilver">.</span>
                        <span className="text-xs text-ashGrey font-normal ml-2 tracking-normal">Admin</span>
                    </Link>
                    <button className="lg:hidden text-ashGrey hover:text-whiteChrome" onClick={() => setIsOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
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
                <div className="p-4 border-t border-white/5 shrink-0">
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
        </>
    );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname.toLowerCase().startsWith("/admin/login");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (isLoginPage) {
        return <div className="min-h-screen bg-matteCarbon">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-matteCarbon flex flex-col lg:flex-row">
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Mobile Header with Hamburger */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-brushedAnthracite sticky top-0 z-30">
                <Link href="/admin" className="text-lg font-heading font-bold text-whiteChrome tracking-tighter">
                    TEJNAVI<span className="text-liquidSilver">.</span>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="text-whiteChrome p-2 hover:bg-white/5 rounded-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                </button>
            </div>

            <main className="flex-1 lg:ml-64 p-4 sm:p-8 overflow-x-hidden min-h-0">
                {children}
            </main>
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
