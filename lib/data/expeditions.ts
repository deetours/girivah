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
  }
];

export function getExpeditionBySlug(slugOrId: string): Expedition | undefined {
  return EXPEDITIONS.find(exp => exp.slug === slugOrId || exp.id === slugOrId);
}
