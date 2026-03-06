export const dynamic = "force-dynamic";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Expertise & Services",
    description:
        "End-to-end digital product engineering — web development, mobile apps, SaaS platforms, UI/UX design, AI automation, SEO, and more. Tejnavi Studio delivers world-class quality.",
    openGraph: {
        title: "Our Expertise & Services | Tejnavi Studio",
        description:
            "End-to-end digital product engineering — web development, mobile apps, SaaS platforms, UI/UX design, AI automation, and more.",
        images: [{ url: "/banner.png" }],
    },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
