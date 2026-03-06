"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useRef } from "react";

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const lastScrollY = useRef(0);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest > lastScrollY.current ? "down" : "up";
        lastScrollY.current = latest;

        // Hide on scroll down, show on scroll up
        if (direction === "down" && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }

        // Backdrop blur after scrolling past hero
        setIsScrolled(latest > 80);
    });

    const links = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Expertise" },
        { href: "/projects", label: "Projects" },
        { href: "/about-us", label: "About Us" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isHidden && !isMobileMenuOpen ? -100 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 w-full z-50 px-6 py-5 transition-all duration-300 ${isScrolled
                    ? "bg-matteCarbon/85 backdrop-blur-md border-b border-white/5"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                <Link
                    href="/"
                    className="text-2xl font-heading font-bold tracking-tighter text-whiteChrome group relative z-50"
                >
                    TEJNAVI
                    <span className="text-liquidSilver group-hover:text-mercuryGlow transition-colors duration-200">
                        .
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-10 text-sm uppercase tracking-widest font-medium text-liquidSilver">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative group transition-all duration-200 ${pathname === link.href
                                    ? "text-whiteChrome"
                                    : "hover:text-whiteChrome"
                                }`}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -bottom-2 left-0 w-full h-[1px] bg-whiteChrome"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                    <Link
                        href="/quote"
                        className="bg-whiteChrome text-matteCarbon px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all duration-200"
                    >
                        Get a Quote
                    </Link>
                </div>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden text-whiteChrome z-50 relative"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-0 bg-matteCarbon z-40 flex flex-col items-center justify-center space-y-8"
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-3xl font-heading font-bold text-whiteChrome hover:text-liquidSilver transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/quote"
                        className="bg-whiteChrome text-matteCarbon px-8 py-4 mt-8 font-bold uppercase tracking-widest text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Get a Quote
                    </Link>
                </motion.div>
            )}
        </motion.nav>
    );
}
