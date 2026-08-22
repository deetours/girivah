// Brand constants
export const BRAND_NAME = 'Girivah'
export const BRAND_TAGLINE = 'The Mountain Carrier'
export const BRAND_DESCRIPTION = 'Curated mountain expeditions across the Himalayas'

// Core physics token
export const APPLE_EASE = [0.32, 0.72, 0, 1] as const

// Navigation links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/expeditions', label: 'Expeditions' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
]

// Expedition types
export const EXPEDITION_TYPES = [
  'Trek',
  'Ride',
  '4x4',
  'Stay',
]

export const DIFFICULTY_LEVELS = [
  'All',
  'Easy',
  'Intermediate',
  'Advanced',
]

export interface Destination {
  name: string
  region: string
  description: string
  highlights: string[]
  elevation: string
  coords: string
  status: string
}

export const DESTINATIONS: Destination[] = [
  {
    name: 'Ladakh',
    region: 'Kashmir Region',
    description: 'High desert majesty and pristine passes',
    highlights: ['Khardung La', 'Pangong Lake', 'Nubra Valley'],
    elevation: '5,359m',
    coords: '34.15° N · 77.58° E',
    status: 'Active',
  },
  {
    name: 'Spiti Valley',
    region: 'Himachal Pradesh',
    description: 'Ancient monasteries and remote terrain',
    highlights: ['Kaza', 'Ki Monastery', 'Tso Moriri'],
    elevation: '4,270m',
    coords: '32.24° N · 78.03° E',
    status: 'Active',
  },
  {
    name: 'Himachal Pradesh',
    region: 'Western Himalayas',
    description: 'Lush valleys and cultural richness',
    highlights: ['Kinnaur', 'Rampur', 'Chitkul'],
    elevation: '3,200m',
    coords: '31.10° N · 77.17° E',
    status: 'Active',
  },
  {
    name: 'Zanskar',
    region: 'Ladakh Region',
    description: 'Frozen rivers and isolated settlements',
    highlights: ['Chadar', 'Padum', 'Phugtal'],
    elevation: '3,850m',
    coords: '33.31° N · 76.90° E',
    status: 'Winter Route',
  }
]

// Contact info
export const CONTACT_INFO = {
  email: 'hello@girivah.com',
  phone: '+91 9876 543 210',
  location: 'Leh, Ladakh',
}

// Social links
export const SOCIAL_LINKS = [
  { name: 'Instagram', href: '#' },
  { name: 'Facebook', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Email', href: 'mailto:hello@girivah.com' },
]
