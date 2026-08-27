import { MarketplaceItem } from '../types/marketplace';

export type Vehicle = MarketplaceItem & {
  id: string
  slug: string
  name: string
  category: 'motorcycle' | '4x4'
  regionSlug: string
  region: string
  altitudeRating: string
  dailyRate: string
  image: string
  highlights: string[]
  status: string
}

export const vehicles: Vehicle[] = [
  {
    id: 'himalayan-450',
    slug: 'himalayan-450',
    title: 'Royal Enfield Himalayan',
    kind: 'vehicle',
    fromPrice: 2500,
    media: [{ src: '/hero-cinematic.jpg', alt: 'Royal Enfield Himalayan' }],
    availability: 'available',
    providerId: 'prov-1',
    name: 'Royal Enfield Himalayan',
    category: 'motorcycle',
    regionSlug: 'ladakh',
    region: 'Ladakh Region',
    altitudeRating: '5,500m',
    dailyRate: '₹2,500',
    image: '/hero-cinematic.jpg',
    highlights: ['Modified Suspension', 'High-Altitude Jetting', 'Luggage Racks'],
    status: 'Active',
  },
  {
    id: 'thar-4x4',
    slug: 'thar-4x4',
    title: 'Mahindra Thar 4x4',
    kind: 'vehicle',
    fromPrice: 6000,
    media: [{ src: '/exp-spiti.jpg', alt: 'Mahindra Thar 4x4' }],
    availability: 'available',
    providerId: 'prov-1',
    name: 'Mahindra Thar 4x4',
    category: '4x4',
    regionSlug: 'spiti',
    region: 'Spiti Valley',
    altitudeRating: '4,500m',
    dailyRate: '₹6,000',
    image: '/exp-spiti.jpg',
    highlights: ['Arctic Tune', 'All-Terrain Tires', 'Recovery Kit'],
    status: 'Active',
  },
  {
    id: 'gypsy-4x4',
    slug: 'gypsy-4x4',
    title: 'Maruti Gypsy 4x4',
    kind: 'vehicle',
    fromPrice: 5500,
    media: [{ src: '/exp-ladakh.jpg', alt: 'Maruti Gypsy 4x4' }],
    availability: 'available',
    providerId: 'prov-1',
    name: 'Maruti Gypsy 4x4',
    category: '4x4',
    regionSlug: 'zanskar',
    region: 'Zanskar Valley',
    altitudeRating: '4,400m',
    dailyRate: '₹5,500',
    image: '/exp-ladakh.jpg',
    highlights: ['Short-Wheelbase Agility', 'Snow Chains Fitted', 'Recovery Winch'],
    status: 'Active',
  },
]

// seed data — swap for a real backend/CMS later

export function getVehicleBySlug(slug: string): Vehicle | undefined { return vehicles.find(v => v.slug === slug); }
