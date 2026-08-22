"use client"

import { memo } from "react"
import Image from "next/image"
import { motion, MotionValue, useTransform } from "framer-motion"

interface ParallaxDepthStackProps {
  imageUrl: string
  altText: string
  dayProgressValue: MotionValue<number>  // MotionValue — no re-renders
  altitude: number
  isPriority?: boolean
}

function ParallaxDepthStack({
  imageUrl,
  altText,
  dayProgressValue,
  altitude,
  isPriority = false,
}: ParallaxDepthStackProps) {
  // Transform dayProgress into parallax y values using MotionValues
  // These updates bypass React reconciler entirely
  const imageY = useTransform(dayProgressValue, (p) => `${-p * 20}%`)
  const fastY = useTransform(dayProgressValue, (p) => `${-p * 40}%`)
  const fogY = useTransform(dayProgressValue, (p) => `${-p * 10}%`)

  // Fog opacity — altitude-gated
  const fogOpacity =
    altitude >= 12470
      ? Math.min(0.35, ((altitude - 12000) / (15059 - 12000)) * 0.35)
      : 0

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Layer A — Background image, slowest parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY }}
      >
        <Image
          src={imageUrl}
          alt={altText}
          fill
          priority={isPriority}
          className="object-cover object-center grayscale-[0.1]"
          sizes="100vw"
        />
        {/* Base gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30" />
        <div className="absolute inset-0 bg-[#050505]/20" />
      </motion.div>

      {/* Layer B — Terrain gradient, scrolls faster than image */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: fastY,
          background:
            "linear-gradient(to top, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.15) 35%, transparent 65%)",
        }}
      />

      {/* Layer C — Atmospheric fog, altitude-gated */}
      {fogOpacity > 0 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            y: fogY,
            opacity: fogOpacity,
            background:
              "radial-gradient(ellipse 120% 60% at 50% 20%, rgba(160,185,220,0.18) 0%, rgba(140,160,200,0.08) 50%, transparent 80%)",
          }}
        />
      )}
    </div>
  )
}

export default memo(ParallaxDepthStack)
