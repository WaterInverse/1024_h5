<template>
  <div class="container">
    <div class="header">
      <h2>月光生活家</h2>
      <div>本月 ¥0.00</div>
    </div>

    <QuickEntry />

    <div class="card-list">
      <TimelineCard v-for="e in store.entries" :key="e.id" :entry="e" @open="openDetail" />
    </div>

    <div style="height:120px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuickEntry from '../components/QuickEntry.vue'
import TimelineCard from '../components/TimelineCard.vue'
import { useEntryStore } from '../store'
export default defineComponent({
  name: 'Home',
  components: { QuickEntry, TimelineCard },
  setup() {
    const store = useEntryStore()
    function openDetail(id: string) {
      // navigate to detail
    }
    return { store, openDetail }
  }
})
</script>

<style scoped>
.container{padding-bottom:60px}
</style>
