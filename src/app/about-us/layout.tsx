export const dynamic = "force-dynamic";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us — Engineering Tomorrow",
    description:
        "Tejnavi Studio is a premier digital product agency. We partner with ambitious brands to design and build world-class websites, applications, and digital experiences.",
    openGraph: {
        title: "About Us — Engineering Tomorrow | Tejnavi Studio",
        description:
            "Meet the team behind Tejnavi Studio. We partner with ambitious brands to build world-class digital experiences.",
        images: [{ url: "/banner.png" }],
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
