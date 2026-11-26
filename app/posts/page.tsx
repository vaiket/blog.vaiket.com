import PostsClient from './PostsClient'
import { getResearchArticle, getResearchSlugs } from '../../lib/research-article'

export default function PostsPage() {
  const researchPosts = getResearchSlugs().flatMap(slug => {
    const article = getResearchArticle(slug)
    // Private drafts stay out of public discovery until an editor publishes them.
    if (article.status !== 'published') return []
    const displayDate = article.publishedAt || article.researchCutoff
    const published = new Date(`${displayDate}T00:00:00Z`)
    const date = !Number.isNaN(published.getTime()) ? published.toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric' }) : displayDate
    const tags = article.tags.slice(0, 3)
    return [{ type: 'research', slug: article.slug, tags, title: article.title, desc: article.description, date, time: `${article.readingMinutes} min read`, image: '/luminous-ai-wave-mesh.png', searchText: article.content }]
  })
  return <PostsClient researchPosts={researchPosts} />
}
