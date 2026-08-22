"use client"

interface SectionTagProps {
  scene: string
  title: string
  className?: string
}

export default function SectionTag({ scene, title, className = "" }: SectionTagProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-accent">
        {scene}
      </span>
      <span className="block w-8 h-px bg-white/20" />
      <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/30">
        {title}
      </span>
    </div>
  )
}
