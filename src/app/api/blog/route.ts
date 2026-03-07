import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts, adminUsers } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

// GET /api/blog — Public: fetch all published blog posts
export async function GET() {
    try {
        const posts = await db
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

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog posts" },
            { status: 500 }
        );
    }
}
