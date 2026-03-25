import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Work & Portfolio | Tejnavi Studio",
    description: "Explore our selected projects across Web, Mobile, SaaS, E-commerce, and Custom CRM solutions built for modern businesses.",
    openGraph: {
        title: "Our Work & Portfolio | Tejnavi Studio",
        description: "Explore our selected projects across Web, Mobile, SaaS, E-commerce, and Custom CRM solutions built for modern businesses.",
        url: "https://tejnavistudio.vercel.app/projects",
        siteName: "Tejnavi Studio",
    },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
