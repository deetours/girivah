import { expect, test, describe } from 'vitest';
import { getTypeSlug, getDurationDays, getSeasonBucket } from './facets';
import { parseFilterParams, serializeFilterParams } from './filter-params';
import { applyFilters } from './apply-filters';

describe('Marketplace Facets', () => {
  test('getTypeSlug normalizes types correctly', () => {
    expect(getTypeSlug({ type: '4×4 Overland' })).toBe('4x4');
    expect(getTypeSlug({ category: 'Motorcycle' })).toBe('motorcycle');
    expect(getTypeSlug({ type: 'High-Altitude Trek' })).toBe('trek');
    expect(getTypeSlug({ type: 'Lodge' })).toBe('lodge');
    expect(getTypeSlug({ category: 'Unknown Category' })).toBe('unknown-category');
    expect(getTypeSlug({})).toBe(undefined);
  });

  test('getDurationDays extracts days correctly', () => {
    expect(getDurationDays({ kind: 'trip', duration: '14 Days' })).toBe(14);
    expect(getDurationDays({ kind: 'trip', duration: '1 Day' })).toBe(1);
    expect(getDurationDays({ kind: 'vehicle', duration: '14 Days' })).toBe(undefined);
  });
});

describe('Filter Params', () => {
  test('parseFilterParams correctly parses URLSearchParams', () => {
    const params = new URLSearchParams('kind=trip&region=ladakh,spiti&priceMin=40000');
    const state = parseFilterParams(params);
    expect(state.kind).toBe('trip');
    expect(state.region).toEqual(['ladakh', 'spiti']);
    expect(state.priceMin).toBe(40000);
    expect(state.type).toEqual([]);
  });

  test('parseFilterParams handles legacy filter alias', () => {
    const params = new URLSearchParams('filter=4x4');
    const state = parseFilterParams(params);
    expect(state.type).toContain('4x4');
    expect(state.type).toHaveLength(1);
  });
  
  test('serializeFilterParams correctly serializes state', () => {
    const state = {
      kind: 'vehicle',
      region: ['spiti'],
      type: ['4x4'],
      avail: [],
      season: [],
      dur: [],
    };
    const params = serializeFilterParams(state);
    expect(params.toString()).toBe('kind=vehicle&region=spiti&type=4x4');
  });
});

describe('Apply Filters', () => {
  const mockItems = [
    { id: 1, kind: 'trip', title: 'Spiti Overland', type: '4×4 Overland', fromPrice: 50000, regionSlug: 'spiti', availability: 'available' },
    { id: 2, kind: 'trip', title: 'Ladakh Moto', type: 'Motorcycle', fromPrice: 40000, regionSlug: 'ladakh', availability: 'limited' },
    { id: 3, kind: 'stay', title: 'Spiti Basecamp', category: 'Camp', fromPrice: 5000, regionSlug: 'spiti', availability: 'available' },
  ];

  test('filters by kind', () => {
    const state = parseFilterParams(new URLSearchParams('kind=trip'));
    const result = applyFilters(mockItems, state);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });

  test('filters by query', () => {
    const state = parseFilterParams(new URLSearchParams('q=moto'));
    const result = applyFilters(mockItems, state);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  test('filters by legacy alias acting as type', () => {
    const state = parseFilterParams(new URLSearchParams('filter=4x4'));
    const result = applyFilters(mockItems, state);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test('filters by multiple criteria', () => {
    const state = parseFilterParams(new URLSearchParams('kind=trip&region=spiti'));
    const result = applyFilters(mockItems, state);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });
});
