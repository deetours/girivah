"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { vehicleTiers } from "../data/expeditionData"

const EASE = [0.32, 0.72, 0, 1] as const

interface LeadCaptureFormProps {
  onSuccess?: () => void
}

export default function LeadCaptureForm({ onSuccess }: LeadCaptureFormProps) {
  const searchParams = useSearchParams()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    tier: "elite",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")
  const [submittedPhone, setSubmittedPhone] = useState("")

  // Pre-populate tier from URL param on mount
  useEffect(() => {
    const tierParam = searchParams?.get("tier")
    if (tierParam && vehicleTiers.some((t) => t.id === tierParam)) {
      setFormData((prev) => ({ ...prev, tier: tierParam }))
    }
  }, [searchParams])

  const handleNameSubmit = () => {
    if (formData.name.trim()) {
      setStep(2)
    }
  }

  const handlePhoneSubmit = () => {
    if (formData.whatsapp.trim()) {
      setStep(3)
    }
  }

  const handleTierSelect = (tierId: string) => {
    setFormData((prev) => ({ ...prev, tier: tierId }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.whatsapp || !formData.tier) return

    setStatus("submitting")
    setSubmittedPhone(formData.whatsapp)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setStatus("success")
    if (onSuccess) {
      setTimeout(onSuccess, 2500)
    }
  }

  const selectedTier = vehicleTiers.find((t) => t.id === formData.tier)

  return (
    <div className="w-full max-w-2xl">
      <AnimatePresence mode="wait">
        {status === "idle" || status === "submitting" ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="space-y-8"
          >
            {/* STEP 1 — Name */}
            <motion.div
              layout
              className="space-y-3"
            >
              <motion.label
                animate={{ opacity: step >= 1 ? 1 : 0.5 }}
                className="block font-mono text-[9px] tracking-[0.3em] uppercase text-white/30"
              >
                STEP 01
              </motion.label>

              {/* Completed steps fade up smaller */}
              <AnimatePresence mode="wait">
                {step > 1 ? (
                  <motion.div
                    key="name-completed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pb-4 border-b border-white/10"
                  >
                    <p className="font-display text-sm text-white/70">
                      {formData.name}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="name-input"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <p className="font-display text-white text-lg">
                      What should we call you?
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                        placeholder="Your name"
                        autoFocus
                        className="field-input flex-1"
                      />
                      <motion.button
                        type="button"
                        onClick={handleNameSubmit}
                        disabled={!formData.name.trim()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-accent text-black font-bold rounded transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        ↵
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* STEP 2 — Phone */}
            <AnimatePresence mode="wait">
              {step >= 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <motion.label
                    animate={{ opacity: step >= 2 ? 1 : 0.5 }}
                    className="block font-mono text-[9px] tracking-[0.3em] uppercase text-white/30"
                  >
                    STEP 02
                  </motion.label>

                  <AnimatePresence mode="wait">
                    {step > 2 ? (
                      <motion.div
                        key="phone-completed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pb-4 border-b border-white/10"
                      >
                        <p className="font-display text-sm text-white/70">
                          {formData.whatsapp}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="phone-input"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <p className="font-display text-white text-lg">
                          Best number to reach you on WhatsApp
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                            onKeyDown={(e) => e.key === "Enter" && handlePhoneSubmit()}
                            placeholder="+91 98765 43210"
                            autoFocus
                            className="field-input flex-1"
                          />
                          <motion.button
                            type="button"
                            onClick={handlePhoneSubmit}
                            disabled={!formData.whatsapp.trim()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-accent text-black font-bold rounded transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            ↵
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 3 — Tier Selection */}
            <AnimatePresence mode="wait">
              {step >= 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <motion.label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">
                    STEP 03
                  </motion.label>

                  <p className="font-display text-white text-lg">
                    Which experience calls you?
                  </p>

                  <div className="space-y-3">
                    {vehicleTiers.map((tier) => (
                      <motion.button
                        key={tier.id}
                        type="button"
                        onClick={() => handleTierSelect(tier.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full px-4 py-3 rounded border-2 transition-all text-left ${
                          formData.tier === tier.id
                            ? `border-[${tier.accentColor}] bg-[${tier.accentColor}]/5`
                            : "border-white/10 bg-white/2 hover:border-white/20"
                        }`}
                        style={{
                          borderColor: formData.tier === tier.id ? tier.accentColor : "rgba(255,255,255,0.1)",
                          backgroundColor: formData.tier === tier.id ? tier.accentColor + "08" : "rgba(255,255,255,0.02)",
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/40 mb-1">
                              {tier.tier}
                              {tier.isRecommended && " — ⭐ RECOMMENDED"}
                            </p>
                            <p className="font-display font-bold text-white text-sm">
                              {tier.name}
                            </p>
                            <p className="font-mono text-[8px] text-white/30 mt-1">
                              {tier.seats} seats • {tier.price}
                            </p>
                          </div>
                          <motion.div
                            animate={{
                              scale: formData.tier === tier.id ? 1 : 0,
                              opacity: formData.tier === tier.id ? 1 : 0,
                            }}
                            className="flex-shrink-0 ml-3"
                          >
                            <Check
                              className="w-5 h-5"
                              style={{ color: tier.accentColor }}
                            />
                          </motion.div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button — appears only after step 3 */}
            <AnimatePresence>
              {step === 3 && (
                <motion.div
                  key="submit-button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-accent py-4 text-[11px] tracking-[0.3em] font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <motion.span
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        LOCKING IN YOUR SEAT...
                      </motion.span>
                    ) : (
                      "LOCK IN MY SEAT"
                    )}
                  </motion.button>

                  <p className="font-mono text-[7px] tracking-[0.2em] uppercase text-white/20 text-center mt-4">
                    By submitting, you agree to receive a briefing call about the Ladakh Expedition. No spam.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center py-16"
          >
            {/* Checkmark draw animation */}
            <motion.div
              className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "var(--accent)" }}
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </motion.svg>
            </motion.div>

            <motion.h3
              className="font-display font-black text-white uppercase text-2xl mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              YOU'RE IN.
            </motion.h3>

            <motion.p
              className="font-display italic text-accent text-lg mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              This has begun.
            </motion.p>

            <motion.p
              className="font-sans text-white/50 text-sm mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              Kiran will call <span className="text-accent font-bold">{submittedPhone}</span> in the next 15 minutes.
            </motion.p>

            <motion.p
              className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/30 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              Prepare for the briefing.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
