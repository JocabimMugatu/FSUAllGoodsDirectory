"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-md bg-fsu-garnet text-primary-foreground">
            <span className="text-lg font-bold">FS</span>
          </div>
          <Link href="/" className="font-semibold tracking-tight">
            Florida State University
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="#features" className="text-foreground/80 hover:text-foreground">
            Features
          </Link>
          <Link href="#brand" className="text-foreground/80 hover:text-foreground">
            Branding
          </Link>
          <Link href="#components" className="text-foreground/80 hover:text-foreground">
            Components
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button className="hidden sm:inline-flex" asChild>
            <Link href="#get-started">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
