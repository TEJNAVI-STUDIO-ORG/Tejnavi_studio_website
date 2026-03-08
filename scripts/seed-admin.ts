/**
 * Admin Seed Script
 * Run: npx tsx scripts/seed-admin.ts
 *
 * Creates the initial superadmin user.
 * This user can then create more admins from the dashboard.
 */

import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import bcrypt from "bcryptjs";
import * as schema from "../src/lib/db/schema";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL is not set. Add it to your .env file.");
    process.exit(1);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema });

async function seed() {
    console.log("🌱 Seeding initial superadmin...\n");

    const email = "admin@tejnavistudio.com";
    const password = "TejnaviAdmin@2026"; // Change this after first login!
    const name = "Aditya Vispute";

    const passwordHash = await bcrypt.hash(password, 12);

    try {
        const [admin] = await db
            .insert(schema.adminUsers)
            .values({
                name,
                email,
                passwordHash,
                role: "superadmin",
            })
            .onConflictDoNothing()
            .returning();

        if (admin) {
            console.log("✅ Superadmin created:");
            console.log(`   Email:    ${email}`);
            console.log(`   Password: ${password}`);
            console.log(`   Role:     superadmin`);
            console.log("\n⚠️  Change the password after first login!");
        } else {
            console.log("ℹ️  Admin already exists with this email.");
        }
    } catch (error) {
        console.error("❌ Failed to seed admin:", error);
    }
}

seed();
