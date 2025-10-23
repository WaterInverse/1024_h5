export type Category =
  | '餐饮'
  | '购物'
  | '交通'
  | '娱乐'
  | '美妆护肤'
  | '学习'
  | '其他'

export interface Entry {
  id: string
  amount: number
  category: Category
  date: string // YYYY-MM-DD
  remark?: string
  photos?: string[] // base64 or file URL
  createdAt: string
}

export interface Budget {
  category: Category | '全部'
  month: string // YYYY-MM
  limit: number
}
