"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { spitiConfig } from "@/components/spiti/data/expeditionData"

export default function WhatsAppSticky() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const whatsappUrl = `https://wa.me/${spitiConfig.whatsappNumber}?text=${encodeURIComponent(
    spitiConfig.whatsappMessage
  )}`

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 md:hidden"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {/* Notification badge */}
            <motion.div
              className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-[10px] font-bold text-black">!</span>
            </motion.div>

            {/* Button */}
            <div className="w-16 h-16 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.912 1.244c-1.52.976-2.492 2.353-2.492 3.966 0 3.872 3.064 7.008 6.997 7.008 1.93 0 3.716-.822 4.97-2.188l.079-.092 3.85.824-.927-3.7.068-.108a6.991 6.991 0 001.091-3.845c0-3.046-2.335-5.62-5.651-5.62z" />
              </svg>
            </div>

            {/* Label tooltip */}
            <motion.div
              className="absolute -left-24 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="bg-accent text-black text-xs font-mono px-3 py-1 rounded-px tracking-[0.2em] font-bold">
                CHAT NOW
              </span>
            </motion.div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
