import React from 'react'
import { useCatalog } from './providers/CatalogProvider'
import ItemCard from './components/ItemCard'

function formatCurrency(value: number, currency: string = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
}

const PER_PAGE_OPTIONS = [24, 48, 96]

const App: React.FC = () => {
  const { items } = useCatalog()
  const [page, setPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(48)
  const totalPages = Math.ceil(items.length / perPage)

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages || 1)
  }, [perPage, items.length, page, totalPages])

  const start = (page - 1) * perPage
  const currentItems = items.slice(start, start + perPage)

  return (
    <div className="app">
      <header className="header" role="banner">
        <h1 className="title">FSU Merchandise Catalog</h1>
        <div className="controls">
          <label>
            Items per page
            <select
              aria-label="Items per page"
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              {PER_PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <div className="summary" aria-live="polite">
            Showing {start + 1}–{Math.min(start + perPage, items.length)} of {items.length} items
          </div>
        </div>
      </header>

      <main className="main" role="main">
        <section aria-label="Catalog grid" className="grid">
          {currentItems.map((item) => (
            <ItemCard key={item.id} item={item} formatter={formatCurrency} />
          ))}
        </section>
      </main>

      <nav className="pagination" aria-label="Pagination">
        <button
          className="page-btn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          aria-label="Previous page"
        >
          Prev
        </button>
        <span className="page-info" aria-live="polite">Page {page} of {totalPages}</span>
        <button
          className="page-btn"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </nav>

      <footer className="footer" role="contentinfo">
        <small>&copy; {new Date().getFullYear()} FSU Catalog Demo</small>
      </footer>
    </div>
  )
}

export default App
