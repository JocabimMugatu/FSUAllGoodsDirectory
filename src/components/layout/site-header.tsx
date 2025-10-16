import { Link, NavLink } from 'react-router-dom'

import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const navigation = [
  { to: '/', label: 'Overview' },
  { to: '/catalog', label: 'Catalog' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold text-fsu-garnet">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fsu-garnet text-fsu-garnet-foreground text-base font-black tracking-widest">
            FSU
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-base font-semibold text-foreground">FSU Directory</span>
            <span className="block text-xs text-muted-foreground">Faculty, Staff &amp; Units</span>
          </span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className="flex flex-wrap items-center gap-1 text-sm font-medium justify-end"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 transition-colors hover:text-foreground',
                  isActive
                    ? 'bg-fsu-garnet text-fsu-garnet-foreground shadow'
                    : 'text-muted-foreground hover:bg-muted',
                )
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
