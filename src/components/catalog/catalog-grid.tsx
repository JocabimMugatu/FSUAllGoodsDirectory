import { useMemo } from 'react'
import { CatalogCard } from '@/components/catalog/catalog-card'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { CatalogItem } from '@/lib/data/catalog-data'

const SKELETON_ITEMS = Array.from({ length: 12 }, (_, index) => index)

export type CatalogGridProps = {
  items: CatalogItem[]
  isLoading: boolean
}

export function CatalogGrid({ items, isLoading }: CatalogGridProps) {
  const cardList = useMemo(() => items.map((item) => <CatalogCard key={item.id} item={item} />), [items])

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {isLoading
        ? SKELETON_ITEMS.map((item) => (
            <Card key={`skeleton-${item}`} className="flex h-full flex-col overflow-hidden">
              <CardContent className="flex flex-1 flex-col gap-4 p-4">
                <Skeleton className="aspect-square w-full rounded-md" />
                <Skeleton className="h-5 w-3/5" />
                <Skeleton className="h-4 w-2/5" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))
        : cardList}
    </div>
  )
}
