"use client"

import { motion } from "framer-motion"
import SectionTag from "@/components/ladakh/shared/SectionTag"

const EASE = [0.32, 0.72, 0, 1] as const

export default function TheThreshold() {
  const handleGoVersion = () => {
    document.getElementById("mission-acceptance")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-40 px-6 md:px-16 bg-[#050505] overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #FF3E00 1px, transparent 1px), linear-gradient(to bottom, #FF3E00 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16"
        >
          <SectionTag scene="SCENE 02" title="THE THRESHOLD" />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-3">
          <motion.h2
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="font-display font-black uppercase text-white leading-none"
            style={{ fontSize: "clamp(2.5rem,7vw,7rem)", letterSpacing: "-0.03em" }}
          >
            THERE ARE TWO VERSIONS
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-20">
          <motion.h2
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="font-display font-black uppercase text-accent leading-none"
            style={{ fontSize: "clamp(2.5rem,7vw,7rem)", letterSpacing: "-0.03em" }}
          >
            OF YOU.
          </motion.h2>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="w-12 h-px bg-accent mb-20 origin-left"
        />

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left — stays */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
          >
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/20 mb-5">
              THE VERSION THAT STAYS
            </p>
            <p className="font-sans text-white/30 text-base md:text-lg leading-relaxed">
              This version is comfortable. Safe. It will spend a Sunday researching this page,
              maybe bookmark it, and return to a life that asked nothing of it. The mountains will
              remain photographs on someone else&apos;s wall.
            </p>
          </motion.div>

          {/* Right — goes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          >
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white mb-5">
              THE VERSION THAT GOES
            </p>
            <p className="font-sans text-white/80 text-base md:text-lg leading-relaxed">
              This version accepts the call. It boards at dawn, breathes thin air at 19,000 feet,
              watches the Milky Way from a camp where no city light exists, and returns permanently
              different. The mountains will be memory — permanent, uneditable.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
          className="mt-16 flex justify-start"
        >
          <button
            onClick={handleGoVersion}
            className="font-sans text-sm tracking-[0.2em] uppercase text-accent border-b border-accent/0 hover:border-accent/80 transition-all duration-300 pb-1 group"
          >
            I&apos;M THE VERSION THAT GOES{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
