import { MetadataRoute } from "next";
import { WORKFLOWS } from "@/data/workflows";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://tejnavistudio.vercel.app";

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/quote`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/workflows`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    const workflowRoutes: MetadataRoute.Sitemap = WORKFLOWS.map((workflow) => ({
        url: `${baseUrl}/workflows/${workflow.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
    }));

    let dynamicBlogs: MetadataRoute.Sitemap = [];

    try {
        const publishedBlogs = await db
            .select()
            .from(blogPosts)
            .where(eq(blogPosts.isPublished, true));

        dynamicBlogs = publishedBlogs.map((b) => ({
            url: `${baseUrl}/blog/${b.slug}`,
            lastModified: b.publishedAt ? new Date(b.publishedAt) : new Date(b.createdAt),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));
    } catch (error) {
        console.error("Failed to fetch blogs for sitemap:", error);
    }

    return [...staticRoutes, ...workflowRoutes, ...dynamicBlogs];
}
