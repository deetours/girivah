'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { APPLE_EASE } from '@/lib/constants'
import { TripBagButton } from './marketplace/TripBagButton'
import { TripBagDrawer } from './marketplace/TripBagDrawer'
import { SearchTrigger } from './marketplace/SearchTrigger'
import { useJourneyStore } from '@/lib/store/journey-store'
import { TYPE_FACETS_BY_KIND } from '@/lib/marketplace/facets'
import { useScrollLock } from '@/hooks/useScrollLock'

export default function Navigation() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const lastScrollY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - lastScrollY.current
    if (current > 80) {
      setScrolled(true)
      if (diff > 6 && !megaMenuOpen) {
        setHidden(true)
      } else if (diff < -3) {
        setHidden(false)
      }
    } else {
      setScrolled(false)
      setHidden(false)
    }
    lastScrollY.current = current
  })

  const scrollLockProps = useScrollLock(mobileMenuOpen)
  
  // Always hide navigation on booking page for immersion
  if (pathname === '/booking') return null

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: '-120%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.45, ease: APPLE_EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || megaMenuOpen
            ? 'py-3 bg-[#050505]/95 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'py-7 bg-transparent'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/marketplace" className="font-display text-2xl md:text-3xl tracking-tighter text-white z-50">
            Girivah<span className="text-accent">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 z-50">
            <SearchTrigger />

            <Link
              href="/marketplace/search"
              className={`text-[10px] tracking-[0.3em] font-sans uppercase transition-colors duration-300 ${pathname === '/marketplace/search' ? 'text-accent' : 'text-white/40 hover:text-white'}`}
            >
              Browse All
            </Link>

            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className={`text-[10px] tracking-[0.3em] font-sans uppercase transition-colors duration-300 flex items-center gap-2 ${megaMenuOpen ? 'text-accent' : 'text-white/40 hover:text-white'}`}
            >
              Ecosystem <ChevronDown size={12} className={`transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <Link href="/journal" className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/40 hover:text-white transition-colors duration-300">
              Journal
            </Link>
            
            <TripBagButton />
            
            <Link
              href={useJourneyStore.getState().items.length > 0 ? '/booking' : '/marketplace'}
              className="px-6 py-3 bg-white text-black text-[10px] tracking-[0.3em] font-sans uppercase hover:bg-accent hover:text-white transition-colors duration-300 font-medium"
            >
              Start Journey
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Ecosystem Mega-Panel (Desktop) */}
      <AnimatePresence>
        {megaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: APPLE_EASE }}
            className="hidden md:block fixed top-0 left-0 w-full bg-[#050505]/95 backdrop-blur-3xl pt-24 pb-12 z-40 border-b border-white/10"
          >
             <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col gap-4">
                   <h3 className="text-sm font-sans uppercase tracking-[0.3em] text-accent mb-4">Trips</h3>
                   {TYPE_FACETS_BY_KIND.trip.map(f => (
                     <Link key={f.slug} onClick={() => setMegaMenuOpen(false)} href={`/expeditions?type=${f.slug}`} className="font-display text-3xl text-white hover:text-accent transition-colors">{f.label}</Link>
                   ))}
                   <p className="text-white/40 font-sans text-sm mt-2">End-to-end guided routing.</p>
                </div>
                <div className="flex flex-col gap-4">
                   <h3 className="text-sm font-sans uppercase tracking-[0.3em] text-accent mb-4">Rides</h3>
                   {TYPE_FACETS_BY_KIND.vehicle.map(f => (
                     <Link key={f.slug} onClick={() => setMegaMenuOpen(false)} href={`/rides?type=${f.slug}`} className="font-display text-3xl text-white hover:text-accent transition-colors">{f.label}</Link>
                   ))}
                   <p className="text-white/40 font-sans text-sm mt-2">Altitude-engineered machines.</p>
                </div>
                <div className="flex flex-col gap-4">
                   <h3 className="text-sm font-sans uppercase tracking-[0.3em] text-accent mb-4">Stays</h3>
                   {TYPE_FACETS_BY_KIND.stay.map(f => (
                     <Link key={f.slug} onClick={() => setMegaMenuOpen(false)} href={`/stays?type=${f.slug}`} className="font-display text-3xl text-white hover:text-accent transition-colors">{f.label}</Link>
                   ))}
                   <p className="text-white/40 font-sans text-sm mt-2">Shelter at the edge of the map.</p>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: APPLE_EASE }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden"
            {...scrollLockProps}
          >
            <div className="flex flex-col gap-6">
              <div className="md:hidden mb-4" onClick={() => setMobileMenuOpen(false)}>
                <SearchTrigger className="text-white/60 hover:text-white text-base" />
              </div>
              <Link
                href="/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-display text-5xl tracking-tight transition-colors ${pathname === '/marketplace' ? 'text-accent' : 'text-white'}`}
              >
                Marketplace
              </Link>
              <Link
                href="/marketplace/search"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-display text-2xl tracking-tight transition-colors ${pathname === '/marketplace/search' ? 'text-accent' : 'text-white/60'}`}
              >
                Browse All
              </Link>
              <Link
                href="/expeditions"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-display text-5xl tracking-tight transition-colors ${pathname === '/expeditions' ? 'text-accent' : 'text-white'}`}
              >
                Trips
              </Link>
              <Link
                href="/rides"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-display text-5xl tracking-tight transition-colors ${pathname === '/rides' ? 'text-accent' : 'text-white'}`}
              >
                Rides
              </Link>
              <Link
                href="/stays"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-display text-5xl tracking-tight transition-colors ${pathname === '/stays' ? 'text-accent' : 'text-white'}`}
              >
                Stays
              </Link>
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, ease: APPLE_EASE, duration: 0.4 }}
                className="mt-8 flex items-center justify-between"
              >
                <Link
                  href={useJourneyStore.getState().items.length > 0 ? '/booking' : '/marketplace'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block text-accent font-sans tracking-[0.3em] uppercase text-sm border-b border-accent/30 pb-2"
                >
                  Start Journey +
                </Link>
                <div onClick={() => setMobileMenuOpen(false)}>
                  <TripBagButton />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <TripBagDrawer />
    </>
  )
}
