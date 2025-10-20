import React from 'react'
import type { Item } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

export function ItemCard({ item }: { item: Item }) {
  const img = item.images[0]
  const price = formatPrice(item.price.value, item.price.currency)
  const availabilityVariant =
    item.availability.status === 'out_of_stock'
      ? 'outline'
      : item.availability.status === 'low_stock'
      ? 'secondary'
      : 'default'

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square w-full overflow-hidden bg-muted/30">
        <img
          src={img.url}
          alt={img.alt}
          width={img.width}
          height={img.height}
          loading="lazy"
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300 ease-out"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-base">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge>{item.category}</Badge>
          <Badge variant={availabilityVariant}>
            {item.availability.status === 'out_of_stock'
              ? 'Out of stock'
              : item.availability.status === 'low_stock'
              ? `Low stock (${item.availability.quantity})`
              : 'In stock'}
          </Badge>
        </div>
        <div className="text-lg font-semibold">{price}</div>
      </CardContent>
    </Card>
  )
}
