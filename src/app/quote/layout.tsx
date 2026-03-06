export const dynamic = "force-dynamic";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Project Estimator — Get a Quote",
    description:
        "Get an instant ballpark estimate for your next digital project. Select your service type, features, and timeline to see pricing from Tejnavi Studio.",
    openGraph: {
        title: "Project Estimator — Get a Quote | Tejnavi Studio",
        description:
            "Get an instant ballpark estimate for your next digital project.",
        images: [{ url: "/banner.png" }],
    },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
    return children;
}
