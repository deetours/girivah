"use client"

import { useEffect, useRef } from "react"

import { motion, MotionValue, useMotionValueEvent } from "framer-motion"

interface Particle {
  x: number
  y: number
  r: number
  speed: number
  opacity: number
  drift: number
  driftPhase: number
}

interface SnowParticlesProps {
  scrollProgressValue: MotionValue<number>
}

// Particle intensity curve
const getParticleIntensity = (p: number): number => {
  if (p < 0.1) return (p / 0.1) * 0.1
  if (p < 0.3) return 0.1 + ((p - 0.1) / 0.2) * 0.1
  if (p < 0.5) return 0.2 + ((p - 0.3) / 0.2) * 0.1
  if (p < 0.7) return 0.3 + ((p - 0.5) / 0.2) * 0.2
  if (p < 0.85) return 0.5 + ((p - 0.7) / 0.15) * 0.2
  if (p < 0.95) return 0.7 + ((p - 0.85) / 0.1) * 0.2
  return Math.max(0, 0.9 - ((p - 0.95) / 0.05) * 0.5)
}

export default function SnowParticles({ scrollProgressValue }: SnowParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const intensityRef = useRef(0)
  const rafRef = useRef<number>(0)
  const mountedRef = useRef(false)

  // Update intensity ref whenever scroll progresses
  useMotionValueEvent(scrollProgressValue, "change", (p) => {
    intensityRef.current = getParticleIntensity(p)
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    mountedRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Initialise a pool of 80 particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 80; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.3,
          speed: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          drift: (Math.random() - 0.5) * 0.8,
          driftPhase: Math.random() * Math.PI * 2,
        })
      }
    }

    const draw = () => {
      if (!mountedRef.current) return
      rafRef.current = requestAnimationFrame(draw)

      const intensity = intensityRef.current
      if (intensity <= 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const visibleCount = Math.floor(intensity * 80)
      for (let i = 0; i < visibleCount; i++) {
        const p = particlesRef.current[i]
        p.driftPhase += 0.01
        p.y += p.speed * intensity
        p.x += p.drift * Math.sin(p.driftPhase) * intensity

        if (p.y > canvas.height) {
          p.y = -p.r
          p.x = Math.random() * canvas.width
        }
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * intensity})`
        ctx.fill()
      }
    }

    draw()

    return () => {
      mountedRef.current = false
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-20"
      aria-hidden
    />
  )
}
