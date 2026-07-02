import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import type { Project } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import ProjectsClient from "./ProjectsClient";

// Always fetch fresh so newly-published projects appear immediately.
// (Admin routes also revalidatePath("/projects"); this is belt-and-braces.)
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
    let published: Project[] = [];
    try {
        published = await db
            .select()
            .from(projects)
            .where(eq(projects.isPublished, true))
            .orderBy(desc(projects.sortOrder), desc(projects.createdAt));
    } catch (error) {
        console.error("[projects] failed to load projects:", error);
    }

    return <ProjectsClient initialProjects={published} />;
}
