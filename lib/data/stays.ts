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
  {
    id: 'padum-refuge',
    slug: 'padum-refuge',
    title: 'Padum Basecamp Refuge',
    kind: 'stay',
    fromPrice: 3500,
    media: [{ src: '/exp-ladakh.jpg', alt: 'Padum Basecamp Refuge' }],
    availability: 'available',
    providerId: 'prov-2',
    name: 'Padum Basecamp Refuge',
    category: 'basecamp',
    regionSlug: 'zanskar',
    region: 'Zanskar Valley',
    elevation: '3,650m',
    nightlyRate: '₹3,500',
    image: '/exp-ladakh.jpg',
    highlights: ['Sub-Zero Rated Rooms', 'Wood-Fired Heating', 'Trekker Gear Drying Room'],
    status: 'Active',
  },
  {
    id: 'chitkul-homestay',
    slug: 'chitkul-homestay',
    title: 'Chitkul Heritage Homestay',
    kind: 'stay',
    fromPrice: 2200,
    media: [{ src: '/hero-mountain.jpg', alt: 'Chitkul Heritage Homestay' }],
    availability: 'available',
    providerId: 'prov-2',
    name: 'Chitkul Heritage Homestay',
    category: 'outpost',
    regionSlug: 'himachal',
    region: 'Kinnaur, Himachal Pradesh',
    elevation: '3,450m',
    nightlyRate: '₹2,200',
    image: '/hero-mountain.jpg',
    highlights: ['Home-Cooked Kinnauri Meals', 'Traditional Timber Architecture', 'Apple Orchard Views'],
    status: 'Active',
  },
]

// seed data — swap for a real backend/CMS later

export function getStayBySlug(slug: string): Stay | undefined { return stays.find(s => s.slug === slug); }
