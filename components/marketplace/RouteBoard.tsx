'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight, ArrowUpRight, Settings, Home, Footprints, Flag, CheckCircle } from 'lucide-react'
import { ROUTE_GROUPS, RouteGroup } from '@/lib/data/route-board'
import { getTypeSlug, requiresVehicle } from '@/lib/marketplace/facets'
import { useJourneyStore } from '@/lib/store/journey-store'
import { AddToTripButton } from './AddToTripButton'

function ProductPill({
  icon: Icon,
  label,
  sub,
  muted,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  sub: string
  muted?: boolean
  href?: string
}) {
  const content = (
    <>
      <Icon size={12} className={muted ? 'text-white/40 shrink-0' : 'text-accent shrink-0'} />
      <div className="flex flex-col leading-tight min-w-0">
        <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">{label}</span>
        <span className={`font-mono text-[9px] uppercase tracking-wider truncate ${muted ? 'text-white/40 italic' : 'text-white/80 group-hover/pill:text-accent'} transition-colors`}>
          {sub}
        </span>
      </div>
    </>
  )
  const className = `group/pill flex items-center gap-2 min-w-0 ${muted ? 'opacity-40 pointer-events-none' : ''}`
  if (href && !muted) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }
  return <div className={className}>{content}</div>
}

function RouteCard({ group, onBuild }: { group: RouteGroup; index: number; onBuild: () => void }) {
  const isTrek = getTypeSlug(group.trip) === 'trek'
  const needsVehicle = requiresVehicle(group.trip)

  return (
    <div
      data-route-card
      className="group relative bg-[#0A0A0A] border border-white/10 hover:border-accent/40 transition-colors duration-500 flex flex-col overflow-hidden h-full"
    >
      <Link href={`/expeditions/${group.trip.slug}`} className="flex flex-col flex-1 min-h-0">
        <div className="relative w-full overflow-hidden aspect-[16/10]">
          <Image
            src={group.trip.image}
            alt={group.trip.title}
            fill
            className="object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-1.5 text-white/70 bg-[#050505]/60 backdrop-blur-md px-2.5 py-1.5 border border-white/10">
            {isTrek ? <Footprints size={10} /> : <Flag size={10} />}
            <span className="font-mono text-[8px] uppercase tracking-widest">{isTrek ? 'Trek' : 'Road Trip'}</span>
          </div>

          <div className="absolute top-0 right-0 w-0 h-0 border-t-[56px] border-l-[56px] border-t-accent border-l-transparent z-20 transition-transform duration-500 origin-top-right group-hover:scale-110" />
          <div className="absolute top-1.5 right-1.5 z-30 text-white font-mono text-[8px] tracking-widest rotate-45 origin-center -translate-y-0.5 translate-x-0.5">
            {group.trip.maxElevation}
          </div>

          {/* Same hover-action pattern as ProductCard (/expeditions, /rides, /stays) for consistency */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
            <AddToTripButton item={group.trip} variant="compact" />
            <div className="flex items-center justify-center w-10 h-10 bg-white text-black shrink-0">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 p-5 md:p-6 flex flex-col justify-end">
          <h3 className="font-display text-white uppercase tracking-tighter leading-none mb-2 text-xl md:text-2xl group-hover:text-accent transition-colors duration-300">
            {group.trip.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] md:text-[10px] text-white/50 tracking-widest uppercase">
            <span>{group.regionLabel}</span>
            <span>{group.trip.duration}</span>
            <span className="text-white">{group.trip.price}</span>
          </div>
        </div>
      </Link>

      {/* Ride / Stay — each independently addable, never implied mandatory */}
      <div className="relative z-10 px-5 md:px-6 pt-4 border-t border-white/5 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          {needsVehicle ? (
            group.vehicle ? (
              <ProductPill icon={Settings} label="Ride" sub={group.vehicle.name} href={`/rides?region=${group.regionSlug}`} />
            ) : (
              <ProductPill icon={Settings} label="Ride" sub="Coming Soon" muted />
            )
          ) : (
            <ProductPill icon={Footprints} label="Ride" sub="On Foot" />
          )}
          {needsVehicle && group.vehicle && <AddToTripButton item={group.vehicle} variant="compact" label={group.vehicle.name} />}
        </div>
        <div className="flex items-center justify-between gap-3">
          {group.stay ? (
            <ProductPill icon={Home} label="Stay" sub={group.stay.name} href={`/stays?region=${group.regionSlug}`} />
          ) : (
            <ProductPill icon={Home} label="Stay" sub="Coming Soon" muted />
          )}
          {group.stay && <AddToTripButton item={group.stay} variant="compact" label={group.stay.name} />}
        </div>
      </div>

      <div className="relative z-10 px-5 md:px-6 pb-5 md:pb-6 pt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-white/30">
          <CheckCircle size={10} className="text-accent/70" />
          <span className="font-mono text-[8px] uppercase tracking-widest">Verified Provider</span>
        </div>
        <button
          onClick={onBuild}
          className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-white/40 hover:text-accent transition-colors font-mono"
        >
          Build Bundle <ArrowRight size={10} />
        </button>
      </div>
    </div>
  )
}

export function RouteBoard() {
  const gridRef = useRef<HTMLDivElement>(null)
  const addItem = useJourneyStore((s) => s.addItem)
  const openDrawer = useJourneyStore((s) => s.openDrawer)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      const cards = gridRef.current?.querySelectorAll('[data-route-card]')
      if (!cards?.length) return

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.4)',
            stagger: { each: 0.08, from: 'start', grid: 'auto' },
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
          }
        )
      })

      return () => mm.revert()
    },
    { scope: gridRef }
  )

  function handleBuild(group: RouteGroup) {
    // Only the trip is added here — ride/stay stay exactly as the user already
    // set them via this card's own AddToTripButtons, never silently re-decided.
    addItem({ slug: group.trip.slug, kind: 'trip' })
    const manifest = document.getElementById('choose-destination')
    if (manifest) {
      manifest.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      openDrawer()
    }
  }

  return (
    <section className="w-full bg-[#050505] py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background Graticule for visual consistency with Hero */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-board" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-board)" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="mb-20 max-w-2xl">
          <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tighter leading-[0.9]">
            The <span className="text-accent">Full Trip.</span>
          </h2>
          <p className="font-sans text-[13px] font-light tracking-wide text-white/50 mt-6 leading-relaxed border-l border-white/20 pl-4">
            Trips, rides, and stays — grab exactly what you need, or take the whole route bundled.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {ROUTE_GROUPS.map((group, i) => (
            <RouteCard key={group.trip.slug} group={group} index={i} onBuild={() => handleBuild(group)} />
          ))}
        </div>
      </div>
    </section>
  )
}
