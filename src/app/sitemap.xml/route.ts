import { NextResponse } from "next/server";
import { WORKFLOWS } from "@/data/workflows";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const revalidate = 0; // Prevent Next.js from caching the sitemap so Google always gets fresh data

export async function GET() {
    const baseUrl = "https://tejnavistudio.vercel.app";
    const today = new Date().toISOString().split("T")[0];

    // Build Static Routes
    const staticUrls = [
        { url: baseUrl, lastmod: today, priority: 1.0, changefreq: "monthly" },
        { url: `${baseUrl}/services`, lastmod: today, priority: 0.9, changefreq: "monthly" },
        { url: `${baseUrl}/projects`, lastmod: today, priority: 0.8, changefreq: "weekly" },
        { url: `${baseUrl}/quote`, lastmod: today, priority: 0.7, changefreq: "monthly" },
        { url: `${baseUrl}/about-us`, lastmod: today, priority: 0.6, changefreq: "monthly" },
        { url: `${baseUrl}/contact`, lastmod: today, priority: 0.7, changefreq: "monthly" },
        { url: `${baseUrl}/workflows`, lastmod: today, priority: 0.5, changefreq: "monthly" },
        { url: `${baseUrl}/blog`, lastmod: today, priority: 0.8, changefreq: "weekly" },
    ];

    const workflowUrls = WORKFLOWS.map((workflow) => ({
        url: `${baseUrl}/workflows/${workflow.slug}`,
        lastmod: today,
        priority: 0.5,
        changefreq: "monthly",
    }));

    // Build Dynamic Blog Routes
    let dynamicBlogs: { url: string; lastmod: string; priority: number; changefreq: string }[] = [];
    try {
        const publishedBlogs = await db
            .select()
            .from(blogPosts)
            .where(eq(blogPosts.isPublished, true));

        dynamicBlogs = publishedBlogs.map((b) => ({
            url: `${baseUrl}/blog/${b.slug}`,
            lastmod: b.publishedAt ? new Date(b.publishedAt).toISOString().split("T")[0] : new Date(b.createdAt).toISOString().split("T")[0],
            changefreq: "weekly",
            priority: 0.8,
        }));
    } catch (error) {
        console.error("Failed to fetch blogs for sitemap:", error);
    }

    const allUrls = [...staticUrls, ...workflowUrls, ...dynamicBlogs];

    // Generate strict XML string
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
            .map(
                (item) => `    <url>
        <loc>${item.url}</loc>
        <lastmod>${item.lastmod || today}</lastmod>
        <changefreq>${item.changefreq}</changefreq>
        <priority>${item.priority}</priority>
    </url>`
            )
            .join("\n")}
</urlset>`;

    // Return exact Response with forced Content-Type header
    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "no-store, max-age=0",
        },
    });
}
