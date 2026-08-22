"use client"

import { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface HeartbeatMonitorProps {
  isActive: boolean
}

// ECG path data — one cycle of P-QRS-T wave pattern
const ECG_CYCLE_FAST =
  "M0,30 L20,30 L22,28 L24,30 L26,30 L28,8 L30,52 L32,15 L34,30 L36,30 L38,22 L40,30 L60,30"
const ECG_CYCLE_SLOW =
  "M0,30 L28,30 L30,28 L32,30 L34,30 L36,8 L38,52 L40,15 L42,30 L44,30 L46,22 L48,30 L80,30"

export default function HeartbeatMonitor({ isActive }: HeartbeatMonitorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const path1Ref = useRef<SVGPathElement>(null)
  const path2Ref = useRef<SVGPathElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)
  const bpmRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!isActive) return

      const tl = gsap.timeline()

      // Phase 1: fast/erratic heartbeat (2 seconds)
      tl.to(path1Ref.current, {
        attr: { d: ECG_CYCLE_FAST },
        stroke: "#FF3E00",
        duration: 0.3,
        ease: "none",
      })
        .to(bpmRef.current, { innerText: "104", duration: 0.1 }, "<")
        .to(statusRef.current, { opacity: 1, duration: 0.3 }, "<")

      // Phase 2: stabilize (after 2s)
      tl.to(
        path1Ref.current,
        {
          attr: { d: ECG_CYCLE_SLOW },
          stroke: "#39FF14",
          duration: 1.5,
          ease: "power2.inOut",
          delay: 2,
        }
      )
        .to(bpmRef.current, { innerText: "72", duration: 1, ease: "power1.out" }, "<0.5")
        .to(statusRef.current, {}, "<")
    },
    { scope: containerRef, dependencies: [isActive] }
  )

  if (!isActive) return null

  return (
    <div ref={containerRef} className="flex flex-col gap-2 w-full max-w-[300px]">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">
          CARDIAC_MONITOR // 15,059 FT
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[8px] text-white/40">HR:</span>
          <span ref={bpmRef} className="font-display text-sm font-bold text-accent tabular-nums">
            104
          </span>
          <span className="font-mono text-[8px] text-white/40">BPM</span>
        </div>
      </div>

      <div className="bg-[#030303] border-b border-accent/20 overflow-hidden h-[60px] relative">
        {/* Animated ECG line */}
        <svg
          viewBox="0 0 300 60"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            ref={path1Ref}
            d={ECG_CYCLE_FAST}
            fill="none"
            stroke="#FF3E00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Repeating pattern */}
          <use href="#ecg" x="80" />
          <use href="#ecg" x="160" />
          <use href="#ecg" x="240" />
        </svg>

        {/* Scan overlay */}
        <div
          className="absolute inset-y-0 w-4 pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,62,0,0.1), transparent)",
            animation: "ecg-scan 1.2s linear infinite",
          }}
        />
      </div>

      <span ref={statusRef} className="font-mono text-[8px] tracking-[0.25em] uppercase text-accent/60">
        ELEVATED — ACCLIMATIZING
      </span>

      <style>{`
        @keyframes ecg-scan {
          0% { transform: translateX(-16px); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
