'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Booking Steps
type Step = 'expedition' | 'dates' | 'travelers' | 'details' | 'review' | 'success'

const expeditions = [
  'Ladakh High Pass (Motorcycle)',
  'Spiti Valley Circuit (4×4)',
  'Zanskar Chadar Trek',
  'Kaza Nomadic Run (Motorcycle)',
]

const months = ['June 2024', 'July 2024', 'August 2024', 'September 2024']

export default function BookingApplication() {
  const [currentStep, setCurrentStep] = useState<Step>('expedition')
  const [direction, setDirection] = useState(1)
  const [refNo, setRefNo] = useState('')
  const [isClient, setIsClient] = useState(false)

  // State
  const [data, setData] = useState({
    expedition: '',
    date: '',
    travelers: 1,
    name: '',
    email: '',
    experience: '',
  })

  // Hydration & Persistence
  useEffect(() => {
    setIsClient(true)
    setRefNo(`GVH-${Math.floor(Math.random() * 10000)}`)

    const saved = localStorage.getItem('girivah_booking_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setData(prev => ({ ...prev, ...parsed }))
      } catch (e) {
        console.error("Failed to parse saved booking data")
      }
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('girivah_booking_data', JSON.stringify(data))
    }
  }, [data, isClient])

  const handleNext = useCallback((step: Step) => {
    setDirection(1)
    setCurrentStep(step)
  }, [])

  const handleBack = useCallback((step: Step) => {
    setDirection(-1)
    setCurrentStep(step)
  }, [])

  // Keyboard Navigation: Enter to advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (currentStep === 'travelers') handleNext('details')
        if (currentStep === 'details' && data.name && data.email.includes('@')) handleNext('review')
        if (currentStep === 'review') handleNext('success')
      }
    };
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, data.name, data.email, handleNext])

  const calculateProgress = () => {
    const steps = ['expedition', 'dates', 'travelers', 'details', 'review', 'success']
    return ((steps.indexOf(currentStep)) / (steps.length - 1)) * 100
  }

  // APPLE BEZIER: Physical, deliberate step transitions
  const APPLE_EASE = [0.32, 0.72, 0, 1]

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 40 : -40,
      opacity: 0,
      filter: 'blur(8px)',
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 40 : -40,
      opacity: 0,
      filter: 'blur(8px)',
    }),
  }

  if (!isClient) return <div className="fixed inset-0 bg-[#050505]" />

  return (
    <main className="fixed inset-0 bg-[#050505] z-50 flex flex-col justify-between selection:bg-accent selection:text-white overflow-hidden text-white font-sans">

      {/* ═ TOP-EDGE PROGRESS BAR (Architectural) ═ */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-[60]">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${calculateProgress()}%` }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>

      {/* ═ HEADER ═ */}
      <header className="flex justify-between items-center p-8 md:p-12 absolute top-0 w-full z-20">
        {currentStep !== 'success' ? (
          <button
            onClick={() => {
              if (currentStep === 'expedition') window.location.href = '/expeditions'
              if (currentStep === 'dates') handleBack('expedition')
              if (currentStep === 'travelers') handleBack('dates')
              if (currentStep === 'details') handleBack('travelers')
              if (currentStep === 'review') handleBack('details')
            }}
            className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors focus-visible:text-accent"
          >
            <ArrowLeft size={14} />
            {currentStep === 'expedition' ? 'Abort Application' : 'Back'}
          </button>
        ) : <div />}

        <div className="text-[10px] tracking-[0.3em] font-medium text-white/30 uppercase">
          Step {['expedition', 'dates', 'travelers', 'details', 'review', 'success'].indexOf(currentStep) + 1} / 6
        </div>
      </header>

      {/* ═ CONTENT ═ */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 w-full max-w-4xl mx-auto h-full relative">
        <AnimatePresence custom={direction} mode="wait">

          {/* STEP 1: EXPEDITION */}
          {currentStep === 'expedition' && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: APPLE_EASE }}
              className="w-full"
            >
              <h1 className="font-display text-4xl md:text-7xl mb-12 text-white leading-tight">
                Which route <br /><span className="italic font-light text-white/40">calls you?</span>
              </h1>
              <div className="flex flex-col gap-2">
                {expeditions.map(exp => (
                  <button
                    key={exp}
                    onClick={() => {
                      setData({ ...data, expedition: exp })
                      setTimeout(() => handleNext('dates'), 400)
                    }}
                    className={`text-left p-6 md:p-8 text-xl md:text-2xl font-light border-b w-full transition-all duration-500 flex justify-between items-center group
                      ${data.expedition === exp
                        ? 'border-accent text-white bg-accent/5'
                        : 'border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
                  >
                    {exp}
                    {data.expedition === exp && <Check className="text-accent" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DATES */}
          {currentStep === 'dates' && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: APPLE_EASE }}
              className="w-full"
            >
              <h1 className="font-display text-4xl md:text-7xl mb-4 text-white">
                When do <br /><span className="italic font-light text-white/40">we ride?</span>
              </h1>
              <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-12">
                Mission: {data.expedition}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {months.map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      setData({ ...data, date: m })
                      setTimeout(() => handleNext('travelers'), 400)
                    }}
                    className={`py-8 text-2xl font-light border transition-all duration-500
                      ${data.date === m
                        ? 'border-accent text-white bg-accent/5'
                        : 'border-white/10 text-white/40 hover:text-white hover:border-white/20 bg-[#0A0A0A]'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: TRAVELERS */}
          {currentStep === 'travelers' && (
            <motion.div
              key="step3"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: APPLE_EASE }}
              className="w-full text-center"
            >
              <h1 className="font-display text-4xl md:text-7xl mb-16 text-white leading-tight">
                How many <br /><span className="italic font-light text-white/40">forming the line?</span>
              </h1>
              <div className="flex justify-center items-center gap-12 mb-20">
                <button
                  onClick={() => setData({ ...data, travelers: Math.max(1, data.travelers - 1) })}
                  className="w-20 h-20 rounded-full border border-white/20 text-3xl font-light hover:border-accent hover:text-accent transition-colors focus-visible:ring-accent"
                >
                  -
                </button>
                <span className="font-display text-8xl md:text-[12rem] tabular-nums font-semibold tracking-tighter text-white">
                  {data.travelers}
                </span>
                <button
                  onClick={() => setData({ ...data, travelers: Math.min(8, data.travelers + 1) })}
                  className="w-20 h-20 rounded-full border border-white/20 text-3xl font-light hover:border-accent hover:text-accent transition-colors focus-visible:ring-accent"
                >
                  +
                </button>
              </div>
              <button onClick={() => handleNext('details')} className="btn-accent px-12 py-5 flex items-center justify-center gap-4 mx-auto w-max">
                Continue <span className="text-[10px] opacity-50 uppercase tracking-widest pl-2">(Enter)</span>
              </button>
            </motion.div>
          )}

          {/* STEP 4: DETAILS */}
          {currentStep === 'details' && (
            <motion.div
              key="step4"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: APPLE_EASE }}
              className="w-full"
            >
              <h1 className="font-display text-4xl md:text-7xl mb-16 text-white">
                Who are you?
              </h1>

              <div className="space-y-12 mb-20">
                <div className="group relative">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Full Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-white/10 py-6 text-3xl md:text-6xl font-light focus:outline-none focus:border-accent placeholder:text-white/10 transition-colors duration-500"
                  />
                  <div className="absolute bottom-0 left-0 h-px bg-accent w-0 group-focus-within:w-full transition-all duration-1000" />
                </div>
                <div className="group relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-white/10 py-6 text-3xl md:text-6xl font-light focus:outline-none focus:border-accent placeholder:text-white/10 transition-colors duration-500"
                  />
                  <div className="absolute bottom-0 left-0 h-px bg-accent w-0 group-focus-within:w-full transition-all duration-1000" />
                </div>
              </div>

              {(data.name && data.email.includes('@')) && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <button onClick={() => handleNext('review')} className="btn-accent px-12 py-5 flex items-center gap-4">
                    Review Dossier <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 5: REVIEW */}
          {currentStep === 'review' && (
            <motion.div
              key="step5"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: APPLE_EASE }}
              className="w-full"
            >
              <h1 className="font-display text-4xl md:text-7xl mb-16 text-white">
                Final Review<span className="text-accent/40">.</span>
              </h1>

              <div className="bg-[#111] p-10 md:p-16 mb-16 space-y-12 border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/5 pb-12">
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Expedition</span>
                    <span className="text-xl md:text-3xl font-light text-white">{data.expedition}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Departure</span>
                    <span className="text-xl md:text-3xl font-light text-white">{data.date}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Applicant</span>
                    <span className="text-xl md:text-3xl font-light text-white block truncate">{data.name}</span>
                    <span className="text-sm text-white/40 mt-1">{data.email}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Composition</span>
                    <span className="text-xl md:text-3xl font-light text-white">{data.travelers} Adventurer{data.travelers > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              <button onClick={() => handleNext('success')} className="w-full py-8 text-sm tracking-[0.4em] font-bold uppercase transition-all duration-500 bg-white text-black hover:bg-accent hover:text-white">
                Commit to Expedition
              </button>
            </motion.div>
          )}

          {/* STEP 6: SUCCESS */}
          {currentStep === 'success' && (
            <motion.div
              key="step6"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full text-center flex flex-col items-center justify-center pt-20"
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}
                className="w-24 h-24 border border-accent rounded-full flex items-center justify-center mb-12 shadow-[0_0_50px_rgba(255,62,0,0.2)]"
              >
                <Check size={40} className="text-accent" />
              </motion.div>
              <h1 className="font-display text-5xl md:text-[6rem] mb-6 text-white leading-none">
                Received.
              </h1>
              <p className="text-xl md:text-2xl font-light text-white/50 mb-16 max-w-xl mx-auto leading-relaxed">
                Your dossier has been transmitted. <br />A lead guide will verify your coordinates within 48 hours.
              </p>

              <div className="text-[10px] tracking-[0.4em] uppercase text-white/20 mb-16 border-t border-white/5 pt-12 w-full max-w-sm">
                Identifier: <span className="text-white/60 select-all">{refNo}</span>
              </div>

              <Link href="/" className="px-10 py-4 border border-white/20 uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all">
                Return to Base
              </Link>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ═ FOOTER ═ */}
      <footer className="p-8 pb-12 opacity-30 text-[9px] font-light uppercase tracking-[0.4em] text-center text-white truncate px-6">
        Secure End-to-End Transmission Protocol · Girivah Digital Core
      </footer>

    </main>
  )
}
