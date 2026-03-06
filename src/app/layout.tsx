import type { Metadata } from "next";
import { Inter, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ClientShell } from "@/components/layout/ClientShell";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    weight: ["300", "400", "500"],
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Tejnavi Studio | Premium Digital Craftsmanship",
        template: "%s | Tejnavi Studio",
    },
    description:
        "Tejnavi Studio is a premier digital product agency. We design and build world-class websites, applications, and digital experiences for ambitious brands.",
    metadataBase: new URL("https://tejnavistudio.com"),
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "Tejnavi Studio",
        title: "Tejnavi Studio | Premium Digital Craftsmanship",
        description:
            "Premier digital product agency delivering world-class websites, applications, and digital experiences.",
        images: [{ url: "/banner.png", width: 1200, height: 630, alt: "Tejnavi Studio" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tejnavi Studio | Premium Digital Craftsmanship",
        description:
            "Premier digital product agency delivering world-class websites, applications, and digital experiences.",
        images: ["/banner.png"],
    },
    authors: [{ name: "Aditya Vispute" }],
    creator: "Aditya Vispute",
    icons: {
        icon: "/favicon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} dark`}
            suppressHydrationWarning
        >
            <body className="selection:bg-whiteChrome selection:text-matteCarbon">
                <Providers>
                    <ClientShell>{children}</ClientShell>
                </Providers>
            </body>
        </html>
    );
}
