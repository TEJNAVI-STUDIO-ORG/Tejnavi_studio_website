"use client";

import Link from "next/link";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export interface BlogPostView {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    coverImageUrl?: string | null;
    category?: string | null;
    tags?: string[] | null;
    readTimeMinutes?: number | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    publishedAt?: string | null;
    authorName?: string | null;
    authorAvatar?: string | null;
}

export default function BlogPostClient({ post }: { post: BlogPostView }) {
    return (
        <main className="min-h-screen bg-vantaBlack text-whiteChrome">
            <div className="max-w-3xl mx-auto px-6 pt-12">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-ashGrey text-sm hover:text-whiteChrome transition-colors mb-10"
                >
                    <ArrowLeft size={14} />
                    Back to Insights
                </Link>
            </div>

            {post.coverImageUrl && (
                <div className="max-w-4xl mx-auto px-6 mb-10">
                    <div className="w-full aspect-[16/7] overflow-hidden">
                        <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                </div>
            )}

            <div className="max-w-3xl mx-auto px-6 mb-10">
                {post.category && (
                    <span className="text-xs uppercase tracking-widest text-ashGrey border border-white/10 px-3 py-1 mb-5 inline-block">
                        {post.category}
                    </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-whiteChrome leading-tight mb-4">
                    {post.title}
                </h1>
                {post.excerpt && (
                    <p className="text-ashGrey text-lg leading-relaxed mb-6">{post.excerpt}</p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-ashGrey text-xs border-t border-white/10 pt-4">
                    <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {post.readTimeMinutes || 5} min read
                    </span>
                    {post.publishedAt && (
                        <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                                year: "numeric", month: "long", day: "numeric",
                            })}
                        </span>
                    )}
                    {post.authorName && (
                        <span className="ml-auto uppercase tracking-widest">{post.authorName}</span>
                    )}
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-6 pb-24">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        h1: ({ children }) => <h1 className="text-2xl md:text-3xl font-bold text-whiteChrome mt-12 mb-4 leading-tight">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl md:text-2xl font-semibold text-whiteChrome mt-10 mb-3 leading-tight border-b border-white/10 pb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-lg font-semibold text-whiteChrome mt-8 mb-2">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-base font-semibold text-whiteChrome mt-6 mb-2">{children}</h4>,
                        p: ({ children }) => <p className="text-ashGrey leading-relaxed mb-5 text-base">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-outside pl-5 mb-5 space-y-1.5">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-outside pl-5 mb-5 space-y-1.5">{children}</ol>,
                        li: ({ children }) => <li className="text-ashGrey leading-relaxed">{children}</li>,
                        blockquote: ({ children }) => <blockquote className="border-l-2 border-white/30 pl-5 my-6 italic text-ashGrey/80">{children}</blockquote>,
                        code: ({ inline, children, ...props }: any) =>
                            inline ? (
                                <code className="bg-white/10 text-whiteChrome px-1.5 py-0.5 text-sm font-mono rounded">{children}</code>
                            ) : (
                                <pre className="bg-white/5 border border-white/10 rounded p-4 overflow-x-auto my-6">
                                    <code className="text-sm font-mono text-whiteChrome leading-relaxed">{children}</code>
                                </pre>
                            ),
                        table: ({ children }) => (
                            <div className="overflow-x-auto my-8 border border-white/10 rounded">
                                <table className="w-full border-collapse text-sm">{children}</table>
                            </div>
                        ),
                        thead: ({ children }) => <thead className="bg-white/5 border-b border-white/15">{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">{children}</tr>,
                        th: ({ children }) => <th className="text-left py-3 px-4 text-whiteChrome font-semibold text-xs uppercase tracking-wider">{children}</th>,
                        td: ({ children }) => <td className="py-3 px-4 text-ashGrey">{children}</td>,
                        hr: () => <hr className="border-white/10 my-10" />,
                        strong: ({ children }) => <strong className="text-whiteChrome font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="text-ashGrey/90 italic">{children}</em>,
                        a: ({ href, children }) => {
                            const isCTA =
                                href === "/quote" || href === "/contact" || href === "/services" ||
                                href?.includes("/quote") || href?.includes("/contact");

                            if (isCTA) {
                                return (
                                    <Link href={href!} className="inline-flex items-center gap-2 border border-whiteChrome text-whiteChrome px-6 py-3 text-sm uppercase tracking-widest hover:bg-whiteChrome hover:text-black hover:font-bold transition-all duration-200 mt-4 mr-3 no-underline">
                                        {children}
                                    </Link>
                                );
                            }

                            if (href?.startsWith("/")) {
                                return (
                                    <Link href={href} className="text-whiteChrome underline underline-offset-4 hover:text-ashGrey transition-colors">
                                        {children}
                                    </Link>
                                );
                            }

                            return (
                                <a href={href} target="_blank" rel="noopener noreferrer" className="text-whiteChrome underline underline-offset-4 hover:text-ashGrey transition-colors">
                                    {children}
                                </a>
                            );
                        },
                        img: ({ src, alt }) => (
                            <figure className="my-8">
                                <img src={src} alt={alt || ""} className="w-full object-cover rounded" loading="lazy" />
                                {alt && <figcaption className="text-center text-xs text-ashGrey/60 mt-2">{alt}</figcaption>}
                            </figure>
                        ),
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </article>

            {post.tags && post.tags.length > 0 && (
                <div className="max-w-3xl mx-auto px-6 pb-16">
                    <div className="flex flex-wrap gap-2 border-t border-white/10 pt-6">
                        {post.tags.map((tag) => (
                            <span key={tag} className="text-xs text-ashGrey border border-white/10 px-3 py-1 uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
