export const dynamic = "force-dynamic";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Build Workflows",
    description:
        "Explore our exact delivery workflows for web development, mobile apps, SaaS platforms, CRM, AI automation, and more at Tejnavi Studio.",
    openGraph: {
        title: "Build Workflows | Tejnavi Studio",
        description:
            "Explore our exact delivery workflows for digital product engineering.",
        images: [{ url: "/banner.png" }],
    },
};

export default function WorkflowsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
