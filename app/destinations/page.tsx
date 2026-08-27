'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Triangle } from 'lucide-react'
import { DESTINATIONS, DESTINATION_MICROSITES } from '@/lib/constants'
import Image from 'next/image'

const APPLE_EASE = [0.32, 0.72, 0, 1] as const

const DESTINATION_IMAGES: Record<string, string> = {
  'Ladakh': '/exp-ladakh.jpg',
  'Spiti Valley': '/exp-spiti.jpg',
  'Himachal Pradesh': '/hero-mountain.jpg',
  'Zanskar': '/exp-ladakh.jpg',
}

export default function DestinationsIndex() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <main className="bg-background min-h-[100vh] selection:bg-accent selection:text-white pb-40">
      
      {/* ═ HERO ═ */}
      <section ref={heroRef} className="relative h-[65vh] w-full overflow-hidden bg-[#050505]">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.05 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src="/hero-cinematic.jpg"
              alt="Destinations"
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
            The Regions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.3 }}
            className="font-display text-[clamp(4rem,10vw,10rem)] leading-[0.85] tracking-tighter text-white uppercase mix-blend-overlay opacity-90"
          >
            The<br />
            <span className="text-accent/80 mix-blend-normal relative">
              Territories.
              <span className="absolute inset-0 blur-xl bg-accent opacity-10" />
            </span>
          </motion.h1>
        </div>
      </section>

      {/* ═ LISTING ═ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 space-y-32">
        {DESTINATIONS.map((dest, i) => {
          const isReversed = i % 2 !== 0
          const destHref = DESTINATION_MICROSITES[dest.regionSlug]
            ?? `/marketplace/search?region=${dest.regionSlug}`

          return (
            <motion.div 
              key={dest.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
              className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center group`}
            >
              <div className="w-full md:w-[55%] relative aspect-[4/3] overflow-hidden bg-[#0A0A0A]">
                 <motion.div
                   whileHover={{ scale: 1.03 }}
                   transition={{ duration: 0.8, ease: APPLE_EASE }}
                   className="w-full h-full"
                 >
                   <Link href={destHref}>
                     <Image 
                       src={DESTINATION_IMAGES[dest.name] || '/hero-mountain.jpg'} 
                       alt={dest.name} 
                       fill 
                       className="object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" 
                     />
                   </Link>
                 </motion.div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-60" />
              </div>
              <div className="w-full md:w-[45%] flex flex-col items-start justify-center">
                 <div className="flex items-center gap-3 font-sans text-[9px] tracking-[0.25em] uppercase text-accent mb-6">
                    <Triangle size={6} className="fill-accent stroke-none" />
                    <span>{dest.region}</span>
                 </div>
                 <h2 className="font-display text-5xl md:text-7xl text-white mb-6 uppercase tracking-tight leading-none group-hover:text-white/90 transition-colors">
                   {dest.name}
                 </h2>
                 <p className="font-sans text-xl font-light text-white/50 leading-relaxed max-w-sm mb-12">
                   {dest.description}
                 </p>
                 <div className="flex flex-col gap-4 mb-12">
                    <h4 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/30">Highlights</h4>
                    <ul className="flex flex-col gap-2">
                      {dest.highlights.map(h => (
                        <li key={h} className="text-sm font-sans text-white/60 font-light flex gap-3 items-center">
                           <span className="text-accent/50 text-[10px]">+</span> {h}
                        </li>
                      ))}
                    </ul>
                 </div>
                 <Link href={destHref} className="btn-ghost px-8 py-4 text-[10px] tracking-[0.2em] inline-flex items-center gap-3">
                   Explore Region <ArrowRight size={14} />
                 </Link>
              </div>
            </motion.div>
          )
        })}
      </section>
    </main>
  )
}
