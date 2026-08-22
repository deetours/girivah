"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ChevronDown } from "lucide-react"
import CountdownTimer from "./CountdownTimer"
import { spitiConfig } from "@/components/ladakh/data/expeditionData"

const EASE = [0.32, 0.72, 0, 1] as const

export default function TheCallHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleBookNow = () => {
    document.getElementById("mission-acceptance")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleGetBrief = () => {
    document.getElementById("mission-acceptance")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Background — Ken Burns */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imgScale, opacity: imgOpacity }}
      >
        <Image
          src="/exp-ladakh.jpg"
          alt="Ladakh Range"
          fill
          className="object-cover object-center grayscale-[0.2]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-between px-6 md:px-16 py-10 pt-20 md:pt-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-accent">
            GIRIVAH EXPEDITIONS // LADAKH EXPEDITION
          </span>
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30 hidden md:block">
            34.15°N — 77.58°E
          </span>
        </motion.div>

        {/* Center content */}
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.4 }}
          >
            <h1 className="font-display font-black uppercase leading-none mb-4">
              <span
                className="block text-white"
                style={{ fontSize: "clamp(4rem,12vw,12rem)", letterSpacing: "-0.04em" }}
              >
                LADAKH
              </span>
              <span
                className="block text-accent italic"
                style={{ fontSize: "clamp(4rem,12vw,12rem)", letterSpacing: "-0.04em" }}
              >
                CALLED.
              </span>
            </h1>

            <p className="font-sans text-white/50 text-sm md:text-base leading-relaxed max-w-md mt-6 tracking-wide">
              The roof of the world is calling. 19,024 feet of absolute altitude, frozen lakes, and 
              the world's highest paved road.{" "}
              <span className="text-white/80">The mission is live.</span>
            </p>

            {/* Trust signal */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-accent text-sm">★★★★★</span>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/40">
                4.9 — 200+ expeditions. 0 regrets. 0 medical evacuations.
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
              <motion.button
                onClick={handleBookNow}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-accent px-10 py-4 text-[11px] tracking-[0.3em] font-bold"
              >
                SECURE MY SEAT
              </motion.button>
              <motion.button
                onClick={handleGetBrief}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ghost px-10 py-4 text-[11px] tracking-[0.3em]"
              >
                GET THE FULL BRIEF
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom — countdown + scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.0 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3">
              BATCH DEPARTS IN
            </p>
            <CountdownTimer targetDate={spitiConfig.nextBatchDate} />
          </div>

          <div className="flex flex-col items-center gap-2 pb-2">
            <span
              className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              ENTER THE VOID
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-white/30" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
