"use client";
import * as React from 'react';
import type { Item } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ItemCard({ item }: { item: Item }) {
  return (
    <Card>
      <div className="img-wrap">
        {/* Using regular img to avoid Next Image domain config requirements */}
        <img src={item.images[0]?.url} alt={item.images[0]?.alt || item.title} loading="lazy" />
      </div>
      <CardHeader>
        <CardTitle title={item.title}>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Badge variant="garnet">{item.category}</Badge>
          {item.availability !== 'InStock' && (
            <Badge className="" variant="default" style={{ marginLeft: 6 }}>
              {item.availability}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <span className="price">${item.price.amount.toFixed(2)}</span>
        <span aria-label={`rating ${item.rating ?? 0} out of 5`} title={`Rating ${item.rating ?? 0}/5`}>
          {'⭐'.repeat(Math.max(1, Math.round(item.rating ?? 0)))}
        </span>
      </CardFooter>
    </Card>
  );
}
