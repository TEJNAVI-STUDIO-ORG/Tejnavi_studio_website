import HomeClient from "./HomeClient";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

// Only revalidate this page every hour (or you can use Next.js tags to revalidate on CMS updates)
export const revalidate = 3600;

export default async function Home() {
    // Fetch featured & published projects from Neon DB
    let dbProjects = [];
    try {
        dbProjects = await db
            .select()
            .from(projects)
            .where(eq(projects.isPublished, true))
            .orderBy(desc(projects.isFeatured), desc(projects.sortOrder), desc(projects.createdAt))
            .limit(4);
    } catch (error) {
        console.error("Failed to fetch projects for homepage:", error);
        // If DB isn't setup yet, just pass empty array
    }

    return <HomeClient initialProjects={dbProjects} />;
}
