import React from 'react'
import { ItemsProvider, useItems } from '@/context/ItemsContext'
import { ItemCard } from '@/components/ItemCard'
import { Pagination } from '@/components/Pagination'

function CatalogGrid() {
  const { items, total, page, pageSize, setPage } = useItems()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">FSU Catalog</h1>
        <p className="text-sm text-muted-foreground">{total.toLocaleString()} items</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <ItemCard key={item.sku} item={item} />
        ))}
      </div>

      <Pagination
        className="mt-8"
        page={page}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  )
}

export default function App() {
  return (
    <ItemsProvider pageSize={25}>
      <CatalogGrid />
    </ItemsProvider>
  )
}
