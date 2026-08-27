import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

const REQUIREMENTS = [
  'High-altitude fitness self-assessment (form provided on request)',
  'Resting blood pressure and heart rate within the last 90 days',
  'Disclosure of any cardiac, respiratory, or prior AMS history',
  'Physician sign-off required for routes above 15,000 ft',
]

export default function MedicalClearancePage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-32 px-6 md:px-12 text-white pb-40">
      <div className="max-w-[700px] mx-auto">
        <Link href="/account" className="inline-flex items-center gap-4 text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 hover:text-white transition-colors duration-300 mb-16">
          <ArrowLeft size={14} /> Back to Command Center
        </Link>

        <FileText className="text-accent mb-8 opacity-80" size={28} />
        <h1 className="font-display text-4xl md:text-6xl mb-6 uppercase tracking-tighter leading-none">
          Medical Clearance.
        </h1>
        <p className="font-sans text-white/50 font-light leading-relaxed mb-16 max-w-lg">
          Every route above 15,000 ft requires a signed medical clearance before departure. Document upload isn't wired up yet — for now, send your assessment directly and our team will log it against your booking by hand.
        </p>

        <section className="mb-16">
          <h2 className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/50 mb-6">What We Need</h2>
          <ul className="space-y-4">
            {REQUIREMENTS.map((req, i) => (
              <li key={i} className="text-sm font-sans text-white/60 font-light flex gap-4 items-start border-b border-white/5 pb-4">
                <span className="text-accent mt-1 leading-none">+</span> {req}
              </li>
            ))}
          </ul>
        </section>

        <Link href="/contact" className="btn-accent px-8 py-4 inline-flex items-center gap-3 text-[10px] tracking-[0.2em]">
          Send Clearance to Our Team
        </Link>
      </div>
    </main>
  )
}
