'use client'

import React from 'react'
import { Plus, Check } from 'lucide-react'
import { useJourneyStore } from '@/lib/store/journey-store'
import { MarketplaceItem } from '@/lib/types/marketplace'
import { motion, AnimatePresence } from 'framer-motion'

interface AddToTripButtonProps {
  item: MarketplaceItem;
  variant?: 'compact' | 'labeled';
  className?: string;
}

export function AddToTripButton({ item, variant = 'labeled', className = '' }: AddToTripButtonProps) {
  const { items, addItem, removeItem, hasItem } = useJourneyStore()
  
  const key = `${item.kind}:${item.slug}`
  const isInBag = hasItem(key)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isInBag) {
      removeItem(key)
    } else {
      addItem({ slug: item.slug, kind: item.kind })
    }
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={handleToggle}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors border backdrop-blur-md z-40 ${
          isInBag 
            ? 'bg-accent/20 border-accent/60 text-accent' 
            : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
        } ${className}`}
      >
        <AnimatePresence mode="wait">
          {isInBag ? (
             <motion.div key="in" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Check size={16} />
             </motion.div>
          ) : (
             <motion.div key="out" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Plus size={16} />
             </motion.div>
          )}
        </AnimatePresence>
      </button>
    )
  }

  return (
    <button
      onClick={handleToggle}
      className={`px-8 py-4 flex items-center justify-center gap-3 transition-colors border font-sans uppercase tracking-[0.2em] text-[10px] w-full md:w-auto ${
        isInBag
          ? 'bg-accent/5 border-accent/30 text-accent hover:bg-accent/10'
          : 'bg-transparent border-white/20 text-white hover:bg-white/5'
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        {isInBag ? (
           <motion.div key="in" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
              <Check size={14} /> In Your Trip
           </motion.div>
        ) : (
           <motion.div key="out" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
              <Plus size={14} /> Add to Trip
           </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
