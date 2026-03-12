'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion'
import { ArrowRight, ChevronDown, Triangle } from 'lucide-react'

// MANEUVER 3: Apple-grade bezier — the physics of inevitability
const APPLE_EASE = [0.32, 0.72, 0, 1] as const

// MANEUVER 4: Expedition data rebuilt — Technical Specs first, Price secondary
const expeditions = [
  { id: 1, title: 'Ladakh High Pass', type: 'Motorcycle', elevation: '18,380 ft', duration: '14 Days', spotsLeft: 3, image: '/exp-ladakh.jpg' },
  { id: 2, title: 'Spiti Circuit', type: '4×4 Overland', elevation: '15,059 ft', duration: '10 Days', spotsLeft: 5, image: '/exp-spiti.jpg' },
  { id: 3, title: 'Chadar Trek', type: 'High-Altitude', elevation: '11,250 ft', duration: '9 Days', spotsLeft: 1, image: '/exp-ladakh.jpg' },
]

// MANEUVER 3: True cursor-tracking magnetic button with spring physics
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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Act 1 Parallax
  const act1Y = useTransform(scrollYProgress, [0, 0.2], ["0%", "15%"]) // Reduced for natural feel
  const act1Opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <main ref={containerRef} className="bg-background text-foreground selection:bg-accent selection:text-white">

      {/* ═ ACT 1: ARRIVAL (Full Hero Takeover) ═ */}
      <section className="relative h-screen w-full flex flex-col justify-end overflow-hidden pb-12 md:pb-24 px-6 md:px-12 bg-[#050505]">
        {/* Cinematic Imagery */}
        <motion.div
          style={{ y: act1Y, opacity: act1Opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/hero-cinematic.jpg"
            alt="Himalayan Expedition"
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: act1Opacity }} className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <p className="font-sans text-xs tracking-[0.4em] text-white/50 uppercase">
              The Keepers of the High Passes
            </p>
            <h1 className="font-display tracking-tight text-white leading-[0.85] uppercase">
              Beyond<br />
              <span className="text-accent">The Map.</span>
            </h1>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute bottom-12 right-12 z-10 text-white/30 hidden md:flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] rotate-90 origin-right translate-x-6">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mt-8"
          >
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═ ACT 2: RECOGNITION (The Philosophy) ═ */}
      <section className="py-48 md:py-64 px-6 md:px-12 bg-background relative z-20">
        <div className="max-w-[1400px] mx-auto">
          <GridRevealText />
        </div>
      </section>

      {/* ═ ACT 3: THE BENDING GRID (Expeditions) ═ */}
      <section className="py-32 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">The Routes</p>
            <h2 className="font-display text-primary">Uncompromising<br />Journeys.</h2>
          </div>
          <Link href="/expeditions" className="btn-ghost pb-0 md:pb-4 border-none hover:text-accent">
            View All Routes <ArrowRight size={14} className="inline ml-2" />
          </Link>
        </div>

        {/* MANEUVER 3+4: Scrollable Expedition Posters — spec-first, Apple bezier */}
        <div className="flex gap-5 overflow-x-auto pb-20 px-6 md:px-12 snap-x snap-mandatory hide-scrollbar">
          {expeditions.map((exp, i) => (
            <Link href={`/expeditions/${exp.id}`} key={exp.id}
              className="min-w-[85vw] md:min-w-[42vw] lg:min-w-[28vw] aspect-[3/4] snap-center relative overflow-hidden group cursor-pointer flex-shrink-0 block"
            >
              {/* MANEUVER 3: Cinematic scale-from-1.08 reveal */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.4, ease: APPLE_EASE, delay: i * 0.06 }}
              >
                <Image src={exp.image} alt={exp.title} fill className="object-cover" sizes="33vw" />
              </motion.div>
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

              {/* Spot scarcity badge */}
              {exp.spotsLeft <= 2 && (
                <div className="absolute top-5 left-5 z-20 px-3 py-1 bg-accent/20 border border-accent/50 text-accent text-[9px] uppercase tracking-widest font-sans">
                  {exp.spotsLeft === 1 ? '⚠ Last Spot' : `${exp.spotsLeft} Spots`}
                </div>
              )}

              {/* MANEUVER 4: Technical specs as content anchor */}
              <div className="absolute inset-0 p-7 flex flex-col justify-end z-10">
                <div className="flex items-center gap-3 font-sans text-[9px] tracking-[0.25em] uppercase text-white/40 mb-3">
                  <span>{exp.type}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Triangle size={6} className="fill-white/30 stroke-none" />{exp.elevation}</span>
                  <span>·</span>
                  <span>{exp.duration}</span>
                </div>
                <h3 className="font-display text-white text-3xl md:text-4xl mb-4 group-hover:text-accent transition-colors duration-500">{exp.title}</h3>
                <div className="h-px w-0 bg-accent group-hover:w-full transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }} />
                <span className="mt-3 text-[9px] uppercase tracking-[0.25em] text-white/0 group-hover:text-white/60 transition-colors duration-500 font-sans">Apply Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═ ACT 4: PROOF (Trust Signals) ═ */}
      <section className="py-40 bg-background border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
            {[
              { stat: '4.98', label: 'Average Rating' },
              { stat: 'UIAGM', label: 'Certified Guides' },
              { stat: '39', label: 'Curated Routes' },
              { stat: 'Zero', label: 'Compromises' },
            ].map((s, i) => (
              <div key={i} className="space-y-4">
                <p className="font-display text-6xl md:text-8xl text-accent/20 font-bold">{s.stat}</p>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═ ACT 5: THE RESOLUTION (Conversion) ═ */}
      <section className="relative py-48 md:py-64 bg-background overflow-hidden flex items-center justify-center">
        {/* Subtle Accent Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] aspect-square bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <h2 className="font-display text-white mb-12">
            The mountains are waiting.<br />
            <span className="text-accent text-3xl md:text-5xl mt-6 block">Will you answer?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <MagneticButton href="/expeditions">
              View Expeditions
            </MagneticButton>
            <Link href="/contact" className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors py-4">
              Speak to a Guide
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}

// Sub-component for scroll-revealed text in Act 2
function GridRevealText() {
  const textRef = useRef(null)
  const isInView = useInView(textRef, { once: false, margin: "-20%" })

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
      <div className="md:col-span-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">The Philosophy</p>
      </div>
      <div className="md:col-span-8">
        <motion.p
          ref={textRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-2xl md:text-5xl font-light text-muted-foreground leading-snug tracking-tight"
        >
          We don't sell vacations. We guide high-intent explorers into the silence of the Himalayas.
          <span className="text-white"> No checklists. No crowds. Just absolute transformation.</span>
        </motion.p>
      </div>
    </div>
  )
}
