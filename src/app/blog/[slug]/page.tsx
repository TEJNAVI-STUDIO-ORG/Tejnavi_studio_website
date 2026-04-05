"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: string;
  authorName?: string;
  authorAvatar?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const slug = params?.slug as string;
    if (!slug) return;
    fetch(`/api/blog/${slug}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => { if (data) setPost(data); })
      .finally(() => setLoading(false));
  }, [params]);

  if (loading) return (
    <div className="min-h-screen bg-vantaBlack flex items-center justify-center">
      <div className="text-ashGrey text-sm tracking-widest animate-pulse">LOADING</div>
    </div>
  );

  if (notFound || !post) return (
    <div className="min-h-screen bg-vantaBlack flex flex-col items-center justify-center gap-4">
      <p className="text-whiteChrome text-xl">Post not found</p>
      <Link href="/blog" className="text-ashGrey text-sm hover:text-whiteChrome transition-colors">
        ← Back to Blog
      </Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-vantaBlack text-whiteChrome">

      {/* Back Button */}
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-ashGrey text-sm hover:text-whiteChrome transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to Insights
        </Link>
      </div>

      {/* Cover Image */}
      {post.coverImageUrl && (
        <div className="max-w-4xl mx-auto px-6 mb-10">
          <div className="w-full aspect-[16/7] overflow-hidden">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Post Header */}
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

      {/* =============================================
          MAIN CONTENT — ReactMarkdown renders everything
          Tables, Links, CTAs, Bold, Images, Code, etc.
          ============================================= */}
      <article className="max-w-3xl mx-auto px-6 pb-24">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{

            // Headings
            h1: ({ children }) => (
              <h1 className="text-2xl md:text-3xl font-bold text-whiteChrome mt-12 mb-4 leading-tight">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl md:text-2xl font-semibold text-whiteChrome mt-10 mb-3 leading-tight border-b border-white/10 pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold text-whiteChrome mt-8 mb-2">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base font-semibold text-whiteChrome mt-6 mb-2">
                {children}
              </h4>
            ),

            // Body text
            p: ({ children }) => (
              <p className="text-ashGrey leading-relaxed mb-5 text-base">
                {children}
              </p>
            ),

            // Lists
            ul: ({ children }) => (
              <ul className="list-disc list-outside pl-5 mb-5 space-y-1.5">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-outside pl-5 mb-5 space-y-1.5">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-ashGrey leading-relaxed">{children}</li>
            ),

            // Blockquote
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-white/30 pl-5 my-6 italic text-ashGrey/80">
                {children}
              </blockquote>
            ),

            // Code — inline and block
            code: ({ inline, children, ...props }: any) =>
              inline ? (
                <code className="bg-white/10 text-whiteChrome px-1.5 py-0.5 text-sm font-mono rounded">
                  {children}
                </code>
              ) : (
                <pre className="bg-white/5 border border-white/10 rounded p-4 overflow-x-auto my-6">
                  <code className="text-sm font-mono text-whiteChrome leading-relaxed">
                    {children}
                  </code>
                </pre>
              ),

            // Table — fully rendered with styles
            table: ({ children }) => (
              <div className="overflow-x-auto my-8 border border-white/10 rounded">
                <table className="w-full border-collapse text-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-white/5 border-b border-white/15">
                {children}
              </thead>
            ),
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => (
              <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="text-left py-3 px-4 text-whiteChrome font-semibold text-xs uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="py-3 px-4 text-ashGrey">
                {children}
              </td>
            ),

            // Divider
            hr: () => <hr className="border-white/10 my-10" />,

            // Bold & Italic
            strong: ({ children }) => (
              <strong className="text-whiteChrome font-semibold">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="text-ashGrey/90 italic">{children}</em>
            ),

            // ============================================================
            // LINKS — Smart detection:
            // /quote and /contact → renders as a CTA Button
            // Other internal links → styled Link
            // External links → opens in new tab
            // ============================================================
            a: ({ href, children }) => {
              const isCTA =
                href === "/quote" ||
                href === "/contact" ||
                href === "/services" ||
                href?.includes("/quote") ||
                href?.includes("/contact");

              if (isCTA) {
                return (
                  <Link
                    href={href!}
                    className="inline-flex items-center gap-2 border border-whiteChrome text-whiteChrome px-6 py-3 text-sm uppercase tracking-widest hover:bg-whiteChrome hover:text-black hover:font-bold transition-all duration-200 mt-4 mr-3 no-underline"
                  >
                    {children}
                  </Link>
                );
              }

              const isInternal = href?.startsWith("/");
              if (isInternal) {
                return (
                  <Link
                    href={href!}
                    className="text-whiteChrome underline underline-offset-4 hover:text-ashGrey transition-colors"
                  >
                    {children}
                  </Link>
                );
              }

              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-whiteChrome underline underline-offset-4 hover:text-ashGrey transition-colors"
                >
                  {children}
                </a>
              );
            },

            // Images inside content
            img: ({ src, alt }) => (
              <figure className="my-8">
                <img
                  src={src}
                  alt={alt || ""}
                  className="w-full object-cover rounded"
                  loading="lazy"
                />
                {alt && (
                  <figcaption className="text-center text-xs text-ashGrey/60 mt-2">
                    {alt}
                  </figcaption>
                )}
              </figure>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 pb-16">
          <div className="flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-ashGrey border border-white/10 px-3 py-1 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}