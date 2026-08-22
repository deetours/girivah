"use client"

import { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { spitiConfig } from "@/components/ladakh/data/expeditionData"

export default function MissionCountdown() {
  const containerRef = useRef<HTMLDivElement>(null)
  const daysRef = useRef<HTMLSpanElement>(null)
  const hoursRef = useRef<HTMLSpanElement>(null)
  const minutesRef = useRef<HTMLSpanElement>(null)
  const secondsRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const updateTimer = () => {
      const diff = spitiConfig.nextBatchDate.getTime() - Date.now()
      if (diff <= 0) {
        gsap.set([daysRef, hoursRef, minutesRef, secondsRef], { textContent: "00" })
        return
      }

      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)

      if (daysRef.current) daysRef.current.textContent = String(days).padStart(2, "0")
      if (hoursRef.current) hoursRef.current.textContent = String(hours).padStart(2, "0")
      if (minutesRef.current) minutesRef.current.textContent = String(minutes).padStart(2, "0")
      if (secondsRef.current) secondsRef.current.textContent = String(seconds).padStart(2, "0")
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-6">
      <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/30">
        NEXT BATCH DEPARTS IN
      </p>

      <div className="flex items-baseline gap-4 md:gap-6">
        <div className="flex flex-col items-center gap-2">
          <span
            ref={daysRef}
            className="font-display text-4xl md:text-5xl font-black text-white tabular-nums leading-none"
          >
            00
          </span>
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">D</span>
        </div>

        <span className="text-white/20 font-light">:</span>

        <div className="flex flex-col items-center gap-2">
          <span
            ref={hoursRef}
            className="font-display text-4xl md:text-5xl font-black text-white tabular-nums leading-none"
          >
            00
          </span>
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">H</span>
        </div>

        <span className="text-white/20 font-light">:</span>

        <div className="flex flex-col items-center gap-2">
          <span
            ref={minutesRef}
            className="font-display text-4xl md:text-5xl font-black text-white tabular-nums leading-none"
          >
            00
          </span>
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">M</span>
        </div>

        <span className="text-white/20 font-light">:</span>

        <div className="flex flex-col items-center gap-2">
          <span
            ref={secondsRef}
            className="font-display text-4xl md:text-5xl font-black text-white tabular-nums leading-none"
          >
            00
          </span>
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">S</span>
        </div>
      </div>
    </div>
  )
}
