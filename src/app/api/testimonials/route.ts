import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

// GET /api/testimonials — Public: fetch all published testimonials
export async function GET() {
    try {
        const all = await db
            .select()
            .from(testimonials)
            .where(eq(testimonials.isPublished, true))
            .orderBy(desc(testimonials.sortOrder));

        return NextResponse.json(all);
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return NextResponse.json(
            { error: "Failed to fetch testimonials" },
            { status: 500 }
        );
    }
}
