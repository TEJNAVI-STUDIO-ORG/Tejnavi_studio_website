import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notifySearchEngines } from "@/lib/indexing";

// PUT — Update blog post
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Omit date fields that come from the frontend as strings
        const { id: _bodyId, createdAt, updatedAt, publishedAt, ...rest } = body;

        // Load existing so we know if `isPublished` actually flipped
        const [existing] = await db
            .select()
            .from(blogPosts)
            .where(eq(blogPosts.id, parseInt(id)))
            .limit(1);

        const updateData: any = {
            ...rest,
            updatedAt: new Date(),
        };

        if (publishedAt) {
            updateData.publishedAt = new Date(publishedAt);
        } else if (body.isPublished === true && !existing?.publishedAt) {
            // First time publishing — stamp the publish date
            updateData.publishedAt = new Date();
        } else if (body.isPublished === false) {
            updateData.publishedAt = null;
        }

        const [updated] = await db
            .update(blogPosts)
            .set(updateData)
            .where(eq(blogPosts.id, parseInt(id)))
            .returning();

        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

        // Always refresh cache after an edit
        revalidatePath("/blog");
        revalidatePath(`/blog/${updated.slug}`);
        if (existing?.slug && existing.slug !== updated.slug) {
            revalidatePath(`/blog/${existing.slug}`);
        }
        revalidatePath("/sitemap.xml");

        // Ping search engines when post is currently published — content update is worth re-crawling
        if (updated.isPublished) {
            notifySearchEngines([`/blog/${updated.slug}`, "/blog"]).catch(() => undefined);
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error:", error);
        const message = error instanceof Error ? error.message : "Failed to update";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// DELETE — Delete blog post
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const [existing] = await db
            .select({ slug: blogPosts.slug })
            .from(blogPosts)
            .where(eq(blogPosts.id, parseInt(id)))
            .limit(1);

        await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(id)));

        revalidatePath("/blog");
        revalidatePath("/sitemap.xml");
        if (existing?.slug) {
            revalidatePath(`/blog/${existing.slug}`);
            notifySearchEngines([`/blog/${existing.slug}`], "URL_DELETED").catch(() => undefined);
        }

        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
