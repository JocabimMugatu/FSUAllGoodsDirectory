import React from 'react'
import { ITEMS } from '@/data/items'
import type { Item } from '@/types'

export type ItemsContextValue = {
  items: Item[]
  total: number
  page: number
  pageSize: number
  setPage: (page: number) => void
}

const ItemsContext = React.createContext<ItemsContextValue | undefined>(undefined)

export function ItemsProvider({ children, pageSize = 24 }: { children: React.ReactNode; pageSize?: number }) {
  const [page, setPage] = React.useState(1)

  const total = ITEMS.length

  const value = React.useMemo<ItemsContextValue>(() => {
    const start = (page - 1) * pageSize
    const end = Math.min(start + pageSize, total)
    const items = ITEMS.slice(start, end)
    return { items, total, page, pageSize, setPage }
  }, [page, pageSize])

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}

export function useItems() {
  const ctx = React.useContext(ItemsContext)
  if (!ctx) throw new Error('useItems must be used within an ItemsProvider')
  return ctx
}
