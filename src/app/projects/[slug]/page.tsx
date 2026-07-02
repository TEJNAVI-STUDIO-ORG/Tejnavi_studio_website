import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tejnavistudio.vercel.app";

export const revalidate = 0;
export const dynamic = "force-dynamic";

async function getProject(slug: string) {
    try {
        const [project] = await db
            .select()
            .from(projects)
            .where(and(eq(projects.slug, slug), eq(projects.isPublished, true)))
            .limit(1);
        return project ?? null;
    } catch (error) {
        console.error("[project detail] db lookup failed:", error);
        return null;
    }
}

/* ══════════════════════════════════════════════════════════════════
   SEO METADATA — server-side, so Google sees the real title/description
   ══════════════════════════════════════════════════════════════════ */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        return { title: "Project not found", robots: { index: false, follow: false } };
    }

    const title = `${project.title} — ${project.category} Case Study`;
    const description =
        project.description ||
        project.subtitle ||
        `Case study: ${project.title} — a ${project.category} project built with ${project.tech} by Tejnavi Studio.`;
    const url = `${SITE_URL}/projects/${project.slug}`;
    const image = project.imageUrl || `${SITE_URL}/banner.png`;

    // Compose keywords from category + tech stack
    const keywords = [
        project.category,
        ...(project.tech || "").split(",").map((t) => t.trim()),
        "case study",
        "portfolio",
        "Tejnavi Studio",
    ].filter(Boolean);

    return {
        title,
        description,
        keywords,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            title,
            description,
            images: [{ url: image, width: 1200, height: 630, alt: project.title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

/* ══════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════ */
export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) notFound();

    const url = `${SITE_URL}/projects/${project.slug}`;
    const image = project.imageUrl || `${SITE_URL}/banner.png`;

    // JSON-LD — CreativeWork tells Google this is a portfolio piece.
    // Adding BreadcrumbList helps Google render a nicer SERP snippet.
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            headline: project.title,
            description: project.description || project.subtitle || undefined,
            image,
            url,
            keywords: [project.category, ...(project.tech || "").split(",").map((t) => t.trim())].join(", "),
            dateCreated: project.createdAt ? new Date(project.createdAt).toISOString() : undefined,
            dateModified: project.updatedAt ? new Date(project.updatedAt).toISOString() : undefined,
            creator: {
                "@type": "Organization",
                name: "Tejnavi Studio",
                url: SITE_URL,
            },
            about: project.category,
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
                { "@type": "ListItem", position: 3, name: project.title, item: url },
            ],
        },
    ];

    const techList = (project.tech || "").split(",").map((t) => t.trim()).filter(Boolean);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen bg-matteCarbon text-whiteChrome">

                {/* Back link */}
                <div className="max-w-5xl mx-auto px-6 pt-32">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-ashGrey text-sm hover:text-whiteChrome transition-colors mb-10"
                    >
                        <ArrowLeft size={14} />
                        Back to Work
                    </Link>
                </div>

                {/* Hero */}
                <section className="max-w-5xl mx-auto px-6 pb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6 text-xs uppercase tracking-widest text-ashGrey">
                        <span className="border border-white/10 px-3 py-1">{project.category}</span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {project.year}
                        </span>
                        {project.isFeatured && (
                            <span className="bg-whiteChrome/10 text-whiteChrome px-3 py-1">Featured</span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-6">
                        {project.title}
                    </h1>

                    {project.subtitle && (
                        <p className="text-ashGrey text-xl leading-relaxed max-w-3xl mb-8">
                            {project.subtitle}
                        </p>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-whiteChrome text-matteCarbon px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-liquidSilver transition-colors"
                            >
                                <ExternalLink size={14} />
                                View Live
                            </a>
                        )}
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 border border-white/20 text-whiteChrome px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-white/40 transition-colors"
                            >
                                <Github size={14} />
                                Source
                            </a>
                        )}
                        {project.caseStudyUrl && (
                            <a
                                href={project.caseStudyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 border border-white/20 text-whiteChrome px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-white/40 transition-colors"
                            >
                                <ExternalLink size={14} />
                                External Case Study
                            </a>
                        )}
                    </div>
                </section>

                {/* Hero image */}
                {project.imageUrl && (
                    <section className="max-w-6xl mx-auto px-6 mb-16">
                        <div className="w-full aspect-[16/9] overflow-hidden bg-brushedAnthracite">
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </section>
                )}

                {/* Overview + tech */}
                <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-xs uppercase tracking-widest text-ashGrey mb-4 border-b border-white/10 pb-3">
                            Overview
                        </h2>
                        {project.description ? (
                            <div className="text-ashGrey text-base leading-relaxed whitespace-pre-wrap">
                                {project.description}
                            </div>
                        ) : (
                            <p className="text-ashGrey/60 italic">Description coming soon.</p>
                        )}
                    </div>

                    <aside className="space-y-8">
                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-ashGrey mb-3 border-b border-white/10 pb-3">
                                Category
                            </h3>
                            <p className="text-whiteChrome text-sm">{project.category}</p>
                        </div>

                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-ashGrey mb-3 border-b border-white/10 pb-3">
                                Year
                            </h3>
                            <p className="text-whiteChrome text-sm">{project.year}</p>
                        </div>

                        {techList.length > 0 && (
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-ashGrey mb-3 border-b border-white/10 pb-3">
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {techList.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs text-ashGrey border border-white/10 px-3 py-1 flex items-center gap-1"
                                        >
                                            <Tag size={10} />
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </section>

                {/* CTA Footer */}
                <section className="border-t border-white/10 bg-brushedAnthracite">
                    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-whiteChrome mb-4">
                            Have a similar project in mind?
                        </h2>
                        <p className="text-ashGrey mb-8">
                            Let&apos;s build something great together.
                        </p>
                        <Link
                            href="/quote"
                            className="inline-flex items-center gap-2 bg-whiteChrome text-matteCarbon px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-liquidSilver transition-colors"
                        >
                            Start a Project
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
