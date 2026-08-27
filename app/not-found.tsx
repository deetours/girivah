import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-accent mb-8">Route Not Found</p>
      <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-tighter uppercase mb-8">
        Off the Map.
      </h1>
      <p className="font-sans text-white/50 font-light max-w-md mb-12">
        This coordinate doesn't resolve to anything we've charted yet. Head back to known territory.
      </p>
      <Link href="/marketplace" className="btn-accent px-8 py-4 inline-flex items-center gap-3 text-[10px] tracking-[0.2em]">
        Return to the Ecosystem <ArrowRight size={14} />
      </Link>
    </main>
  )
}
