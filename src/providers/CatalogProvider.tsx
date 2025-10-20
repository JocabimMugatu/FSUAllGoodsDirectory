import React, { createContext, useContext } from 'react'
import type { Item, Category } from '../types'
import { items as seededItems } from '../data/items'
import { categories as seededCategories } from '../data/items'

interface CatalogContextValue {
  items: Item[]
  categories: Category[]
}

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined)

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value: CatalogContextValue = {
    items: seededItems,
    categories: seededCategories,
  }

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  )
}

export const useCatalog = (): CatalogContextValue => {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within a CatalogProvider')
  return ctx
}
