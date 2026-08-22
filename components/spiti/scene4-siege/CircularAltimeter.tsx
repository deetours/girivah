"use client"

import { MotionValue, useTransform, useMotionValueEvent } from "framer-motion"
import { motion } from "framer-motion"
import { useRef, useEffect } from "react"

interface CircularAltimeterProps {
  altitudeValue: MotionValue<number>
  size?: number
}

const MIN_ALT = 0
const MAX_ALT = 18000
const ARC_DEGREES = 270
const START_ANGLE = 135 // degrees (bottom-left)

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const s = polarToCartesian(cx, cy, r, startAngle)
  const e = polarToCartesian(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`
}

function getAltColor(alt: number): string {
  if (alt < 8000) return "#39FF14"
  if (alt < 12000) return "#F59E0B"
  if (alt < 15000) return "#FF3E00"
  return "#FFFFFF"
}

export default function CircularAltimeter({ altitudeValue, size = 180 }: CircularAltimeterProps) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.38
  const circumference = (ARC_DEGREES / 360) * 2 * Math.PI * r
  const altTextRef = useRef<HTMLSpanElement>(null)

  const arcEnd = useTransform(
    altitudeValue,
    [MIN_ALT, MAX_ALT],
    [START_ANGLE, START_ANGLE + ARC_DEGREES]
  )

  const altColor = useTransform(altitudeValue, (v) => getAltColor(v))

  useMotionValueEvent(altitudeValue, "change", (v) => {
    if (altTextRef.current) {
      altTextRef.current.textContent = Math.round(v).toLocaleString()
    }
  })

  const trackPath = describeArc(cx, cy, r, START_ANGLE, START_ANGLE + ARC_DEGREES)

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Outer ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r + 8}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />

        {/* Track arc */}
        <path
          d={trackPath}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* Fill arc */}
        <motion.path
          d={trackPath}
          fill="none"
          stroke={altColor as unknown as string}
          strokeWidth={4}
          strokeLinecap="round"
          style={{
            pathLength: useTransform(altitudeValue, [MIN_ALT, MAX_ALT], [0, 1]),
            filter: "drop-shadow(0 0 6px currentColor)",
          }}
        />

        {/* Tick marks */}
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = START_ANGLE + (i * ARC_DEGREES) / 8
          const inner = polarToCartesian(cx, cy, r - 12, angle)
          const outer = polarToCartesian(cx, cy, r - 6, angle)
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={i % 4 === 0 ? 2 : 1}
            />
          )
        })}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          ref={altTextRef}
          className="font-display font-black tabular-nums text-white leading-none"
          style={{ fontSize: size * 0.17 }}
        >
          0
        </span>
        <span
          className="font-mono tracking-[0.3em] uppercase text-white/40 mt-1"
          style={{ fontSize: size * 0.07 }}
        >
          FT ASL
        </span>
      </div>
    </div>
  )
}
