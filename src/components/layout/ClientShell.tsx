"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Preloader } from "@/components/layout/Preloader";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

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
            {!isAdminPage && <Preloader />}
            {!isAdminPage && <CustomCursor />}
            {isAdminPage ? content : <SmoothScroll>{content}</SmoothScroll>}
            <Toaster />
            <SonnerToaster position="top-right" richColors closeButton />
        </>
    );
}
