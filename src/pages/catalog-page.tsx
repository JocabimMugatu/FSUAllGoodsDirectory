import { useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  Filter,
  Search,
  Sparkles,
  SlidersHorizontal,
  X,
} from "lucide-react"
import { Link } from "react-router-dom"

import { ItemCard } from "@/components/catalog/item-card"
import { Pagination } from "@/components/catalog/pagination"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories as CATEGORY_LIST, colorOptions, items } from "@/data/items"
import { cn, formatCurrency, formatDate } from "@/lib/utils"
import type { Category, Item, PriceRange } from "@/types/item"

const ITEMS_PER_PAGE = 24

const GLOBAL_MIN_PRICE = Math.floor(
  Math.min(...items.map((item) => item.price))
)
const GLOBAL_MAX_PRICE = Math.ceil(
  Math.max(...items.map((item) => item.price))
)

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
  { label: "Category", value: "category" },
] as const

type SortOption = (typeof SORT_OPTIONS)[number]["value"]

const SORT_DESCRIPTION: Record<SortOption, string> = {
  newest: "Showing the most recently released items first",
  "price-asc": "From the most accessible price point upward",
  "price-desc": "Highlighting premium garnet and gold investments",
  "name-asc": "Alphabetical order from A to Z",
  "name-desc": "Alphabetical order from Z to A",
  category: "Grouped by collection category",
}

const COLOR_SWATCHES: Record<string, string> = {
  Garnet: "#782F40",
  Gold: "#CEB888",
  "Matte Gold": "#D6B878",
  "Vintage Cream": "#F2E7D5",
  Black: "#1C1C1C",
  White: "#FFFFFF",
  Charcoal: "#3E3E3E",
  Stone: "#D1C5B4",
  Sable: "#50342D",
  "Crimson": "#7A1D32",
  "Champagne": "#E1C699",
  Ivory: "#F6F1E4",
  Walnut: "#7C4A1B",
  Graphite: "#4B4B4F",
  Sandstone: "#DCC6A2",
  Translucent: "#F6F6F6",
  Carbon: "#2F2F2F",
  Espresso: "#3B2416",
  Onyx: "#2C2C2C",
  Maple: "#C58F55",
  "Sunset": "#ED8C72",
}

const SORTED_COLORS = [...colorOptions].sort((a, b) => a.localeCompare(b))

function getColorSwatch(color: string) {
  return COLOR_SWATCHES[color] ?? "#CEB888"
}

function matchesSearch(item: Item, term: string) {
  if (!term) return true
  const normalized = term.toLowerCase()
  return (
    item.name.toLowerCase().includes(normalized) ||
    item.description.toLowerCase().includes(normalized) ||
    item.sku.toLowerCase().includes(normalized)
  )
}

function matchesCategory(item: Item, selections: Category[]) {
  if (selections.length === 0) return true
  return selections.includes(item.category)
}

function matchesColors(item: Item, selections: string[]) {
  if (selections.length === 0) return true
  return selections.every((color) => item.colors.includes(color))
}

function matchesPrice(item: Item, range: PriceRange) {
  return item.price >= range.min && item.price <= range.max
}

function sortItems(itemsToSort: Item[], sort: SortOption) {
  const next = [...itemsToSort]

  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => a.price - b.price)
    case "price-desc":
      return next.sort((a, b) => b.price - a.price)
    case "name-asc":
      return next.sort((a, b) => a.name.localeCompare(b.name))
    case "name-desc":
      return next.sort((a, b) => b.name.localeCompare(a.name))
    case "category":
      return next.sort((a, b) => a.category.localeCompare(b.category))
    case "newest":
    default:
      return next.sort(
        (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      )
  }
}

const CATEGORY_COUNTS = CATEGORY_LIST.reduce<Record<Category, number>>((acc, category) => {
  acc[category] = items.filter((item) => item.category === category).length
  return acc
}, {} as Record<Category, number>)

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: GLOBAL_MIN_PRICE,
    max: GLOBAL_MAX_PRICE,
  })
  const [sortOption, setSortOption] = useState<SortOption>("newest")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return (
        matchesSearch(item, searchTerm) &&
        matchesCategory(item, selectedCategories) &&
        matchesColors(item, selectedColors) &&
        matchesPrice(item, priceRange)
      )
    })
  }, [searchTerm, selectedCategories, selectedColors, priceRange])

  const sortedItems = useMemo(
    () => sortItems(filteredItems, sortOption),
    [filteredItems, sortOption]
  )

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE
    return sortedItems.slice(start, start + ITEMS_PER_PAGE)
  }, [safePage, sortedItems])

  const newArrivals = useMemo(
    () =>
      [...items]
        .sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        )
        .slice(0, 8),
    []
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategories, selectedColors, priceRange.min, priceRange.max, sortOption])

  useEffect(() => {
    if (currentPage !== safePage) {
      setCurrentPage(safePage)
    }
  }, [currentPage, safePage])

  const activeFilterCount =
    selectedCategories.length +
    selectedColors.length +
    (priceRange.min !== GLOBAL_MIN_PRICE || priceRange.max !== GLOBAL_MAX_PRICE ? 1 : 0)

  function toggleCategory(category: Category) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    )
  }

  function toggleColor(color: string) {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    )
  }

  function updatePriceRange(key: keyof PriceRange, rawValue: number) {
    if (Number.isNaN(rawValue)) {
      return
    }

    setPriceRange((prev) => {
      let nextMin = prev.min
      let nextMax = prev.max

      if (key === "min") {
        nextMin = Math.max(GLOBAL_MIN_PRICE, Math.min(rawValue, prev.max))
      } else {
        nextMax = Math.min(GLOBAL_MAX_PRICE, Math.max(rawValue, prev.min))
      }

      return {
        min: Math.round(nextMin * 100) / 100,
        max: Math.round(nextMax * 100) / 100,
      }
    })
  }

  function clearFilters() {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedColors([])
    setPriceRange({ min: GLOBAL_MIN_PRICE, max: GLOBAL_MAX_PRICE })
    setSortOption("newest")
  }

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-garnet/10 bg-white/80">
        <div className="container grid gap-10 py-16 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit uppercase tracking-[0.3em]">
              Florida State University
            </Badge>
            <h1 className="text-balance text-4xl font-bold leading-tight text-garnet sm:text-5xl">
              Discover the complete FSU All Goods Directory
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Browse {items.length} garments, accessories, home accents, office essentials, and
              promotional standouts crafted to elevate every Seminole celebration.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="#catalog">
                  Explore catalog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="#filters">
                  <SlidersHorizontal className="h-4 w-4" />
                  Refine results
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 pt-6 text-sm sm:grid-cols-2">
              {CATEGORY_LIST.map((category) => (
                <div
                  key={category}
                  className="flex items-center justify-between rounded-lg border border-garnet/10 bg-white/80 px-4 py-3 shadow-sm"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-garnet/60">
                      {category}
                    </p>
                    <p className="text-lg font-semibold text-garnet">
                      {CATEGORY_COUNTS[category]} selections
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[0.7rem]">
                    Curated
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden rounded-[2.5rem] border border-garnet/10 bg-gradient-to-br from-garnet/90 via-garnet to-garnet-dark p-10 text-gold shadow-elegant lg:flex lg:flex-col lg:justify-between">
            <div className="absolute right-8 top-8 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
            <div className="space-y-4">
              <Badge variant="outline" className="border-gold/60 bg-gold/10 text-xs text-gold">
                New this season
              </Badge>
              <h2 className="text-3xl font-display leading-tight">
                Tailored for Seminole pride
              </h2>
              <p className="text-sm text-gold/90">
                Our merchandising team collaborated with campus creatives to design elevated
                pieces for alumni reunions, campus life, and championship celebrations.
              </p>
            </div>
            <div className="space-y-3 text-sm text-gold/90">
              <p>• Limited edition drops arriving weekly</p>
              <p>• Sustainably sourced materials across the catalog</p>
              <p>• Vetted by the Student Alumni Association</p>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-gold/70">
                Go Noles
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="new-arrivals" className="container space-y-6 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-garnet">Fresh arrivals</h2>
            <p className="text-sm text-muted-foreground">
              Spotlighting the latest garnet-and-gold pieces released in the past months.
            </p>
          </div>
          <Badge variant="secondary" className="text-xs uppercase tracking-[0.3em]">
            Updated {formatDate(newArrivals[0]?.releaseDate ?? new Date().toISOString())}
          </Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((item) => (
            <ItemCard key={`new-${item.id}`} item={item} />
          ))}
        </div>
      </section>

      <section
        id="filters"
        className="border-y border-garnet/10 bg-white/70 py-12"
        aria-label="Catalog filters"
      >
        <div className="container space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-garnet">
              <Filter className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Refine the directory</h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{filteredItems.length} of {items.length} items</span>
              {activeFilterCount > 0 ? (
                <Badge variant="outline" className="border-garnet/20 bg-garnet/5 text-xs text-garnet">
                  {activeFilterCount} active
                </Badge>
              ) : null}
              <Button variant="ghost" size="sm" onClick={clearFilters} disabled={activeFilterCount === 0}>
                Clear filters
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by name, description, or SKU"
                    className="pl-10"
                  />
                </div>
                <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground">{SORT_DESCRIPTION[sortOption]}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-semibold text-garnet">
                  <span>Categories</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_LIST.map((category) => {
                    const isActive = selectedCategories.includes(category)
                    return (
                      <Button
                        key={category}
                        type="button"
                        variant={isActive ? "default" : "outline"}
                        className={cn(
                          "rounded-full border-garnet/20 px-4 py-2 text-xs uppercase tracking-[0.3em]",
                          isActive ? "bg-garnet text-gold" : "bg-white text-garnet"
                        )}
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-semibold text-garnet">
                  <span>Color palette</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SORTED_COLORS.map((color) => {
                    const active = selectedColors.includes(color)
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => toggleColor(color)}
                        className={cn(
                          "flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] transition",
                          active
                            ? "border-garnet bg-garnet text-gold"
                            : "border-garnet/20 bg-white text-garnet/80"
                        )}
                      >
                        <span
                          className="h-4 w-4 rounded-full border border-white/70 shadow"
                          style={{ backgroundColor: getColorSwatch(color) }}
                        />
                        {color}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-garnet/15 bg-white/90 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-garnet">
                <SlidersHorizontal className="h-4 w-4" />
                Price range
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-garnet/70">
                  <label htmlFor="price-min">Min</label>
                  <label htmlFor="price-max">Max</label>
                  <Input
                    id="price-min"
                    type="number"
                    min={GLOBAL_MIN_PRICE}
                    max={priceRange.max}
                    value={priceRange.min}
                    onChange={(event) => updatePriceRange("min", Number(event.target.value))}
                  />
                  <Input
                    id="price-max"
                    type="number"
                    min={priceRange.min}
                    max={GLOBAL_MAX_PRICE}
                    value={priceRange.max}
                    onChange={(event) => updatePriceRange("max", Number(event.target.value))}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatCurrency(priceRange.min)}</span>
                  <span>{formatCurrency(priceRange.max)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Set your investment window to tailor the collection of pieces that match your
                  gifting plans, office upgrades, or wardrobe refresh.
                </p>
              </div>
            </div>
          </div>

          {activeFilterCount > 0 ? (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {selectedCategories.map((category) => (
                <Badge
                  key={`cat-${category}`}
                  variant="outline"
                  className="flex items-center gap-1 border-garnet/30 bg-garnet/5 text-garnet"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category)}
                    aria-label={`Remove ${category}`}
                    className="rounded-full p-0.5 text-garnet/70 transition hover:text-garnet"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedColors.map((color) => (
                <Badge
                  key={`color-${color}`}
                  variant="outline"
                  className="flex items-center gap-1 border-garnet/30 bg-garnet/5 text-garnet"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => toggleColor(color)}
                    aria-label={`Remove ${color}`}
                    className="rounded-full p-0.5 text-garnet/70 transition hover:text-garnet"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {priceRange.min !== GLOBAL_MIN_PRICE || priceRange.max !== GLOBAL_MAX_PRICE ? (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 border-garnet/30 bg-garnet/5 text-garnet"
                >
                  {formatCurrency(priceRange.min)} – {formatCurrency(priceRange.max)}
                  <button
                    type="button"
                    onClick={() =>
                      setPriceRange({ min: GLOBAL_MIN_PRICE, max: GLOBAL_MAX_PRICE })
                    }
                    aria-label="Reset price range"
                    className="rounded-full p-0.5 text-garnet/70 transition hover:text-garnet"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section id="catalog" className="container space-y-8 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-garnet">Catalog showcase</h2>
            <p className="text-sm text-muted-foreground">
              Displaying {paginatedItems.length} of {filteredItems.length} curated Florida State
              University goods.
            </p>
          </div>
          <Badge variant="outline" className="gap-2 text-xs text-garnet">
            <Sparkles className="h-4 w-4 text-gold" />
            {SORT_DESCRIPTION[sortOption]}
          </Badge>
        </div>

        {paginatedItems.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-garnet/15 bg-white/80 p-12 text-center shadow-sm">
            <Sparkles className="h-8 w-8 text-garnet" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-garnet">No items match your filters</h3>
              <p className="text-sm text-muted-foreground">
                Try expanding your filters or clearing selections to rediscover the full Seminole
                catalog.
              </p>
            </div>
            <Button variant="outline" onClick={clearFilters}>
              Reset filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {paginatedItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </section>
    </div>
  )
}
