"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type LegalDocType = "privacy" | "terms" | null;

export function Footer() {
    const [openDoc, setOpenDoc] = useState<LegalDocType>(null);

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

    const docTitle = openDoc === "privacy" ? "Privacy Policy" : openDoc === "terms" ? "Terms of Service" : "";

    return (
        <footer className="bg-matteCarbon pt-32 pb-12 px-6 border-t border-white/5">
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
                            className="absolute inset-0 bg-black/70"
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
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 260, damping: 24 }}
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
                                        className="inline-flex items-center justify-center w-10 h-10 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-colors"
                                        aria-label="Close"
                                    >
                                        <X className="w-5 h-5 text-whiteChrome" />
                                    </button>
                                </div>

                                <div
                                    data-lenis-prevent
                                    onWheelCapture={(e) => e.stopPropagation()}
                                    onTouchMoveCapture={(e) => e.stopPropagation()}
                                    className="px-6 py-6 flex-1 overflow-y-auto overscroll-contain text-ashGrey leading-relaxed [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                                >
                                    {openDoc === "privacy" ? (
                                        <div className="space-y-6">
                                            <p>
                                                This Privacy Policy explains how Tejnavi Studio (the &ldquo;Website&rdquo;) collects, uses, and protects
                                                information when you visit or interact with this Website. This Website is created and maintained
                                                by <span className="text-whiteChrome">Aditya Vispute</span>.
                                            </p>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">Information we collect</h4>
                                                <div className="space-y-3">
                                                    <p>
                                                        - <span className="text-whiteChrome">Contact details</span> you provide (for example, name,
                                                        email, and project details) when you submit forms or reach out via email.
                                                    </p>
                                                    <p>
                                                        - <span className="text-whiteChrome">Usage data</span> such as pages viewed, approximate
                                                        location, device type, and browser information. This may be collected via standard analytics
                                                        and server logs.
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">How we use information</h4>
                                                <div className="space-y-3">
                                                    <p>- To respond to inquiries and provide requested services or proposals.</p>
                                                    <p>- To improve website performance, security, and user experience.</p>
                                                    <p>- To communicate important updates related to your request or engagement.</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">Cookies</h4>
                                                <p>
                                                    The Website may use cookies or similar technologies for essential functionality and analytics.
                                                    You can control cookies through your browser settings.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">Data sharing</h4>
                                                <p>
                                                    We do not sell your personal information. Information may be shared only when necessary to
                                                    operate the Website (for example, hosting or analytics providers) or when required by law.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">Data retention</h4>
                                                <p>
                                                    We retain information only as long as needed to fulfill the purposes described above, comply
                                                    with legal obligations, and resolve disputes.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">Your rights</h4>
                                                <p>
                                                    You may request access, correction, or deletion of your information by contacting us.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">Contact</h4>
                                                <p>
                                                    For privacy-related questions, email: <a className="text-whiteChrome hover:text-liquidSilver transition-colors" href="mailto:adityavispute29@gmail.com">adityavispute29@gmail.com</a>
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <p>
                                                These Terms of Service govern your access to and use of the Tejnavi Studio Website. By using the
                                                Website, you agree to these terms. This Website is created and maintained by <span className="text-whiteChrome">Aditya Vispute</span>.
                                            </p>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">Use of the website</h4>
                                                <div className="space-y-3">
                                                    <p>- You agree not to misuse the Website, attempt unauthorized access, or disrupt services.</p>
                                                    <p>- You agree not to copy, scrape, or reverse engineer the Website in ways that violate applicable laws.</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">Intellectual property</h4>
                                                <p>
                                                    All content, design, and code on this Website are owned by Tejnavi Studio and/or Aditya Vispute,
                                                    unless otherwise stated. You may not reproduce or distribute materials without prior written
                                                    permission.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">No warranties</h4>
                                                <p>
                                                    The Website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind. We do not
                                                    guarantee uninterrupted or error-free operation.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">Limitation of liability</h4>
                                                <p>
                                                    To the maximum extent permitted by law, Tejnavi Studio and Aditya Vispute will not be liable
                                                    for any indirect, incidental, special, or consequential damages arising from use of the Website.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">Changes</h4>
                                                <p>
                                                    We may update these Terms from time to time. Continued use of the Website after changes means
                                                    you accept the updated terms.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-whiteChrome font-bold tracking-widest uppercase text-sm mb-2">Contact</h4>
                                                <p>
                                                    For questions about these Terms, email: <a className="text-whiteChrome hover:text-liquidSilver transition-colors" href="mailto:adityavispute29@gmail.com">adityavispute29@gmail.com</a>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="px-6 py-5 border-t border-white/10 flex items-center justify-between gap-4">
                                    <div className="text-xs tracking-widest uppercase text-ashGrey">
                                        Website created by <span className="text-whiteChrome">Aditya Vispute</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setOpenDoc(null)}
                                        className="inline-flex items-center justify-center px-5 py-3 bg-whiteChrome text-matteCarbon font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-whiteChrome mb-6 tracking-tight">
                            READY TO <br /> BUILD <span className="text-liquidSilver italic">BEYOND?</span>
                        </h2>
                        <Link href="/quote" className="inline-block bg-whiteChrome text-matteCarbon px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-liquidSilver transition-all duration-300">
                            Start a Project
                        </Link>
                    </div>

                    <div>
                        <h4 className="text-whiteChrome font-bold mb-6 font-heading tracking-widest text-sm">NAVIGATION</h4>
                        <ul className="space-y-4 text-ashGrey">
                            <li><Link href="/services" className="hover:text-whiteChrome transition-colors">Expertise</Link></li>
                            <li><Link href="/projects" className="hover:text-whiteChrome transition-colors">Projects</Link></li>
                            <li><Link href="/about-us" className="hover:text-whiteChrome transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-whiteChrome transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-whiteChrome font-bold mb-6 font-heading tracking-widest text-sm">SOCIAL</h4>
                        <ul className="space-y-4 text-ashGrey">
                            <li>
                                <a
                                    href="https://github.com/TEJNAVI-STUDIO"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-whiteChrome transition-colors"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/orgs/TEJNAVI-STUDIO-ORG"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-whiteChrome transition-colors"
                                >
                                    GitHub Org
                                </a>
                            </li>
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
                                    href="https://www.solvearn.net/app/company/10703-tejnavi-studio/home"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-whiteChrome transition-colors"
                                >
                                    Solvearn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:adityavispute29@gmail.com"
                                    className="hover:text-whiteChrome transition-colors"
                                >
                                    Email
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-ashGrey tracking-widest uppercase">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <p>&copy; {year} Aditya Vispute. All rights reserved.</p>
                        <p className="text-ashGrey/70">Website created &amp; maintained by Aditya Vispute.</p>
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <button
                            type="button"
                            onClick={() => setOpenDoc("privacy")}
                            className="hover:text-whiteChrome transition-colors"
                        >
                            Privacy Policy
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpenDoc("terms")}
                            className="hover:text-whiteChrome transition-colors"
                        >
                            Terms of Service
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
