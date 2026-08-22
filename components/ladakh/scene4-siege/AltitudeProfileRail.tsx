"use client"

import { useEffect, useRef, useState } from "react"
import { motion, MotionValue, useMotionValueEvent, animate, useTransform } from "framer-motion"

import { expeditionDays } from "@/components/ladakh/data/expeditionData"

interface AltitudeProfileRailProps {
  scrollProgressValue: MotionValue<number>
  activeIndexValue: MotionValue<number>
}

// Altitude data derived from expedition data
const ALTITUDES = expeditionDays.map(d => d.altitude)
const DAY_LABELS = expeditionDays.map(d => d.day)

// SVG dimensions
const SVG_W = 44
const SVG_H = 510
const PADDING_TOP = 40
const PADDING_BOT = 40
const USABLE_H = SVG_H - PADDING_TOP - PADDING_BOT
const MIN_ALT = 9000
const MAX_ALT = 20000

function altToY(alt: number): number {
  return PADDING_TOP + USABLE_H - ((alt - MIN_ALT) / (MAX_ALT - MIN_ALT)) * USABLE_H
}

const X_CENTER = SVG_W / 2

const points = ALTITUDES.map((alt, i) => ({
  x: X_CENTER,
  y: altToY(alt),
  alt,
  label: DAY_LABELS[i],
}))

const pathD = points
  .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
  .join(" ")

function getAltColor(alt: number): string {
  if (alt < 10000) return "#39FF14"
  if (alt < 13000) return "#F59E0B"
  if (alt < 15000) return "#FF3E00"
  return "#FFFFFF"
}

export default function AltitudeProfileRail({
  scrollProgressValue,
  activeIndexValue,
}: AltitudeProfileRailProps) {
  const [activeIndex, setActiveIndex] = useState(() => Math.round(activeIndexValue.get()))
  const altSpanRef = useRef<HTMLSpanElement>(null)

  useMotionValueEvent(activeIndexValue, "change", (idx) => {
    const rounded = Math.round(idx)
    if (rounded !== activeIndex) setActiveIndex(rounded)
  })

  // Animate altitude counter on active index change
  useEffect(() => {
    const targetAlt = ALTITUDES[activeIndex] || ALTITUDES[0]
    animate(parseFloat(altSpanRef.current?.textContent?.replace(/,/g, "") || "0"), targetAlt, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (v) => {
        if (altSpanRef.current) {
          altSpanRef.current.textContent = Math.round(v).toLocaleString()
        }
      },
    })
  }, [activeIndex])

  const activePt = points[activeIndex]
  const activeColor = getAltColor(ALTITUDES[activeIndex])
  const glowBlur = ALTITUDES[activeIndex] > 12000 ? 8 : 4

  const pathLength = useTransform(scrollProgressValue, v => Math.max(0.01, v))

  return (
    <div
      className="fixed left-0 top-0 h-screen pointer-events-none hidden md:flex flex-col items-center justify-center"
      style={{ zIndex: 50, width: 72 }}
    >
      {/* SVG altitude profile */}
      <div className="relative" style={{ width: SVG_W, height: SVG_H }}>
        <svg width={SVG_W} height={SVG_H} className="overflow-visible" style={{ display: "block" }}>
          {/* Track line */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Animated fill line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#FF3E00"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength,
              filter: `drop-shadow(0 0 ${glowBlur}px #FF3E00)`,
            }}
          />

          {/* Day nodes */}
          {points.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={2}
              fill={i <= activeIndex ? getAltColor(pt.alt) : "rgba(255,255,255,0.2)"}
              style={{
                filter:
                  i <= activeIndex
                    ? `drop-shadow(0 0 4px ${getAltColor(pt.alt)})`
                    : "none",
              }}
            />
          ))}

          {/* Active day glowing dot */}
          <motion.circle
            cx={X_CENTER}
            cy={activePt.y}
            r={5}
            fill={activeColor}
            animate={{ cy: activePt.y }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            style={{
              filter: `drop-shadow(0 0 ${glowBlur + 2}px ${activeColor})`,
            }}
          />

          {/* Active dot pulse ring */}
          <motion.circle
            cx={X_CENTER}
            cy={activePt.y}
            r={9}
            fill="none"
            stroke={activeColor}
            strokeWidth={1}
            animate={{
              cy: activePt.y,
              opacity: [0.8, 0, 0.8],
              r: [8, 14, 8],
            }}
            transition={{
              cy: { type: "spring", stiffness: 180, damping: 22 },
              opacity: { duration: 1.6, repeat: Infinity, ease: "easeOut" },
              r: { duration: 1.6, repeat: Infinity, ease: "easeOut" },
            }}
          />
        </svg>

        {/* Min/max labels */}
        <div className="absolute right-[-28px] font-mono text-white/20" style={{ top: PADDING_TOP - 8, fontSize: 7, letterSpacing: "0.1em" }}>
          20K
        </div>
        <div className="absolute right-[-28px] font-mono text-white/20" style={{ bottom: PADDING_BOT - 8, fontSize: 7, letterSpacing: "0.1em" }}>
          9K
        </div>
      </div>

      {/* Altitude odometer */}
      <div className="mt-3 flex flex-col items-center gap-0.5">
        <span className="font-mono text-white/30 uppercase tracking-widest" style={{ fontSize: 6, letterSpacing: "0.25em" }}>
          ALT
        </span>
        <span ref={altSpanRef} className="font-display font-black tabular-nums leading-none" style={{ fontSize: 13, color: activeColor }}>
          {ALTITUDES[0].toLocaleString()}
        </span>
        <span className="font-mono text-white/30 uppercase" style={{ fontSize: 6, letterSpacing: "0.2em" }}>
          FT
        </span>
      </div>

      {/* Vertical label */}
      <div className="mt-4 font-mono text-white/15 uppercase tracking-[0.4em] select-none" style={{ fontSize: 6, writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.4em" }}>
        ALTITUDE PROFILE
      </div>
    </div>
  )
}
