"use client"

import { memo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { VehicleTier as VehicleTierType } from "@/components/spiti/data/expeditionData"
import { Zap, Wind, Users, ChefHat } from "lucide-react"

interface VehicleTierProps {
  tier: VehicleTierType
  index?: number
  isSelected?: boolean
  isFocusMode?: boolean
}

const EASE = [0.32, 0.72, 0, 1] as const

const iconMap: Record<string, React.ReactNode> = {
  "Turbo Urbania": <Wind className="w-5 h-5" />,
  "Toyota Innova Hycross": <Zap className="w-5 h-5" />,
  "Custom Luxury Urbania": <ChefHat className="w-5 h-5" />,
}

function VehicleTier({
  tier,
  index = 0,
  isSelected = false,
  isFocusMode = false,
}: VehicleTierProps) {
  const handleConfigure = () => {
    // Use Lenis scrollTo if available, fallback to native scrollIntoView
    const el = document.getElementById("mission-acceptance")
    if (el) {
      // Store selected tier in URL for form pre-population
      window.location.href = `#mission-acceptance?tier=${tier.id}`
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const colorMap: Record<string, string> = {
    shared: "from-amber-900/20",
    elite: "from-blue-900/20",
    sovereign: "from-indigo-900/20",
  }

  // Focus mode layout — compact, centered, highlights selection
  if (isFocusMode) {
    return (
      <motion.div
        className={`relative h-full w-full overflow-hidden flex flex-col justify-between p-8 rounded-xl border-2 transition-all ${
          isSelected
            ? `border-[${"#FF3E00"}] bg-[${"#FF3E00"}]/5`
            : "border-white/10 bg-white/2"
        }`}
        style={{
          borderColor: isSelected ? "#FF3E00" : "rgba(255,255,255,0.1)",
          backgroundColor: isSelected ? "#FF3E00" + "05" : "rgba(255,255,255,0.02)",
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={tier.img}
            alt={tier.name}
            fill
            className="object-cover object-center grayscale-[0.3] opacity-30"
            sizes="100vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[tier.id]} via-black/60 to-black/90`} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Badge */}
          <motion.div animate={{ scale: isSelected ? 1.05 : 1 }}>
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: "#FF3E00" }}>
              {tier.tier}
              {tier.isRecommended && " ⭐"}
            </span>
          </motion.div>

          {/* Center — Name + Price */}
          <div>
            <h3 className="font-display font-black uppercase text-white leading-tight mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)" }}>
              {tier.name}
            </h3>
            <p className="font-display text-2xl font-black" style={{ color: "#FF3E00" }}>
              {tier.price}
            </p>
            <p className="font-mono text-[8px] text-white/40 mt-2 uppercase tracking-widest">
              {tier.seats} seats
            </p>
          </div>

          {/* Vehicle + Stay */}
          <div className="border-t border-white/10 pt-4">
            <p className="font-mono text-[7px] tracking-[0.3em] uppercase text-white/30 mb-2">VEHICLE</p>
            <p className="font-sans text-xs text-white/70">{tier.vehicleName}</p>
            <p className="font-mono text-[7px] text-white/40 mt-2">{tier.stayType}</p>
          </div>

          {/* CTA */}
          <motion.button
            onClick={handleConfigure}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-6 px-4 py-2 border-2 uppercase font-mono text-[8px] tracking-widest font-bold rounded transition-all"
            style={{
              borderColor: "#FF3E00",
              color: "#FF3E00",
              backgroundColor: isSelected ? "#FF3E00" + "20" : "#FF3E00" + "08",
            }}
          >
            {isSelected ? "SELECTED" : "SELECT"}
          </motion.button>
        </div>
      </motion.div>
    )
  }

  // Default full-screen layout
  return (
    <motion.div
      className="relative h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={tier.img}
          alt={tier.name}
          fill
          className="object-cover object-center grayscale-[0.2]"
          sizes="100vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[tier.id]} via-black/40 to-black/80`} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top — Tier badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        >
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-accent">
            {tier.tier}
            {tier.isRecommended && " — RECOMMENDED"}
          </span>
        </motion.div>

        {/* Center — Left side (40% width) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 items-end"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        >
          {/* Left column — Vehicle name + price */}
          <div>
            <h3
              className="font-display font-black uppercase text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2rem,5vw,5rem)" }}
            >
              {tier.name}
            </h3>

            <div className="mb-8">
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30 block mb-2">
                PRICE_PER_PERSON
              </span>
              <span className="font-display text-3xl md:text-4xl font-black text-accent">
                {tier.price}
              </span>
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/40 mt-2">
                {tier.priceNote}
              </p>
            </div>

            <motion.button
              onClick={handleConfigure}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-accent px-8 py-3 text-[10px] tracking-[0.3em]"
            >
              CONFIGURE THIS TIER →
            </motion.button>
          </div>

          {/* Middle column — Vehicle spec */}
          <div className="border-t border-white/10 pt-6">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30 mb-3">
              VEHICLE_CLASSIFIED
            </p>
            <h4 className="font-display font-bold text-white mb-2">{tier.vehicleName}</h4>
            <p className="font-sans text-sm text-white/50">{tier.vehicleSpec}</p>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30 mb-3">
                ACCOMMODATION
              </p>
              <h5 className="font-display font-bold text-white mb-2">{tier.stayType}</h5>
              <p className="font-sans text-sm text-white/50">{tier.staySpec}</p>
            </div>
          </div>

          {/* Right column — Perks */}
          <div className="border-t border-white/10 pt-6">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30 mb-4">
              EXPEDITION_PERKS
            </p>
            <ul className="space-y-3">
              {tier.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-accent mt-1 flex-shrink-0">▸</span>
                  <span className="font-sans text-sm text-white/70">{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom — Progress bar */}
        <motion.div
          className="border-t border-white/10 pt-6 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">
            {0 + index + 1} / 3 — SHARED / ELITE / SOVEREIGN
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default memo(VehicleTier)
