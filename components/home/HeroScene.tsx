'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { APPLE_EASE, EXPEDITION_TYPES } from '@/lib/constants'
import { DiscoveryInput } from './DiscoveryInput'
import { OpsTicker } from './OpsTicker'

import { DestinationConsole } from './DestinationConsole'

export function HeroScene() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0])

  const [destination, setDestination] = React.useState('')
  const [hoverDest, setHoverDest] = React.useState<string | null>(null)

  // Use the hovered destination if present, otherwise the typed destination
  const displayValue = hoverDest !== null ? hoverDest : destination

  return (
    <section ref={heroRef} aria-label="Hero" className="relative h-screen w-full overflow-hidden bg-[#050505]">
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0"
        >
          {/* On mobile, crop to top 55vh, desktop full bleed */}
          <div className="relative w-full h-[55vh] md:h-full">
            <Image
              src="/hero-cinematic.jpg"
              alt="Himalayan Expedition"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-50 grayscale mix-blend-luminosity"
            />
          </div>
        </motion.div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30 mix-blend-multiply h-[55vh] md:h-full" />
        <div className="absolute inset-0 bg-[#050505]/20 h-[55vh] md:h-full" /> 
      </motion.div>

      {/* 40/60 Asymmetric Split Grid */}
      <motion.div 
        style={{ opacity: heroOpacity }} 
        className="relative z-10 w-full h-full flex flex-col md:flex-row max-w-[1440px] mx-auto"
      >
        {/* Left Column (40% Desktop, 100% Mobile) */}
        <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-end md:justify-center px-6 md:px-12 pb-24 md:pb-0 h-full max-w-[560px] md:bg-transparent bg-[#050505] mt-[55vh] md:mt-0 z-20 absolute md:static inset-0 md:inset-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.5 }}
            className="flex flex-col"
          >
            <p className="font-sans text-[11px] md:text-[13px] font-light tracking-wide text-white/50 mb-6 max-w-sm leading-relaxed">
              The route. The machine. The refuge.<br/>One unbroken ecosystem for high-altitude exploration.
            </p>
            
            <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] tracking-tighter text-white leading-[0.85] uppercase pb-4">
              Assemble<br />
              <span className="text-accent/90 relative">
                The Journey.
                <span className="absolute inset-0 blur-2xl bg-accent opacity-20 pointer-events-none" />
              </span>
            </h1>

            <DiscoveryInput value={displayValue} onChange={setDestination} />

            <div className="mt-4">
               <OpsTicker />
            </div>
          </motion.div>
        </div>
        
        {/* Right Column (60% Desktop) - Space for the visual */}
        <div className="hidden md:flex md:w-[55%] lg:w-[60%] h-full">
           <DestinationConsole onHoverDestination={setHoverDest} onLeaveDestination={() => setHoverDest(null)} />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute bottom-12 right-6 md:right-12 z-20 text-white/30 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] rotate-90 origin-right translate-x-3">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="mt-8">
          <ChevronDown size={12} />
        </motion.div>
      </motion.div>
    </section>
  )
}
