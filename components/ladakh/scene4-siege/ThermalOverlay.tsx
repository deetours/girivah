"use client"

import { motion } from "framer-motion"

export default function ThermalOverlay() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        filter: "saturate(0) sepia(1) hue-rotate(90deg) saturate(3) brightness(0.8)",
        willChange: "filter",
      }}
    />
  )
}
