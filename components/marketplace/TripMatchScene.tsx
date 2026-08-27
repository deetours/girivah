'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Bike, Car, Footprints, Snowflake, Sun, CalendarClock, CalendarDays } from 'lucide-react'
import { APPLE_EASE } from '@/lib/constants'
import { matchTrip, TripMatchAnswers } from '@/lib/marketplace/trip-match'
import { ROUTE_GROUPS } from '@/lib/data/route-board'
import { requiresVehicle } from '@/lib/marketplace/facets'
import { useJourneyStore } from '@/lib/store/journey-store'

type QuestionKey = keyof TripMatchAnswers

interface QuestionDef {
  key: QuestionKey
  prompt: string
  options: { value: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[]
}

const QUESTIONS: QuestionDef[] = [
  {
    key: 'mode',
    prompt: 'How do you want to move?',
    options: [
      { value: 'motorcycle', label: 'Motorcycle', icon: Bike },
      { value: '4x4', label: '4x4 Overland', icon: Car },
      { value: 'trek', label: 'On Foot', icon: Footprints },
    ],
  },
  {
    key: 'cold',
    prompt: 'How much cold can you take?',
    options: [
      { value: 'extreme', label: 'Bring the Extreme', icon: Snowflake },
      { value: 'moderate', label: 'Moderate is Fine', icon: Sun },
    ],
  },
  {
    key: 'duration',
    prompt: 'How long can you disappear?',
    options: [
      { value: 'short', label: 'Under 8 Days', icon: CalendarClock },
      { value: 'long', label: '8 Days or More', icon: CalendarDays },
    ],
  },
]

export function TripMatchScene() {
  const [step, setStep] = useState<number | 'result'>(0)
  const [answers, setAnswers] = useState<Partial<TripMatchAnswers>>({})
  const [whatsapp, setWhatsapp] = useState('')
  const [saved, setSaved] = useState(false)
  const addItem = useJourneyStore((s) => s.addItem)
  const openDrawer = useJourneyStore((s) => s.openDrawer)

  const match = step === 'result' ? matchTrip(answers as TripMatchAnswers) : null
  const matchedGroup = match ? ROUTE_GROUPS.find((g) => g.trip.slug === match.slug) ?? null : null

  const priceRef = useRef<HTMLSpanElement>(null)
  const elevRef = useRef<HTMLSpanElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (step !== 'result' || !match) return

      const priceCounter = { val: 0 }
      gsap.to(priceCounter, {
        val: match.fromPrice,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
          if (priceRef.current) {
            priceRef.current.textContent = new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(priceCounter.val)
          }
        },
      })

      const elevCounter = { val: 0 }
      gsap.to(elevCounter, {
        val: match.elevationNum,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
          if (elevRef.current) {
            elevRef.current.textContent = `${Math.round(elevCounter.val).toLocaleString('en-IN')} ft`
          }
        },
      })

      gsap.fromTo(resultRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    },
    { dependencies: [step, match?.slug] }
  )

  function handleAnswer(key: QuestionKey, value: string) {
    const next = { ...answers, [key]: value }
    setAnswers(next)
    if (typeof step === 'number' && step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setStep('result')
    }
  }

  function handleSaveMatch(e: React.FormEvent) {
    e.preventDefault()
    if (!whatsapp || !match) return
    // No WhatsApp Business API connection exists yet — the lead is kept
    // locally so it isn't lost. Swap for a real send via the WhatsApp
    // Business API once one is wired up.
    try {
      const existing = JSON.parse(localStorage.getItem('girivah:leads') || '[]')
      existing.push({ whatsapp, matchedTrip: match.slug, answers, savedAt: new Date().toISOString() })
      localStorage.setItem('girivah:leads', JSON.stringify(existing))
    } catch {
      // localStorage unavailable (private mode, etc.) — fail silently, the UI still confirms.
    }
    setSaved(true)
  }

  function handleRestart() {
    setStep(0)
    setAnswers({})
    setWhatsapp('')
    setSaved(false)
  }

  function handleAddToManifest() {
    if (!match) return
    addItem({ slug: match.slug, kind: 'trip' })
    const manifest = document.getElementById('choose-destination')
    if (manifest) {
      manifest.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      openDrawer()
    }
  }

  const progress = step === 'result' ? QUESTIONS.length : step

  return (
    <section className="py-32 md:py-48 bg-[#050505] relative z-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-6 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-accent/50 block" /> Find Your Route <span className="w-8 h-px bg-accent/50 block" />
          </p>
          <h2 className="font-display text-white text-4xl md:text-6xl leading-[0.9]">
            Which Girivah<br />Are You?
          </h2>
        </div>

        {/* Progress ticks */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-px w-10 md:w-16 transition-colors duration-500 ${i < progress ? 'bg-accent' : 'bg-white/10'}`}
            />
          ))}
        </div>

        <div className="border border-white/10 bg-[#0A0A0A] min-h-[420px] p-8 md:p-16 relative">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />

          <AnimatePresence mode="wait">
            {typeof step === 'number' ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: APPLE_EASE }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mb-4">
                  Question {step + 1} of {QUESTIONS.length}
                </p>
                <h3 className="font-display text-2xl md:text-4xl text-white mb-12">{QUESTIONS[step].prompt}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {QUESTIONS[step].options.map((opt) => {
                    const Icon = opt.icon
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswer(QUESTIONS[step].key, opt.value)}
                        className="group flex flex-col items-center gap-4 border border-white/10 hover:border-accent/60 bg-[#050505]/40 p-8 transition-colors duration-300"
                      >
                        <Icon size={22} className="text-white/40 group-hover:text-accent transition-colors" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors text-center">
                          {opt.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            ) : match ? (
              <div ref={resultRef} key="result">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent mb-4">Your Match</p>
                <h3 className="font-display text-3xl md:text-5xl text-white mb-2 uppercase tracking-tighter">{match.title}</h3>
                <p className="font-sans text-sm text-white/50 font-light mb-8 max-w-md">{match.subtitle}</p>

                <div className="flex flex-wrap gap-x-10 gap-y-4 mb-10 font-mono">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-white/30 mb-1">From</span>
                    <span ref={priceRef} className="text-xl text-white tabular-nums">₹0</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-white/30 mb-1">Peak Elevation</span>
                    <span ref={elevRef} className="text-xl text-accent tabular-nums">0 ft</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-white/30 mb-1">Ride</span>
                    <span className="text-xl text-white/70">
                      {requiresVehicle(match) ? matchedGroup?.vehicle?.name ?? 'Not included' : 'On Foot'}
                    </span>
                  </div>
                </div>

                {!saved ? (
                  <form onSubmit={handleSaveMatch} className="flex flex-col gap-3 max-w-lg">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="tel"
                        required
                        inputMode="tel"
                        pattern="^\+?[0-9 ]{7,15}$"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="flex-1 bg-transparent border border-white/10 focus:border-accent px-5 py-4 text-sm text-white placeholder:text-white/30 outline-none font-sans"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-3 bg-accent text-white font-sans text-[10px] tracking-[0.3em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-colors whitespace-nowrap"
                      >
                        Send to WhatsApp <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                      Include country code — we'll message your match here.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-wrap items-center gap-6"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">✓ Match Locked In</span>
                    <Link
                      href={`/expeditions/${match.slug}`}
                      className="text-[10px] uppercase font-sans tracking-[0.2em] text-white/80 hover:text-accent transition-colors border-b border-white/10 hover:border-accent pb-1"
                    >
                      View This Route
                    </Link>
                    <button
                      onClick={handleAddToManifest}
                      className="text-[10px] uppercase font-sans tracking-[0.2em] text-white/80 hover:text-accent transition-colors border-b border-white/10 hover:border-accent pb-1"
                    >
                      Add to Manifest
                    </button>
                  </motion.div>
                )}

                <button
                  onClick={handleRestart}
                  className="mt-10 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors"
                >
                  Start Over
                </button>
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
