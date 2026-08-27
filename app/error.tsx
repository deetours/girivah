'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-accent mb-8">System Fault</p>
      <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-tighter uppercase mb-8">
        Something Broke.
      </h1>
      <p className="font-sans text-white/50 font-light max-w-md mb-12">
        An unexpected fault hit this page. Try again, or head back to safer ground.
      </p>
      <div className="flex gap-6 items-center">
        <button onClick={() => reset()} className="btn-accent px-8 py-4 inline-flex items-center gap-3 text-[10px] tracking-[0.2em]">
          Try Again <ArrowRight size={14} />
        </button>
        <Link href="/marketplace" className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1">
          Back to Ecosystem
        </Link>
      </div>
    </main>
  )
}
