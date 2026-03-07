"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/lib/db/schema";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
    const [activeCategory, setActiveCategory] = useState("All");

    // Get unique categories from the actual DB projects, plus "All"
    const dbCategories = Array.from(new Set(initialProjects.map(p => p.category).filter(Boolean))) as string[];
    const categories = ["All", ...dbCategories];

    const filteredProjects = activeCategory === "All"
        ? initialProjects
        : initialProjects.filter((p) => p.category === activeCategory);

    return (
        <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-whiteChrome mb-6">
                        SELECTED <span className="text-liquidSilver italic">WORK</span>
                    </h1>

                    <div className="flex flex-wrap gap-4 mt-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase font-bold transition-all duration-300 ${activeCategory === category
                                        ? "bg-whiteChrome text-matteCarbon"
                                        : "bg-transparent text-liquidSilver border border-white/10 hover:border-white/30"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {initialProjects.length === 0 ? (
                    <div className="text-center py-32 border border-white/5 bg-brushedAnthracite">
                        <p className="text-ashGrey text-lg mb-2">No projects yet</p>
                        <p className="text-ashGrey/60 text-sm">Portfolio coming soon...</p>
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    className={`group ${i % 2 !== 0 ? "md:mt-24" : ""}`}
                                >
                                    <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-brushedAnthracite grayscale group-hover:grayscale-0 transition-all duration-1000">
                                        {project.imageUrl && (
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-matteCarbon/40 group-hover:bg-matteCarbon/10 transition-colors duration-500"></div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-matteCarbon/40 backdrop-blur-sm z-10">
                                            {project.caseStudyUrl ? (
                                                <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="text-whiteChrome font-bold uppercase tracking-widest border border-whiteChrome px-6 py-3 rounded-full hover:bg-whiteChrome hover:text-matteCarbon transition-colors">
                                                    View Case Study
                                                </a>
                                            ) : project.liveUrl ? (
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-whiteChrome font-bold uppercase tracking-widest border border-whiteChrome px-6 py-3 rounded-full hover:bg-whiteChrome hover:text-matteCarbon transition-colors">
                                                    Live Preview
                                                </a>
                                            ) : project.repoUrl ? (
                                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-whiteChrome font-bold uppercase tracking-widest border border-whiteChrome px-6 py-3 rounded-full hover:bg-whiteChrome hover:text-matteCarbon transition-colors">
                                                    View Code
                                                </a>
                                            ) : (
                                                <span className="text-whiteChrome font-bold uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full">
                                                    Coming Soon
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start mt-4">
                                        <div>
                                            <h3 className="text-2xl font-heading font-bold text-whiteChrome mb-1">{project.title}</h3>
                                            <p className="text-ashGrey text-sm">{project.tech}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-xs uppercase tracking-widest text-liquidSilver font-bold mb-1">{project.category}</span>
                                            <span className="text-ashGrey text-sm">{new Date(project.createdAt).getFullYear()}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
