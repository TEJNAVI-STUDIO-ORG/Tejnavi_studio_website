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
        <footer className="relative bg-[#0a0a0a] pt-20 pb-8 px-4 md:px-10 border-t border-white/5 overflow-hidden font-sans">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

            {/* Legal Modal */}
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
                                className="w-full max-w-3xl bg-[#111] border border-white/10 shadow-2xl flex flex-col max-h-[calc(100vh-2rem)]"
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
                                    {openDoc === "privacy" ? (
                                        <div className="space-y-8">
                                            <p className="text-lg text-whiteChrome/80">
                                                This Privacy Policy explains how Tejnavi Studio collects, uses, and protects
                                                information when you visit or interact with this Website. This Website is created and maintained
                                                by <span className="text-whiteChrome font-medium">Tejnavi Studio</span>.
                                            </p>
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Information we collect
                                                    </h4>
                                                    <div className="space-y-3 pl-3.5 border-l border-white/10">
                                                        <p><strong className="text-whiteChrome font-medium">Contact details</strong> you provide (for example, name, email, and project details) when you submit forms or reach out via email.</p>
                                                        <p><strong className="text-whiteChrome font-medium">Usage data</strong> such as pages viewed, approximate location, device type, and browser information.</p>
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
                                                        <p>The Website may use cookies or similar technologies for essential functionality and analytics. You can control cookies through your browser settings.</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Data sharing
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>We do not sell your personal information. Information may be shared only when necessary to operate the Website or when required by law.</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Contact
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>For privacy-related questions, email: <a className="text-whiteChrome font-medium hover:text-liquidSilver transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/100" href="mailto:tejnavi.studio@gmail.com">tejnavi.studio@gmail.com</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            <p className="text-lg text-whiteChrome/80">
                                                These Terms of Service govern your access to and use of the Tejnavi Studio Website. By using the
                                                Website, you agree to these terms. This Website is created and maintained by <span className="text-whiteChrome font-medium">Tejnavi Studio</span>.
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
                                                        <p>All content, design, and code on this Website are owned by Tejnavi Studio, unless otherwise stated.</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> No warranties
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>The Website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind.</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Limitation of liability
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>To the maximum extent permitted by law, Tejnavi Studio will not be liable for any indirect, incidental, special, or consequential damages.</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-whiteChrome"></span> Contact
                                                    </h4>
                                                    <div className="pl-3.5 border-l border-white/10">
                                                        <p>For questions about these Terms, email: <a className="text-whiteChrome font-medium hover:text-liquidSilver transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/100" href="mailto:tejnavi.studio@gmail.com">tejnavi.studio@gmail.com</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="px-6 py-5 border-t border-white/10 flex items-center justify-between gap-4 bg-white/[0.02]">
                                    <div className="text-xs tracking-widest uppercase text-ashGrey">
                                        Website created by <span className="text-whiteChrome font-bold">Tejnavi Studio</span>
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

            <div className="max-w-[1200px] mx-auto relative z-10">

                {/* Top CTA */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 border-b border-white/10 pb-14 text-center md:text-left">
                    <div className="max-w-lg">
                        <div className="inline-flex items-center gap-2.5 mb-5">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentLime opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accentLime"></span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-ashGrey">Accepting New Projects</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-[var(--font-display)] font-extrabold text-whiteChrome tracking-tight leading-[1.15] mb-0">
                            READY TO <span className="text-accentLime italic font-light">ELEVATE</span> YOUR BRAND?
                        </h2>
                    </div>
                    <div>
                        <Link href="/quote" className="group inline-flex items-center justify-center px-8 py-3.5 bg-accentLime text-[#0a0a0a] font-bold uppercase tracking-widest text-[11px] transition-all duration-300 hover:brightness-110 hover:scale-[0.97] rounded-sm">
                            <span className="flex items-center gap-2">
                                Start a Project <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Middle: Newsletter + Links */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 py-14">

                    {/* Newsletter — redesigned */}
                    <div className="md:col-span-5 text-center md:text-left">
                        <h4 className="text-whiteChrome font-bold mb-3 font-heading tracking-widest text-[11px] uppercase">Stay Updated</h4>
                        <p className="text-ashGrey text-[13px] mb-5 leading-relaxed max-w-sm mx-auto md:mx-0">
                            Design insights, engineering deep-dives, and digital strategy — delivered monthly.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex max-w-sm mx-auto md:mx-0">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-l-sm px-4 py-3 text-[13px] text-whiteChrome placeholder:text-white/25 focus:outline-none focus:border-accentLime/50 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="bg-accentLime text-[#080808] px-5 py-3 font-bold uppercase text-[10px] tracking-widest rounded-r-sm hover:brightness-110 transition-all disabled:opacity-50 whitespace-nowrap"
                            >
                                {status === "submitting" ? "..." : "Subscribe"}
                            </button>
                        </form>
                        {status === "success" && <p className="text-[11px] text-accentLime mt-2">Welcome on board!</p>}
                        {status === "error" && <p className="text-[11px] text-red-400 mt-2">Something went wrong.</p>}
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-3 text-center md:text-left">
                        <h4 className="text-whiteChrome font-bold mb-3 font-heading tracking-widest text-[11px] uppercase">Navigation</h4>
                        <ul className="space-y-2.5 text-ashGrey text-[13px]">
                            <li><Link href="/" className="hover:text-whiteChrome transition-colors">Home</Link></li>
                            <li><Link href="/services" className="hover:text-whiteChrome transition-colors">Services</Link></li>
                            <li><Link href="/projects" className="hover:text-whiteChrome transition-colors">Work</Link></li>
                            <li><Link href="/about-us" className="hover:text-whiteChrome transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-whiteChrome transition-colors">Insights</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="md:col-span-4 text-center md:text-left">
                        <h4 className="text-whiteChrome font-bold mb-3 font-heading tracking-widest text-[11px] uppercase">Connect</h4>
                        <ul className="space-y-2.5 text-ashGrey text-[13px]">
                            <li><a href="https://instagram.com/tejnavi.studio" target="_blank" rel="noopener noreferrer" className="hover:text-whiteChrome transition-colors">Instagram</a></li>
                            <li><a href="https://linkedin.com/company/tejnavi-studio" target="_blank" rel="noopener noreferrer" className="hover:text-whiteChrome transition-colors">LinkedIn</a></li>
                            <li><a href="https://twitter.com/tejnavi" target="_blank" rel="noopener noreferrer" className="hover:text-whiteChrome transition-colors">Twitter (X)</a></li>
                            <li><a href="mailto:tejnavi.studio@gmail.com" className="hover:text-whiteChrome transition-colors">tejnavi.studio@gmail.com</a></li>
                            <li><a href="https://wa.me/919219271405" target="_blank" rel="noopener noreferrer" className="hover:text-whiteChrome transition-colors">+91 9219271405</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom: Legal & Copyright */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-ashGrey uppercase tracking-[0.15em] gap-4">
                    <div className="flex gap-6">
                        <button type="button" onClick={() => setOpenDoc("privacy")} className="hover:text-whiteChrome transition-colors">Privacy Policy</button>
                        <button type="button" onClick={() => setOpenDoc("terms")} className="hover:text-whiteChrome transition-colors">Terms of Service</button>
                    </div>
                    <p>&copy; {year} Tejnavi Studio.</p>
                    <p className="hidden md:block">Engineered by Tejnavi Studio</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
