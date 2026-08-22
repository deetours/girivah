export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-32 px-6 md:px-12 text-white">
      <div className="max-w-3xl mx-auto py-24">
        <h1 className="font-display text-5xl md:text-7xl mb-8 uppercase tracking-tighter">Terms of Service</h1>
        <p className="font-sans text-white/50 text-lg leading-relaxed">
          Effective Date: {new Date().toLocaleDateString()}
        </p>
        <div className="mt-12 space-y-8 font-sans text-white/70 font-light leading-relaxed">
          <p>
            Welcome to Girivah. By using our website and applying for our expeditions, you agree to be bound by the following terms and conditions.
          </p>
          <h2 className="text-2xl text-white font-display uppercase tracking-tight mt-12 mb-4">1. Acceptance of Terms</h2>
          <p>
            These terms govern your access to and use of our services. Please read them carefully.
          </p>
          <h2 className="text-2xl text-white font-display uppercase tracking-tight mt-12 mb-4">2. Application and Acceptance</h2>
          <p>
            Applying for an expedition does not guarantee a spot. All applications are subject to review by our expedition leaders to ensure the safety and cohesion of the group.
          </p>
          <h2 className="text-2xl text-white font-display uppercase tracking-tight mt-12 mb-4">3. Risk Acknowledgement</h2>
          <p>
            High-altitude expeditions carry inherent risks. By participating, you acknowledge and accept these risks, and agree to follow all instructions provided by your guide.
          </p>
          <p className="mt-12 text-white/40 italic">
            This is a placeholder terms of service for the Girivah platform.
          </p>
        </div>
      </div>
    </main>
  )
}
