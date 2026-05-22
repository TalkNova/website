# Blog snapshot (offline fallback)

`blog-snapshot.json` is bundled with the site so blog pages work when the API is down at deploy or runtime.

**Refresh after CMS changes** (API must be running):

```bash
BLOG_API_URL=https://your-api.example.com npm run blog:snapshot
```

Commit the updated `blog-snapshot.json` before deploy, or run `blog:snapshot` in CI before `next build`.
