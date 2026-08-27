'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DESTINATIONS, DESTINATION_MICROSITES } from '@/lib/constants'
import { EXPEDITIONS } from '@/lib/data/expeditions'
import { vehicles } from '@/lib/data/vehicles'
import { stays } from '@/lib/data/stays'
import { requiresVehicle } from '@/lib/marketplace/facets'

export function DestinationsScene() {
  return (
    <section className="py-32 bg-[#0A0A0A] border-t border-white/5 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-6 flex items-center gap-4">
          <span className="w-8 h-px bg-accent/50 block" /> Explore by Region
        </p>
        <h2 className="font-display text-white text-5xl md:text-7xl leading-[0.9] mb-24">
          The Destinations.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
          {DESTINATIONS.map((dest, i) => {
            const regionTrips = EXPEDITIONS.filter((e) => e.regionSlug === dest.regionSlug)
            const roadTrips = regionTrips.filter((e) => requiresVehicle(e))
            const treks = regionTrips.filter((e) => !requiresVehicle(e))
            const hasRide = vehicles.some((v) => v.regionSlug === dest.regionSlug)
            const hasStay = stays.some((s) => s.regionSlug === dest.regionSlug)

            const primaryHref = DESTINATION_MICROSITES[dest.regionSlug] ?? `/marketplace/search?region=${dest.regionSlug}`

            const summary = [
              roadTrips.length ? `${roadTrips.length} Road Trip${roadTrips.length !== 1 ? 's' : ''}` : null,
              treks.length ? `${treks.length} Trek${treks.length !== 1 ? 's' : ''}` : null,
              hasRide ? 'Ride' : null,
              hasStay ? 'Stay' : null,
            ].filter(Boolean) as string[]

            return (
              <div key={i} className="flex flex-col group">
                <span className="text-accent/50 font-mono text-sm mb-4">0{i + 1}</span>
                <h3 className="font-display text-3xl md:text-4xl text-white mb-2">{dest.name}</h3>
                <p className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/40 mb-4">{dest.region}</p>

                <p className="text-[9px] tracking-[0.2em] font-mono uppercase text-accent/70 mb-6">
                  {summary.length > 0 ? summary.join(' · ') : 'Coming Soon'}
                </p>

                <p className="font-sans text-sm font-light text-white/60 leading-relaxed mb-8 flex-1">
                  {dest.description}
                </p>

                <div className="flex flex-col gap-2 mb-8">
                  {dest.highlights.map((highlight, j) => (
                    <div key={j} className="flex items-center gap-2 text-white/30 text-xs font-mono uppercase">
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      {highlight}
                    </div>
                  ))}
                </div>

                {/* Category links — only for what this region actually has */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                  {roadTrips.length > 0 && (
                    <Link
                      href={`/expeditions?region=${dest.regionSlug}&type=motorcycle,4x4`}
                      className="text-[9px] uppercase font-mono tracking-[0.2em] text-white/40 hover:text-accent transition-colors"
                    >
                      Road Trips
                    </Link>
                  )}
                  {treks.length > 0 && (
                    <Link
                      href={`/expeditions?region=${dest.regionSlug}&type=trek`}
                      className="text-[9px] uppercase font-mono tracking-[0.2em] text-white/40 hover:text-accent transition-colors"
                    >
                      Treks
                    </Link>
                  )}
                  {hasRide && (
                    <Link
                      href={`/rides?region=${dest.regionSlug}`}
                      className="text-[9px] uppercase font-mono tracking-[0.2em] text-white/40 hover:text-accent transition-colors"
                    >
                      Rides
                    </Link>
                  )}
                  {hasStay && (
                    <Link
                      href={`/stays?region=${dest.regionSlug}`}
                      className="text-[9px] uppercase font-mono tracking-[0.2em] text-white/40 hover:text-accent transition-colors"
                    >
                      Stays
                    </Link>
                  )}
                </div>

                <Link href={primaryHref} className="inline-flex items-center justify-between text-[10px] uppercase font-sans tracking-[0.2em] text-white/80 hover:text-accent transition-colors pb-3 border-b border-white/10 hover:border-accent">
                  Explore Region <ArrowRight size={12} />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
