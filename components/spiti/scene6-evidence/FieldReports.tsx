"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import SectionTag from "@/components/spiti/shared/SectionTag"
import { fieldReports } from "@/components/spiti/data/expeditionData"
import { Star } from "lucide-react"

const EASE = [0.32, 0.72, 0, 1] as const

const stats = [
  { label: "Years in the High Passes", value: "14+" },
  { label: "Medical Evacuation Incidents", value: "0" },
  { label: "Average Explorer Rating", value: "4.9" },
]

export default function FieldReports() {
  return (
    <section className="relative min-h-screen bg-[#050505] px-6 md:px-16 py-32">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16"
        >
          <SectionTag scene="SCENE 06" title="THE EVIDENCE" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mb-20"
        >
          <h2
            className="font-display font-black uppercase text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem,5vw,5rem)" }}
          >
            FIELD REPORTS FROM THE FRONT
          </h2>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">
            Dispatched from 200+ explorers. Unedited. Unsponsored.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="border-l border-accent/30 pl-8 py-2">
              <p className="font-display text-4xl md:text-5xl font-black text-accent mb-3">
                {stat.value}
              </p>
              <p className="font-sans text-white/40 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fieldReports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-[#0A0A0A] border border-white/5 p-8 group cursor-default"
            >
              {/* Location tag */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-accent">
                  {report.location}
                </span>
                <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-white/20">
                  {report.batchDate}
                </span>
              </div>

              {/* Quote */}
              <p className="font-sans text-white/70 italic text-base leading-relaxed mb-6">
                "{report.quote}"
              </p>

              {/* Footer */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                  <Image
                    src={report.img}
                    alt={report.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover grayscale"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-display font-black text-white text-sm uppercase">{report.name}</p>
                  <p className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em]">
                    {report.role}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: report.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
