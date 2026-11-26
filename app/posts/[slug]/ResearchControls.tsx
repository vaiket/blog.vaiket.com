'use client'

import { useEffect, useRef, useState } from 'react'
import type { ResearchHeading } from '../../../lib/research-article'

export function ResearchControls({ headings }: { headings: ResearchHeading[] }) {
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const tocRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => { if (window.matchMedia('(max-width: 950px)').matches && tocRef.current) tocRef.current.open = false }, [])

  useEffect(() => {
    const nodes = headings.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    let frame = 0
    const update = () => {
      frame = 0
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setProgress(Math.min(100, Math.round((window.scrollY / max) * 100)))
      setShowTop(window.scrollY > 700)
      let current = nodes[0]?.id || ''
      for (const node of nodes) if (node.getBoundingClientRect().top <= 150) current = node.id
      setActive(current)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame) }
  }, [headings])

  const groups: { major: ResearchHeading; children: ResearchHeading[] }[] = []
  for (const heading of headings) {
    if (heading.depth === 2) groups.push({ major: heading, children: [] })
    else if (groups.length) groups[groups.length - 1].children.push(heading)
  }

  return <>
    <div className="research-progress" role="progressbar" aria-label="Reading progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div>
    <details ref={tocRef} className="research-toc" open><summary>On this page <span>{progress}% read</span></summary><nav aria-label="Article sections">
      {groups.map(({ major, children }) => <details key={major.id} open className="research-toc-group"><summary><a href={`#${major.id}`} className={active === major.id ? 'active' : ''} onClick={event => event.stopPropagation()}>{major.text}</a></summary><div>{children.map(item => <a key={item.id} href={`#${item.id}`} className={`${active === item.id ? 'active' : ''} depth-${item.depth}`}>{item.text}</a>)}</div></details>)}
    </nav></details>
    {showTop && <button className="research-back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>}
  </>
}

export function CopySectionLink({ id }: { id: string }) {
  const [copied, setCopied] = useState(false)
  return <button className="copy-section-link" aria-label="Copy section link" title={copied ? 'Copied' : 'Copy section link'} onClick={async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`); setCopied(true); window.setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) }
  }}>{copied ? '✓' : '#'}</button>
}

export function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return <button className="copy-code" onClick={async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) }
  }}>{copied ? 'Copied' : 'Copy code'}</button>
}
