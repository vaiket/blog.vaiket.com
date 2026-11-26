import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductPage, productPages } from '../../../lib/product-pages'
import './product.css'

export function generateStaticParams() { return productPages.map(page => ({ slug: page.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getProductPage((await params).slug)
  if (!page) return { title: 'Product page not found | Vaiket', robots: { index: false, follow: false } }
  return { title: `${page.title} | Vaiket`, description: page.description, alternates: { canonical: `/product/${page.slug}` }, openGraph: { title: `${page.title} | Vaiket`, description: page.description, url: `https://blog.vaiket.com/product/${page.slug}` } }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = getProductPage((await params).slug)
  if (!page) notFound()
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: page.title, description: page.description, provider: { '@type': 'Organization', name: 'Vaiket', url: 'https://www.vaiket.com' }, url: `https://blog.vaiket.com/product/${page.slug}` }
  return <main className="product-page"><header className="product-header"><a href="/" className="product-brand"><span>V</span>Vaiket</a><a href="/posts">Blog</a><nav><a href="/product/whatsapp-business-api">WhatsApp API</a><a href="/product/ai-telecalling">AI Telecalling</a><a href="/product/business-automation">Automation</a><a href="/product/developer-apis">Developer APIs</a></nav><a className="product-cta" href="https://www.vaiket.com/in/pricing" target="_blank" rel="noreferrer">Explore Vaiket</a></header><section className="product-hero"><div><p className="product-eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="product-lede">{page.description}</p><div className="product-actions">{page.links.slice(0, 2).map(link => <a key={link.href} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>{link.label}</a>)}</div></div><aside><strong>Capability status</strong><span className={`product-status ${page.status}`}>{page.status === 'documented' ? 'Public documentation' : page.status === 'upcoming' ? 'Research / upcoming' : 'Confirm availability'}</span><p>Snapshot: 25 November 2026. Pricing, routes, languages, limits and availability can change.</p></aside></section><section className="product-grid"><div><h2>What this helps teams evaluate</h2><ul>{page.benefits.map(item => <li key={item}>{item}</li>)}</ul><h2>Practical use cases</h2><ul>{page.useCases.map(item => <li key={item}>{item}</li>)}</ul></div><aside className="product-evidence"><h2>Documentation and research</h2>{page.links.map(link => <a key={link.href} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>{link.label}</a>)}<h3>Related research</h3>{page.related.map(slug => <a key={slug} href={`/posts/${slug}`}>{slug.replaceAll('-', ' ')}</a>)}</aside></section><footer className="product-footer"><p>Vaiket product pages distinguish public documentation from research direction. Confirm product scope in writing before making customer, compliance or procurement claims.</p></footer><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\u003c') }} /></main>
}
