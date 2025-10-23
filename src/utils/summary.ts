import type { Entry } from '../types'

export function generateMonthlyTag(entries: Entry[]) {
  const totals = new Map<string, number>()
  for (const e of entries) {
    totals.set(e.category, (totals.get(e.category) || 0) + e.amount)
  }
  const sorted = Array.from(totals.entries()).sort((a,b)=>b[1]-a[1])
  const [topCat, topAmt] = sorted[0] ?? ['无',0]
  let tag = '精打细算者'
  let desc = '本月花销总体平稳。'
  if (topCat === '餐饮') { tag = '美食探索家'; desc = `你在外就餐较多，餐饮消费占比最高（¥${topAmt.toFixed(2)}）。` }
  else if (topCat === '购物') { tag = '剁手小能手'; desc = `购物开销领先，建议合理规划大件消费。` }
  else if (topCat === '美妆护肤') { tag = '美容护肤党'; desc = `护肤美妆投入明显，保留好购买清单方便复盘。` }
  else if (topCat === '交通') { tag = '出行达人'; desc = `出行较多，注意交通费用合并与节约。` }
  else if (topCat === '娱乐') { tag = '生活享乐派'; desc = `娱乐消费居多，别忘了留出应急金。` }
  return { tag, desc, topCategory: topCat, topAmount: topAmt }
}
