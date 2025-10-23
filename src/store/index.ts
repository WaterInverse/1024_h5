import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Entry } from '../types'
import { loadEntries, saveEntries } from '../utils/storage'

export const useEntryStore = defineStore('entries', () => {
  const entries = ref<Entry[]>(loadEntries())

  function addEntry(e: Entry) {
    entries.value.unshift(e)
    saveEntries(entries.value)
  }

  function updateEntry(id: string, patch: Partial<Entry>) {
    const i = entries.value.findIndex(x => x.id === id)
    if (i >= 0) {
      entries.value[i] = { ...entries.value[i], ...patch }
      saveEntries(entries.value)
    }
  }

  function removeEntry(id: string) {
    entries.value = entries.value.filter(x => x.id !== id)
    saveEntries(entries.value)
  }

  return { entries, addEntry, updateEntry, removeEntry }
})
