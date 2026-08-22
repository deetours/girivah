'use client'

import React, { Suspense } from 'react'
import { EXPEDITIONS } from '@/lib/data/expeditions'
import { ListingTemplate } from '@/components/marketplace/ListingTemplate'

function ExpeditionsContent() {
  return (
    <ListingTemplate
      title="The Expeditions"
      subtitle="Curated Routes"
      heroImage="/hero-mountain.jpg"
      kind="trip"
      items={EXPEDITIONS}
    />
  )
}

export default function ExpeditionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <ExpeditionsContent />
    </Suspense>
  )
}
