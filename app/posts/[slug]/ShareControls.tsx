'use client'

import { useEffect, useState } from 'react'

export default function ShareControls({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  useEffect(() => { setCanNativeShare('share' in navigator) }, [])
  const share = async (network: string) => {
    const url = window.location.href
    if (network === 'copy') {
      await navigator.clipboard?.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
      return
    }
    if (network === 'native' && navigator.share) return navigator.share({ title, url })
    const links: Record<string, string> = { linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` }
    window.open(links[network], '_blank', 'noopener,noreferrer,width=680,height=560')
  }
  return <div className="share-controls" aria-label="Share article"><button onClick={() => share('copy')} aria-label="Copy article link">{copied ? '✓' : '↗'}</button><button onClick={() => share('linkedin')} aria-label="Share on LinkedIn">in</button><button onClick={() => share('x')} aria-label="Share on X">𝕏</button><button onClick={() => share('whatsapp')} aria-label="Share on WhatsApp">◔</button>{canNativeShare && <button onClick={() => share('native')} aria-label="Share using device">•••</button>}</div>
}
