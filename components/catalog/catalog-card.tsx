"use client";

import Image from "next/image";
import { memo } from "react";
import { Star } from "lucide-react";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CatalogItem, InventoryStatus } from "@/lib/data/catalog-data";
import { cn, formatCurrency } from "@/lib/utils";

const inventoryStatusMap: Record<InventoryStatus, { label: string; variant: BadgeProps["variant"]; className?: string }> = {
  in_stock: { label: "In stock", variant: "secondary", className: "bg-emerald-100 text-emerald-700" },
  low_stock: { label: "Low stock", variant: "secondary", className: "bg-amber-100 text-amber-700" },
  backorder: { label: "Backorder", variant: "outline", className: "border-dashed" },
  preorder: { label: "Pre-order", variant: "default" }
};

export type CatalogCardProps = {
  item: CatalogItem;
};

function CatalogCardComponent({ item }: CatalogCardProps) {
  const statusConfig = inventoryStatusMap[item.inventoryStatus];

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="space-y-4 p-4 pb-0">
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
          <Image
            alt={`Product image of ${item.name}`}
            src={item.imageUrl}
            fill
            sizes="(min-width: 1280px) 220px, (min-width: 1024px) 240px, (min-width: 768px) 33vw, 100vw"
            className="object-cover"
            loading="lazy"
            priority={false}
          />
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="truncate text-base font-semibold">{item.name}</CardTitle>
            <CardDescription className="text-sm">{item.category}</CardDescription>
          </div>
          <Badge
            variant={statusConfig.variant}
            className={cn("shrink-0", statusConfig.className)}
          >
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 p-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {item.badges.map((badge) => (
            <Badge key={`${item.id}-${badge}`} variant="outline" className="capitalize">
              {badge}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4 pt-0">
        <div className="text-xl font-semibold text-foreground">{formatCurrency(item.price)}</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
          <span>{item.rating.toFixed(1)} rating</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export const CatalogCard = memo(CatalogCardComponent);
CatalogCard.displayName = "CatalogCard";
