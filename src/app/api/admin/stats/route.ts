import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects, blogPosts, contactSubmissions, quoteRequests, newsletterSubscribers, testimonials } from "@/lib/db/schema";
import { count } from "drizzle-orm";

// GET /api/admin/stats — Dashboard statistics
export async function GET() {
    try {
        const [projectCount] = await db.select({ value: count() }).from(projects);
        const [blogCount] = await db.select({ value: count() }).from(blogPosts);
        const [contactCount] = await db.select({ value: count() }).from(contactSubmissions);
        const [quoteCount] = await db.select({ value: count() }).from(quoteRequests);
        const [newsletterCount] = await db.select({ value: count() }).from(newsletterSubscribers);
        const [testimonialCount] = await db.select({ value: count() }).from(testimonials);

        return NextResponse.json({
            projects: projectCount.value,
            blogPosts: blogCount.value,
            contacts: contactCount.value,
            quotes: quoteCount.value,
            newsletter: newsletterCount.value,
            testimonials: testimonialCount.value,
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({
            projects: 0,
            blogPosts: 0,
            contacts: 0,
            quotes: 0,
            newsletter: 0,
            testimonials: 0,
        });
    }
}
