'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

export function InfrastructureScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  
  // Use useGSAP for automatic cleanup
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // 300vh scroll
        pin: pinRef.current,
        scrub: 1,
      }
    })

    // Hide pillar 2 & 3 initially
    gsap.set('.pillar-1', { opacity: 0, y: 30 })
    gsap.set('.pillar-2', { opacity: 0, y: 30 })
    
    
    const svgPathLength = 1000 // generic arbitrary value for dasharray fallback
    gsap.set('.svg-path-1, .svg-path-2, .svg-path-3', { strokeDasharray: svgPathLength, strokeDashoffset: svgPathLength })

    // Pillar 0 is active from 0 to 33%
    tl.to('.svg-path-1', { strokeDashoffset: 0, duration: 1 }, 0)
      .to('.pillar-0', { opacity: 0, y: -30, duration: 0.5 }, 0.5) // fade out at end of phase 1
      
    // Pillar 1 active from 33% to 66%
      .to('.pillar-1', { opacity: 1, y: 0, duration: 0.5 }, 0.8) // fade in
      .to('.svg-path-2', { strokeDashoffset: 0, duration: 1 }, 1)
      .to('.pillar-1', { opacity: 0, y: -30, duration: 0.5 }, 1.5) // fade out

    // Pillar 2 active from 66% to 100%
      .to('.pillar-2', { opacity: 1, y: 0, duration: 0.5 }, 1.8) // fade in
      .to('.svg-path-3', { strokeDashoffset: 0, duration: 1 }, 2)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] text-white overflow-visible">
      {/* Pinned Container */}
      <div ref={pinRef} className="h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden">
        
        {/* Left: Text Content (Pillars) */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 relative z-20">
          
          <div className="text-[10px] uppercase font-mono tracking-[0.4em] text-white/30 mb-12">
             System Diagnostics
          </div>

          <div className="relative h-[200px] w-full">
            <div className="pillar-0 absolute inset-0 flex flex-col">
              <h3 className="font-display text-4xl md:text-5xl uppercase text-white mb-6 tracking-tighter">
                TRAILO // THE TOPOLOGY
              </h3>
              <p className="font-sans text-sm md:text-base font-light text-white/60 leading-relaxed max-w-md">
                Engineered routes. We don't just map the high passes; we survey the gradients, calculate the fuel drops, and verify the conditions. The route is not a suggestion—it is a confirmed path.
              </p>
            </div>
            
            <div className="pillar-1 absolute inset-0 flex flex-col">
              <h3 className="font-display text-4xl md:text-5xl uppercase text-white mb-6 tracking-tighter">
                RIDO // THE MACHINE
              </h3>
              <p className="font-sans text-sm md:text-base font-light text-white/60 leading-relaxed max-w-md">
                Maintained for the void. 4x4s and motorcycles tuned specifically for altitude, oxygen deprivation, and zero-traction environments. Built to survive where standard rentals fail.
              </p>
            </div>
            
            <div className="pillar-2 absolute inset-0 flex flex-col">
              <h3 className="font-display text-4xl md:text-5xl uppercase text-white mb-6 tracking-tighter">
                STAYO // THE REFUGE
              </h3>
              <p className="font-sans text-sm md:text-base font-light text-white/60 leading-relaxed max-w-md">
                Shelter at the edge of the map. Pre-verified outposts, isolated camps, and high-altitude lodges. When the temperature drops to -20°C, you don't guess where you're sleeping.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Technical Wireframe / Blueprint Graphic */}
        <div className="w-full md:w-1/2 h-full md:absolute md:inset-0 flex items-center justify-center pointer-events-none opacity-20 md:opacity-100 mix-blend-screen md:mix-blend-normal z-10">
           <div className="relative w-full max-w-md aspect-square">
             <svg viewBox="0 0 100 100" className="w-full h-full stroke-accent/80 overflow-visible" fill="none" strokeWidth="0.5">
                {/* Pillar 1: Trailo (Topographic lines) */}
                <path 
                   className="svg-path-1"
                   d="M 10 30 Q 30 10 50 30 T 90 30" 
                />
                 <path 
                   className="svg-path-1"
                   d="M 10 40 Q 30 20 50 40 T 90 40" 
                />

                {/* Pillar 2: Rido (Wheel/Machine arc) */}
                <circle 
                   className="svg-path-2"
                   cx="50" cy="50" r="15" 
                />
                <path 
                   className="svg-path-2"
                   d="M 35 50 L 65 50 M 50 35 L 50 65" 
                />

                {/* Pillar 3: Stayo (Shelter/Structure) */}
                <path 
                   className="svg-path-3"
                   d="M 30 90 L 50 70 L 70 90 Z" 
                />
                <path 
                   className="svg-path-3"
                   d="M 40 90 L 40 80 L 60 80 L 60 90" 
                />

                {/* Connecting Backbone */}
                <line 
                   className="svg-path-3 stroke-white/20"
                   x1="50" y1="30" x2="50" y2="70"
                />
             </svg>
             <div className="absolute inset-0 bg-[radial-gradient(#FF3E00_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
