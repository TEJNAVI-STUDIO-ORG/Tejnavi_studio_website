# IndexNow Setup — Auto-index new content

IndexNow lets Bing, Yandex, Seznam (and soon Google) know instantly when you
publish or update a URL. No manual submission required.

## One-time setup (5 minutes)

### 1. Generate a key

Any random alphanumeric string, 8–128 chars. Example commands:

```bash
# On mac/linux/git-bash
openssl rand -hex 16

# Or in Node
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

You'll get something like: `4f8b2c1a9e7d3f6b8a2c1e9d7f3b6a4c`

### 2. Put the key in two places

**a)** In `.env` (and your Vercel project settings):

```
INDEXNOW_KEY=4f8b2c1a9e7d3f6b8a2c1e9d7f3b6a4c
```

**b)** Create a text file in this `public/` folder named `<KEY>.txt`
containing ONLY the key itself:

```
public/4f8b2c1a9e7d3f6b8a2c1e9d7f3b6a4c.txt
```

File content (single line):
```
4f8b2c1a9e7d3f6b8a2c1e9d7f3b6a4c
```

The URL `https://tejnavistudio.vercel.app/<KEY>.txt` MUST return the key —
IndexNow verifies ownership this way.

### 3. Deploy

That's it. Now whenever you publish/update a blog post or project from admin,
the site will POST the URL(s) to IndexNow → Bing/Yandex/Seznam pick it up
within minutes.

## Optional: Google Indexing API

For direct Google notification (much faster than sitemap crawling):

1. https://console.cloud.google.com — create a project
2. Enable "Indexing API"
3. IAM → Service Accounts → Create service account → Download JSON key
4. https://search.google.com/search-console — Settings → Users and permissions →
   Add the service account email as **Owner** (not just user)
5. In `.env`:
   ```
   GOOGLE_INDEXING_ENABLED=true
   GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account", ... full JSON on one line ...}
   ```

Google's Indexing API is officially for JobPosting/BroadcastEvent but works
for regular pages in practice. Combined with IndexNow + a fresh sitemap,
new blog posts typically get indexed in hours instead of days/weeks.
