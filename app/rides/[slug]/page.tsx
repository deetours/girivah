import { notFound } from 'next/navigation'
import { getVehicleBySlug } from '@/lib/data/vehicles'
import { ItemDetailTemplate } from '@/components/marketplace/ItemDetailTemplate'

export default async function RideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const vehicle = getVehicleBySlug(slug)
  if (!vehicle) return notFound()

  return <ItemDetailTemplate item={vehicle} kind="vehicle" />
}
