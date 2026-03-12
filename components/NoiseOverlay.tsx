'use client'

// MANEUVER 5: The Analog Texture Injection
// Persistent global film grain overlay that floats at the highest z-index.
// Implemented in pure CSS (no SVG filter warnings) using a data URI background
// for maximum compatibility and zero lint errors.

export default function NoiseOverlay() {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-[9999]"
            aria-hidden={true}
            style={{
                opacity: 0.035,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '200px 200px',
            }}
        />
    )
}
