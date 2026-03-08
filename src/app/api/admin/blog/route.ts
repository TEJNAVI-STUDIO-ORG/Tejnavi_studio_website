import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const blogSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    excerpt: z.string().optional(),
    content: z.string().min(1),
    coverImageUrl: z.string().optional(),
    authorId: z.number().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    readTimeMinutes: z.number().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    isPublished: z.boolean().optional(),
    publishedAt: z.string().optional(),
});

// GET — All blog posts (including drafts for admin)
export async function GET() {
    try {
        const all = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
        return NextResponse.json(all);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

// POST — Create blog post
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const data = blogSchema.parse(body);
        const insertData = {
            ...data,
            publishedAt: data.publishedAt ? new Date(data.publishedAt) : data.isPublished ? new Date() : null,
        };
        const [created] = await db.insert(blogPosts).values(insertData).returning();
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
