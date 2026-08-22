'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useMarketplaceFilters } from '@/hooks/useMarketplaceFilters'
import { TYPE_FACETS_BY_KIND } from '@/lib/marketplace/facets'

interface FilterChipsProps {
  kind: 'trip' | 'vehicle' | 'stay'
}

export function FilterChips({ kind }: FilterChipsProps) {
  const { state, toggleFilter, clearAll } = useMarketplaceFilters()
  
  const filters = TYPE_FACETS_BY_KIND[kind] || []
  const hasTypeFilter = state.type.length > 0

  return (
    <div className="sticky top-[64px] z-30 bg-[#050505]/90 backdrop-blur-xl py-5 mt-4 mb-20 -mx-6 px-6 md:mx-0 md:px-0 border-b border-white/5 overflow-x-auto no-scrollbar">
      <div className="flex gap-3 pb-1 min-w-max">
        <motion.button
          onClick={() => clearAll()}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`flex-shrink-0 px-7 py-3 border transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.2em]
            ${!hasTypeFilter
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
            }`}
        >
          All
        </motion.button>
        {filters.map((f) => (
          <motion.button
            key={f.slug}
            onClick={() => toggleFilter('type', f.slug)}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            aria-pressed={state.type.includes(f.slug)}
            role="button"
            className={`flex-shrink-0 px-7 py-3 border transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.2em]
              ${state.type.includes(f.slug)
                ? 'bg-accent/10 text-accent border-accent'
                : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
              }`}
          >
            {f.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
