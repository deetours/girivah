'use client'

// NEXT STEP 1: Expedition Detail — Elevation Timeline + Apple bezier + Authority signals
// Narrative architecture: Challenge → Route (Elevation Timeline) → The Team → Apply

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowLeft, Shield, Users, Triangle } from 'lucide-react'
import { useRef } from 'react'

const APPLE_EASE = [0.32, 0.72, 0, 1] as const

// Mock — in production this comes from params/CMS
const expedition = {
  title: 'Ladakh High Pass',
  subtitle: 'The ultimate motorcycle pilgrimage through the highest passes on Earth.',
  duration: '14 Days',
  price: '₹ 45,000',
  location: 'Ladakh, India',
  maxElevation: '18,380 ft',
  spotsLeft: 3,
  season: 'Jun — Sep',
  image: '/exp-ladakh.jpg',
  tags: ['Khardung La', 'Pangong Tso', 'Zanskar'],

  // NEXT STEP 1: The Elevation Timeline — replaces standard itinerary
  elevationTimeline: [
    { day: '01', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Arrival & Acclimatization', desc: 'Rest. Drink water. The altitude demands respect. Evening briefing and Royal Enfield 500 handover.' },
    { day: '02', location: 'Khardung La', elevation: 17582, elevLabel: '17,582 ft', title: 'The Baptism by Fire', desc: 'We cross the highest motorable pass in the world. The air is thin, your machine struggles. You push through.' },
    { day: '03', location: 'Nubra Valley', elevation: 10100, elevLabel: '10,100 ft', title: 'Descent into the Desert', desc: 'Sand dunes and camels in the shadow of Himalayan giants. A surreal contrast that resets your reference.' },
    { day: '08', location: 'Pangong Tso', elevation: 14270, elevLabel: '14,270 ft', title: 'The Grand Blue Expanse', desc: 'Riding alongside the Shyok River. Off-road sections test your balance. The lake appears without warning.' },
    { day: '12', location: 'Chang La', elevation: 17688, elevLabel: '17,688 ft', title: 'The Second Summit', desc: 'The third highest motorable pass. The body has adapted. You ride it differently now — with quiet authority.' },
    { day: '14', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Final Descent. Transformation.', desc: ' 14 days ago you arrived a traveler. You leave an expedition rider. The mountains rearranged something in you.' },
  ],

  // Trust Architecture — Phase 11 of the original audit
  included: [
    'Royal Enfield Himalayan 411cc (maintained)',
    'Fuel for the entire route',
    'UIAGM Certified Lead Guide',
    'Support 4×4 with oxygen & medic',
    'All accommodations & meals',
  ],
  leader: {
    name: 'Arjun Mehta',
    title: 'Lead Expedition Guide · 14 Years in the Zanskar',
    certifications: 'UIAGM · Wilderness First Responder',
    evacuations: '0 Evacuations in 14 years',
  },
}

// The max elevation across the whole timeline — used to scale the chart
const MAX_ELEV = Math.max(...expedition.elevationTimeline.map(d => d.elevation))

export default function ExpeditionDetail() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const timelineRef = useRef(null)
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.1 })

  return (
    <main className="bg-background selection:bg-accent selection:text-white">

      {/* ═ HERO ═ */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-[#050505]">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Image src={expedition.image} alt={expedition.title} fill priority className="object-cover" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent_50%)]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-transparent" />

        <div className="absolute top-32 left-6 md:left-12 z-20">
          <Link href="/expeditions" className="inline-flex items-center gap-4 text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 hover:text-white transition-colors duration-300">
            <ArrowLeft size={14} /> Back to Routes
          </Link>
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 z-20 w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.2 }}
          >
            <p className="text-accent text-[10px] tracking-[0.4em] font-sans uppercase mb-6">{expedition.subtitle}</p>
            <h1 className="font-display text-white text-[clamp(4rem,12vw,12rem)] leading-[0.85] tracking-tighter">
              {expedition.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ═ STICKY DATA BAR ═ */}
      <div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 py-4 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-white/50 text-[10px] tracking-[0.2em] font-sans uppercase">
              <Triangle size={8} className="fill-accent stroke-none" />
              {expedition.maxElevation}
            </div>
            <div className="text-white/50 text-[10px] tracking-[0.2em] font-sans uppercase">{expedition.duration}</div>
            <div className="text-white/50 text-[10px] tracking-[0.2em] font-sans uppercase">{expedition.season}</div>
            <div className={`text-[10px] tracking-[0.2em] font-sans uppercase font-medium ${expedition.spotsLeft <= 2 ? 'text-accent' : 'text-white/50'}`}>
              {expedition.spotsLeft} Spots Left
            </div>
          </div>
          <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
            <span className="font-display text-xl text-white">{expedition.price}</span>
            <Link href="/booking" className="btn-accent px-6 py-3 text-[10px] tracking-[0.2em]">
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* ═ MAIN CONTENT ═ */}
      <section className="py-32 md:py-48 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">

          {/* Left: Narrative + Elevation Timeline */}
          <div className="lg:col-span-7">

            {/* The Over view */}
            <p className="section-label">The Challenge</p>
            <p className="text-xl md:text-3xl text-white/70 font-light leading-snug mb-8 tracking-tight">
              A grueling, awe-inspiring traverse through the high altitude desert of Ladakh. We ride through three of the highest motorable passes in the world, sleeping under the Milky Way and waking to ice in our canteens.
            </p>
            <p className="text-xl md:text-2xl text-white font-medium leading-snug mb-32 tracking-tight">
              This is not a vacation. This is a pilgrimage.
            </p>

            {/* ═ ELEVATION TIMELINE ═ */}
            <div ref={timelineRef}>
              <p className="section-label mb-16">The Route — Elevation Profile</p>

              {/* Visual elevation chart bar */}
              <div className="relative h-32 mb-8 flex items-end gap-1 overflow-hidden">
                {expedition.elevationTimeline.map((pt, i) => {
                  const heightPercent = (pt.elevation / MAX_ELEV) * 100
                  return (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-accent/40 to-accent/10 border-t border-accent/50 relative group"
                      style={{ height: `${heightPercent}%` }}
                      initial={{ scaleY: 0, originY: 1 }}
                      animate={isTimelineInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.9, ease: APPLE_EASE, delay: i * 0.08 }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[8px] font-sans tracking-wider text-white/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {pt.elevLabel}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Day labels under chart */}
              <div className="flex gap-1 mb-20 pb-4 border-b border-white/5">
                {expedition.elevationTimeline.map((pt, i) => (
                  <div key={i} className="flex-1 text-center text-[8px] font-sans tracking-wider text-white/30 uppercase">
                    D{pt.day}
                  </div>
                ))}
              </div>

              {/* Narrative Day-by-Day items */}
              <div className="relative border-l border-white/10 ml-4 pb-12">
                {expedition.elevationTimeline.map((day, i) => (
                  <motion.div
                    key={i}
                    className="relative pl-12 md:pl-16 mb-20 last:mb-0 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isTimelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.3 + i * 0.07 }}
                  >
                    <div className="absolute top-3 -left-[5px] w-[9px] h-[9px] rounded-full bg-white/10 group-hover:bg-accent group-hover:scale-150 transition-all duration-500" />

                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-accent/60">Day {day.day}</span>
                      <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-white/30 flex items-center gap-1">
                        <Triangle size={6} className="fill-white/20 stroke-none" />
                        {day.elevLabel}
                      </span>
                      <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-white/20">{day.location}</span>
                    </div>

                    <h4 className="font-display text-3xl md:text-4xl text-white/30 group-hover:text-white transition-colors duration-500 mb-4">
                      {day.title}
                    </h4>
                    <p className="text-white/40 text-base md:text-lg font-light leading-relaxed max-w-2xl group-hover:text-white/70 transition-colors duration-500">
                      {day.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ═ TRUST ARCHITECTURE: The Leader ═ */}
            <div className="mt-32 border border-white/5 bg-[#0A0A0A] p-10 md:p-16">
              <p className="section-label mb-12">Your Lead Guide</p>
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Shield size={28} className="text-accent/60" />
                </div>
                <div>
                  <h3 className="font-display text-3xl text-white mb-2">{expedition.leader.name}</h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-white/40 mb-6">{expedition.leader.title}</p>
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-accent/80">{expedition.leader.certifications}</span>
                    <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-white/30">{expedition.leader.evacuations}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Sticky Application Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 border border-white/10 bg-[#0A0A0A] p-10 md:p-14">
              <h3 className="font-display text-white text-3xl mb-12">Expedition Details</h3>

              <div className="space-y-6 mb-16">
                {[
                  ['Max Elevation', expedition.maxElevation],
                  ['Duration', expedition.duration],
                  ['Season', expedition.season],
                  ['Team Size', 'Max 8 Riders'],
                  ['Accommodation', 'Boutique & Base Camp'],
                  ['Status', `${expedition.spotsLeft} Spots Remaining`],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/30">{label}</span>
                    <span className={`text-[10px] tracking-[0.2em] font-sans uppercase font-medium ${label === 'Status' && expedition.spotsLeft <= 2 ? 'text-accent' : 'text-white'}`}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="mb-14">
                <h4 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/30 mb-6">What's Included</h4>
                <ul className="space-y-4">
                  {expedition.included.map((inc, i) => (
                    <li key={i} className="text-sm font-sans text-white/60 font-light flex gap-4 items-start">
                      <span className="text-accent mt-1 leading-none">+</span> {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <Link href="/booking" className="btn-accent w-full justify-center py-5 block text-center">
                  Apply for this Route
                </Link>
              </motion.div>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Users size={10} className="text-white/20" />
                <p className="text-center text-[10px] tracking-[0.1em] font-sans uppercase text-white/20">
                  Applications reviewed within 48h.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
