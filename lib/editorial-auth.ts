import 'server-only'
import { cookies } from 'next/headers'

export const EDITORIAL_COOKIE = '__vaiket_editorial_session'

export function getEditorialAdminToken() {
  return process.env.EDITORIAL_ADMIN_TOKEN?.trim() || ''
}

export function isEditorialAuthConfigured() {
  return Boolean(getEditorialAdminToken())
}

export async function isEditorialAdmin() {
  const configured = getEditorialAdminToken()
  if (!configured) return false
  const store = await cookies()
  return store.get(EDITORIAL_COOKIE)?.value === configured
}
