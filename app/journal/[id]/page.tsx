import { notFound } from 'next/navigation'
import { getJournalArticleById, JOURNAL_ARTICLES } from '@/lib/data/journal'
import { JournalArticleView } from '@/components/journal/JournalArticleView'

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map(a => ({ id: a.id }))
}

export default async function JournalArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getJournalArticleById(id)

  if (!article) return notFound()

  return <JournalArticleView article={article} />
}
