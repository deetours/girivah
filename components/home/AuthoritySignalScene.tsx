'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Triangle } from 'lucide-react'
import { APPLE_EASE } from '@/lib/constants'

export function AuthoritySignalScene() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const stats = [
    { value: '0', label: 'Evacuations in 14 years' },
    { value: '4.98', label: 'Rating from 127 riders' },
    { value: 'UIAGM', label: 'Certified lead guides' },
    { value: '8', label: 'Max riders per route' }
  ]

  const activeIndexRaw = useTransform(scrollYProgress, [0, 1], [0, stats.length])
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(activeIndexRaw, "change", (latest) => {
    setActiveIndex(Math.min(Math.floor(latest), stats.length - 1))
  })

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-background z-20">
      <div className="md:sticky md:top-0 h-screen flex flex-col items-center justify-center border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <Triangle size={800} strokeWidth={0.5} />
        </div>
        
        <p className="section-label mb-12 relative z-10">The Standard</p>
        
        <div className="relative min-h-[350px] md:min-h-[500px] w-full flex items-center justify-center z-10">
          {stats.map((stat, i) => {
            const isActive = i === activeIndex
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ 
                  opacity: isActive ? 1 : 0, 
                  y: isActive ? 0 : (i < activeIndex ? -50 : 50),
                  scale: isActive ? 1 : 0.9
                }}
                transition={{ duration: 0.6, ease: APPLE_EASE }}
                className="absolute text-center"
              >
                <div className="font-display text-[clamp(6rem,15vw,15rem)] leading-none text-white tracking-tighter mix-blend-difference mb-4">
                  {stat.value}
                </div>
                <div className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-accent/80">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
