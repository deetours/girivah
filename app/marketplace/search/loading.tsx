export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-40 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 animate-pulse">
        <div className="hidden md:block w-full md:w-1/4">
          <div className="h-96 bg-white/[0.03] border border-white/5" />
        </div>
        <div className="w-full md:w-3/4">
          <div className="h-10 w-1/3 bg-white/[0.05] mb-4" />
          <div className="h-4 w-1/4 bg-white/[0.03] mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-white/[0.03]" />
                <div className="h-4 w-2/3 bg-white/[0.04]" />
                <div className="h-8 w-4/5 bg-white/[0.05]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
