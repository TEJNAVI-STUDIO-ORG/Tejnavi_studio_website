import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// PUT — Update project
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const [updated] = await db
            .update(projects)
            .set({ ...body, updatedAt: new Date() })
            .where(eq(projects.id, parseInt(id)))
            .returning();

        if (!updated) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

// DELETE — Delete project
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await db.delete(projects).where(eq(projects.id, parseInt(id)));
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
