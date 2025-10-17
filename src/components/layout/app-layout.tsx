import { Link, Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-primary-foreground">
        <div className="container flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="text-3xl font-bold tracking-tight sm:text-4xl">
              FSU All Goods Directory
            </Link>
            <p className="mt-2 max-w-2xl text-sm font-medium text-primary-foreground/90 sm:text-base">
              Discover 500 curated Florida State University inspired products, complete with smart search,
              filters, and detailed insights.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm sm:flex-col sm:items-end sm:text-right">
            <span className="font-semibold uppercase tracking-[0.22em] text-primary-foreground/80">
              Built with
            </span>
            <span className="rounded-full bg-primary-foreground/15 px-4 py-1 font-semibold text-primary-foreground">
              React · Vite · ShadCN UI
            </span>
          </div>
        </div>
      </header>
      <main className="bg-muted/20 pb-20 pt-10">
        <Outlet />
      </main>
      <footer className="border-t bg-card/80 py-6 text-sm text-muted-foreground">
        <div className="container flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Florida State University · All Goods Directory.</p>
          <p className="text-xs sm:text-sm">Crafted with accessibility, performance, and discoverability in mind.</p>
        </div>
      </footer>
    </div>
  )
}
