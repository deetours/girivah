import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import SmoothScroll from '@/components/SmoothScroll'
import NoiseOverlay from '@/components/NoiseOverlay'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Girivah | Himalayan Expedition Journeys',
  description: 'Curated, slow-paced Himalayan expeditions across Ladakh, Spiti Valley, and Himachal Pradesh. For those who seek transformation—not just destination.',
  keywords: 'Himalayan expeditions, mountain travel, Ladakh, Spiti Valley, authentic adventure',
  creator: 'Girivah',
  metadataBase: new URL('https://girivah.com'),
  openGraph: {
    title: 'Girivah | Himalayan Expedition Journeys',
    description: 'Curated Himalayan expeditions for those who seek transformation—not just destination.',
    type: 'website',
  },
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <SmoothScroll>
          <NoiseOverlay />
          <Navigation />
          {children}
          <Footer />
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  )
}
