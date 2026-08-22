'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useMarketplaceFilters } from '@/hooks/useMarketplaceFilters'
import { REGIONS, AVAILABILITY_FACETS, TYPE_FACETS_BY_KIND } from '@/lib/marketplace/facets'

export function ActiveFilterBar() {
  const { state, toggleFilter, clearAll } = useMarketplaceFilters()

  // Find label by slug
  const getLabel = (slug: string, collection: {slug: string, label: string}[]) => {
    return collection.find(c => c.slug === slug)?.label || slug
  }
  
  const allTypeFacets = [
    ...TYPE_FACETS_BY_KIND.trip, 
    ...TYPE_FACETS_BY_KIND.vehicle, 
    ...TYPE_FACETS_BY_KIND.stay
  ]

  const activeFilters: { key: any, slug: string, label: string }[] = []

  state.region.forEach(r => activeFilters.push({ key: 'region', slug: r, label: getLabel(r, REGIONS) }))
  state.type.forEach(t => activeFilters.push({ key: 'type', slug: t, label: getLabel(t, allTypeFacets) }))
  state.avail.forEach(a => activeFilters.push({ key: 'avail', slug: a, label: getLabel(a, AVAILABILITY_FACETS) }))
  // add others if needed (season, dur)

  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <AnimatePresence>
        {activeFilters.map(f => (
          <motion.button
            key={`${f.key}-${f.slug}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => toggleFilter(f.key, f.slug)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white uppercase tracking-widest transition-colors"
            aria-label={`Remove ${f.label} filter`}
          >
            {f.label}
            <X size={12} className="text-white/50" />
          </motion.button>
        ))}
      </AnimatePresence>

      <button
        onClick={clearAll}
        className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors ml-2"
      >
        Clear All
      </button>
    </div>
  )
}
