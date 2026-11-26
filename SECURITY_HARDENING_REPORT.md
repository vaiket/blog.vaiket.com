# Editorial security hardening — Phase 4

Snapshot: 25 November 2026.

## Implemented and verified locally

- Every editorial article GET and mutation checks the server-side HttpOnly session cookie.
- The token is read from `EDITORIAL_ADMIN_TOKEN` at runtime and is not included in client bundles, URLs or browser storage.
- Auth and mutation requests require an `x-editorial-request: same-origin` header; the session cookie is `SameSite=Strict`, `HttpOnly`, `Secure` in production and expires after eight hours.
- In-memory rate limits protect login attempts and editorial mutations. This is appropriate for one process but must be replaced with shared storage if multiple PM2 instances are used.
- Every save creates a timestamped source backup under `content/editorial-history/<slug>/`; an audit line records date, action, slug and resulting status without recording the token.
- Publishing is server-enforced and requires exact `reviewStatus: editorial approved`.
- Draft article page access calls `notFound()` unless the editor session is valid. Drafts are excluded from `generateStaticParams`, All Posts and sitemap.
- `/admin/`, `/api/` and provider utility paths are disallowed in robots; this is an indexing aid, not the security boundary.

## Remaining production controls

- Use a long random token in the VPS secret store, rotate it by replacing the environment value and restarting only the blog PM2 process.
- Move rate-limit counters and audit/version files to a durable, access-controlled store when running more than one process.
- Restrict the admin route at Nginx/VPN level if the workspace is exposed beyond the editorial team.
- Test backup restoration before the first production publish; keep the history directory outside the public web root.
- Use a managed secret/backup policy and monitor failed authentication without logging request tokens.

## Artifact check

The production build generated published routes only. An unauthenticated local request to a known draft returned 404; the public sitemap and All Posts response did not contain the draft slug. A build artifact source scan should be repeated on the exact production bundle before deployment because Next.js server bundles can change with build configuration.

After removing draft references from public product landing pages, the final `.next/server/app/product` and sitemap artifact scan found zero known priority-draft slugs.
