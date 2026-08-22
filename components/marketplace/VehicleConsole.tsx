'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { APPLE_EASE } from '@/lib/constants'
import { vehicles } from '@/lib/data/vehicles'

export function VehicleConsole() {
  const router = useRouter()

  return (
    <div className="w-full h-full flex flex-col justify-center items-start pl-0 md:pl-24 pt-12 md:pt-0 pointer-events-auto max-w-[500px]">
      <div className="flex flex-col gap-2 w-full font-mono">
        {vehicles.map((vehicle, i) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 + (i * 0.1), ease: APPLE_EASE }}
            onClick={() => router.push(`/rides?category=${vehicle.category}`)}
            className="group cursor-pointer py-4 flex flex-col gap-1 w-full"
          >
            <div className="flex justify-between items-baseline text-[11px] md:text-[13px] tracking-widest uppercase">
              <span className="text-white/50">{vehicle.region}</span>
              <span className="text-white group-hover:text-accent transition-colors duration-300 text-right">{vehicle.name}</span>
            </div>
            <div className="flex justify-end gap-4">
              <span className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-[0.2em]">{vehicle.altitudeRating}</span>
              <span className="text-[9px] md:text-[10px] text-accent/80 uppercase tracking-[0.2em] flex items-center gap-1.5">
                <span className={`w-1 h-1 rounded-full ${vehicle.status === 'Active' ? 'bg-accent animate-pulse' : 'bg-white/30'}`} />
                {vehicle.status}
              </span>
            </div>
            <div className="h-px bg-white/10 group-hover:bg-accent/40 mt-2 w-full transition-colors duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
