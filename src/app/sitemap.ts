import { MetadataRoute } from "next";
import { WORKFLOWS } from "@/data/workflows";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const revalidate = 0; // Prevent Next.js from caching the sitemap so Google always gets fresh data

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://tejnavistudio.vercel.app";
    const today = new Date().toISOString().split("T")[0];

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/quote`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/workflows`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    const workflowRoutes: MetadataRoute.Sitemap = WORKFLOWS.map((workflow) => ({
        url: `${baseUrl}/workflows/${workflow.slug}`,
        lastModified: today,
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
            lastModified: b.publishedAt ? new Date(b.publishedAt).toISOString().split("T")[0] : new Date(b.createdAt).toISOString().split("T")[0],
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));
    } catch (error) {
        console.error("Failed to fetch blogs for sitemap:", error);
    }

    return [...staticRoutes, ...workflowRoutes, ...dynamicBlogs];
}
