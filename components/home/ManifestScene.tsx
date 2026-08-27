'use client'

import React, { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Flag, Footprints } from 'lucide-react'
import { ROUTE_GROUPS, RouteGroup } from '@/lib/data/route-board'
import { getExpeditionBySlug } from '@/lib/data/expeditions'
import { requiresVehicle, getTypeSlug } from '@/lib/marketplace/facets'
import { useJourneyStore } from '@/lib/store/journey-store'
import { AddToTripButton } from '@/components/marketplace/AddToTripButton'
import { APPLE_EASE } from '@/lib/constants'

interface ManifestLineData {
  type: 'TRIP' | 'RIDE' | 'STAY'
  name: string
  meta: string
  filled: boolean
}

interface RegionEntry {
  regionSlug: string
  regionLabel: string
  groups: RouteGroup[]
}

// Builds a normalized elevation-profile polyline (viewBox 0 0 300 100) from a
// trip's real day-by-day timeline, plus the index of its peak point.
function buildProfile(timeline: RouteGroup['trip']['elevationTimeline']) {
  const elevations = timeline.map((t) => t.elevation)
  const min = Math.min(...elevations)
  const max = Math.max(...elevations)
  const range = max - min || 1
  const points = timeline.map((t, i) => ({
    x: (i / Math.max(timeline.length - 1, 1)) * 300,
    y: 92 - ((t.elevation - min) / range) * 76,
  }))
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const peakIndex = elevations.indexOf(max)
  return { d, points, peakIndex }
}

export function ManifestScene() {
  const router = useRouter()
  const journey = useJourneyStore()

  const regions: RegionEntry[] = useMemo(() => {
    const bySlug = new Map<string, RouteGroup[]>()
    ROUTE_GROUPS.forEach((g) => {
      if (!bySlug.has(g.regionSlug)) bySlug.set(g.regionSlug, [])
      bySlug.get(g.regionSlug)!.push(g)
    })
    return Array.from(bySlug.entries()).map(([regionSlug, groups]) => ({
      regionSlug,
      regionLabel: groups[0].regionLabel,
      groups,
    }))
  }, [])

  // Defaults to the first destination so the console is alive on first paint
  // instead of sitting empty — the customer can still switch to any other
  // region at any time via the tabs below.
  const [selectedRegion, setSelectedRegion] = useState<string | null>(regions[0]?.regionSlug ?? null)
  const [selectedTripSlug, setSelectedTripSlug] = useState<string | null>(
    regions[0] && regions[0].groups.length === 1 ? regions[0].groups[0].trip.slug : null
  )

  const consoleRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  const selectedRegionEntry = regions.find((r) => r.regionSlug === selectedRegion) ?? null
  const tripsInRegion = selectedRegionEntry?.groups ?? []
  const needsTripChoice = tripsInRegion.length > 1
  // The route being browsed on the left console — a preview only, it never
  // writes to the trip bag by itself. Committing happens via the
  // AddToTripButtons below, same mechanism used everywhere else in the app.
  const previewGroup = needsTripChoice
    ? tripsInRegion.find((g) => g.trip.slug === selectedTripSlug) ?? null
    : tripsInRegion[0] ?? null

  function handleSelectRegion(entry: RegionEntry) {
    setSelectedRegion(entry.regionSlug)
    setSelectedTripSlug(entry.groups.length === 1 ? entry.groups[0].trip.slug : null)
  }

  const profile = previewGroup ? buildProfile(previewGroup.trip.elevationTimeline) : null

  // Draws the elevation profile in and staggers the day-log rows every time
  // a different route is previewed — the console "redraws" like an instrument.
  useGSAP(
    () => {
      if (!previewGroup || !profile || !pathRef.current) return
      const len = 1000 // generic arbitrary value, same convention as InfrastructureScene
      gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' })

      const rows = consoleRef.current?.querySelectorAll('[data-profile-row]')
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.3, ease: 'power2.out' }
        )
      }

      const markers = consoleRef.current?.querySelectorAll('[data-profile-marker]')
      if (markers?.length) {
        gsap.fromTo(
          markers,
          { scale: 0, transformOrigin: 'center' },
          { scale: 1, duration: 0.4, stagger: 0.05, delay: 0.2, ease: 'back.out(2)' }
        )
      }
    },
    { dependencies: [previewGroup?.trip.slug], scope: consoleRef }
  )

  // The Manifest Document Panel is a live view of the real trip bag
  // (useJourneyStore) — never a locally recomputed default. Whatever the user
  // actually added via AddToTripButton, anywhere in the app, shows up here
  // exactly as-is, and nothing gets silently re-added or overwritten.
  const groups = journey.groupedByKind()
  const latestTrip = groups.trip.length > 0 ? groups.trip[groups.trip.length - 1] : null
  const activeTrip = latestTrip ? getExpeditionBySlug(latestTrip.slug) ?? null : null

  // Ride and stay are always resolved from the active trip's OWN route group —
  // never from "whichever ride/stay was added most recently" — so switching
  // destinations never leaves a mismatched ride/stay glued to a new trip.
  const activeGroup = activeTrip ? ROUTE_GROUPS.find((g) => g.trip.slug === activeTrip.slug) ?? null : null
  const activeVehicle =
    activeGroup?.vehicle && journey.hasItem(`vehicle:${activeGroup.vehicle.slug}`) ? activeGroup.vehicle : null
  const activeStay =
    activeGroup?.stay && journey.hasItem(`stay:${activeGroup.stay.slug}`) ? activeGroup.stay : null

  const lines: ManifestLineData[] = activeTrip
    ? [
        {
          type: 'TRIP',
          name: activeTrip.title,
          meta: `${activeTrip.duration} · ${activeTrip.price}`,
          filled: true,
        },
        !requiresVehicle(activeTrip)
          ? {
              type: 'RIDE',
              name: 'On Foot',
              meta: 'No vehicle required — this is a foot expedition',
              filled: true,
            }
          : activeVehicle
          ? {
              type: 'RIDE',
              name: activeVehicle.name,
              meta: `${activeVehicle.altitudeRating} · ${activeVehicle.dailyRate} / day`,
              filled: true,
            }
          : { type: 'RIDE', name: 'Not added yet', meta: 'Add a ride above to include one', filled: false },
        activeStay
          ? {
              type: 'STAY',
              name: activeStay.name,
              meta: `${activeStay.elevation} · ${activeStay.nightlyRate} / night`,
              filled: true,
            }
          : { type: 'STAY', name: 'Not added yet', meta: 'Add a stay above to include one', filled: false },
      ]
    : []

  const stampDelay = 0.15 + lines.length * 0.15 + 0.3
  const ctaDelay = stampDelay + 0.5

  function handleBeginBooking() {
    if (!activeTrip) return
    router.push('/booking')
  }

  return (
    <section id="choose-destination" className="py-32 md:py-48 bg-secondary relative z-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 max-w-xl">
          <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent/50 block" /> Build a Bundle
          </p>
          <h2 className="font-display text-white text-5xl md:text-7xl leading-[0.9] mb-6">Choose Your<br />Destination.</h2>
          <p className="font-sans text-[13px] font-light tracking-wide text-white/50 leading-relaxed border-l border-white/20 pl-4">
            Preview a route, then add exactly the trip, ride, and stay you want — your manifest on the right always shows what's actually in your trip.
          </p>
        </div>

        {/* Territory Selector — bracket tabs with a live elevation/route-count readout */}
        <div className="flex flex-wrap gap-x-8 gap-y-6 md:gap-x-12 mb-8 pb-6 border-b border-white/10">
          {regions.map((r) => {
            const isActive = selectedRegion === r.regionSlug
            const peakElevation = r.groups.reduce(
              (max, g) => Math.max(max, g.trip.elevationNum),
              0
            )
            return (
              <button
                key={r.regionSlug}
                onClick={() => handleSelectRegion(r)}
                className="flex flex-col items-start gap-2 relative pb-4 group"
              >
                <span
                  className={`flex items-center gap-2 text-[11px] md:text-[12px] tracking-[0.2em] font-mono uppercase transition-colors ${
                    isActive ? 'text-accent' : 'text-white/40 group-hover:text-white/70'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-accent animate-pulse' : 'bg-white/20'}`} />
                  <span className="text-white/20">[</span>
                  {r.regionLabel.split(',')[0]}
                  <span className="text-white/20">]</span>
                </span>
                <span className="font-mono text-[9px] tracking-[0.15em] text-white/30 uppercase pl-3.5">
                  {peakElevation.toLocaleString('en-IN')} ft · {r.groups.length} route{r.groups.length !== 1 ? 's' : ''}
                </span>
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

        {/* Trip-Type Sub-Selector (only when a region has more than one product) */}
        {selectedRegionEntry && needsTripChoice && (
          <div className="flex flex-wrap gap-4 mb-16">
            {tripsInRegion.map((g) => {
              const isTrek = getTypeSlug(g.trip) === 'trek'
              const isActive = g.trip.slug === selectedTripSlug
              return (
                <button
                  key={g.trip.slug}
                  onClick={() => setSelectedTripSlug(g.trip.slug)}
                  className={`flex items-center gap-2 px-5 py-3 border font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                    isActive
                      ? 'border-accent text-accent bg-accent/10'
                      : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {isTrek ? <Footprints size={12} /> : <Flag size={12} />}
                  {isTrek ? 'Trek' : 'Road Trip'} — {g.trip.title}
                </button>
              )
            })}
          </div>
        )}
        {!(selectedRegionEntry && needsTripChoice) && <div className="mb-16" />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Elevation Profile Console */}
          <div ref={consoleRef} className="border border-white/10 bg-[#0A0A0A] p-6 md:p-8 relative min-h-[420px] flex flex-col">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />

            <div className="flex justify-between items-center mb-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Elevation Profile</span>
              {previewGroup && (
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                  {previewGroup.trip.maxElevation} Peak
                </span>
              )}
            </div>

            {previewGroup && (
              <div className="mb-6 pb-6 border-b border-white/10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">Add to Manifest</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Trip</span>
                  <AddToTripButton item={previewGroup.trip} variant="compact" label={previewGroup.trip.title} />
                </div>
                {requiresVehicle(previewGroup.trip) && previewGroup.vehicle && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Ride</span>
                    <AddToTripButton item={previewGroup.vehicle} variant="compact" label={previewGroup.vehicle.name} />
                  </div>
                )}
                {previewGroup.stay && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Stay</span>
                    <AddToTripButton item={previewGroup.stay} variant="compact" label={previewGroup.stay.name} />
                  </div>
                )}
              </div>
            )}

            {previewGroup && profile ? (
              <>
                <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="w-full h-32 md:h-40 overflow-visible">
                  <path
                    ref={pathRef}
                    d={profile.d}
                    fill="none"
                    stroke="#FF3E00"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  {profile.points.map((p, i) => (
                    <circle
                      key={i}
                      data-profile-marker
                      cx={p.x}
                      cy={p.y}
                      r={i === profile.peakIndex ? 2.6 : 1.4}
                      className={i === profile.peakIndex ? 'fill-accent' : 'fill-white/40'}
                    />
                  ))}
                </svg>

                <div className="mt-8 flex flex-col gap-2 flex-1 overflow-y-auto">
                  {previewGroup.trip.elevationTimeline.map((t, i) => (
                    <div
                      key={i}
                      data-profile-row
                      className="flex justify-between font-mono text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest border-b border-white/5 pb-2"
                    >
                      <span>Day {t.day} — {t.location}</span>
                      <span className={i === profile.peakIndex ? 'text-accent' : 'text-white/50'}>{t.elevLabel}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-white/20 font-mono text-[10px] uppercase tracking-widest text-center px-6">
                {selectedRegionEntry ? 'Choose a trip type above to see its profile' : 'Select a destination to see the profile'}
              </div>
            )}
          </div>

          {/* Manifest Document Panel — always reflects the real trip bag */}
          <div className="border border-white/10 bg-[#0A0A0A] min-h-[420px] p-8 md:p-12 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />

            <AnimatePresence mode="wait">
              {!activeTrip ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: APPLE_EASE }}
                  className="h-full min-h-[350px] flex flex-col items-center justify-center text-center gap-3"
                >
                  <p className="font-display text-2xl text-white/40">Your manifest is empty.</p>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30">
                    Preview a route on the left, then add it to your manifest
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeTrip.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: APPLE_EASE }}
                >
                  <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mb-6 flex justify-between border-b border-white/10 pb-4">
                    <span>Trip No. GVH-{activeTrip.slug.toUpperCase()}</span>
                    <span>{activeTrip.location}</span>
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
                        Trip
                      </span>
                      <span className="block font-mono text-base md:text-xl tracking-[0.15em] uppercase text-center">
                        Confirmed
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
      </div>
    </section>
  )
}
