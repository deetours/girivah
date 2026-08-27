import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Triangle } from 'lucide-react'
import { getActiveBooking, formatDepartureDate } from '@/lib/data/account'

export default async function DossierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const booking = getActiveBooking()

  if (id !== booking.id || !booking.expedition) return notFound()
  const { expedition } = booking

  return (
    <main className="min-h-screen bg-[#050505] pt-32 px-6 md:px-12 text-white pb-40">
      <div className="max-w-[900px] mx-auto">
        <Link href="/account" className="inline-flex items-center gap-4 text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 hover:text-white transition-colors duration-300 mb-16">
          <ArrowLeft size={14} /> Back to Command Center
        </Link>

        <p className="text-accent text-[10px] tracking-[0.3em] uppercase mb-4">{booking.ref}</p>
        <h1 className="font-display text-5xl md:text-7xl mb-12 uppercase tracking-tighter leading-none">
          {expedition.title}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-y border-white/10 py-8">
          {[
            ['Status', booking.status],
            ['Departs', formatDepartureDate(booking.departsAt)],
            ['Duration', expedition.duration],
            ['Max Elevation', expedition.maxElevation],
          ].map(([label, value]) => (
            <div key={label}>
              <span className="block text-[10px] tracking-[0.2em] font-sans uppercase text-white/30 mb-2">{label}</span>
              <span className="text-white text-sm font-sans uppercase tracking-[0.15em]">{value}</span>
            </div>
          ))}
        </div>

        <section className="mb-16">
          <h2 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 mb-6">Route Leader</h2>
          <div className="bg-[#0A0A0A] border border-white/5 p-8">
            <h3 className="font-display text-2xl mb-2">{expedition.leader.name}</h3>
            <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-white/40 mb-4">{expedition.leader.title}</p>
            <div className="flex flex-wrap gap-6">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-accent/80">{expedition.leader.certifications}</span>
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-white/30">{expedition.leader.evacuations}</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 mb-6">Included</h2>
          <ul className="space-y-4">
            {expedition.included.map((inc, i) => (
              <li key={i} className="text-sm font-sans text-white/60 font-light flex gap-4 items-start">
                <Triangle size={6} className="fill-accent stroke-none mt-1.5 shrink-0" /> {inc}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
