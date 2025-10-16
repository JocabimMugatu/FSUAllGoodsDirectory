import { Outlet } from 'react-router-dom'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="container flex-1 py-10">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
