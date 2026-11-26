# SEO audit report

## Implemented

- Metadata and canonical handling for published research articles.
- `TechArticle` and `BreadcrumbList` JSON-LD for published research pages.
- Sitemap inclusion based on `published` status and publication date.
- Draft research pages use `noindex, nofollow` and are excluded from the sitemap.
- Existing `/posts/[slug]` article URLs preserved.
- `/posts` now supports shareable query state for search, category and sort controls.
- Non-empty category landing pages use dynamic `/category/[category]` routes with canonical metadata and CollectionPage JSON-LD.
- `robots.txt` is generated and keeps the draft provider directory out of crawling.
- Provider directory uses `noindex, nofollow` and has no aggregate ratings or ranking schema.
- Public source links use external-link safety attributes.

## Outstanding

- Search Console data is not connected.
- No analytics-backed popularity sorting is implemented.
- No admin-controlled canonical/redirect UI exists.
- Full accessibility and performance audits still require a browser/Lighthouse pass.
