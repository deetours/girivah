'use client'

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useJourneyStore } from '@/lib/store/journey-store'
import { getItemByKind } from '@/lib/data/marketplace-lookup'
import { APPLE_EASE } from '@/lib/constants'
import { useScrollLock } from '@/hooks/useScrollLock'

export function TripBagDrawer() {
  const { groupedByKind, removeItem, isDrawerOpen, closeDrawer } = useJourneyStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Wait for hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollLockProps = useScrollLock(isDrawerOpen)

  if (!mounted) return null
  if (typeof document === 'undefined') return null

  const groups = groupedByKind()
  const isEmpty = groups.trip.length === 0 && groups.vehicle.length === 0 && groups.stay.length === 0

  let totalPrice = 0
  const allItems = [...groups.trip, ...groups.vehicle, ...groups.stay]
  const resolvedItems = allItems.map(item => {
    const resolved = getItemByKind(item.kind, item.slug)
    if (resolved && resolved.fromPrice) {
      totalPrice += resolved.fromPrice
    }
    return { ...item, resolved }
  })

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: APPLE_EASE }}
            className="fixed inset-0 bg-[#050505]/60 backdrop-blur-sm z-[90]"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: APPLE_EASE }}
            className="fixed top-0 right-0 w-full max-w-[480px] h-full bg-[#050505]/95 backdrop-blur-2xl border-l border-white/10 z-[100] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="font-display text-2xl text-white tracking-tight">Your Journey</h2>
              <button onClick={closeDrawer} className="p-2 text-white/50 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-12" {...scrollLockProps}>
              {isEmpty ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                     {/* Empty icon */}
                  </div>
                  <div>
                    <p className="font-display text-2xl text-white/60 mb-2">Manifest is empty.</p>
                    <p className="font-sans text-xs text-white/40 tracking-wider uppercase">Assemble your ecosystem.</p>
                  </div>
                  <Link 
                    href="/marketplace"
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.2em] text-accent border border-accent/30 px-6 py-3 hover:bg-accent/10 transition-colors"
                  >
                    Start Exploring <ArrowRight size={12} />
                  </Link>
                </div>
              ) : (
                <>
                  {['trip', 'vehicle', 'stay'].map(kind => {
                    const items = groups[kind as keyof typeof groups]
                    if (items.length === 0) return null
                    
                    return (
                      <div key={kind} className="space-y-4">
                        <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-6 border-b border-white/5 pb-2">
                          {kind === 'trip' ? 'Routes' : kind === 'vehicle' ? 'Machines' : 'Refuges'}
                        </h3>
                        {items.map(item => {
                          const resolved = getItemByKind(item.kind, item.slug)
                          if (!resolved) return null
                          
                          return (
                            <div key={item.key} className="flex gap-4 items-start group relative bg-white/[0.02] p-4 border border-white/5 hover:border-white/10 transition-colors">
                              <div className="w-16 h-16 bg-[#111] relative overflow-hidden shrink-0">
                                {resolved.media && resolved.media[0] && (
                                  <img src={resolved.media[0].src} alt={resolved.title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 transition-all duration-500" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-display text-xl text-white truncate">{resolved.title}</h4>
                                <div className="flex items-center gap-3 mt-1 text-[9px] font-sans tracking-widest uppercase text-white/40">
                                  <span>
                                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(resolved.fromPrice)}
                                  </span>
                                </div>
                              </div>
                              <button 
                                onClick={() => removeItem(item.key)}
                                className="p-2 text-white/30 hover:text-accent transition-colors absolute top-2 right-2"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && (
              <div className="p-6 border-t border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50">Base Total</span>
                  <span className="font-display text-2xl text-white">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalPrice)}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    closeDrawer();
                    router.push('/booking');
                  }}
                  className="w-full bg-accent text-white font-sans text-[10px] tracking-[0.3em] uppercase py-5 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Booking <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
