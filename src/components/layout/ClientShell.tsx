"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Toaster } from "@/components/ui/toaster";

export function ClientShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname.toLowerCase().startsWith("/admin");

    const content = (
        <div className="flex flex-col min-h-screen">
            {!isAdminPage && <Navbar />}
            <main className="flex-grow">{children}</main>
            {!isAdminPage && <Footer />}
        </div>
    );

    return (
        <>
            {isAdminPage ? content : <SmoothScroll>{content}</SmoothScroll>}
            <Toaster />
        </>
    );
}
