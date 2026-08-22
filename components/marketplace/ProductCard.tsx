import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Triangle, CheckCircle } from 'lucide-react'
import { MarketplaceItem } from '@/lib/types/marketplace'
import { APPLE_EASE } from '@/lib/constants'
import { AddToTripButton } from './AddToTripButton'

interface ProductCardProps {
  item: MarketplaceItem & any;
  idx: number;
}

export function ProductCard({ item, idx }: ProductCardProps) {
  // Use price/day for trips and vehicles, price/night for stays
  const priceLabel = item.kind === 'trip' || item.kind === 'vehicle' ? 'per day' : 'per night';
  const priceDisplay = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.fromPrice);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: APPLE_EASE, delay: idx * 0.07 }}
      className={`group cursor-pointer ${item.featured ? 'md:col-span-2' : ''}`}
    >
      <Link 
        href={item.kind === 'experience' ? '/marketplace/search?kind=experience' : `/${item.kind === 'trip' ? 'expeditions' : item.kind === 'vehicle' ? 'rides' : 'stays'}/${item.slug}`} 
        className="block"
      >

        {/* Image Container */}
        <div className={`relative overflow-hidden w-full bg-secondary mb-8 ${item.featured ? 'aspect-[4/3] md:aspect-[2.5/1]' : 'aspect-[4/5] md:aspect-square'}`}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, ease: APPLE_EASE }}
          >
            <Image
              src={item.media && item.media[0] ? item.media[0].src : item.image || ''}
              alt={item.title}
              fill
              priority={idx === 0}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70 z-20" />

          {/* Status badge */}
          <div className="absolute top-6 left-6 z-30 flex gap-2 items-center">
            {item.availability === 'sold-out' ? (
              <span className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-sans border bg-black/80 border-white/20 text-white/50">Sold Out</span>
            ) : item.availability === 'limited' ? (
              <span className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-sans border bg-accent/20 border-accent/60 text-accent">Limited</span>
            ) : item.availability === 'coming-soon' ? (
              <span className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-sans border bg-black/40 backdrop-blur-md border-white/10 text-white">Coming Soon</span>
            ) : (
              <span className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-sans border bg-black/40 backdrop-blur-md border-white/10 text-white">Available</span>
            )}
            
            {item.spotsLeft !== undefined && item.spotsLeft <= 2 && (
              <span className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-sans border bg-accent/20 border-accent/60 text-accent">
                {item.spotsLeft <= 1 ? 'Last Spot' : `${item.spotsLeft} Spots Left`}
              </span>
            )}
          </div>

          {/* Expand & Actions */}
          <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
            <AddToTripButton item={item} variant="compact" />
            <div className="flex items-center justify-center w-14 h-14 bg-white text-black shrink-0">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-3 pb-3 border-b border-white/5">
              <span className="text-white/70">{item.type || item.category}</span>
              {item.maxElevation || item.altitudeRating || item.elevation ? (
                <span className="flex items-center gap-1.5">
                  <Triangle size={7} className="fill-white/30 stroke-none" />
                  {item.maxElevation || item.altitudeRating || item.elevation}
                </span>
              ) : null}
              {item.duration && <span>{item.duration}</span>}
              {item.season && <span>{item.season}</span>}
            </div>
            
            {/* Trust Line */}
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={12} className="text-accent" />
              <span className="text-[10px] uppercase tracking-widest text-white/50">Verified Provider</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display text-white group-hover:text-accent transition-colors duration-500">
              {item.title}
            </h2>
          </div>

          {/* Price */}
          <div className="md:text-right pt-1 md:pt-0 shrink-0">
            <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-white/30 mb-1">From</span>
            <span className="font-display text-xl text-white/60">{priceDisplay}</span>
            <span className="block font-sans text-[9px] tracking-widest uppercase text-white/40 mt-1">{priceLabel}</span>
            <div className="mt-4 text-[10px] uppercase tracking-[0.2em] font-sans text-accent border-b border-accent/30 pb-0.5 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Details
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
