'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command'
import { EXPEDITIONS } from '@/lib/data/expeditions'
import { vehicles } from '@/lib/data/vehicles'
import { stays } from '@/lib/data/stays'
import { useScrollLock } from '@/hooks/useScrollLock'
import { Search } from 'lucide-react'

interface SearchPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchPalette({ open, onOpenChange }: SearchPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  
  const scrollLockProps = useScrollLock(open)

  const handleSelect = (url: string) => {
    onOpenChange(false)
    router.push(url)
  }

  const handleSearchSubmit = () => {
    if (query) {
      onOpenChange(false)
      router.push(`/marketplace/search?q=${encodeURIComponent(query)}`)
    }
  }

  // Filter items manually for cmdk as we want to group them
  const routes = useMemo(() => EXPEDITIONS.filter(e => e.title.toLowerCase().includes(query.toLowerCase())), [query])
  const machines = useMemo(() => vehicles.filter(v => v.title.toLowerCase().includes(query.toLowerCase())), [query])
  const refuges = useMemo(() => stays.filter(s => s.title.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <CommandDialog 
      open={open} 
      onOpenChange={onOpenChange} 
      className="bg-[#050505] border border-white/10 text-white rounded-none sm:max-w-[600px] font-sans"
    >
      <div {...scrollLockProps}>
        <CommandInput 
          placeholder="SEARCH DESTINATIONS, VEHICLES, OR STAYS..." 
          value={query}
          onValueChange={setQuery}
          className="border-none font-sans text-xs uppercase tracking-widest text-white placeholder:text-white/30" 
        />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty className="py-12 text-center text-[10px] uppercase tracking-widest text-white/50">
            No results found.
          </CommandEmpty>
          
          {routes.length > 0 && (
            <CommandGroup heading="ROUTES" className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-accent">
              {routes.map(item => (
                <CommandItem
                  key={`trip-${item.slug}`}
                  value={`trip ${item.title}`}
                  onSelect={() => handleSelect(`/marketplace/search?q=${encodeURIComponent(item.title)}`)}
                  className="data-[selected=true]:bg-white/10 data-[selected=true]:text-white text-sm"
                >
                  <span className="font-display tracking-tight text-base">{item.title}</span>
                  <span className="ml-auto text-[10px] tracking-widest uppercase text-white/40">{item.regionSlug}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {machines.length > 0 && (
            <CommandGroup heading="MACHINES" className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-accent mt-2">
              {machines.map(item => (
                <CommandItem
                  key={`vehicle-${item.slug}`}
                  value={`vehicle ${item.title}`}
                  onSelect={() => handleSelect(`/marketplace/search?q=${encodeURIComponent(item.title)}`)}
                  className="data-[selected=true]:bg-white/10 data-[selected=true]:text-white text-sm"
                >
                  <span className="font-display tracking-tight text-base">{item.title}</span>
                  <span className="ml-auto text-[10px] tracking-widest uppercase text-white/40">{(item as any).type || (item as any).category}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {refuges.length > 0 && (
            <CommandGroup heading="REFUGES" className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-accent mt-2">
              {refuges.map(item => (
                <CommandItem
                  key={`stay-${item.slug}`}
                  value={`stay ${item.title}`}
                  onSelect={() => handleSelect(`/marketplace/search?q=${encodeURIComponent(item.title)}`)}
                  className="data-[selected=true]:bg-white/10 data-[selected=true]:text-white text-sm"
                >
                  <span className="font-display tracking-tight text-base">{item.title}</span>
                  <span className="ml-auto text-[10px] tracking-widest uppercase text-white/40">{item.regionSlug}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
        
        {query && (
          <div 
            className="p-4 border-t border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            onClick={handleSearchSubmit}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white">See all results for "{query}"</span>
            <Search size={14} className="text-white/50" />
          </div>
        )}
      </div>
    </CommandDialog>
  )
}
