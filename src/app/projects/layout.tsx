export const dynamic = "force-dynamic";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Selected Work & Portfolio",
    description:
        "Explore our portfolio of world-class websites, web applications, SaaS platforms, and mobile apps built for ambitious brands by Tejnavi Studio.",
    openGraph: {
        title: "Selected Work & Portfolio | Tejnavi Studio",
        description:
            "Explore our portfolio of premium digital products built for ambitious brands.",
        images: [{ url: "/banner.png" }],
    },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
