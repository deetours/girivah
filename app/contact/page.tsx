'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'

// Contact Actions
const actions = [
  {
    title: 'Initial Consultation',
    desc: 'Speak directly with our UIAGM certified Lead Guide to discuss route viability and skill requirements.',
    label: 'Call Operations',
    info: '+91 98765 43210',
    icon: Phone,
    href: 'tel:+919876543210',
    color: 'hover:text-amber-500 hover:border-amber-500/50',
  },
  {
    title: 'Custom Expeditions',
    desc: 'Bespoke route planning for private groups. Detailed logistical planning taking 48-72 hours.',
    label: 'Email Planning Team',
    info: 'expeditions@girivah.com',
    icon: Mail,
    href: 'mailto:expeditions@girivah.com',
    color: 'hover:text-accent hover:border-accent/50',
  },
  {
    title: 'Immediate Intel',
    desc: 'Current weather condition reports, road closures, and immediate mission updates.',
    label: 'WhatsApp Support',
    info: 'Message the Basecamp',
    icon: MessageCircle,
    href: 'https://wa.me/919876543210',
    color: 'hover:text-emerald-500 hover:border-emerald-500/50',
  },
]

const APPLE_EASE = [0.32, 0.72, 0, 1] as const

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen">
      
      {/* ═ CINEMATIC HERO INTERLUDE ═ */}
      <section className="relative h-[60vh] w-full overflow-hidden bg-[#050505]">
        <motion.div 
          initial={{ scale: 1.05 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 1.5, ease: APPLE_EASE }}
          className="absolute inset-0"
        >
          <Image 
            src="/hero-mountain.jpg" 
            alt="Basecamp Operations" 
            fill 
            priority
            className="object-cover opacity-50 grayscale mix-blend-luminosity" 
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute bottom-16 left-6 md:left-12 z-20 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-[10px] tracking-[0.4em] font-sans text-white/50 uppercase mb-6 flex items-center gap-4"
          >
            <span className="w-8 h-px bg-accent/50 block" /> Basecamp Comms
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white font-display text-[clamp(4rem,10vw,10rem)] leading-[0.85] tracking-tight"
          >
            Direct <span className="text-accent/60 italic font-light">Line.</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">

        {/* ═ THE GUIDE INTRODUCTION ═ */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="mb-24 md:mb-32 flex flex-col md:flex-row items-center gap-12 border border-white/5 bg-[#0A0A0A] p-8 md:p-16 rounded-xl relative overflow-hidden group"
        >
          {/* Subtle noise backdrop */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,rgba(255,62,0,0.1),transparent_50%)]" />
          
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden relative flex-shrink-0 border bg-[#111] border-white/10">
            <Image src="/exp-spiti.jpg" alt="Arjun Mehta" fill className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
          </div>
          
          <div className="relative z-10 w-full">
            <div className="flex flex-wrap items-center gap-4 mb-6">
               <h3 className="font-display text-3xl md:text-4xl text-white">Arjun Mehta</h3>
               <span className="text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 bg-accent/10 text-accent border border-accent/20 rounded-md">Lead Guide</span>
               <span className="text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 bg-white/5 text-white/60 border border-white/10 rounded-md flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 
                 4h Avg Response
               </span>
            </div>
            <p className="font-sans text-xl md:text-2xl font-light text-white/80 leading-relaxed italic border-l-2 border-accent/40 pl-6 py-2 max-w-4xl">
              "We do not use automated routing. The mountains don't accept excuses, and neither do we. When you reach out, you speak directly to the team leading your expedition."
            </p>
          </div>
        </motion.div>

        {/* ═ CONTACT ACTIONS ═ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-32">
          {actions.map((action, i) => (
            <motion.a
              key={i}
              href={action.href}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: APPLE_EASE }}
              className={`group flex flex-col p-10 md:p-12 bg-[#0A0A0A] border border-white/5 rounded-xl transition-all duration-500 ${action.color}`}
            >
              <action.icon size={32} className="mb-10 text-white/20 group-hover:text-current transition-colors duration-500" />

              <h2 className="font-display text-3xl text-white mb-6 leading-none group-hover:text-current transition-colors duration-500">
                {action.title}
              </h2>

              <p className="font-sans text-base font-light text-white/50 leading-relaxed mb-16 flex-1">
                {action.desc}
              </p>

              <div className="border-t border-white/10 pt-8 mt-auto flex justify-between items-center group-hover:border-current/30 transition-colors duration-500">
                <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/30 group-hover:text-current font-bold">
                  {action.label}
                </span>
                <span className="text-sm font-sans font-light text-white/80 group-hover:text-current font-medium">
                  {action.info}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ═ HQ ADDRESS ═ */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="border border-white/5 rounded-xl bg-[#050505] p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1),transparent_70%)]" />

          <div className="flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
            <div className="max-w-md">
              <MapPin size={24} className="text-accent mb-8" />
              <h3 className="font-display text-4xl md:text-5xl text-white mb-6">Operations Base</h3>
              <p className="font-sans text-xl font-light text-white/50 leading-relaxed">
                Fort Road, Leh,<br />
                Ladakh (UT) 194101<br />
                India
              </p>
            </div>

            <div className="text-left md:text-right flex flex-col items-start md:items-end">
              <div className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/40 mb-4">Coordinates</div>
              <div className="font-sans font-light text-3xl md:text-5xl text-white tracking-widest mb-12 mix-blend-difference">
                34.1643° N<br />77.5855° E
              </div>
              <p className="text-[10px] tracking-[0.2em] font-sans uppercase text-accent border border-accent/20 rounded-md px-4 py-2 bg-accent/5 backdrop-blur-sm">
                Visits by Appointment Only
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  )
}
