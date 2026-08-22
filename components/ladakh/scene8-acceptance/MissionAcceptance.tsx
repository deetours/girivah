"use client"

import { motion } from "framer-motion"
import SectionTag from "@/components/ladakh/shared/SectionTag"
import LeadCaptureForm from "./LeadCaptureForm"
import { spitiConfig } from "@/components/ladakh/data/expeditionData"

const EASE = [0.32, 0.72, 0, 1] as const

export default function MissionAcceptance() {
  const whatsappUrl = `https://wa.me/${spitiConfig.whatsappNumber}?text=${encodeURIComponent(
    spitiConfig.whatsappMessage
  )}`

  return (
    <section
      id="mission-acceptance"
      className="relative min-h-screen bg-[#050505] px-6 md:px-16 py-24 flex flex-col items-center justify-center"
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle(600px) at 50% 60%, rgba(255,62,0,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 text-center"
        >
          <SectionTag scene="SCENE 08" title="MISSION ACCEPTANCE" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="text-center mb-20"
        >
          <h2
            className="font-display font-black uppercase text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem,6vw,6rem)" }}
          >
            THE BRIEFING IS OVER
          </h2>
          <p
            className="font-display italic text-accent leading-tight"
            style={{ fontSize: "clamp(1.5rem,4vw,4rem)" }}
          >
            NOW YOU CHOOSE
          </p>
        </motion.div>

        {/* Two-column decision zone */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start">
          {/* Left — Form option */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            <div className="border-b border-white/10 pb-6 mb-8">
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">
                OPTION A
              </p>
              <h3 className="font-display font-black text-white uppercase text-2xl mb-3">
                SECURE YOUR SEAT
              </h3>
              <p className="font-sans text-white/50 text-sm">
                Slots fill 4–6 weeks before departure. The July 5 batch has {spitiConfig.filledSeats} confirmed seats.
              </p>
            </div>

            <LeadCaptureForm />

            <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/30 text-center mt-6">
              Our lead guide calls you within 15 minutes. No spam.
            </p>
          </motion.div>

          {/* Desktop Divider */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="hidden md:block absolute left-1/2 top-8 h-96 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent"
            style={{ transform: "translateX(-50%)" }}
          />

          <motion.div
            className="hidden md:flex items-center justify-center absolute left-1/2 top-1/3 w-16 -translate-x-1/2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          >
            <div className="bg-[#050505] px-2">
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/20">
                OR
              </span>
            </div>
          </motion.div>

          {/* Mobile Divider */}
          <div className="md:hidden h-px bg-white/10 my-8" />

          {/* Right — Quick options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            <div className="border-b border-white/10 pb-6 mb-8">
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">
                OPTION B
              </p>
              <h3 className="font-display font-black text-white uppercase text-2xl mb-3">
                TALK NOW
              </h3>
              <p className="font-sans text-white/50 text-sm">
                Instant connection. Get all details without typing.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-[#25D366] text-black font-mono text-[11px] tracking-[0.3em] font-bold uppercase rounded-px flex items-center justify-center gap-3 hover:shadow-lg transition-shadow"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.912 1.244c-1.52.976-2.492 2.353-2.492 3.966 0 3.872 3.064 7.008 6.997 7.008 1.93 0 3.716-.822 4.97-2.188l.079-.092 3.85.824-.927-3.7.068-.108a6.991 6.991 0 001.091-3.845c0-3.046-2.335-5.62-5.651-5.62z" />
                </svg>
                OPEN WHATSAPP — START NOW
              </motion.a>

              <motion.a
                href={`tel:${spitiConfig.whatsappNumber}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-transparent border border-white/20 text-white font-mono text-[11px] tracking-[0.3em] font-bold uppercase rounded-px hover:border-white/50 transition-colors"
              >
                CALL +{spitiConfig.whatsappNumber.slice(0, 2)} {spitiConfig.whatsappNumber.slice(2, 5)} {spitiConfig.whatsappNumber.slice(5)}
              </motion.a>
            </div>

            <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/30 text-center mb-4">
              Available 9 AM – 9 PM IST, 7 days a week
            </p>

            <p className="font-sans text-[9px] text-white/40 text-center">
              <span className="text-accent">✦</span> 200+ explorers trusted this button
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
