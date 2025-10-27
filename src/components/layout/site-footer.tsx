import { Link } from "react-router-dom"

import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-garnet/10 bg-white/70 backdrop-blur">
      <div className="container grid gap-12 py-12 md:grid-cols-[2fr,1fr,1fr]">
        <div className="space-y-4">
          <Link to="/" className="font-display text-2xl font-semibold text-garnet">
            FSU All Goods Directory
          </Link>
          <p className="max-w-md text-sm text-muted-foreground">
            A curated catalog celebrating the spirit of Florida State University, featuring
            apparel, accessories, home goods, office essentials, and promotional items for
            every Seminole supporter.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <h3 className="font-semibold uppercase tracking-[0.25em] text-garnet/80">
            Explore
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/#catalog" className="transition hover:text-garnet">
                Shop the Catalog
              </Link>
            </li>
            <li>
              <Link to="/#new-arrivals" className="transition hover:text-garnet">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link to="/#filters" className="transition hover:text-garnet">
                Advanced Filters
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <h3 className="font-semibold uppercase tracking-[0.25em] text-garnet/80">
            Connect
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="https://www.fsu.edu/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-garnet"
              >
                Florida State University
              </a>
            </li>
            <li>
              <a
                href="mailto:merchandising@fsu.edu"
                className="transition hover:text-garnet"
              >
                merchandising@fsu.edu
              </a>
            </li>
            <li>
              <a href="tel:18502447347" className="transition hover:text-garnet">
                (850) 244-7347
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Separator className="bg-border/60" />
      <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} Florida State University. All rights reserved.</span>
        <span className="uppercase tracking-[0.3em] text-garnet/60">
          Go Noles!
        </span>
      </div>
    </footer>
  )
}
