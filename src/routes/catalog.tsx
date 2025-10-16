import { Filter, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function CatalogPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fsu-gold">
          Directory catalog
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">Explore FSU units and teams</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Search by name, college, focus area, or keyword to surface the people and programs
          that matter most. Filters and curated collections will come online in future
          iterations.
        </p>
      </header>

      <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-fsu-gold/40 bg-card p-8 text-center shadow-sm">
        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <Search className="h-5 w-5" />
          <span>Interactive search and result views will appear here.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          <Button variant="ghost" size="sm" className="gap-2">
            <Search className="h-4 w-4" />
            Keyword search
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Faceted filters
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <span className="h-2 w-2 rounded-full bg-fsu-garnet" />
            Saved collections
          </Button>
        </div>
      </div>

      <section className="grid gap-4 rounded-2xl border bg-muted/40 p-6 text-left text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Implementation notes</p>
        <ul className="list-inside list-disc space-y-1">
          <li>Connect to authoritative data feeds for people and organizational hierarchy.</li>
          <li>Design responsive list cards and detail pages for each entity type.</li>
          <li>Layer search, filters, and sorting backed by accessible keyboard interactions.</li>
        </ul>
      </section>
    </div>
  )
}
