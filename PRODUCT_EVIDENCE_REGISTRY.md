# Vaiket product evidence registry

Snapshot: 25 November 2026. This registry separates public evidence from vendor-reported claims. It is not a benchmark, ranking or guarantee.

## Verified in public documentation

| Capability | Evidence | Editorial treatment |
|---|---|---|
| WhatsApp and CRM APIs | [Vaiket API docs](https://app.vaiket.com/docs) | Public API documentation is available. |
| Accounts, contacts, conversations and message history | [API reference](https://app.vaiket.com/docs) | Documented read endpoints; test credentials were not used. |
| Analytics, templates and sending | [API reference](https://app.vaiket.com/docs) | Documented API surface; throughput and delivery were not independently tested. |
| Idempotency, pagination, rate limits and lifecycle guidance | [API reference](https://app.vaiket.com/docs) | Treat limits as documentation claims and verify against a current account. |
| CRM lead/form APIs | [CRM API docs](https://app.vaiket.com/docs) | Documented create/read flow; no production workflow benchmark. |
| Current public WhatsApp pricing page | [Vaiket India pricing](https://www.vaiket.com/in/pricing) | Starter Free, Grow ₹2,999/month + GST and Advanced ₹4,999/month + GST were visible at snapshot. Confirm at checkout. |

## Vendor-reported or requiring confirmation

- The WhatsApp product page describes shared inboxes, campaigns, catalogues, AI chatbot/human handoff and verified sender profiles: [vaiket.com/product/whatsapp](https://www.vaiket.com/product/whatsapp). These are product-page claims, not independent test results.
- The product page also showed a different pricing snapshot (₹2,359 / ₹5,899 / ₹11,799). This conflicts with the current India pricing page. Articles must link the current page and avoid presenting a single price as permanent.
- The product page displays “5000+ businesses” and “99.8% delivery rate”. These are unsupported vendor-reported claims for editorial purposes and must not be presented as independently verified statistics.
- `developers.vaiket.com` was inaccessible during the research pass. The public app docs remain the available API reference.
- Voice AI, RCS, Agentic AI, carrier routing, SLAs, benchmark performance and live availability were not verified from public primary documentation in this pass. Mark them as vision, planned or unknown unless new evidence is supplied.

## Evidence policy

Every product statement in a comparison must cite a public page and include a verification date. Pricing, limits and availability are time-sensitive. No fake rankings, customer counts, performance claims, partnerships or testimonials may be added.
