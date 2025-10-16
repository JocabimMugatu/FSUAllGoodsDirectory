"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { CatalogItem } from "@/lib/data/catalog-data";
import { staticCatalogItems } from "@/lib/data/catalog-data";

const CatalogDataContext = createContext<CatalogDataContextValue | undefined>(undefined);

type CatalogDataContextValue = {
  items: CatalogItem[];
  isLoading: boolean;
  isEmpty: boolean;
  categories: string[];
  averagePrice: number;
};

const EMPTY_STATE: CatalogDataContextValue = {
  items: [],
  isLoading: true,
  isEmpty: false,
  categories: [],
  averagePrice: 0
};

const hydrateItems = (): Promise<CatalogItem[]> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve(staticCatalogItems);
    }, 220);
  });
};

export function CatalogDataProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CatalogItem[] | null>(null);

  useEffect(() => {
    let mounted = true;

    hydrateItems().then((dataset) => {
      if (mounted) {
        setItems(dataset);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<CatalogDataContextValue>(() => {
    if (items === null) {
      return EMPTY_STATE;
    }

    const categories = Array.from(new Set(items.map((item) => item.category)));
    const averagePrice =
      items.length > 0 ? items.reduce((total, item) => total + item.price, 0) / items.length : 0;

    return {
      items,
      isLoading: false,
      isEmpty: items.length === 0,
      categories,
      averagePrice
    };
  }, [items]);

  return <CatalogDataContext.Provider value={value}>{children}</CatalogDataContext.Provider>;
}

export function useCatalogData() {
  const context = useContext(CatalogDataContext);
  if (context === undefined) {
    throw new Error("useCatalogData must be used within a CatalogDataProvider");
  }

  return context;
}
