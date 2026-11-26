import type { MetadataRoute } from 'next'
import { articles } from '../lib/articles'
import { getResearchArticle, getResearchSlugs } from '../lib/research-article'
import { categoryDefinitions, getCategoryPosts } from '../lib/blog-catalog'
import { productPages } from '../lib/product-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://blog.vaiket.com'
  const pages: MetadataRoute.Sitemap = [{ url: base }, { url: `${base}/posts` }]
  for (const article of articles) if (article.status === 'published') pages.push({ url: `${base}/posts/${article.slug}` })
  for (const slug of getResearchSlugs()) {
    const research = getResearchArticle(slug)
    if (research.status === 'published' && research.publishedAt) pages.push({ url: `${base}/posts/${slug}`, lastModified: research.updatedAt || research.publishedAt })
  }
  for (const category of Object.keys(categoryDefinitions)) if (getCategoryPosts(category).length) pages.push({ url: `${base}/category/${category}` })
  for (const product of productPages) pages.push({ url: `${base}/product/${product.slug}` })
  return pages
}
