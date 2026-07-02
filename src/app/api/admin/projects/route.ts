import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { notifySearchEngines } from "@/lib/indexing";

// Allow empty string OR a valid URL — the admin form sends "" for optional URL fields
const optionalUrl = z
    .union([z.string().url(), z.literal("")])
    .optional()
    .transform((v) => (v === "" ? undefined : v));

const projectSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    category: z.string().min(1),
    tech: z.string().min(1),
    subtitle: z.string().optional().transform((v) => (v === "" ? undefined : v)),
    description: z.string().optional().transform((v) => (v === "" ? undefined : v)),
    imageUrl: z.string().url("Image is required — please upload a project image"),
    thumbnailUrl: optionalUrl,
    year: z.string().min(4),
    caseStudyUrl: optionalUrl,
    repoUrl: optionalUrl,
    liveUrl: optionalUrl,
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

        // Refresh public pages so new project shows up immediately
        revalidatePath("/projects");
        revalidatePath(`/projects/${created.slug}`);
        revalidatePath("/");
        revalidatePath("/sitemap.xml");

        // Notify search engines (fire and forget) — includes the specific case-study URL
        if (created.isPublished) {
            notifySearchEngines([
                `/projects/${created.slug}`,
                "/projects",
                "/",
            ]).catch(() => undefined);
        }

        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const first = error.errors[0];
            const message = first ? `${first.path.join(".")}: ${first.message}` : "Validation failed";
            return NextResponse.json({ error: message, details: error.errors }, { status: 400 });
        }
        console.error("Error:", error);
        const message = error instanceof Error ? error.message : "Failed to create";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
