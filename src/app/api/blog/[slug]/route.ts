import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts, adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET /api/blog/[slug] — Public: fetch single blog post by slug
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const [post] = await db
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
            .where(eq(blogPosts.slug, slug))
            .limit(1);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error fetching blog post:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog post" },
            { status: 500 }
        );
    }
}
