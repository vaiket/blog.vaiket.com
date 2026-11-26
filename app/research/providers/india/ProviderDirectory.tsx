'use client'

import { useMemo, useState } from 'react'
import type { ProviderRecord } from '../../../../lib/provider-directory'
import './providers.css'

export default function ProviderDirectory({ providers }: { providers: ProviderRecord[] }) {
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState('All segments')
  const segments = ['All segments', ...Array.from(new Set(providers.map(provider => provider.segment))).sort()]
  const filtered = useMemo(() => providers.filter(provider => {
    const haystack = `${provider.name} ${provider.segment} ${provider.evaluation}`.toLowerCase()
    return (segment === 'All segments' || provider.segment === segment) && haystack.includes(query.toLowerCase())
  }), [providers, query, segment])

  return <div className="provider-directory-app">
    <div className="provider-directory-toolbar">
      <label className="provider-search"><span aria-hidden="true">⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search providers, segments or capabilities" aria-label="Search providers" /></label>
      <label className="provider-filter"><span>Segment</span><select value={segment} onChange={event => setSegment(event.target.value)} aria-label="Filter by segment">{segments.map(item => <option key={item}>{item}</option>)}</select></label>
    </div>
    <p className="provider-result-count">Showing {filtered.length} of {providers.length} selected provider brands</p>
    <div className="provider-cards">{filtered.map(provider => <article className="provider-card" key={provider.name}>
      <div className="provider-card-head"><div><h2>{provider.name}</h2><span>{provider.segment}</span></div><span className="provider-status">{provider.verificationStatus}</span></div>
      <p>{provider.evaluation}</p>
      <div className="provider-links">{provider.sources.map(link => <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}>{link.label}</a>)}{provider.linkedinUrl && <a href={provider.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn page surfaced</a>}</div>
      <footer>Source review date: {provider.reviewDate}</footer>
    </article>)}</div>
    {!filtered.length && <p className="provider-empty">No provider matches this search.</p>}
  </div>
}
