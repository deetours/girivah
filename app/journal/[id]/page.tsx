'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'

// Mock Data
const article = {
    title: 'The Silence of Spiti',
    category: 'Field Notes',
    readTime: '8 Min Read',
    author: 'Arjun Mehta',
    date: 'OCT 12, 2024',
    excerpt: 'A meditation on emptiness. We rode 400 kilometers into the high cold desert to understand what happens when the noise finally stops.',
}

const APPLE_EASE = [0.32, 0.72, 0, 1] as const

export default function JournalArticle() {
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
                     <Image src="/exp-spiti.jpg" alt="Spiti Void" fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" />
                 </motion.div>
                 {/* Gradient bleed into article body */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                 <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
            </section>

            {/* ═ THE EDITORIAL CONTENT ═ */}
            <article className="max-w-[750px] mx-auto px-6 font-sans text-white/70 leading-relaxed space-y-12">
                <p className="text-xl md:text-2xl font-light text-white leading-loose first-letter:text-6xl first-letter:font-display first-letter:mr-3 first-letter:float-left first-letter:text-accent">
                    We left Kaza entirely before dawn, not because the itinerary demanded it, but because the cold made sleeping impossible anyway. The high desert strips you bare. Up here, every unnecessary thought freezes and cracks away.
                </p>

                <p className="text-lg md:text-xl font-light leading-loose">
                    Entering the Spiti valley, the landscape resembles less a place on Earth and more a transmission from Mars. The silence is profound—not just an absence of noise, but a heavy, physical presence that presses against your eardrums.
                </p>

                <h2 className="font-display text-3xl md:text-5xl text-white pt-12 pb-6 border-b border-white/10 mb-8 mt-16">
                    The Weight of Emptiness.
                </h2>

                <p className="text-lg md:text-xl font-light leading-loose">
                    In our connected lives, silence is terrifying. We construct elaborate mechanisms to avoid it: podcasts on the commute, music in the shower, notifications vibrating against our thighs. We are terrified of the void because the void forces us to look inward.
                </p>

                <p className="text-lg md:text-xl font-light leading-loose">
                    But here, sitting beside the churning gray waters of the Spiti River, surrounded by thousand-foot cliffs of crumbling shale, the void is inescapable. At first, it induces a low-grade panic. You check for a signal (there is none). You reach for the radio (static). You look at your companions—they are staring at the ridgeline, silent.
                </p>

                <blockquote className="border-l border-accent/50 pl-8 md:pl-12 py-6 my-16 ml-[-2rem] md:ml-[-3rem] text-2xl md:text-4xl font-display text-white/90 leading-snug">
                    "The mountains do not care about your ambition, your schedule, or your anxiety. They simply exist, and in their presence, you must do the same."
                </blockquote>

                <p className="text-lg md:text-xl font-light leading-loose">
                    And then, eventually, the panic breaks. The constant narrational hum in your mind finally burns out. It takes three days at altitude to reach this state. By day four, the silence stops being a void and starts being a medium—a clear, cold fluid in which every thought, observation, and movement becomes incredibly sharp.
                </p>

                <p className="text-lg md:text-xl font-light leading-loose">
                    This is exactly why we mandate no internet access. To hand you a connection to the outside world in the middle of Spiti would be to abort the very process you traveled here for. The silence is not a feature of the itinerary; it is the entire point.
                </p>

                <div className="pt-24 pb-8 flex justify-center">
                   <div className="w-16 h-px bg-accent/50" />
                </div>
            </article>

            {/* ═ FOOTER AUTHOR META ═ */}
            <div className="max-w-[750px] mx-auto px-6 pt-16 border-t border-white/5 flex flex-col md:flex-row gap-12 items-start md:items-center group">
                 <div className="w-24 h-24 rounded-full bg-[#111] border border-white/10 flex-shrink-0 relative overflow-hidden">
                    <Image src="/hero-cinematic.jpg" fill alt="Arjun Mehta" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                 </div>
                 <div>
                     <h4 className="font-display text-3xl text-white mb-2">{article.author}</h4>
                     <p className="text-[10px] uppercase font-sans tracking-[0.3em] text-accent mb-4">Lead Expedition Controller</p>
                     <p className="font-sans text-white/50 font-light leading-relaxed max-w-sm text-sm">
                         UIAGM Certified lead guide. Specializes in overland traverses across Zanskar and Lahaul-Spiti regions. Oversees all protocol decisions.
                     </p>
                 </div>
            </div>

        </main>
    )
}
