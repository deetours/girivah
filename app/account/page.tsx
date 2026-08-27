'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, LogOut, FileText, Compass, Settings } from 'lucide-react'
import { getActiveBooking, formatDepartureDate } from '@/lib/data/account'

export default function AccountDashboard() {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const booking = getActiveBooking()

  // Quick mock auth check
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
       <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 border-b border-white/10 pb-12">
             <div>
                <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-accent mb-4">Command Center</p>
                <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tighter">Welcome Back.</h1>
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
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             {/* Main Panel */}
             <div className="lg:col-span-8 space-y-12">
                
                {/* Active Protocol */}
                <section>
                   <h2 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 mb-6 flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Active Protocol
                   </h2>
                   <div className="bg-[#0A0A0A] border border-white/10 p-8 md:p-10 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
                         <div>
                            <span className="text-accent text-[10px] tracking-[0.3em] uppercase mb-2 block">{booking.ref}</span>
                            <h3 className="font-display text-3xl md:text-4xl mb-4">{booking.expedition?.title ?? 'Active Protocol'}</h3>
                            <div className="flex gap-6 text-[10px] font-sans tracking-[0.2em] uppercase text-white/40">
                               <span>Departs: {formatDepartureDate(booking.departsAt)}</span>
                               <span>Status: {booking.status}</span>
                            </div>
                         </div>
                         <Link href={`/account/dossier/${booking.id}`} className="btn-ghost px-6 py-3 flex items-center gap-2 text-[10px] whitespace-nowrap">
                            Access Dossier <ArrowUpRight size={14} />
                         </Link>
                      </div>
                   </div>
                </section>

                {/* Logistics */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <Link href="/account/medical" className="bg-[#0A0A0A] border border-white/5 p-8 hover:border-white/20 transition-colors group">
                      <FileText className="text-accent mb-6 opacity-80" size={24} />
                      <h4 className="font-display text-2xl mb-2">Medical Clearance</h4>
                      <p className="font-sans text-sm font-light text-white/40 group-hover:text-white/60 transition-colors">Action Required: Upload your high-altitude assessment.</p>
                   </Link>
                   <div className="bg-[#0A0A0A] border border-white/5 p-8 opacity-50 cursor-not-allowed">
                      <Compass className="text-white mb-6 opacity-50" size={24} />
                      <h4 className="font-display text-2xl mb-2">Route Briefing</h4>
                      <p className="font-sans text-sm font-light text-white/40">Unlocks 30 days prior to departure.</p>
                   </div>
                </section>
             </div>

             {/* Side Panel */}
             <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#0A0A0A] border border-white/5 p-8">
                   <h3 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 mb-6">Financials</h3>
                   <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
                      <span className="font-sans text-sm font-light text-white/60">Total Due</span>
                      <span className="font-display text-2xl text-white">₹ 0</span>
                   </div>
                   <p className="text-[10px] font-sans tracking-[0.1em] text-white/30">All accounts settled for active protocols.</p>
                </div>
                
                <Link href="/account/settings" className="bg-[#0A0A0A] border border-white/5 p-6 flex justify-between items-center group hover:bg-[#111] transition-colors">
                   <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/60">Profile Settings</span>
                   <Settings size={14} className="text-white/40 group-hover:text-accent transition-colors" />
                </Link>
             </div>
          </div>
       </div>
    </main>
  )
}
