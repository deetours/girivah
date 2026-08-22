export interface FilterState {
  kind?: string;
  q?: string;
  region: string[];
  type: string[];
  avail: string[];
  priceMin?: number;
  priceMax?: number;
  season: string[];
  dur: string[];
  sort?: string;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  region: [],
  type: [],
  avail: [],
  season: [],
  dur: [],
};

export function parseFilterParams(searchParams: URLSearchParams): FilterState {
  const state: FilterState = { ...DEFAULT_FILTER_STATE };
  
  const kind = searchParams.get('kind');
  if (kind) state.kind = kind;

  const q = searchParams.get('q');
  if (q) state.q = q;

  const sort = searchParams.get('sort');
  if (sort) state.sort = sort;

  const priceMin = searchParams.get('priceMin');
  if (priceMin) state.priceMin = parseInt(priceMin, 10);

  const priceMax = searchParams.get('priceMax');
  if (priceMax) state.priceMax = parseInt(priceMax, 10);

  const parseCsv = (key: string) => {
    const val = searchParams.get(key);
    return val ? val.split(',').filter(Boolean) : [];
  };

  state.region = parseCsv('region');
  state.avail = parseCsv('avail');
  state.season = parseCsv('season');
  state.dur = parseCsv('dur');

  // Legacy filter alias check: 'filter' parameter acts as an alias for 'type'
  const legacyFilter = searchParams.get('filter');
  const typeCsv = parseCsv('type');
  
  if (legacyFilter && legacyFilter !== 'all') {
    // If 'filter' is present, add it to the types array if not already present
    // Also we rewrite it behind the scenes (the URL sync hook will write it out as 'type' later)
    if (!typeCsv.includes(legacyFilter)) {
      typeCsv.push(legacyFilter);
    }
  }
  
  state.type = typeCsv;

  return state;
}

export function serializeFilterParams(state: FilterState): URLSearchParams {
  const params = new URLSearchParams();

  if (state.kind) params.set('kind', state.kind);
  if (state.q) params.set('q', state.q);
  if (state.sort) params.set('sort', state.sort);
  
  if (state.priceMin !== undefined) params.set('priceMin', state.priceMin.toString());
  if (state.priceMax !== undefined) params.set('priceMax', state.priceMax.toString());

  if (state.region.length > 0) params.set('region', state.region.join(','));
  if (state.type.length > 0) params.set('type', state.type.join(','));
  if (state.avail.length > 0) params.set('avail', state.avail.join(','));
  if (state.season.length > 0) params.set('season', state.season.join(','));
  if (state.dur.length > 0) params.set('dur', state.dur.join(','));

  return params;
}
