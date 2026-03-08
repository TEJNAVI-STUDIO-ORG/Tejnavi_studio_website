import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
    try {
        const all = await db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt));
        return NextResponse.json(all);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
