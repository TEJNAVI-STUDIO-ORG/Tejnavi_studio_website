import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const projectSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    category: z.string().min(1),
    tech: z.string().min(1),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().url(),
    thumbnailUrl: z.string().url().optional(),
    year: z.string().min(4),
    caseStudyUrl: z.string().url().optional().or(z.literal("")),
    repoUrl: z.string().url().optional().or(z.literal("")),
    liveUrl: z.string().url().optional().or(z.literal("")),
    isFeatured: z.boolean().optional(),
    sortOrder: z.number().optional(),
    isPublished: z.boolean().optional(),
});

// GET — All projects (including unpublished for admin)
export async function GET() {
    try {
        const all = await db.select().from(projects).orderBy(desc(projects.sortOrder), desc(projects.createdAt));
        return NextResponse.json(all);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

// POST — Create project
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const data = projectSchema.parse(body);
        const [created] = await db.insert(projects).values(data).returning();
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
