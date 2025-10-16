import { ArrowRight, MapPin, Sparkles, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function HomePage() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl border bg-gradient-to-br from-fsu-garnet via-fsu-garnet/95 to-fsu-spear p-8 text-fsu-garnet-foreground shadow-xl sm:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-fsu-gold">
              Florida State University
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Discover the people and programs powering FSU
            </h1>
            <p className="max-w-2xl text-base text-fsu-garnet-foreground/80">
              A refreshed directory experience for students, faculty, staff, and partners to
              quickly find departments, research areas, and the experts that make the
              university thrive.
            </p>
          </div>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="h-auto rounded-full bg-fsu-gold px-8 py-3 text-base font-semibold text-fsu-gold-foreground shadow-lg shadow-fsu-spear/30 transition hover:bg-fsu-gold/90"
          >
            <Link to="/catalog" className="flex items-center gap-2">
              Browse the catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fsu-gold/20 text-fsu-garnet">
              <Users className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold">People first</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Build a unified view of faculty and staff with rich profiles supported by
            enterprise data sources.
          </p>
        </article>

        <article className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fsu-garnet/20 text-fsu-garnet">
              <Sparkles className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold">Modern experience</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Tailwind CSS and ShadCN UI provide a flexible design system tailored with FSU
            colors and typography.
          </p>
        </article>

        <article className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fsu-smoke/20 text-fsu-garnet">
              <MapPin className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold">Campus-wide scope</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Support for colleges, departments, programs, and research units with intuitive
            filters and navigation.
          </p>
        </article>
      </section>
    </div>
  )
}
