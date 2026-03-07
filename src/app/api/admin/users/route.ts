import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { z } from "zod";

const createAdminSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["superadmin", "admin", "editor"]).default("admin"),
});

// GET — List all admins (superadmin only)
export async function GET() {
    try {
        const session = await auth();
        if ((session?.user as { role?: string })?.role !== "superadmin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const admins = await db
            .select({
                id: adminUsers.id,
                name: adminUsers.name,
                email: adminUsers.email,
                role: adminUsers.role,
                avatarUrl: adminUsers.avatarUrl,
                isActive: adminUsers.isActive,
                createdAt: adminUsers.createdAt,
            })
            .from(adminUsers)
            .orderBy(desc(adminUsers.createdAt));

        return NextResponse.json(admins);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

// POST — Create new admin (superadmin only)
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if ((session?.user as { role?: string })?.role !== "superadmin") {
            return NextResponse.json({ error: "Only superadmins can create new admins" }, { status: 403 });
        }

        const body = await request.json();
        const data = createAdminSchema.parse(body);

        // Check if email already exists
        const [existing] = await db
            .select()
            .from(adminUsers)
            .where(eq(adminUsers.email, data.email))
            .limit(1);

        if (existing) {
            return NextResponse.json({ error: "Email already exists" }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(data.password, 12);

        const [created] = await db
            .insert(adminUsers)
            .values({
                name: data.name,
                email: data.email,
                passwordHash,
                role: data.role,
            })
            .returning({
                id: adminUsers.id,
                name: adminUsers.name,
                email: adminUsers.email,
                role: adminUsers.role,
                createdAt: adminUsers.createdAt,
            });

        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
    }
}
