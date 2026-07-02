import { db } from "@/lib/db";
import { blogPosts, adminUsers } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import BlogClient, { type BlogPostCard } from "./BlogClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function BlogPage() {
    let posts: BlogPostCard[] = [];
    try {
        const rows = await db
            .select({
                id: blogPosts.id,
                title: blogPosts.title,
                slug: blogPosts.slug,
                excerpt: blogPosts.excerpt,
                coverImageUrl: blogPosts.coverImageUrl,
                category: blogPosts.category,
                tags: blogPosts.tags,
                readTimeMinutes: blogPosts.readTimeMinutes,
                publishedAt: blogPosts.publishedAt,
                authorName: adminUsers.name,
                authorAvatar: adminUsers.avatarUrl,
            })
            .from(blogPosts)
            .leftJoin(adminUsers, eq(blogPosts.authorId, adminUsers.id))
            .where(eq(blogPosts.isPublished, true))
            .orderBy(desc(blogPosts.publishedAt));

        posts = rows.map((r) => ({
            ...r,
            publishedAt: r.publishedAt ? new Date(r.publishedAt).toISOString() : null,
        }));
    } catch (error) {
        console.error("[blog] failed to load posts:", error);
    }

    return <BlogClient posts={posts} />;
}
