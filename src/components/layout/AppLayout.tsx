import { Link, NavLink, Outlet } from "react-router-dom";
import { GraduationCap, MapPinned } from "lucide-react";
import { Button } from "../ui/button";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fsu-sand via-white to-fsu-gold/40 text-fsu-charcoal">
      <header className="sticky top-0 z-30 border-b border-fsu-gold/50 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fsu-garnet text-white shadow-lg">
              <GraduationCap className="h-7 w-7" />
            </span>
            <div>
              <p className="font-display text-xl uppercase tracking-widest text-fsu-garnet">
                FSU Directory
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-fsu-charcoal/70">
                Florida State University
              </p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `uppercase tracking-wide transition-colors ${isActive ? "text-fsu-garnet" : "text-fsu-charcoal/70 hover:text-fsu-garnet"}`
              }
            >
              Catalog
            </NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="secondary" className="hidden md:inline-flex">
              <a href="#directory">Explore Directory</a>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <a
                href="https://www.fsu.edu/"
                target="_blank"
                rel="noreferrer"
              >
                <MapPinned className="h-4 w-4" />
                Visit FSU
              </a>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 md:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-fsu-gold/50 bg-white/80 py-6 text-center text-xs uppercase tracking-[0.35em] text-fsu-charcoal/60">
        Built for the Florida State University community
      </footer>
    </div>
  );
}
