"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import SectionTag from "@/components/ladakh/shared/SectionTag"

const EASE = [0.32, 0.72, 0, 1] as const

const narrativeLines = [
  "Day 1 begins in 0 miles.",
  "The engine is warm.",
  "The valley is waiting.",
]

export default function EnteringTheVoid() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] flex flex-col items-center justify-center py-32 px-6 md:px-16 bg-[#030303] overflow-hidden"
    >
      {/* Subtle scanline */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)",
        }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 radial-gradient" />
      </motion.div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex justify-center"
        >
          <SectionTag scene="SCENE 03" title="ENTERING THE VOID" />
        </motion.div>

        {/* Main statement */}
        <div className="overflow-hidden mb-3">
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="font-display font-black uppercase text-white/20 leading-none"
            style={{ fontSize: "clamp(1.5rem,4vw,4rem)", letterSpacing: "-0.02em" }}
          >
            YOU ARE NOW
          </motion.p>
        </div>
        <div className="overflow-hidden mb-16">
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="font-display font-black uppercase text-white leading-none"
            style={{ fontSize: "clamp(2rem,6vw,6rem)", letterSpacing: "-0.03em" }}
          >
            LEAVING CIVILIZATION
          </motion.p>
        </div>

        {/* Animated horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          className="w-32 h-px bg-white/20 mx-auto mb-12 origin-center"
        />

        {/* HUD first appearance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="inline-flex items-center gap-6 bg-white/5 border border-white/10 px-6 py-4 mb-12"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">
              TLM_ALTITUDE
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="font-display text-xl font-bold text-[#00F0FF]"
            >
              11,480 FT
            </motion.span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.1 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 0.8, repeat: 3, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-accent"
            />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-accent">
              TELEMETRY ONLINE
            </span>
          </motion.div>
        </motion.div>

        {/* Narrative lines */}
        <div className="flex flex-col items-center gap-3 mb-12">
          {narrativeLines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.8 + i * 0.15 }}
              className="font-sans text-white/30 text-sm tracking-widest uppercase"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Scroll prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent"
        >
          DESCEND INTO THE SIEGE ↓
        </motion.p>
      </div>
    </section>
  )
}
