import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, PackageSearch, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { CatalogItem } from '@/lib/data/catalog-data'
import { formatCurrency } from '@/lib/utils'
import { useCatalogData } from '@/providers/catalog-data-provider'

export function ItemDetailPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const { items, isLoading, getItemById } = useCatalogData()

  const item = useMemo(() => {
    if (!itemId) {
      return undefined
    }
    return getItemById(itemId)
  }, [getItemById, itemId])

  const relatedItems = useMemo(() => {
    if (!item) {
      return []
    }
    return items.filter((candidate) => candidate.category === item.category && candidate.id !== item.id).slice(0, 4)
  }, [items, item])

  if (isLoading) {
    return (
      <div className="container">
        <div className="mb-6">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Button>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="container space-y-8">
        <Button type="button" variant="ghost" onClick={() => navigate('/')} className="gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to catalog
        </Button>
        <Card className="mx-auto max-w-xl border-dashed">
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <PackageSearch className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Item not found</h2>
              <p className="text-sm text-muted-foreground">
                The catalog entry you were looking for is no longer available. Try exploring other items instead.
              </p>
            </div>
            <Button asChild>
              <Link to="/">Browse catalog</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container space-y-10">
      <div className="flex flex-col gap-4">
        <Button type="button" variant="ghost" onClick={() => navigate(-1)} className="self-start gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>
        <section className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="overflow-hidden rounded-lg border bg-card">
            <img
              src={item.imageUrl}
              alt={`High resolution photo of ${item.name}`}
              className="h-full w-full object-cover"
            />
          </div>
          <Card className="self-start">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="secondary" className="capitalize">
                  {item.category}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                  <span>{item.rating.toFixed(1)} rating</span>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-3xl font-semibold text-foreground">{formatCurrency(item.price)}</div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Highlights
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.badges.map((badge) => (
                    <Badge key={badge} variant="outline" className="capitalize">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Inventory status:{' '}
                  <span className="font-medium capitalize text-foreground">{item.inventoryStatus.replace('_', ' ')}</span>
                </p>
                <p>
                  SKU:
                  <span className="ml-1 font-medium text-foreground uppercase tracking-wide">{item.id}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#" onClick={(event) => event.preventDefault()}>
                    Add to cart
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#" onClick={(event) => event.preventDefault()}>
                    Save for later
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {relatedItems.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">More in {item.category}</h2>
            <Button asChild variant="link" className="px-0">
              <Link to="/">View catalog</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {relatedItems.map((related) => (
              <Card key={related.id} className="overflow-hidden">
                <Link to={`/item/${related.id}`} className="grid gap-3 p-4 transition hover:bg-muted/40">
                  <img
                    src={related.imageUrl}
                    alt={`Preview of ${related.name}`}
                    className="h-40 w-full rounded-md object-cover"
                    loading="lazy"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">{related.name}</p>
                    <p className="text-xs text-muted-foreground">{formatCurrency(related.price)}</p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
