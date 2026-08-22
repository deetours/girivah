export interface Provider {
  id: string
  name: string
  verified: boolean
  yearsOperating?: number
  responseTime?: string
}

export interface MarketplaceItem {
  slug: string
  kind: 'trip' | 'vehicle' | 'stay' | 'experience'
  regionSlug: string
  title: string
  fromPrice: number
  media: { src: string; alt: string }[]
  availability: 'available' | 'limited' | 'on-request' | 'sold-out' | 'coming-soon'
  providerId: string
}
