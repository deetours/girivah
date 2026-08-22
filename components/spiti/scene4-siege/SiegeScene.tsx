"use client"

import { memo, useState } from "react"
import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion"
import { ExpeditionDay } from "@/components/spiti/data/expeditionData"
import ParallaxDepthStack from "./ParallaxDepthStack"
import ScanlineOverlay, { contentContainerVariants, contentItemVariants } from "./ScanlineOverlay"
import GlitchLayer from "./GlitchLayer"
import ThermalOverlay from "./ThermalOverlay"

interface SiegeSceneProps {
  day: ExpeditionDay
  scrollProgressValue: MotionValue<number>  // MotionValue — no re-renders
  dayProgressValue?: MotionValue<number>     // Optional, for future use
  index: number
  totalScenes: number
  activeIndexValue: MotionValue<number>
  glitchIntensity: number
}

function SiegeScene({
  day,
  scrollProgressValue,
  dayProgressValue,
  index,
  totalScenes,
  activeIndexValue,
  glitchIntensity,
}: SiegeSceneProps) {
  // Compute dayProgress from scrollProgress MotionValue using useTransform
  // This creates a NEW MotionValue that updates when scrollProgress changes,
  // but NEVER triggers a React re-render
  const dayStart = index / totalScenes
  const dayEnd = (index + 1) / totalScenes

  const dayProgress = useTransform(scrollProgressValue, (scrollProg) => {
    return Math.max(
      0,
      Math.min(1, (scrollProg - dayStart) / (dayEnd - dayStart))
    )
  })

  // Use state to track active index and progress trigger for content visibility
  const [isActive, setIsActive] = useState(() => Math.round(activeIndexValue.get()) === index)
  const [hasStarted, setHasStarted] = useState(() => dayProgress.get() > 0.05)

  useMotionValueEvent(activeIndexValue, "change", (idx) => {
    const active = Math.round(idx) === index
    if (active !== isActive) setIsActive(active)
  })

  useMotionValueEvent(dayProgress, "change", (dp) => {
    const started = dp > 0.05
    if (started !== hasStarted) setHasStarted(started)
  })

  const contentVisible = isActive && hasStarted

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505]">

      {/* Parallax: Image layers — pass MotionValue directly */}
      <ParallaxDepthStack
        imageUrl={day.img}
        altText={day.title}
        dayProgressValue={dayProgress}
        altitude={day.altitude}
        isPriority={index === 0}
      />

      {/* Scanline overlay + grid */}
      <ScanlineOverlay
        dayProgress={dayProgress}
        accentColor={day.accentColor}
      />

      {/* Thermal overlay — Day 6 only */}
      {day.hasThermal && isActive && <ThermalOverlay />}

      {/* Content layer */}
      <motion.div
        className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-12 md:pr-44 md:pl-16"
        variants={contentContainerVariants}
        animate={contentVisible ? "visible" : "hidden"}
      >
        {/* Top — ghost day number + glitch wrapper */}
        <motion.div variants={contentItemVariants}>
          <GlitchLayer glitchIntensity={glitchIntensity}>
            <span
              className="font-display font-black text-white/8 leading-none select-none"
              style={{ fontSize: "clamp(8rem,18vw,18rem)" }}
            >
              {day.day}
            </span>
          </GlitchLayer>
        </motion.div>

        {/* Bottom — mission data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">

          {/* Left column */}
          <div>
            <motion.span
              variants={contentItemVariants}
              className="font-mono text-[9px] tracking-[0.5em] uppercase block mb-3"
              style={{ color: day.accentColor }}
            >
              {day.label}
            </motion.span>

            <motion.div variants={contentItemVariants}>
              <GlitchLayer glitchIntensity={glitchIntensity}>
                <h3
                  className="font-display font-black uppercase text-white leading-tight mb-4"
                  style={{
                    fontSize: "clamp(1.75rem,4.5vw,4rem)",
                    textShadow: "0 2px 20px rgba(0,0,0,0.9)",
                  }}
                >
                  {day.title}
                </h3>
              </GlitchLayer>
            </motion.div>

            <motion.p
              variants={contentItemVariants}
              className="font-sans text-white/70 text-sm italic leading-relaxed"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
            >
              {day.emotionalHook}
            </motion.p>
          </div>

          {/* Right column — data table (no glitch) */}
          <div className="flex flex-col justify-end gap-3">
            <motion.div
              variants={contentItemVariants}
              className="border-t border-white/15 pt-3"
            >
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/40 mb-1">
                TACTICAL_NOTE
              </p>
              <p className="font-sans text-white/60 text-xs leading-relaxed">
                {day.tacticalNote}
              </p>
            </motion.div>

            <motion.div
              variants={contentItemVariants}
              className="grid grid-cols-3 gap-4 pt-3 border-t border-white/15"
            >
              <div>
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30 block mb-1">
                  DISTANCE
                </span>
                <span className="font-display text-sm font-bold text-white">
                  {day.dist}
                </span>
              </div>
              <div>
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30 block mb-1">
                  COORDS
                </span>
                <span className="font-mono text-[10px] text-white/50">
                  {day.coords}
                </span>
              </div>
              <div>
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30 block mb-1">
                  STATUS
                </span>
                <span
                  className="font-mono text-[10px] font-bold"
                  style={{ color: day.accentColor }}
                >
                  {day.status}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default memo(SiegeScene)
