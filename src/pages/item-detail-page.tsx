import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, Palette, Sparkles, Star, Tag } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { items } from "@/data/items"
import { formatCurrency, formatDate } from "@/lib/utils"

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

function getSwatch(color: string) {
  return COLOR_SWATCHES[color] ?? "#CEB888"
}

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>()

  const item = useMemo(() => items.find((entry) => entry.id === id), [id])
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    setSelectedImage(0)
  }, [item?.id])

  if (!item) {
    return (
      <section className="container flex flex-col items-center gap-4 py-24 text-center">
        <Sparkles className="h-10 w-10 text-garnet" />
        <h1 className="text-3xl font-semibold text-garnet">Item not found</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          The item you were looking for is no longer in our directory. Explore the full catalog to
          find the latest Florida State University goods.
        </p>
        <Button asChild>
          <Link to="/">Return to catalog</Link>
        </Button>
      </section>
    )
  }

  const recommended = useMemo(
    () =>
      items
        .filter((entry) => entry.category === item.category && entry.id !== item.id)
        .slice(0, 4),
    [item]
  )

  return (
    <div className="pb-20">
      <section className="container space-y-6 py-10">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-garnet/60">
          <Link to="/" className="transition hover:text-garnet">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-garnet">{item.category}</span>
          <span>/</span>
          <span className="text-garnet/80">{item.name}</span>
        </nav>
        <div className="grid gap-12 lg:grid-cols-[1.2fr,0.95fr]">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-garnet/15 bg-white/90 shadow-sm">
              <img
                src={item.images[selectedImage]}
                alt={item.name}
                className="aspect-square w-full object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute left-4 top-4 text-xs uppercase tracking-[0.3em]"
              >
                {item.category}
              </Badge>
              <Badge
                variant="outline"
                className="absolute right-4 top-4 border-gold/40 bg-gold/20 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-garnet"
              >
                {item.sku}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {item.images.map((image, index) => (
                <button
                  key={`${item.id}-thumb-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-2xl border ${
                    index === selectedImage
                      ? "border-garnet shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={image} alt={`${item.name} thumbnail ${index + 1}`} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <Card className="border-garnet/10 bg-white/90 shadow-elegant">
            <CardHeader className="space-y-3">
              <CardTitle className="text-3xl leading-tight text-garnet">{item.name}</CardTitle>
              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                {item.description}
              </CardDescription>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>Released {formatDate(item.releaseDate)}</span>
                <span>•</span>
                <span>{item.availability}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  {item.rating.toFixed(1)} / 5
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-display text-4xl text-garnet">
                  {formatCurrency(item.price)}
                </span>
                <Badge variant="secondary" className="text-xs uppercase tracking-[0.3em]">
                  Official FSU Merchandise
                </Badge>
              </div>

              <div className="grid gap-5 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-garnet">
                    Available sizes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((size) => (
                      <Badge
                        key={`${item.id}-${size}`}
                        variant="outline"
                        className="rounded-full border-garnet/20 bg-garnet/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-garnet"
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-garnet">
                    Colorways
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {item.colors.map((color) => (
                      <div key={`${item.id}-${color}`} className="flex items-center gap-2">
                        <span
                          className="h-6 w-6 rounded-full border border-white/80 shadow"
                          style={{ backgroundColor: getSwatch(color) }}
                          title={color}
                        />
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-garnet">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-garnet">
                    Materials
                  </h3>
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    {item.materials.map((material) => (
                      <li key={`${item.id}-${material}`} className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-garnet" />
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-garnet">
                    Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge
                        key={`${item.id}-tag-${tag}`}
                        variant="outline"
                        className="flex items-center gap-2 border-garnet/20 bg-garnet/5 text-xs uppercase tracking-[0.3em] text-garnet"
                      >
                        <Tag className="h-3.5 w-3.5" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="gap-2">
                  <Link to="/#catalog">
                    <ArrowLeft className="h-4 w-4" />
                    Back to catalog
                  </Link>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <Link to="/#filters">
                    <Palette className="h-4 w-4" />
                    Adjust filters
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {recommended.length > 0 ? (
        <section className="container space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-garnet">You may also like</h2>
            <Badge variant="outline" className="text-xs uppercase tracking-[0.3em] text-garnet">
              {item.category}
            </Badge>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((entry) => (
              <Card key={entry.id} className="overflow-hidden border-garnet/10 bg-white/90 shadow-sm">
                <CardHeader className="p-0">
                  <img src={entry.images[0]} alt={entry.name} className="h-48 w-full object-cover" />
                </CardHeader>
                <CardContent className="space-y-3 p-5">
                  <CardTitle className="text-lg text-garnet">{entry.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                    {entry.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm font-semibold text-garnet">
                    {formatCurrency(entry.price)}
                    <Link
                      to={`/items/${entry.id}`}
                      className="text-xs uppercase tracking-[0.3em] text-garnet/70 hover:text-garnet"
                    >
                      View
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
