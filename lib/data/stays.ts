import { MarketplaceItem } from '../types/marketplace';

export type Stay = MarketplaceItem & {
  id: string
  slug: string
  name: string
  category: 'outpost' | 'basecamp'
  regionSlug: string
  region: string
  elevation: string
  nightlyRate: string
  image: string
  highlights: string[]
  status: string
}

export const stays: Stay[] = [
  {
    id: 'basecamp-lodge',
    slug: 'basecamp-lodge',
    title: 'Basecamp Lodge',
    kind: 'stay',
    fromPrice: 4500,
    media: [{ src: '/exp-ladakh.jpg', alt: 'Basecamp Lodge' }],
    availability: 'available',
    providerId: 'prov-2',
    name: 'Basecamp Lodge',
    category: 'basecamp',
    regionSlug: 'ladakh',
    region: 'Nubra Valley',
    elevation: '3,000m',
    nightlyRate: '₹4,500',
    image: '/exp-ladakh.jpg',
    highlights: ['Oxygen Equipped', 'Heated Tents', 'Local Guides'],
    status: 'Active',
  },
  {
    id: 'kaza-camp',
    slug: 'kaza-camp',
    title: 'Kaza High-Altitude Camp',
    kind: 'stay',
    fromPrice: 3000,
    media: [{ src: '/exp-spiti.jpg', alt: 'Kaza High-Altitude Camp' }],
    availability: 'available',
    providerId: 'prov-2',
    name: 'Kaza High-Altitude Camp',
    category: 'outpost',
    regionSlug: 'spiti',
    region: 'Spiti Valley',
    elevation: '3,800m',
    nightlyRate: '₹3,000',
    image: '/exp-spiti.jpg',
    highlights: ['Star Gazing', 'Extreme Weather Rated', 'Bonfire Pit'],
    status: 'Active',
  },
]

export function getStayBySlug(slug: string): Stay | undefined { return stays.find(s => s.slug === slug); }
