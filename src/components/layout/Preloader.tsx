"use client";

import { useEffect, useState } from "react";

export function Preloader() {
    const [phase, setPhase] = useState<"visible" | "sliding" | "gone">("visible");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("sliding"), 800);
        const t2 = setTimeout(() => setPhase("gone"), 1800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    if (phase === "gone") return null;

    return (
        <div
            className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#080808] transition-transform duration-1000 ease-in-out ${
                phase === "sliding" ? "-translate-y-full" : "translate-y-0"
            }`}
        >
            <h1 className="font-[var(--font-display)] text-3xl md:text-[40px] tracking-tighter uppercase text-accentLime animate-pulse font-extrabold">
                Tejnavi Studio
            </h1>
        </div>
    );
}
