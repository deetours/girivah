export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-32 px-6 md:px-12 text-white pb-40">
      <div className="max-w-5xl mx-auto py-24">
        <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-accent mb-6">Field Reports</p>
        <h1 className="font-display text-5xl md:text-8xl mb-24 uppercase tracking-tighter leading-none">
          The Journal.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
           <article className="group cursor-pointer">
              <div className="aspect-[4/3] bg-[#0A0A0A] mb-8 relative overflow-hidden border border-white/5">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              </div>
              <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/40 mb-4 flex gap-4">
                 <span>Dispatch 042</span>
                 <span className="text-accent">Ladakh</span>
              </p>
              <h2 className="font-display text-3xl mb-4 group-hover:text-accent transition-colors">Surviving the Chang La Blizzard</h2>
              <p className="font-sans text-white/50 font-light leading-relaxed">
                When the temperature dropped 20 degrees in an hour, the expedition fundamentally changed from a ride into a test of endurance.
              </p>
           </article>
           <article className="group cursor-pointer">
              <div className="aspect-[4/3] bg-[#0A0A0A] mb-8 relative overflow-hidden border border-white/5">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              </div>
              <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-white/40 mb-4 flex gap-4">
                 <span>Dispatch 041</span>
                 <span className="text-accent">Spiti</span>
              </p>
              <h2 className="font-display text-3xl mb-4 group-hover:text-accent transition-colors">The Monks of Ki Monastery</h2>
              <p className="font-sans text-white/50 font-light leading-relaxed">
                Finding stillness at 13,668 feet. An afternoon spent with the guardians of the high valley.
              </p>
           </article>
        </div>
      </div>
    </main>
  )
}
