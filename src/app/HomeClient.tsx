"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ── Types ── */
interface FeaturedProject {
    id: number;
    title: string;
    slug: string;
    category: string;
    subtitle: string | null;
    imageUrl: string;
    year: string;
    liveUrl: string | null;
}

/* ── Reveal wrapper ── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ── Stagger wrappers ── */
function StaggerParent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function StaggerChild({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ── Data ── */
const MARQUEE_ITEMS = ["UI DESIGN", "ENGINEERING", "DATA ARCHITECTURE", "WEB3", "STRATEGY"];

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function HomeClient({ projects }: { projects: FeaturedProject[] }) {
    return (
        <main className="relative z-10">
            <HeroSection />
            <MarqueeSection />
            <CapabilitiesSection />
            <WorkSection projects={projects} />
            <CTASection />
        </main>
    );
}

/* ────────────────────────────────────────────────
   HERO
   ──────────────────────────────────────────────── */
function HeroSection() {
    return (
        <section className="min-h-[85vh] md:min-h-[90vh] relative flex items-center pt-24 pb-16 px-4 md:px-10 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,#353534,#080808_60%,#080808)]" />

            <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
                {/* Left Content */}
                <div className="col-span-1 md:col-span-7 flex flex-col justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="font-[var(--font-display)] text-[36px] md:text-[64px] font-extrabold uppercase tracking-[-0.04em] leading-[1.1] mb-6"
                    >
                        <span className="block">WE CRAFT</span>
                        <span className="block text-whiteChrome">DIGITAL</span>
                        <span className="block text-accentLime" style={{ textShadow: "0 0 40px rgba(200, 245, 90, 0.3)" }}>
                            LEGENDS
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[#c4c9b1] text-[15px] md:text-[16px] font-light leading-[1.6] max-w-lg mb-8"
                    >
                        High-performance digital experiences blending brutalist structure
                        with premium editorial refinement. Built for the avant-garde.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link
                            href="/quote"
                            className="magnetic-btn inline-flex items-center gap-2 bg-accentLime text-[#080808] font-bold uppercase text-[11px] tracking-[0.1em] px-7 py-3.5 rounded-sm hover-glow transition-all duration-300"
                        >
                            Start a Project
                            <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                </div>

                {/* Right Cards — desktop only */}
                <div className="hidden md:flex col-span-5 relative h-full min-h-[400px] items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="absolute right-0 top-1/4 noir-outline bg-[#131313] p-5 rounded-sm shadow-xl w-56 z-20 backdrop-blur-sm animate-float"
                    >
                        <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
                            <span className="font-[var(--font-display)] text-[13px] text-accentLime uppercase font-bold">Analytics</span>
                            <svg className="w-4 h-4 text-accentLime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div className="text-[32px] font-[var(--font-display)] font-extrabold text-whiteChrome leading-[1.2]">+340%</div>
                        <div className="text-[11px] text-[#c4c9b1] mt-1 uppercase tracking-[0.1em] font-medium">Performance Boost</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="absolute right-24 top-1/2 noir-outline bg-[#1c1b1b] p-5 rounded-sm shadow-2xl w-60 z-30 hover-glow transition-all"
                        style={{ animation: "float 6s ease-in-out 2s infinite" }}
                    >
                        <div className="w-full h-24 bg-[#080808] rounded-sm border border-white/10 mb-3 overflow-hidden relative">
                            <div className="absolute inset-0 bg-accentLime/5 bg-[radial-gradient(rgba(197,242,88,0.08)_1px,transparent_1px)] [background-size:8px_8px]" />
                        </div>
                        <h3 className="font-[var(--font-display)] text-[18px] font-bold text-whiteChrome mb-1">UI Engine</h3>
                        <p className="text-[11px] text-[#c4c9b1] tracking-[0.1em] font-medium">Precision engineered components.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="absolute right-6 bottom-4 noir-outline bg-[#131313] p-3 rounded-sm shadow-lg w-40 z-10 opacity-80 animate-float"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-accentLime flex items-center justify-center text-[#080808]">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-[var(--font-display)] text-[13px] font-bold text-whiteChrome">Deployed</div>
                                <div className="text-[11px] text-accentLime font-medium tracking-[0.1em]">0.4s</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ────────────────────────────────────────────────
   MARQUEE
   ──────────────────────────────────────────────── */
function MarqueeSection() {
    const items = Array(6).fill(MARQUEE_ITEMS).flat();

    return (
        <section className="py-6 bg-[#1c1b1b] border-y border-white/10 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#1c1b1b] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#1c1b1b] to-transparent z-10" />

            <div
                className="flex whitespace-nowrap items-center gap-6"
                style={{ animation: "marquee 20s linear infinite" }}
            >
                {items.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-6">
                        <span className="font-[var(--font-display)] text-[18px] md:text-[20px] tracking-widest uppercase text-[#bdc6df] whitespace-nowrap font-bold">
                            {item}
                        </span>
                        <span className="text-accentLime text-[10px]">◆</span>
                    </span>
                ))}
            </div>
        </section>
    );
}

/* ────────────────────────────────────────────────
   CAPABILITIES — SEO-optimized content
   ──────────────────────────────────────────────── */
function CapabilitiesSection() {
    const cards = [
        {
            num: "01",
            title: "Custom Web Development",
            desc: "We build fast, scalable web applications using React, Next.js, and modern frameworks — optimized for performance, SEO, and conversion.",
            icon: "code",
            span: "md:col-span-5",
            mt: "",
        },
        {
            num: "02",
            title: "Mobile App Development",
            desc: "Native and cross-platform mobile apps for iOS & Android with fluid animations, offline-first architecture, and seamless UX.",
            icon: "smartphone",
            span: "md:col-span-7",
            mt: "md:mt-16",
        },
        {
            num: "03",
            title: "SaaS Product Design",
            desc: "End-to-end SaaS development — from MVP prototyping to enterprise dashboards with robust backend infrastructure and intuitive interfaces.",
            icon: "cloud",
            span: "md:col-span-4",
            mt: "",
        },
        {
            num: "04",
            title: "Brand & UI/UX Design",
            desc: "Strategic design systems, visual identity, and micro-interactions that elevate your brand perception and drive user engagement.",
            icon: "design_services",
            span: "md:col-span-8",
            mt: "",
        },
    ];

    return (
        <section className="py-[clamp(60px,8vw,120px)] px-4 md:px-10 bg-[#080808]">
            <div className="max-w-[1200px] mx-auto">
                <Reveal className="mb-12">
                    <h2 className="font-[var(--font-display)] text-[28px] md:text-[48px] font-extrabold uppercase tracking-[-0.03em] leading-[1.2]">
                        <span className="text-[#c4c9b1]">Core</span>{" "}
                        <span className="text-whiteChrome">Capabilities</span>
                    </h2>
                    <p className="text-[14px] md:text-[15px] text-[#c4c9b1] mt-4 max-w-xl leading-[1.6]">
                        From concept to deployment — we deliver full-stack digital solutions that perform at scale and look exceptional doing it.
                    </p>
                </Reveal>

                <StaggerParent className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
                    {cards.map((card) => (
                        <StaggerChild key={card.num} className={`col-span-1 ${card.span} ${card.mt}`}>
                            <div className="group noir-outline bg-[#131313] p-6 rounded-sm hover:bg-[#1a1a1a] transition-colors duration-300 relative overflow-hidden">
                                <div className="absolute top-3 right-4 font-[var(--font-display)] text-[80px] text-white/[0.03] font-extrabold select-none leading-none pointer-events-none">
                                    {card.num}
                                </div>
                                <div className="relative z-10">
                                    <span className="material-symbols-outlined text-[26px] text-accentLime mb-4 block group-hover:scale-110 transition-transform origin-left">
                                        {card.icon}
                                    </span>
                                    <h3 className="font-[var(--font-display)] text-[18px] md:text-[20px] font-bold text-whiteChrome mb-3 uppercase leading-[1.3]">
                                        {card.title}
                                    </h3>
                                    <p className="text-[13px] md:text-[14px] text-[#c4c9b1] leading-[1.7]">
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        </StaggerChild>
                    ))}
                </StaggerParent>
            </div>
        </section>
    );
}

/* ────────────────────────────────────────────────
   SELECTED WORK — dynamic projects
   ──────────────────────────────────────────────── */
function WorkSection({ projects }: { projects: FeaturedProject[] }) {
    if (!projects.length) return null;

    return (
        <section className="py-[clamp(60px,8vw,120px)] px-4 md:px-10 bg-[#080808]">
            <div className="max-w-[1200px] mx-auto">
                <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <h2 className="font-[var(--font-display)] text-[28px] md:text-[48px] font-extrabold uppercase tracking-[-0.03em] leading-[1.1] text-whiteChrome">
                        Selected <br className="hidden md:block" /> <span className="text-[#c4c9b1]">Work</span>
                    </h2>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-whiteChrome hover:text-accentLime transition-colors uppercase text-[11px] tracking-widest font-medium border-b border-whiteChrome hover:border-accentLime pb-1"
                    >
                        View Archive <ArrowUpRight size={14} />
                    </Link>
                </Reveal>

                <StaggerParent className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
                    {projects.slice(0, 4).map((project, i) => {
                        const isWide = i === 0 || i === 2;
                        const hasOffset = i === 1 || i === 3;

                        return (
                            <StaggerChild
                                key={project.id}
                                className={`col-span-1 ${isWide ? "md:col-span-8" : "md:col-span-4"} ${hasOffset ? "md:mt-16" : ""}`}
                            >
                                <Link href={`/projects/${project.slug}`} className="group cursor-pointer block">
                                    <div className={`noir-outline overflow-hidden rounded-sm bg-[#131313] ${isWide ? "aspect-[16/10]" : "aspect-[4/5]"} relative`}>
                                        <div className="absolute inset-0 bg-[#353534] mix-blend-multiply opacity-50 z-10 transition-opacity group-hover:opacity-20" />
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            sizes={isWide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                                            priority={i < 2}
                                            className="object-cover transform transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                                            <span className="bg-accentLime text-[#080808] font-bold uppercase text-[11px] tracking-[0.1em] px-5 py-2.5 rounded-sm hover:bg-white transition-colors">
                                                Case Study
                                            </span>
                                            {project.liveUrl && (
                                                <span
                                                    className="bg-transparent border border-white text-white font-bold uppercase text-[11px] tracking-[0.1em] px-5 py-2.5 rounded-sm hover:bg-white/10 transition-colors backdrop-blur-sm"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        window.open(project.liveUrl!, "_blank");
                                                    }}
                                                >
                                                    Live Site
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-3 flex justify-between items-start">
                                        <div>
                                            <h3 className="font-[var(--font-display)] text-[16px] md:text-[18px] font-bold text-whiteChrome uppercase leading-[1.3]">
                                                {project.title}
                                            </h3>
                                            <p className="text-[11px] text-[#c4c9b1] mt-0.5 tracking-[0.1em] font-medium">
                                                {project.category}{project.subtitle ? ` / ${project.subtitle}` : ""}
                                            </p>
                                        </div>
                                        <span className="bg-[#2a2a2a] px-2.5 py-1 rounded-sm text-[11px] text-[#c4c9b1] uppercase noir-outline tracking-[0.1em]">
                                            {project.year}
                                        </span>
                                    </div>
                                </Link>
                            </StaggerChild>
                        );
                    })}
                </StaggerParent>
            </div>
        </section>
    );
}

/* ────────────────────────────────────────────────
   CTA
   ──────────────────────────────────────────────── */
function CTASection() {
    return (
        <section className="py-[clamp(60px,8vw,120px)] px-4 md:px-10 relative overflow-hidden flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#c5f258_1px,transparent_1px)] [background-size:24px_24px]" />

            <Reveal className="relative z-10 max-w-2xl mx-auto">
                <h2 className="font-[var(--font-display)] text-[32px] md:text-[56px] font-extrabold uppercase tracking-[-0.03em] leading-[1.1] text-whiteChrome mb-5">
                    Ready to Build Something{" "}
                    <span className="text-accentLime italic font-light">Legendary?</span>
                </h2>
                <p className="text-[14px] md:text-[16px] text-[#c4c9b1] font-light leading-[1.6] mb-10">
                    Let&apos;s discuss architecture, design systems, and pushing the
                    boundaries of the digital web.
                </p>
                <a
                    href="mailto:tejnavi.studio@gmail.com"
                    className="magnetic-btn inline-flex bg-accentLime text-[#080808] font-bold uppercase font-[var(--font-body)] text-[18px] md:text-[20px] px-10 py-5 rounded-sm hover-glow transition-all duration-300 shadow-[0_0_20px_rgba(197,242,88,0.2)]"
                >
                    tejnavi.studio@gmail.com
                </a>
            </Reveal>
        </section>
    );
}
