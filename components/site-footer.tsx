import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground/80">About</h3>
          <p className="text-sm text-muted-foreground">
            A Next.js + Tailwind + shadcn/ui starter styled with Florida State University's
            Garnet and Gold.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground/80">Resources</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link className="hover:underline underline-offset-4" href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
                shadcn/ui
              </Link>
            </li>
            <li>
              <Link className="hover:underline underline-offset-4" href="https://www.radix-ui.com" target="_blank" rel="noreferrer">
                Radix UI
              </Link>
            </li>
            <li>
              <Link className="hover:underline underline-offset-4" href="https://tailwindcss.com" target="_blank" rel="noreferrer">
                Tailwind CSS
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-end md:justify-end">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Florida State University — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
