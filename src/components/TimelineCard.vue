<template>
  <div class="card" @click="$emit('open', entry.id)">
    <div class="left">
      <div class="icon">{{ categoryIcon }}</div>
    </div>
    <div class="body">
      <div class="top">
        <div class="cat">{{ entry.category }}</div>
        <div class="amount">¥{{ entry.amount.toFixed(2) }}</div>
      </div>
      <div class="bottom">
        <div class="date">{{ entry.date }}</div>
        <div class="remark" v-if="entry.remark">{{ entry.remark }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { Entry } from '../types'
export default defineComponent({
  name: 'TimelineCard',
  props: { entry: { type: Object as () => Entry, required: true } },
  setup(props) {
    const categoryIcon = computed(() => {
      const map: Record<string,string> = {
        餐饮: '🍽', 购物: '🛍', 交通: '🚌', 娱乐: '🎬', 美妆护肤: '💄', 学习: '📚', 其他: '🔖'
      }
      return map[props.entry.category] || '🔖'
    })
    return { categoryIcon }
  }
})
</script>

<style scoped>
.card{display:flex;padding:12px;border-radius:10px;background:#fff;margin:8px 0;box-shadow:0 1px 3px rgba(0,0,0,0.04)}
.left{width:48px;display:flex;align-items:center;justify-content:center}
.icon{font-size:22px}
.body{flex:1}
.top{display:flex;justify-content:space-between}
.cat{font-weight:600}
.amount{color:#ff6b6b}
.bottom{display:flex;justify-content:space-between;font-size:12px;color:#888}
.remark{max-width:60%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
</style>
