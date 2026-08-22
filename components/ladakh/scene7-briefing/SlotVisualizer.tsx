"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"
import { missionSlots } from "@/components/ladakh/data/expeditionData"

const EASE = [0.32, 0.72, 0, 1] as const

export default function SlotVisualizer() {
  const filledCount = missionSlots.filter((s) => s.filled).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Slots grid */}
        <div className="flex items-center justify-center gap-3 flex-wrap max-w-[500px]">
          {missionSlots.map((slot, i) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className={`relative w-14 h-14 flex items-center justify-center border rounded-px cursor-default group ${
                slot.filled
                  ? "bg-accent/20 border-accent/40"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
              whileHover={!slot.filled ? { scale: 1.1 } : {}}
            >
              <User className={`w-6 h-6 ${slot.filled ? "text-accent" : "text-white/20"}`} />

              {/* Pulse animation for empty slots */}
              {!slot.filled && (
                <motion.div
                  className="absolute inset-0 border border-white/10 rounded-px"
                  animate={{ opacity: [0.3, 0.1], scale: [1, 1.1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              {/* Tooltip */}
              {!slot.filled && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  <span className="font-mono text-[7px] tracking-[0.2em] uppercase text-accent whitespace-nowrap">
                    CLAIM
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Status text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/30 mb-2">
            MISSION_CAPACITY
          </p>
          <p className="font-display text-2xl font-bold text-white mb-1">8 SEATS</p>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-accent">
            {filledCount} CONFIRMED // {8 - filledCount} REMAINING
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
