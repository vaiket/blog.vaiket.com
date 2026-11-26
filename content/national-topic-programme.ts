export type ProgrammeTopic = {
  id: string
  title: string
  slug: string
  category: string
  searchIntent: 'informational' | 'commercial investigation'
  status: 'planned'
  publicationStatus: 'not created'
}

// Final content freeze: this module is backlog-only. No generation job should
// consume or turn planned topics into article files without a future restart decision.

const groups: Array<[string, number, string[], string[]]> = [
  ['WhatsApp Business API', 60, ['onboarding', 'pricing and billing', 'templates', 'webhooks', 'CRM integration', 'consent and governance'], ['for Indian MSMEs', 'for retail teams', 'for education teams', 'for healthcare operations', 'for financial services']],
  ['AI Telecalling and Voice AI', 50, ['call flows', 'language support', 'cost modelling', 'SIP and routing', 'quality assurance', 'human handoff'], ['in India', 'for sales teams', 'for support teams', 'for collections teams', 'for service businesses']],
  ['RCS Business Messaging', 35, ['rich cards', 'agent verification', 'fallback design', 'campaign measurement', 'billing questions', 'consent'], ['in India', 'for retail', 'for banks', 'for travel', 'for education']],
  ['Agentic AI and Automation', 40, ['workflow design', 'permissions', 'observability', 'evaluation', 'guardrails', 'human review'], ['for Indian businesses', 'for MSMEs', 'for customer support', 'for sales operations', 'for commerce']],
  ['Competitor Comparisons', 30, ['platform selection', 'migration planning', 'API capability', 'team inboxes', 'automation depth', 'support models'], ['for Indian buyers', 'for growing teams', 'for developers', 'for operations leaders', 'for regulated workflows']],
  ['Industry Solutions', 35, ['lead qualification', 'appointment reminders', 'order updates', 'customer support', 'field service', 'renewal workflows'], ['for Indian retail', 'for healthcare', 'for education', 'for real estate', 'for local services']],
  ['Generative Commerce', 20, ['product discovery', 'catalogue operations', 'recommendations', 'conversational checkout', 'post-purchase support'], ['in India', 'for D2C brands', 'for marketplaces', 'for retailers']],
  ['Cloud and Developer Technologies', 15, ['API architecture', 'webhooks', 'identity', 'reliability', 'data export'], ['for communication platforms', 'for SaaS teams', 'for Indian developers']],
  ['MSME and Business Growth', 15, ['automation readiness', 'ROI modelling', 'process mapping', 'team adoption', 'vendor evaluation'], ['for Indian MSMEs', 'for founders', 'for service businesses']],
]

export function getNationalProgramme(): ProgrammeTopic[] {
  const topics: ProgrammeTopic[] = []
  let id = 1
  for (const [category, count, themes, audiences] of groups) {
    for (let index = 0; index < count; index += 1) {
      const theme = themes[index % themes.length]
      const audience = audiences[Math.floor(index / themes.length) % audiences.length]
      const title = `${category}: ${theme} ${audience}`
      const slug = `${category}-${theme}-${audience}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + `-${String(index + 1).padStart(3, '0')}`
      topics.push({ id: `programme-${String(id).padStart(3, '0')}`, title, slug, category, searchIntent: category === 'Competitor Comparisons' ? 'commercial investigation' : 'informational', status: 'planned', publicationStatus: 'not created' })
      id += 1
    }
  }
  return topics
}

export const programmeDistribution = Object.fromEntries(groups.map(([category, count]) => [category, count]))
