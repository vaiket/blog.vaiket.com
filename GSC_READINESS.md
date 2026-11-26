# Google Search Console readiness

## Implemented locally

- `app/sitemap.ts` emits only published posts, public categories, product landing pages and the home/posts URLs.
- `app/robots.ts` points crawlers to `https://blog.vaiket.com/sitemap.xml` and disallows admin/API/provider directory utility paths.
- Published article and product pages emit canonical URLs, Open Graph metadata and JSON-LD where appropriate.
- Optional `NEXT_PUBLIC_GSC_VERIFICATION` and `NEXT_PUBLIC_BING_VERIFICATION` environment values are supported. Empty values disable verification tags.

## Manual setup required

1. In Google Search Console, add a **Domain property** for `vaiket.com` using the DNS TXT verification method at the registrar/DNS provider.
2. Add or select the `blog.vaiket.com` URL-prefix view only if page-level inspection is useful; the Domain property is the source of truth.
3. Submit `https://blog.vaiket.com/sitemap.xml` under **Sitemaps**.
4. Use **URL inspection** for a small approved set of published URLs. Request indexing only after the page is approved, reachable and canonical.
5. Review **Pages** for indexed, crawled-not-indexed and blocked-by-robots states. Do not treat a noindex draft as a defect.
6. Use **Performance** to monitor queries, clicks, impressions, CTR and average position after data accumulates. No ranking or indexing claim is made by this repository.
7. Connect an authorized analytics property by setting `NEXT_PUBLIC_GA_MEASUREMENT_ID`; never commit the measurement secret or a service-account key.

Search Console credentials were not available, so domain ownership, sitemap submission and indexing status remain unverified external steps.
