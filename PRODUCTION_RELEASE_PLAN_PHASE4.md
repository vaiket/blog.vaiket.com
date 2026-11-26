# Production release plan — Phase 4

No deployment was performed.

## Before release

1. Set a strong `EDITORIAL_ADMIN_TOKEN`, optional analytics IDs and Search Console verification values in the blog VPS secret/environment store.
2. Confirm the blog PM2 process name and free port; do not restart unrelated applications.
3. Back up `content/articles`, `content/editorial-history`, `content/content-inventory.json`, `content/provider-directory-india.md` and the environment configuration.
4. Run `npm ci`, `npm run audit:content`, `npx tsc --noEmit`, `npm run build` and `npm audit --omit=dev` on the release checkout.
5. Start the new build under a separate PM2 process/port, check `/`, `/posts`, `/sitemap.xml`, `/robots.txt`, `/admin`, published articles, draft protection and `/api/editorial/auth`.
6. Add an Nginx upstream for the verified port, preserve HTTPS and proxy headers, then perform a health check before switching traffic.
7. Keep the previous PM2 process and backup available for rollback; switch Nginx back and stop only the new blog process if the health check fails.

## VPS handoff package — commands are not executed here

Assumptions to replace with the actual server values: `/var/www/blog.vaiket.com` as the release directory, `blog.vaiket.com` as the hostname and port `3000` for the blog process.

### PM2

```bash
cd /var/www/blog.vaiket.com
npm ci
npm run audit:content
npx tsc --noEmit
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Set `EDITORIAL_ADMIN_TOKEN`, analytics IDs and Search Console verification values in the VPS environment/secret store. Never commit them to the repository.

### Nginx and SSL

```nginx
server {
    listen 80;
    server_name blog.vaiket.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d blog.vaiket.com
```

### Backup and rollback

```bash
stamp=$(date +%Y%m%d-%H%M%S)
tar -czf "/var/backups/vaiket-blog-$stamp.tgz" content/articles content/editorial-history content/content-inventory.json content/provider-directory-india.md .env
pm2 describe vaiket-blog
pm2 logs vaiket-blog --lines 100
```

Before switching traffic, keep the previous release and PM2 process available. If health checks fail, restore the previous Nginx upstream, reload Nginx, and stop only the new `vaiket-blog` process; retain the backup and logs for investigation.

## Release blockers

- No production token or VPS/PM2/Nginx access was supplied.
- No human editorial approvals exist for the 96 private drafts.
- Search Console ownership and indexing are not verified.
- Browser automation connector was unavailable in this environment; local HTTP/build checks were completed, but visual and keyboard QA still needs a supported browser run.
