"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const lastScrollY = useRef(0);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const { scrollY } = useScroll();

    // Lock body scroll when mobile menu is open
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
        { href: "/services", label: "Expertise" },
        { href: "/projects", label: "Projects" },
        { href: "/blog", label: "Blog" },
        { href: "/about-us", label: "About Us" },
        { href: "/contact", label: "Contact" },
    ];

    const isDark = resolvedTheme === "dark";

    const ThemeToggle = () => (
        mounted ? (
            <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
                className="w-8 h-8 flex items-center justify-center text-liquidSilver hover:text-whiteChrome transition-colors duration-200"
            >
                {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>
        ) : <div className="w-8 h-8" />
    );

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isHidden && !isMobileMenuOpen ? -100 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 w-full z-[100] px-6 py-4 transition-all duration-300 ${
                isScrolled && !isMobileMenuOpen
                    ? "bg-matteCarbon/70 backdrop-blur-xl border-b border-whiteChrome/10"
                    : isMobileMenuOpen
                        ? "bg-matteCarbon"
                        : "bg-transparent"
            }`}
        >
            <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                <Link
                    href="/"
                    className="text-2xl font-heading font-bold tracking-tighter text-whiteChrome group relative z-[101]"
                >
                    TEJNAVI
                    <span className="text-liquidSilver opacity-50 group-hover:opacity-100 transition-opacity duration-200">
                        .
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-bold text-ashGrey">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative group transition-colors duration-200 ${
                                pathname === link.href
                                    ? "text-whiteChrome"
                                    : "hover:text-whiteChrome"
                            }`}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-whiteChrome"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}

                    <div className="w-[1px] h-4 bg-whiteChrome/20" />

                    <ThemeToggle />

                    <Link
                        href="/quote"
                        className="bg-whiteChrome text-matteCarbon px-6 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all duration-300"
                    >
                        Get a Quote
                    </Link>
                </div>

                {/* Mobile controls */}
                <div className="md:hidden flex items-center gap-4 z-[101] relative">
                    <ThemeToggle />
                    <button
                        className="text-whiteChrome"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-matteCarbon z-[90] flex flex-col items-center justify-center space-y-8 h-screen w-screen"
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-2xl font-heading font-bold tracking-widest text-whiteChrome hover:text-ashGrey transition-all duration-200 uppercase"
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
