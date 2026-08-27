'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Triangle } from 'lucide-react'

import { APPLE_EASE } from '@/lib/constants'
import { TYPE_FACETS_BY_KIND } from '@/lib/marketplace/facets'
import { RouteBoard } from '@/components/marketplace/RouteBoard'
import { TripBuilderScene } from '@/components/marketplace/TripBuilderScene'
import { ManifestScene } from '@/components/home/ManifestScene'

const CATEGORIES: {
  kind: 'trip' | 'vehicle' | 'stay'
  label: string
  desc: string
  image: string
}[] = [
  { kind: 'trip', label: 'Trips', desc: 'End-to-end guided expeditions across the highest motorable passes on Earth.', image: '/exp-ladakh.jpg' },
  { kind: 'vehicle', label: 'Rides', desc: 'Altitude-engineered motorcycles and 4x4s, prepped for the terrain you\'re actually entering.', image: '/exp-spiti.jpg' },
  { kind: 'stay', label: 'Stays', desc: 'Lodges, camps, and refuges at the edge of the map — vetted, not just listed.', image: '/hero-mountain.jpg' },
]

function CategoryTile({ category, index }: { category: typeof CATEGORIES[0], index: number }) {
  const types = TYPE_FACETS_BY_KIND[category.kind]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: APPLE_EASE, delay: index * 0.08 }}
    >
      <Link
        href={`/marketplace/search?kind=${category.kind}`}
        className="group relative block aspect-[4/5] overflow-hidden bg-[#0A0A0A]"
      >
        <Image
          src={category.image}
          alt={category.label}
          fill
          className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
          <div className="flex items-center gap-2 text-[9px] font-sans tracking-[0.3em] uppercase text-accent mb-4">
            <Triangle size={6} className="fill-accent stroke-none" /> {types.length} Types
          </div>
          <h3 className="font-display text-white text-5xl md:text-6xl mb-4 group-hover:text-accent transition-colors duration-500">
            {category.label}
          </h3>
          <p className="font-sans text-sm text-white/50 font-light leading-relaxed max-w-xs mb-8">
            {category.desc}
          </p>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-sans text-white/80 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            Browse {category.label} <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function MarketplaceHub() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <main className="bg-background text-foreground selection:bg-accent selection:text-white">

      {/* ═ HERO ═ */}
      <section ref={heroRef} className="relative min-h-[70vh] w-full overflow-hidden bg-[#050505]">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image src="/hero-cinematic.jpg" alt="The Ecosystem" fill priority className="object-cover opacity-40 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end pt-32 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.2 }}
            className="text-[10px] tracking-[0.3em] font-sans text-accent uppercase mb-4"
          >
            Everything, In One Place
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.3 }}
            className="font-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.85] tracking-tighter text-white uppercase"
          >
            The Ecosystem.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.4 }}
            className="font-sans text-white/50 font-light text-lg max-w-lg mt-8"
          >
            Trips, rides, and stays — assembled from the same vetted inventory. Pick a category below, or browse everything at once.
          </motion.p>
        </div>
      </section>

      {/* ═ CATEGORY TILES ═ */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <p className="section-label mb-6">Choose a Category</p>
            <h2 className="font-display text-white text-4xl md:text-5xl leading-[0.95]">What are you<br />assembling?</h2>
          </div>
          <Link
            href="/marketplace/search"
            className="inline-flex items-center gap-3 text-[10px] uppercase font-sans tracking-[0.25em] text-white/70 hover:text-accent transition-colors border-b border-white/20 hover:border-accent pb-1 shrink-0"
          >
            Browse Everything <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CATEGORIES.map((cat, i) => (
            <CategoryTile key={cat.kind} category={cat} index={i} />
          ))}
        </div>
      </section>

      {/* ═ BUILD YOUR MANIFEST (unified tabbed builder) ═ */}
      <TripBuilderScene />

      {/* ═ ACTIVE MANIFESTS ═ */}
      <section className="py-24 bg-secondary border-t border-white/5 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
          <p className="section-label mb-6">Living Within the Himachal & Ladakh Circuit</p>
          <h2 className="font-display text-4xl text-white">Ready-Made Trips.</h2>
          <p className="font-sans text-sm text-white/50 mt-4 max-w-xl">Curated combinations of a trip, a ride, and a stay. Start from one of these, or build your own from scratch.</p>
        </div>
        <RouteBoard />
      </section>

      {/* ═ THE MANIFEST ═ */}
      <ManifestScene />

      {/* ═ CLOSING CTA ═ */}
      <section className="relative py-40 md:py-56 bg-background overflow-hidden flex items-center justify-center z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[600px] aspect-square bg-accent/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h2 className="font-display text-4xl md:text-6xl text-white mb-12 leading-[1.1]">
            Every route, every machine,<br />
            <span className="text-accent italic font-light">every refuge — one search.</span>
          </h2>
          <Link href="/marketplace/search" className="btn-accent inline-flex items-center gap-3 px-8 py-4 text-[10px] tracking-[0.2em]">
            Browse Everything <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </main>
  )
}
