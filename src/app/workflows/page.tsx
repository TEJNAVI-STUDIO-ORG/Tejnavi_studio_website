"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { WORKFLOWS } from "@/data/workflows";

export default function WorkflowsIndex() {
    return (
        <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mb-24"
                >
                    <div className="flex items-center gap-6">
                        <Link href="/services" className="text-sm font-bold uppercase tracking-widest text-liquidSilver/70 hover:text-liquidSilver border-b border-liquidSilver/30 hover:border-liquidSilver pb-1 transition-colors">
                            Expertise
                        </Link>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-whiteChrome mb-6 mt-10">
                        BUILD <span className="text-liquidSilver italic">WORKFLOWS</span>
                    </h1>
                    <p className="text-xl text-ashGrey font-light leading-relaxed">
                        Select an expertise to view its exact delivery workflow.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {WORKFLOWS.map((workflow, i) => (
                        <motion.div
                            key={workflow.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link href={`/workflows/${workflow.slug}`} className="block group bg-brushedAnthracite border border-white/5 p-8 md:p-12 hover:bg-mercuryGlow transition-colors duration-500">
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-whiteChrome group-hover:text-matteCarbon mb-4">
                                    {workflow.title}
                                </h2>
                                <p className="text-liquidSilver group-hover:text-matteCarbon/80 text-lg font-light">
                                    {workflow.summary}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
