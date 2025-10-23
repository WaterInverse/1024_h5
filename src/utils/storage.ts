import type { Entry } from '../types'

const KEY_ENTRIES = 'mi_entries_v1'
export function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(KEY_ENTRIES)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveEntries(entries: Entry[]) {
  localStorage.setItem(KEY_ENTRIES, JSON.stringify(entries))
}
