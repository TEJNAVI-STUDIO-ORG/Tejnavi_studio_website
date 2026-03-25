import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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

        const updateData: any = {
            ...rest,
            updatedAt: new Date(),
        };

        if (publishedAt) {
            updateData.publishedAt = new Date(publishedAt);
        } else if (body.isPublished === true) {
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
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

// DELETE — Delete blog post
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(id)));
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
