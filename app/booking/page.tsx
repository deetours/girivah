'use client'

import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// Booking Steps
type Step = 'trip-review' | 'expedition' | 'dates' | 'travelers' | 'details' | 'review' | 'success'

import { EXPEDITIONS } from '@/lib/data/expeditions'
import { vehicles } from '@/lib/data/vehicles'
import { stays } from '@/lib/data/stays'
import { submitBookingApplication } from '@/lib/actions/booking'
import { APPLE_EASE } from '@/lib/constants'
import { MarketplaceItem } from '@/lib/types/marketplace'
import { useJourneyStore } from '@/lib/store/journey-store'
import { getItemByKind } from '@/lib/data/marketplace-lookup'

const months = ['June 2024', 'July 2024', 'August 2024', 'September 2024']

function BookingApplicationContent() {
  const searchParams = useSearchParams()
  const urlItem = searchParams.get('item')
  const urlKind = searchParams.get('kind')
  
  const tripStore = useJourneyStore()
  const hasTripBag = tripStore.items.length > 0

  const [currentStep, setCurrentStep] = useState<Step>('expedition')
  const [direction, setDirection] = useState(1)
  const [refNo, setRefNo] = useState('')
  const [isClient, setIsClient] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // State
  const [data, setData] = useState({
    expedition: '', // we will store the slug here if single-item
    kind: 'trip', // default kind
    date: '',
    travelers: 1,
    name: '',
    email: '',
    experience: '',
  })

  useEffect(() => {
    setIsClient(true)
    if (hasTripBag && !urlItem) {
      setCurrentStep('trip-review')
    } else if (urlItem && urlKind) {
      setData(prev => ({ ...prev, expedition: urlItem, kind: urlKind }))
      setCurrentStep('dates')
    } else {
      setData(prev => ({ ...prev, kind: 'trip' }))
    }
  }, [urlItem, urlKind, hasTripBag])

  const itemsForKind = useMemo(() => {
    switch (data.kind) {
      case 'vehicle': return vehicles;
      case 'stay': return stays;
      default: return EXPEDITIONS;
    }
  }, [data.kind])

  const selectedItem = useMemo(() => {
    return itemsForKind.find(item => item.slug === data.expedition) as MarketplaceItem | undefined
  }, [itemsForKind, data.expedition])

  const handleNext = useCallback((step: Step) => {
    setDirection(1)
    setCurrentStep(step)
  }, [])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    const res = await submitBookingApplication({
      expeditionId: hasTripBag ? 'multi-trip' : data.expedition,
      items: hasTripBag ? tripStore.items.map(i => ({ slug: i.slug, kind: i.kind })) : [{ slug: data.expedition, kind: data.kind }],
      name: data.name,
      email: data.email,
      phone: '',
      age: '',
      medicalConditions: '',
      ridingExperience: data.experience,
      emergencyContactName: '',
      emergencyContactPhone: ''
    })
    
    if (hasTripBag) tripStore.clear()
    
    setRefNo(res.referenceId)
    setIsSubmitting(false)
    handleNext('success')
  }, [data, handleNext, hasTripBag, tripStore])

  const handleBack = useCallback((step: Step) => {
    setDirection(-1)
    setCurrentStep(step)
  }, [])

  // Keyboard Navigation: Enter to advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (currentStep === 'trip-review') handleNext('dates')
        if (currentStep === 'travelers') handleNext('details')
        if (currentStep === 'details' && data.name && data.email.includes('@')) handleNext('review')
        if (currentStep === 'review' && !isSubmitting) handleSubmit()
      }
    };
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, data.name, data.email, handleNext, handleSubmit, isSubmitting])

  const calculateProgress = () => {
    const steps = hasTripBag 
      ? ['trip-review', 'dates', 'travelers', 'details', 'review', 'success']
      : ['expedition', 'dates', 'travelers', 'details', 'review', 'success']
    return ((steps.indexOf(currentStep)) / (steps.length - 1)) * 100
  }

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
    <main className="fixed inset-0 bg-[#050505] z-50 flex flex-col justify-between selection:bg-accent selection:text-white text-white font-sans overflow-y-auto hide-scrollbar">

      {/* CONTEXTUAL BACKGROUND */}
      <AnimatePresence>
        {selectedItem && !hasTripBag && currentStep !== 'success' && currentStep !== 'expedition' && (
          <motion.div
            key={selectedItem.slug}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: APPLE_EASE }}
            className="absolute inset-0 z-0 pointer-events-none fixed"
          >
            <Image src={selectedItem.media[0].src} alt="Background" fill className="object-cover grayscale mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-[#050505]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP-EDGE PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-[60]">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${calculateProgress()}%` }}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
        />
      </div>

      {/* HEADER */}
      <header className="flex justify-between items-center p-8 md:p-12 sticky top-0 w-full z-20 bg-gradient-to-b from-[#050505] to-transparent">
        {currentStep !== 'success' ? (
          <button
            onClick={() => {
              if (currentStep === 'trip-review' || currentStep === 'expedition') {
                if (data.kind === 'vehicle') window.location.href = '/rides';
                else if (data.kind === 'stay') window.location.href = '/stays';
                else window.location.href = '/marketplace';
              }
              if (currentStep === 'dates') {
                if (urlItem) window.history.back();
                else handleBack(hasTripBag ? 'trip-review' : 'expedition');
              }
              if (currentStep === 'travelers') handleBack('dates')
              if (currentStep === 'details') handleBack('travelers')
              if (currentStep === 'review') handleBack('details')
            }}
            className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors focus-visible:text-accent"
          >
            <ArrowLeft size={14} />
            {currentStep === 'expedition' || currentStep === 'trip-review' ? 'Abort Application' : 'Back'}
          </button>
        ) : <div />}

        <div className="text-[10px] tracking-[0.3em] font-medium text-white/30 uppercase">
          Step {hasTripBag 
            ? ['trip-review', 'dates', 'travelers', 'details', 'review', 'success'].indexOf(currentStep) + 1
            : ['expedition', 'dates', 'travelers', 'details', 'review', 'success'].indexOf(currentStep) + 1} / 6
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col px-6 md:px-12 w-full max-w-5xl mx-auto min-h-max relative z-10 py-24">
        <AnimatePresence custom={direction} mode="wait">
          
          {/* STEP 0: TRIP REVIEW (Multi-item) */}
          {currentStep === 'trip-review' && (
            <motion.div
              key="step0"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: APPLE_EASE }}
              className="w-full max-w-4xl"
            >
              <h1 className="font-display text-4xl md:text-7xl mb-12 text-white leading-tight">
                Your custom <br /><span className="italic font-light text-white/40">Manifest.</span>
              </h1>
              <div className="flex flex-col gap-4 mb-12">
                {tripStore.items.map(item => {
                  const resolved = getItemByKind(item.kind, item.slug)
                  if (!resolved) return null
                  return (
                    <div key={item.key} className="flex justify-between items-center p-6 md:p-8 border border-white/10 bg-white/[0.02]">
                       <div>
                         <span className="block text-[10px] uppercase font-sans tracking-widest text-accent mb-2">{item.kind}</span>
                         <h3 className="font-display text-2xl text-white">{resolved.title}</h3>
                       </div>
                    </div>
                  )
                })}
              </div>
              <button onClick={() => handleNext('dates')} className="btn-accent px-12 py-5 flex items-center justify-center gap-4">
                Confirm Manifest <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

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
              className="w-full max-w-4xl"
            >
              <h1 className="font-display text-4xl md:text-7xl mb-12 text-white leading-tight">
                Which route <br /><span className="italic font-light text-white/40">calls you?</span>
              </h1>
              <div className="flex flex-col gap-2">
                {itemsForKind.map((item: any) => (
                  <button
                    key={item.slug}
                    onClick={() => {
                      setData({ ...data, expedition: item.slug })
                      setTimeout(() => handleNext('dates'), 400)
                    }}
                    className={`text-left p-6 md:p-8 text-xl md:text-2xl font-light border-b w-full transition-all duration-500 flex justify-between items-center group relative overflow-hidden
                      ${data.expedition === item.slug
                        ? 'border-accent text-white bg-accent/5'
                        : 'border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
                  >
                    <span className="relative z-10">{item.title}</span>
                    {data.expedition === item.slug && <Check className="text-accent relative z-10" />}
                    
                    {/* Hover Image Reveal */}
                    <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none z-0">
                       <Image src={item.media[0].src} alt="Preview" fill className="object-cover" />
                    </div>
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
              className="w-full max-w-4xl"
            >
              <h1 className="font-display text-4xl md:text-7xl mb-4 text-white">
                When do <br /><span className="italic font-light text-white/40">we go?</span>
              </h1>
              <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-12">
                Mission: {hasTripBag ? 'Multi-Item Manifest' : selectedItem?.title}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {months.map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      setData({ ...data, date: m })
                      setTimeout(() => handleNext('travelers'), 400)
                    }}
                    className={`py-8 text-2xl font-light border transition-all duration-500 rounded-sm
                      ${data.date === m
                        ? 'border-accent text-white bg-accent/5'
                        : 'border-white/10 text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5'}`}
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
              className="w-full max-w-4xl text-center"
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
                <span className="font-display text-8xl md:text-[12rem] tabular-nums font-semibold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
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
              className="w-full max-w-4xl"
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
                  <button onClick={() => handleNext('review')} className="btn-accent px-12 py-5 flex items-center gap-4 hover:shadow-[0_0_30px_rgba(255,62,0,0.3)] transition-shadow">
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
              className="w-full max-w-4xl"
            >
              <h1 className="font-display text-4xl md:text-7xl mb-16 text-white text-center md:text-left">
                Route Dossier<span className="text-accent/80">.</span>
              </h1>

              <div className="bg-[#0A0A0A]/50 backdrop-blur-md p-10 md:p-16 mb-16 space-y-12 border border-white/10 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/50 to-transparent" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/5 pb-12 relative z-10">
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Item</span>
                    <span className="text-xl md:text-3xl font-light text-white leading-tight">
                       {hasTripBag ? `${tripStore.items.length} Custom Items` : selectedItem?.title}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Dates</span>
                    <span className="text-xl md:text-3xl font-light text-white">{data.date}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Applicant</span>
                    <span className="text-xl md:text-3xl font-light text-white block truncate">{data.name}</span>
                    <span className="text-sm text-white/40 mt-2 font-light">{data.email}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Composition</span>
                    <span className="text-xl md:text-3xl font-light text-white">{data.travelers} Adventurer{data.travelers > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-start">
                  <button onClick={handleSubmit} disabled={isSubmitting} className="btn-accent px-16 py-6 text-sm tracking-[0.3em] w-full md:w-auto hover:shadow-[0_0_40px_rgba(255,62,0,0.3)] transition-shadow">
                    {isSubmitting ? 'Transmitting...' : 'Commit to Selection'}
                  </button>
              </div>
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
              transition={{ duration: 0.8, ease: APPLE_EASE }}
              className="w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-32 py-20"
            >
              <div className="w-full lg:w-1/2 text-left">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}
                  className="w-20 h-20 border border-accent rounded-full flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(255,62,0,0.2)] bg-accent/5 backdrop-blur-md"
                >
                  <Check size={32} className="text-accent" />
                </motion.div>
                <h1 className="font-display text-5xl md:text-7xl mb-6 text-white leading-[1.1]">
                  Receipt Confirmed.
                </h1>
                <p className="font-sans text-xl md:text-2xl font-light text-white/50 mb-12 max-w-xl leading-relaxed">
                  Your entry log has been securely transmitted. A lead guide will review your coordinates within 48 hours.
                </p>

                <div className="mb-12 border-t border-white/10 pt-8 w-full">
                   <div className="flex gap-4">
                      <div className="text-[10px] tracking-[0.4em] uppercase text-white/30">Identifier Route:</div>
                      <div className="text-[10px] tracking-[0.4em] uppercase text-white select-all">{refNo}</div>
                   </div>
                </div>

                <Link href="/marketplace" className="inline-block px-10 py-5 border border-white/20 uppercase tracking-[0.3em] text-[10px] text-white hover:bg-white hover:text-black transition-all">
                  Return to Base
                </Link>
              </div>

              <div className="w-full lg:w-1/2 p-8 md:p-12 border border-white/5 bg-[#0A0A0A]/50 backdrop-blur-md rounded-xl">
                 <p className="text-[10px] uppercase font-sans tracking-[0.4em] text-accent mb-12">Protocol Timeline</p>
                 <div className="space-y-12 relative border-l border-white/10 ml-2">
                    {[
                      { title: 'Logistics Review', desc: 'Operations verifies route viability against your profile and availability.' },
                      { title: 'Comms Established', desc: 'You will receive a transmission to schedule a readiness assessment.' },
                      { title: 'Clearance Granted', desc: 'Upon passing the assessment, your expedition slot is officially locked.' }
                    ].map((step, i) => (
                      <div key={i} className="relative pl-8">
                         <div className="absolute top-1.5 -left-[5px] w-[9px] h-[9px] rounded-full bg-accent" />
                         <h4 className="font-display text-2xl text-white mb-2">{step.title}</h4>
                         <p className="font-sans text-sm font-light leading-relaxed text-white/50">{step.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* PERSISTENT MINI-BAR */}
      <AnimatePresence>
        {(hasTripBag || selectedItem) && currentStep !== 'expedition' && currentStep !== 'trip-review' && currentStep !== 'success' && (
          <motion.div
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: 20, opacity: 0 }}
             className="fixed bottom-0 left-0 w-full border-t border-white/5 bg-[#050505]/90 backdrop-blur-xl z-[40] py-5 px-6 md:px-12 flex justify-between items-center"
          >
             <div className="flex gap-4 items-center">
                 <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 hidden md:block border-r border-white/10 pr-4">Active Protocol</span>
                 <span className="font-sans text-xs tracking-widest text-white/80">
                   {hasTripBag ? 'Multi-Item Manifest' : selectedItem?.title}
                 </span>
             </div>
             <div className="flex gap-4 items-center">
                <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 hidden md:inline">Composition</span>
                <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-accent border border-accent/20 px-3 py-1 rounded-sm bg-accent/5">
                   {data.travelers} Adventurer{data.travelers > 1 ? 's' : ''}
                </span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}

export default function BookingApplication() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-[#050505]" />}>
      <BookingApplicationContent />
    </Suspense>
  )
}
