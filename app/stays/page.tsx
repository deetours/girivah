'use client'

import React, { Suspense } from 'react'
import { stays } from '@/lib/data/stays'
import { ListingTemplate } from '@/components/marketplace/ListingTemplate'

function StaysContent() {
  return (
    <ListingTemplate
      title="The Refuges"
      subtitle="High-Altitude Stays"
      heroImage="/exp-ladakh.jpg"
      kind="stay"
      items={stays}
    />
  )
}

export default function StaysPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <StaysContent />
    </Suspense>
  )
}
