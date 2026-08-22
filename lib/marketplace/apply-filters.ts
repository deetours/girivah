import { FilterState } from './filter-params';
import { getTypeSlug, getDurationDays, getSeasonBucket } from './facets';

export function applyFilters(items: any[], state: FilterState): any[] {
  return items.filter(item => {
    // 1. Kind Match
    if (state.kind && item.kind !== state.kind) {
      return false;
    }

    // 2. Query Match
    if (state.q) {
      const q = state.q.toLowerCase();
      const title = String(item.title || '').toLowerCase();
      const subtitle = String(item.subtitle || '').toLowerCase();
      if (!title.includes(q) && !subtitle.includes(q)) {
        return false;
      }
    }

    // 3. Region Match
    if (state.region.length > 0) {
      if (!item.regionSlug || !state.region.includes(item.regionSlug)) {
        return false;
      }
    }

    // 4. Type Match
    if (state.type.length > 0) {
      const itemType = getTypeSlug(item);
      if (!itemType || !state.type.includes(itemType)) {
        return false;
      }
    }

    // 5. Availability Match
    if (state.avail.length > 0) {
      if (!item.availability || !state.avail.includes(item.availability)) {
        return false;
      }
    }

    // 6. Price Match
    if (state.priceMin !== undefined && item.fromPrice < state.priceMin) {
      return false;
    }
    if (state.priceMax !== undefined && item.fromPrice > state.priceMax) {
      return false;
    }

    // Trip-specific filters
    if (item.kind === 'trip') {
      // 7. Season
      if (state.season.length > 0) {
        const itemSeason = getSeasonBucket(item);
        // We could implement more complex season overlap logic here later
        // For now, simple includes on the item's season string
        if (!itemSeason || !state.season.some(s => itemSeason.toLowerCase().includes(s.toLowerCase()))) {
          return false;
        }
      }

      // 8. Duration
      if (state.dur.length > 0) {
        const days = getDurationDays(item);
        if (!days) return false;
        
        const matchesDuration = state.dur.some(durBucket => {
          if (durBucket === 'short' && days <= 5) return true;
          if (durBucket === 'medium' && days > 5 && days <= 10) return true;
          if (durBucket === 'long' && days > 10) return true;
          return false;
        });
        
        if (!matchesDuration) return false;
      }
    }

    return true;
  });
}

/**
 * Returns facet counts based on the current state.
 */
export function countFacets(items: any[], state: FilterState) {
  // A simplistic counting strategy: applying all filters EXCEPT the one being counted.
  // This helps disabled-not-hidden states.
  
  const countState = (overrides: Partial<FilterState>) => {
    return applyFilters(items, { ...state, ...overrides }).length;
  };

  return {
    getTypeCount: (slug: string) => countState({ type: [slug] }),
    getRegionCount: (slug: string) => countState({ region: [slug] }),
    getAvailCount: (slug: string) => countState({ avail: [slug] }),
    getDurCount: (slug: string) => countState({ dur: [slug] }),
  };
}
