'use client'

import React, { useState } from 'react'
import { FilterRail } from './FilterRail'
import { useScrollLock } from '@/hooks/useScrollLock'

export function MobileFilterSheet() {
  const [isOpen, setIsOpen] = useState(false)
  
  // Apply scroll lock to background when open
  const scrollLockProps = useScrollLock(isOpen)

  return (
    <div className="md:hidden mb-6">
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full py-4 border border-white/20 text-center text-xs tracking-[0.2em] uppercase text-white hover:bg-white/5 transition-colors"
      >
        Filters & Sort
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#050505]">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="font-display text-xl text-white tracking-tight">FILTERS</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-xs uppercase tracking-widest text-white/50 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto" {...scrollLockProps}>
            {/* Reuse FilterRail but style it to fit the sheet */}
            <div className="p-0 [&>div]:p-6 [&>div]:border-none [&>div]:static [&>div]:bg-transparent">
              <FilterRail />
            </div>
          </div>
          <div className="p-6 border-t border-white/10 bg-[#050505]">
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full py-4 bg-white text-black text-xs tracking-[0.2em] uppercase font-bold"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
