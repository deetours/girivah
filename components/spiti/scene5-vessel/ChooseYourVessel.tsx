"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import SectionTag from "../shared/SectionTag"
import { vehicleTiers } from "../data/expeditionData"
import VehicleTier from "./VehicleTier"

export default function ChooseYourVessel() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize selected tier from URL param or default to null
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  useEffect(() => {
    const tierParam = searchParams?.get("tier")
    if (tierParam && vehicleTiers.some(t => t.id === tierParam)) {
      setSelectedTier(tierParam)
    }
  }, [searchParams])

  const handleTierSelect = (tierId: string | null) => {
    setSelectedTier(tierId)
    // Update URL param
    if (tierId) {
      router.push(`?tier=${tierId}`, { scroll: false } as any)
    } else {
      router.push(`?`, { scroll: false } as any)
    }
  }

  return (
    <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden py-12 md:py-0">
      {/* Header */}
      <div className="relative z-20 w-full px-6 md:px-12 pt-12 md:pt-20 pb-8 md:pb-16">
        <SectionTag scene="SCENE 05" title="CHOOSE YOUR VESSEL" />
        <h2 className="font-display font-black text-white mt-8 uppercase leading-tight"
            style={{ fontSize: "clamp(2rem,5vw,4rem)", textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}>
          THE VEHICLE IS NOT TRANSPORT
        </h2>
        <p className="font-sans text-white/50 mt-6 max-w-xl leading-relaxed">
          It is the threshold between your world and ours. Choose how you ascend.
        </p>
      </div>

      {/* DESKTOP — Focus Mode Layout (md+) */}
      <div className="hidden md:flex items-center justify-center min-h-screen px-6 gap-6 relative z-10">
        {vehicleTiers.map((tier) => {
          const isSelected = selectedTier === tier.id
          const isOther = selectedTier && !isSelected

          return (
            <motion.div
              key={tier.id}
              className="cursor-pointer transition-all"
              layout
              onClick={() => handleTierSelect(tier.id)}
              animate={{
                flex: isSelected ? 2 : isOther ? 0.75 : 1,
                opacity: isOther ? 0.5 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <VehicleTier
                tier={tier}
                isSelected={isSelected}
                isFocusMode={true}
              />
            </motion.div>
          )
        })}
      </div>

      {/* MOBILE — Dossier/Expand Layout (<md) */}
      <div className="md:hidden px-4 pb-12">
        <div className="space-y-4">
          {vehicleTiers.map((tier, idx) => (
            <DossierTier
              key={tier.id}
              tier={tier}
              isOpen={selectedTier === tier.id}
              onToggle={() => handleTierSelect(selectedTier === tier.id ? null : tier.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Mobile Dossier Component
function DossierTier({ tier, isOpen, onToggle }: {
  tier: (typeof vehicleTiers)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm"
      initial={{ borderColor: "rgba(255,255,255,0.1)" }}
      animate={{
        borderColor: isOpen ? "#FF3E0040" : "rgba(255,255,255,0.1)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Header — always visible */}
      <motion.button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between focus:outline-none"
        animate={{
          backgroundColor: isOpen ? "#FF3E0008" : "transparent",
        }}
      >
        <div className="text-left">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "#FF3E00" }}>
            {tier.tier} {tier.isRecommended && "— RECOMMENDED"}
          </div>
          <h3 className="font-display font-black text-white text-lg uppercase leading-tight">
            {tier.name}
          </h3>
          <p className="font-mono text-[9px] tracking-widest text-white/40 mt-2 uppercase">
            {tier.price} — {tier.seats} seats
          </p>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ color: "#FF3E00", fontSize: 20 }}
        >
          ▼
        </motion.div>
      </motion.button>

      {/* Expandable details */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 border-t border-white/10 space-y-4">
          {/* Vehicle & Accommodation */}
          <div className="grid gap-4">
            <div>
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/40 mb-2">
                VEHICLE_CLASSIFIED
              </p>
              <p className="font-sans text-white text-sm">{tier.vehicleName}</p>
              <p className="font-mono text-[9px] text-white/50 mt-1">{tier.vehicleSpec}</p>
            </div>

            <div>
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/40 mb-2">
                ACCOMMODATION
              </p>
              <p className="font-sans text-white text-sm">{tier.stayType}</p>
              <p className="font-mono text-[9px] text-white/50 mt-1">{tier.staySpec}</p>
            </div>
          </div>

          {/* Perks */}
          <div>
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/40 mb-3">
              EXPEDITION_PERKS
            </p>
            <ul className="space-y-2">
              {tier.perks.map((perk, i) => (
                <li key={i} className="font-sans text-white/70 text-xs flex gap-2">
                  <span style={{ color: "#FF3E00" }}>▸</span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <motion.button
            onClick={() => document.getElementById("mission-acceptance")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full mt-6 px-6 py-3 border-2 uppercase font-mono text-xs tracking-widest font-bold rounded transition-all"
            style={{
              borderColor: "#FF3E00",
              color: "#FF3E00",
              backgroundColor: "#FF3E0008",
            }}
            whileHover={{
              backgroundColor: "#FF3E0015",
            }}
            whileTap={{ scale: 0.98 }}
          >
            SELECT THIS TIER
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
