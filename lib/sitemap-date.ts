const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/
const ISO_DATE_TIME = /^(\d{4})-(\d{2})-(\d{2})T.*(?:Z|[+-]\d{2}:\d{2})$/
const DISPLAY_DATE = /^([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})$/
const MONTHS = new Map([
  ['Jan', 0], ['Feb', 1], ['Mar', 2], ['Apr', 3], ['May', 4], ['Jun', 5],
  ['Jul', 6], ['Aug', 7], ['Sep', 8], ['Oct', 9], ['Nov', 10], ['Dec', 11],
])

function dateOnly(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month, day))
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) return undefined
  return `${String(year).padStart(4, '0')}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/** Return a sitemap-safe YYYY-MM-DD value, or omit invalid/unverified dates. */
export function normalizeSitemapDate(value: unknown): string | undefined {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return undefined
    return value.toISOString().slice(0, 10)
  }
  if (typeof value !== 'string') return undefined
  const input = value.trim()
  if (!input) return undefined

  const dateMatch = ISO_DATE.exec(input)
  if (dateMatch) return dateOnly(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3]))

  if (ISO_DATE_TIME.test(input)) {
    const date = new Date(input)
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10)
  }

  const displayMatch = DISPLAY_DATE.exec(input)
  if (displayMatch) {
    const month = MONTHS.get(displayMatch[1])
    return month === undefined ? undefined : dateOnly(Number(displayMatch[3]), month, Number(displayMatch[2]))
  }

  return undefined
}
