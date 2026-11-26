import type { MetadataRoute } from 'next'
import { articles } from '../lib/articles'
import { getResearchArticle, getResearchSlugs } from '../lib/research-article'
import { categoryDefinitions, getCategoryPosts } from '../lib/blog-catalog'
import { productPages } from '../lib/product-pages'
import { normalizeSitemapDate } from '../lib/sitemap-date'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://blog.vaiket.com'
  const pages: MetadataRoute.Sitemap = [{ url: base }, { url: `${base}/posts` }]
  for (const article of articles) if (article.status === 'published') {
    const lastModified = normalizeSitemapDate(article.updatedAt || article.publishedAt)
    pages.push(lastModified ? { url: `${base}/posts/${article.slug}`, lastModified } : { url: `${base}/posts/${article.slug}` })
  }
  for (const slug of getResearchSlugs()) {
    const research = getResearchArticle(slug)
    if (research.status === 'published') {
      const lastModified = normalizeSitemapDate(research.updatedAt) || normalizeSitemapDate(research.publishedAt)
      pages.push(lastModified ? { url: `${base}/posts/${slug}`, lastModified } : { url: `${base}/posts/${slug}` })
    }
  }
  for (const category of Object.keys(categoryDefinitions)) if (getCategoryPosts(category).length) pages.push({ url: `${base}/category/${category}` })
  for (const product of productPages) pages.push({ url: `${base}/product/${product.slug}` })
  return pages
}
