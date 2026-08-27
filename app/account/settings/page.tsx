'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, LogOut } from 'lucide-react'

export default function AccountSettingsPage() {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('girivah_auth')
      if (!auth) {
        router.push('/login')
      } else {
        setIsAuth(true)
      }
    }
  }, [router])

  if (!isAuth) return <div className="min-h-screen bg-[#050505]" />

  return (
    <main className="min-h-screen bg-[#050505] pt-32 px-6 md:px-12 text-white pb-40">
      <div className="max-w-[700px] mx-auto">
        <Link href="/account" className="inline-flex items-center gap-4 text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 hover:text-white transition-colors duration-300 mb-16">
          <ArrowLeft size={14} /> Back to Command Center
        </Link>

        <h1 className="font-display text-4xl md:text-6xl mb-6 uppercase tracking-tighter leading-none">
          Profile Settings.
        </h1>
        <p className="font-sans text-white/50 font-light leading-relaxed mb-16 max-w-lg">
          This is a demo session — you're signed in locally on this device, with no account profile stored yet. Real profile fields (name, contact, preferences) land once account creation is wired up.
        </p>

        <div className="bg-[#0A0A0A] border border-white/5 p-8 mb-12">
          <span className="block text-[10px] tracking-[0.3em] font-sans uppercase text-white/30 mb-2">Session</span>
          <span className="text-white text-sm font-sans uppercase tracking-[0.15em]">Active — this device only</span>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('girivah_auth')
            router.push('/login')
          }}
          className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/40 hover:text-white flex items-center gap-2 transition-colors"
        >
          <LogOut size={14} /> Terminate Session
        </button>
      </div>
    </main>
  )
}
