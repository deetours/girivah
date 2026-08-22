"use client"

import { useState, useRef, useEffect } from "react"
import { motion, MotionValue, useMotionValueEvent } from "framer-motion"
import HeartbeatMonitor from "./HeartbeatMonitor"

// All 8 days' altitude/temp/oxygen data
const telemetryData = [
  { altitude: 7500, temp: 14, oxygen: 92 },
  { altitude: 11320, temp: 8, oxygen: 85 },
  { altitude: 9710, temp: 10, oxygen: 88 },
  { altitude: 10760, temp: 6, oxygen: 82 },
  { altitude: 12470, temp: 4, oxygen: 78 },
  { altitude: 14500, temp: 2, oxygen: 72 },
  { altitude: 15059, temp: -2, oxygen: 65 },
  { altitude: 6725, temp: 12, oxygen: 94 },
]

interface SiegeHUDProps {
  scrollProgressValue: MotionValue<number>
  activeIndexValue: MotionValue<number>
}

export default function SiegeHUD({
  scrollProgressValue,
  activeIndexValue,
}: SiegeHUDProps) {
  // Numeric refs — updated via useMotionValueEvent
  const activeIndexRef = useRef(0)
  const altSpanRef = useRef<HTMLSpanElement>(null)

  // Subscribe to MotionValue changes without causing re-renders
  useMotionValueEvent(activeIndexValue, "change", (idx) => {
    activeIndexRef.current = idx
  })

  useMotionValueEvent(activeIndexValue, "change", (idx) => {
    const current = telemetryData[Math.round(idx)] || telemetryData[0]
    if (altSpanRef.current) {
      altSpanRef.current.textContent = Math.round(current.altitude).toLocaleString()
    }
  })

  // Local state for re-renders (minimal, only when activeIndex changes)
  const [activeIndex, setActiveIndex] = useState(() => Math.round(activeIndexValue.get()))
  
  useMotionValueEvent(activeIndexValue, "change", (idx) => {
    const rounded = Math.round(idx)
    if (rounded !== activeIndex) setActiveIndex(rounded)
  })

  const currentTelemetry = telemetryData[activeIndex] || telemetryData[0]

  const getOxygenColor = (oxygen: number) => {
    if (oxygen < 65) return "#FF3E00"
    if (oxygen < 75) return "#F59E0B"
    return "#39FF14"
  }

  const getStatus = () => {
    if (activeIndex === 7) return "COMPLETE"
    if (activeIndex >= 5) return "CRITICAL"
    return "ACTIVE"
  }

  const getStatusColor = () => {
    if (activeIndex === 7) return "#39FF14"
    if (activeIndex >= 5) return "#FF3E00"
    return "#00F0FF"
  }

  return (
    <motion.div
      className="fixed right-0 top-0 h-screen w-auto pointer-events-none hidden md:flex flex-col justify-between items-end p-8 gap-8"
      style={{ zIndex: 200 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      {/* Top — Day progress bar */}
      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">
          EXPEDITION_PROGRESS
        </span>
        <div className="flex gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-6 rounded-px"
              animate={{
                backgroundColor: i <= activeIndex ? "#FF3E00" : "rgba(255,255,255,0.1)",
                boxShadow:
                  i === activeIndex ? "0 0 12px rgba(255,62,0,0.8)" : "none",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Altitude display */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex-shrink-0" style={{ width: 160, height: 160 }}>
          <svg width={160} height={160} className="overflow-visible">
            {/* Outer ring */}
            <circle cx={80} cy={80} r={61} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

            {/* Track arc */}
            <path
              d="M 80 19 A 61 61 0 1 1 60.61 24.27"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={4}
              strokeLinecap="round"
            />

            {/* Fill arc */}
            <motion.path
              d="M 80 19 A 61 61 0 1 1 60.61 24.27"
              fill="none"
              stroke={getOxygenColor(currentTelemetry.oxygen)}
              strokeWidth={4}
              strokeLinecap="round"
              animate={{
                pathLength: (currentTelemetry.altitude - 6000) / (15500 - 6000),
              }}
              style={{
                filter: "drop-shadow(0 0 6px currentColor)",
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Tick marks */}
            {Array.from({ length: 9 }).map((_, i) => {
              const angle = 135 + (i * 270) / 8
              const rad = ((angle - 90) * Math.PI) / 180
              const r = 61
              const inner = { x: 80 + (r - 12) * Math.cos(rad), y: 80 + (r - 12) * Math.sin(rad) }
              const outer = { x: 80 + (r - 6) * Math.cos(rad), y: 80 + (r - 6) * Math.sin(rad) }
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
              ref={altSpanRef}
              className="font-display font-black tabular-nums text-white leading-none"
              style={{ fontSize: 27 }}
            >
              {Math.round(currentTelemetry.altitude)}
            </span>
            <span
              className="font-mono tracking-[0.3em] uppercase text-white/40 mt-1"
              style={{ fontSize: 11 }}
            >
              FT ASL
            </span>
          </div>
        </div>
      </div>

      {/* Temp + O2 cluster */}
      <div className="flex flex-col gap-4 items-end">
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/40">
            TLM_TEMP
          </span>
          <span className="font-display font-bold text-2xl tabular-nums text-white">
            {currentTelemetry.temp}
          </span>
          <span className="font-mono text-[8px] text-white/40 ml-1">°C</span>
        </div>
        <motion.div
          className="flex flex-col items-end gap-1"
          animate={{ opacity: currentTelemetry.oxygen < 75 ? 0.8 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/40">
            TLM_OXYGEN
          </span>
          <motion.div
            className="font-display font-bold text-2xl tabular-nums"
            animate={{ color: getOxygenColor(currentTelemetry.oxygen) }}
            transition={{ duration: 0.3 }}
          >
            {currentTelemetry.oxygen}
          </motion.div>
        </motion.div>
      </div>

      {/* Heartbeat monitor (Day 7 only) */}
      {activeIndex === 6 && <HeartbeatMonitor isActive={true} />}

      {/* Bottom — Status badge */}
      <div className="flex flex-col items-end gap-2">
        <motion.div
          className="px-3 py-2 border border-white/20 rounded-px"
          animate={{
            borderColor: getStatusColor(),
            boxShadow: `0 0 8px ${getStatusColor()}40`,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="font-mono text-[8px] tracking-[0.3em] uppercase font-bold"
            animate={{ color: getStatusColor() }}
            transition={{ duration: 0.3 }}
          >
            {getStatus()}
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  )
}


