import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { canonicalCategorySlug, categoryDefinitions, getCategoryPosts } from '../../../lib/blog-catalog'
import './category.css'

export function generateStaticParams() { return Object.keys(categoryDefinitions).filter(slug => getCategoryPosts(slug).length).map(category => ({ category })) }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const canonical = canonicalCategorySlug(category)
  const definition = categoryDefinitions[canonical]
  if (!definition || !getCategoryPosts(canonical).length) return { title: 'Category not found | Vaiket Blog', robots: { index: false, follow: false } }
  return { title: `${definition.title} | Vaiket Blog`, description: definition.description, alternates: { canonical: `/category/${canonical}` }, openGraph: { type: 'website', title: `${definition.title} | Vaiket Blog`, description: definition.description, url: `/category/${canonical}` } }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const canonical = canonicalCategorySlug(category)
  if (canonical !== category) redirect(`/category/${canonical}`)
  const definition = categoryDefinitions[canonical]
  const posts = getCategoryPosts(canonical)
  if (!definition || !posts.length) notFound()
  const jsonLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: definition.title, description: definition.description, url: `https://blog.vaiket.com/category/${category}` }
  return <main className="category-page"><header className="category-header"><a href="/" className="category-brand"><span>V</span>Vaiket</a><a href="/posts">Blog</a></header><div className="category-shell"><nav className="category-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/posts">Blog</a><span>›</span><span>{definition.title}</span></nav><span className="category-pill">Category</span><h1>{definition.title}</h1><p className="category-description">{definition.description}</p><div className="category-grid">{posts.map(post => <a href={`/posts/${post.slug}`} className="category-card" key={post.slug}><img src={post.image} alt="" /><div className="category-tags">{post.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div><h2>{post.title}</h2><p>{post.description}</p><small>{post.date} · {post.readingTime}</small></a>)}</div></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} /></main>
}
