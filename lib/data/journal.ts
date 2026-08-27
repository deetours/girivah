export type JournalArticle = {
  id: string
  title: string
  category: string
  excerpt: string
  image: string
  date: string
  issue?: string
  featured?: boolean
  author: string
  authorTitle: string
  authorBio: string
  authorImage: string
  readTime: string
  body: string[]
  pullQuote: string
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'the-silence-of-spiti',
    title: 'The Silence of Spiti',
    category: 'Field Notes',
    excerpt: 'A meditation on emptiness. We rode 400 kilometers into the high cold desert to understand what happens when the noise finally stops.',
    image: '/hero-mountain.jpg',
    date: 'OCT 12, 2024',
    issue: 'Vol. 01, No. 03',
    featured: true,
    author: 'Arjun Mehta',
    authorTitle: 'Lead Expedition Controller',
    authorBio: 'UIAGM Certified lead guide. Specializes in overland traverses across Zanskar and Lahaul-Spiti regions. Oversees all protocol decisions.',
    authorImage: '/hero-cinematic.jpg',
    readTime: '8 Min Read',
    pullQuote: 'The mountains do not care about your ambition, your schedule, or your anxiety. They simply exist, and in their presence, you must do the same.',
    body: [
      'We left Kaza entirely before dawn, not because the itinerary demanded it, but because the cold made sleeping impossible anyway. The high desert strips you bare. Up here, every unnecessary thought freezes and cracks away.',
      'Entering the Spiti valley, the landscape resembles less a place on Earth and more a transmission from Mars. The silence is profound — not just an absence of noise, but a heavy, physical presence that presses against your eardrums.',
      'In our connected lives, silence is terrifying. We construct elaborate mechanisms to avoid it: podcasts on the commute, music in the shower, notifications vibrating against our thighs. We are terrified of the void because the void forces us to look inward.',
      'But here, sitting beside the churning gray waters of the Spiti River, surrounded by thousand-foot cliffs of crumbling shale, the void is inescapable. At first, it induces a low-grade panic. You check for a signal (there is none). You reach for the radio (static). You look at your companions — they are staring at the ridgeline, silent.',
      'And then, eventually, the panic breaks. The constant narrational hum in your mind finally burns out. It takes three days at altitude to reach this state. By day four, the silence stops being a void and starts being a medium — a clear, cold fluid in which every thought, observation, and movement becomes incredibly sharp.',
      'This is exactly why we mandate no internet access. To hand you a connection to the outside world in the middle of Spiti would be to abort the very process you traveled here for. The silence is not a feature of the itinerary; it is the entire point.',
    ],
  },
  {
    id: 'oxygen-deprivation-and-clarity',
    title: 'Oxygen Deprivation & Clarity',
    category: 'Physiology',
    excerpt: 'Above 15,000 feet, the brain begins to slow down. But in that sluggishness, a profound sense of singular focus emerges.',
    image: '/exp-ladakh.jpg',
    date: 'SEP 2024',
    author: 'Dr. Priya Nair',
    authorTitle: 'Expedition Medical Advisor',
    authorBio: 'High-altitude physiologist consulting on every Girivah route above 4,500m. Formerly attached to two Indian Army mountaineering divisions.',
    authorImage: '/exp-ladakh.jpg',
    readTime: '6 Min Read',
    pullQuote: 'At altitude, the brain stops asking questions it cannot afford to answer. What remains is only what matters.',
    body: [
      'Above 15,000 feet, ambient oxygen saturation drops to roughly half of sea level. The body compensates — heart rate climbs, breathing quickens, red blood cell production ramps up over days — but the brain feels it first, and feels it as a kind of fog.',
      'Riders describe it consistently: thoughts arrive slower, but they arrive cleaner. Peripheral anxieties — deadlines, arguments, the accumulated static of ordinary life — simply stop registering. The brain, starved of surplus fuel, prioritizes only what is immediately in front of it: the road, the breath, the next switchback.',
      'This is not romantic exaggeration. Mild hypoxia measurably narrows attentional bandwidth. What gets cut is exactly the low-value mental noise most of us spend all day drowning in.',
      'It is also why we run mandatory acclimatization days before any pass above 16,000 feet, and why every guide on a Girivah route is trained to read the early, subtle signs of altitude sickness before a rider notices them in themselves. The clarity is real. So is the risk if you chase it carelessly.',
    ],
  },
  {
    id: 'chadar-trek-equipment',
    title: 'Surviving the Frozen River',
    category: 'Gear Guide',
    excerpt: "The Chadar trek doesn't just test your endurance, it tests your systems. A complete breakdown for -30°C in Zanskar.",
    image: '/exp-spiti.jpg',
    date: 'JAN 2024',
    author: 'Tenzin Norbu',
    authorTitle: 'Zanskar Route Lead',
    authorBio: 'Born in Padum. Has crossed the frozen Zanskar river more times than any other guide on the roster, in conditions ranging from -15°C to -35°C.',
    authorImage: '/exp-spiti.jpg',
    readTime: '10 Min Read',
    pullQuote: 'The ice does not care what brand your jacket is. It cares whether you understand it.',
    body: [
      'The Chadar — the frozen sheet that forms over the Zanskar river in deep winter — is not a trail. It is a temporary surface that exists only because the temperature has allowed it to, and it can change under your feet within a single day.',
      'Layering here is not about warmth alone; it is about moisture management. Sweat that cannot escape becomes ice against the skin within minutes of stopping. Every layer we issue is chosen for how it moves water vapor outward, not just how thick it is.',
      'Footwear is the single most consequential decision. Standard trekking boots fail on Chadar — they lack the flex and grip for uneven ice, and their insulation saturates fast. We outfit every rider with a boot system tested specifically on this route, checked and re-fitted the night before departure.',
      'None of this substitutes for guide judgment. The ice is read hour by hour, not planned once at basecamp. When Tenzin says turn back, the itinerary ends there — no exceptions, no negotiation.',
    ],
  },
  {
    id: 'the-art-of-the-motorcycle-expedition',
    title: 'The Art of the Motorcycle Expedition',
    category: 'Philosophy',
    excerpt: 'Why four wheels move the body, but two wheels move the soul. The inherent vulnerability of riding through the roof of the world.',
    image: '/hero-cinematic.jpg',
    date: 'AUG 2024',
    author: 'Arjun Mehta',
    authorTitle: 'Lead Expedition Controller',
    authorBio: 'UIAGM Certified lead guide. Specializes in overland traverses across Zanskar and Lahaul-Spiti regions. Oversees all protocol decisions.',
    authorImage: '/hero-cinematic.jpg',
    readTime: '7 Min Read',
    pullQuote: 'A car protects you from the mountain. A motorcycle introduces you to it.',
    body: [
      'A 4x4 puts a cabin between you and the pass. You experience Khardung La through glass, at a controlled temperature, with the wind reduced to a sound rather than a fact.',
      'A motorcycle removes that boundary entirely. The thin air is not weather outside a window — it is what you are breathing, right now, while your hands manage a machine that is also fighting the same altitude you are.',
      "That vulnerability is not a flaw in the experience. It is the experience. Every rider who has crossed a high pass on two wheels describes the same thing afterward: an unfiltered, almost embarrassingly direct sense of having actually been somewhere, rather than having been driven through it.",
      'We do not run motorcycle expeditions because they are more marketable. We run them because there is no other way we know of to put a rider in honest, physical contact with the roof of the world.',
    ],
  },
  {
    id: 'lamo-the-nammal',
    title: 'Keeper of the High Pass',
    category: 'Interviews',
    excerpt: 'An interview with Namgyal, who has lived above 14,000 feet for sixty-eight years, watching the glaciers recede and the roads appear.',
    image: '/exp-ladakh.jpg',
    date: 'JUL 2024',
    author: 'Priya Nair',
    authorTitle: 'Contributing Writer',
    authorBio: 'Traveled the Ladakh High Pass route in August 2024. Writes on the people who live along Girivah\'s routes, not just the routes themselves.',
    authorImage: '/hero-mountain.jpg',
    readTime: '9 Min Read',
    pullQuote: "'The road came, then the tourists came, then the shops came,' Namgyal said. 'The mountain did not change. Only what we do at its feet did.'",
    body: [
      "Namgyal has lived his entire life in a stone house above 14,000 feet, within sight of the pass that now carries a steady summer stream of motorcycles and 4x4s. He remembers when the road was a mule track.",
      "'People ask me if it is sad, watching so many strangers pass through now,' he said, pouring butter tea. 'It is not sad. It is different. The mountain has always had visitors — traders, monks, soldiers. Now it is travelers. The mountain does not mind who walks on it, as long as they walk carefully.'",
      "He has watched the glaciers above his home retreat noticeably in the last two decades — a fact he states plainly, without theatrics, the way someone describes a neighbor's slow illness.",
      "We asked what he wished visitors understood before they arrived. 'That they are guests,' he said. 'Not customers. A guest asks before it takes a photograph of my door. A customer does not.' It is the closest thing to a mission statement we have heard from anyone on this route, and we did not write it — he did.",
    ],
  },
]

export function getJournalArticleById(id: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find(a => a.id === id)
}

export function getFeaturedArticle(): JournalArticle {
  return JOURNAL_ARTICLES.find(a => a.featured) ?? JOURNAL_ARTICLES[0]
}

export function getOtherArticles(): JournalArticle[] {
  return JOURNAL_ARTICLES.filter(a => !a.featured)
}
