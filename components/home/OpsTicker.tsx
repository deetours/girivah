'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APPLE_EASE } from '@/lib/constants'

import { EXPEDITIONS } from '@/lib/data/expeditions'
import { vehicles } from '@/lib/data/vehicles'
import { stays } from '@/lib/data/stays'

const TICKER_MESSAGES = [
  `${EXPEDITIONS.length} EXPEDITIONS ACTIVE`,
  `${vehicles.length} VEHICLES DEPLOYED`,
  `${stays.length} STAYS VERIFIED`
]

export function OpsTicker() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mt-4 w-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 1 }}>
        [ {EXPEDITIONS.length} ROUTES LIVE ]
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="hidden sm:block text-accent/50">
        //
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}>
        [ {vehicles.length} VEHICLES DEPLOYED ]
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} className="hidden sm:block text-accent/50">
        //
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}>
        [ {stays.length} REFUGES SECURED ]
      </motion.div>
    </div>
  )
}
