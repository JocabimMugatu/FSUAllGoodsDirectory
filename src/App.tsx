import { Link, Navigate, Route, Routes } from "react-router-dom";

import CatalogPage from "@/pages/CatalogPage";
import ItemDetailPage from "@/pages/ItemDetailPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/catalog" className="text-lg font-semibold tracking-tight">
            Insight Catalog
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              to="/catalog"
              className="rounded-md px-2 py-1 transition hover:bg-accent hover:text-foreground"
            >
              Catalog
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/catalog" replace />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/items/:itemId" element={<ItemDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="border-t border-border bg-card/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Insight Catalog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
