import re

with open('app/booking/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
content = content.replace(
    "import { MarketplaceItem } from '@/lib/types/marketplace'",
    "import { MarketplaceItem } from '@/lib/types/marketplace'\nimport { useJourneyStore } from '@/lib/store/journey-store'\nimport { getItemByKind } from '@/lib/data/marketplace-lookup'"
)

# Update Step type
content = content.replace(
    "type Step = 'expedition' | 'dates' | 'travelers' | 'details' | 'review' | 'success'",
    "type Step = 'trip-review' | 'expedition' | 'dates' | 'travelers' | 'details' | 'review' | 'success'"
)

# Update submitBookingApplication call
content = content.replace(
    "expeditionId: data.expedition,",
    "expeditionId: tripItems.length > 0 ? 'multi-trip' : data.expedition,\n      items: tripItems.length > 0 ? tripItems.map(i => ({ slug: i.slug, kind: i.kind })) : [{ slug: data.expedition, kind: data.kind }],"
)

with open('app/booking/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
