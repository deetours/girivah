export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-32 px-6 md:px-12 text-white pb-40">
      <div className="max-w-4xl mx-auto py-24">
        <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-accent mb-6">The Vanguard</p>
        <h1 className="font-display text-5xl md:text-8xl mb-8 uppercase tracking-tighter leading-none">
          Expedition<br />Leaders.
        </h1>
        <p className="font-sans text-white/50 text-xl leading-relaxed max-w-2xl mb-24">
          Our guides are not just tour leaders. They are UIAGM-certified mountaineers, wilderness first responders, and local legends who have spent their lives navigating the harshest terrain on Earth.
        </p>

        <div className="space-y-32">
           <div className="flex flex-col md:flex-row gap-12 items-center group">
              <div className="w-full md:w-1/2 aspect-square bg-[#0A0A0A] border border-white/5 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="w-full md:w-1/2">
                 <h2 className="font-display text-4xl mb-2">Arjun Mehta</h2>
                 <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-accent mb-6">Lead Guide · 14 Years in Zanskar</p>
                 <p className="font-sans text-white/60 font-light leading-relaxed mb-8">
                   "The mountain doesn't care about your resume. It only cares about your preparation." Arjun has led over 50 successful ascents and maintains a perfect safety record in the Zanskar range.
                 </p>
                 <ul className="space-y-2">
                    <li className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/40">UIAGM Certified</li>
                    <li className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/40">Wilderness First Responder</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </main>
  )
}
