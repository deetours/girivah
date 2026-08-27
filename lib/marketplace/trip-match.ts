import { EXPEDITIONS, Expedition } from '@/lib/data/expeditions'
import { getTypeSlug } from './facets'

export interface TripMatchAnswers {
  mode: 'motorcycle' | '4x4' | 'trek'
  cold: 'extreme' | 'moderate'
  duration: 'short' | 'long'
}

/**
 * Picks the best real Expedition for a set of quiz answers. Mode is a hard
 * filter (it's the strongest signal and keeps the result category-correct);
 * cold/duration break ties among the remaining candidates.
 */
export function matchTrip(answers: TripMatchAnswers): Expedition {
  const candidates = EXPEDITIONS.filter((e) => getTypeSlug(e) === answers.mode)
  const pool = candidates.length > 0 ? candidates : EXPEDITIONS

  function score(e: Expedition) {
    let s = 0
    const isExtremeSeason = /jan|feb|dec/i.test(e.season)
    if ((answers.cold === 'extreme') === isExtremeSeason) s += 1
    const days = parseInt(e.duration, 10) || 0
    const isLong = days >= 8
    if ((answers.duration === 'long') === isLong) s += 1
    return s
  }

  return [...pool].sort((a, b) => score(b) - score(a))[0]
}
