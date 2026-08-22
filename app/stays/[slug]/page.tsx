import { notFound } from 'next/navigation'
import { getStayBySlug } from '@/lib/data/stays'
import { ItemDetailTemplate } from '@/components/marketplace/ItemDetailTemplate'

export default function StayDetailPage({ params }: { params: { slug: string } }) {
  const stay = getStayBySlug(params.slug)
  if (!stay) return notFound()

  return <ItemDetailTemplate item={stay} kind="stay" />
}
