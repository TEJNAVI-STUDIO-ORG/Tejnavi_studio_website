import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
    try {
        const all = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
        return NextResponse.json(all);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
