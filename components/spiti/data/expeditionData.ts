// ─── EXPEDITION DATA — SPITI VALLEY ───────────────────────────────────────────

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

// ─── 8-DAY EXPEDITION DATA ───────────────────────────────────────────────────

export const expeditionDays: ExpeditionDay[] = [
  {
    day: "01",
    label: "ORIGIN",
    title: "The Forbidden Circuit",
    subTitle: "Shimla → Narkanda Sector",
    emotionalHook: "2,500 feet. Engine ignition. Pine replaces concrete.",
    description:
      "The city sheds like old skin. You leave behind the noise, the deadlines, the version of yourself that needed them. Tonight you sleep where the air begins to thin and the silence is not absence — it is presence.",
    tacticalNote: "Pine replaces concrete at km 180. Engine temperature: optimal.",
    altitude: 7500,
    temp: 14,
    oxygen: 92,
    dist: "250 km",
    coords: "31.51°N, 77.79°E",
    status: "SYSTEMS_STABLE",
    accentColor: "#00F0FF",
    img: "/spiti/day1.png",
    hasHeartbeat: false,
    hasThermal: false,
    particleIntensity: 0,
  },
  {
    day: "02",
    label: "VECTOR",
    title: "Baspa Valley",
    subTitle: "Sangla → Chitkul Sector",
    emotionalHook: "11,000 feet. The last village before the border.",
    description:
      "Chitkul — the last inhabited village on the Indo-Tibetan border. Beyond this point, no cell signal, no headlines, no performance. Just terrain that exists on its own terms, indifferent to your presence.",
    tacticalNote: "Last Indian village. No cell signal beyond this marker.",
    altitude: 11320,
    temp: 8,
    oxygen: 85,
    dist: "380 km",
    coords: "31.35°N, 78.44°E",
    status: "ALTITUDE_ALERT",
    accentColor: "#39FF14",
    img: "/spiti/day2.png",
    hasHeartbeat: false,
    hasThermal: false,
    particleIntensity: 0.2,
  },
  {
    day: "03",
    label: "ASCENT",
    title: "Kinnaur Kailash",
    subTitle: "Sacred Pillar Sector",
    emotionalHook: "The holy pillars turn gold at 17:42 local. Camera ready.",
    description:
      "A 79-foot natural rock obelisk that Hindus believe is Shiva's home. At dusk, the granite pillar catches the last light and holds it while everything else goes dark. Some silences are theological.",
    tacticalNote: "The holy pillars turn gold at 17:42 local. Camera ready.",
    altitude: 9710,
    temp: 10,
    oxygen: 88,
    dist: "520 km",
    coords: "31.52°N, 78.58°E",
    status: "VISUAL_OPTIMAL",
    accentColor: "#FF5200",
    img: "/spiti/day3.png",
    hasHeartbeat: false,
    hasThermal: false,
    particleIntensity: 0.1,
  },
  {
    day: "04",
    label: "DESERT",
    title: "Raw Spiti",
    subTitle: "Tabo → Kaza Sector",
    emotionalHook: "1,000-year monastery. Monks who predate your nation.",
    description:
      "The landscape stops pretending to be Earth. Brown rock, no trees, a river that shouldn't exist at this altitude. Tabo monastery was founded in 996 CE. The monks have been counting their breaths since before your country had a name.",
    tacticalNote:
      "Terrain classification: ALIEN. Road width: 4.2m. Proceed single-file.",
    altitude: 10760,
    temp: 6,
    oxygen: 82,
    dist: "650 km",
    coords: "32.09°N, 78.38°E",
    status: "TERRAIN_ALIEN",
    accentColor: "#00F0FF",
    img: "/spiti/day4.png",
    hasHeartbeat: false,
    hasThermal: false,
    particleIntensity: 0.3,
  },
  {
    day: "05",
    label: "GRAVITY",
    title: "Dhankar Cliff Nest",
    subTitle: "12,470 ft — Structural Limit",
    emotionalHook: "A monastery balanced on a cliff. Gravity is a suggestion.",
    description:
      "Dhankar is built on a needle of rock 3,800 meters above sea level. No engineering logic explains it. The monks built it here because safety was never the point. From the rooftop, you understand the word 'perspective' for the first time.",
    tacticalNote:
      "Monastery risk classification: CRITICAL (cliff-edge). No vertical movement at night.",
    altitude: 12470,
    temp: 4,
    oxygen: 78,
    dist: "750 km",
    coords: "32.09°N, 78.17°E",
    status: "STRUCTURAL_LIMIT",
    accentColor: "#39FF14",
    img: "/spiti/day4.png",
    hasHeartbeat: false,
    hasThermal: false,
    particleIntensity: 0.5,
  },
  {
    day: "06",
    label: "APEX",
    title: "The Roof",
    subTitle: "Kunzum Pass — 14,500 ft",
    emotionalHook: "Fossils on the ocean floor. You are standing on the Tethys Sea.",
    description:
      "At 14,500 feet, the fossils of ocean creatures are embedded in the rock beneath your boots. This was the floor of the Tethys Ocean 50 million years ago. You are standing at altitude on what was once the deepest point of a sea. The Himalayas are a reminder that geology does not negotiate.",
    tacticalNote:
      "Fossil field at 14,700 ft. You are standing on the Tethys ocean floor.",
    altitude: 14500,
    temp: 2,
    oxygen: 72,
    dist: "840 km",
    coords: "32.39°N, 77.76°E",
    status: "ATMOSPHERE_THIN",
    accentColor: "#FF5200",
    img: "/exp-spiti.jpg",
    hasHeartbeat: false,
    hasThermal: true,
    particleIntensity: 0.7,
  },
  {
    day: "07",
    label: "CELESTIAL",
    title: "Chandratal — Moon Lake",
    subTitle: "15,059 ft — Maximum Altitude",
    emotionalHook: "Stars wake at the edge of the world. The Milky Way is not a metaphor.",
    description:
      "Chandratal. The Moon Lake. At 15,059 feet, the atmosphere is thin enough that you can see stars that don't exist at sea level. The Milky Way is not a smear — it is a structure. The silence here is geological. Your heartbeat is the loudest thing for miles.",
    tacticalNote:
      "Kunzum Pass: highest mandatory crossing. SpO₂ check mandatory before descent.",
    altitude: 15059,
    temp: -2,
    oxygen: 65,
    dist: "920 km",
    coords: "32.49°N, 77.61°E",
    status: "CRITICAL_IMMERSION",
    accentColor: "#00F0FF",
    img: "/hero-cinematic.jpg",
    hasHeartbeat: true,
    hasThermal: false,
    particleIntensity: 0.9,
  },
  {
    day: "08",
    label: "RETURN",
    title: "The Descent",
    subTitle: "Atal Tunnel — Civilization Resumes",
    emotionalHook: "Siege complete. You are not the same person who left.",
    description:
      "The Atal Tunnel seals the valley behind you. On one side: the silence, the altitude, the version of yourself that was forged there. On the other: Manali, signal bars, and the ordinary world that will never look quite the same again.",
    tacticalNote: "Atal Tunnel: civilization resumes. Expedition status: COMPLETE.",
    altitude: 6725,
    temp: 12,
    oxygen: 94,
    dist: "1,200 km",
    coords: "32.34°N, 77.19°E",
    status: "EXPEDITION_COMPLETE",
    accentColor: "#39FF14",
    img: "/hero-mountain.jpg",
    hasHeartbeat: false,
    hasThermal: false,
    particleIntensity: 0.4,
  },
]

// ─── VEHICLE TIERS ───────────────────────────────────────────────────────────

export const vehicleTiers: VehicleTier[] = [
  {
    id: "shared",
    tier: "TIER 01",
    name: "The Shared Siege",
    vehicleName: "Turbo Urbania",
    vehicleSpec: "8 passengers // Climate-adapted // Turbo diesel",
    stayType: "Premium Homestays",
    staySpec: "Hand-picked by our lead scouts",
    price: "₹34,500",
    priceNote: "per person, all-inclusive",
    seats: 8,
    perks: [
      "Highest community ratio — expedition bonding",
      "Rotating window seats — everyone gets the view",
      "All meals included — curated local cuisine",
      "Veteran co-explorers on every batch",
    ],
    img: "/exp-spiti.jpg",
    isRecommended: false,
  },
  {
    id: "elite",
    tier: "TIER 02",
    name: "The Elite Circuit",
    vehicleName: "Toyota Innova Hycross",
    vehicleSpec: "4 passengers // 2024 model // Climate control",
    stayType: "Boutique Mountain Hotels",
    staySpec: "Plus one premium camp night at Chandratal",
    price: "₹58,000",
    priceNote: "per person, all-inclusive",
    seats: 4,
    perks: [
      "Private 4-seat vehicle — full legroom",
      "Personal expedition guide assigned",
      "Dedicated driver with 10+ years Spiti experience",
      "Boutique hotels + one luxury camp night",
    ],
    img: "/exp-spiti.jpg",
    isRecommended: true,
  },
  {
    id: "sovereign",
    tier: "TIER 03",
    name: "The Sovereign",
    vehicleName: "Custom Luxury Urbania",
    vehicleSpec: "Captain seats // Privacy divider // Satellite phone",
    stayType: "Ultra-Luxury Insulated Camps",
    staySpec: "Private ensuite // Butler service",
    price: "₹85,000",
    priceNote: "per person, all-inclusive",
    seats: 6,
    perks: [
      "Private chef — curated high-altitude menu",
      "Dedicated expedition doctor on board",
      "Satellite phone + emergency evac protocol",
      "Bespoke routing — we adjust the map for you",
    ],
    img: "/exp-ladakh.jpg",
    isRecommended: false,
  },
]

// ─── FIELD REPORTS (TESTIMONIALS) ────────────────────────────────────────────

export const fieldReports: FieldReport[] = [
  {
    id: "vikram",
    name: "Vikram S.",
    role: "CEO, TechFlow",
    location: "Day 7, Chandratal Lake",
    quote:
      "At 15,000 feet I stopped thinking about quarterly targets. Girivah doesn't give you a scenic drive. They give you a context shift. I returned and rebuilt my company's strategy from scratch.",
    rating: 5,
    img: "/hero-cinematic.jpg",
    batchDate: "June 2025 Batch",
  },
  {
    id: "ananya",
    name: "Ananya Ray",
    role: "Visual Storyteller",
    location: "Day 5, Dhankar",
    quote:
      "I've shot on 6 continents. Nothing has given me what Dhankar gave me at dawn. Girivah knows exactly when to stop the vehicle and say nothing. That restraint is their genius.",
    rating: 5,
    img: "/hero-cinematic.jpg",
    batchDate: "May 2025 Batch",
  },
  {
    id: "rohan",
    name: "Dr. Rohan Mehra",
    role: "Cardiac Surgeon",
    location: "Day 6, Kunzum Pass",
    quote:
      "The oxygen monitoring here is better than most hospitals I've worked in. SpO₂ checks every morning, staged acclimatization, O₂ reserves in every vehicle. I was never worried. That allowed me to be fully present.",
    rating: 5,
    img: "/hero-cinematic.jpg",
    batchDate: "September 2025 Batch",
  },
  {
    id: "sujata",
    name: "Sujata Kapoor",
    role: "Architect",
    location: "Day 3, Kinnaur",
    quote:
      "Every monastery, every gorge — Girivah frames them like a cinematographer. I didn't just see Spiti. I experienced a sequence designed for maximum emotional impact.",
    rating: 5,
    img: "/hero-cinematic.jpg",
    batchDate: "August 2025 Batch",
  },
]

// ─── MISSION SLOTS ───────────────────────────────────────────────────────────

export const missionSlots: MissionSlot[] = [
  { id: 1, filled: true, label: "CONFIRMED" },
  { id: 2, filled: true, label: "CONFIRMED" },
  { id: 3, filled: true, label: "CONFIRMED" },
  { id: 4, filled: true, label: "CONFIRMED" },
  { id: 5, filled: false, label: "AVAILABLE" },
  { id: 6, filled: false, label: "AVAILABLE" },
  { id: 7, filled: false, label: "AVAILABLE" },
  { id: 8, filled: false, label: "AVAILABLE" },
]

// ─── PAGE CONFIG ─────────────────────────────────────────────────────────────

export const spitiConfig: SpitiConfig = {
  nextBatchDate: new Date("2026-05-15T06:00:00"),
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919999999999",
  whatsappMessage:
    "Hi Girivah, I'm interested in the Spiti Valley expedition. Please share the full brief and available dates.",
  totalSeats: 8,
  filledSeats: 4,
}
