export const dynamic = "force-dynamic";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Have a project in mind? Contact Tejnavi Studio. Drop us a message and we'll get back to you within 24 hours.",
    openGraph: {
        title: "Contact Us | Tejnavi Studio",
        description:
            "Have a project in mind? Drop us a message and we'll get back to you within 24 hours.",
        images: [{ url: "/banner.png" }],
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
