import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/research/providers/', '/api/', '/admin/', '/_next/'] }], sitemap: 'https://blog.vaiket.com/sitemap.xml' }
}
