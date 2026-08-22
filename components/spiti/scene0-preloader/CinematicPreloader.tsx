"use client"

import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface CinematicPreloaderProps {
  onComplete: () => void
}

export default function CinematicPreloader({ onComplete }: CinematicPreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLParagraphElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const [skipVisible, setSkipVisible] = useState(false)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete()
        },
      })

      // Initial state
      gsap.set([line1Ref.current, line2Ref.current, ruleRef.current], {
        opacity: 0,
      })

      tl.to(line1Ref.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.3)
        .to(line1Ref.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, 1.2)
        .to(line2Ref.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.5)
        .to(
          ruleRef.current,
          { scaleX: 1, duration: 0.4, ease: "power2.out", transformOrigin: "center" },
          2.0
        )
        .to(
          containerRef.current,
          {
            clipPath: "inset(100% 0 0 0)",
            duration: 0.6,
            ease: "power3.inOut",
          },
          2.6
        )
    },
    { scope: containerRef }
  )

  useEffect(() => {
    const timer = setTimeout(() => setSkipVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSkip = () => {
    if (!containerRef.current) return
    gsap.to(containerRef.current, {
      clipPath: "inset(100% 0 0 0)",
      duration: 0.3,
      ease: "power3.inOut",
      onComplete,
    })
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <p
        ref={line1Ref}
        className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/60 mb-6"
      >
        GIRIVAH EXPEDITIONS PRESENTS
      </p>

      <h1
        ref={line2Ref}
        className="font-display text-[clamp(2rem,6vw,6rem)] uppercase tracking-[-0.02em] text-white leading-none text-center"
      >
        A SIEGE ON<br />THE ORDINARY
      </h1>

      <div
        ref={ruleRef}
        className="mt-8 h-px bg-accent"
        style={{ width: "120px", transform: "scaleX(0)" }}
      />

      {skipVisible && (
        <button
          ref={skipRef}
          onClick={handleSkip}
          className="absolute bottom-8 right-8 font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-white/60 transition-colors duration-300"
        >
          SKIP →
        </button>
      )}
    </div>
  )
}
