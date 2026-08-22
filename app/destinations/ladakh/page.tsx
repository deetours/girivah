"use client"

import { Suspense, useState } from "react"
import CinematicPreloader from "@/components/ladakh/scene0-preloader/CinematicPreloader"
import TheCallHero from "@/components/ladakh/scene1-hero/TheCallHero"
import TheThreshold from "@/components/ladakh/scene2-threshold/TheThreshold"
import EnteringTheVoid from "@/components/ladakh/scene3-void/EnteringTheVoid"
import SiegeEngine from "@/components/ladakh/scene4-siege/SiegeEngine"
import ChooseYourVessel from "@/components/ladakh/scene5-vessel/ChooseYourVessel"
import FieldReports from "@/components/ladakh/scene6-evidence/FieldReports"
import FinalBriefing from "@/components/ladakh/scene7-briefing/FinalBriefing"
import MissionAcceptance from "@/components/ladakh/scene8-acceptance/MissionAcceptance"
import EnvironmentColorController from "@/components/ladakh/shared/EnvironmentColorController"
import WhatsAppSticky from "@/components/ladakh/scene8-acceptance/WhatsAppSticky"

export default function LadakhPage() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      <EnvironmentColorController />

      {!preloaderDone && (
        <CinematicPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      <WhatsAppSticky />

      <main
        id="ladakh-main"
        className="bg-[#050505] text-white overflow-x-hidden min-h-screen selection:bg-accent selection:text-white"
      >
        <TheCallHero />
        <TheThreshold />
        <EnteringTheVoid />
        <SiegeEngine />
        <Suspense fallback={<div className="h-screen bg-[#050505]" />}>
          <ChooseYourVessel />
        </Suspense>
        <FieldReports />
        <FinalBriefing />
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
          <MissionAcceptance />
        </Suspense>
      </main>
    </>
  )
}
