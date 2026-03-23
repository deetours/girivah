'use client'

// NEXT STEP 1: Expedition Detail — Elevation Timeline + Apple bezier + Authority signals
// Narrative architecture: Challenge → Route (Elevation Timeline) → The Team → Apply

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowLeft, Shield, Users, Triangle } from 'lucide-react'
import { useRef } from 'react'
import { useParams, notFound } from 'next/navigation'

const APPLE_EASE = [0.32, 0.72, 0, 1] as const

const EXPEDITION_DB: Record<string, any> = {
  '1': {
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
    elevationTimeline: [
      { day: '01', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Arrival & Acclimatization', desc: 'Rest. Drink water. The altitude demands respect. Evening briefing and Royal Enfield 500 handover.' },
      { day: '02', location: 'Khardung La', elevation: 17582, elevLabel: '17,582 ft', title: 'The Baptism by Fire', desc: 'We cross the highest motorable pass in the world. The air is thin, your machine struggles. You push through.' },
      { day: '03', location: 'Nubra Valley', elevation: 10100, elevLabel: '10,100 ft', title: 'Descent into the Desert', desc: 'Sand dunes and camels in the shadow of Himalayan giants. A surreal contrast that resets your reference.' },
      { day: '08', location: 'Pangong Tso', elevation: 14270, elevLabel: '14,270 ft', title: 'The Grand Blue Expanse', desc: 'Riding alongside the Shyok River. Off-road sections test your balance. The lake appears without warning.' },
      { day: '12', location: 'Chang La', elevation: 17688, elevLabel: '17,688 ft', title: 'The Second Summit', desc: 'The third highest motorable pass. The body has adapted. You ride it differently now — with quiet authority.' },
      { day: '14', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Final Descent. Transformation.', desc: ' 14 days ago you arrived a traveler. You leave an expedition rider. The mountains rearranged something in you.' },
    ],
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
  },
  '2': {
    title: 'Spiti Circuit',
    subtitle: 'A high-altitude 4x4 overland traverse through the forgotten valleys of Spiti.',
    duration: '10 Days',
    price: '₹ 55,000',
    location: 'Spiti Valley, India',
    maxElevation: '15,059 ft',
    spotsLeft: 5,
    season: 'May — Oct',
    image: '/exp-spiti.jpg',
    tags: ['Kunzum La', 'Key Monastery', 'Pin Valley'],
    elevationTimeline: [
      { day: '01', location: 'Shimla', elevation: 7467, elevLabel: '7,467 ft', title: 'The Ascent Begins', desc: 'Leaving the humid plains to rendezvous in the gateway of the Himalayas. Final vehicle checks.' },
      { day: '03', location: 'Kalpa', elevation: 9711, elevLabel: '9,711 ft', title: 'The Edge of Kinnaur', desc: 'Massive sheer drops and the mighty Kinner Kailash range. The roads narrow down to a single lane.' },
      { day: '05', location: 'Kaza', elevation: 12467, elevLabel: '12,467 ft', title: 'Entering the Void', desc: 'The landscape transitions into stark, arid mountain desert. Oxygen levels drop significantly.' },
      { day: '07', location: 'Kunzum La', elevation: 15059, elevLabel: '15,059 ft', title: 'The Roof of Spiti', desc: 'Tackling the most treacherous pass on the circuit. Snow walls and biting winds.' },
      { day: '10', location: 'Manali', elevation: 6725, elevLabel: '6,725 ft', title: 'Return to the Greens', desc: 'Descending through lush forests. The contrast is jarring after 10 days in the void.' },
    ],
    included: [
      'Expedition Equipped 4x4 Vehicle',
      'Convoy communications system',
      'UIAGM Certified Lead Guide',
      'Mechanic & Recovery Gear',
      'All accommodations & meals',
    ],
    leader: {
      name: 'Priya Sharma',
      title: 'Lead Overland Controller · 10 Years in Spiti',
      certifications: 'UIAGM · Off-road Recovery Expert',
      evacuations: '0 Evacuations in 10 years',
    },
  },
  '3': {
    title: 'Chadar Trek',
    subtitle: 'A high-stakes pedestrian traverse over the frozen Zanskar river in deep winter.',
    duration: '9 Days',
    price: '₹ 38,000',
    location: 'Zanskar, India',
    maxElevation: '11,250 ft',
    spotsLeft: 1,
    season: 'Jan — Feb',
    image: '/exp-ladakh.jpg',
    tags: ['Frozen River', 'Extreme Cold', 'Survival'],
    elevationTimeline: [
      { day: '01', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Arrival in the Deep Freeze', desc: 'Temperatures immediately hit -20°C. Heavy gear check and medical clearance.' },
      { day: '03', location: 'Tilat Sumdo', elevation: 10500, elevLabel: '10,500 ft', title: 'First Steps on Ice', desc: 'Learning the "penguin shuffle". The reality of walking on a frozen river sets in.' },
      { day: '05', location: 'Nerak', elevation: 11150, elevLabel: '11,150 ft', title: 'The Frozen Waterfall', desc: 'The most stunning visual of the trek. A 50-foot solid wall of blue ice.' },
      { day: '07', location: 'Shingra Koma', elevation: 10550, elevLabel: '10,550 ft', title: 'The Long Walk Back', desc: 'The ice shifts. Routes change daily. Following the river back to civilization.' },
      { day: '09', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Thaw out', desc: 'Hot showers and hot food after 9 days on the ice. A completely reset perspective on comfort.' },
    ],
    included: [
      'Sub-zero sleeping bags & tents',
      'Gumboots & Ice-cleats',
      'UIAGM Certified Ice Guide',
      'Porter support for heavy gear',
      'High-calorie mountain meals',
    ],
    leader: {
      name: 'Namgyal',
      title: 'Lead Ice Guide · Native Zanskari',
      certifications: 'UIAGM · Advanced Mountaineering',
      evacuations: '0 Evacuations in 18 years',
    },
  }
}

export default function ExpeditionDetail() {
  const params = useParams()
  const expeditionId = typeof params.id === 'string' ? params.id : '1'
  const expedition = EXPEDITION_DB[expeditionId]
  
  if (!expedition) {
    return notFound()
  }

  // The max elevation across the whole timeline — used to scale the chart
  const MAX_ELEV = Math.max(...expedition.elevationTimeline.map((d: any) => d.elevation))

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

      {/* ═ GALLERY & ATMOSPHERE ═ */}
      <section className="bg-background pt-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex gap-4 md:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {[
            '/exp-ladakh.jpg',
            '/exp-spiti.jpg',
            '/hero-mountain.jpg',
            '/hero-cinematic.jpg'
          ].map((src, i) => (
            <div key={i} className="relative w-[85vw] md:w-[40vw] aspect-[4/3] flex-shrink-0 snap-center overflow-hidden bg-[#111]">
              <Image src={src} alt="Expedition Visual" fill className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0" sizes="(max-width: 768px) 85vw, 40vw" />
            </div>
          ))}
          {/* Video Placeholder */}
          <div className="relative w-[85vw] md:w-[40vw] aspect-[4/3] flex-shrink-0 snap-center overflow-hidden bg-[#0A0A0A] border border-white/10 flex items-center justify-center group cursor-pointer">
             <div className="absolute inset-0 bg-black/50 z-10 transition-colors group-hover:bg-black/20" />
             <Image src={expedition.image} alt="Video Thumbnail" fill className="object-cover opacity-40 grayscale" />
             <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center z-20 group-hover:border-accent group-hover:text-accent transition-all duration-500 bg-black/40 backdrop-blur-md">
               <Triangle size={20} className="ml-1 rotate-90 fill-current opacity-80" />
             </div>
             <p className="absolute bottom-8 left-8 z-20 text-[10px] font-sans tracking-[0.3em] uppercase text-white/50 group-hover:text-white transition-colors">Play Field Tape [02:14]</p>
          </div>
        </div>
      </section>

      {/* ═ MAIN CONTENT ═ */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
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
              <p className="section-label mb-16">The Route — Topography</p>

              {/* Route Map Visual */}
              <div className="w-full h-48 md:h-64 border border-white/5 bg-[#0A0A0A] mb-16 relative overflow-hidden flex flex-col justify-end p-6 md:p-10 group">
                <svg className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-100 transition-opacity duration-1000" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 0 80 Q 20 60 40 70 T 80 30 T 100 20" fill="none" stroke="#FF3E00" strokeWidth="0.5" strokeDasharray="2 2" />
                  <circle cx="0" cy="80" r="1.5" fill="#FF3E00" />
                  <circle cx="40" cy="70" r="1.5" fill="#FF3E00" />
                  <circle cx="80" cy="30" r="1.5" fill="#FF3E00" />
                  <circle cx="100" cy="20" r="1.5" fill="#FF3E00" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-0" />
                <div className="relative z-10 flex justify-between items-end w-full">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-white/50">Start: Leh</span>
                      <span className="font-display text-xl text-white">11,480 ft</span>
                   </div>
                   <div className="flex flex-col gap-1 text-right">
                      <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-accent">Summit: Khardung La</span>
                      <span className="font-display text-xl text-white">18,380 ft</span>
                   </div>
                </div>
              </div>

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
            <div className="sticky top-32 border border-white/10 bg-[#0A0A0A] p-10 md:p-14 relative overflow-hidden group">
              {/* Contextual Image Background */}
              <div className="absolute inset-0 z-0">
                <Image src={expedition.image} alt="Context" fill className="object-cover opacity-5 group-hover:opacity-[0.15] transition-opacity duration-1000 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/80" />
              </div>

              <div className="relative z-10">
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

        </div>
      </section>
    </main>
  )
}
