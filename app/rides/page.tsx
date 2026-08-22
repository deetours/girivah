'use client'

import React, { Suspense } from 'react'
import { vehicles } from '@/lib/data/vehicles'
import { ListingTemplate } from '@/components/marketplace/ListingTemplate'

function RidesContent() {
  return (
    <ListingTemplate
      title="The Machines"
      subtitle="Expedition Vehicles"
      heroImage="/hero-cinematic.jpg"
      kind="vehicle"
      items={vehicles}
    />
  )
}

export default function RidesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <RidesContent />
    </Suspense>
  )
}
