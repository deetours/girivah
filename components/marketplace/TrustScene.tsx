'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Triangle } from 'lucide-react'

export function TrustScene() {
  const stats = [
    { value: '0', label: 'Evacuations in 14 years' },
    { value: '4.98', label: 'Rating from 127 riders' },
    { value: 'UIAGM', label: 'Certified lead guides' }
  ]

  return (
    <section className="relative bg-background overflow-hidden z-20">
      


      {/* Middle: The Guide */}
      <div className="py-24 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-[40%] aspect-square relative overflow-hidden bg-[#111]">
            <Image src="/exp-spiti.jpg" alt="Guidance" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover grayscale opacity-70" />
            <div className="absolute inset-0 bg-black/20" />
            {/* Corner brackets */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/30" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/30" />
            <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-accent/80" />
          </div>
          <div className="w-full md:w-[60%] md:pl-12">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Arjun Mehta.</h2>
            <p className="font-sans text-lg text-white/60 mb-8 font-light tracking-tight">Lead Expedition Controller</p>
            <p className="font-sans text-base font-light text-white/50 leading-relaxed mb-8 max-w-lg italic border-l-2 border-accent/30 pl-4">
              "When things go wrong at 17,000 feet, you don't rise to the occasion. You fall to the level of your infrastructure. That's why we control the entire ecosystem."
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.2em] text-white/80 hover:text-accent transition-colors pb-1 border-b border-white/20 hover:border-accent">
              Speak with Basecamp <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom: Final CTA */}
      <div className="py-48 relative flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[600px] aspect-square bg-accent/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-[10px] uppercase font-sans tracking-[0.4em] text-white/30 mb-8">Access The Ecosystem</p>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-16 leading-[1.1]">
            Assemble your route.<br/>
            Secure your vehicle.<br/>
            <span className="text-accent italic font-light">Lock in your refuge.</span>
          </h2>
          <div className="flex justify-center">
            <Link href="/booking" className="px-8 py-4 bg-accent text-white font-sans text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-colors duration-300">
               Enter Marketplace
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
