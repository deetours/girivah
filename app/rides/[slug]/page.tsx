import { notFound } from 'next/navigation'
import { getVehicleBySlug } from '@/lib/data/vehicles'
import { ItemDetailTemplate } from '@/components/marketplace/ItemDetailTemplate'

export default function RideDetailPage({ params }: { params: { slug: string } }) {
  const vehicle = getVehicleBySlug(params.slug)
  if (!vehicle) return notFound()

  return <ItemDetailTemplate item={vehicle} kind="vehicle" />
}
