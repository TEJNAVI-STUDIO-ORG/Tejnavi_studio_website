import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

// GET /api/projects — Public: fetch all published projects
export async function GET() {
    try {
        const allProjects = await db
            .select()
            .from(projects)
            .where(eq(projects.isPublished, true))
            .orderBy(desc(projects.sortOrder), desc(projects.createdAt));

        return NextResponse.json(allProjects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}
