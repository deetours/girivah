"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, MotionValue, useMotionValueEvent } from "framer-motion"

interface ScanlineOverlayProps {
  dayProgress: MotionValue<number>   // 0→1 for this day
  accentColor: string   // day.accentColor — tints the scanline
}

export default function ScanlineOverlay({ dayProgress, accentColor }: ScanlineOverlayProps) {
  const hasFiredRef = useRef(false)
  const [sweeping, setSweeping] = useState(false)
  const [gridVisible, setGridVisible] = useState(false)

  useMotionValueEvent(dayProgress, "change", (dp) => {
    // Fire scanline once when day enters viewport
    if (dp > 0.05 && !hasFiredRef.current) {
      hasFiredRef.current = true
      setSweeping(true)
      // Grid fades in after scanline passes midpoint
      const gridTimer = setTimeout(() => setGridVisible(true), 400)
      return () => clearTimeout(gridTimer)
    }

    // Reset when user scrolls back up — re-fires on re-entry
    if (dp < 0.01) {
      hasFiredRef.current = false
      setSweeping(false)
      setGridVisible(false)
    }
  })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[15]">
      {/* Tactical grid overlay — appears after scan */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: gridVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.015) 0px,
              rgba(255,255,255,0.015) 1px,
              transparent 1px,
              transparent 48px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.015) 0px,
              rgba(255,255,255,0.015) 1px,
              transparent 1px,
              transparent 48px
            )
          `,
        }}
      />

      {/* Scanline — neon horizontal line that sweeps top to bottom */}
      <AnimatePresence>
        {sweeping && (
          <motion.div
            key="scanline"
            className="absolute left-0 right-0 h-px"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 0 16px 2px ${accentColor}, 0 0 40px 4px ${accentColor}40`,
            }}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: 0.75,
              ease: "linear",
              times: [0, 0.05, 0.92, 1],
            }}
          />
        )}
      </AnimatePresence>

      {/* Corner brackets — tactical frame markers, visible after scan */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: gridVisible ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {/* Top-left */}
        <div className="absolute top-6 left-6 w-6 h-6 border-t border-l opacity-20" style={{ borderColor: accentColor }} />
        {/* Top-right */}
        <div className="absolute top-6 right-6 md:right-44 w-6 h-6 border-t border-r opacity-20" style={{ borderColor: accentColor }} />
        {/* Bottom-left */}
        <div className="absolute bottom-6 left-6 w-6 h-6 border-b border-l opacity-20" style={{ borderColor: accentColor }} />
        {/* Bottom-right */}
        <div className="absolute bottom-6 right-6 md:right-44 w-6 h-6 border-b border-r opacity-20" style={{ borderColor: accentColor }} />
      </motion.div>
    </div>
  )
}

import type { Variants } from "framer-motion"

// Framer Motion variants — exported so SiegeScene can use them on its content
export const contentContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.45,
    },
  },
}

export const contentItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
}
