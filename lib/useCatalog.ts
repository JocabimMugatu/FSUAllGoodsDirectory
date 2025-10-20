'use client';
import { useMemo, useState } from 'react';
import type { CatalogQuery, CatalogResult, Category, Item } from './types';
import { DATASET } from './data';

export interface UseCatalogOptions {
  initialPageSize?: number;
}

export function useCatalog(options: UseCatalogOptions = {}) {
  const { initialPageSize = 24 } = options;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [search, setSearch] = useState<string>('');

  const query: CatalogQuery = { page, pageSize, category, search };

  const result: CatalogResult = useMemo(() => {
    const startFilter = Date.now();
    let list: Item[] = DATASET;

    if (query.category && query.category !== 'All') {
      list = list.filter((i) => i.category === query.category);
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q) ||
          i.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
    const currentPage = Math.min(Math.max(1, query.page), totalPages);
    const start = (currentPage - 1) * query.pageSize;
    const end = start + query.pageSize;
    const items = list.slice(start, end);

    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV !== 'production') console.debug('Catalog filtered in', Date.now() - startFilter, 'ms');

    return { total, totalPages, page: currentPage, pageSize: query.pageSize, items };
  }, [query.page, query.pageSize, query.category, query.search]);

  const categories: (Category | 'All')[] = useMemo(() => ['All', 'Apparel', 'Accessories', 'Home Goods', 'Headwear', 'Drinkware', 'Decals', 'Office', 'Tailgate'], []);

  return {
    query,
    result,
    categories,
    // controllers
    setPage,
    setPageSize,
    setCategory,
    setSearch,
  };
}
