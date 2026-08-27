'use client'

import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EXPEDITIONS } from '@/lib/data/expeditions'
import { vehicles } from '@/lib/data/vehicles'
import { stays } from '@/lib/data/stays'
import { ROUTE_GROUPS } from '@/lib/data/route-board'
import { REGIONS, TYPE_FACETS_BY_KIND } from '@/lib/marketplace/facets'
import { applyFilters } from '@/lib/marketplace/apply-filters'
import { useJourneyStore } from '@/lib/store/journey-store'
import { APPLE_EASE } from '@/lib/constants'
import { ResultsGrid } from './ResultsGrid'
import { AddToTripButton } from './AddToTripButton'

type BuilderKind = 'trip' | 'vehicle' | 'stay' | 'gear'

const KIND_TABS: { kind: BuilderKind; label: string }[] = [
  { kind: 'trip', label: 'Trips' },
  { kind: 'vehicle', label: 'Rides' },
  { kind: 'stay', label: 'Stays' },
  { kind: 'gear', label: 'Gear' },
]

const KIND_SOURCE: Record<Exclude<BuilderKind, 'gear'>, { regionSlug: string }[]> = {
  trip: EXPEDITIONS,
  vehicle: vehicles,
  stay: stays,
}

export function TripBuilderScene() {
  const journeyStore = useJourneyStore()
  const [activeKind, setActiveKind] = useState<BuilderKind>('trip')
  const [activeType, setActiveType] = useState<string | null>(null)
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  function handleSelectKind(kind: BuilderKind) {
    setActiveKind(kind)
    setActiveType(null)
    setActiveRegion(null)
  }

  const typeFacets = activeKind === 'gear' ? [] : TYPE_FACETS_BY_KIND[activeKind]

  const availableRegions = useMemo(() => {
    if (activeKind === 'gear') return []
    const source = KIND_SOURCE[activeKind]
    return REGIONS.filter((r) => source.some((item) => item.regionSlug === r.slug))
  }, [activeKind])

  const filteredItems = useMemo(() => {
    if (activeKind === 'gear') return []
    return applyFilters(KIND_SOURCE[activeKind], {
      kind: activeKind,
      region: activeRegion ? [activeRegion] : [],
      type: activeType ? [activeType] : [],
      avail: [],
      season: [],
      dur: [],
    })
  }, [activeKind, activeRegion, activeType])

  const groups = journeyStore.groupedByKind()
  const totalCount = groups.trip.length + groups.vehicle.length + groups.stay.length

  const latestTripItem = groups.trip.length > 0 ? groups.trip[groups.trip.length - 1] : null
  const upsellGroup = latestTripItem ? ROUTE_GROUPS.find((g) => g.trip.slug === latestTripItem.slug) ?? null : null
  const upsellVehiclePending = Boolean(
    upsellGroup?.vehicle && !journeyStore.hasItem(`vehicle:${upsellGroup.vehicle.slug}`)
  )
  const upsellStayPending = Boolean(upsellGroup?.stay && !journeyStore.hasItem(`stay:${upsellGroup.stay.slug}`))
  const showUpsell = Boolean(upsellGroup && (upsellVehiclePending || upsellStayPending))

  return (
    <section className="py-32 md:py-48 bg-[#050505] relative z-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 max-w-2xl">
          <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent/50 block" /> One Cart, Every Category
          </p>
          <h2 className="font-display text-white text-5xl md:text-7xl leading-[0.9] mb-6">Build Your<br />Manifest.</h2>
          <p className="font-sans text-[13px] font-light tracking-wide text-white/50 leading-relaxed border-l border-white/20 pl-4">
            Pick a category, add exactly what you want — every card works the same way, everything lands in one trip.
          </p>
        </div>

        {/* Kind Tabs */}
        <div className="flex flex-wrap gap-x-8 gap-y-6 md:gap-x-12 mb-8 pb-6 border-b border-white/10">
          {KIND_TABS.map((tab) => {
            const isActive = activeKind === tab.kind
            return (
              <button
                key={tab.kind}
                onClick={() => handleSelectKind(tab.kind)}
                className="flex flex-col items-start gap-2 relative pb-4 group"
              >
                <span
                  className={`flex items-center gap-2 text-[11px] md:text-[12px] tracking-[0.2em] font-mono uppercase transition-colors ${
                    isActive ? 'text-accent' : 'text-white/40 group-hover:text-white/70'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-accent animate-pulse' : 'bg-white/20'}`} />
                  <span className="text-white/20">[</span>
                  {tab.label}
                  <span className="text-white/20">]</span>
                </span>
                {isActive && (
                  <motion.div
                    layoutId="builderKindIndicator"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-accent/80 shadow-[0_0_8px_#FF3E00]"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Facet Chips */}
        {activeKind !== 'gear' && (typeFacets.length > 0 || availableRegions.length > 0) && (
          <div className="flex flex-wrap gap-3 mb-16">
            {typeFacets.map((f) => (
              <button
                key={f.slug}
                onClick={() => setActiveType(activeType === f.slug ? null : f.slug)}
                className={`px-4 py-2.5 border font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  activeType === f.slug
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
            {availableRegions.map((r) => (
              <button
                key={r.slug}
                onClick={() => setActiveRegion(activeRegion === r.slug ? null : r.slug)}
                className={`px-4 py-2.5 border font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  activeRegion === r.slug
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
        {activeKind === 'gear' && <div className="mb-16" />}

        {/* Upsell */}
        <AnimatePresence>
          {showUpsell && upsellGroup && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: APPLE_EASE }}
              className="mb-10 border border-accent/30 bg-accent/5 px-6 py-5 md:px-8 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <span className="font-sans text-[13px] font-light text-white/70 leading-relaxed">
                Riding the <span className="text-white">{upsellGroup.trip.title}</span>? Pair it with:
              </span>
              <div className="flex flex-wrap items-center gap-6">
                {upsellVehiclePending && upsellGroup.vehicle && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                      {upsellGroup.vehicle.name}
                    </span>
                    <AddToTripButton item={upsellGroup.vehicle} variant="compact" label={upsellGroup.vehicle.name} />
                  </div>
                )}
                {upsellStayPending && upsellGroup.stay && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                      {upsellGroup.stay.name}
                    </span>
                    <AddToTripButton item={upsellGroup.stay} variant="compact" label={upsellGroup.stay.name} />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid / Gear placeholder */}
        {activeKind === 'gear' ? (
          <div className="border border-white/10 bg-[#0A0A0A] p-16 md:p-24 flex flex-col items-center justify-center text-center gap-4 min-h-[320px]">
            <p className="font-display text-3xl md:text-4xl text-white/40 uppercase tracking-tight">
              Gear Locker — Coming Soon.
            </p>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 max-w-sm">
              Altitude-rated jackets, oxygen kits, and expedition equipment — landing soon.
            </p>
          </div>
        ) : (
          <ResultsGrid items={filteredItems} />
        )}

        {/* Persistent Summary Bar */}
        <AnimatePresence>
          {totalCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: APPLE_EASE }}
              className="sticky bottom-6 z-30 mt-16 flex items-center justify-between gap-6 bg-[#0A0A0A]/95 backdrop-blur-md border border-white/10 px-6 py-5 md:px-8"
            >
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/70">
                {totalCount} {totalCount === 1 ? 'Item' : 'Items'} In Your Trip
              </span>
              <button
                onClick={() => journeyStore.openDrawer()}
                className="inline-flex items-center gap-3 bg-accent text-white font-sans text-[10px] tracking-[0.3em] uppercase px-6 py-3 hover:bg-white hover:text-black transition-colors"
              >
                Review & Book <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
