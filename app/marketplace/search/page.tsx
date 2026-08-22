'use client'

import React, { Suspense, useMemo } from 'react'
import { EXPEDITIONS } from '@/lib/data/expeditions'
import { vehicles } from '@/lib/data/vehicles'
import { stays } from '@/lib/data/stays'
import { FilterRail } from '@/components/marketplace/filters/FilterRail'
import { ActiveFilterBar } from '@/components/marketplace/filters/ActiveFilterBar'
import { MobileFilterSheet } from '@/components/marketplace/filters/MobileFilterSheet'
import { ResultsGrid } from '@/components/marketplace/ResultsGrid'
import { useMarketplaceFilters } from '@/hooks/useMarketplaceFilters'
import { applyFilters } from '@/lib/marketplace/apply-filters'

function SearchContent() {
  const { state } = useMarketplaceFilters()

  const allItems = useMemo(() => {
    return [...EXPEDITIONS, ...vehicles, ...stays]
  }, [])

  const filteredItems = useMemo(() => {
    return applyFilters(allItems, state)
  }, [allItems, state])

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12">
        {/* Left sidebar: Filter Rail (Desktop) */}
        <div className="hidden md:block w-full md:w-1/4">
          <FilterRail />
        </div>

        {/* Right side: Results Grid */}
        <div className="w-full md:w-3/4">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl tracking-tighter uppercase">
              Explore
            </h1>
            <p className="font-sans text-white/50 mt-2 text-sm uppercase tracking-widest">
              {filteredItems.length} {filteredItems.length === 1 ? 'Match' : 'Matches'} Found
            </p>
          </div>

          <MobileFilterSheet />
          <ActiveFilterBar />
          <ResultsGrid items={filteredItems} />
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <SearchContent />
    </Suspense>
  )
}
