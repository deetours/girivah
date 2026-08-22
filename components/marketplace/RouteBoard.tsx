'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Map, Settings, Home } from 'lucide-react'
import { ROUTE_GROUPS, RouteGroup } from '@/lib/data/route-board'
import { APPLE_EASE } from '@/lib/constants'

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 0.3, 
    transition: { duration: 1.5, ease: APPLE_EASE, delay: 0.2 } 
  }
}

function EmptyChip({ type }: { type: 'vehicle' | 'stay' }) {
  return (
    <div className="flex-1 min-w-[200px] border border-dashed border-white/10 flex items-center justify-center p-6 bg-[#050505]/20 backdrop-blur-sm">
      <div className="flex items-center gap-3 opacity-30">
        {type === 'vehicle' ? <Settings size={14} /> : <Home size={14} />}
        <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase">
          No {type} partner on this route yet
        </span>
      </div>
    </div>
  )
}

function EcosystemChip({ type, data }: { type: 'vehicle' | 'stay', data: any }) {
  const Icon = type === 'vehicle' ? Settings : Home
  const linkBase = type === 'vehicle' ? '/rides' : '/stays'
  const linkLabel = type === 'vehicle' ? 'RESERVE MACHINE' : 'SECURE REFUGE'

  return (
    <Link 
      href={`${linkBase}?category=${data.category}`}
      className="flex-1 min-w-[200px] group relative border border-white/10 hover:border-accent/40 bg-[#0A0A0A] p-6 transition-colors duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* HUD Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-accent transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-accent transition-colors" />

      <div>
        <div className="flex items-center gap-2 text-white/40 mb-3">
          <Icon size={12} className="group-hover:text-accent transition-colors" />
          <span className="font-mono text-[9px] uppercase tracking-widest">{type === 'vehicle' ? 'MACHINE' : 'REFUGE'}</span>
        </div>
        <h4 className="font-display text-lg text-white group-hover:text-accent transition-colors leading-tight mb-2 truncate">
          {data.name}
        </h4>
        <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
          {type === 'vehicle' ? data.altitudeRating : data.elevation} · {data.region}
        </span>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
        <span className="font-mono text-xs text-white tabular-nums">
          {type === 'vehicle' ? data.dailyRate : data.nightlyRate}
        </span>
        <div className="flex items-center gap-2 text-[9px] text-accent tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
          {linkLabel} <ArrowRight size={10} />
        </div>
      </div>
    </Link>
  )
}

function RouteRow({ group, index }: { group: RouteGroup, index: number }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: APPLE_EASE }}
      className="relative flex flex-col lg:flex-row gap-6 lg:gap-12 w-full items-stretch py-12"
    >
      {/* Center Connector SVG (Desktop Only) */}
      <div className="hidden lg:block absolute left-[55%] top-1/2 -translate-y-1/2 w-[10%] h-full pointer-events-none z-0">
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path 
            d="M 0 50 L 50 50 L 50 25 L 100 25 M 50 50 L 50 75 L 100 75" 
            fill="none" 
            stroke="#FF3E00" 
            strokeWidth="0.5"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </svg>
      </div>

      {/* Primary Trip Card */}
      <Link href={`/expeditions/${group.trip.slug}`} className="w-full lg:w-[55%] group relative bg-[#0A0A0A] border border-white/10 hover:border-accent/40 transition-colors duration-500 overflow-hidden flex flex-col h-[400px] md:h-[500px]">
        {/* Accent Triangle */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-l-[80px] border-t-accent border-l-transparent z-20 transition-transform duration-500 origin-top-right group-hover:scale-110" />
        <div className="absolute top-2 right-2 z-30 text-white font-mono text-[9px] tracking-widest rotate-45 origin-center -translate-y-1 translate-x-1">
          {group.trip.maxElevation}
        </div>

        <div className="relative w-full h-[65%] overflow-hidden">
          <Image
            src={group.trip.image}
            alt={group.trip.title}
            fill
            className="object-cover grayscale opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
          
          <div className="absolute top-6 left-6 flex items-center gap-2 text-white/50 bg-[#050505]/50 backdrop-blur-md px-3 py-1.5 border border-white/10">
            <Map size={12} />
            <span className="font-mono text-[9px] uppercase tracking-widest">ROUTE</span>
          </div>
        </div>

        <div className="relative z-10 flex-1 p-6 md:p-8 flex flex-col justify-end bg-[#0A0A0A]">
          <h3 className="font-display text-3xl md:text-5xl text-white uppercase tracking-tighter leading-none mb-3 group-hover:text-accent transition-colors duration-300">
            {group.trip.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] md:text-[11px] text-white/50 tracking-widest uppercase">
            <span>{group.regionLabel}</span>
            <span>{group.trip.duration}</span>
            <span className="text-white">{group.trip.price}</span>
          </div>
          
          <div className="absolute bottom-8 right-8 flex items-center gap-2 text-[10px] text-accent tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 duration-500">
            VIEW DOSSIER <ArrowRight size={14} />
          </div>
        </div>
      </Link>

      {/* Ecosystem Chips (Right Side) */}
      <div className="w-full lg:w-[35%] flex flex-col gap-6 relative z-10 lg:py-8 justify-center">
        {group.vehicle ? <EcosystemChip type="vehicle" data={group.vehicle} /> : <EmptyChip type="vehicle" />}
        {group.stay ? <EcosystemChip type="stay" data={group.stay} /> : <EmptyChip type="stay" />}
      </div>
    </motion.section>
  )
}

export function RouteBoard() {
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="mb-20 max-w-2xl"
        >
          <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tighter leading-[0.9]">
            The <span className="text-accent">Route Board.</span>
          </h2>
          <p className="font-sans text-[13px] font-light tracking-wide text-white/50 mt-6 leading-relaxed border-l border-white/20 pl-4">
            A route is not an ecosystem. Select a territory below to view the verified machines and refuges engineered specifically for that terrain.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 lg:gap-0">
          {ROUTE_GROUPS.map((group, i) => (
            <RouteRow key={group.regionSlug} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
