"use client"

import { useState, Suspense } from "react"
import CinematicPreloader from "@/components/spiti/scene0-preloader/CinematicPreloader"
import TheCallHero from "@/components/spiti/scene1-hero/TheCallHero"
import TheThreshold from "@/components/spiti/scene2-threshold/TheThreshold"
import EnteringTheVoid from "@/components/spiti/scene3-void/EnteringTheVoid"
import SiegeEngine from "@/components/spiti/scene4-siege/SiegeEngine"
import ChooseYourVessel from "@/components/spiti/scene5-vessel/ChooseYourVessel"
import FieldReports from "@/components/spiti/scene6-evidence/FieldReports"
import FinalBriefing from "@/components/spiti/scene7-briefing/FinalBriefing"
import MissionAcceptance from "@/components/spiti/scene8-acceptance/MissionAcceptance"
import EnvironmentColorController from "@/components/spiti/shared/EnvironmentColorController"
import WhatsAppSticky from "@/components/spiti/scene8-acceptance/WhatsAppSticky"

export default function SpitiPage() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      <EnvironmentColorController />

      {!preloaderDone && (
        <CinematicPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      <WhatsAppSticky />

      <main
        id="spiti-main"
        className="bg-[#050505] text-white overflow-x-hidden min-h-screen selection:bg-accent selection:text-white"
      >
        <TheCallHero />
        <TheThreshold />
        <EnteringTheVoid />
        <SiegeEngine />
        <Suspense fallback={<div className="h-screen bg-[#050505] animate-pulse" />}>
          <ChooseYourVessel />
        </Suspense>
        <FieldReports />
        <FinalBriefing />
        <Suspense fallback={<div className="h-screen bg-[#050505] animate-pulse" />}>
          <MissionAcceptance />
        </Suspense>
      </main>
    </>
  )
}
