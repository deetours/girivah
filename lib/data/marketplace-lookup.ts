import { MarketplaceItem } from '../types/marketplace'
import { getExpeditionBySlug } from './expeditions'
import { getVehicleBySlug } from './vehicles'
import { getStayBySlug } from './stays'

export function getItemByKind(kind: MarketplaceItem['kind'], slug: string): MarketplaceItem | undefined {
  switch (kind) {
    case 'trip':
      return getExpeditionBySlug(slug)
    case 'vehicle':
      return getVehicleBySlug(slug)
    case 'stay':
      return getStayBySlug(slug)
    default:
      return undefined
  }
}
