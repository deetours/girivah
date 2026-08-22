'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APPLE_EASE } from '@/lib/constants'

interface HeroCanvasProps {
  intent: 'TRIPS' | 'RIDES' | 'STAYS'
}

export function HeroCanvas({ intent }: HeroCanvasProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Animation variants for SVG drawing
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 2, ease: APPLE_EASE, delay: 0.2 } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.5, ease: APPLE_EASE } 
    }
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-transparent">
      
      {/* 1. Static Graticule (Lat/Long Grid) */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Faint contour lines to suggest topography universally */}
          <path d="M-100,500 Q 200,400 500,600 T 1200,300 T 2000,500" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M-100,550 Q 200,450 500,650 T 1200,350 T 2000,550" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      {/* 2. Intent-Reactive Dynamic Schematic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <AnimatePresence mode="wait">
          {intent === 'TRIPS' && (
            <motion.svg 
              key="trips"
              viewBox="0 0 1000 600" 
              className="w-full h-full max-w-[1200px]"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* GPS Track Route */}
              <motion.path 
                d="M 100 400 L 300 350 L 450 450 L 600 250 L 800 300 L 900 150" 
                fill="none" 
                stroke="#FF3E00" 
                strokeWidth="2" 
                strokeDasharray="8 8"
                variants={isReducedMotion ? {} : pathVariants}
              />
              {/* Waypoints */}
              <motion.circle cx="100" cy="400" r="4" fill="#FF3E00" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
              <motion.circle cx="450" cy="450" r="4" fill="#FF3E00" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0 }} />
              <motion.circle cx="900" cy="150" r="4" fill="#FF3E00" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.0 }} />
              {/* Elevation profile shading */}
              <motion.path 
                d="M 100 600 L 100 400 L 300 350 L 450 450 L 600 250 L 800 300 L 900 150 L 900 600 Z" 
                fill="url(#gradTrips)" 
                opacity="0.1"
                initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ delay: 1 }}
              />
              <defs>
                <linearGradient id="gradTrips" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF3E00" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </motion.svg>
          )}

          {intent === 'RIDES' && (
            <motion.svg 
              key="rides"
              viewBox="0 0 1000 600" 
              className="w-full h-full max-w-[1200px]"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Radial telemetry & suspension geometry */}
              <motion.circle cx="500" cy="300" r="200" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 12" variants={isReducedMotion ? {} : pathVariants} opacity="0.5" />
              <motion.circle cx="500" cy="300" r="150" fill="none" stroke="#FF3E00" strokeWidth="0.5" variants={isReducedMotion ? {} : pathVariants} />
              <motion.path d="M 500 100 L 500 500 M 300 300 L 700 300" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" variants={isReducedMotion ? {} : pathVariants} />
              {/* Suspension strut line */}
              <motion.path d="M 500 300 L 650 150" fill="none" stroke="#FF3E00" strokeWidth="2" variants={isReducedMotion ? {} : pathVariants} />
              <motion.circle cx="650" cy="150" r="6" fill="#FF3E00" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />
            </motion.svg>
          )}

          {intent === 'STAYS' && (
            <motion.svg 
              key="stays"
              viewBox="0 0 1000 600" 
              className="w-full h-full max-w-[1200px]"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Architectural linework */}
              <motion.path d="M 200 450 L 800 450" fill="none" stroke="white" strokeWidth="1" opacity="0.3" variants={isReducedMotion ? {} : pathVariants} />
              <motion.path d="M 300 450 L 300 250 L 500 150 L 700 250 L 700 450" fill="none" stroke="#FF3E00" strokeWidth="1.5" variants={isReducedMotion ? {} : pathVariants} />
              <motion.path d="M 300 250 L 700 250" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" variants={isReducedMotion ? {} : pathVariants} />
              {/* Cross bracing */}
              <motion.path d="M 300 450 L 700 250 M 300 250 L 700 450" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 4" variants={isReducedMotion ? {} : pathVariants} />
              <motion.circle cx="500" cy="150" r="4" fill="#FF3E00" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Scanline/Grain Overlay */}
      <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* 4. Vignette / Fade out edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
    </div>
  )
}
