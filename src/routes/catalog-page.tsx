import { useMemo, useState } from 'react'
import { PackageSearch } from 'lucide-react'
import { CatalogFilters } from '@/components/catalog/catalog-filters'
import { CatalogGrid } from '@/components/catalog/catalog-grid'
import { SearchBar } from '@/components/catalog/search-bar'
import { SortOption, SortSelect, sortOptionLabels } from '@/components/catalog/sort-select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { CatalogItem, InventoryStatus } from '@/lib/data/catalog-data'
import { formatCurrency } from '@/lib/utils'
import { useCatalogData } from '@/providers/catalog-data-provider'

const DEFAULT_SORT: SortOption = 'featured'
const DEFAULT_CATEGORY = 'all'

function sortCatalog(items: CatalogItem[], sortOption: SortOption) {
  const sorted = [...items]
  switch (sortOption) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'featured':
    default:
      return sorted.sort((a, b) => {
        if (b.rating === a.rating) {
          return a.price - b.price
        }
        return b.rating - a.rating
      })
  }
}

export function CatalogPage() {
  const { items, isLoading, isEmpty, categories, inventoryStatuses, averagePrice } = useCatalogData()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>(DEFAULT_CATEGORY)
  const [activeStatuses, setActiveStatuses] = useState<InventoryStatus[]>([])
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT)

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const filteredItems = useMemo(() => {
    if (items.length === 0) {
      return []
    }

    const matches = items.filter((item) => {
      const matchesCategory = selectedCategory === DEFAULT_CATEGORY || item.category === selectedCategory
      const matchesStatus = activeStatuses.length === 0 || activeStatuses.includes(item.inventoryStatus)

      if (!matchesCategory || !matchesStatus) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      const haystack = `${item.name} ${item.category} ${item.description} ${item.badges.join(' ')}`.toLowerCase()
      return haystack.includes(normalizedSearch)
    })

    return sortCatalog(matches, sortOption)
  }, [items, selectedCategory, activeStatuses, normalizedSearch, sortOption])

  const hasResults = filteredItems.length > 0
  const showEmptyState = !isLoading && !isEmpty && !hasResults

  const handleStatusToggle = (status: InventoryStatus) => {
    setActiveStatuses((prev) =>
      prev.includes(status) ? prev.filter((item) => item !== status) : [...prev, status].sort(),
    )
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategory(DEFAULT_CATEGORY)
    setActiveStatuses([])
    setSortOption(DEFAULT_SORT)
  }

  return (
    <div className="container space-y-8">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SearchBar value={searchTerm} onChange={setSearchTerm} onClear={() => setSearchTerm('')} />
        <div className="grid w-full gap-4 sm:grid-cols-2 sm:items-end lg:w-auto">
          <SortSelect value={sortOption} onChange={setSortOption} />
          <Card className="border-dashed bg-card/60">
            <CardContent className="flex flex-col gap-1 py-4 text-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Average price</span>
              {isLoading ? (
                <Skeleton className="h-6 w-24" />
              ) : (
                <span className="text-2xl font-semibold text-foreground">{formatCurrency(Math.round(averagePrice))}</span>
              )}
              <span className="text-xs text-muted-foreground">
                {isLoading ? 'Loading inventory…' : `${items.length} items indexed`}
              </span>
            </CardContent>
          </Card>
        </div>
      </section>

      <CatalogFilters
        categories={categories}
        inventoryStatuses={inventoryStatuses}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        activeStatuses={activeStatuses}
        onStatusToggle={handleStatusToggle}
        onReset={handleResetFilters}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        {isLoading ? (
          <Skeleton className="h-4 w-44" />
        ) : (
          <span>
            Showing <span className="font-semibold text-foreground">{filteredItems.length}</span> of{' '}
            <span className="font-semibold text-foreground">{items.length}</span> products
          </span>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {searchTerm ? (
            <Badge variant="outline">Search: “{searchTerm}”</Badge>
          ) : null}
          {sortOption !== DEFAULT_SORT ? (
            <Badge variant="outline">Sorted by {sortOptionLabels[sortOption]}</Badge>
          ) : null}
        </div>
      </div>

      {showEmptyState ? (
        <Card className="mx-auto max-w-2xl border-dashed">
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <PackageSearch className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">No matching items</h2>
              <p className="text-sm text-muted-foreground">
                Try broadening your search or resetting your filters to explore the full catalog.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <CatalogGrid items={filteredItems} isLoading={isLoading} />
      )}
    </div>
  )
}
