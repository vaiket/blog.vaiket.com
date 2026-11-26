import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import { getResearchArticle, INDIA_SLUG, RANCHI_SLUG, RESEARCH_SLUG, remarkResearchAnchors } from '../../../lib/research-article'
import { CopyCode, CopySectionLink, ResearchControls } from './ResearchControls'
import MermaidDiagram from './MermaidDiagram'
import ResearchCalculator from './ResearchCalculator'
import ResearchTools, { type ResearchToolKind } from './ResearchTools'
import ShareControls from './ShareControls'
import './research.css'

const conversionByCategory: Record<string, { label: string; href: string; external?: boolean }> = {
  WhatsApp: { label: 'Explore WhatsApp Business API', href: '/product/whatsapp-business-api' },
  'AI Telecalling': { label: 'Explore AI telecalling research', href: '/product/ai-telecalling' },
  RCS: { label: 'Explore RCS Business Messaging', href: '/product/rcs-business-messaging' },
  Comparisons: { label: 'Explore Vaiket options', href: 'https://www.vaiket.com/in/pricing', external: true },
  MSME: { label: 'Explore business automation', href: '/product/business-automation' },
  Cloud: { label: 'Read developer documentation', href: '/product/developer-apis' },
  Research: { label: 'Explore Vaiket research', href: '/product/business-automation' },
  'Artificial Intelligence': { label: 'Explore Agentic AI research', href: '/product/agentic-ai' },
}

function Heading({ level, id, children }: { level: number; id: string; children: ReactNode }) {
  const heading = <>{children}<a className="research-heading-anchor" href={`#${id}`} aria-label="Link to section">#</a><CopySectionLink id={id} /></>
  if (level === 2) return <h2 id={id}>{heading}</h2>
  if (level === 3) return <h3 id={id}>{heading}</h3>
  if (level === 4) return <h4 id={id}>{heading}</h4>
  if (level === 5) return <h5 id={id}>{heading}</h5>
  return <h6 id={id}>{heading}</h6>
}

export default function ResearchArticle({ slug = RESEARCH_SLUG }: { slug?: string }) {
  const article = getResearchArticle(slug)
  const isRanchi = article.slug === RANCHI_SLUG
  const isIndia = article.slug === INDIA_SLUG
  const cutoffLabel = new Date(`${article.researchCutoff}T00:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })
  let diagramIndex = 0
  const referenceCount = article.referenceCount
  const conversion = conversionByCategory[article.category]
  const toolBySlug: Partial<Record<string, ResearchToolKind>> = {
    'whatsapp-business-api-pricing-india': 'whatsapp-pricing', 'ai-calling-cost-india': 'ai-calling', 'best-rcs-business-messaging-providers-india': 'rcs-budget', 'vaiket-vs-aisensy': 'provider-compare', 'vaiket-vs-wati': 'provider-compare', 'best-business-automation-software-indian-msmes': 'automation-roi', 'best-sip-trunk-providers-india': 'sip-capacity', 'best-cpaas-platforms-india': 'provider-compare', 'best-ai-business-os-indian-businesses': 'automation-roi'
  }
  const structuredData = article.status === 'published' && article.publishedAt ? [
    { '@context': 'https://schema.org', '@type': 'TechArticle', headline: article.title, description: article.description, image: `https://blog.vaiket.com${article.featuredImage}`, datePublished: article.publishedAt, ...(article.updatedAt ? { dateModified: article.updatedAt } : {}), author: { '@type': 'Organization', name: article.author }, publisher: { '@type': 'Organization', name: 'Vaiket' }, mainEntityOfPage: `https://blog.vaiket.com/posts/${article.slug}` },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://blog.vaiket.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://blog.vaiket.com/posts' }, { '@type': 'ListItem', position: 3, name: article.title, item: `https://blog.vaiket.com/posts/${article.slug}` }] },
  ] : null
  return <main className="article-page research-page">
    <header className="article-header"><a href="/" className="article-brand"><span className="article-logo">V</span><span>Vaiket</span></a><a className="article-blog" href="/posts">Blog</a><nav><a href="/posts">AI</a><a href="/posts">Automation</a><a href="/posts">Commerce</a><a href="/posts">WhatsApp</a><a href="/posts">Research</a><a href="/posts">Product</a><a href="/posts">Company</a></nav><a className="article-search" href="/posts" aria-label="Search articles">⌕</a><a className="article-subscribe" href="#newsletter">Subscribe</a></header>
    <ResearchControls headings={article.headings} />
    <div className="article-layout"><article className="article-main research-main"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/posts">Blog</a><span>›</span><span>{article.title}</span></nav><div className="article-tags"><span>{article.category}</span><span>{isRanchi ? 'Local Technology Research' : 'Research &amp; Engineering'}</span></div><h1>{article.title}</h1><p className="article-dek">{article.description}</p><div className="article-byline"><span className="article-avatar">V</span><strong>{article.author}</strong><span>·</span><span>{article.readingMinutes} min read</span><span>·</span>{article.status === 'published' && article.publishedAt ? <span>Published {article.publishedAt}</span> : <span className="research-draft-label">Draft preview</span>}</div><p className="research-cutoff">Research cutoff: {cutoffLabel}. Regulatory information can change; independently verify the applicable rules before commercial implementation.</p><div className="research-share"><span>Share this research</span><ShareControls title={article.title} /></div>
      <div className="research-featured-image"><Image src={article.featuredImage} alt={article.title} width={1200} height={675} priority sizes="(max-width: 820px) 100vw, 820px" /></div>{toolBySlug[article.slug] && <ResearchTools kind={toolBySlug[article.slug]!} />}<div className="research-markdown"><ReactMarkdown remarkPlugins={[remarkGfm, remarkResearchAnchors]} components={{
        h1: () => null,
        h2: ({ node, children }) => <Heading level={2} id={String(node?.properties?.id || '')}>{children}</Heading>,
        h3: ({ node, children }) => <><Heading level={3} id={String(node?.properties?.id || '')}>{children}</Heading>{String(node?.properties?.id || '') === '54-an-illustrative-inr-cost-model' && <ResearchCalculator />}</>,
        h4: ({ node, children }) => <Heading level={4} id={String(node?.properties?.id || '')}>{children}</Heading>,
        h5: ({ node, children }) => <Heading level={5} id={String(node?.properties?.id || '')}>{children}</Heading>,
        h6: ({ node, children }) => <Heading level={6} id={String(node?.properties?.id || '')}>{children}</Heading>,
        table: ({ children }) => <div className="research-table-scroll"><table>{children}</table></div>,
        a: ({ href, children }) => { const external = href?.startsWith('https://') || href?.startsWith('http://'); return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{children}</a> },
        img: ({ src, alt }) => src?.startsWith('/') ? <figure><Image src={src} alt={alt || ''} width={800} height={450} sizes="(max-width: 800px) 100vw, 800px" /><figcaption>{alt}</figcaption></figure> : <a href={src}>View source image: {alt || src}</a>,
        code: ({ className, children }) => <code className={className}>{children}</code>,
        pre: ({ children }) => { const child = children as any; const language = String(child?.props?.className || '').replace('language-', '') || 'text'; const code = String(child?.props?.children || '').replace(/\n$/, ''); if (language === 'mermaid') return <MermaidDiagram code={code} index={diagramIndex++} />; const grammar = Prism.languages[language]; return <div className="research-code"><div><span>{language}</span><CopyCode code={code} /></div><pre><code className={`language-${language}`} dangerouslySetInnerHTML={grammar ? { __html: Prism.highlight(code, grammar, language) } : undefined}>{grammar ? undefined : code}</code></pre></div> },
      }}>{article.content}</ReactMarkdown></div>
      {(isRanchi || isIndia) && <nav className="research-related-links" aria-label="Related Vaiket research"><strong>Related Vaiket research</strong>{isIndia && <a href="/posts/top-it-companies-ai-startups-technology-institutes-ranchi">Technology ecosystem in Ranchi</a>}<a href="/posts/ai-telecalling-in-india">AI telecalling in India</a><a href="/posts/whatsapp-business-api-future-of-business-communication">WhatsApp Business API and intelligent operations</a></nav>}
      <footer className="research-footer"><p>Research cutoff: {cutoffLabel} · {referenceCount} numbered references{article.status === 'draft' ? ' · Draft pending telecom/legal and product review.' : '.'}</p><div className="article-footer-tags">{article.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="author-box"><span className="article-avatar">V</span><div><strong>{article.author}</strong><p>Research and engineering at Vaiket.</p></div></div><div className="article-nav"><a href="/posts">← Back to all posts</a><ShareControls title={article.title} /></div><section className="research-newsletter" id="newsletter"><h2>Stay in the loop</h2><p>AI, automation, commerce, and product updates from Vaiket.</p><span>Newsletter signup is not connected yet.</span></section></footer>
    </article></div>{structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />}
  </main>
}
