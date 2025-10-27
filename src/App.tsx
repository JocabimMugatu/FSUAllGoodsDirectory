import { Outlet, ScrollRestoration } from "react-router-dom"

import { HashScroll } from "@/components/layout/hash-scroll"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { items } from "@/data/items"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader totalItems={items.length} />
      <main id="main-content" className="relative flex-1">
        <ScrollRestoration />
        <HashScroll />
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
