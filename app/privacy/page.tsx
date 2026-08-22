export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-32 px-6 md:px-12 text-white">
      <div className="max-w-3xl mx-auto py-24">
        <h1 className="font-display text-5xl md:text-7xl mb-8 uppercase tracking-tighter">Privacy Policy</h1>
        <p className="font-sans text-white/50 text-lg leading-relaxed">
          Effective Date: {new Date().toLocaleDateString()}
        </p>
        <div className="mt-12 space-y-8 font-sans text-white/70 font-light leading-relaxed">
          <p>
            At Girivah, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information when you use our services.
          </p>
          <h2 className="text-2xl text-white font-display uppercase tracking-tight mt-12 mb-4">1. Information Collection</h2>
          <p>
            We collect information you provide directly to us, such as when you apply for an expedition, create an account, or contact us. This may include your name, email, phone number, and medical information necessary for your safety during high-altitude expeditions.
          </p>
          <h2 className="text-2xl text-white font-display uppercase tracking-tight mt-12 mb-4">2. Use of Information</h2>
          <p>
            We use the information we collect to operate, maintain, and improve our services, process transactions, communicate with you, and ensure your safety during our expeditions.
          </p>
          <p className="mt-12 text-white/40 italic">
            This is a placeholder privacy policy for the Girivah platform.
          </p>
        </div>
      </div>
    </main>
  )
}
