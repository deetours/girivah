import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { parseFilterParams, serializeFilterParams, FilterState } from '@/lib/marketplace/filter-params';

export function useMarketplaceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse state from URL
  const state = useMemo(() => parseFilterParams(searchParams), [searchParams]);

  const updateState = useCallback((updater: (prev: FilterState) => FilterState) => {
    const newState = updater(state);
    const newParams = serializeFilterParams(newState);
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [state, pathname, router]);

  const toggleFilter = useCallback((key: keyof FilterState, value: string) => {
    updateState(prev => {
      const current = (prev[key] as string[]) || [];
      const next = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      return { ...prev, [key]: next };
    });
  }, [updateState]);

  const setFilter = useCallback((key: keyof FilterState, value: any) => {
    updateState(prev => ({ ...prev, [key]: value }));
  }, [updateState]);

  const clearAll = useCallback(() => {
    updateState(prev => ({
      kind: prev.kind, // preserve kind
      q: prev.q,
      region: [],
      type: [],
      avail: [],
      season: [],
      dur: [],
      priceMin: undefined,
      priceMax: undefined,
      sort: prev.sort
    }));
  }, [updateState]);

  return {
    state,
    updateState,
    toggleFilter,
    setFilter,
    clearAll
  };
}
