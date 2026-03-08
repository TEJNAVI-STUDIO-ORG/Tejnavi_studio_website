"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PROJECTS } from "@/data/projects";

const CATEGORIES = ["All", "Web", "App", "SaaS", "E-commerce", "CRM", "SEO"];

/* ── Pinterest-style masonry: 3 columns, each project gets a varied height ── */
const HEIGHTS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[2/3]"];

export default function Portfolio() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeCategory);

    return (
        <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-whiteChrome mb-6">
                        SELECTED <span className="text-liquidSilver italic">WORK</span>
                    </h1>

                    <div className="flex flex-wrap gap-3 mt-12">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-1.5 rounded-full text-xs tracking-widest uppercase font-bold transition-all duration-300 ${activeCategory === category
                                    ? 'bg-whiteChrome text-matteCarbon'
                                    : 'bg-transparent text-liquidSilver border border-white/10 hover:border-white/30'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Pinterest/masonry 3-column grid */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        layout
                        className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-0"
                    >
                        {filteredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="group break-inside-avoid mb-4 relative overflow-hidden bg-brushedAnthracite rounded-lg"
                            >
                                {/* Image with varied aspect ratios for Pinterest look */}
                                <div className={`relative ${HEIGHTS[i % HEIGHTS.length]} overflow-hidden`}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-matteCarbon/40 group-hover:bg-matteCarbon/10 transition-colors duration-500" />

                                    {/* Hover overlay with action buttons */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 backdrop-blur-[2px] bg-matteCarbon/30">
                                        {project.caseStudyUrl && (
                                            <a
                                                href={project.caseStudyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-5 py-2 rounded-full border border-white/70 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-matteCarbon transition-all duration-200 bg-black/20"
                                            >
                                                View Case Study
                                            </a>
                                        )}
                                        {project.repoUrl && (
                                            <a
                                                href={project.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-5 py-2 rounded-full border border-white/70 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-matteCarbon transition-all duration-200 bg-black/20"
                                            >
                                                View Repo
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-5 py-2 rounded-full border border-white/70 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-matteCarbon transition-all duration-200 bg-black/20"
                                            >
                                                Live Preview
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Card footer */}
                                <div className="px-4 py-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-base font-heading font-bold text-whiteChrome mb-0.5">{project.title}</h3>
                                            <p className="text-ashGrey text-xs">{project.tech}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0 ml-3">
                                            <span className="block text-[10px] uppercase tracking-widest text-liquidSilver font-bold mb-0.5">{project.category}</span>
                                            <span className="text-ashGrey text-xs">{project.year}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
