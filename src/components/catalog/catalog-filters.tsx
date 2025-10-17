import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import type { InventoryStatus } from '@/lib/data/catalog-data'
import { cn } from '@/lib/utils'

export type CatalogFiltersProps = {
  categories: string[]
  inventoryStatuses: InventoryStatus[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  activeStatuses: InventoryStatus[]
  onStatusToggle: (status: InventoryStatus) => void
  onReset: () => void
}

const inventoryStatusLabels: Record<InventoryStatus, string> = {
  in_stock: 'In stock',
  low_stock: 'Low stock',
  backorder: 'Backorder',
  preorder: 'Pre-order',
}

export function CatalogFilters({
  categories,
  inventoryStatuses,
  selectedCategory,
  onCategoryChange,
  activeStatuses,
  onStatusToggle,
  onReset,
}: CatalogFiltersProps) {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="grid w-full gap-4 sm:grid-cols-2 sm:items-center lg:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="catalog-category">Category</Label>
          <Select
            id="catalog-category"
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-2">
          <Label>Inventory status</Label>
          <div className="flex flex-wrap gap-2">
            {inventoryStatuses.map((status) => {
              const isActive = activeStatuses.includes(status)
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => onStatusToggle(status)}
                  className={cn(
                    'rounded-full border px-3 py-1 text-sm font-medium transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isActive
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-background text-muted-foreground',
                  )}
                  aria-pressed={isActive}
                >
                  {inventoryStatusLabels[status]}
                </button>
              )
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>Active filters:</span>
            {selectedCategory !== 'all' ? (
              <Badge variant="outline" key={selectedCategory} className="capitalize">
                {selectedCategory}
              </Badge>
            ) : null}
            {activeStatuses.length > 0
              ? activeStatuses.map((status) => (
                  <Badge key={status} variant="outline" className="capitalize">
                    {inventoryStatusLabels[status]}
                  </Badge>
                ))
              : selectedCategory === 'all' && <span>None</span>}
          </div>
        </div>
      </div>
      <Button type="button" variant="ghost" onClick={onReset} className="self-start">
        Reset filters
      </Button>
    </div>
  )
}
