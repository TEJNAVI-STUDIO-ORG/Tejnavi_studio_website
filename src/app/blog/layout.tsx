import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Insights & Blog | Tejnavi Studio",
    description: "Expert insights on web development, design, AI, and digital strategy from the Tejnavi Studio team.",
    openGraph: {
        title: "Insights & Blog | Tejnavi Studio",
        description: "Expert insights on web development, design, AI, and digital strategy.",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return children;
}
