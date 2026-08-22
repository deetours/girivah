// ─── EXPEDITION DATA — LADAKH HIGH PASS ─────────────────────────────────────

export interface ExpeditionDay {
  day: string
  label: string
  title: string
  subTitle: string
  emotionalHook: string
  description: string
  tacticalNote: string
  altitude: number
  temp: number
  oxygen: number
  dist: string
  coords: string
  status: string
  accentColor: string
  img: string
  hasHeartbeat: boolean
  hasThermal: boolean
  particleIntensity: number
}

export interface VehicleTier {
  id: string
  tier: string
  name: string
  vehicleName: string
  vehicleSpec: string
  stayType: string
  staySpec: string
  price: string
  priceNote: string
  seats: number
  perks: string[]
  img: string
  isRecommended: boolean
  accentColor: string
}

export interface FieldReport {
  id: string
  name: string
  role: string
  location: string
  quote: string
  rating: number
  img: string
  batchDate: string
}

export interface MissionSlot {
  id: number
  filled: boolean
  label: string
}

export interface SpitiConfig {
  nextBatchDate: Date
  whatsappNumber: string
  whatsappMessage: string
  totalSeats: number
  filledSeats: number
}

// ─── 9-DAY LADAKH EXPEDITION DATA ───────────────────────────────────────────

export const expeditionDays: ExpeditionDay[] = [
  {
    day: "01",
    label: "ARRIVAL",
    title: "Gateway to the Sky",
    subTitle: "Leh Airport → Phyang Altitude Post",
    emotionalHook: "11,480 feet. The first breath feels like ice. Welcome to the Void.",
    description:
      "Traditional Khataks at the arrival gate. A silent greeting for a loud landscape. We transport you directly to Skiltang Heritage Stay in Phyang. No movements today. Drink water. Let your blood thicken. The mountains are watching.",
    tacticalNote: "Primary acclimatization phase. SpO2 check every 4 hours. Stay hydrated.",
    altitude: 11480,
    temp: 12,
    oxygen: 68,
    dist: "15 km",
    coords: "34.15°N, 77.58°E",
    status: "ACCLIMATIZATION_ACTIVE",
    accentColor: "#00F0FF",
    img: "/exp-ladakh.jpg",
    hasHeartbeat: false,
    hasThermal: false,
    particleIntensity: 0.1,
  },
  {
    day: "02",
    label: "VALIBRATION",
    title: "The Magnetic Flow",
    subTitle: "Sangam → Pathar Sahib → Magnetic Hill",
    emotionalHook: "Gravity is a suggestion here. Your machine moves on its own.",
    description:
      "First contact with the machine. We ride to the Hall of Fame, then follow the Indus to its confluence with the Zanskar. Magnetic Hill challenges your sensorium. Alchi Monastery — the oldest in Ladakh — waits at the edge of the circuit.",
    tacticalNote: "Vehicle calibration. Magnetic field anomaly detected at km 32.",
    altitude: 11480,
    temp: 15,
    oxygen: 70,
    dist: "120 km",
    coords: "34.19°N, 77.25°E",
    status: "GRAVITY_ANOMALY",
    accentColor: "#39FF14",
    img: "/hero-mountain.jpg",
    hasHeartbeat: false,
    hasThermal: false,
    particleIntensity: 0.1,
  },
  {
    day: "03",
    label: "ASCENT",
    title: "Khardung La Siege",
    subTitle: "Leh → Nubra via 17,582 ft Pass",
    emotionalHook: "The world drops away. Oxygen is a luxury. The summit is ours.",
    description:
      "Today we siege Khardung La. 17,582 feet of absolute authority. Beyond the pass lies Nubra Valley. Disket Monastery stands guard over Hunder Sand Dunes. Double-humped camels and ATV tracks across the desert of the giants.",
    tacticalNote: "Pass crossing window: 09:00 - 11:00. High-altitude exertion warning.",
    altitude: 17582,
    temp: -4,
    oxygen: 48,
    dist: "160 km",
    coords: "34.27°N, 77.60°E",
    status: "ATMOSPHERE_CRITICAL",
    accentColor: "#FF5200",
    img: "/spiti/day2.png",
    hasHeartbeat: true,
    hasThermal: true,
    particleIntensity: 0.8,
  },
  {
    day: "04",
    label: "TRANSIT",
    title: "The Shayok Stealth",
    subTitle: "Hunder → Pangong Tso via Shayok Valley",
    emotionalHook: "Blue water against brown rock. A visual paradox at 14,270 ft.",
    description:
      "We trace the Shayok River — the 'River of Death.' A narrow, technical transit leading to the grand reveal: Pangong Lake. Tonight we occupy Merak, far from the tourist perimeter. Silence, stars, and the blue expanse.",
    tacticalNote: "Fording Shayok riverbed. Secure all loose equipment. Water depth: moderate.",
    altitude: 14270,
    temp: 4,
    oxygen: 62,
    dist: "180 km",
    coords: "33.89°N, 78.46°E",
    status: "BLUE_EXPOSURE",
    accentColor: "#00F0FF",
    img: "/hero-cinematic.jpg",
    hasHeartbeat: false,
    hasThermal: false,
    particleIntensity: 0.4,
  },
  {
    day: "05",
    label: "FRONTIER",
    title: "The Rezang La Memorial",
    subTitle: "Pangong → Hanle via Loma Sector",
    emotionalHook: "114 men. 13 Kumaon. The ground here remembers the sacrifice.",
    description:
      "Crossing the Rezang La war memorial. Every rock holds a story of 1962. We proceed to Hanle — the dark sky reserve of the subcontinent. Sangrak Resort waits in the shadow of the telescope.",
    tacticalNote: "Military checkpoint at Loma. Protocol: Compliance only. Secure photography permits.",
    altitude: 14760,
    temp: 2,
    oxygen: 60,
    dist: "210 km",
    coords: "32.77°N, 78.96°E",
    status: "FRONTIER_PROTOCOL",
    accentColor: "#39FF14",
    img: "/spiti/day4.png",
    hasHeartbeat: false,
    hasThermal: true,
    particleIntensity: 0.3,
  },
  {
    day: "06",
    label: "SUMMIT",
    title: "Umling La — 19,024 ft",
    subTitle: "Hanle → World's Highest Road → Hanle",
    emotionalHook: "You are standing on the highest motorable point on this planet.",
    description:
      "The ultimate objective. 19,024 feet. The road is asphalt, but the air is vacuum. You are higher than Everest Base Camp (South). Your engine gasps; your lungs adapt. A return to Hanle by dusk. Siege achieved.",
    tacticalNote: "MAXIMUM_ALTITUDE. Oxygen saturation monitored via real-time HUD.",
    altitude: 19024,
    temp: -10,
    oxygen: 42,
    dist: "150 km",
    coords: "32.68°N, 79.27°E",
    status: "SYSTEMS_MAXIMUM",
    accentColor: "#FF5200",
    img: "/spiti/day6.png",
    hasHeartbeat: true,
    hasThermal: false,
    particleIntensity: 1.0,
  },
  {
    day: "07",
    label: "SERENITY",
    title: "Moon Over Tso Moriri",
    subTitle: "Hanle → Chumur → Korzok",
    emotionalHook: "A high-altitude sapphire. Korzok is where time stops for good.",
    description:
      "The Chumur road transit. Barren, beautiful, brutal. Tso Moriri (Korzok) appears at 15,000 ft. Night at the Lake View Hotel. The Changpa nomads graze their pashmina goats in the distance. Absolute stillness.",
    tacticalNote: "Rough track through Chumur. Check suspension integrity. Remote sector.",
    altitude: 15000,
    temp: 0,
    oxygen: 58,
    dist: "190 km",
    coords: "32.96°N, 78.29°E",
    status: "NOMAD_PULSE",
    accentColor: "#00F0FF",
    img: "/spiti/day7.png",
    hasHeartbeat: false,
    hasThermal: false,
    particleIntensity: 0.5,
  },
  {
    day: "08",
    label: "DESCENT",
    title: "The Geothermal Pulse",
    subTitle: "Korzok → Puga → Chumathang Hot Springs → Leh",
    emotionalHook: "Steam from the earth. Hot water in an ice-field.",
    description:
      "Puga Valley's mystical geothermal vents. Borax and sulphur in the air. We soak in the Chumathang Hot Springs to wash off the dust of the siege. A return to the relative luxury of Leh. Hotel Yak Tail welcomes the warriors.",
    tacticalNote: "Thermal washing. Recovery phase. Civilization proximity: 60km.",
    altitude: 11480,
    temp: 12,
    oxygen: 72,
    dist: "220 km",
    coords: "34.15°N, 77.58°E",
    status: "RECOVERY_SIGNAL",
    accentColor: "#39FF14",
    img: "/hero-mountain.jpg",
    hasHeartbeat: false,
    hasThermal: true,
    particleIntensity: 0.2,
  },
  {
    day: "09",
    label: "RETURN",
    title: "Mission Complete",
    subTitle: "Leh → Departure",
    emotionalHook: "You are and are not the person who arrived 9 days ago.",
    description:
      "Final rendezvous. We escort you to Leh Airport. The Ladakh High Pass siege is over, but the terrain is now part of your operating system. Carry the silence with you.",
    tacticalNote: "Extraction complete. Systems: NORMAL. Memory: UPGRADED.",
    altitude: 11480,
    temp: 14,
    oxygen: 75,
    dist: "10 km",
    coords: "34.13°N, 77.56°E",
    status: "EXPEDITION_COMPLETE",
    accentColor: "#00F0FF",
    img: "/hero-mountain.jpg",
    hasHeartbeat: false,
    hasThermal: false,
    particleIntensity: 0,
  },
]

// ─── VEHICLE TIERS ───────────────────────────────────────────────────────────

export const vehicleTiers: VehicleTier[] = [
  {
    id: "shared",
    tier: "TIER 01",
    name: "The Shared Siege",
    vehicleName: "Expedition Urbania",
    vehicleSpec: "10 passengers // Oxygen on-board // High-ground clearance",
    stayType: "Curated Heritage Stays",
    staySpec: "Skiltang, Riverside, and Lake View setups",
    price: "₹48,500",
    priceNote: "per person, all-inclusive",
    seats: 10,
    perks: [
      "Tactical group dynamics — share the journey",
      "Fixed window seat rotation protocol",
      "All meals + hydration supplies included",
      "Lead guide + mechanic on-board",
    ],
    img: "/exp-ladakh.jpg",
    isRecommended: false,
    accentColor: "#00F0FF",
  },
  {
    id: "elite",
    tier: "TIER 02",
    name: "The Elite Recon",
    vehicleName: "Toyota Fortuner 4x4",
    vehicleSpec: "3 passengers // Custom suspension // Recovery gear",
    stayType: "Premium Boutique Resorts",
    staySpec: "Upgraded suites + Merak & Hanle best-in-class",
    price: "₹72,000",
    priceNote: "per person, all-inclusive",
    seats: 3,
    perks: [
      "Maximum off-road capability — 4x4 mandatory",
      "Personalized pace — stops on your command",
      "Elite guides with 15+ years experience",
      "Priority Hanle Telescope access booking assistance",
    ],
    img: "/hero-mountain.jpg",
    isRecommended: true,
    accentColor: "#39FF14",
  },
]

// ─── FIELD REPORTS (TESTIMONIALS) ────────────────────────────────────────────

export const fieldReports: FieldReport[] = [
  {
    id: "arjun",
    name: "Arjun K.",
    role: "Adventure Enthusiast",
    location: "Day 6, Umling La",
    quote:
      "I was at 19,000 feet and I felt safer than my commute in Mumbai. Girivah's attention to O2 levels and vehicle prep is surgical. This is the only way to experience Ladakh.",
    rating: 5,
    img: "/hero-cinematic.jpg",
    batchDate: "July 2025 Batch",
  },
]

// ─── MISSION SLOTS ───────────────────────────────────────────────────────────

export const missionSlots: MissionSlot[] = [
  { id: 1, filled: true, label: "CONFIRMED" },
  { id: 2, filled: true, label: "CONFIRMED" },
  { id: 3, filled: true, label: "CONFIRMED" },
  { id: 4, filled: false, label: "AVAILABLE" },
  { id: 5, filled: false, label: "AVAILABLE" },
  { id: 6, filled: false, label: "AVAILABLE" },
]

// ─── PAGE CONFIG ─────────────────────────────────────────────────────────────

export const spitiConfig = {
  nextBatchDate: new Date("2026-07-05T06:00:00"),
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919999999999",
  whatsappMessage:
    "Hi Girivah, I'm interested in the Ladakh High Pass expedition. Please share the details.",
  totalSeats: 6,
  filledSeats: 3,
}
