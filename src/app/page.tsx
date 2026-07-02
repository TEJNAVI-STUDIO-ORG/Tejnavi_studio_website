import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { and, eq, desc } from "drizzle-orm";
import HomeClient from "./HomeClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function HomePage() {
    let featuredProjects: {
        id: number;
        title: string;
        slug: string;
        category: string;
        subtitle: string | null;
        imageUrl: string;
        year: string;
        liveUrl: string | null;
    }[] = [];

    try {
        const rows = await db
            .select({
                id: projects.id,
                title: projects.title,
                slug: projects.slug,
                category: projects.category,
                subtitle: projects.subtitle,
                imageUrl: projects.imageUrl,
                year: projects.year,
                liveUrl: projects.liveUrl,
            })
            .from(projects)
            .where(
                and(
                    eq(projects.isPublished, true),
                    eq(projects.isFeatured, true)
                )
            )
            .orderBy(desc(projects.sortOrder))
            .limit(6);

        featuredProjects = rows;
    } catch (error) {
        console.error("[home] failed to load featured projects:", error);
    }

    return <HomeClient projects={featuredProjects} />;
}
