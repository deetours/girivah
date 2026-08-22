'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DESTINATIONS } from '@/lib/constants'

export function DestinationsScene() {
  return (
    <section className="py-32 bg-[#0A0A0A] border-t border-white/5 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-6 flex items-center gap-4">
          <span className="w-8 h-px bg-accent/50 block" /> Ecosystem Coverage
        </p>
        <h2 className="font-display text-white text-5xl md:text-7xl leading-[0.9] mb-24">
          The Territories.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
          {DESTINATIONS.map((dest, i) => (
            <div key={i} className="flex flex-col group">
              <span className="text-accent/50 font-mono text-sm mb-4">0{i + 1}</span>
              <h3 className="font-display text-3xl md:text-4xl text-white mb-2">{dest.name}</h3>
              <p className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/40 mb-6">{dest.region}</p>
              
              <p className="font-sans text-sm font-light text-white/60 leading-relaxed mb-8 flex-1">
                {dest.description}
              </p>

              <div className="flex flex-col gap-2 mb-8">
                {dest.highlights.map((highlight, j) => (
                  <div key={j} className="flex items-center gap-2 text-white/30 text-xs font-mono uppercase">
                     <span className="w-1 h-1 bg-white/20 rounded-full" />
                     {highlight}
                  </div>
                ))}
              </div>

              <Link href={`/expeditions/${dest.name.toLowerCase().replace(' ', '-')}`} className="inline-flex items-center justify-between text-[10px] uppercase font-sans tracking-[0.2em] text-white/80 hover:text-accent transition-colors pb-3 border-b border-white/10 hover:border-accent">
                View Infrastructure <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
