import { MarketplaceItem } from '../types/marketplace';

// Canonical taxonomy constants

export const REGIONS = [
  { label: 'Ladakh', slug: 'ladakh' },
  { label: 'Spiti', slug: 'spiti' },
  { label: 'Zanskar', slug: 'zanskar' },
  { label: 'Himachal', slug: 'himachal' },
];

export const AVAILABILITY_FACETS = [
  { label: 'Available', slug: 'available' },
  { label: 'Limited', slug: 'limited' },
  { label: 'On Request', slug: 'on-request' },
  { label: 'Sold Out', slug: 'sold-out' },
  { label: 'Coming Soon', slug: 'coming-soon' },
];

export const TYPE_FACETS_BY_KIND = {
  trip: [
    { label: 'Motorcycle', slug: 'motorcycle' },
    { label: '4x4 Overland', slug: '4x4' },
    { label: 'High-Altitude', slug: 'trek' },
  ],
  vehicle: [
    { label: '4x4', slug: '4x4' },
    { label: 'Motorcycle', slug: 'motorcycle' },
  ],
  stay: [
    { label: 'Lodge', slug: 'lodge' },
    { label: 'Camp', slug: 'camp' },
    { label: 'Refuge', slug: 'refuge' },
  ],
};

/**
 * Normalizes item types/categories to a canonical slug.
 * '4×4 Overland' (U+00D7) -> '4x4'
 * 'High-Altitude Trek' -> 'trek'
 */
export function getTypeSlug(item: any): string | undefined {
  const rawType = item.type || item.category;
  if (!rawType) return undefined;

  const normalized = String(rawType).toLowerCase().trim();
  
  if (normalized.includes('4x4') || normalized.includes('4×4')) return '4x4';
  if (normalized.includes('motorcycle')) return 'motorcycle';
  if (normalized.includes('trek') || normalized.includes('high-altitude')) return 'trek';
  
  // Stays
  if (normalized.includes('lodge')) return 'lodge';
  if (normalized.includes('camp')) return 'camp';
  if (normalized.includes('refuge')) return 'refuge';

  // Fallback
  return normalized.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * A trek is a foot expedition — it structurally has no vehicle, by design,
 * not because one hasn't been assigned yet. Used to tell that state apart
 * from a genuine "ride not available" gap.
 */
export function requiresVehicle(trip: any): boolean {
  return getTypeSlug(trip) !== 'trek';
}

/**
 * Extracts a numeric days value from a duration string like "14 Days"
 */
export function getDurationDays(item: any): number | undefined {
  if (item.kind !== 'trip' || !item.duration) return undefined;
  const match = String(item.duration).match(/\d+/);
  if (match) return parseInt(match[0], 10);
  return undefined;
}

/**
 * Extracts a season string safely.
 */
export function getSeasonBucket(item: any): string | undefined {
  if (item.kind !== 'trip' || !item.season) return undefined;
  return item.season;
}
