import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MarketplaceItem } from '../types/marketplace'

export interface TripBagItem {
  key: string;
  slug: string;
  kind: MarketplaceItem['kind'];
  addedAt: number;
}

interface JourneyStore {
  items: TripBagItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<TripBagItem, 'key' | 'addedAt'>) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  hasItem: (key: string) => boolean;
  count: () => number;
  groupedByKind: () => {
    trip: TripBagItem[];
    vehicle: TripBagItem[];
    stay: TripBagItem[];
    experience: TripBagItem[];
  };
}

export const useJourneyStore = create<JourneyStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      
      addItem: (item) => {
        const key = `${item.kind}:${item.slug}`
        if (!get().hasItem(key)) {
          set((state) => ({
            items: [...state.items, { ...item, key, addedAt: Date.now() }]
          }))
        }
      },
      
      removeItem: (key) => set((state) => ({
        items: state.items.filter((i) => i.key !== key)
      })),
      
      clear: () => set({ items: [] }),
      
      hasItem: (key) => get().items.some((i) => i.key === key),
      
      count: () => get().items.length,
      
      groupedByKind: () => {
        const items = get().items
        return {
          trip: items.filter(i => i.kind === 'trip'),
          vehicle: items.filter(i => i.kind === 'vehicle'),
          stay: items.filter(i => i.kind === 'stay'),
          experience: items.filter(i => i.kind === 'experience')
        }
      }
    }),
    {
      name: 'girivah_trip_bag',
    }
  )
)
