import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts, adminUsers } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import BlogPostClient, { type BlogPostView } from "./BlogPostClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let post: BlogPostView | null = null;
    try {
        const [row] = await db
            .select({
                id: blogPosts.id,
                title: blogPosts.title,
                slug: blogPosts.slug,
                excerpt: blogPosts.excerpt,
                content: blogPosts.content,
                coverImageUrl: blogPosts.coverImageUrl,
                category: blogPosts.category,
                tags: blogPosts.tags,
                readTimeMinutes: blogPosts.readTimeMinutes,
                metaTitle: blogPosts.metaTitle,
                metaDescription: blogPosts.metaDescription,
                publishedAt: blogPosts.publishedAt,
                authorName: adminUsers.name,
                authorAvatar: adminUsers.avatarUrl,
            })
            .from(blogPosts)
            .leftJoin(adminUsers, eq(blogPosts.authorId, adminUsers.id))
            .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)))
            .limit(1);

        if (row) {
            post = {
                ...row,
                publishedAt: row.publishedAt ? new Date(row.publishedAt).toISOString() : null,
            };
        }
    } catch (error) {
        console.error("[blog/slug] db lookup failed:", error);
    }

    if (!post) notFound();

    return <BlogPostClient post={post} />;
}
