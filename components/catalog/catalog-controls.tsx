"use client";

import { useId } from "react";
import { Search, XCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS, type SortOption, useCatalogData } from "@/providers/catalog-data-provider";

export function CatalogControls() {
  const {
    categories,
    selectedCategories,
    toggleCategory,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    resetFilters,
    hasActiveFilters,
    isLoading
  } = useCatalogData();

  const searchFieldId = useId();
  const sortFieldId = useId();

  return (
    <section
      aria-labelledby="catalog-controls-heading"
      className="space-y-5 rounded-lg border bg-card p-4 shadow-sm"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:max-w-xl">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor={searchFieldId} className="text-sm font-medium text-foreground">
              Search products
            </label>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <XCircle className="h-4 w-4" aria-hidden="true" />
                <span>Reset filters</span>
              </button>
            ) : null}
          </div>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id={searchFieldId}
              type="search"
              inputMode="search"
              autoComplete="off"
              placeholder="Search by name or description"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="block w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </div>
        <div className="w-full md:w-60">
          <label htmlFor={sortFieldId} className="text-sm font-medium text-foreground">
            Sort by
          </label>
          <select
            id={sortFieldId}
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value as SortOption)}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend id="catalog-controls-heading" className="text-sm font-medium text-foreground">
          Filter by category
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={`category-skeleton-${index}`} className="h-6 w-24 rounded-full" />
              ))
            : categories.length > 0
            ? categories.map((category) => {
                const selected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    aria-pressed={selected}
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      selected
                        ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-input bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {category}
                  </button>
                );
              })
            : (
                <span className="text-sm text-muted-foreground">No categories available</span>
              )}
        </div>
      </fieldset>
    </section>
  );
}
