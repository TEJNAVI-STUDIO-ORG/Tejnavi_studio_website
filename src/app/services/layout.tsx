import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services & Expertise | Tejnavi Studio",
    description: "End-to-end digital product engineering. We specialize in Website Development, Web Apps, SaaS, Mobile Apps, UI/UX Design, and more.",
    openGraph: {
        title: "Services & Expertise | Tejnavi Studio",
        description: "End-to-end digital product engineering. We specialize in Website Development, Web Apps, SaaS, Mobile Apps, UI/UX Design, and more.",
        url: "https://tejnavistudio.vercel.app/services",
        siteName: "Tejnavi Studio",
    },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
