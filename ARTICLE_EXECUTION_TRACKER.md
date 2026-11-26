# Article execution tracker

Last updated: 2026-11-26

The canonical tracker is `content/content-inventory.json`. This file records the current phase and blockers without claiming unfinished work is complete.

## Final content freeze — 26 November 2026

- Article generation is closed. Batch 7 has not started and no new article generation is authorized.
- Preserved programme: 105 actual article records out of 300; 195 topics remain planned backlog only.
- Publication state: 9 published articles, 96 private Markdown drafts, 0 editorial approvals.
- The editorial queue now covers all 96 private drafts; planned topics and published/static records are excluded.
- Public discovery is published-only: drafts are excluded from All Posts, category pages, search results and sitemap until the existing approval gate publishes them.

## Phase 3 checkpoint

- Planned programme: 300 articles
- Inventory records: 65 records (55 previous records + 10 actual Phase 6 Batch 3 articles) plus a generated 300-topic national programme in `content/national-topic-programme.ts`
- Existing published long-form research: 2
- Existing draft long-form research: 1
- Priority topics with completed research: 25 (Batches 1–5; editorial review pending)
- Priority topics awaiting research: 0
- Admin/CMS workflow: local token-gated editorial console at `/admin`; publishing requires `editorial approved`
- Provider directory: expanded from 25 to a 100+ row evidence-led, unranked research table; entries remain subject to editorial verification
- Product evidence: captured in `PRODUCT_EVIDENCE_REGISTRY.md`; vendor claims and pricing conflicts are labelled
- Calculator QA: formulas, source links and input boundary handling documented in `CALCULATOR_VALIDATION_REPORT.md`
- Search research: current query patterns and content gaps documented in `COMPETITIVE_SEARCH_RESEARCH.md`

## Phase 7 checkpoint — 26 November 2026

- Planned programme: 300 articles
- Completed content records: 105 (98 Markdown articles plus 7 static homepage articles); 195 programme topics remain as planned work
- Publication state: 9 published, 0 editorial approvals, 96 private Markdown drafts
- Phase 7 Batch 4: 20 new source-linked drafts added across WhatsApp, AI Telecalling, RCS, Agentic AI, comparisons, industry solutions, commerce, developers and MSME operations
- Canonical content audit after Batch 6 quality pass: 98 Markdown files, 98 unique slugs, 108,301 body words, 826 external-reference occurrences, zero integrity errors
- Editorial queue: `/admin` remains token-gated and approval-gated; no new article was auto-approved, auto-published or deployed
- Freeze checkpoint: Batch 7 is deliberately not started; the next action is editorial review of the preserved drafts, not article generation.
- Quality continuation: all 20 Batch 4 drafts received intent-specific expansion covering implementation, exceptions, measurement, buyer questions and limitations; one earlier CPaaS observability draft was also expanded. They remain drafts, not approval-ready by default.
- Batch 4 post-expansion range: 318–684 words, average 406.8 words. These compact pieces still require editor judgement for flagship depth; no word-count target is being treated as proof of comprehensiveness.

## Completed batch 1

- Best WhatsApp Business API Providers in India
- WhatsApp Business API Pricing in India
- Best AiSensy Alternatives in India
- Best Wati Alternatives in India
- Best AI Telecalling Software in India

All five are source-linked drafts. They are not in the public sitemap until editorial review and publication approval.

## Phase 3 implementation status

- Editorial auth and private draft preview implemented locally.
- Optional analytics and search-console verification hooks are environment-driven and disabled when unset.
- No draft was auto-published and no production deployment was performed.
- Remaining gate: human editorial review of each draft, link verification at publication time, and a production environment secret for the admin console.

## Phase 4 checkpoint

- Baseline before Phase 5: 28 research Markdown files, 2 published research files, 26 drafts, 0 approved, 80,485 body words, 209 unique external URLs, 119 evidence-linked provider rows.
- Phase 5 enrichment and two actual batches: all 25 priority drafts received query-specific sections (+2,870 words), and 20 additional source-linked research drafts were added (+4,474 words); current corpus is 87,829 words and 213 unique external URLs. All remain pending editorial approval.
- 25 priority drafts audited individually in `ARTICLE_QUALITY_AUDIT_PHASE4.md`; all remain pending editorial approval.
- Keyword-to-URL map, six product landing pages, conversion destinations and Search Console instructions added.
- Editorial security hardening, provider audit and production release plan added.
- No production deployment, indexing request or public draft publication performed.

## Phase 5 Batch 1 — actual articles

- WhatsApp API Webhooks and Idempotency in India
- WhatsApp Template Quality and Approval in India
- WhatsApp CRM Integration for Indian MSMEs
- AI Telecalling Compliance Checklist for India
- How to Evaluate Hindi AI Voice Agents in India
- RCS Fallback Design for Indian Business Messaging
- Agentic AI Guardrails for Indian Business Workflows
- CPaaS API Observability for Indian Communication Systems
- MSME Automation Readiness Checklist for India
- Generative Commerce Product Truth for Indian Retail

All ten are real source-linked drafts with unique slugs, metadata, internal links and `editorial review pending` status. They are excluded from public discovery until approved.

## Phase 5 Batch 2 — actual articles

- WhatsApp Business API Rate Limits and Queue Design in India
- WhatsApp Opt-Out and Suppression Design for Indian Businesses
- WhatsApp Business API for Education in India
- AI Calling Voice Latency and Turn-Taking in India
- AI Calling CRM Webhooks for Indian Sales Teams
- RCS Rich Card Design for Indian Customer Journeys
- Agentic AI Evaluation Dataset for Indian Business Workflows
- Business Communication Data Retention for Indian Teams
- MSME Automation ROI Methodology for India
- Cloud Contact Centre Architecture for Indian Businesses

These ten are also source-linked drafts and remain private pending the same editorial, legal and product-evidence review.

## Phase 6 Batch 3 — actual articles

- WhatsApp Message Template Governance in India
- WhatsApp Business API Onboarding for Indian Startups
- AI Telecalling Human Handoff in India
- AI Voice Recording and Consent in India
- RCS Business Messaging Agent Verification in India
- RCS Campaign Analytics in India
- Agentic AI Approval Gates for Indian Business Workflows
- CPaaS Migration and Exit Planning in India
- MSME Automation Change Management in India
- Communication API Secrets and Webhook Security for Indian Teams

These ten are independently researched source-linked drafts with unique search intent, technical controls and disclosures. They remain private pending editorial, legal and product review.

## Completed batches 2–5

### Batch 2

- AI Calling Cost Per Minute in India
- Best RCS Business Messaging Providers in India
- Vaiket vs AiSensy
- Vaiket vs Wati
- Best Business Automation Software for Indian MSMEs

### Batch 3

- How to Get WhatsApp Business API in India
- Free WhatsApp Business API: What Is Actually Free?
- How to Migrate from AiSensy
- How to Migrate from Wati
- Best WhatsApp Marketing Software in India

### Batch 4

- Best AI Voice Agents for Indian Businesses
- WhatsApp vs RCS vs SMS vs AI Calling
- Best Cloud Telephony Providers in India
- Best SIP Trunk Providers in India
- Best CPaaS Platforms in India

### Batch 5

- Best AI Chatbot Platforms for Businesses
- How to Automate Sales Using AI
- Best Hindi AI Voice Agents in India
- Generative Commerce in India
- Best AI Business OS for Indian Businesses

All twenty are complete source-linked draft bodies with unique metadata, internal links and research disclosures. They remain subject to editorial, legal, product and source review.

## Continuation checkpoint

The priority article bodies now have a functional approval queue at `/admin` with word count, sources, product-evidence URLs, unresolved-claim flags, legal flags and a full Markdown preview. The queue classifies articles for owner review; it does not approve them. The current Phase 7 checkpoint is 105 completed records out of 300, with 195 planned topics remaining; the next batch must preserve the same source-linked, evidence-aware standard.

## Phase 7 Batch 6 — actual articles

- WhatsApp Business API for Insurance Claims in India: Status, Documents and Human Support
- WhatsApp Business API for Indian Local Services: Lead Capture and Booking Workflow
- AI Voice Agent Support QA in India: Accuracy, Handoff and Call Review
- AI Voice Agent Cost Model in India: Minutes, Transfers and Operations
- RCS Business Messaging for Indian Banking: Alerts, Support and Fallback
- Agentic AI Workflow Design for Indian Businesses: Plans, Tools and Human Control
- Gupshup vs MSG91 in India: WhatsApp API Evaluation Framework
- WhatsApp Renewal Workflows in India: Reminders, Consent and Human Escalation
- Generative Commerce Product Discovery in India: Catalogue Truth Before Recommendations
- Communication API Data Export in India: Portability, Audit and Migration Design

All ten are private source-linked drafts with unique slugs and internal links. Their body-word range is 360–426 words, average 385.1 words; they require editor depth review before being treated as flagship publications.

## Phase 7 Batch 6 article-wise counts

| Slug | Body words |
|---|---:|
| `agentic-ai-workflow-design-india` | 384 |
| `ai-voice-agent-cost-model-india` | 385 |
| `ai-voice-agent-support-qa-india` | 391 |
| `api-data-export-communication-platforms-india` | 367 |
| `generative-commerce-product-discovery-india` | 377 |
| `gupshup-vs-msg91-india` | 361 |
| `rcs-banking-notifications-india` | 360 |
| `whatsapp-api-insurance-claims-india` | 426 |
| `whatsapp-api-local-services-leads-india` | 419 |
| `whatsapp-renewal-workflows-india` | 381 |

## Phase 7 Batch 5 — actual articles

- WhatsApp Business API for Indian Financial Services: Controlled Customer Communication
- AI Telecalling for Collections in India: Guardrails Before Automation
- Multilingual AI Telecalling in India: Language Routing and Human Handoff
- RCS Business Messaging for Travel in India: Booking and Disruption Workflows
- RCS Business Messaging for Indian Education: Admissions and Student Support
- Agentic AI Permissions for Indian Businesses: Tool Access and Approval Gates
- Business Communication Provider Support Models in India: How to Evaluate Them
- WhatsApp Field Service Automation in India: Dispatch, Updates and Escalation
- Communication Webhook Replay Security in India: Signatures, Idempotency and Recovery
- MSME Process Mapping for Automation in India: From Manual Work to Safe Pilots

All ten are source-linked private drafts with distinct search intent, internal links and evidence boundaries. They are not editorially approved or published.

## Phase 7 quality audit — Batch 4 article-wise counts

| Slug | Body words |
|---|---:|
| `agentic-ai-human-review-support-india` | 350 |
| `agentic-ai-observability-india` | 385 |
| `ai-lead-qualification-real-estate-india` | 373 |
| `ai-telecalling-qa-scorecard-india` | 460 |
| `ai-telecalling-sales-call-flow-india` | 436 |
| `aisensy-vs-wati-india` | 375 |
| `api-identity-multitenant-communication-india` | 374 |
| `automation-vendor-evaluation-india` | 404 |
| `conversational-checkout-d2c-india` | 368 |
| `exotel-vs-myoperator-cloud-telephony` | 330 |
| `generative-commerce-catalogue-operations-india` | 358 |
| `rcs-billing-questions-india` | 389 |
| `rcs-consent-retail-india` | 370 |
| `voice-ai-support-call-routing-india` | 386 |
| `whatsapp-api-health-monitoring-india` | 684 |
| `whatsapp-api-healthcare-notifications-india` | 426 |
| `whatsapp-api-media-message-delivery-india` | 502 |
| `whatsapp-api-templates-retail-india` | 511 |
| `whatsapp-appointment-reminders-healthcare-india` | 318 |
| `whatsapp-order-updates-retail-india` | 337 |

## Phase 7 Batch 5 article-wise counts

| Slug | Body words |
|---|---:|
| `agentic-ai-permissions-india` | 403 |
| `ai-telecalling-collections-compliance-india` | 516 |
| `ai-telecalling-multilingual-routing-india` | 418 |
| `msme-process-mapping-automation-india` | 474 |
| `provider-support-models-india` | 379 |
| `rcs-education-admissions-india` | 399 |
| `rcs-travel-notifications-india` | 408 |
| `webhook-replay-security-india` | 394 |
| `whatsapp-api-financial-services-india` | 500 |
| `whatsapp-field-service-india` | 359 |
