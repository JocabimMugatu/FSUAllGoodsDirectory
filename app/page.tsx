'use client';
import React, { useEffect, useMemo } from 'react';
import { useCatalog } from '@/lib/useCatalog';
import { ItemCard } from '@/components/item-card';
import type { Category } from '@/lib/types';

export default function Page() {
  const { query, result, setPage, setPageSize, setCategory, setSearch, categories } = useCatalog({ initialPageSize: 24 });

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.category, query.search, query.pageSize]);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const total = result.totalPages;
    const current = result.page;
    const window = 2; // pages around current

    const start = Math.max(1, current - window);
    const end = Math.min(total, current + window);
    for (let p = start; p <= end; p++) pages.push(p);
    return { pages, hasPrev: current > 1, hasNext: current < total };
  }, [result.page, result.totalPages]);

  return (
    <div>
      <section className="toolbar" aria-label="catalog controls">
        <div className="controls" role="group" aria-label="filters">
          <label>
            <span className="sr-only">Category</span>
            <select
              aria-label="Category filter"
              value={query.category ?? 'All'}
              onChange={(e) => setCategory(e.target.value as Category | 'All')}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Search</span>
            <input
              aria-label="Search products"
              type="text"
              placeholder="Search FSU items..."
              value={query.search ?? ''}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        <div className="controls" role="group" aria-label="page controls">
          <label>
            <span className="sr-only">Page size</span>
            <select aria-label="Page size" value={query.pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))}>
              {[12, 24, 36, 48].map((s) => (
                <option key={s} value={s}>
                  {s} / page
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section aria-live="polite" aria-busy={false}>
        <div className="grid">
          {result.items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <nav className="pagination" role="navigation" aria-label="Pagination">
        <button onClick={() => setPage(1)} disabled={!pageNumbers.hasPrev}>
          « First
        </button>
        <button onClick={() => setPage(result.page - 1)} disabled={!pageNumbers.hasPrev}>
          ‹ Prev
        </button>
        {pageNumbers.pages.map((p) => (
          <button key={p} className={`page ${p === result.page ? 'active' : ''}`} onClick={() => setPage(p)}>
            {p}
          </button>
        ))}
        <button onClick={() => setPage(result.page + 1)} disabled={!pageNumbers.hasNext}>
          Next ›
        </button>
        <button onClick={() => setPage(result.totalPages)} disabled={!pageNumbers.hasNext}>
          Last »
        </button>
      </nav>
    </div>
  );
}
