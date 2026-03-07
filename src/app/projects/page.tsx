import ProjectsClient from "./ProjectsClient";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export const revalidate = 3600;

export default async function ProjectsPage() {
    let dbProjects = [];
    try {
        dbProjects = await db
            .select()
            .from(projects)
            .where(eq(projects.isPublished, true))
            .orderBy(desc(projects.sortOrder), desc(projects.createdAt));
    } catch (error) {
        console.error("Failed to fetch projects:", error);
    }

    return <ProjectsClient initialProjects={dbProjects} />;
}
