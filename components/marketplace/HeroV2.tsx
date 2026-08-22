'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { APPLE_EASE } from '@/lib/constants'
import { DiscoveryInput } from '@/components/home/DiscoveryInput'
import { DestinationConsole } from '@/components/home/DestinationConsole'
import { VehicleConsole } from './VehicleConsole'
import { StayConsole } from './StayConsole'
import { OpsTicker } from '@/components/home/OpsTicker'
import { HeroCanvas } from './HeroCanvas'
import { Map, Settings, Home } from 'lucide-react'

export function HeroV2() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0])
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"])

  const [destination, setDestination] = useState('')
  const [hoverDest, setHoverDest] = useState<string | null>(null)
  const [intent, setIntent] = useState<'TRIPS' | 'RIDES' | 'STAYS'>('TRIPS')

  const displayValue = hoverDest !== null ? hoverDest : destination

  return (
    <section ref={heroRef} aria-label="Hero" className="relative h-screen w-full overflow-hidden bg-[#050505]">
      
      {/* Background Image Layer (mirrors Home page hero) */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          initial={{ scale: 1.1 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0"
        >
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/30 mix-blend-multiply h-[55vh] md:h-full" />
        <div className="absolute inset-0 bg-[#050505]/60 h-[55vh] md:h-full" /> 
      </motion.div>

      {/* Dynamic Animated Canvas Background */}
      <HeroCanvas intent={intent} />

      <motion.div 
        style={{ opacity: heroOpacity }} 
        className="relative z-10 w-full h-full flex flex-col md:flex-row max-w-[1440px] mx-auto pt-32 pb-12"
      >
        <div className="w-full md:w-[45%] lg:w-[50%] flex flex-col justify-start px-6 md:px-12 h-full z-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.8 }}
            className="flex flex-col mt-4 md:mt-12"
          >
            {/* 3-way Intent Switch (HUD Style) */}
            <div className="flex items-center gap-4 md:gap-6 mb-10">
               {[
                 { id: 'TRIPS', label: 'ROUTE', icon: Map },
                 { id: 'RIDES', label: 'MACHINE', icon: Settings },
                 { id: 'STAYS', label: 'REFUGE', icon: Home }
               ].map((item) => {
                  const Icon = item.icon
                  const isActive = intent === item.id
                  return (
                    <button 
                       key={item.id}
                       onClick={() => setIntent(item.id as any)}
                       className={`flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.2em] font-mono uppercase transition-colors relative group ${isActive ? 'text-accent' : 'text-white/30 hover:text-white/60'}`}
                    >
                       <span className="text-white/20 group-hover:text-white/40 transition-colors">[</span>
                       <Icon size={12} className={isActive ? 'text-accent' : 'text-white/40'} />
                       {item.label}
                       <span className="text-white/20 group-hover:text-white/40 transition-colors">]</span>
                       
                       {isActive && (
                          <motion.div layoutId="intentIndicator" className="absolute -bottom-3 left-0 right-0 h-[2px] bg-accent/80 shadow-[0_0_8px_#FF3E00]" />
                       )}
                    </button>
                  )
               })}
            </div>

            {/* Headline Wrapper for perfect sync */}
            <div className="relative mb-4">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 2 }}
                className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] tracking-tighter text-white leading-[0.85] uppercase mix-blend-overlay break-words relative z-10"
              >
                Assemble<br />The Journey.
              </motion.h1>
              <h1 
                className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] tracking-tighter leading-[0.85] uppercase absolute top-0 left-0 w-full h-full pointer-events-none z-0" 
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)', color: 'transparent' }} 
                aria-hidden
              >
                Assemble<br />The Journey.
              </h1>
            </div>

            <p className="font-sans text-[11px] md:text-[13px] font-light tracking-wide text-white/50 mb-8 mt-2 max-w-sm leading-relaxed border-l border-accent/40 pl-4">
              The route. The machine. The refuge.<br/>One unbroken ecosystem — wherever the terrain gets serious.
            </p>

            <DiscoveryInput intent={intent} value={displayValue} onChange={setDestination} />

            <div className="mt-8 pt-4 border-t border-white/10 w-full max-w-lg">
               <OpsTicker />
            </div>
          </motion.div>
        </div>
        
        <div className="hidden md:flex md:w-[55%] lg:w-[50%] h-full justify-end items-center pr-6 md:pr-12 pointer-events-auto">
           {intent === 'TRIPS' && <DestinationConsole onHoverDestination={setHoverDest} onLeaveDestination={() => setHoverDest(null)} />}
           {intent === 'RIDES' && <VehicleConsole />}
           {intent === 'STAYS' && <StayConsole />}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-12 right-6 md:right-12 z-20 text-white/30 flex flex-col items-center gap-4 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] rotate-90 origin-right translate-x-3">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="mt-8">
          <ChevronDown size={12} />
        </motion.div>
      </motion.div>
    </section>
  )
}
