import { MarketplaceItem } from '../types/marketplace';

export type ElevationTimelineItem = {
  day: string;
  location: string;
  elevation: number;
  elevLabel: string;
  title: string;
  desc: string;
};

export type GuideLeader = {
  name: string;
  title: string;
  certifications: string;
  evacuations: string;
};

export type Expedition = MarketplaceItem & {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  regionSlug: string;
  duration: string;
  price: string;
  location: string;
  maxElevation: string;
  elevationNum: number;
  spotsLeft: number;
  season: string;
  departs: string;
  image: string;
  tags: string[];
  elevationTimeline: ElevationTimelineItem[];
  included: string[];
  leader: GuideLeader;
};

export const EXPEDITIONS: Expedition[] = [
  {
    id: '1',
    slug: 'ladakh',
    title: 'Ladakh High Pass',
    kind: 'trip',
    fromPrice: 45000,
    media: [{ src: '/exp-ladakh.jpg', alt: 'Ladakh High Pass' }],
    availability: 'available',
    providerId: 'girivah',
    subtitle: 'The ultimate motorcycle pilgrimage through the highest passes on Earth.',
    type: 'Motorcycle',
    regionSlug: 'ladakh',
    duration: '14 Days',
    price: '₹ 45,000',
    location: 'Ladakh, India',
    maxElevation: '18,380 ft',
    elevationNum: 18380,
    spotsLeft: 3,
    season: 'Jun — Sep',
    departs: '23 Days',
    image: '/exp-ladakh.jpg',
    tags: ['Khardung La', 'Pangong Tso', 'Zanskar'],
    elevationTimeline: [
      { day: '01', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Arrival & Acclimatization', desc: 'Rest. Drink water. The altitude demands respect. Evening briefing and Royal Enfield 500 handover.' },
      { day: '02', location: 'Khardung La', elevation: 17582, elevLabel: '17,582 ft', title: 'The Baptism by Fire', desc: 'We cross the highest motorable pass in the world. The air is thin, your machine struggles. You push through.' },
      { day: '03', location: 'Nubra Valley', elevation: 10100, elevLabel: '10,100 ft', title: 'Descent into the Desert', desc: 'Sand dunes and camels in the shadow of Himalayan giants. A surreal contrast that resets your reference.' },
      { day: '08', location: 'Pangong Tso', elevation: 14270, elevLabel: '14,270 ft', title: 'The Grand Blue Expanse', desc: 'Riding alongside the Shyok River. Off-road sections test your balance. The lake appears without warning.' },
      { day: '12', location: 'Chang La', elevation: 17688, elevLabel: '17,688 ft', title: 'The Second Summit', desc: 'The third highest motorable pass. The body has adapted. You ride it differently now — with quiet authority.' },
      { day: '14', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Final Descent. Transformation.', desc: ' 14 days ago you arrived a traveler. You leave an expedition rider. The mountains rearranged something in you.' },
    ],
    included: [
      'Royal Enfield Himalayan 411cc (maintained)',
      'Fuel for the entire route',
      'UIAGM Certified Lead Guide',
      'Support 4×4 with oxygen & medic',
      'All accommodations & meals',
    ],
    leader: {
      name: 'Arjun Mehta',
      title: 'Lead Expedition Guide · 14 Years in the Zanskar',
      certifications: 'UIAGM · Wilderness First Responder',
      evacuations: '0 Evacuations in 14 years',
    },
  },
  {
    id: '2',
    slug: 'spiti',
    title: 'Spiti Circuit',
    kind: 'trip',
    fromPrice: 55000,
    media: [{ src: '/exp-spiti.jpg', alt: 'Spiti Circuit' }],
    availability: 'available',
    providerId: 'girivah',
    subtitle: 'A high-altitude 4x4 overland traverse through the forgotten valleys of Spiti.',
    type: '4×4 Overland',
    regionSlug: 'spiti',
    duration: '10 Days',
    price: '₹ 55,000',
    location: 'Spiti Valley, India',
    maxElevation: '15,059 ft',
    elevationNum: 15059,
    spotsLeft: 5,
    season: 'May — Oct',
    departs: '45 Days',
    image: '/exp-spiti.jpg',
    tags: ['Kunzum La', 'Key Monastery', 'Pin Valley'],
    elevationTimeline: [
      { day: '01', location: 'Shimla', elevation: 7467, elevLabel: '7,467 ft', title: 'The Ascent Begins', desc: 'Leaving the humid plains to rendezvous in the gateway of the Himalayas. Final vehicle checks.' },
      { day: '03', location: 'Kalpa', elevation: 9711, elevLabel: '9,711 ft', title: 'The Edge of Kinnaur', desc: 'Massive sheer drops and the mighty Kinner Kailash range. The roads narrow down to a single lane.' },
      { day: '05', location: 'Kaza', elevation: 12467, elevLabel: '12,467 ft', title: 'Entering the Void', desc: 'The landscape transitions into stark, arid mountain desert. Oxygen levels drop significantly.' },
      { day: '07', location: 'Kunzum La', elevation: 15059, elevLabel: '15,059 ft', title: 'The Roof of Spiti', desc: 'Tackling the most treacherous pass on the circuit. Snow walls and biting winds.' },
      { day: '10', location: 'Manali', elevation: 6725, elevLabel: '6,725 ft', title: 'Return to the Greens', desc: 'Descending through lush forests. The contrast is jarring after 10 days in the void.' },
    ],
    included: [
      'Expedition Equipped 4x4 Vehicle',
      'Convoy communications system',
      'UIAGM Certified Lead Guide',
      'Mechanic & Recovery Gear',
      'All accommodations & meals',
    ],
    leader: {
      name: 'Priya Sharma',
      title: 'Lead Overland Controller · 10 Years in Spiti',
      certifications: 'UIAGM · Off-road Recovery Expert',
      evacuations: '0 Evacuations in 10 years',
    },
  },
  {
    id: '3',
    slug: 'zanskar',
    title: 'Chadar Trek',
    kind: 'trip',
    fromPrice: 38000,
    media: [{ src: '/exp-ladakh.jpg', alt: 'Chadar Trek' }],
    availability: 'limited',
    providerId: 'girivah',
    subtitle: 'A high-stakes pedestrian traverse over the frozen Zanskar river in deep winter.',
    type: 'High-Altitude Trek',
    regionSlug: 'zanskar',
    duration: '9 Days',
    price: '₹ 38,000',
    location: 'Zanskar, India',
    maxElevation: '11,250 ft',
    elevationNum: 11250,
    spotsLeft: 1,
    season: 'Jan — Feb',
    departs: '12 Days',
    image: '/exp-ladakh.jpg',
    tags: ['Frozen River', 'Extreme Cold', 'Survival'],
    elevationTimeline: [
      { day: '01', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Arrival in the Deep Freeze', desc: 'Temperatures immediately hit -20°C. Heavy gear check and medical clearance.' },
      { day: '03', location: 'Tilat Sumdo', elevation: 10500, elevLabel: '10,500 ft', title: 'First Steps on Ice', desc: 'Learning the "penguin shuffle". The reality of walking on a frozen river sets in.' },
      { day: '05', location: 'Nerak', elevation: 11150, elevLabel: '11,150 ft', title: 'The Frozen Waterfall', desc: 'The most stunning visual of the trek. A 50-foot solid wall of blue ice.' },
      { day: '07', location: 'Shingra Koma', elevation: 10550, elevLabel: '10,550 ft', title: 'The Long Walk Back', desc: 'The ice shifts. Routes change daily. Following the river back to civilization.' },
      { day: '09', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Thaw out', desc: 'Hot showers and hot food after 9 days on the ice. A completely reset perspective on comfort.' },
    ],
    included: [
      'Sub-zero sleeping bags & tents',
      'Gumboots & Ice-cleats',
      'UIAGM Certified Ice Guide',
      'Porter support for heavy gear',
      'High-calorie mountain meals',
    ],
    leader: {
      name: 'Namgyal',
      title: 'Lead Ice Guide · Native Zanskari',
      certifications: 'UIAGM · Advanced Mountaineering',
      evacuations: '0 Evacuations in 18 years',
    },
  },
  {
    id: '4',
    slug: 'markha-valley',
    title: 'Markha Valley Trek',
    kind: 'trip',
    fromPrice: 32000,
    media: [{ src: '/exp-ladakh.jpg', alt: 'Markha Valley Trek' }],
    availability: 'available',
    providerId: 'girivah',
    subtitle: 'A high-altitude teahouse trek beneath Kang Yatze, through Ladakh\'s most storied valley.',
    type: 'High-Altitude Trek',
    regionSlug: 'ladakh',
    duration: '8 Days',
    price: '₹ 32,000',
    location: 'Ladakh, India',
    maxElevation: '17,257 ft',
    elevationNum: 17257,
    spotsLeft: 4,
    season: 'Jun — Sep',
    departs: '30 Days',
    image: '/exp-ladakh.jpg',
    tags: ['Kang Yatze', 'Kongmaru La', 'Teahouse Trek'],
    elevationTimeline: [
      { day: '01', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Arrival & Acclimatization', desc: 'Gear check and briefing. This is a walking expedition — the mountain sets the pace, not the machine.' },
      { day: '02', location: 'Skiu', elevation: 10500, elevLabel: '10,500 ft', title: 'Into the Valley', desc: 'Following the Markha River past willow groves and mani walls into the Hemis National Park interior.' },
      { day: '04', location: 'Hankar', elevation: 12700, elevLabel: '12,700 ft', title: 'Beneath Kang Yatze', desc: 'The 6,400m peak dominates the skyline. Nights get sharply colder as the valley narrows.' },
      { day: '06', location: 'Nimaling', elevation: 15500, elevLabel: '15,500 ft', title: 'The High Plateau', desc: 'A vast alpine meadow at the foot of the pass, grazed by yaks. Final acclimatization camp.' },
      { day: '07', location: 'Kongmaru La', elevation: 17257, elevLabel: '17,257 ft', title: 'The Pass', desc: 'A pre-dawn push over the trek\'s high point, then a long knee-jarring descent into Shang Sumdo.' },
      { day: '08', location: 'Leh', elevation: 11480, elevLabel: '11,480 ft', title: 'Return', desc: 'Eight days on foot, no engine between you and the terrain. A different kind of transformation than the road trips.' },
    ],
    included: [
      'UIAGM Certified Trekking Guide',
      'Porter & pack-animal support for gear',
      'Sub-zero tents & sleeping systems',
      'All trail meals',
      'Permits & Hemis National Park fees',
    ],
    leader: {
      name: 'Tsering Dolma',
      title: 'Lead Trekking Guide · 11 Years in the Markha',
      certifications: 'UIAGM · High-Altitude First Aid',
      evacuations: '0 Evacuations in 11 years',
    },
  },
  {
    id: '5',
    slug: 'zanskar-overland',
    title: 'Zanskar Valley Overland',
    kind: 'trip',
    fromPrice: 48000,
    media: [{ src: '/exp-ladakh.jpg', alt: 'Zanskar Valley Overland' }],
    availability: 'available',
    providerId: 'girivah',
    subtitle: 'A summer 4x4 traverse into Zanskar before the same river freezes into the Chadar — monasteries, gorges, and the Pensi La.',
    type: '4×4 Overland',
    regionSlug: 'zanskar',
    duration: '9 Days',
    price: '₹ 48,000',
    location: 'Zanskar, India',
    maxElevation: '14,436 ft',
    elevationNum: 14436,
    spotsLeft: 5,
    season: 'Jul — Sep',
    departs: '38 Days',
    image: '/exp-ladakh.jpg',
    tags: ['Pensi La', 'Padum', 'Phugtal Monastery'],
    elevationTimeline: [
      { day: '01', location: 'Kargil', elevation: 8780, elevLabel: '8,780 ft', title: 'Staging & Vehicle Checks', desc: 'Final convoy briefing before the road narrows into single-lane cliffside driving.' },
      { day: '03', location: 'Pensi La', elevation: 14436, elevLabel: '14,436 ft', title: 'Gateway to Zanskar', desc: 'The pass that seals this valley off for eight months of the year. The Drang-Drung Glacier fills the windshield.' },
      { day: '05', location: 'Padum', elevation: 11800, elevLabel: '11,800 ft', title: 'The Zanskari Capital', desc: 'A high-desert town of monasteries and barley fields, ringed by unclimbed peaks.' },
      { day: '07', location: 'Phugtal Monastery', elevation: 11200, elevLabel: '11,200 ft', title: 'The Cliff Monastery', desc: 'A honeycomb of cells built into a cave, reachable only on foot from the last drivable point.' },
      { day: '09', location: 'Kargil', elevation: 8780, elevLabel: '8,780 ft', title: 'Return', desc: 'The same valley the Chadar trekkers cross frozen in winter — you\'ve just seen it running free.' },
    ],
    included: [
      'Expedition Equipped 4x4 Vehicle',
      'Convoy communications system',
      'UIAGM Certified Lead Guide',
      'Mechanic & Recovery Gear',
      'All accommodations & meals',
    ],
    leader: {
      name: 'Stanzin Dorjay',
      title: 'Lead Overland Controller · 9 Years in Zanskar',
      certifications: 'UIAGM · Off-road Recovery Expert',
      evacuations: '0 Evacuations in 9 years',
    },
  },
  {
    id: '6',
    slug: 'kinnaur-kailash',
    title: 'Kinnaur Kailash Trek',
    kind: 'trip',
    fromPrice: 36000,
    media: [{ src: '/hero-mountain.jpg', alt: 'Kinnaur Kailash Trek' }],
    availability: 'available',
    providerId: 'girivah',
    subtitle: 'A remote circumambulation of the sacred Kinnaur Kailash range, through apple-orchard villages and alpine ridgelines.',
    type: 'High-Altitude Trek',
    regionSlug: 'himachal',
    duration: '7 Days',
    price: '₹ 36,000',
    location: 'Himachal Pradesh, India',
    maxElevation: '17,000 ft',
    elevationNum: 17000,
    spotsLeft: 6,
    season: 'Jun — Oct',
    departs: '25 Days',
    image: '/hero-mountain.jpg',
    tags: ['Kinnaur', 'Chitkul', 'Charang Pass'],
    elevationTimeline: [
      { day: '01', location: 'Chitkul', elevation: 11320, elevLabel: '11,320 ft', title: 'Last Indian Village', desc: 'Arrival at the final settlement on the old Hindustan-Tibet trade road. Gear check and briefing.' },
      { day: '02', location: 'Rakcham', elevation: 10500, elevLabel: '10,500 ft', title: 'Into the Baspa Valley', desc: 'Pine forest and glacial river crossings, the sacred peak visible on clear stretches.' },
      { day: '04', location: 'Charang Ghati', elevation: 17000, elevLabel: '17,000 ft', title: 'The Circumambulation Point', desc: 'The trek\'s high point and namesake ridgeline — the closest a trail gets to the Kinnaur Kailash massif.' },
      { day: '06', location: 'Kafnu', elevation: 8600, elevLabel: '8,600 ft', title: 'Descent to Pin Valley', desc: 'A long drop back into apple-orchard country, the terrain softening with every hour.' },
      { day: '07', location: 'Reckong Peo', elevation: 7800, elevLabel: '7,800 ft', title: 'Return', desc: 'Hot food and a hot shower after a week on a ridgeline most travelers never see.' },
    ],
    included: [
      'UIAGM Certified Trekking Guide',
      'Porter & pack-animal support for gear',
      'Sub-zero tents & sleeping systems',
      'All trail meals',
      'Inner-line permits',
    ],
    leader: {
      name: 'Devendra Negi',
      title: 'Lead Trekking Guide · Native Kinnauri',
      certifications: 'UIAGM · Advanced Mountaineering',
      evacuations: '0 Evacuations in 13 years',
    },
  }
];

export function getExpeditionBySlug(slugOrId: string): Expedition | undefined {
  return EXPEDITIONS.find(exp => exp.slug === slugOrId || exp.id === slugOrId);
}
