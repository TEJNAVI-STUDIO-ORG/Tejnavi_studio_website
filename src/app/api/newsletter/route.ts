import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const subscribeSchema = z.object({
    email: z.string().email("Invalid email address"),
});

// POST /api/newsletter — Public: subscribe to newsletter
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = subscribeSchema.parse(body);

        // Check if already subscribed
        const [existing] = await db
            .select()
            .from(newsletterSubscribers)
            .where(eq(newsletterSubscribers.email, email))
            .limit(1);

        if (existing) {
            if (existing.isActive) {
                return NextResponse.json({ message: "Already subscribed!" });
            }
            // Re-activate subscription
            await db
                .update(newsletterSubscribers)
                .set({ isActive: true, unsubscribedAt: null })
                .where(eq(newsletterSubscribers.email, email));

            return NextResponse.json({ message: "Welcome back! Subscription reactivated." });
        }

        await db.insert(newsletterSubscribers).values({ email });

        return NextResponse.json({ message: "Successfully subscribed!" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }
        console.error("Error subscribing:", error);
        return NextResponse.json(
            { error: "Failed to subscribe" },
            { status: 500 }
        );
    }
}
