import { notFound } from 'next/navigation'
import { getExpeditionBySlug } from '@/lib/data/expeditions'
import { ExpeditionDetailView } from '@/components/expeditions/ExpeditionDetailView'

export default async function ExpeditionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const expedition = getExpeditionBySlug(slug)

  if (!expedition) return notFound()

  return <ExpeditionDetailView expedition={expedition} />
}
