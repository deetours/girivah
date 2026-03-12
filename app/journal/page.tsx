'use client'

// NEXT STEP 2 (b): The Journal — Rebuilt as a high-end editorial magazine
// Apple Taste Audit audit notes: "Treat it like a high-end editorial magazine (like Sidetracked)"
// Key changes: Removed "Read Time" metrics, grayscale-to-color hero reveals, massive typography,
// accent-line reveals, Apple bezier on every reveal

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const APPLE_EASE = [0.32, 0.72, 0, 1] as const

const FEATURED_ARTICLE = {
  id: 'the-silence-of-spiti',
  title: 'The Silence of Spiti',
  category: 'Field Notes',
  excerpt: 'A meditation on emptiness. We rode 400 kilometers into the high cold desert to understand what happens when the noise finally stops.',
  image: '/hero-mountain.jpg',
  date: 'Oct 2024',
  issue: 'Vol. 01, No. 03',
}

const ARTICLES = [
  {
    id: 'oxygen-deprivation-and-clarity',
    title: 'Oxygen Deprivation & Clarity',
    category: 'Physiology',
    excerpt: 'Above 15,000 feet, the brain begins to slow down. But in that sluggishness, a profound sense of singular focus emerges.',
    date: 'Sep 2024',
  },
  {
    id: 'chadar-trek-equipment',
    title: 'Surviving the Frozen River',
    category: 'Gear Guide',
    excerpt: 'The Chadar trek doesn\'t just test your endurance, it tests your systems. A complete breakdown for -30°C in Zanskar.',
    date: 'Jan 2024',
  },
  {
    id: 'the-art-of-the-motorcycle-expedition',
    title: 'The Art of the Motorcycle Expedition',
    category: 'Philosophy',
    excerpt: 'Why four wheels move the body, but two wheels move the soul. The inherent vulnerability of riding through the roof of the world.',
    date: 'Aug 2024',
  },
  {
    id: 'lamo-the-nammal',
    title: 'Keeper of the High Pass',
    category: 'Interviews',
    excerpt: 'An interview with Namgyal, who has lived above 14,000 feet for sixty-eight years, watching the glaciers recede and the roads appear.',
    date: 'Jul 2024',
  },
]

function ArticleCard({ article, index }: { article: typeof ARTICLES[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: APPLE_EASE, delay: index * 0.06 }}
      className="group cursor-pointer border-t border-white/5 pt-12 relative"
    >
      {/* Accent line reveal on hover */}
      <div className="absolute -top-px left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }} />

      <Link href={`/journal/${article.id}`} className="block">
        <div className="flex justify-between items-center mb-8">
          <span className="text-white/20 text-[9px] tracking-[0.35em] font-sans uppercase">
            {article.category}
          </span>
          <span className="text-white/20 text-[9px] tracking-[0.25em] font-sans uppercase">
            {article.date}
          </span>
        </div>

        <h3 className="font-display text-4xl md:text-5xl text-white leading-[0.95] mb-6 group-hover:text-accent/80 transition-colors duration-500">
          {article.title}
        </h3>

        <p className="font-sans text-base font-light text-white/40 leading-relaxed mb-10 max-w-md group-hover:text-white/60 transition-colors duration-500">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-[9px] tracking-[0.25em] font-sans uppercase text-white/50">
          Read →
        </div>
      </Link>
    </motion.div>
  )
}

export default function JournalPage() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 800], [0, 180])
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])

  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 })

  return (
    <main className="bg-background min-h-screen selection:bg-accent selection:text-white pb-48">

      {/* ═ EDITORIAL HEADER ═ */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto" ref={headerRef}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: APPLE_EASE }}
          className="font-display text-[clamp(5rem,14vw,14rem)] text-white/[0.03] uppercase tracking-tighter leading-none select-none"
        >
          Journal
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.1 }}
          className="flex border-t border-white/10 pt-4 justify-between items-center mt-2"
        >
          <span className="text-[10px] tracking-[0.35em] font-sans uppercase text-white/20">Field Notes & Intelligence</span>
          <span className="text-[10px] tracking-[0.35em] font-sans uppercase text-white/20">{FEATURED_ARTICLE.issue}</span>
        </motion.div>
      </section>

      {/* ═ THE FEATURED PIECE — Full-bleed editorial ═ */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-40">
        <Link href={`/journal/${FEATURED_ARTICLE.id}`} className="block group relative overflow-hidden bg-[#0A0A0A] aspect-[4/3] md:aspect-[21/9]">

          {/* Cinematic scale-from-1.05 reveal */}
          <motion.div
            className="absolute inset-0"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: APPLE_EASE }}
            >
              <Image
                src={FEATURED_ARTICLE.image}
                alt={FEATURED_ARTICLE.title}
                fill
                priority
                className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-1200"
              />
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent z-10" />

          {/* Pull content */}
          <div className="absolute inset-0 p-4 sm:p-8 md:p-16 flex flex-col justify-end text-left z-20">
            <div className="flex gap-4 items-center mb-8">
              <span className="text-accent text-[9px] tracking-[0.35em] font-sans uppercase border border-accent/30 px-3 py-1 bg-accent/5">
                {FEATURED_ARTICLE.category}
              </span>
              <span className="text-white/30 text-[9px] tracking-[0.3em] font-sans uppercase">
                {FEATURED_ARTICLE.date}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[7rem] text-white leading-[0.85] mb-8 md:w-3/4 group-hover:text-accent transition-colors duration-700">
              {FEATURED_ARTICLE.title}
            </h2>
            <p className="font-sans text-base sm:text-xl md:text-2xl font-light text-white/60 max-w-2xl leading-snug mb-6">
              {FEATURED_ARTICLE.excerpt}
            </p>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-white/30 font-sans uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Read the Dispatch <ArrowUpRight size={12} />
            </div>
          </div>
        </Link>
      </section>

      {/* ═ EDITORIAL GRID — massive type, zero clutter ═ */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
          {ARTICLES.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </section>

    </main>
  )
}
