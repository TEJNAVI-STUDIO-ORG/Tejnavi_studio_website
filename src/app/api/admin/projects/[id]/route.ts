import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notifySearchEngines } from "@/lib/indexing";

// PUT — Update project
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Strip empty strings from optional fields — we want NULL in DB, not "".
        const cleaned = { ...body };
        for (const key of ["subtitle", "description", "thumbnailUrl", "caseStudyUrl", "repoUrl", "liveUrl"]) {
            if (cleaned[key] === "") cleaned[key] = null;
        }

        // Load previous state so we can detect slug changes and old-URL cleanup
        const [existing] = await db
            .select()
            .from(projects)
            .where(eq(projects.id, parseInt(id)))
            .limit(1);

        const [updated] = await db
            .update(projects)
            .set({ ...cleaned, updatedAt: new Date() })
            .where(eq(projects.id, parseInt(id)))
            .returning();

        if (!updated) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        revalidatePath("/projects");
        revalidatePath(`/projects/${updated.slug}`);
        if (existing?.slug && existing.slug !== updated.slug) {
            revalidatePath(`/projects/${existing.slug}`);
        }
        revalidatePath("/");
        revalidatePath("/sitemap.xml");

        if (updated.isPublished) {
            notifySearchEngines([
                `/projects/${updated.slug}`,
                "/projects",
                "/",
            ]).catch(() => undefined);
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error:", error);
        const message = error instanceof Error ? error.message : "Failed to update";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// DELETE — Delete project
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const [existing] = await db
            .select({ slug: projects.slug })
            .from(projects)
            .where(eq(projects.id, parseInt(id)))
            .limit(1);

        await db.delete(projects).where(eq(projects.id, parseInt(id)));

        revalidatePath("/projects");
        revalidatePath("/");
        revalidatePath("/sitemap.xml");
        if (existing?.slug) {
            revalidatePath(`/projects/${existing.slug}`);
            // Tell search engines the URL is gone so it drops out of the index
            notifySearchEngines([`/projects/${existing.slug}`], "URL_DELETED").catch(() => undefined);
        }

        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
