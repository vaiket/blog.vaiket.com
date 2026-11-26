'use client'

import { useEffect, useState } from 'react'

export default function MermaidDiagram({ code, index }: { code: string; index: number }) {
  const [image, setImage] = useState('')
  useEffect(() => {
    let cancelled = false
    import('mermaid').then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral' })
      const { svg } = await mermaid.render(`research-diagram-${index}`, code)
      if (!cancelled) setImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`)
    }).catch(() => { /* The source remains available as a readable fallback. */ })
    return () => { cancelled = true }
  }, [code, index])
  return <figure className="research-mermaid">{image ? <img src={image} alt={`Architecture diagram ${index + 1}`} /> : <pre><code>{code}</code></pre>}<figcaption>Architecture diagram from the research article</figcaption></figure>
}
