'use client'

// MANEUVER 2: The Tactical HUD (Heads Up Display)
// The Navigation hides intelligently when scrolling DOWN (revealing cinematic imagery)
// and reappears instantly when scrolling UP (restoring user control).
// It uses a glassmorphic backdrop — not a harsh black bar.

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Expeditions', href: '/expeditions' },
  { name: 'Journal', href: '/journal' },
  { name: 'About', href: '/about' },
]

// MANEUVER 3: Apple-grade Bezier easing curve
const APPLE_EASE = [0.32, 0.72, 0, 1]

export default function Navigation() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const lastScrollY = useRef(0)

  // MANEUVER 2: Hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - lastScrollY.current
    if (current > 80) {
      setScrolled(true)
      if (diff > 6) {
        setHidden(true)        // Scrolling DOWN — hide HUD, reveal raw imagery
      } else if (diff < -3) {
        setHidden(false)       // Scrolling UP — user needs control back instantly
      }
    } else {
      setScrolled(false)
      setHidden(false)
    }
    lastScrollY.current = current
  })

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileMenuOpen])

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'py-3 bg-[#050505]/70 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'py-7 bg-transparent'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="font-display text-2xl md:text-3xl tracking-tighter text-white z-50">
            Girivah<span className="text-accent">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[10px] tracking-[0.3em] font-sans uppercase transition-colors duration-300 relative group
                  ${pathname === link.href ? 'text-white' : 'text-white/40 hover:text-white'}
                `}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div layoutId="navIndicator" className="absolute -bottom-2 left-0 right-0 h-px bg-accent" />
                )}
              </Link>
            ))}

            {/* MANEUVER 4: CTA renamed + upgraded to accent button with physics */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Link
                href="/booking"
                className="px-6 py-3 bg-accent text-white text-[10px] tracking-[0.3em] font-sans uppercase hover:bg-white hover:text-black transition-colors duration-300 ml-4 font-medium"
              >
                Apply Now
              </Link>
            </motion.div>
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: APPLE_EASE }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, ease: APPLE_EASE, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-display text-6xl tracking-tight transition-colors
                      ${pathname === link.href ? 'text-accent' : 'text-white'}
                    `}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08, ease: APPLE_EASE, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block text-accent font-sans tracking-[0.3em] uppercase text-sm border-b border-accent/30 pb-2"
                >
                  Apply for Expedition →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
