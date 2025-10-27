import { ArrowRight, Star } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import type { Item } from "@/types/item"

const colorSwatches: Record<string, string> = {
  Garnet: "#782F40",
  Gold: "#CEB888",
  "Matte Gold": "#D4B46E",
  Brass: "#B68A2C",
  "Vintage Cream": "#F2E7D5",
  Black: "#1C1C1C",
  White: "#FFFFFF",
  Charcoal: "#3E3E3E",
  Stone: "#D1C5B4",
  Sunset: "#ED8C72",
  Crimson: "#8C1D3B",
  Champagne: "#E1C699",
  Ivory: "#F6F1E4",
  Walnut: "#7C4A1B",
  Graphite: "#4B4B4F",
  Sandstone: "#DCC6A2",
  Translucent: "#F6F6F6",
  Carbon: "#2F2F2F",
  Espresso: "#3B2416",
  Onyx: "#2C2C2C",
  Maple: "#C58F55",
  Sable: "#50342D",
  "Sunset Gold": "#E7C16A",
  "Seminole Sand": "#E0CBA0",
}

function getSwatchColor(color: string) {
  return colorSwatches[color] ?? "#CEB888"
}

interface ItemCardProps {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-garnet/10 bg-white/90 shadow-md transition hover:-translate-y-1 hover:bg-white hover:shadow-elegant">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          {item.featured ? (
            <Badge variant="secondary" className="absolute left-3 top-3 shadow">
              Featured
            </Badge>
          ) : null}
          <Badge
            variant="outline"
            className="absolute left-3 bottom-3 border-white/70 bg-white/80 text-[0.7rem] font-semibold tracking-[0.3em] text-garnet"
          >
            {item.category.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col space-y-4 p-6">
        <div className="space-y-2">
          <CardTitle className="text-xl leading-tight text-garnet">
            {item.name}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </CardDescription>
        </div>
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-display text-2xl text-garnet">
              {formatCurrency(item.price)}
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span>{item.rating.toFixed(1)} / 5</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {item.colors.slice(0, 3).map((color) => (
              <span
                key={`${item.id}-${color}`}
                className="h-6 w-6 rounded-full border border-white/80 shadow-sm"
                style={{ backgroundColor: getSwatchColor(color) }}
                title={color}
              />
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          asChild
          className="w-full border-garnet/30 text-garnet transition group-hover:bg-garnet group-hover:text-gold"
        >
          <Link to={`/items/${item.id}`} className="flex items-center justify-center gap-2">
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
