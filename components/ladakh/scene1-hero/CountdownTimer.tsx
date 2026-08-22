"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: Date
}

function DigitFlip({ value }: { value: number }) {
  const display = String(value).padStart(2, "0")
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={display}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className="inline-block tabular-nums"
      >
        {display}
      </motion.span>
    </AnimatePresence>
  )
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      }
    }

    setTimeLeft(calc())
    const id = setInterval(() => setTimeLeft(calc()), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (!timeLeft) return null

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEC", value: timeLeft.seconds },
  ]

  return (
    <div className="flex items-end gap-4 md:gap-6">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <div className="font-display text-2xl md:text-4xl font-bold text-white overflow-hidden h-[1.2em] flex items-center">
            <DigitFlip value={value} />
          </div>
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
