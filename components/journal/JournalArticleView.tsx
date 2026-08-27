'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'
import { JournalArticle } from '@/lib/data/journal'

export function JournalArticleView({ article }: { article: JournalArticle }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <main className="bg-[#050505] min-h-screen selection:bg-accent selection:text-white pb-32">

      {/* ═ READING PROGRESS ═ */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      {/* ═ THE HEADER / TITLE ═ */}
      <section className="pt-40 px-6 md:px-12 max-w-[1400px] mx-auto mb-24">
        <Link href="/journal" className="inline-flex items-center gap-4 text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 hover:text-white transition-colors duration-300 mb-16">
          <ArrowLeft size={14} /> Back to Journal
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          <div className="md:col-span-8">
            <h1 className="font-display text-[clamp(3.5rem,8vw,8rem)] text-white leading-[0.9] mb-12">
              {article.title}
            </h1>
            <p className="font-sans text-xl md:text-3xl font-light text-white/70 max-w-3xl leading-snug">
              {article.excerpt}
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end gap-8 pb-4 border-l border-white/10 pl-8">
            <div>
              <span className="block text-[10px] tracking-[0.3em] font-sans uppercase text-white/30 mb-2">Category</span>
              <span className="text-white text-sm font-sans uppercase tracking-[0.2em]">{article.category}</span>
            </div>
            <div>
              <span className="block text-[10px] tracking-[0.3em] font-sans uppercase text-white/30 mb-2">Transmission By</span>
              <span className="text-white text-sm font-sans uppercase tracking-[0.2em]">{article.author}</span>
            </div>
            <div>
              <span className="block text-[10px] tracking-[0.3em] font-sans uppercase text-white/30 mb-2">Duration</span>
              <span className="text-white text-sm font-sans uppercase tracking-[0.2em] flex items-center gap-2"><Clock size={12} className="text-accent" /> {article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═ CINEMATIC INTERLUDE HERO ═ */}
      <section className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden mb-32 group">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 15, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Image src={article.image} alt={article.title} fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" />
        </motion.div>
        {/* Gradient bleed into article body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ═ THE EDITORIAL CONTENT ═ */}
      <article className="max-w-[750px] mx-auto px-6 font-sans text-white/70 leading-relaxed space-y-12">
        {article.body.map((paragraph, i) => {
          if (i === 0) {
            return (
              <p key={i} className="text-xl md:text-2xl font-light text-white leading-loose first-letter:text-6xl first-letter:font-display first-letter:mr-3 first-letter:float-left first-letter:text-accent">
                {paragraph}
              </p>
            )
          }
          // Drop the pull quote in after the middle paragraph for rhythm
          if (i === Math.floor(article.body.length / 2)) {
            return (
              <React.Fragment key={i}>
                <blockquote className="border-l border-accent/50 pl-8 md:pl-12 py-6 my-16 ml-[-2rem] md:ml-[-3rem] text-2xl md:text-4xl font-display text-white/90 leading-snug">
                  "{article.pullQuote}"
                </blockquote>
                <p className="text-lg md:text-xl font-light leading-loose">{paragraph}</p>
              </React.Fragment>
            )
          }
          return (
            <p key={i} className="text-lg md:text-xl font-light leading-loose">
              {paragraph}
            </p>
          )
        })}

        <div className="pt-24 pb-8 flex justify-center">
          <div className="w-16 h-px bg-accent/50" />
        </div>
      </article>

      {/* ═ FOOTER AUTHOR META ═ */}
      <div className="max-w-[750px] mx-auto px-6 pt-16 border-t border-white/5 flex flex-col md:flex-row gap-12 items-start md:items-center group">
        <div className="w-24 h-24 rounded-full bg-[#111] border border-white/10 flex-shrink-0 relative overflow-hidden">
          <Image src={article.authorImage} fill alt={article.author} className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
        </div>
        <div>
          <h4 className="font-display text-3xl text-white mb-2">{article.author}</h4>
          <p className="text-[10px] uppercase font-sans tracking-[0.3em] text-accent mb-4">{article.authorTitle}</p>
          <p className="font-sans text-white/50 font-light leading-relaxed max-w-sm text-sm">
            {article.authorBio}
          </p>
        </div>
      </div>

    </main>
  )
}
