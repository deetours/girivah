'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { APPLE_EASE } from '@/lib/constants'
import { stays } from '@/lib/data/stays'

export function StayConsole() {
  const router = useRouter()

  return (
    <div className="w-full h-full flex flex-col justify-center items-start pl-0 md:pl-24 pt-12 md:pt-0 pointer-events-auto max-w-[500px]">
      <div className="flex flex-col gap-2 w-full font-mono">
        {stays.map((stay, i) => (
          <motion.div
            key={stay.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 + (i * 0.1), ease: APPLE_EASE }}
            onClick={() => router.push(`/stays?category=${stay.category}`)}
            className="group cursor-pointer py-4 flex flex-col gap-1 w-full"
          >
            <div className="flex justify-between items-baseline text-[11px] md:text-[13px] tracking-widest uppercase">
              <span className="text-white/50">{stay.region}</span>
              <span className="text-white group-hover:text-accent transition-colors duration-300 text-right">{stay.name}</span>
            </div>
            <div className="flex justify-end gap-4">
              <span className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-[0.2em]">{stay.elevation}</span>
              <span className="text-[9px] md:text-[10px] text-accent/80 uppercase tracking-[0.2em] flex items-center gap-1.5">
                <span className={`w-1 h-1 rounded-full ${stay.status === 'Active' ? 'bg-accent animate-pulse' : 'bg-white/30'}`} />
                {stay.status}
              </span>
            </div>
            <div className="h-px bg-white/10 group-hover:bg-accent/40 mt-2 w-full transition-colors duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
