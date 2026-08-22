import { EXPEDITIONS, Expedition } from './expeditions'
import { vehicles, Vehicle } from './vehicles'
import { stays, Stay } from './stays'

export interface RouteGroup {
  regionSlug: string
  regionLabel: string
  trip: Expedition
  vehicle: Vehicle | null
  stay: Stay | null
}

export const ROUTE_GROUPS: RouteGroup[] = EXPEDITIONS.map(trip => ({
  regionSlug: trip.regionSlug,
  regionLabel: trip.location,
  trip,
  vehicle: vehicles.find(v => v.regionSlug === trip.regionSlug) ?? null,
  stay: stays.find(s => s.regionSlug === trip.regionSlug) ?? null,
}))
