"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type LegalDocType = "privacy" | "terms" | null;

export function Footer() {
    const { toast } = useToast();
    const [openDoc, setOpenDoc] = useState<LegalDocType>(null);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const year = useMemo(() => new Date().getFullYear(), []);
    const lastUpdated = useMemo(() => new Date().toLocaleDateString(), []);

    useEffect(() => {
        if (!openDoc) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [openDoc]);

    useEffect(() => {
        if (!openDoc) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenDoc(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [openDoc]);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("submitting");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to subscribe");
            }

            setStatus("success");
            setEmail("");
            toast({
                title: "Subscribed!",
                description: "You've successfully joined our newsletter.",
            });
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error: any) {
            console.error(error);
            setStatus("error");
            toast({
                title: "Subscription Failed",
                description: error.message || "Something went wrong. Please try again.",
                variant: "destructive",
            });
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    const docTitle = openDoc === "privacy" ? "Privacy Policy" : openDoc === "terms" ? "Terms of Service" : "";

    return (
        <footer className="relative bg-matteCarbon pt-32 pb-12 px-6 border-t border-white/5 overflow-hidden noise-overlay">
            <AnimatePresence>
                {openDoc ? (
                    <motion.div
                        className="fixed inset-0 z-[60]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.button
                            type="button"
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={() => setOpenDoc(null)}
                            aria-label="Close dialog"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <div className="absolute inset-0 flex items-end sm:items-center justify-center p-4">
                            <motion.div
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="legal-modal-title"
                                className="w-full max-w-3xl bg-brushedAnthracite border border-white/10 shadow-2xl flex flex-col max-h-[calc(100vh-2rem)]"
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <div className="flex items-start justify-between gap-6 px-6 py-5 border-b border-white/10">
                                    <div>
                                        <div className="text-xs tracking-widest uppercase text-liquidSilver">Legal</div>
                                        <h3 id="legal-modal-title" className="text-2xl font-heading font-bold text-whiteChrome mt-1">
                                            {docTitle}
                                        </h3>
                                        <div className="text-xs text-ashGrey mt-2 tracking-widest uppercase">
                                            Last updated: {lastUpdated}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setOpenDoc(null)}
                                        className="inline-flex items-center justify-center w-10 h-10 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-colors group"
                                        aria-label="Close"
                                    >
                                        <X className="w-5 h-5 text-whiteChrome group-hover:rotate-90 transition-transform duration-300" />
                                    </button>
                                </div>

                                <div
                                    data-lenis-prevent
                                    onWheelCapture={(e) => e.stopPropagation()}
                                    onTouchMoveCapture={(e) => e.stopPropagation()}
                                    className="px-6 py-8 flex-1 overflow-y-auto overscroll-contain text-ashGrey leading-relaxed [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                                >
                                    {/* Policy Content (Unmodified) */}
                                    {openDoc === "privacy" ? (
                                        <div className="space-y-8">
                                            <p className="text-lg text-whiteChrome/80">
                                                This Privacy Policy explains how Tejnavi Studio collects, uses, and protects
                                                information when you visit or interact with this Website. This Website is created and maintained
                                                by <span className="text-whiteChrome font-medium">Aditya Vispute</span>.
                                            </p>

                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Information we collect
                                                    </h4>
                                                    <div className="space-y-3 pl-3.5 border-l border-white/10">
                                                        <p>
                                                            <strong className="text-whiteChrome font-medium">Contact details</strong> you provide (for example, name,
                                                            email, and project details) when you submit forms or reach out via email.
                                                        </p>
                                                        <p>
                                                            <strong className="text-whiteChrome font-medium">Usage data</strong> such as pages viewed, approximate
                                                            location, device type, and browser information. This may be collected via standard analytics
                                                            and server logs.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> How we use information
                                                    </h4>
                                                    <div className="space-y-3 pl-3.5 border-l border-white/10">
                                                        <p>To respond to inquiries and provide requested services or proposals.</p>
                                                        <p>To improve website performance, security, and user experience.</p>
                                                        <p>To communicate important updates related to your request or engagement.</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Cookies
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>
                                                            The Website may use cookies or similar technologies for essential functionality and analytics.
                                                            You can control cookies through your browser settings.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Data sharing
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>
                                                            We do not sell your personal information. Information may be shared only when necessary to
                                                            operate the Website (for example, hosting or analytics providers) or when required by law.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Contact
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>
                                                            For privacy-related questions, email: <a className="text-whiteChrome font-medium hover:text-liquidSilver transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/100" href="mailto:adityavispute29@gmail.com">adityavispute29@gmail.com</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            <p className="text-lg text-whiteChrome/80">
                                                These Terms of Service govern your access to and use of the Tejnavi Studio Website. By using the
                                                Website, you agree to these terms. This Website is created and maintained by <span className="text-whiteChrome font-medium">Aditya Vispute</span>.
                                            </p>

                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Use of the website
                                                    </h4>
                                                    <div className="space-y-3 pl-3.5 border-l border-white/10">
                                                        <p>You agree not to misuse the Website, attempt unauthorized access, or disrupt services.</p>
                                                        <p>You agree not to copy, scrape, or reverse engineer the Website in ways that violate applicable laws.</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Intellectual property
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>
                                                            All content, design, and code on this Website are owned by Tejnavi Studio and/or Aditya Vispute,
                                                            unless otherwise stated. You may not reproduce or distribute materials without prior written
                                                            permission.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> No warranties
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>
                                                            The Website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind. We do not
                                                            guarantee uninterrupted or error-free operation.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Limitation of liability
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>
                                                            To the maximum extent permitted by law, Tejnavi Studio and Aditya Vispute will not be liable
                                                            for any indirect, incidental, special, or consequential damages arising from use of the Website.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Contact
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>
                                                            For questions about these Terms, email: <a className="text-whiteChrome font-medium hover:text-liquidSilver transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/100" href="mailto:adityavispute29@gmail.com">adityavispute29@gmail.com</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="px-6 py-5 border-t border-white/10 flex items-center justify-between gap-4 bg-white/[0.02]">
                                    <div className="text-xs tracking-widest uppercase text-ashGrey">
                                        Website created by <span className="text-whiteChrome font-bold">Aditya Vispute</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setOpenDoc(null)}
                                        className="inline-flex items-center justify-center px-6 py-3 bg-whiteChrome text-matteCarbon font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className="max-w-[85rem] mx-auto relative z-10 px-4 sm:px-12">

                <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24 mb-24">

                    {/* Left side: Massive CTA */}
                    <div className="lg:w-1/2 flex flex-col justify-start">
                        <div className="inline-flex items-center gap-3 mb-10">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-whiteChrome/40 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-whiteChrome"></span>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-ashGrey">Available for new projects</span>
                        </div>

                        <h2 className="text-5xl sm:text-6xl md:text-[5.5rem] font-heading font-bold text-whiteChrome tracking-tighter leading-[1] mb-8">
                            LET&apos;S BUILD <br /> <span className="text-liquidSilver italic font-light">TOGETHER.</span>
                        </h2>

                        <div className="mt-4">
                            <Link href="/quote" className="group rounded-full bg-whiteChrome text-matteCarbon px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-whiteChrome/90 hover:scale-105 transition-all duration-300 inline-flex items-center gap-4">
                                Start a Project
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-all duration-300" />
                            </Link>
                        </div>
                    </div>

                    {/* Right side: Nav & Newsletter */}
                    <div className="lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-6 pt-4">

                        {/* Navigation Links */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-ashGrey font-bold tracking-widest text-xs uppercase">Menu</h4>
                            <ul className="space-y-4 text-whiteChrome/80">
                                <li><Link href="/services" className="hover:text-white transition-colors text-base hover:pl-2 duration-300">Expertise</Link></li>
                                <li><Link href="/projects" className="hover:text-white transition-colors text-base hover:pl-2 duration-300">Projects</Link></li>
                                <li><Link href="/about-us" className="hover:text-white transition-colors text-base hover:pl-2 duration-300">About Us</Link></li>
                                <li><Link href="/blog" className="hover:text-white transition-colors text-base hover:pl-2 duration-300">Insights</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors text-base hover:pl-2 duration-300">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-ashGrey font-bold tracking-widest text-xs uppercase">Socials</h4>
                            <ul className="space-y-4 text-whiteChrome/80">
                                <li><a href="https://github.com/TEJNAVI-STUDIO" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-base hover:pl-2 duration-300">GitHub</a></li>
                                <li><a href="https://instagram.com/tejnavi.studio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-base hover:pl-2 duration-300">Instagram</a></li>
                                <li><a href="https://www.solvearn.net/app/company/10703-tejnavi-studio/home" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-base hover:pl-2 duration-300">Solvearn</a></li>
                                <li><a href="mailto:adityavispute29@gmail.com" className="hover:text-white transition-colors text-base hover:pl-2 duration-300">Email</a></li>
                            </ul>
                        </div>

                    <div>
                        <h4 className="text-whiteChrome font-bold mb-6 font-heading tracking-widest text-sm">SOCIAL</h4>
                        <ul className="space-y-4 text-ashGrey">
                            <li>
                                <a
                                    href="https://instagram.com/tejnavi.studio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-whiteChrome transition-colors"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linkedin.com/company/tejnavi-studio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-whiteChrome transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/918459632402"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-whiteChrome transition-colors"
                                >
                                    WhatsApp
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:tejnavi.studio@gmail.com"
                                    className="hover:text-whiteChrome transition-colors"
                                >
                                    Email
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom GIANT BRAND TEXT */}
                <div className="w-full pt-10 pb-6 flex flex-col items-center border-t border-white/10">

                    {/* Bottom Credits / Links */}
                    <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs text-ashGrey tracking-widest uppercase gap-6 md:gap-0 mb-16">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-center md:text-left">
                            <p>&copy; {year} Aditya Vispute. All rights reserved.</p>
                            <a href="mailto:adityavispute29@gmail.com" className="hover:text-white transition-colors text-ashGrey/70">
                                adityavispute29@gmail.com
                            </a>
                        </div>
                        <div className="flex space-x-6 md:space-x-12">
                            <button type="button" onClick={() => setOpenDoc("privacy")} className="hover:text-white transition-colors underline-offset-4 hover:underline">
                                Privacy Policy
                            </button>
                            <button type="button" onClick={() => setOpenDoc("terms")} className="hover:text-white transition-colors underline-offset-4 hover:underline">
                                Terms of Service
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
