"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    coverImageUrl?: string;
    category?: string;
    tags?: string[];
    readTimeMinutes?: number;
    publishedAt?: string;
    authorName?: string;
    authorAvatar?: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blog")
            .then((r) => r.json())
            .then(setPosts)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-whiteChrome tracking-tight mb-4">
                        INSIGHTS
                    </h1>
                    <p className="font-[var(--font-body)] text-ashGrey text-lg font-light max-w-xl">
                        Thoughts on design, engineering, and building products that matter.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-brushedAnthracite border border-white/5 animate-pulse">
                                <div className="aspect-[16/10] bg-gunmetal" />
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-gunmetal w-3/4" />
                                    <div className="h-3 bg-gunmetal w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-32">
                        <p className="text-ashGrey text-lg mb-2">No posts yet</p>
                        <p className="text-ashGrey/60 text-sm">Check back soon for insights from our team.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, i) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link href={`/blog/${post.slug}`} className="group block bg-brushedAnthracite border border-white/5 hover:border-white/10 transition-all duration-300">
                                    {post.coverImageUrl && (
                                        <div className="aspect-[16/10] overflow-hidden">
                                            <img
                                                src={post.coverImageUrl}
                                                alt={post.title}
                                                loading="lazy"
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        {post.category && (
                                            <span className="text-xs uppercase tracking-widest text-liquidSilver mb-3 block">
                                                {post.category}
                                            </span>
                                        )}
                                        <h2 className="text-lg font-heading font-bold text-whiteChrome mb-3 group-hover:text-liquidSilver transition-colors leading-snug">
                                            {post.title}
                                        </h2>
                                        {post.excerpt && (
                                            <p className="font-[var(--font-body)] text-ashGrey text-sm font-light line-clamp-2 mb-4">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between text-xs text-ashGrey">
                                            <div className="flex items-center gap-2">
                                                <Clock size={12} />
                                                <span>{post.readTimeMinutes || 5} min read</span>
                                            </div>
                                            <span className="flex items-center gap-1 text-liquidSilver group-hover:text-whiteChrome transition-colors">
                                                Read <ArrowRight size={12} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
