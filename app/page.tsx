'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Triangle } from 'lucide-react'
import { APPLE_EASE } from '@/lib/constants'

import { HeroV2 as MarketplaceHero } from '@/components/marketplace/HeroV2'
import { TripBuilderScene } from '@/components/marketplace/TripBuilderScene'
import { RouteBoard as JourneyRail } from '@/components/marketplace/RouteBoard'
import { DestinationsScene } from '@/components/marketplace/DestinationsScene'
import { TrustScene } from '@/components/marketplace/TrustScene'
import { AuthoritySignalScene } from '@/components/home/AuthoritySignalScene'
import { ManifestScene } from '@/components/home/ManifestScene'
import { InfrastructureScene } from '@/components/home/InfrastructureScene'
import { TripMatchScene } from '@/components/marketplace/TripMatchScene'

export default function MarketplacePage() {
  return (
    <div className="bg-background text-foreground selection:bg-accent selection:text-white">
      <main>
        {/* Marketplace Hero with intent switch */}
        <MarketplaceHero />

        {/* ═ THE INFRASTRUCTURE (Ecosystem Stack) ═ */}
        <InfrastructureScene />

        {/* ═ BUILD YOUR MANIFEST (unified tabbed builder) ═ */}
        <TripBuilderScene />

        {/* The Route Board / Journey Rail */}
        <JourneyRail />

        {/* ═ THE MANIFEST ═ */}
        <ManifestScene />

        {/* ═ FIND YOUR ROUTE (Lead Capture Quiz) ═ */}
        <TripMatchScene />

        {/* ═ THE DISPATCH (Traveler Story Split) ═ */}
        <section className="h-[100vh] min-h-[800px] w-full bg-background flex flex-col md:flex-row relative z-20">
          <div className="w-full md:w-[55%] h-[50vh] md:h-full relative overflow-hidden group">
            <motion.div initial={{ scale: 1.05 }} whileInView={{ scale: 1 }} transition={{ duration: 1.5, ease: APPLE_EASE }} viewport={{ once: true }} className="w-full h-full">
              <Image src="/hero-mountain.jpg" alt="Traveler" fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
            </motion.div>
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="w-full md:w-[45%] h-[50vh] md:h-full flex items-center justify-center p-8 md:p-24 bg-[#0A0A0A]">
            <div className="max-w-md space-y-12">
              <Triangle size={16} className="text-accent/30 hidden md:block" />
              <blockquote className="font-sans text-xl md:text-3xl font-light text-white/80 leading-relaxed italic tracking-tight">
                "I went to prove I could handle it. Somewhere around Day 8, in the silence of the Zanskar valley, I stopped trying to prove anything."
              </blockquote>
              <div className="pt-8 border-t border-white/10">
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50 mb-2">— Priya Nair</p>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-accent/60">Ladakh High Pass · August 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═ THE PHILOSOPHY (Numbered Manifesto) ═ */}
        <section className="py-40 bg-background max-w-[1400px] mx-auto px-6 md:px-12 relative z-20">
          <p className="section-label mb-24">Our Convictions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-32 gap-x-24">
            {[
              { num: '01', title: 'Friction is Necessary', desc: 'Comfort guarantees a forgettable experience. We engineer friction into every itinerary because transformation only happens when you are challenged.' },
              { num: '02', title: 'Silence Over Scale', desc: 'We do not run massive convoys. Maximum 8 people per expedition. The mountains belong to the quiet.' },
              { num: '03', title: 'Uncompromising Safety', desc: 'We take you to entirely unforgiving environments. Our logistics, vehicles, and medical training reflect the gravity of that responsibility.' },
              { num: '04', title: 'No Appended Experiences', desc: 'No tourist traps. No superficial ceremonies. If it does not serve the raw experience of the Himalayas, we cut it.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: APPLE_EASE, delay: (i % 2) * 0.1 }}
                className="relative pl-12 md:pl-0 border-t border-white/5 md:border-none pt-8 md:pt-0"
              >
                <span className="absolute left-0 top-8 md:-top-16 font-display text-4xl md:text-8xl text-white/5 md:text-white/10 tracking-tighter mix-blend-difference select-none">{item.num}</span>
                <h3 className="font-display text-3xl md:text-4xl text-white mb-6 relative z-10">{item.title}</h3>
                <p className="font-sans text-base text-white/40 font-light leading-relaxed max-w-sm relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═ AUTHORITY SIGNAL (Sequential Stats) ═ */}
        <AuthoritySignalScene />

        {/* Destinations (Ecosystem Coverage) */}
        <DestinationsScene />

        {/* Trust & Final CTA */}
        <TrustScene />
      </main>
    </div>
  )
}
