import { NextResponse } from 'next/server'
import { EDITORIAL_COOKIE, getEditorialAdminToken } from '../../../../lib/editorial-auth'

const attempts = new Map<string, { count: number; resetAt: number }>()

export async function POST(request: Request) {
  if (request.headers.get('x-editorial-request') !== 'same-origin') return NextResponse.json({ error: 'Invalid editorial request.' }, { status: 403 })
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  const now = Date.now()
  const attempt = attempts.get(key)
  if (!attempt || attempt.resetAt < now) attempts.set(key, { count: 1, resetAt: now + 15 * 60_000 })
  else if (attempt.count >= 8) return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
  else attempt.count += 1
  const configured = getEditorialAdminToken()
  if (!configured) return NextResponse.json({ error: 'EDITORIAL_ADMIN_TOKEN is not configured.' }, { status: 503 })
  let body: { token?: string; action?: string } = {}
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const response = NextResponse.json({ ok: true })
  if (body.action === 'logout') {
    response.cookies.set(EDITORIAL_COOKIE, '', { httpOnly: true, expires: new Date(0), sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/' })
    return response
  }
  if (!body.token || body.token !== configured) return NextResponse.json({ error: 'Invalid editorial token.' }, { status: 401 })
  response.cookies.set(EDITORIAL_COOKIE, configured, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8 })
  return response
}
