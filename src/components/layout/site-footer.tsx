export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col gap-2 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} Florida State University. All rights reserved.
        </p>
        <p className="flex items-center gap-1">
          <span className="font-medium text-fsu-garnet">Future work:</span> search, filters &amp; personalization.
        </p>
      </div>
    </footer>
  )
}
