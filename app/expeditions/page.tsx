'use client'

// MANEUVER 3: Apple-grade physics throughout
// MANEUVER 4: Narrative Inversion — Technical Specs first, Price is secondary
// MANEUVER 4: "Apply Now" / "View Expedition" language — no "Book Now" anywhere

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowUpRight, Triangle } from 'lucide-react'

// MANEUVER 3: Apple-grade bezier — used for all motion
const APPLE_EASE = [0.32, 0.72, 0, 1] as const

// MANEUVER 4: Expedition data rebuilt with Technical Specs as primary anchor
const ALL_EXPEDITIONS = [
  {
    id: '1',
    title: 'Ladakh High Pass',
    type: 'Motorcycle',
    difficulty: 'Advanced',
    duration: '14 Days',
    maxElevation: '18,380 ft',
    spotsLeft: 3,
    status: 'Open',
    season: 'Jun — Sep',
    price: '₹ 45,000',
    tags: ['Khardung La', 'Pangong Tso', 'Zanskar'],
    image: '/exp-ladakh.jpg',
    featured: true,
  },
  {
    id: '2',
    title: 'Spiti Circuit',
    type: '4×4 Overland',
    difficulty: 'Moderate',
    duration: '10 Days',
    maxElevation: '15,059 ft',
    spotsLeft: 5,
    status: 'Open',
    season: 'May — Oct',
    price: '₹ 55,000',
    tags: ['Kunzum La', 'Key Monastery', 'Pin Valley'],
    image: '/exp-spiti.jpg',
    featured: false,
  },
  {
    id: '3',
    title: 'Chadar Trek',
    type: 'High-Altitude',
    difficulty: 'Expert',
    duration: '9 Days',
    maxElevation: '11,250 ft',
    spotsLeft: 1,
    status: 'Last Spot',
    season: 'Jan — Feb',
    price: '₹ 38,000',
    tags: ['Frozen River', 'Extreme Cold', 'Survival'],
    image: '/exp-ladakh.jpg', // Placeholder until exp-chadar.jpg is available
    featured: true,
  },
]

const FILTERS = ['All', 'Motorcycle', '4×4 Overland', 'High-Altitude']

export default function ExpeditionsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredExpeditions = ALL_EXPEDITIONS.filter((exp) =>
    activeFilter === 'All' ? true : exp.type === activeFilter
  )

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <main className="bg-background min-h-[100vh] selection:bg-accent selection:text-white pb-40">
      
      {/* ═ HERO ═ */}
      <section ref={heroRef} className="relative h-[65vh] w-full overflow-hidden bg-[#050505]">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.05 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src="/hero-mountain.jpg"
              alt="The Expeditions"
              fill
              priority
              className="object-cover opacity-40 grayscale"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.2 }}
            className="text-[10px] tracking-[0.3em] font-sans text-accent uppercase mb-4"
          >
            Curated Routes
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.3 }}
            className="font-display text-[clamp(4rem,10vw,10rem)] leading-[0.85] tracking-tighter text-white uppercase mix-blend-overlay opacity-90"
          >
            The<br />
            <span className="text-accent/80 mix-blend-normal relative">
              Expeditions.
              <span className="absolute inset-0 blur-xl bg-accent opacity-10" />
            </span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* ═ Filter Bar ═ */}
        <div className="sticky top-[64px] z-30 bg-[#050505]/90 backdrop-blur-xl py-5 mt-4 mb-20 -mx-6 px-6 md:mx-0 md:px-0 border-b border-white/5">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`flex-shrink-0 px-7 py-3 border transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.2em]
                  ${activeFilter === f
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ═ Editorial Grid ═ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-32">
          <AnimatePresence mode="popLayout">
            {filteredExpeditions.map((exp, idx) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                // MANEUVER 3: Apple bezier on all card reveals
                transition={{ duration: 0.6, ease: APPLE_EASE, delay: idx * 0.07 }}
                className={`group cursor-pointer ${exp.featured ? 'md:col-span-2' : ''}`}
              >
                <Link href={`/expeditions/${exp.id}`} className="block">

                  {/* Image Container */}
                  <div className={`relative overflow-hidden w-full bg-secondary mb-8 ${exp.featured ? 'aspect-[4/3] md:aspect-[2.5/1]' : 'aspect-[4/5] md:aspect-square'}`}>
                    <motion.div
                      className="absolute inset-0"
                      // MANEUVER 3: Scale-from-1.08 cinematic image reveal
                      initial={{ scale: 1.08 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1.5, ease: APPLE_EASE }}
                    >
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        priority={idx === 0}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70 z-20" />

                    {/* MANEUVER 4: Status badge — scarcity signal */}
                    <div className="absolute top-6 left-6 z-30 flex gap-2 items-center">
                      <span className={`px-3 py-1.5 text-[10px] uppercase tracking-widest font-sans border ${exp.spotsLeft <= 2
                          ? 'bg-accent/20 border-accent/60 text-accent'
                          : 'bg-black/40 backdrop-blur-md border-white/10 text-white'
                        }`}>
                        {exp.spotsLeft <= 1 ? '⚠ Last Spot' : `${exp.spotsLeft} Spots Left`}
                      </span>
                    </div>

                    {/* Expand CTA */}
                    <div className="absolute bottom-8 right-8 z-30 flex items-center justify-center w-14 h-14 bg-white text-black opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  {/* MANEUVER 4: Technical Specs as Primary Anchor */}
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      {/* Technical Meta-layer */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-5 pb-4 border-b border-white/5">
                        <span className="text-white/70">{exp.type}</span>
                        <span className="flex items-center gap-1.5">
                          <Triangle size={7} className="fill-white/30 stroke-none" />
                          {exp.maxElevation}
                        </span>
                        <span>{exp.duration}</span>
                        <span>{exp.season}</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-display text-white group-hover:text-accent transition-colors duration-500">
                        {exp.title}
                      </h2>
                    </div>

                    {/* MANEUVER 4: Price is secondary, relegated to small label */}
                    <div className="md:text-right pt-1 md:pt-0 shrink-0">
                      <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-white/30 mb-1">From</span>
                      <span className="font-display text-xl text-white/60">{exp.price}</span>
                      <div className="mt-4 text-[10px] uppercase tracking-[0.2em] font-sans text-accent border-b border-accent/30 pb-0.5 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Apply Now →
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </main>
  )
}
