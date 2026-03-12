import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

// MANEUVER 1: The Spatial & Typographic Lockdown
// Every spacing value is a multiple of 8. No arbitrary numbers.
// This enforces the mathematical calm that Apple products project.

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-sans)", ...defaultTheme.fontFamily.mono], // Inter as mono stand-in for meta labels
      },

      // ═ THE VOID COLOR SYSTEM ═
      colors: {
        background: "#050505",   // True void (not #000 — avoids eye strain)
        foreground: "#FFFFFF",
        primary: "#111111",
        "primary-foreground": "#FFFFFF",
        secondary: "#161616",
        "secondary-foreground": "#E0E0E0",
        muted: "#222222",
        "muted-foreground": "#888888",
        accent: "#FF3E00",       // Safety orange — survival equipment / urgency
        "accent-foreground": "#FFFFFF",
        border: "#2A2A2A",
      },

      // ═ BRUTALIST SHARP EDGES (Apple hardware precision) ═
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },

      // ═ 8-POINT SPATIAL SYSTEM ═
      // Every value is a strict multiple of 4 or 8.
      // This is the same mathematical grid Apple uses in iOS/macOS.
      spacing: {
        // Micro — component internals
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        14: "56px",
        16: "64px",
        // Macro — section breathing room
        18: "72px",
        20: "80px",
        24: "96px",
        28: "112px",
        32: "128px",
        36: "144px",
        40: "160px",
        48: "192px",
        56: "224px",
        64: "256px",
        72: "288px",
        80: "320px",
        96: "384px",
      },

      // ═ EDITORIAL TYPOGRAPHY SCALE ═
      // Tight tracking on display — heavy, monolithic, cinematic
      // Relaxed tracking on meta labels — technical, precise
      fontSize: {
        "display-xl": ["clamp(5rem,14vw,14rem)", { lineHeight: "0.82", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(4rem,10vw,10rem)", { lineHeight: "0.85", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(3rem,7vw,7rem)", { lineHeight: "0.88", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(2rem,5vw,5rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "editorial": ["clamp(1.5rem,3vw,3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "body-lg": ["1.25rem", { lineHeight: "1.55", letterSpacing: "0" }],
        "body": ["1rem", { lineHeight: "1.6", letterSpacing: "0" }],
        "meta": ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.3em" }],  // 10px technical labels
        "micro": ["0.5625rem", { lineHeight: "1.4", letterSpacing: "0.25em" }], // 9px spec metadata
      },

      // ═ APPLE CUBIC-BEZIER TIMING FUNCTIONS ═
      transitionTimingFunction: {
        "apple": "cubic-bezier(0.32, 0.72, 0, 1)",
        "apple-snap": "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },

      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "clip-open": "clip-open 0.55s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "scale-in": "scale-in 1.5s cubic-bezier(0.32, 0.72, 0, 1) forwards",
      },

      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Used for the Tactical HUD mobile menu reveal
        "clip-open": {
          "0%": { clipPath: "inset(0 0 100% 0)" },
          "100%": { clipPath: "inset(0 0 0% 0)" },
        },
        // Used for cinematic image scale-reveal
        "scale-in": {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
