'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSent(true)
    
    // Simulate auth token for demo
    setTimeout(() => {
      if (typeof window !== 'undefined') {
         localStorage.setItem('girivah_auth', 'true')
         router.push('/account')
      }
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-2xl p-10 md:p-12">
         <h1 className="font-display text-4xl mb-4">Basecamp Access</h1>
         
         {!sent ? (
           <>
             <p className="font-sans text-white/50 font-light mb-12 text-sm leading-relaxed">
               Enter your credentials to access your expedition dossiers, payment history, and logistical intel.
             </p>
             <form onSubmit={handleLogin} className="space-y-8">
                <div className="group relative">
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-white/20 py-4 text-xl font-light focus:outline-none focus:border-accent placeholder:text-white/20 transition-colors"
                  />
                  <div className="absolute bottom-0 left-0 h-px bg-accent w-0 group-focus-within:w-full transition-all duration-700" />
                </div>
                <button type="submit" className="btn-accent w-full justify-center py-4 flex items-center gap-3">
                  Authenticate <ArrowRight size={16} />
                </button>
             </form>
           </>
         ) : (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8">
             <div className="text-accent mb-6 flex justify-center">
               <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
             </div>
             <p className="text-center font-sans text-white/70">
               Establishing secure link...
             </p>
           </motion.div>
         )}
      </div>
    </main>
  )
}
