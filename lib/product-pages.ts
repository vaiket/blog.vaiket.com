export type ProductPage = {
  slug: string
  title: string
  eyebrow: string
  description: string
  status: 'documented' | 'availability-confirmation' | 'upcoming'
  benefits: string[]
  useCases: string[]
  links: Array<{ label: string; href: string; external?: boolean }>
  related: string[]
}

export const productPages: ProductPage[] = [
  {
    slug: 'whatsapp-business-api', title: 'WhatsApp Business API', eyebrow: 'Documented Vaiket capability',
    description: 'Connect WhatsApp conversations with team workflows, templates, campaigns, customer records and developer integrations. Confirm current plan, number and channel availability before implementation.',
    status: 'documented', benefits: ['Shared business conversations and team workflows', 'Template, campaign and message operations', 'API access for accounts, contacts, conversations and CRM flows'],
    useCases: ['Lead qualification and assignment', 'Customer support with human handoff', 'Order, appointment and service notifications'],
    links: [{ label: 'Explore Vaiket WhatsApp', href: 'https://www.vaiket.com/product/whatsapp', external: true }, { label: 'View current pricing', href: 'https://www.vaiket.com/in/pricing', external: true }, { label: 'Read API documentation', href: 'https://app.vaiket.com/docs', external: true }],
    related: ['whatsapp-business-api-future-of-business-communication', 'india-business-communication-platforms'],
  },
  {
    slug: 'ai-telecalling', title: 'AI Telecalling', eyebrow: 'Availability confirmation required',
    description: 'Research and evaluate voice-AI workflows across telecom routing, speech, automation, transfer and human review. Vaiket availability, routes, languages and pricing must be confirmed for the specific deployment.',
    status: 'availability-confirmation', benefits: ['Bounded call workflows connected to business context', 'Human transfer and stop conditions', 'Cost and capacity modelling before rollout'],
    useCases: ['Requested callbacks and lead qualification', 'Appointment reminders and service calls', 'Support triage with escalation'],
    links: [{ label: 'Read AI telecalling research', href: '/posts/ai-telecalling-in-india' }, { label: 'Review current Vaiket pricing', href: 'https://www.vaiket.com/in/pricing', external: true }],
    related: ['ai-telecalling-in-india', 'india-business-communication-platforms'],
  },
  {
    slug: 'rcs-business-messaging', title: 'RCS Business Messaging', eyebrow: 'Availability confirmation required',
    description: 'Understand rich cards, verified agents, fallback, consent and provider selection for RCS in India. This page is a research guide; it does not imply a live Vaiket RCS route.',
    status: 'availability-confirmation', benefits: ['Rich, interactive business messaging', 'Channel fallback and consent planning', 'Provider and verification evaluation framework'],
    useCases: ['Product discovery and promotions', 'Travel, education and service notifications', 'Support journeys with structured actions'],
    links: [{ label: 'Read the India communication research', href: '/posts/india-business-communication-platforms' }, { label: 'Review Google RCS guidance', href: 'https://developers.google.com/business-communications/rcs-business-messaging/', external: true }],
    related: ['india-business-communication-platforms', 'whatsapp-business-api-future-of-business-communication'],
  },
  {
    slug: 'business-automation', title: 'Business Automation', eyebrow: 'Documented workflow direction',
    description: 'Design measurable workflows that connect conversations, CRM records, approvals, notifications and team handoffs. Start with one operational bottleneck and retain human control over sensitive actions.',
    status: 'documented', benefits: ['Reusable workflow and approval patterns', 'Connected customer and operational context', 'Transparent measurement and exception handling'],
    useCases: ['Lead routing and follow-up', 'Support triage and escalation', 'Notifications and internal task automation'],
    links: [{ label: 'Read the business communication research', href: '/posts/india-business-communication-platforms' }, { label: 'Read Vaiket API docs', href: 'https://app.vaiket.com/docs', external: true }],
    related: ['the-rise-of-agentic-ai', 'india-business-communication-platforms'],
  },
  {
    slug: 'agentic-ai', title: 'Agentic AI', eyebrow: 'Research and future capability',
    description: 'Explore agentic workflows with permissions, tool boundaries, observability and human review. This page describes a product direction and research framework, not an independently verified autonomous production claim.',
    status: 'upcoming', benefits: ['Goal-oriented workflow planning', 'Permissioned tool use and stop conditions', 'Auditable handoffs and evaluation'],
    useCases: ['Multi-step lead operations', 'Contextual support and knowledge retrieval', 'Commerce workflows with approval checkpoints'],
    links: [{ label: 'Read the Agentic AI research', href: '/posts/the-rise-of-agentic-ai' }, { label: 'Explore business automation', href: '/product/business-automation' }],
    related: ['the-rise-of-agentic-ai', 'whatsapp-business-api-future-of-business-communication'],
  },
  {
    slug: 'developer-apis', title: 'Developer APIs', eyebrow: 'Public documentation available',
    description: 'Use documented Vaiket API surfaces for account, contact, conversation, message, analytics, template and CRM operations. Keep API keys server-side and verify current rate limits and lifecycle terms.',
    status: 'documented', benefits: ['Server-side bearer API key pattern', 'Messaging and conversation data access', 'CRM lead and form integration surfaces'],
    useCases: ['Connect an existing CRM or helpdesk', 'Build internal workflow orchestration', 'Create reporting and operational dashboards'],
    links: [{ label: 'Open API documentation', href: 'https://app.vaiket.com/docs', external: true }, { label: 'Read API architecture research', href: '/posts/india-business-communication-platforms' }],
    related: ['india-business-communication-platforms', 'whatsapp-business-api-future-of-business-communication'],
  },
]

export function getProductPage(slug: string) { return productPages.find(page => page.slug === slug) }
