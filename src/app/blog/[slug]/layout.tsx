import type { Metadata } from "next";
import { db } from "@/lib/db";
import { blogPosts, adminUsers } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tejnavistudio.vercel.app";

async function getPost(slug: string) {
    try {
        const [post] = await db
            .select({
                title: blogPosts.title,
                slug: blogPosts.slug,
                excerpt: blogPosts.excerpt,
                coverImageUrl: blogPosts.coverImageUrl,
                category: blogPosts.category,
                tags: blogPosts.tags,
                metaTitle: blogPosts.metaTitle,
                metaDescription: blogPosts.metaDescription,
                isPublished: blogPosts.isPublished,
                publishedAt: blogPosts.publishedAt,
                updatedAt: blogPosts.updatedAt,
                authorName: adminUsers.name,
            })
            .from(blogPosts)
            .leftJoin(adminUsers, eq(blogPosts.authorId, adminUsers.id))
            .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)))
            .limit(1);
        return post ?? null;
    } catch (error) {
        console.error("[blog metadata] db lookup failed:", error);
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: "Post not found",
            robots: { index: false, follow: false },
        };
    }

    const title = post.metaTitle || post.title;
    const description =
        post.metaDescription ||
        post.excerpt ||
        `Read "${post.title}" on Tejnavi Studio's blog.`;
    const url = `${SITE_URL}/blog/${post.slug}`;
    const image = post.coverImageUrl || `${SITE_URL}/banner.png`;

    return {
        title,
        description,
        alternates: { canonical: url },
        keywords: post.tags ?? undefined,
        openGraph: {
            type: "article",
            url,
            title,
            description,
            images: [{ url: image, width: 1200, height: 630, alt: post.title }],
            publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
            modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
            authors: post.authorName ? [post.authorName] : undefined,
            tags: post.tags ?? undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

export default async function BlogPostLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);

    // JSON-LD structured data — helps Google understand this is an Article
    const jsonLd = post
        ? {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription || post.excerpt || undefined,
            image: post.coverImageUrl || `${SITE_URL}/banner.png`,
            datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
            dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
            author: {
                "@type": "Person",
                name: post.authorName || "Tejnavi Studio",
            },
            publisher: {
                "@type": "Organization",
                name: "Tejnavi Studio",
                logo: {
                    "@type": "ImageObject",
                    url: `${SITE_URL}/favicon.png`,
                },
            },
            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${SITE_URL}/blog/${post.slug}`,
            },
            keywords: post.tags?.join(", "),
        }
        : null;

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            {children}
        </>
    );
}
