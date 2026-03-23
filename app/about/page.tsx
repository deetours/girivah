'use client'

// NEXT STEP 2 (a): About/Philosophy — Apple micro-animation tenets, cinematic interlude, editorial authority
// Each tenet now reveals individually on scroll with Apple bezier physics

import Image from 'next/image'
import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Orbit, Locate, Compass, Focus } from 'lucide-react'

const APPLE_EASE = [0.32, 0.72, 0, 1] as const

const BELIEFS = [
  {
    title: 'Absolute Presence',
    desc: 'We mandate tech-free zones during expeditions. If you want to photograph the mountain, you miss the mountain. We are here to experience, not to broadcast.',
    icon: Focus,
    stat: '0',
    statLabel: 'Phones at Summit',
  },
  {
    title: 'Uncompromising Logistics',
    desc: 'In the Himalayas, competence is a matter of survival. Every guide is UIAGM certified. Every vehicle is vetted. Every contingency is planned.',
    icon: Orbit,
    stat: 'UIAGM',
    statLabel: 'All Guides Certified',
  },
  {
    title: 'Silence as Currency',
    desc: 'Our groups are capped at 8 people. We avoid the crowded tourist passes during peak hours. We intentionally seek the silent fringes of the valleys.',
    icon: Locate,
    stat: '8',
    statLabel: 'Max Per Expedition',
  },
  {
    title: 'Transformation over Tourism',
    desc: 'You should not return from these mountains as the same person who arrived. We build friction into the itinerary to encourage reflection.',
    icon: Compass,
    stat: '14+',
    statLabel: 'Years in the Range',
  },
]

function Tenet({ belief, index }: { belief: typeof BELIEFS[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: APPLE_EASE, delay: index * 0.08 }}
      className={`p-10 md:p-16 bg-[#0A0A0A] group hover:bg-[#111] transition-colors duration-700
        ${index % 2 === 0 ? 'md:border-r border-white/5' : ''}
        ${index < 2 ? 'border-b border-white/5' : ''}
      `}
    >
      {/* Technical stat — hard evidence as authority */}
      <div className="flex items-end justify-between mb-10">
        <belief.icon size={28} className="text-accent/40 group-hover:text-accent transition-colors duration-500" />
        <div className="text-right">
          <span className="block font-display text-3xl text-white/10 group-hover:text-accent/30 transition-colors duration-500">{belief.stat}</span>
          <span className="text-[8px] tracking-[0.25em] uppercase font-sans text-white/20">{belief.statLabel}</span>
        </div>
      </div>
      <h3 className="font-display text-3xl md:text-4xl text-white mb-5 group-hover:-translate-y-1 transition-transform duration-500 delay-75">
        {belief.title}
      </h3>
      <p className="font-sans text-base font-light text-white/40 leading-relaxed group-hover:text-white/70 transition-colors duration-500 delay-75">
        {belief.desc}
      </p>
    </motion.div>
  )
}

export default function PhilosophyPage() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 800], [0, 200])

  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 })

  return (
    <main className="bg-background min-h-screen selection:bg-accent selection:text-white pb-48">

      {/* ═ EDITORIAL HEADER ═ */}
      <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto" ref={headerRef}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: APPLE_EASE }}
          className="font-display text-[clamp(4rem,14vw,14rem)] text-white/[0.03] uppercase tracking-tighter mb-0 leading-none select-none"
        >
          Philosophy
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 relative z-10 border-t border-white/10 pt-16 -mt-8 md:-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.1 }}
            className="max-w-xl"
          >
            <h2 className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight">
              Modern travel has been reduced to checklists.{' '}
              <span className="text-white/30">We build the anti-checklist.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.2 }}
            className="max-w-xl space-y-7 font-light text-white/50 text-lg leading-relaxed"
          >
            <p>
              In 2016, Girivah was founded on a singular observation: as the Himalayas became more accessible, the reverence for them disappeared. Tourism had replaced exploration.
            </p>
            <p className="text-white">We decided to do things differently.</p>
            <p>
              We don&apos;t sell vacations. We guide high-intent explorers into the silence of the high passes. It is grueling. It is demanding. And it is entirely transformative.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═ CINEMATIC INTERLUDE ═ */}
      <section className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden mb-48 group">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <motion.div 
            initial={{ scale: 1.1 }} 
            whileInView={{ scale: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 3, ease: APPLE_EASE }} 
            className="absolute inset-0"
          >
            <Image
              src="/hero-mountain.jpg"
              alt="The Standard is the Mountain"
              fill
              priority
              className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center p-6 z-20">
          <blockquote className="font-display text-[clamp(2rem,6vw,6rem)] text-white tracking-tighter opacity-70 uppercase italic text-center">
            &ldquo;The standard is <span className="text-accent not-italic border-b-2 border-accent pb-1">the mountain.</span>&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ═ THE CORE BELIEFS — Apple micro-animated tenets ═ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/20 mb-16">
          Core Principles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/5">
          {BELIEFS.map((belief, i) => (
            <Tenet key={i} belief={belief} index={i} />
          ))}
        </div>
      </section>

      {/* ═ APPLICATION CTA ═ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-48 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-white/20 mb-8">The next step</p>
        <h2 className="font-display text-5xl md:text-7xl text-white mb-12 leading-tight">
          Are you the right person<br />
          <span className="text-white/20">for the mountain?</span>
        </h2>
        <Link href="/expeditions" className="btn-accent px-12 py-5 uppercase tracking-[0.2em] text-[10px] inline-block hover:shadow-[0_0_30px_rgba(255,62,0,0.3)] transition-shadow">
          Request Expedition Dossier
        </Link>
      </section>

    </main>
  )
}
