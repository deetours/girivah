'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle, Zap, Wind, Users, ChefHat } from 'lucide-react'
import { APPLE_EASE } from '@/lib/constants'
import { MarketplaceItem } from '@/lib/types/marketplace'
import HUDLabel from '@/components/ladakh/shared/HUDLabel'
import { AddToTripButton } from './AddToTripButton'
import { useRouter } from 'next/navigation'

interface ItemDetailTemplateProps {
  item: MarketplaceItem & any;
  kind: 'vehicle' | 'stay';
}

export function ItemDetailTemplate({ item, kind }: ItemDetailTemplateProps) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => setIsClient(true), [])

  const priceLabel = kind === 'vehicle' ? 'per day' : 'per night'
  const spec1Label = kind === 'vehicle' ? 'Altitude Rating' : 'Elevation'
  const spec1Value = kind === 'vehicle' ? item.altitudeRating : item.elevation

  return (
    <main className="bg-[#050505] min-h-[100vh] selection:bg-accent selection:text-white pb-40 text-white">
      {/* HERO */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-[#050505]">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.05 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={item.media && item.media[0] ? item.media[0].src : item.image || ''}
              alt={item.title}
              fill
              priority
              className="object-cover opacity-60 grayscale"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
             <span className="text-[10px] tracking-[0.3em] font-sans text-accent uppercase">
               {item.region}
             </span>
             <span className="w-1 h-1 bg-white/20 rounded-full" />
             <span className="text-[10px] tracking-[0.3em] font-sans text-white/50 uppercase">
               {item.category}
             </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.3 }}
            className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] tracking-tighter text-white uppercase"
          >
            {item.title}
          </motion.h1>
        </div>
      </section>

      {/* STICKY DATA BAR */}
      <div className="sticky top-[72px] z-40 bg-[#050505]/90 backdrop-blur-2xl border-y border-white/5 py-4">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between overflow-x-auto">
           <div className="flex gap-12 items-center shrink-0">
             <HUDLabel label={spec1Label} value={spec1Value} size="md" />
             <HUDLabel label="Base Rate" value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.fromPrice)} unit={`/ ${kind === 'vehicle' ? 'day' : 'night'}`} size="md" />
             
             {/* Availability Badge */}
             <div className="flex flex-col gap-1 hidden md:flex">
               <span className="font-mono tracking-[0.3em] uppercase text-white/40 text-[9px]">Status</span>
               <div>
                  {item.availability === 'sold-out' ? (
                    <span className="px-2 py-1 text-[9px] uppercase tracking-widest font-sans border bg-black/80 border-white/20 text-white/50">Sold Out</span>
                  ) : item.availability === 'limited' ? (
                    <span className="px-2 py-1 text-[9px] uppercase tracking-widest font-sans border bg-accent/20 border-accent/60 text-accent">Limited</span>
                  ) : (
                    <span className="px-2 py-1 text-[9px] uppercase tracking-widest font-sans border bg-white/5 border-white/10 text-white">Available</span>
                  )}
               </div>
             </div>
           </div>

           {/* Sticky Action Panel */}
           {isClient && (
             <div className="flex items-center gap-4 shrink-0 pl-8">
               <AddToTripButton item={item} />
               <button
                 onClick={() => router.push(`/booking?item=${item.slug}&kind=${item.kind}`)}
                 className="px-8 py-4 bg-accent text-white font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
               >
                 Book Now
               </button>
             </div>
           )}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
         
         {/* LEFT COL: CONTENT */}
         <div className="lg:col-span-8 space-y-16">
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl font-light leading-relaxed text-white/70">
                A highly capable {item.category} designed for the extreme environment of {item.region}. 
                {kind === 'vehicle' ? ' Equipped for high-altitude passes and rough terrain.' : ' Engineered for deep winter survival and high-altitude comfort.'}
              </p>
            </div>

            {/* Trust Provider */}
            <div className="p-6 border border-white/10 bg-white/[0.02] flex items-start gap-4">
               <CheckCircle className="text-accent shrink-0 mt-1" size={20} />
               <div>
                  <h4 className="font-sans text-sm tracking-widest uppercase mb-1">Verified Provider: {item.providerId}</h4>
                  <p className="text-white/40 text-sm font-light">This asset is maintained and operated by a Girivah-certified partner with a flawless safety record in {item.region}.</p>
               </div>
            </div>

            {/* Spec Highlights Grid */}
            <div>
               <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent mb-8">Technical & Operational Highlights</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.highlights && item.highlights.map((hl: string, i: number) => {
                    const icons = [Zap, Wind, Users, ChefHat]
                    const Icon = icons[i % icons.length]
                    return (
                      <div key={i} className="p-6 bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-colors flex items-start gap-4">
                         <Icon size={20} className="text-white/30 shrink-0" />
                         <span className="font-sans text-sm text-white/80">{hl}</span>
                      </div>
                    )
                  })}
               </div>
            </div>
         </div>

         {/* RIGHT COL: GALLERY/META */}
         <div className="lg:col-span-4 space-y-8">
            {item.media && item.media.slice(1).map((m: any, i: number) => (
              <div key={i} className="relative aspect-[4/3] w-full overflow-hidden bg-[#111]">
                 <Image src={m.src} alt={m.alt || item.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            ))}
         </div>
      </div>
    </main>
  )
}
