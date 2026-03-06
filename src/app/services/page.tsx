"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SERVICES = [
    {
        id: "01",
        slug: "website-development",
        title: "Website Development",
        description: "Modern websites from landing pages to multi-page experiences. Fast, responsive, and optimized for conversion.",
        features: ["Landing Pages", "Corporate Sites", "Portfolio Sites", "Content-Managed Websites"]
    },
    {
        id: "02",
        slug: "shopify-website",
        title: "Shopify Website Development",
        description: "E-commerce stores on Shopify. Custom themes, apps, and integrations to maximize sales and streamline operations.",
        features: ["Custom Themes", "Payment & Shipping", "Product Management", "Analytics & Marketing"]
    },
    {
        id: "03",
        slug: "web-apps",
        title: "Web Application Development",
        description: "High-performance, scalable web applications built with React, Next.js, and Node.js. Speed, security, and seamless UX.",
        features: ["Custom Dashboards", "Progressive Web Apps", "Real-time Features", "API-First Design"]
    },
    {
        id: "04",
        slug: "saas-apps",
        title: "SaaS App Development",
        description: "Subscription-based software as a service. Multi-tenant architecture, billing, and scalable infrastructure.",
        features: ["Subscription Billing", "Admin Panels", "User Management", "Analytics & Reporting"]
    },
    {
        id: "05",
        slug: "crm",
        title: "Custom CRM Solutions",
        description: "Tailored CRM systems for sales, marketing, and customer success. Pipelines, automation, and integrations.",
        features: ["Sales Pipelines", "Contact & Deal Management", "Automation & Workflows", "Reporting & Dashboards"]
    },
    {
        id: "06",
        slug: "mobile-apps",
        title: "Mobile App Development",
        description: "Native and cross-platform mobile apps for iOS and Android. React Native and Flutter for fast, maintainable builds.",
        features: ["iOS & Android", "API Integration", "Push Notifications", "App Store Deployment"]
    },
    {
        id: "07",
        slug: "desktop-apps",
        title: "Desktop Application Development",
        description: "Cross-platform desktop applications for Windows and macOS. Electron or native tooling for robust, installable apps.",
        features: ["Windows & macOS", "Offline Support", "Auto-Updates", "System Integration"]
    },
    {
        id: "08",
        slug: "spotify-type-apps",
        title: "Music & Streaming App Development",
        description: "Music, podcast, and media streaming applications. Playback, discovery, and engagement features.",
        features: ["Streaming Architecture", "Playlists & Discovery", "Offline Playback", "Social Features"]
    },
    {
        id: "09",
        slug: "ui-ux",
        title: "UI/UX Experience Design",
        description: "User research, wireframing, and premium visual design. We engineer how your product feels and performs.",
        features: ["User Research", "Wireframing", "Interactive Prototypes", "Design Systems"]
    },
    {
        id: "10",
        slug: "automation-ai",
        title: "Intelligent Automation & AI",
        description: "AI models and workflow automation to reduce overhead and increase efficiency.",
        features: ["OpenAI Integration", "Workflow Automation", "Custom LLM Solutions", "Data Pipelines"]
    },
    {
        id: "11",
        slug: "brand-identity",
        title: "Brand & Visual Identity",
        description: "Cohesive brand systems across web, mobile, and print. Logo, guidelines, and design systems.",
        features: ["Logo & Wordmark", "Brand Guidelines", "Design Systems", "Marketing Assets"]
    },
    {
        id: "12",
        slug: "devops-cloud",
        title: "DevOps & Cloud Architecture",
        description: "Reliable infrastructure so your product stays fast and available. AWS, GCP, Azure, and CI/CD.",
        features: ["Cloud Architecture", "CI/CD Pipelines", "Monitoring", "Performance Optimization"]
    },
    {
        id: "13",
        slug: "data-engineering",
        title: "Data Engineering",
        description: "Scalable data pipelines and analytics infrastructure. Warehousing, lakes, and BI.",
        features: ["Data Pipelines", "Data Warehousing", "Data Lakes", "Analytics & BI"]
    },
    {
        id: "14",
        slug: "seo",
        title: "SEO Optimization",
        description: "Technical SEO and content strategy to improve search visibility and organic traffic.",
        features: ["Technical SEO", "Keyword Strategy", "Content Optimization", "Analytics & Reporting"]
    }
];

export default function Services() {
    return (
        <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mb-24"
                >
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-whiteChrome mb-6">
                        OUR <span className="text-liquidSilver italic">EXPERTISE</span>
                    </h1>
                    <p className="text-xl text-ashGrey font-light leading-relaxed">
                        We provide end-to-end digital product engineering. From the initial concept to the final deployment, our team ensures world-class quality at every step.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {SERVICES.map((service, i) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.05 }}
                            className="group bg-brushedAnthracite border border-white/5 p-8 md:p-12 hover:bg-mercuryGlow transition-colors duration-500"
                        >
                            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                                <div className="md:w-1/3">
                                    <div className="text-liquidSilver font-heading font-bold text-xl mb-4 group-hover:text-matteCarbon transition-colors">
                                        {service.id}
                                    </div>
                                    <h2 className="text-3xl font-heading font-bold text-whiteChrome group-hover:text-matteCarbon transition-colors mb-4">
                                        {service.title}
                                    </h2>
                                </div>

                                <div className="md:w-2/3 flex flex-col justify-between">
                                    <p className="text-liquidSilver group-hover:text-matteCarbon/80 transition-colors text-lg mb-8 font-light">
                                        {service.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {service.features.map(feature => (
                                            <div key={feature} className="flex items-center text-sm text-ashGrey group-hover:text-matteCarbon/60 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-liquidSilver group-hover:bg-matteCarbon mr-3"></span>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-6">
                                        <Link href={`/workflows/${service.slug}`} className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-whiteChrome group-hover:text-matteCarbon border-b border-whiteChrome/20 group-hover:border-matteCarbon/20 pb-1 transition-colors">
                                            View Workflow
                                        </Link>
                                        <Link href="/quote" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-liquidSilver group-hover:text-matteCarbon border-b border-liquidSilver/20 group-hover:border-matteCarbon/20 pb-1 transition-colors">
                                            Discuss Project
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
