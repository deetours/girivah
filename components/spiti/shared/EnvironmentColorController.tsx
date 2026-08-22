"use client"

import { useEffect } from "react"
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion"

export default function EnvironmentColorController() {
  const { scrollYProgress } = useScroll()

  const warmAlpha = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6],
    [0.07, 0.05, 0.01, 0]
  )
  const coldAlpha = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.65, 0.85],
    [0, 0.02, 0.07, 0.1, 0.04]
  )

  useMotionValueEvent(warmAlpha, "change", (v) => {
    document.documentElement.style.setProperty("--env-warm-alpha", String(v))
  })

  useMotionValueEvent(coldAlpha, "change", (v) => {
    document.documentElement.style.setProperty("--env-cold-alpha", String(v))
  })

  useEffect(() => {
    document.documentElement.style.setProperty("--env-warm-alpha", "0.07")
    document.documentElement.style.setProperty("--env-cold-alpha", "0")
  }, [])

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,140,40,var(--env-warm-alpha,0.07)), rgba(60,100,220,var(--env-cold-alpha,0)))",
        mixBlendMode: "multiply",
      }}
    />
  )
}
