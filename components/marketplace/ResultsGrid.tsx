'use client'

import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { MarketplaceItem } from '@/lib/types/marketplace'

interface ResultsGridProps {
  items: (MarketplaceItem & any)[]
}

export function ResultsGrid({ items }: ResultsGridProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        <AnimatePresence mode="popLayout">
          {items.map((item, idx) => (
            <ProductCard key={`${item.kind}:${item.slug}`} item={item} idx={idx} />
          ))}
        </AnimatePresence>
      </div>
      
      {items.length === 0 && (
        <div className="w-full text-center py-32 border border-white/5 bg-white/[0.02]">
          <p className="font-display text-2xl text-white/60 mb-2 tracking-tight">NO MATCHES FOUND</p>
          <p className="font-sans text-white/30 text-[10px] tracking-widest uppercase">
            Try adjusting your filters to broaden the search.
          </p>
        </div>
      )}
    </div>
  )
}
