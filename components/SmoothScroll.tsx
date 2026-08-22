'use client'

import { useEffect, useRef } from 'react'
import { Lenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<any>(null)

    useEffect(() => {
        // Disable GSAP's lag smoothing to prevent desync with Lenis
        gsap.ticker.lagSmoothing(0)

        // Mount Lenis's raf loop onto gsap.ticker
        const update = (time: number) => {
            const lenis = lenisRef.current?.lenis
            if (lenis) {
                lenis.raf(time * 1000)
            }
        }
        
        gsap.ticker.add(update)

        return () => {
            gsap.ticker.remove(update)
        }
    }, [])

    return (
        <Lenis
            root
            ref={lenisRef}
            autoRaf={false}
            onScroll={ScrollTrigger.update}
            options={{
                lerp: 0.15,          // Snappy easing. 0.1 is too floaty; 0.15 feels immediate but smooth.
                wheelMultiplier: 1.25, // Creates a 'lighter' feeling page that moves easily.
                smoothWheel: true,   // Smooths out jagged mouse wheels.
                // @ts-ignore
                smoothTouch: false,  // CRITICAL: Let iOS/Android handle touch momentum natively.
                // @ts-ignore
                syncTouch: false     // Do not alter native mobile gestures.
            }}
        >
            {children}
        </Lenis>
    )
}
