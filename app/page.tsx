'use client'

import { useState } from 'react'
import { LuBrainCircuit, LuBuilding2, LuFlaskConical, LuGift, LuLayers3, LuMessageCircle, LuShoppingCart, LuZap } from 'react-icons/lu'

const Arrow = () => <span aria-hidden="true" className="arrow">›</span>

function BrandMark() {
  return <div className="brand-mark" aria-hidden="true"><i /><i /><i /></div>
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></svg>
}

function CategoryIcon({ kind }: { kind: string }) {
  const icons = { ai: LuBrainCircuit, layers: LuLayers3, bolt: LuZap, chat: LuMessageCircle, cart: LuShoppingCart, gift: LuGift, flask: LuFlaskConical, building: LuBuilding2 }
  const Icon = icons[kind as keyof typeof icons]
  return <Icon className="category-icon" aria-hidden="true" />
}

function HeroArtwork() {
  return <div className="hero-art"><img src="/luminous-ai-wave-mesh.png" alt="Luminous AI wave mesh" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
}

function CardArtwork({ type }: { type: string }) {
  return <div className={`card-art ${type}`}>
    {type === 'whatsapp' && <img src="/futuristic-neon-whatsapp-glass-interface.png" alt="Futuristic neon WhatsApp interface" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
    {type === 'commerce' && <img src="/neon-ai-commerce-landscape.png" alt="Neon AI commerce landscape" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
    {type === 'cloud' && <img src="/vaiket-cloud-infrastructure-blue.png" alt="Vaiket cloud infrastructure in blue" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
  </div>
}

const categories = [
  ['ai', 'Artificial Intelligence', '(24)'], ['layers', 'Agentic AI', ''], ['bolt', 'Business Automation', '(18)'], ['chat', 'WhatsApp, RCS & Voice AI', '(14)'], ['cart', 'Generative Commerce', '(11)'], ['gift', 'Product Updates', '(9)'], ['flask', 'Research & Innovation', '(8)'], ['building', 'Company News', '(7)'],
]

const cards = [
  { type: 'whatsapp', slug: 'build-powerful-business-workflows-on-whatsapp', tags: ['WhatsApp', 'Automation'], title: 'Build Powerful Business Workflows on WhatsApp', desc: 'A practical guide to automation, notifications, lead generation, and AI-powered support on WhatsApp.', date: 'Nov 18, 2026', time: '6 min read' },
  { type: 'commerce', slug: 'generative-commerce-next-evolution', tags: ['Commerce', 'AI'], title: 'Generative Commerce: The Next Evolution of Online Business', desc: 'How AI is changing product discovery, customer experience, and the entire commerce journey.', date: 'Nov 15, 2026', time: '7 min read' },
  { type: 'cloud', slug: 'inside-vaiket-cloud', tags: ['Product', 'Platform'], title: 'Inside Vaiket Cloud: A Unified Platform for AI-Native Businesses', desc: 'A closer look at how Vaiket Cloud brings AI, automation, and business tools together in one platform.', date: 'Nov 12, 2026', time: '5 min read' },
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  return <main>
    <header className="site-header"><div className="brand"><BrandMark /><span>Vaiket</span></div><a className="blog-link" href="#latest">Blog</a><nav><a href="#">AI</a><a href="#">Automation</a><a href="#">Commerce</a><a href="#">WhatsApp</a><a href="#">Research</a><a href="#">Product</a><a href="#">Company</a></nav><div className="header-actions"><button className="search" aria-label="Search"><SearchIcon /></button><button className="subscribe-top" onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}>Subscribe</button></div></header>
    <div className="page-shell"><section className="content"><section className="feature"><div className="feature-copy"><span className="pill featured">Featured</span><h1>The Rise of Agentic AI:<br />From Tools to Autonomous<br />Business Systems</h1><p>How AI agents are moving beyond simple automation to run complex business workflows, drive growth, and create real impact.</p><div className="byline"><span className="author-mark">V</span><b>Vaiket Team</b><span>·</span><span>Nov 20, 2026</span><span>·</span><span>8 min read</span></div></div><HeroArtwork /></section>
      <section className="latest" id="latest"><div className="section-heading"><h2>Latest from Vaiket</h2><a href="/posts">View all posts <span>→</span></a></div><div className="cards">{cards.map((card) => <a href={`/posts/${card.slug}`} className="card-link" style={{ display: 'block', cursor: 'pointer' }} key={card.title}><article className="card"><CardArtwork type={card.type} /><div className="tags">{card.tags.map(tag => <span className="pill" key={tag}>{tag}</span>)}</div><h3>{card.title}</h3><p>{card.desc}</p><div className="meta">{card.date} <span>·</span> {card.time}</div></article></a>)}</div></section></section>
      <aside className="home-category-panel"><h2>Explore by Category</h2><div className="category-list">{categories.map(([kind, label, count]) => <a href="#latest" key={label}><span className="category-name"><CategoryIcon kind={kind} />{label} <em>{count}</em></span><Arrow /></a>)}</div><div className="newsletter" id="newsletter"><h2>Stay in the loop</h2><p>Get the latest blogs, research, and product updates from Vaiket.</p>{subscribed ? <div className="success">Thanks — you're on the list.</div> : <><div className="email-field"><span>✉</span><input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" aria-label="Email address" /></div><button onClick={() => email && setSubscribed(true)}>Subscribe</button></>}</div></aside>
    </div>
  </main>
}
