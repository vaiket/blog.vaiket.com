import type { Metadata } from 'next'
import ProviderDirectory from './ProviderDirectory'
import { getProviderDirectory } from '../../../../lib/provider-directory'

export const metadata: Metadata = {
  title: 'India Business Communication Provider Directory | Vaiket',
  description: 'A selected, unranked directory of India-relevant WhatsApp, CPaaS, RCS, voice AI and business communication providers with public source links.',
  robots: { index: false, follow: false },
}

export default function IndiaProviderDirectoryPage() {
  const directory = getProviderDirectory()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'India business communication provider directory',
    description: 'A selected, unranked and incomplete research directory.',
    isPartOf: { '@type': 'WebSite', name: 'Vaiket Blog', url: 'https://blog.vaiket.com/' },
    dateModified: directory.snapshotDate,
  }
  return <main className="provider-page">
    <header className="provider-header"><a href="/" className="provider-brand"><span className="provider-logo">V</span><span>Vaiket</span></a><a href="/posts">Blog</a></header>
    <div className="provider-shell"><nav className="provider-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/posts">Blog</a><span>›</span><span>Provider directory</span></nav>
      <div className="provider-intro"><span className="provider-pill">Draft research directory</span><h1>India business communication provider directory</h1><p>Selected providers and brands relevant to WhatsApp Business API, AI voice, RCS, CPaaS and MSME automation.</p><div className="provider-disclosure"><strong>Editorial disclosure:</strong> This is an unranked and incomplete research edition, not a list of the 1,000 largest companies. Descriptions are provider-reported public information; no live product test, ranking, endorsement or partnership is implied. Verify current availability, contracts, pricing, legal entity and India coverage before purchase.</div></div>
      <ProviderDirectory providers={directory.providers} />
      <section className="provider-methodology"><h2>Coverage and methodology</h2><p>The initial directory contains {directory.providers.length} provider brands with public source links. A LinkedIn link is shown only when one was surfaced in the supplied research file; it is not an independent verification. Providers may be international, brands may belong to larger groups, and brands should not be counted as distinct legal entities without corporate verification.</p><p>For corrections or inclusion requests, provide an official website, legal or parent-entity context, relevant India availability and primary product documentation. Inclusion is not conditional on a reciprocal link.</p></section>
      <nav className="provider-related" aria-label="Related Vaiket research"><strong>Related Vaiket research</strong><a href="/posts/india-business-communication-platforms">India business communication ecosystem guide</a><a href="/posts/ai-telecalling-in-india">AI telecalling in India</a><a href="/posts/top-it-companies-ai-startups-technology-institutes-ranchi">Ranchi technology ecosystem</a></nav>
    </div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
  </main>
}
