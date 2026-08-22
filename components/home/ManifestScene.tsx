'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ROUTE_GROUPS } from '@/lib/data/route-board'
import { useJourneyStore } from '@/lib/store/journey-store'
import { APPLE_EASE } from '@/lib/constants'

interface ManifestLineData {
  type: 'ROUTE' | 'MACHINE' | 'REFUGE'
  name: string
  meta: string
  filled: boolean
}

export function ManifestScene() {
  const router = useRouter()
  const addItem = useJourneyStore((s) => s.addItem)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const selectedGroup = ROUTE_GROUPS.find((g) => g.regionSlug === selectedRegion) ?? null

  const lines: ManifestLineData[] = selectedGroup
    ? [
        {
          type: 'ROUTE',
          name: selectedGroup.trip.title,
          meta: `${selectedGroup.trip.duration} · ${selectedGroup.trip.price}`,
          filled: true,
        },
        selectedGroup.vehicle
          ? {
              type: 'MACHINE',
              name: selectedGroup.vehicle.name,
              meta: `${selectedGroup.vehicle.altitudeRating} · ${selectedGroup.vehicle.dailyRate} / day`,
              filled: true,
            }
          : { type: 'MACHINE', name: 'Not Requisitioned', meta: 'No machine partner on this route yet', filled: false },
        selectedGroup.stay
          ? {
              type: 'REFUGE',
              name: selectedGroup.stay.name,
              meta: `${selectedGroup.stay.elevation} · ${selectedGroup.stay.nightlyRate} / night`,
              filled: true,
            }
          : { type: 'REFUGE', name: 'Not Requisitioned', meta: 'No refuge partner on this route yet', filled: false },
      ]
    : []

  const stampDelay = 0.15 + lines.length * 0.15 + 0.3
  const ctaDelay = stampDelay + 0.5

  function handleBeginBooking() {
    if (!selectedGroup) return
    addItem({ slug: selectedGroup.trip.slug, kind: 'trip' })
    if (selectedGroup.vehicle) addItem({ slug: selectedGroup.vehicle.slug, kind: 'vehicle' })
    if (selectedGroup.stay) addItem({ slug: selectedGroup.stay.slug, kind: 'stay' })
    router.push('/booking')
  }

  return (
    <section className="py-32 md:py-48 bg-secondary relative z-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 max-w-xl">
          <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent/50 block" /> The Manifest
          </p>
          <h2 className="font-display text-white text-5xl md:text-7xl leading-[0.9] mb-6">Draft Your<br />Passage.</h2>
          <p className="font-sans text-[13px] font-light tracking-wide text-white/50 leading-relaxed border-l border-white/20 pl-4">
            Select a territory. We assemble the route, the machine, and the refuge — then authorize your passage.
          </p>
        </div>

        {/* Territory Selector (bracket tabs) */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 md:gap-x-12 mb-16 md:mb-20 pb-6 border-b border-white/10">
          {ROUTE_GROUPS.map((g) => {
            const isActive = selectedRegion === g.regionSlug
            return (
              <button
                key={g.regionSlug}
                onClick={() => setSelectedRegion(g.regionSlug)}
                className={`flex items-center gap-2 text-[11px] md:text-[12px] tracking-[0.2em] font-mono uppercase transition-colors relative pb-4 ${
                  isActive ? 'text-accent' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <span className="text-white/20">[</span>
                {g.trip.location.split(',')[0]}
                <span className="text-white/20">]</span>
                {isActive && (
                  <motion.div
                    layoutId="manifestIndicator"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-accent/80 shadow-[0_0_8px_#FF3E00]"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Manifest Document Panel */}
        <div className="max-w-2xl relative border border-white/10 bg-[#0A0A0A] min-h-[420px] p-8 md:p-12">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />

          <AnimatePresence mode="wait">
            {!selectedGroup ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: APPLE_EASE }}
                className="h-full min-h-[350px] flex flex-col items-center justify-center text-center gap-3"
              >
                <p className="font-display text-2xl text-white/40">Manifest is blank.</p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30">Select a territory above to begin</p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedRegion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: APPLE_EASE }}
              >
                <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mb-6 flex justify-between border-b border-white/10 pb-4">
                  <span>Manifest No. GVH-{selectedGroup.trip.slug.toUpperCase()}</span>
                  <span>{selectedGroup.regionLabel}</span>
                </div>

                {lines.map((line, i) => (
                  <motion.div
                    key={line.type}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.15, duration: 0.5, ease: APPLE_EASE }}
                    className="flex flex-col gap-1 py-4 border-b border-white/5 font-mono"
                  >
                    <div className="flex justify-between items-baseline text-[11px] md:text-[13px] tracking-widest uppercase">
                      <span className="text-white/50">{line.type}</span>
                      <span className={line.filled ? 'text-white' : 'text-white/30 italic'}>{line.name}</span>
                    </div>
                    <div className="flex justify-end">
                      <span className={`text-[9px] md:text-[10px] tracking-[0.2em] ${line.filled ? 'text-accent/80' : 'text-white/20'}`}>
                        {line.meta}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* The Stamp */}
                <div className="flex justify-center my-10">
                  <motion.div
                    initial={{ scale: 2.4, opacity: 0, rotate: -18 }}
                    animate={{ scale: 1, opacity: 1, rotate: -6 }}
                    transition={{ delay: stampDelay, type: 'spring', stiffness: 300, damping: 12 }}
                    className="border-[3px] border-accent text-accent px-6 py-3 pointer-events-none select-none"
                    style={{
                      clipPath:
                        'polygon(2% 8%, 15% 0%, 85% 3%, 98% 12%, 96% 90%, 82% 100%, 10% 97%, 0% 85%)',
                    }}
                  >
                    <span className="block font-mono text-base md:text-xl tracking-[0.15em] uppercase text-center">
                      Cleared
                    </span>
                    <span className="block font-mono text-base md:text-xl tracking-[0.15em] uppercase text-center">
                      For Passage
                    </span>
                  </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ctaDelay, duration: 0.5, ease: APPLE_EASE }}
                  className="flex justify-center"
                >
                  <button
                    onClick={handleBeginBooking}
                    className="inline-flex items-center gap-3 bg-accent text-white font-sans text-[10px] tracking-[0.3em] uppercase px-8 py-5 hover:bg-white hover:text-black transition-colors"
                  >
                    Begin Booking <ArrowRight size={14} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
