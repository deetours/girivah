'use client'

import React, { useState } from 'react'
import { BaggageClaim } from 'lucide-react'
import { useJourneyStore } from '@/lib/store/journey-store'
import { motion, AnimatePresence } from 'framer-motion'

export function TripBagButton() {
  const { count, openDrawer } = useJourneyStore()

  return (
    <>
      <button 
        onClick={openDrawer}
        className="relative text-white/40 hover:text-white transition-colors"
        aria-label="Trip Bag"
      >
        <BaggageClaim size={20} strokeWidth={1.5} />
        <AnimatePresence>
          {count() > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent text-[9px] font-sans flex items-center justify-center text-white font-medium"
            >
              {count()}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  )
}
