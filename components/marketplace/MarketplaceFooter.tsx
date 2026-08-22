'use client'

import React from 'react'
import Link from 'next/link'

export function MarketplaceFooter() {
  return (
    <footer className="relative bg-[#050505] pt-32 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 leading-none">
              Girivah<span className="text-accent">.</span>
            </h2>
            <p className="font-sans text-xl font-light text-white/50 leading-relaxed max-w-sm">
              The ecosystem for extreme-terrain exploration.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full md:w-auto flex-1 md:ml-12">
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/40 mb-4">Ecosystem</h4>
              <Link href="/expeditions" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Trips</Link>
              <Link href="/rides" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Rides</Link>
              <Link href="/stays" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Stays</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/40 mb-4">Destinations</h4>
              <Link href="/expeditions/ladakh" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Ladakh</Link>
              <Link href="/expeditions/spiti" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Spiti Valley</Link>
              <Link href="/expeditions/zanskar" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Zanskar</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/40 mb-4">Girivah</h4>
              <Link href="/about" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Our Standard</Link>
              <Link href="/journal" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Journal</Link>
              <Link href="/contact" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Basecamp</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/40 mb-4">Support</h4>
              <Link href="/faq" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">FAQ</Link>
              <Link href="/terms" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/40">
            © {new Date().getFullYear()} Girivah Ecosystem.
          </p>
        </div>
      </div>
    </footer>
  )
}
