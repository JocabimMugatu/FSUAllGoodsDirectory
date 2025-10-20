import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-accent">
        <div className="container grid gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-24">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-fsu-garnet mr-2" />
              FSU Branding Ready
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Build with shadcn/ui, Tailwind, and Next.js — Garnet and Gold.
            </h1>
            <p className="text-muted-foreground max-w-prose">
              This starter integrates shadcn/ui and Radix dependencies with a Tailwind theme configured for Florida State University's official colors and typography.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button>Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="prose prose-sm dark:prose-invert">
              <h3 id="components">UI Tokens</h3>
              <ul>
                <li>Primary (Garnet): <span className="inline-block rounded px-2 py-0.5 bg-primary text-primary-foreground">#782F40</span></li>
                <li>Secondary (Gold): <span className="inline-block rounded px-2 py-0.5 bg-secondary text-secondary-foreground">#CEB888</span></li>
              </ul>
              <h3 id="features" className="mt-6">Features</h3>
              <ul>
                <li>ThemeProvider with light/dark support</li>
                <li>Responsive layout with header and footer</li>
                <li>shadcn/ui button component and utilities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="brand" className="container py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <div className="h-10 w-10 rounded-md bg-fsu-garnet" />
            <h3 className="mt-4 font-semibold">FSU Garnet</h3>
            <p className="text-sm text-muted-foreground">Primary brand color used throughout the UI.</p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="h-10 w-10 rounded-md bg-fsu-gold" />
            <h3 className="mt-4 font-semibold">FSU Gold</h3>
            <p className="text-sm text-muted-foreground">Secondary brand color for accents and highlights.</p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="h-10 w-10 rounded-md bg-primary" />
            <h3 className="mt-4 font-semibold">Tailwind Tokens</h3>
            <p className="text-sm text-muted-foreground">Colors are mapped to shadcn theme tokens for consistency.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
