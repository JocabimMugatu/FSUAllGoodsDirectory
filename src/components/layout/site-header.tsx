import { Link, NavLink, useLocation } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  { name: "Catalog", hash: "#catalog" },
  { name: "Filters", hash: "#filters" },
  { name: "New Arrivals", hash: "#new-arrivals" },
]

interface SiteHeaderProps {
  totalItems: number
}

export function SiteHeader({ totalItems }: SiteHeaderProps) {
  const location = useLocation()

  const isHome = location.pathname === "/"

  return (
    <header className="sticky top-0 z-50 border-b border-garnet/10 bg-white/80 backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-garnet text-gold shadow-lg">
            <span className="text-lg font-bold">FS</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-semibold leading-tight text-garnet">
              Florida State University
            </span>
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              All Goods Directory
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-[0.2em] text-garnet/70 lg:flex">
          {NAV_ITEMS.map((item) => {
            const target = isHome ? item.hash : `/${item.hash}`
            return (
              <NavLink key={item.name} to={target} className="transition hover:text-garnet">
                {item.name}
              </NavLink>
            )
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="hidden md:inline-flex text-xs">
            {totalItems} Items Curated
          </Badge>
          <Button asChild variant="default" className="hidden md:inline-flex">
            <Link to={isHome ? "#catalog" : "/#catalog"}>Explore Catalog</Link>
          </Button>
          <Button asChild variant="outline" className="md:hidden">
            <Link to={isHome ? "#catalog" : "/#catalog"}>Browse</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
