<template>
  <form class="quick-entry" @submit.prevent="onSubmit">
    <div class="row">
      <select v-model="category" required>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
      <input type="number" v-model.number="amount" placeholder="金额" step="0.01" required />
    </div>

    <div class="row">
      <input type="date" v-model="date" />
      <input type="file" accept="image/*" @change="onPhoto" />
    </div>

    <textarea v-model="remark" placeholder="备注（可选）"></textarea>

    <div class="actions">
      <button type="submit">记一笔</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useEntryStore } from '../store'
import { v4 as uuidv4 } from 'uuid'
import type { Category } from '../types'

export default defineComponent({
  name: 'QuickEntry',
  setup() {
    const categories: Category[] = ['餐饮','购物','交通','娱乐','美妆护肤','学习','其他']
    const category = ref<Category>('餐饮')
    const amount = ref<number | null>(null)
    const date = ref<string>(new Date().toISOString().slice(0,10))
    const remark = ref<string>('')
    const photos = ref<string[]>([])
    const store = useEntryStore()

    function onPhoto(e: Event) {
      const input = e.target as HTMLInputElement
      const file = input.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        photos.value.push(reader.result as string)
      }
      reader.readAsDataURL(file)
    }

    function onSubmit() {
      if (!amount.value || amount.value <= 0) return
      const entry = {
        id: uuidv4(),
        amount: Number(amount.value.toFixed(2)),
        category: category.value,
        date: date.value,
        remark: remark.value,
        photos: photos.value,
        createdAt: new Date().toISOString()
      }
      store.addEntry(entry)
      amount.value = null
      remark.value = ''
      photos.value = []
      category.value = '餐饮'
    }

    return { categories, category, amount, date, remark, onPhoto, onSubmit }
  }
})
</script>

<style scoped>
.quick-entry{padding:12px}
.row{display:flex;gap:8px;margin-bottom:8px}
input, select, textarea{flex:1;padding:8px;border-radius:6px;border:1px solid #eee}
.actions{display:flex;justify-content:flex-end}
button{background:#ff7a7a;color:#fff;padding:8px 14px;border-radius:8px;border:none}
</style>
