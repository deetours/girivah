"use client"

import { useRef, useEffect } from "react"
import { useMotionValue, useMotionValueEvent } from "framer-motion"
import { useLenis } from "lenis/react"
import { expeditionDays } from "@/components/ladakh/data/expeditionData"
import SiegeScene from "./SiegeScene"
import SiegeHUD from "./SiegeHUD"
import SnowParticles from "./SnowParticles"
import AltitudeProfileRail from "./AltitudeProfileRail"

const TOTAL_SCENES = expeditionDays.length  // 8

// Glitch intensity per day index
const GLITCH_INTENSITY = [0, 0, 0, 0, 0.3, 0.7, 1.0, 0]

export default function SiegeEngine() {
  const containerRef = useRef<HTMLDivElement>(null)

  // MotionValues — bypass React reconciler entirely (no re-renders on change)
  const scrollProgress = useMotionValue(0)
  const activeIndex = useMotionValue(0)

  // Cache layout measurements — only update on resize, not every RAF frame
  const containerHeightRef = useRef(0)
  const totalScrollRef = useRef(0)

  // Track numeric values for components that need them (e.g., SnowParticles intensity)
  const scrollProgressRef = useRef(0)
  const activeIndexRef = useRef(0)

  // Particle intensity curve
  const getParticleIntensity = (p: number): number => {
    if (p < 0.1) return (p / 0.1) * 0.1
    if (p < 0.3) return 0.1 + ((p - 0.1) / 0.2) * 0.1
    if (p < 0.5) return 0.2 + ((p - 0.3) / 0.2) * 0.1
    if (p < 0.7) return 0.3 + ((p - 0.5) / 0.2) * 0.2
    if (p < 0.85) return 0.5 + ((p - 0.7) / 0.15) * 0.2
    if (p < 0.95) return 0.7 + ((p - 0.85) / 0.1) * 0.2
    return 0.9 - ((p - 0.95) / 0.05) * 0.5
  }

  // Subscribe to MotionValue changes and update refs + child props
  useMotionValueEvent(scrollProgress, "change", (p) => {
    scrollProgressRef.current = p
  })

  useMotionValueEvent(activeIndex, "change", (idx) => {
    activeIndexRef.current = idx
  })

  // Measure container once on mount and on resize
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      containerHeightRef.current = containerRef.current.offsetHeight
      totalScrollRef.current = containerHeightRef.current - window.innerHeight
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Lenis scroll listener — ONLY updates MotionValues (no React re-render)
  useLenis(() => {
    if (!containerRef.current) return

    // Single layout read per frame (NOT two like before)
    const rect = containerRef.current.getBoundingClientRect()
    const scrolled = Math.max(0, -rect.top)

    // Clamp progress 0→1
    const p = Math.max(0, Math.min(1, scrolled / totalScrollRef.current))

    // Update MotionValues — NO React re-render
    scrollProgress.set(p)
    activeIndex.set(Math.round(p * (TOTAL_SCENES - 1)))
  })

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505]"
    >
      {/* Altitude Profile Rail — fixed left sidebar */}
      <AltitudeProfileRail
        scrollProgressValue={scrollProgress}
        activeIndexValue={activeIndex}
      />

      {/* 8 expedition days — natural vertical stack */}
      {expeditionDays.map((day, i) => (
        <SiegeScene
          key={i}
          day={day}
          scrollProgressValue={scrollProgress}
          dayProgressValue={scrollProgress}  // Will be computed in component
          index={i}
          totalScenes={TOTAL_SCENES}
          activeIndexValue={activeIndex}
          glitchIntensity={GLITCH_INTENSITY[i] ?? 0}
        />
      ))}

      {/* Particles — intensity from ref (no re-render needed) */}
      <SnowParticles scrollProgressValue={scrollProgress} />

      {/* HUD — receives MotionValues directly (no re-render dependency) */}
      <SiegeHUD scrollProgressValue={scrollProgress} activeIndexValue={activeIndex} />

      {/* Edge vignette */}
      <div className="fixed top-0 right-0 left-0 h-screen pointer-events-none z-30 shadow-[inset_0_0_120px_rgba(5,5,5,0.5)]" />
    </section>
  )
}
