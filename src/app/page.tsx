"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { FEATURED_PROJECTS } from "@/data/projects";

const Hero3D = dynamic(
    () => import("@/components/home/Hero3D").then((mod) => mod.Hero3D),
    { ssr: false }
);

/* ── Count-Up Number Component ── */
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const displayValue = isInView ? value : 0;

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3 }}
            >
                {isInView ? (
                    <AnimatedNumber value={displayValue} />
                ) : (
                    "0"
                )}
                {suffix}
            </motion.span>
        </motion.span>
    );
}

function AnimatedNumber({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
        >
            {value.toLocaleString()}
        </motion.span>
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

            {/* ═══════════ Selected Work — Bento Grid ═══════════ */}
            <section className="py-32 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-end mb-16"
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

                    {/* Asymmetric bento grid: 1 large + 2 smaller */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {FEATURED_PROJECTS.slice(0, 4).map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`group relative overflow-hidden bg-brushedAnthracite ${i === 0 ? "md:row-span-2" : ""
                                    }`}
                            >
                                <div
                                    className={`relative overflow-hidden ${i === 0 ? "aspect-[3/4]" : "aspect-[4/3]"
                                        }`}
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-matteCarbon/50 group-hover:bg-matteCarbon/20 transition-colors duration-500" />

                                    {/* Hover detail slide-up */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-matteCarbon/90 to-transparent">
                                        <p className="font-[var(--font-body)] text-ashGrey text-sm font-light">
                                            {project.tech}
                                        </p>
                                    </div>
                                </div>

                                {/* Title overlay visible always */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:translate-y-[-40px] transition-transform duration-500">
                                    <h3 className="text-xl md:text-2xl font-heading font-bold text-whiteChrome">
                                        {project.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 md:hidden">
                        <Link
                            href="/projects"
                            className="text-sm font-bold uppercase tracking-widest text-liquidSilver hover:text-whiteChrome border-b border-liquidSilver pb-1 transition-all duration-200"
                        >
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════ CTA Section with grain texture ═══════════ */}
            <section className="relative py-32 px-6 border-t border-white/5 overflow-hidden">
                {/* Grain/noise texture overlay */}
                <div className="noise-overlay absolute inset-0 pointer-events-none" />

                <div className="max-w-[1400px] mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-whiteChrome mb-8 tracking-tight">
                            READY TO BUILD{" "}
                            <span className="text-liquidSilver italic">BEYOND</span>?
                        </h2>
                        <p className="font-[var(--font-body)] text-xl text-ashGrey mb-12 font-light max-w-2xl mx-auto">
                            Every great product starts with a conversation.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-whiteChrome text-matteCarbon px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-liquidSilver transition-all duration-500 transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                        >
                            Start the Conversation
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
