'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface DiscoveryInputProps {
  value: string
  onChange: (value: string) => void
  intent?: 'TRIPS' | 'RIDES' | 'STAYS'
}

export function DiscoveryInput({ value, onChange, intent = 'TRIPS' }: DiscoveryInputProps) {
  const [placeholder, setPlaceholder] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const fullText = 'ENTER DESTINATION_'
  const router = useRouter()

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setPlaceholder(fullText)
      return
    }

    let i = 0
    // Start typing after initial load delay
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setPlaceholder(fullText.slice(0, i))
        i++
        if (i > fullText.length) clearInterval(interval)
      }, 70)
      return () => clearInterval(interval)
    }, 1200)

    return () => clearTimeout(startTimeout)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      const query = encodeURIComponent(value.trim())
      let kindQuery = 'all'
      if (intent === 'RIDES') kindQuery = 'vehicle'
      if (intent === 'STAYS') kindQuery = 'stay'
      if (intent === 'TRIPS') kindQuery = 'trip'
      
      router.push(`/marketplace/search?q=${query}&kind=${kindQuery}`)
    }
  }

  return (
    <div className="relative w-full max-w-sm mt-8 mb-6">
      <div className="relative z-10">
        <div className="relative group">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-focus-within:border-accent transition-colors" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 group-focus-within:border-accent transition-colors" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 group-focus-within:border-accent transition-colors" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-focus-within:border-accent transition-colors" />
          
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-accent font-mono text-[11px] md:text-[13px]">{'>'}</div>
          
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-[#050505]/50 backdrop-blur-md border border-white/5 pl-8 pr-4 py-4 font-mono text-[11px] md:text-[13px] tracking-widest uppercase text-white placeholder:text-white/40 focus:outline-none focus:border-accent/50 focus:bg-[#050505]/80 transition-all duration-300 rounded-none relative"
            aria-label="Enter Command"
          />
        </div>
        
        {/* Ecosystem Assembly Indicators */}
        <div className="flex justify-between items-center mt-3 px-1">
          {['ROUTE', 'MACHINE', 'REFUGE'].map((sys, idx) => {
            const isActive = value.length > 0
            return (
              <div key={sys} className="flex items-center gap-1.5">
                <div className={`w-1 h-1 rounded-full transition-all duration-500 delay-[${idx * 150}ms] ${isActive ? 'bg-accent shadow-[0_0_8px_#FF3E00]' : 'bg-white/20'}`} />
                <span className={`font-mono text-[8px] tracking-widest uppercase transition-colors duration-500 delay-[${idx * 150}ms] ${isActive ? 'text-white/80' : 'text-white/30'}`}>
                  {sys}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Accent glow on focus */}
      {isFocused && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.15 }} 
          className="absolute inset-0 -m-4 blur-xl bg-accent z-0 pointer-events-none" 
        />
      )}
    </div>
  )
}
