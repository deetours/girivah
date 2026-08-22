"use client"

import { useEffect, useRef } from "react"

interface GlitchLayerProps {
  glitchIntensity: number
  children: React.ReactNode
  className?: string
}

export default function GlitchLayer({
  glitchIntensity,
  children,
  className,
}: GlitchLayerProps) {
  // Zero intensity — pure passthrough, zero cost
  if (glitchIntensity === 0) {
    return <div className={className}>{children}</div>
  }

  return <GlitchEffect intensity={glitchIntensity} className={className}>{children}</GlitchEffect>
}

function GlitchEffect({
  intensity,
  children,
  className,
}: {
  intensity: number
  children: React.ReactNode
  className?: string
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (!wrapperRef.current) return

      // Direct DOM mutation — NO React re-renders
      const top = Math.random() * 6 * intensity
      const bot = Math.random() * 6 * intensity
      wrapperRef.current.style.clipPath = `inset(${top}% 0 ${bot}% 0)`
      wrapperRef.current.style.opacity = "0.95"

      // Reset after 80ms
      setTimeout(() => {
        if (wrapperRef.current) {
          wrapperRef.current.style.clipPath = "none"
          wrapperRef.current.style.opacity = "1"
        }
      }, 80)
    }, 180 + Math.random() * 120)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [intensity])

  // Chromatic aberration via text-shadow
  const rgbShadow = [
    `${-2 * intensity}px 0 rgba(255,62,0,0.8)`,
    `${2 * intensity}px 0 rgba(0,240,255,0.6)`,
    `0 0 ${8 * intensity}px rgba(255,62,0,0.3)`,
  ].join(", ")

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        textShadow: rgbShadow,
      }}
    >
      {children}

      {/* Noise overlay — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.02 * intensity,
          mixBlendMode: "overlay",
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          )`,
          zIndex: -1,
        }}
      />
    </div>
  )
}
