"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Toaster } from "@/components/ui/toaster";

export function ClientShell({ children }: { children: React.ReactNode }) {
    return (
        <SmoothScroll>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
            <Toaster />
        </SmoothScroll>
    );
}
