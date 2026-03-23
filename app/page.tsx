'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { ArrowRight, ChevronDown, Triangle } from 'lucide-react'

// Core physics token
const APPLE_EASE = [0.32, 0.72, 0, 1] as const

// Data
const expeditions = [
  { id: '1', title: 'Ladakh High Pass', type: 'Motorcycle', elevation: '18,380 ft', duration: '14 Days', spotsLeft: 3, image: '/exp-ladakh.jpg', departs: '23 Days' },
  { id: '2', title: 'Spiti Circuit', type: '4×4 Overland', elevation: '15,059 ft', duration: '10 Days', spotsLeft: 5, image: '/exp-spiti.jpg', departs: '45 Days' },
  { id: '3', title: 'Chadar Trek', type: 'High-Altitude', elevation: '11,250 ft', duration: '9 Days', spotsLeft: 1, image: '/exp-ladakh.jpg', departs: '12 Days' },
]

// The philosophy text for Scene 2
const PHILOSOPHY_WORDS = "We don't sell vacations. We guide high-intent explorers into the silence of the Himalayas. No checklists. No crowds. Just absolute transformation.".split(" ")

// ═ COMPONENT: Magnetic Button ═
const MagneticButton = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={href} className="btn-accent relative overflow-hidden group inline-flex items-center gap-3">
        {children}
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <ArrowRight size={14} />
        </motion.span>
      </Link>
    </motion.div>
  )
}

// ═ SCENE 2: The First Breath (Word by word reveal) ═
function FirstBreathScene() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-background z-20">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-12 max-w-[1200px] mx-auto">
        <h2 className="font-sans text-2xl md:text-5xl font-light leading-snug tracking-tight text-center flex flex-wrap justify-center gap-[0.25em]">
          {PHILOSOPHY_WORDS.map((word, i) => {
            const start = i / PHILOSOPHY_WORDS.length
            const end = start + (1 / PHILOSOPHY_WORDS.length)
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])
            return (
              <motion.span key={i} style={{ opacity }} className="text-white">
                {word}
              </motion.span>
            )
          })}
        </h2>
      </div>
    </section>
  )
}

// ═ SCENE 3: Call of Adventure (Horizontal Parallax Gallery) ═
function AdventureGalleryScene() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // 3 images moving horizontally at different rates
  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])
  const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])

  return (
    <section ref={containerRef} className="py-40 bg-[#050505] relative overflow-hidden z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-32">
        {/* Image 1 */}
        <motion.div style={{ x: x1 }} className="relative w-[80vw] md:w-[50vw] aspect-[16/9] ml-auto">
          <Image src="/hero-cinematic.jpg" alt="Expedition Visual" fill className="object-cover opacity-80" />
          <p className="absolute -left-12 top-12 font-sans text-xs tracking-[0.3em] uppercase text-white/50 rotate-90 origin-left">01. The Ascent</p>
        </motion.div>
        
        {/* Image 2 */}
        <motion.div style={{ x: x2 }} className="relative w-[85vw] md:w-[60vw] aspect-[21/9]">
          <Image src="/exp-spiti.jpg" alt="Expedition Visual" fill className="object-cover opacity-80" />
          <p className="absolute -right-12 bottom-12 font-sans text-xs tracking-[0.3em] uppercase text-white/50 rotate-90 origin-right">02. The Vastness</p>
        </motion.div>

        {/* Image 3 */}
        <motion.div style={{ x: x3 }} className="relative w-[70vw] md:w-[45vw] aspect-[4/3] mx-auto">
          <Image src="/exp-ladakh.jpg" alt="Expedition Visual" fill className="object-cover opacity-80" />
          <p className="absolute -left-12 bottom-12 font-sans text-xs tracking-[0.3em] uppercase text-white/50 -rotate-90 origin-left">03. The Silence</p>
        </motion.div>
      </div>
    </section>
  )
}

// ═ SCENE 7: Authority Signal (Sequential Stats) ═
function AuthoritySignalScene() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const stats = [
    { value: '0', label: 'Evacuations in 14 years' },
    { value: '4.98', label: 'Rating from 127 riders' },
    { value: 'UIAGM', label: 'Certified lead guides' },
    { value: '8', label: 'Max riders per route' }
  ]

  // Map scroll progress to the active stat index
  const activeIndexRaw = useTransform(scrollYProgress, [0, 1], [0, stats.length])
  const [activeIndex, setActiveIndex] = useState(0)

  // Listen to raw value and floor it
  useMotionValueEvent(activeIndexRaw, "change", (latest) => {
    setActiveIndex(Math.min(Math.floor(latest), stats.length - 1))
  })

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-background z-20">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <Triangle size={800} strokeWidth={0.5} />
        </div>
        
        <p className="section-label mb-12 relative z-10">The Standard</p>
        
        <div className="relative min-h-[350px] md:min-h-[500px] w-full flex items-center justify-center z-10">
          {stats.map((stat, i) => {
            const isActive = i === activeIndex
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ 
                  opacity: isActive ? 1 : 0, 
                  y: isActive ? 0 : (i < activeIndex ? -50 : 50),
                  scale: isActive ? 1 : 0.9
                }}
                transition={{ duration: 0.6, ease: APPLE_EASE }}
                className="absolute text-center"
              >
                <div className="font-display text-[clamp(6rem,15vw,15rem)] leading-none text-white tracking-tighter mix-blend-difference mb-4">
                  {stat.value}
                </div>
                <div className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-accent/80">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ═ MAIN HOMEPAGE COMPONENT ═
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"] // Fades out as it leaves screen
  })

  // Scene 1 Parallax & Fade
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0])

  return (
    <main className="bg-background text-foreground selection:bg-accent selection:text-white">

      {/* ═ SCENE 1: ARRIVAL (Ambient Hero) ═ */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          {/* Simulated video background with scale animation */}
          <motion.div 
            initial={{ scale: 1.1 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src="/hero-cinematic.jpg"
              alt="Himalayan Expedition"
              fill
              priority
              className="object-cover opacity-50 grayscale mix-blend-luminosity"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#050505]/20" /> {/* Dimmer */}
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }} 
          className="relative z-10 w-full h-full flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 max-w-[1400px] mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.5 }} // Delayed mount
            className="flex flex-col gap-6"
          >
            <p className="font-sans text-[10px] tracking-[0.4em] text-white/50 uppercase flex items-center gap-4">
              <span className="w-8 h-px bg-accent/50 block" />
              The Keepers of the High Passes
            </p>
            <h1 className="font-display text-[clamp(4.5rem,14vw,14rem)] tracking-tighter text-white leading-[0.8] uppercase mix-blend-overlay opacity-90 pb-2">
              Beyond<br />
              <span className="text-accent/80 mix-blend-normal relative">
                The Map.
                {/* Subtle bleed glow effect on accent */}
                <span className="absolute inset-0 blur-2xl bg-accent opacity-20" />
              </span>
            </h1>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="absolute bottom-12 right-6 md:right-12 z-20 text-white/30 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] rotate-90 origin-right translate-x-3">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="mt-8">
            <ChevronDown size={12} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═ SCENE 2: THE FIRST BREATH ═ */}
      <FirstBreathScene />

      {/* ═ SCENE 3: CALL OF ADVENTURE ═ */}
      <AdventureGalleryScene />

      {/* ═ SCENE 4: THE ROUTES (Center-locked carousel) ═ */}
      <section className="py-32 md:py-48 bg-secondary overflow-hidden z-20 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-accent/50 block" /> Our Territories
            </p>
            <h2 className="font-display text-white text-5xl md:text-7xl leading-[0.9]">Select Your<br/>Pursuit.</h2>
          </div>
        </div>

        {/* The Carousel */}
        <div className="flex gap-6 overflow-x-auto pb-20 px-6 md:px-[20vw] snap-x snap-mandatory hide-scrollbar items-center">
          {expeditions.map((exp, i) => (
            <Link href={`/expeditions/${exp.id}`} key={exp.id} className="w-[85vw] md:w-[35vw] flex-shrink-0 snap-center group relative block">
              <div className="aspect-[4/5] relative overflow-hidden bg-[#0A0A0A] transition-transform duration-700 group-hover:scale-[1.02]">
                <Image src={exp.image} alt={exp.title} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0" sizes="(max-width: 768px) 85vw, 35vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Live Departure Countdown Badge */}
                <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white/80 text-[9px] uppercase tracking-widest font-sans">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  Departs in {exp.departs}
                </div>

                {/* Technical Anchors */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="flex items-center gap-3 font-sans text-[9px] tracking-[0.25em] uppercase text-white/50 mb-4 pb-4 border-b border-white/10">
                    <span className="flex items-center gap-1.5 text-accent"><Triangle size={6} className="fill-accent stroke-none" />{exp.elevation}</span>
                    <span>·</span>
                    <span>{exp.type}</span>
                    <span>·</span>
                    <span>{exp.duration}</span>
                  </div>
                  <h3 className="font-display text-white text-4xl mb-4 group-hover:text-accent transition-colors duration-500 leading-none">{exp.title}</h3>
                  <div className="flex justify-between items-center opacity-0 -translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/80 font-sans">View Dossier</span>
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═ SCENE 5: THE DISPATCH (Traveler Story Split) ═ */}
      <section className="h-[100vh] min-h-[800px] w-full bg-background flex flex-col md:flex-row relative z-20">
        <div className="w-full md:w-[55%] h-[50vh] md:h-full relative overflow-hidden group">
          <motion.div initial={{ scale: 1.05 }} whileInView={{ scale: 1 }} transition={{ duration: 1.5, ease: APPLE_EASE }} viewport={{ once: true }} className="w-full h-full">
            <Image src="/hero-mountain.jpg" alt="Traveler" fill className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
          </motion.div>
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="w-full md:w-[45%] h-[50vh] md:h-full flex items-center justify-center p-8 md:p-24 bg-[#0A0A0A]">
          <div className="max-w-md space-y-12">
            <Triangle size={16} className="text-accent/30 hidden md:block" />
            <blockquote className="font-sans text-xl md:text-3xl font-light text-white/80 leading-relaxed italic tracking-tight">
              "I went to prove I could handle it. Somewhere around Day 8, in the silence of the Zanskar valley, I stopped trying to prove anything."
            </blockquote>
            <div className="pt-8 border-t border-white/10">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50 mb-2">— Priya Nair</p>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-accent/60">Ladakh High Pass · August 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═ SCENE 6: THE PHILOSOPHY (Numbered Manifesto) ═ */}
      <section className="py-40 bg-background max-w-[1400px] mx-auto px-6 md:px-12 relative z-20">
        <p className="section-label mb-24">Our Convictions</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-32 gap-x-24">
          {[
            { num: '01', title: 'Friction is Necessary', desc: 'Comfort guarantees a forgettable experience. We engineer friction into every itinerary because transformation only happens when you are challenged.' },
            { num: '02', title: 'Silence Over Scale', desc: 'We do not run massive convoys. Maximum 8 people per expedition. The mountains belong to the quiet.' },
            { num: '03', title: 'Uncompromising Safety', desc: 'We take you to entirely unforgiving environments. Our logistics, vehicles, and medical training reflect the gravity of that responsibility.' },
            { num: '04', title: 'No Appended Experiences', desc: 'No tourist traps. No superficial ceremonies. If it does not serve the raw experience of the Himalayas, we cut it.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: APPLE_EASE, delay: (i % 2) * 0.1 }}
              className="relative pl-12 md:pl-0 border-t border-white/5 md:border-none pt-8 md:pt-0"
            >
              <span className="absolute left-0 top-8 md:-top-16 font-display text-4xl md:text-8xl text-white/5 md:text-white/10 tracking-tighter mix-blend-difference select-none">{item.num}</span>
              <h3 className="font-display text-3xl md:text-4xl text-white mb-6 relative z-10">{item.title}</h3>
              <p className="font-sans text-base text-white/40 font-light leading-relaxed max-w-sm relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═ SCENE 7: AUTHORITY SIGNAL (Sequential Stats) ═ */}
      <AuthoritySignalScene />

      {/* ═ SCENE 8: THE GUIDE ═ */}
      <section className="py-32 bg-[#0A0A0A] border-y border-white/5 relative z-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-1/2 aspect-square md:aspect-[4/5] relative overflow-hidden bg-[#111]">
            <Image src="/exp-spiti.jpg" alt="Guidance" fill className="object-cover grayscale opacity-70" />
            <div className="absolute inset-0 bg-black/20" />
            {/* Corner brackets */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/30" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/30" />
            <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-accent/80" />
          </div>
          <div className="w-full md:w-1/2 md:pl-12">
            <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-accent mb-8">The Human Element</p>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6">Arjun Mehta.</h2>
            <p className="font-sans text-xl text-white/60 mb-2 font-light tracking-tight">Lead Expedition Controller</p>
            <div className="flex gap-4 mb-12 border-b border-white/10 pb-6">
              <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-white/30">14 Years Active</span>
              <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-accent/60">UIAGM Certified</span>
            </div>
            <p className="font-sans text-lg font-light text-white/50 leading-relaxed mb-10 max-w-md">
              "When things go wrong at 17,000 feet, you don't rise to the occasion. You fall to the level of your training. That's why we train harder than anyone else."
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.2em] text-white/80 hover:text-accent transition-colors pb-1 border-b border-white/20 hover:border-accent">
              Speak with Arjun <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═ SCENE 9: THE INVITATION (Earned CTA) ═ */}
      <section className="relative py-48 md:py-64 bg-background overflow-hidden flex items-center justify-center z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[600px] aspect-square bg-accent/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-[10px] uppercase font-sans tracking-[0.4em] text-white/30 mb-8">Your Move</p>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-16 leading-[1.1]">
            You've seen the routes.<br/>
            You've read the dispatches.<br/>
            <span className="text-accent italic font-light">The next step is yours.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <MagneticButton href="/expeditions">
              Find Your Route
            </MagneticButton>
            <Link href="/contact" className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1">
              Speak to the Guide
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
