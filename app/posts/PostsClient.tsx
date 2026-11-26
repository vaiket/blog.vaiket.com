'use client'

import { useEffect, useMemo, useState } from 'react'
import { LuBrainCircuit, LuBuilding2, LuFlaskConical, LuGift, LuLayers3, LuMessageCircle, LuShoppingCart, LuZap } from 'react-icons/lu'
import './posts.css'

type Post = { type: string; slug: string; tags: string[]; title: string; desc: string; date: string; time: string; image: string; searchText?: string; updatedAt?: string }

const posts: Post[] = [
  { type: 'featured', slug: 'the-rise-of-agentic-ai', tags: ['AI', 'Agentic AI'], title: 'The Rise of Agentic AI: From Tools to Autonomous Business Systems', desc: 'How AI agents are moving beyond simple automation to run complex business workflows.', date: 'Nov 20, 2026', time: '8 min read', image: '/luminous-ai-wave-mesh.png' },
  { type: 'whatsapp-api', slug: 'whatsapp-business-api-future-of-business-communication', tags: ['WhatsApp API', 'Automation'], title: 'WhatsApp Business API: Beyond Messaging, Towards Intelligent Business Operations', desc: 'How businesses can transform customer conversations into sales, workflows, and intelligent business experiences.', date: 'Nov 25, 2026', time: '7 min read', image: '/futuristic-neon-whatsapp-glass-interface.png' },
  { type: 'whatsapp', slug: 'build-powerful-business-workflows-on-whatsapp', tags: ['WhatsApp', 'Automation'], title: 'Build Powerful Business Workflows on WhatsApp', desc: 'A practical guide to automation, notifications, lead generation, and AI-powered support on WhatsApp.', date: 'Nov 18, 2026', time: '6 min read', image: '/futuristic-neon-whatsapp-glass-interface.png' },
  { type: 'commerce', slug: 'generative-commerce-next-evolution', tags: ['Commerce', 'Generative Commerce'], title: 'Generative Commerce: The Next Evolution of Online Business', desc: 'How AI is changing product discovery, customer experience, and the entire commerce journey.', date: 'Nov 15, 2026', time: '7 min read', image: '/neon-ai-commerce-landscape.png' },
  { type: 'cloud', slug: 'inside-vaiket-cloud', tags: ['Cloud', 'Infrastructure'], title: 'Inside Vaiket Cloud: A Unified Platform for AI-Native Businesses', desc: 'A closer look at how Vaiket Cloud brings AI, automation, and business tools together.', date: 'Nov 12, 2026', time: '5 min read', image: '/vaiket-cloud-infrastructure-blue.png' },
  { type: 'voice', slug: 'ai-voice-calling-automate-customer-calls', tags: ['RCS & Voice', 'AI Calling'], title: 'AI Voice Calling: Automate Customer Calls at Scale', desc: 'Set up human-like AI calling for sales, support, and follow-ups with real business use cases.', date: 'Nov 10, 2026', time: '6 min read', image: '/neon-ai-commerce-landscape.png' },
  { type: 'updates', slug: 'latest-vaiket-product-updates', tags: ['Product', 'Platform'], title: "What’s New in Vaiket: Latest Product Updates", desc: 'New features, improvements, and integrations to help you grow faster.', date: 'Nov 8, 2026', time: '4 min read', image: '/vaiket-cloud-infrastructure-blue.png' },
]

const filters = ['All', 'AI', 'WhatsApp', 'AI Telecalling', 'RCS', 'Automation', 'Commerce', 'Research', 'Cloud', 'Developers', 'MSME', 'Company']
const categories = ['Artificial Intelligence', 'Agentic AI', 'Business Automation', 'WhatsApp, RCS & Voice AI', 'Generative Commerce', 'Product Updates', 'Research & Innovation', 'Company News']

function matchesFilter(post: Post, filter: string) {
  if (filter === 'All') return true
  const haystack = `${post.type} ${post.tags.join(' ')} ${post.title}`.toLowerCase()
  const aliases: Record<string, string[]> = { AI: ['ai', 'artificial intelligence'], 'AI Telecalling': ['ai calling', 'telecalling', 'voice'], RCS: ['rcs'], Developers: ['developer', 'api'], MSME: ['msme', 'business'] }
  return [filter.toLowerCase(), ...(aliases[filter] || [])].some(value => haystack.includes(value))
}

function Mark() { return <div className="posts-mark"><i /><i /><i /></div> }
function SearchIcon() { return <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></svg> }
function Icon({ index }: { index: number }) { const icons = [LuBrainCircuit, LuLayers3, LuZap, LuMessageCircle, LuShoppingCart, LuGift, LuFlaskConical, LuBuilding2]; const CategoryIcon = icons[index]; return <CategoryIcon className="tiny-icon" aria-hidden="true" /> }

export default function PostsClient({ researchPosts = [] }: { researchPosts?: Post[] }) {
  const pageSize = 9
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('latest')
  const [page, setPage] = useState(1)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const allPosts = researchPosts.length ? [...researchPosts, ...posts] : posts
  useEffect(() => { const params = new URLSearchParams(window.location.search); const category = params.get('category'); const nextSort = params.get('sort'); const nextPage = Number(params.get('page')); if (params.get('q')) setQuery(params.get('q') || ''); if (category && filters.includes(category)) setActive(category); if (nextSort && ['latest', 'oldest', 'alphabetical', 'updated'].includes(nextSort)) setSort(nextSort); if (Number.isInteger(nextPage) && nextPage > 0) setPage(nextPage) }, [])
  useEffect(() => { setPage(1) }, [active, query, sort])
  useEffect(() => { const params = new URLSearchParams(); if (query) params.set('q', query); if (active !== 'All') params.set('category', active); if (sort !== 'latest') params.set('sort', sort); if (page > 1) params.set('page', String(page)); const next = params.toString(); window.history.replaceState(null, '', next ? `/posts?${next}` : '/posts') }, [active, query, sort, page])
  const filtered = useMemo(() => { const queryText = query.toLowerCase(); const matching = allPosts.filter(post => matchesFilter(post, active) && `${post.title} ${post.desc} ${post.tags.join(' ')} ${post.searchText || ''}`.toLowerCase().includes(queryText)); return [...matching].sort((a, b) => sort === 'alphabetical' ? a.title.localeCompare(b.title) : sort === 'oldest' ? new Date(a.date).getTime() - new Date(b.date).getTime() : sort === 'updated' ? new Date(b.updatedAt || b.date).getTime() - new Date(a.updatedAt || a.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime()) }, [active, query, sort, researchPosts])
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const visiblePosts = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const goToPage = (nextPage: number) => setPage(Math.max(1, Math.min(pageCount, nextPage)))

  return <main className="posts-page">
    <header className="posts-header"><a href="/" className="posts-brand"><Mark /><span>Vaiket</span></a><a href="/posts" className="posts-blog">Blog</a><nav><a href="#">AI</a><a href="#">Automation</a><a href="#">Commerce</a><a href="#">WhatsApp</a><a href="#">Research</a><a href="#">Product</a><a href="#">Company</a></nav><button className="posts-search-icon" aria-label="Search"><SearchIcon /></button><button className="posts-subscribe" onClick={() => document.getElementById('posts-newsletter')?.scrollIntoView({ behavior: 'smooth' })}>Subscribe</button></header>
    <div className="posts-shell"><section className="posts-content"><div className="posts-top"><div><span className="posts-pill">All Posts</span><h1>All Blog Posts</h1><p>Explore research, technical guides, industry insights and product updates from Vaiket.</p></div><label className="posts-search"><SearchIcon /><input placeholder="Search blog posts..." value={query} onChange={e => setQuery(e.target.value)} /><kbd>Ctrl K</kbd></label></div><div className="filter-row">{filters.map(name => <button className={active === name ? 'active' : ''} onClick={() => setActive(name)} key={name}>{name} <span>({name === 'All' ? allPosts.length : allPosts.filter(post => matchesFilter(post, name)).length})</span></button>)}<label className="posts-sort"><span>Sort</span><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort articles"><option value="latest">Latest</option><option value="oldest">Oldest</option><option value="alphabetical">A–Z</option><option value="updated">Recently updated</option></select></label></div>{visiblePosts.length ? <div className="posts-grid">{visiblePosts.map(post => <a href={`/posts/${post.slug}`} className="post-card-link" style={{ display: 'block', cursor: 'pointer' }} key={post.title}><article className="post-card"><img src={post.image} alt="" /><div className="post-tags">{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div><h2>{post.title}</h2><p>{post.desc}</p><div className="post-meta">{post.date} <b>·</b> {post.time}</div></article></a>)}</div> : <div className="posts-empty"><h2>No matching posts</h2><p>Try another keyword or clear the active filter.</p></div>}<div className="pagination" aria-label="Posts pagination"><button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>← <span>Previous</span></button>{Array.from({ length: pageCount }, (_, index) => index + 1).slice(0, 7).map(number => <button key={number} className={currentPage === number ? 'current' : ''} onClick={() => goToPage(number)} aria-current={currentPage === number ? 'page' : undefined}>{number}</button>)}{pageCount > 7 && <><span>...</span><button className={currentPage === pageCount ? 'current' : ''} onClick={() => goToPage(pageCount)}>{pageCount}</button></>}<button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pageCount}>Next <span>→</span></button></div></section>
      <aside className="posts-aside"><section><h2>Explore by Category</h2><div className="posts-category-list">{categories.map((category, index) => <a href={`/posts?q=${encodeURIComponent(category)}`} key={category}><span><Icon index={index} />{category} <em>({[24, 14, 18, 14, 11, 9, 8, 7][index]})</em></span><b>›</b></a>)}</div></section><section className="trending"><h2><span>♨</span> Trending Now</h2>{posts.slice(1, 4).map(post => <a href={`/posts/${post.slug}`} className="trend" key={post.title}><img src={post.image} alt="" /><span><strong>{post.title}</strong><small>{post.time}</small></span></a>)}</section><section className="posts-newsletter" id="posts-newsletter"><h2>Stay in the loop</h2><p>Get the latest blogs, research, and product updates from Vaiket.</p>{subscribed ? <div className="posts-success">Thanks — you're on the list.</div> : <><div className="posts-email"><span>✉</span><input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" /></div><button onClick={() => email && setSubscribed(true)}>Subscribe</button></>}</section></aside>
    </div>
  </main>
}
