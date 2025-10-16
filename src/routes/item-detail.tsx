import { ArrowLeft, Building2, Mail, Phone } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function ItemDetailPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const identifier = itemId ? itemId.replace(/-/g, ' ') : 'directory item'

  return (
    <div className="space-y-8">
      <Button asChild variant="ghost" size="sm" className="w-fit gap-2 px-0">
        <Link to="/catalog">
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>
      </Button>

      <section className="grid gap-6 rounded-2xl border bg-card p-8 shadow-sm lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-fsu-garnet/20 text-fsu-garnet">
              <Building2 className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-3xl font-semibold capitalize sm:text-4xl">{identifier}</h1>
              <p className="text-base text-muted-foreground">
                Detailed profile information for this unit will appear here, including leadership,
                contact methods, focus areas, and related resources.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-fsu-gold/40 bg-muted/30 p-6 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Next steps</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Integrate authoritative data sources to populate contact and staffing details.</li>
              <li>Design tabs for overview, people, and resources tailored to each unit.</li>
              <li>Elevate related programs and news to connect visitors with current efforts.</li>
            </ul>
          </div>
        </div>

        <aside className="space-y-4 rounded-xl border bg-muted/20 p-6 text-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-fsu-gold">
            Contact
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              placeholder@fsu.edu
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              (850) 000-0000
            </p>
            <p>
              Additional location, hours, and accessibility information will surface alongside
              verified data integrations.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}
