'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { APPLE_EASE } from '@/lib/constants'
import { MarketplaceItem } from '@/lib/types/marketplace'
import { FilterChips } from './filters/FilterChips'
import { ActiveFilterBar } from './filters/ActiveFilterBar'
import { MobileFilterSheet } from './filters/MobileFilterSheet'
import { ResultsGrid } from './ResultsGrid'
import { useMarketplaceFilters } from '@/hooks/useMarketplaceFilters'
import { applyFilters } from '@/lib/marketplace/apply-filters'

interface ListingTemplateProps {
  title: string
  subtitle: string
  heroImage: string
  kind: 'trip' | 'vehicle' | 'stay'
  items: (MarketplaceItem & any)[]
}

export function ListingTemplate({ title, subtitle, heroImage, kind, items }: ListingTemplateProps) {
  const { state } = useMarketplaceFilters()
  
  const [heroY, setHeroY] = useState(0)
  const [heroOpacity, setHeroOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setHeroY(scrollY * 0.5)
      setHeroOpacity(Math.max(1 - scrollY / 500, 0))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredItems = useMemo(() => {
    // Force the kind for this page, then apply URL filters
    return applyFilters(items, { ...state, kind })
  }, [items, state, kind])

  return (
    <div className="bg-[#050505] min-h-[100vh] selection:bg-accent selection:text-white pb-40">
      
      {/* HERO */}
      <section className="relative h-[65vh] w-full overflow-hidden bg-[#050505]">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.05 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImage}
              alt={title}
              fill
              priority
              className="object-cover opacity-40 grayscale"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.2 }}
            className="text-[10px] tracking-[0.3em] font-sans text-accent uppercase mb-4"
          >
            {subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.3 }}
            className="font-display text-[clamp(4rem,10vw,10rem)] leading-[0.85] tracking-tighter text-white uppercase mix-blend-overlay opacity-90"
          >
            {title.split(' ').map((word, i, arr) => (
              <React.Fragment key={i}>
                {i === arr.length - 1 ? (
                  <span className="text-accent/80 mix-blend-normal relative">
                    {word}.
                    <span className="absolute inset-0 blur-xl bg-accent opacity-10" />
                  </span>
                ) : (
                  <>{word}<br /></>
                )}
              </React.Fragment>
            ))}
          </motion.h1>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <FilterChips kind={kind} />
        
        <div className="mt-8 mb-4">
          <MobileFilterSheet />
          <ActiveFilterBar />
        </div>

        {/* Editorial Grid */}
        <ResultsGrid items={filteredItems} />
      </div>
    </div>
  )
}
