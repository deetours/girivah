export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-32 px-6 md:px-12 text-white pb-40">
      <div className="max-w-4xl mx-auto py-24">
        <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-accent mb-6">Zero Compromise</p>
        <h1 className="font-display text-5xl md:text-8xl mb-12 uppercase tracking-tighter leading-none">
          Safety<br />Architecture.
        </h1>
        <p className="font-sans text-white/50 text-xl leading-relaxed max-w-2xl mb-24">
          The mountains are unforgiving. Our safety protocols are designed to match their intensity. We don't rely on luck; we rely on preparation, redundant systems, and elite personnel.
        </p>

        <div className="space-y-16 border-t border-white/5 pt-16">
           <div>
              <h3 className="font-display text-3xl mb-4 text-white/90">Redundant Comms</h3>
              <p className="font-sans text-white/50 leading-relaxed font-light">
                Every expedition is equipped with satellite uplinks, VHF radios for convoy spacing, and emergency beacons. We maintain a constant lock on your position.
              </p>
           </div>
           <div>
              <h3 className="font-display text-3xl mb-4 text-white/90">Medical Extraction</h3>
              <p className="font-sans text-white/50 leading-relaxed font-light">
                Our support 4x4s carry portable oxygen, trauma kits, and are manned by wilderness first responders. If things go critical, we have established helicopter extraction protocols.
              </p>
           </div>
           <div>
              <h3 className="font-display text-3xl mb-4 text-white/90">Vessel Maintenance</h3>
              <p className="font-sans text-white/50 leading-relaxed font-light">
                Whether a Royal Enfield or a 4x4, every machine is stripped and rebuilt between expeditions. A dedicated mechanic rides with the convoy.
              </p>
           </div>
        </div>
      </div>
    </main>
  )
}
