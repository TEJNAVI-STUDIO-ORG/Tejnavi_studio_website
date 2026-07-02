import crypto from "crypto";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tejnavistudio.vercel.app";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const INDEXNOW_KEY_LOCATION =
    process.env.INDEXNOW_KEY_LOCATION || (INDEXNOW_KEY ? `${SITE_URL}/${INDEXNOW_KEY}.txt` : undefined);

const GOOGLE_INDEXING_ENABLED = process.env.GOOGLE_INDEXING_ENABLED === "true";
const GOOGLE_SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

function toAbsoluteUrl(pathOrUrl: string): string {
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    return `${SITE_URL.replace(/\/+$/, "")}/${pathOrUrl.replace(/^\/+/, "")}`;
}

/* ══════════════════════════════════════════════════════════════════
   INDEXNOW — Bing / Yandex / Seznam (Google is testing IndexNow)
   Docs: https://www.indexnow.org/documentation
   ══════════════════════════════════════════════════════════════════ */
async function pingIndexNow(urls: string[]): Promise<{ ok: boolean; status?: number; message?: string }> {
    if (!INDEXNOW_KEY) {
        return { ok: false, message: "INDEXNOW_KEY not configured" };
    }
    if (!urls.length) return { ok: false, message: "no urls" };

    try {
        const host = new URL(SITE_URL).host;
        const res = await fetch("https://api.indexnow.org/indexnow", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                host,
                key: INDEXNOW_KEY,
                keyLocation: INDEXNOW_KEY_LOCATION,
                urlList: urls.map(toAbsoluteUrl),
            }),
        });
        return { ok: res.ok, status: res.status };
    } catch (error) {
        console.error("[indexing] IndexNow failed:", error);
        return { ok: false, message: (error as Error).message };
    }
}

/* ══════════════════════════════════════════════════════════════════
   GOOGLE INDEXING API — direct URL notification to Google
   Requires: service account JSON, Search Console ownership
   Docs: https://developers.google.com/search/apis/indexing-api/v3/prereqs
   ══════════════════════════════════════════════════════════════════ */
let cachedGoogleToken: { token: string; expiresAt: number } | null = null;

async function getGoogleAccessToken(): Promise<string | null> {
    if (!GOOGLE_SERVICE_ACCOUNT_JSON) return null;

    // Return cached token if still valid (with 60s buffer)
    if (cachedGoogleToken && cachedGoogleToken.expiresAt > Date.now() + 60_000) {
        return cachedGoogleToken.token;
    }

    let serviceAccount: { client_email: string; private_key: string };
    try {
        serviceAccount = JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON);
    } catch {
        console.error("[indexing] GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON");
        return null;
    }

    const now = Math.floor(Date.now() / 1000);
    const header = { alg: "RS256", typ: "JWT" };
    const payload = {
        iss: serviceAccount.client_email,
        scope: "https://www.googleapis.com/auth/indexing",
        aud: "https://oauth2.googleapis.com/token",
        exp: now + 3600,
        iat: now,
    };

    const b64 = (obj: object) =>
        Buffer.from(JSON.stringify(obj)).toString("base64url");
    const unsigned = `${b64(header)}.${b64(payload)}`;
    const signature = crypto
        .createSign("RSA-SHA256")
        .update(unsigned)
        .sign(serviceAccount.private_key.replace(/\\n/g, "\n"), "base64url");
    const jwt = `${unsigned}.${signature}`;

    const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: jwt,
        }),
    });

    if (!res.ok) {
        console.error("[indexing] Google token exchange failed:", await res.text());
        return null;
    }

    const data = (await res.json()) as { access_token: string; expires_in: number };
    cachedGoogleToken = {
        token: data.access_token,
        expiresAt: Date.now() + data.expires_in * 1000,
    };
    return data.access_token;
}

async function notifyGoogleIndexing(
    urls: string[],
    type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<{ ok: boolean; results?: unknown[]; message?: string }> {
    if (!GOOGLE_INDEXING_ENABLED) return { ok: false, message: "Google Indexing disabled" };

    const token = await getGoogleAccessToken();
    if (!token) return { ok: false, message: "no Google access token" };

    const results = await Promise.all(
        urls.map(async (u) => {
            try {
                const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ url: toAbsoluteUrl(u), type }),
                });
                return { url: u, status: res.status, ok: res.ok };
            } catch (error) {
                return { url: u, ok: false, message: (error as Error).message };
            }
        })
    );

    return { ok: results.every((r) => r.ok), results };
}

/* ══════════════════════════════════════════════════════════════════
   PUBLIC — Call this after publishing / updating any content
   Fires all providers in parallel, never throws.
   ══════════════════════════════════════════════════════════════════ */
export async function notifySearchEngines(
    urls: string | string[],
    type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<void> {
    const list = (Array.isArray(urls) ? urls : [urls]).filter(Boolean);
    if (!list.length) return;

    // Fire-and-forget — do not block the API response.
    const tasks: Promise<unknown>[] = [];
    tasks.push(pingIndexNow(list).then((r) => console.log("[indexing] IndexNow:", r)));
    if (GOOGLE_INDEXING_ENABLED) {
        tasks.push(notifyGoogleIndexing(list, type).then((r) => console.log("[indexing] Google:", r)));
    }
    // NOTE: Google removed the sitemap ping endpoint in June 2023.
    // Bing still accepts it. Yandex accepts it. Google now uses IndexNow signals
    // (via the Google Indexing API when configured) + sitemap crawling.
    tasks.push(
        fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`)
            .then((r) => console.log("[indexing] Bing sitemap ping:", r.status))
            .catch(() => undefined)
    );

    await Promise.allSettled(tasks);
}
