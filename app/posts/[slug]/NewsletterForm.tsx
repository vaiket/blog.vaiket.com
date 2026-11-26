'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'error'>('idle')
  function submit(e: React.FormEvent) { e.preventDefault(); setStatus('error') }
  return <form className="article-newsletter-form" onSubmit={submit}><div className="article-email"><span>✉</span><input type="email" placeholder="Enter your email" value={email} onChange={e => { setEmail(e.target.value); setStatus('idle') }} aria-label="Email address" required /></div>{status === 'error' && <small className="form-error">Newsletter signup is not connected yet.</small>}<button type="submit">Subscribe</button></form>
}
