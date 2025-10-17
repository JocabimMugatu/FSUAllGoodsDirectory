import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CatalogItem, InventoryStatus } from '@/lib/data/catalog-data'
import { staticCatalogItems } from '@/lib/data/catalog-data'

export type CatalogDataContextValue = {
  items: CatalogItem[]
  isLoading: boolean
  isEmpty: boolean
  categories: string[]
  inventoryStatuses: InventoryStatus[]
  averagePrice: number
  getItemById: (id: string) => CatalogItem | undefined
}

const CatalogDataContext = createContext<CatalogDataContextValue | undefined>(undefined)

const INVENTORY_STATUSES: InventoryStatus[] = ['in_stock', 'low_stock', 'backorder', 'preorder']

const EMPTY_STATE: CatalogDataContextValue = {
  items: [],
  isLoading: true,
  isEmpty: false,
  categories: [],
  inventoryStatuses: INVENTORY_STATUSES,
  averagePrice: 0,
  getItemById: () => undefined,
}

const hydrateItems = (): Promise<CatalogItem[]> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      resolve(staticCatalogItems)
    }, 220)
  })
}

export function CatalogDataProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CatalogItem[] | null>(null)

  useEffect(() => {
    let mounted = true

    hydrateItems().then((dataset) => {
      if (mounted) {
        setItems(dataset)
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  const value = useMemo<CatalogDataContextValue>(() => {
    if (items === null) {
      return EMPTY_STATE
    }

    const categories = Array.from(new Set(items.map((item) => item.category))).sort((a, b) =>
      a.localeCompare(b),
    )

    const averagePrice =
      items.length > 0 ? items.reduce((total, item) => total + item.price, 0) / items.length : 0

    const getItemById = (id: string) => items.find((item) => item.id === id)

    return {
      items,
      isLoading: false,
      isEmpty: items.length === 0,
      categories,
      inventoryStatuses: INVENTORY_STATUSES,
      averagePrice,
      getItemById,
    }
  }, [items])

  return <CatalogDataContext.Provider value={value}>{children}</CatalogDataContext.Provider>
}

export function useCatalogData() {
  const context = useContext(CatalogDataContext)

  if (context === undefined) {
    throw new Error('useCatalogData must be used within a CatalogDataProvider')
  }

  return context
}
