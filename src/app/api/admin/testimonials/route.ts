import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
    const all = await db.select().from(testimonials).orderBy(desc(testimonials.sortOrder));
    return NextResponse.json(all);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const [created] = await db.insert(testimonials).values(body).returning();
    return NextResponse.json(created, { status: 201 });
}
