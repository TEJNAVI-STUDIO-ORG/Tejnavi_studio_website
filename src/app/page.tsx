"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import { PROJECTS } from "@/data/projects";

const Hero3D = dynamic(
    () => import("@/components/home/Hero3D").then((mod) => mod.Hero3D),
    { ssr: false }
);

/* ── Count-Up Number Component ── */
function CountUp({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [display, setDisplay] = useState(0);
    const startedRef = useRef(false);

    useEffect(() => {
        if (!isInView || startedRef.current) return;
        startedRef.current = true;

        const startTime = performance.now();
        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {display.toLocaleString()}{suffix}
        </span>
    );
}

/* ── Ticker Row ── */
const MARQUEE = [
    "UI DESIGN",
    "ENGINEERING",
    "AUTOMATION",
    "CLOUD ARCHITECTURE",
    "PERFORMANCE",
    "STRATEGY",
    "CRAFT",
    "PRECISION",
];

/* ── Expertise Items (numbered) ── */
const CAPABILITIES = [
    {
        num: "01",
        title: "Web Development",
        description:
            "Premium websites and web applications. Lightning-fast, scalable, and conversion-optimized.",
    },
    {
        num: "02",
        title: "Mobile Apps",
        description:
            "Cross-platform and native applications that feel effortless and perform flawlessly.",
    },
    {
        num: "03",
        title: "SaaS Platforms",
        description:
            "Subscription-ready products with multi-tenancy, billing systems, and admin infrastructure.",
    },
    {
        num: "04",
        title: "UI/UX Design",
        description:
            "Research-driven design systems and interfaces that set your brand apart.",
    },
    {
        num: "05",
        title: "AI & Automation",
        description:
            "Intelligent workflows, LLM integrations, and automation that eliminates overhead.",
    },
    {
        num: "06",
        title: "SEO Optimization",
        description:
            "Technical SEO and content strategy to ensure your brand dominates search results.",
    },
];

/* ── Stats data ── */
const STATS = [
    { value: 120, suffix: "+", label: "Projects Delivered" },
    { value: 45000, suffix: "", label: "Hours Automated" },
    { value: 12, suffix: "+", label: "Global Awards" },
    { value: 99, suffix: "%", label: "Client Retention" },
];

export default function Home() {
    return (
        <div className="bg-matteCarbon">
            {/* ═══════════ Hero Section ═══════════ */}
            <Hero3D />

            {/* ═══════════ Dual-Direction Ticker ═══════════ */}
            <div className="overflow-hidden py-10 border-y border-white/5 space-y-4">
                {/* Row 1: scrolls left */}
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...MARQUEE, ...MARQUEE].map((word, i) => (
                        <span
                            key={`l-${i}`}
                            className="mx-10 text-3xl md:text-5xl font-heading font-bold text-white/[0.06] tracking-tighter select-none"
                        >
                            {word}
                        </span>
                    ))}
                </div>
                {/* Row 2: scrolls right */}
                <div className="flex animate-marquee-reverse whitespace-nowrap">
                    {[...MARQUEE, ...MARQUEE].map((word, i) => (
                        <span
                            key={`r-${i}`}
                            className="mx-10 text-3xl md:text-5xl font-heading font-bold text-white/[0.04] tracking-tighter select-none"
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>

            {/* ═══════════ Core Expertise ═══════════ */}
            <section className="py-32 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-whiteChrome tracking-tight">
                            CORE{" "}
                            <span className="text-liquidSilver italic">EXPERTISE</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CAPABILITIES.map((cap, i) => (
                            <motion.div
                                key={cap.num}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ delay: i * 0.08 }}
                                className="group p-8 border border-white/5 bg-brushedAnthracite hover:bg-mercuryGlow transition-all duration-500"
                            >
                                <div className="text-sm font-heading font-bold text-liquidSilver/40 group-hover:text-matteCarbon/30 mb-6 tracking-widest transition-colors">
                                    {cap.num}
                                </div>
                                <h3 className="text-xl font-heading font-bold text-whiteChrome group-hover:text-matteCarbon mb-3 transition-colors">
                                    {cap.title}
                                </h3>
                                <p className="font-[var(--font-body)] text-ashGrey group-hover:text-matteCarbon/70 text-sm font-light leading-relaxed transition-colors">
                                    {cap.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ Stats — Dark bordered cards ═══════════ */}
            <section className="py-24 px-6 border-y border-white/5 bg-matteCarbon">
                <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center border border-white/[0.08] bg-brushedAnthracite p-8"
                        >
                            <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-whiteChrome mb-3">
                                <CountUp value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-ashGrey font-medium font-[var(--font-body)]">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════════ Selected Work — Infinite Scroll Marquee ═══════════ */}
            <section className="py-32 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-end"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-whiteChrome tracking-tight">
                            SELECTED{" "}
                            <span className="text-liquidSilver italic">WORK</span>
                        </h2>
                        <Link
                            href="/projects"
                            className="hidden md:inline-block text-sm font-bold uppercase tracking-widest text-liquidSilver hover:text-whiteChrome border-b border-liquidSilver pb-1 transition-all duration-200"
                        >
                            View All
                        </Link>
                    </motion.div>
                </div>

                {/* Infinite auto-scroll track — duplicated for seamless loop */}
                <div
                    className="flex gap-6"
                    style={{ animation: "projects-marquee 35s linear infinite" }}
                    onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
                    onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
                >
                    {[...PROJECTS, ...PROJECTS].map((project, i) => (
                        <div
                            key={`${project.id}-${i}`}
                            className="group relative flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[480px] aspect-[4/3] rounded-xl overflow-hidden bg-brushedAnthracite"
                        >
                            {/* Image (Full cover) */}
                            <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                draggable={false}
                                className="absolute inset-0 w-full h-full object-cover grayscale md:group-hover:grayscale-0 scale-100 md:group-hover:scale-105 transition-all duration-700"
                            />
                            {/* Dark overlay with blur always active on mobile, hover on desktop */}
                            <div className="absolute inset-0 bg-matteCarbon/50 md:bg-matteCarbon/40 md:group-hover:bg-matteCarbon/30 backdrop-blur-sm md:backdrop-blur-none md:group-hover:backdrop-blur-md transition-all duration-500" />

                            {/* Hover action buttons — centered  */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto pb-20">
                                {project.caseStudyUrl && (
                                    <a
                                        href={project.caseStudyUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-6 py-2.5 rounded-full border border-white/70 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-matteCarbon transition-all duration-200 backdrop-blur-sm bg-black/20"
                                    >
                                        View Case Study
                                    </a>
                                )}
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-6 py-2.5 rounded-full border border-white/70 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-matteCarbon transition-all duration-200 backdrop-blur-sm bg-black/20"
                                    >
                                        View Repo
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-6 py-2.5 rounded-full border border-white/70 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-matteCarbon transition-all duration-200 backdrop-blur-sm bg-black/20"
                                    >
                                        Live Preview
                                    </a>
                                )}
                            </div>

                            {/* Card footer - absolute bottom, slide up on hover on desktop */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pt-12 bg-gradient-to-t from-matteCarbon/95 to-transparent translate-y-0 md:translate-y-8 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-out z-10 pointer-events-none">
                                <div className="text-xs text-liquidSilver/80 font-[var(--font-body)] mb-2 tracking-widest uppercase">{project.year}</div>
                                <h3 className="text-xl md:text-2xl font-heading font-bold text-whiteChrome mb-1 tracking-tight">{project.title}</h3>
                                {project.subtitle && (
                                    <p className="text-xs md:text-sm font-[var(--font-body)] text-ashGrey tracking-wide">{project.subtitle}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link
                        href="/projects"
                        className="text-sm font-bold uppercase tracking-widest text-liquidSilver hover:text-whiteChrome border-b border-liquidSilver pb-1 transition-all duration-200"
                    >
                        View All Projects
                    </Link>
                </div>
            </section>


        </div>
    );
}
