"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImageUrl?: string;
    category?: string;
    tags?: string[];
    readTimeMinutes?: number;
    publishedAt?: string;
    authorName?: string;
    authorAvatar?: string;
}

export default function BlogPostPage() {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetch(`/api/blog/${slug}`)
                .then((r) => (r.ok ? r.json() : null))
                .then(setPost)
                .finally(() => setLoading(false));
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
                <div className="max-w-3xl mx-auto animate-pulse space-y-6">
                    <div className="h-8 bg-gunmetal w-3/4" />
                    <div className="h-4 bg-gunmetal w-1/2" />
                    <div className="aspect-[16/9] bg-gunmetal" />
                    <div className="space-y-3">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-3 bg-gunmetal" style={{ width: `${70 + Math.random() * 30}%` }} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6 text-center">
                <h1 className="text-3xl font-heading font-bold text-whiteChrome mb-4">Post Not Found</h1>
                <Link href="/blog" className="text-liquidSilver hover:text-whiteChrome transition-colors">← Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
            <article className="max-w-3xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link href="/blog" className="flex items-center gap-2 text-ashGrey hover:text-whiteChrome text-sm mb-8 transition-colors">
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>

                    {post.category && (
                        <span className="text-xs uppercase tracking-widest text-liquidSilver mb-4 block">
                            {post.category}
                        </span>
                    )}

                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-whiteChrome tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-ashGrey mb-8">
                        {post.authorName && (
                            <span className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gunmetal rounded-full flex items-center justify-center text-xs text-whiteChrome font-bold">
                                    {post.authorName.charAt(0)}
                                </div>
                                {post.authorName}
                            </span>
                        )}
                        {post.publishedAt && (
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTimeMinutes || 5} min read
                        </span>
                    </div>

                    {post.coverImageUrl && (
                        <div className="aspect-[16/9] overflow-hidden mb-12">
                            <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Render markdown content as HTML-safe text */}
                    <div className="prose prose-invert prose-lg max-w-none font-[var(--font-body)] text-chromeSilver leading-relaxed space-y-6">
                        {post.content.split("\n").map((line, i) => {
                            if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-heading font-bold text-whiteChrome mt-10 mb-4">{line.slice(3)}</h2>;
                            if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-heading font-bold text-whiteChrome mt-8 mb-3">{line.slice(4)}</h3>;
                            if (line.startsWith("- ")) return <li key={i} className="ml-6 list-disc">{line.slice(2)}</li>;
                            if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold text-whiteChrome">{line.slice(2, -2)}</p>;
                            if (line.trim() === "") return <br key={i} />;
                            return <p key={i}>{line}</p>;
                        })}
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="text-xs px-3 py-1 border border-white/10 text-ashGrey uppercase tracking-widest">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </article>
        </div>
    );
}
