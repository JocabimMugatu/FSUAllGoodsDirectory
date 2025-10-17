"use client";

import { useMemo } from "react";
import { PackageSearch } from "lucide-react";

import { CatalogControls } from "@/components/catalog/catalog-controls";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { useCatalogData } from "@/providers/catalog-data-provider";

export default function Page() {
  const { items, totalItems, isLoading, isEmpty, averagePrice } = useCatalogData();

  const formattedAveragePrice = useMemo(() => {
    if (items.length === 0) {
      return "—";
    }

    return formatCurrency(Math.round(averagePrice));
  }, [averagePrice, items.length]);

  const itemSummary = useMemo(() => {
    if (isLoading) {
      return "";
    }

    if (totalItems === 0) {
      return "No products available";
    }

    if (items.length === totalItems) {
      return `${totalItems} products available`;
    }

    return `Showing ${items.length} of ${totalItems} products`;
  }, [isLoading, items.length, totalItems]);

  return (
    <main className="container space-y-10 py-10">
      <header className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Product catalog</h1>
            <p className="text-muted-foreground">
              Browse a curated collection of performant, ready-to-ship products with responsive visuals and instant feedback.
            </p>
          </div>
          <div className="flex flex-col items-start rounded-lg border bg-card px-4 py-3 text-sm sm:items-end">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Average price</span>
            {isLoading ? (
              <Skeleton className="mt-1 h-6 w-24" />
            ) : (
              <span className="text-2xl font-semibold text-foreground">{formattedAveragePrice}</span>
            )}
          </div>
        </div>

        <CatalogControls />

        <div className="text-sm text-muted-foreground">
          {isLoading ? <Skeleton className="h-4 w-36" /> : itemSummary}
        </div>
      </header>

      {isEmpty && !isLoading ? (
        <Card className="mx-auto max-w-xl border-dashed">
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <PackageSearch className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">No items to display</h2>
              <p className="text-sm text-muted-foreground">
                Start by adding catalog entries or adjust your filters to discover products.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <CatalogGrid items={items} isLoading={isLoading} />
      )}
    </main>
  );
}
