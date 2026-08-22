'use client'

import React from 'react'
import { Search } from 'lucide-react'
import { SearchPalette } from './SearchPalette'

export function SearchTrigger({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 ${className || ''}`}
      >
        <Search size={16} />
        <span className="hidden md:inline-block text-[10px] tracking-[0.3em] font-sans uppercase">
          Search
        </span>
        <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-white/20 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/40">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <SearchPalette open={open} onOpenChange={setOpen} />
    </>
  )
}
