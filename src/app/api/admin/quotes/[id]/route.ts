import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const [updated] = await db
            .update(quoteRequests)
            .set({ ...body, updatedAt: new Date() })
            .where(eq(quoteRequests.id, parseInt(id)))
            .returning();
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
