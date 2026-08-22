"use client"

import { motion } from "framer-motion"
import SectionTag from "@/components/ladakh/shared/SectionTag"
import SlotVisualizer from "./SlotVisualizer"
import MissionCountdown from "./MissionCountdown"

const EASE = [0.32, 0.72, 0, 1] as const

const safetySpecs = [
  {
    label: "AMS_MITIGATION",
    detail: "Daily SpO₂ monitoring, paced ascent protocol",
  },
  {
    label: "MEDICAL_OXYGEN",
    detail: "High-flow cylinders in every vehicle (baseline standard)",
  },
  {
    label: "SATELLITE_COMMS",
    detail: "Direct satellite link to base operations 24/7",
  },
  {
    label: "WILDERNESS_WFA",
    detail: "All leads certified in high-altitude rescue protocols",
  },
]

export default function FinalBriefing() {
  return (
    <section className="relative min-h-screen bg-[#050505] px-6 md:px-16 py-24 flex flex-col items-center justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 text-center"
        >
          <SectionTag scene="SCENE 07" title="FINAL BRIEFING" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="font-display font-black uppercase text-white text-center mb-20 leading-tight"
          style={{ fontSize: "clamp(2rem,5vw,5rem)" }}
        >
          THE SAFETY PROTOCOL
        </motion.h2>

        {/* Slot visualizer */}
        <div className="mb-24">
          <SlotVisualizer />
        </div>

        {/* Safety specs terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="bg-[#030303]/50 border border-white/10 p-8 mb-24 font-mono"
        >
          <div className="text-center mb-6 border-b border-white/10 pb-4">
            <p className="text-[9px] tracking-[0.35em] uppercase text-accent font-bold">
              SAFETY_PROTOCOL_v3.1
            </p>
          </div>

          <div className="space-y-3">
            {safetySpecs.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 + i * 0.08 }}
                className="flex items-start gap-4 text-[9px]"
              >
                <span className="text-white/30 flex-shrink-0">│</span>
                <span className="text-white/50 tracking-[0.2em] w-24">{spec.label}</span>
                <span className="text-white/40">{spec.detail}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Countdown */}
        <div>
          <MissionCountdown />
        </div>
      </div>
    </section>
  )
}
