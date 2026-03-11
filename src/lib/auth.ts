import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email as string;
                const password = credentials.password as string;

                const [user] = await db
                    .select()
                    .from(adminUsers)
                    .where(eq(adminUsers.email, email))
                    .limit(1);

                if (!user || !user.isActive) return null;

                const passwordMatch = await bcrypt.compare(password, user.passwordHash);
                if (!passwordMatch) return null;

                return {
                    id: String(user.id),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.avatarUrl,
                };
            },
        }),
    ],
});
