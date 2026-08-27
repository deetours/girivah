import { getExpeditionBySlug } from './expeditions'

// Single mock "active protocol" for the demo account — every account page
// (dashboard, dossier, medical) reads from this one source instead of
// each hardcoding its own copy of the booking.
export function getActiveBooking() {
  const expedition = getExpeditionBySlug('ladakh')
  const departs = new Date()
  departs.setDate(departs.getDate() + 47) // ~next available batch window

  return {
    id: '1',
    ref: 'GVH-39X1A',
    expedition,
    departsAt: departs,
    status: 'Confirmed' as const,
  }
}

export function formatDepartureDate(date: Date) {
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
}
