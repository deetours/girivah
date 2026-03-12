'use client'

import React from 'react'
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
    color: 'hover:text-blue-500 hover:border-blue-500/50',
  },
  {
    title: 'Custom Expeditions',
    desc: 'Bespoke route planning for private groups. Detailed logistical planning taking 48-72 hours.',
    label: 'Email Planning Team',
    info: 'expeditions@girivah.com',
    icon: Mail,
    href: 'mailto:expeditions@girivah.com',
    color: 'hover:text-amber-500 hover:border-amber-500/50',
  },
  {
    title: 'Immediate intel',
    desc: 'Current weather condition reports, road closures, and immediate mission updates.',
    label: 'WhatsApp Support',
    info: 'Message the Basecamp',
    icon: MessageCircle,
    href: 'https://wa.me/919876543210',
    color: 'hover:text-emerald-500 hover:border-emerald-500/50',
  },
]

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen pt-40 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-24 md:mb-32">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.3em] font-sans text-white/40 uppercase mb-6"
          >
            Basecamp Comms
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-white font-display text-[clamp(4rem,10vw,10rem)] leading-[0.85] tracking-tight"
          >
            Direct <span className="text-accent/60 italic font-light">Line.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="font-sans text-xl md:text-3xl font-light text-white/70 max-w-2xl mt-12 leading-relaxed"
          >
            We do not use automated routing. When you reach out, you speak to the team leading the expedition.
          </motion.p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 mb-32">
          {actions.map((action, i) => (
            <motion.a
              key={i}
              href={action.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.1), type: "spring", stiffness: 100 }}
              className={`group flex flex-col p-10 md:p-14 bg-[#0A0A0A] border-y border-transparent transition-all duration-500 ${action.color}`}
            >
              <action.icon size={32} className="mb-12 text-white/20 group-hover:text-current transition-colors duration-500" />

              <h2 className="font-display text-4xl text-white mb-6 leading-none">
                {action.title}
              </h2>

              <p className="font-sans text-lg font-light text-white/50 leading-relaxed mb-16 flex-1">
                {action.desc}
              </p>

              <div className="border-t border-white/10 pt-8 mt-auto flex justify-between items-center group-hover:border-current/30 transition-colors duration-500">
                <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/30 group-hover:text-current font-bold">
                  {action.label}
                </span>
                <span className="text-sm font-sans font-light text-white/80 group-hover:text-current">
                  {action.info}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* HQ Address */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="border border-white/10 bg-[#050505] p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1),transparent_70%)]" />

          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="max-w-md">
              <MapPin size={24} className="text-accent mb-8" />
              <h3 className="font-display text-5xl text-white mb-6">Operations Base</h3>
              <p className="font-sans text-xl font-light text-white/50 leading-relaxed">
                Fort Road, Leh,<br />
                Ladakh (UT) 194101<br />
                India
              </p>
            </div>

            <div className="text-left md:text-right flex flex-col items-start md:items-end">
              <div className="text-[10px] tracking-[0.3em] font-sans uppercase text-muted-foreground mb-4">Coordinates</div>
              <div className="font-sans font-light text-3xl md:text-5xl text-white tracking-wider mb-12">
                34.1643° N<br />77.5855° E
              </div>
              <p className="text-[10px] tracking-[0.2em] font-sans uppercase text-accent border border-accent/20 px-4 py-2">
                Visits by Appointment Only
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  )
}
