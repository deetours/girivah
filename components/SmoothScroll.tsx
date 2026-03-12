'use client'

import { Lenis } from 'lenis/react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <Lenis
            root
            options={{
                lerp: 0.15,          // Snappy easing. 0.1 is too floaty; 0.15 feels immediate but smooth.
                wheelMultiplier: 1.25, // Creates a 'lighter' feeling page that moves easily.
                smoothWheel: true,   // Smooths out jagged mouse wheels.
                smoothTouch: false,  // CRITICAL: Let iOS/Android handle touch momentum natively.
                syncTouch: false     // Do not alter native mobile gestures.
            }}
        >
            {children}
        </Lenis>
    )
}
