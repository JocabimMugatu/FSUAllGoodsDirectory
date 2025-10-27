import { Compass } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <section className="container flex flex-col items-center justify-center gap-6 py-28 text-center">
      <Compass className="h-12 w-12 text-garnet" />
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-garnet">Page not found</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          We couldn’t locate that page in the FSU All Goods Directory. Return to the curated catalog
          and continue exploring garnet-and-gold classics.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Go to catalog</Link>
      </Button>
    </section>
  )
}
