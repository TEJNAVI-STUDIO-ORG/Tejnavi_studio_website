"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const lastScrollY = useRef(0);

    const { scrollY } = useScroll();

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileMenuOpen]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest > lastScrollY.current ? "down" : "up";
        lastScrollY.current = latest;

        if (direction === "down" && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }

        setIsScrolled(latest > 80);
    });

    const links = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/projects", label: "Work" },
        { href: "/blog", label: "Process" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isHidden && !isMobileMenuOpen ? -100 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 w-full z-[100] px-5 md:px-[60px] py-6 transition-all duration-300 border-b border-white/10 ${
                isScrolled && !isMobileMenuOpen
                    ? "bg-[#131313]/80 backdrop-blur-md"
                    : isMobileMenuOpen
                        ? "bg-[#131313]"
                        : "bg-transparent"
            }`}
        >
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="relative z-[101] font-[var(--font-display)] text-2xl font-extrabold tracking-tighter uppercase"
                >
                    <span className="text-whiteChrome">TEJNAVI</span>
                    <span className="text-accentLime">STUDIO</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 items-center">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`uppercase tracking-widest text-[12px] font-medium transition-all duration-300 ${
                                    isActive
                                        ? "text-accentLime font-bold border-b border-accentLime"
                                        : "text-[#c4c9b1] hover:text-whiteChrome"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop CTA */}
                <Link
                    href="/quote"
                    className="hidden md:inline-flex bg-accentLime text-[#080808] font-bold uppercase text-[12px] tracking-wider px-6 py-3 rounded-sm hover-glow transition-all duration-300 hover:scale-[0.95]"
                >
                    Start a Project
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-whiteChrome z-[101] relative"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-[#131313] z-[90] flex flex-col items-center justify-center gap-7 h-screen w-screen"
                >
                    {links.map((link, i) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                        >
                            <Link
                                href={link.href}
                                className={`text-2xl font-[var(--font-display)] font-bold tracking-widest uppercase transition-all duration-200 ${
                                    pathname === link.href ? "text-accentLime" : "text-whiteChrome hover:text-[#c4c9b1]"
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: links.length * 0.06 }}
                    >
                        <Link
                            href="/quote"
                            className="inline-flex bg-accentLime text-[#080808] px-8 py-4 mt-4 font-bold uppercase tracking-widest text-sm rounded-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Start a Project
                        </Link>
                    </motion.div>
                </motion.div>
            )}
        </motion.nav>
    );
}
