import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Lazy initialization — avoid crashing at build time when DATABASE_URL is not set
let _db: NeonHttpDatabase<typeof schema> | null = null;

export function getDb() {
    if (!_db) {
        const url = process.env.DATABASE_URL;
        if (!url) {
            throw new Error(
                "DATABASE_URL is not set. Please add it to your .env.local file.\n" +
                "Get yours from: https://console.neon.tech"
            );
        }
        const sql = neon(url);
        _db = drizzle(sql, { schema });
    }
    return _db;
}

// For convenience — still exports `db` but as a getter proxy
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
    get(_, prop) {
        return (getDb() as any)[prop];
    },
});
