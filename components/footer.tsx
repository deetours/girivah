'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Instagram, Twitter, Compass } from 'lucide-react'

export default function Footer() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0.8, 1], [-100, 0])
  const pathname = usePathname()

  // Always hide footer on booking page for immersion
  if (pathname === '/booking') return null

  return (
    <footer className="relative bg-[#050505] pt-32 pb-12 overflow-hidden border-t border-white/5">
      <motion.div style={{ y }} className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-32">

          <div className="max-w-xl">
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 leading-none">
              Girivah<span className="text-accent">.</span>
            </h2>
            <p className="font-sans text-xl font-light text-white/50 leading-relaxed max-w-sm">
              Authentic, uncompromising Himalayan expeditions for those seeking absolute presence.
            </p>
            <div className="flex flex-col gap-2 mt-8 max-w-[240px]">
              <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-accent mb-2">Absolute Presence</span>
              <p className="text-[11px] leading-relaxed text-white/50 font-light italic">
                We believe in the power of the high passes. We do not broadcast. We experience.
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">

            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/40 mb-4">Expeditions</h4>
              <Link href="/expeditions/ladakh" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Ladakh High Pass</Link>
              <Link href="/expeditions/spiti" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Spiti Circuit</Link>
              <Link href="/expeditions/zanskar" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Zanskar Chadar Trek</Link>
              <Link href="/expeditions" className="text-sm font-sans text-white/60 hover:text-accent transition-colors underline decoration-white/10 underline-offset-4">View All Routes</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/40 mb-4">Intel</h4>
              <Link href="/journal" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">The Journal</Link>
              <Link href="/about" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Philosophy</Link>
              <Link href="/contact" className="text-sm font-sans text-white/60 hover:text-accent transition-colors">Basecamp Comms</Link>
            </div>

            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <h4 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/40 mb-4">Headquarters</h4>
              <p className="text-sm font-sans text-white/50 leading-loose">
                Fort Road, Leh,<br />
                Ladakh (UT) 194101<br />
                India
              </p>
              <a href="mailto:expeditions@girivah.com" className="text-sm font-sans text-white hover:text-accent transition-colors border-b border-white/20 pb-1 mt-4 inline-block w-max">
                expeditions@girivah.com
              </a>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/40">
            © {new Date().getFullYear()} Girivah Expeditions.
          </p>
          <div className="flex gap-8 text-[10px] tracking-[0.2em] font-sans uppercase text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </motion.div>

      {/* Background Graphic Element */}
      <h1 className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-display text-[25vw] leading-none text-white/5 tracking-tighter w-full text-center pointer-events-none select-none">
        GIRIVAH
      </h1>

    </footer>
  )
}
