'use client'

import React from 'react'
import { useMarketplaceFilters } from '@/hooks/useMarketplaceFilters'
import { REGIONS, AVAILABILITY_FACETS, TYPE_FACETS_BY_KIND } from '@/lib/marketplace/facets'

export function FilterRail() {
  const { state, toggleFilter, setFilter, clearAll } = useMarketplaceFilters()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter('q', e.target.value)
  }

  // Generate type facets across all kinds if kind is 'all' or empty, else specific to kind
  const currentKind = state.kind || 'all'
  const typeFacets = currentKind === 'all' 
    ? [...TYPE_FACETS_BY_KIND.trip, ...TYPE_FACETS_BY_KIND.vehicle, ...TYPE_FACETS_BY_KIND.stay]
    : TYPE_FACETS_BY_KIND[currentKind as keyof typeof TYPE_FACETS_BY_KIND] || []

  // Deduplicate if all
  const uniqueTypeFacets = Array.from(new Map(typeFacets.map(f => [f.slug, f])).values())

  return (
    <div className="sticky top-[100px] bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 p-6 rounded-none">
      <div className="flex justify-between items-end mb-6">
        <h2 className="font-display text-2xl text-white tracking-tight">FILTERS</h2>
        <button 
          onClick={clearAll}
          className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-8">
        {/* Search */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Search</label>
          <input
            type="text"
            value={state.q || ''}
            onChange={handleSearch}
            placeholder="SEARCH..."
            className="w-full bg-transparent border-b border-white/20 text-white py-2 focus:outline-none focus:border-accent transition-colors text-sm uppercase tracking-wide placeholder:text-white/20"
          />
        </div>

        {/* Kind */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-3">What</label>
          <div className="flex flex-col gap-3">
            {['all', 'trip', 'vehicle', 'stay'].map(k => (
              <label key={k} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-3 h-3 border transition-colors flex items-center justify-center ${currentKind === k ? 'border-accent bg-accent/20' : 'border-white/30 group-hover:border-accent/60'}`}>
                  {currentKind === k && <div className="w-1.5 h-1.5 bg-accent" />}
                </div>
                <input 
                  type="radio" 
                  name="kind" 
                  value={k} 
                  checked={currentKind === k}
                  onChange={() => setFilter('kind', k === 'all' ? undefined : k)}
                  className="hidden" 
                />
                <span className={`text-xs tracking-[0.1em] uppercase ${currentKind === k ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                  {k === 'all' ? 'Everything' : k + 's'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Type / Category */}
        {uniqueTypeFacets.length > 0 && (
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-3">Type</label>
            <div className="flex flex-col gap-3">
              {uniqueTypeFacets.map(f => (
                <label key={f.slug} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-3 h-3 border transition-colors flex items-center justify-center ${state.type.includes(f.slug) ? 'border-accent bg-accent/20' : 'border-white/30 group-hover:border-accent/60'}`}>
                    {state.type.includes(f.slug) && <div className="w-1.5 h-1.5 bg-accent" />}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={state.type.includes(f.slug)}
                    onChange={() => toggleFilter('type', f.slug)}
                    className="hidden" 
                  />
                  <span className={`text-xs tracking-[0.1em] uppercase ${state.type.includes(f.slug) ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {f.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Region */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-3">Region</label>
          <div className="flex flex-col gap-3">
            {REGIONS.map(r => (
              <label key={r.slug} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-3 h-3 border transition-colors flex items-center justify-center ${state.region.includes(r.slug) ? 'border-accent bg-accent/20' : 'border-white/30 group-hover:border-accent/60'}`}>
                  {state.region.includes(r.slug) && <div className="w-1.5 h-1.5 bg-accent" />}
                </div>
                <input 
                  type="checkbox" 
                  checked={state.region.includes(r.slug)}
                  onChange={() => toggleFilter('region', r.slug)}
                  className="hidden" 
                />
                <span className={`text-xs tracking-[0.1em] uppercase ${state.region.includes(r.slug) ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                  {r.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Availability */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-3">Availability</label>
          <div className="flex flex-col gap-3">
            {AVAILABILITY_FACETS.map(a => (
              <label key={a.slug} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-3 h-3 border transition-colors flex items-center justify-center ${state.avail.includes(a.slug) ? 'border-accent bg-accent/20' : 'border-white/30 group-hover:border-accent/60'}`}>
                  {state.avail.includes(a.slug) && <div className="w-1.5 h-1.5 bg-accent" />}
                </div>
                <input 
                  type="checkbox" 
                  checked={state.avail.includes(a.slug)}
                  onChange={() => toggleFilter('avail', a.slug)}
                  className="hidden" 
                />
                <span className={`text-xs tracking-[0.1em] uppercase ${state.avail.includes(a.slug) ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                  {a.label}
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
