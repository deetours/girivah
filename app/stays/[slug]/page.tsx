import { notFound } from 'next/navigation'
import { getStayBySlug } from '@/lib/data/stays'
import { ItemDetailTemplate } from '@/components/marketplace/ItemDetailTemplate'

export default async function StayDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const stay = getStayBySlug(slug)
  if (!stay) return notFound()

  return <ItemDetailTemplate item={stay} kind="stay" />
}
