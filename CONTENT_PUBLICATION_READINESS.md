# Phase 3 publication readiness

Snapshot: 25 November 2026.

| Gate | Status | Notes |
|---|---|---|
| 25 priority drafts have bodies | PASS | Batches 1–5 are present in `content/articles`. |
| Draft routes are private | PASS | Unauthenticated draft requests return not found; editorial preview requires `EDITORIAL_ADMIN_TOKEN`. |
| Drafts excluded from All Posts and sitemap | PASS | Only published records are public. |
| Source registry and disclosures | PASS WITH REVIEW | Primary links and known inaccessible sources are documented. |
| Product evidence | PASS WITH REVIEW | Live public docs captured; vendor claims are labelled. |
| Editorial approval | NOT COMPLETE | No draft should be published until a human editor approves title, claims, links, freshness and legal/compliance language. |
| Production deployment | NOT REQUESTED | Local implementation only; no deployment performed. |

The publishing API enforces `reviewStatus: editorial approved` before it can change a draft to `published`. No article was auto-published in this phase.
