"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import type { CatalogItem, InventoryStatus } from "@/lib/data/catalog-data";
import { staticCatalogItems } from "@/lib/data/catalog-data";

const SEARCH_DEBOUNCE_MS = 200;
const SORT_FIELDS = ["price", "name", "category", "availability"] as const;

type SortField = (typeof SORT_FIELDS)[number];
export type SortDirection = "asc" | "desc";
export type SortOption = `${SortField}-${SortDirection}`;

const SORT_OPTION_PATTERN = /^(price|name|category|availability)-(asc|desc)$/;
export const DEFAULT_SORT_OPTION: SortOption = "price-asc";

export const SORT_OPTIONS: ReadonlyArray<{ value: SortOption; label: string }> = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "category-asc", label: "Category: A to Z" },
  { value: "category-desc", label: "Category: Z to A" },
  { value: "availability-asc", label: "Availability: Most in stock" },
  { value: "availability-desc", label: "Availability: Limited first" }
] as const;

const AVAILABILITY_PRIORITY: Record<SortDirection, Record<InventoryStatus, number>> = {
  asc: {
    in_stock: 0,
    low_stock: 1,
    preorder: 2,
    backorder: 3
  },
  desc: {
    in_stock: 3,
    low_stock: 2,
    preorder: 1,
    backorder: 0
  }
};

const hydrateItems = (): Promise<CatalogItem[]> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve(staticCatalogItems);
    }, 220);
  });
};

const parseCategoriesParam = (value: string | null) => {
  if (!value) {
    return [] as string[];
  }

  return Array.from(
    new Set(
      value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));
};

const areArraysEqual = (first: string[], second: string[]) => {
  if (first.length !== second.length) {
    return false;
  }

  return first.every((value, index) => value === second[index]);
};

const isValidSortOption = (value: string | null): value is SortOption => {
  return value !== null && SORT_OPTION_PATTERN.test(value);
};

const sortCatalogItems = (items: CatalogItem[], sortOption: SortOption) => {
  const [field, direction] = sortOption.split("-") as [SortField, SortDirection];
  const directionMultiplier = direction === "asc" ? 1 : -1;

  return [...items].sort((a, b) => {
    switch (field) {
      case "price":
        return directionMultiplier * (a.price - b.price);
      case "name":
        return directionMultiplier * a.name.localeCompare(b.name);
      case "category":
        return directionMultiplier * a.category.localeCompare(b.category);
      case "availability":
        return (
          AVAILABILITY_PRIORITY[direction][a.inventoryStatus] -
          AVAILABILITY_PRIORITY[direction][b.inventoryStatus]
        );
      default:
        return 0;
    }
  });
};

type CatalogDataContextValue = {
  items: CatalogItem[];
  totalItems: number;
  isLoading: boolean;
  isEmpty: boolean;
  categories: string[];
  selectedCategories: string[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  toggleCategory: (category: string) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
  averagePrice: number;
};

const CatalogDataContext = createContext<CatalogDataContextValue | undefined>(undefined);

export function CatalogDataProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";
  const initialCategories = parseCategoriesParam(searchParams.get("categories"));
  const initialSort = isValidSortOption(searchParams.get("sort"))
    ? (searchParams.get("sort") as SortOption)
    : DEFAULT_SORT_OPTION;

  const [rawItems, setRawItems] = useState<CatalogItem[] | null>(null);
  const [searchTerm, setSearchTermState] = useState(initialSearch);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearch.trim());
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [sortOption, setSortOptionState] = useState<SortOption>(initialSort);

  useEffect(() => {
    let mounted = true;

    hydrateItems().then((dataset) => {
      if (mounted) {
        setRawItems(dataset);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(handle);
    };
  }, [searchTerm]);

  useEffect(() => {
    const nextSearch = searchParams.get("search") ?? "";
    const nextCategories = parseCategoriesParam(searchParams.get("categories"));
    const nextSortParam = searchParams.get("sort");
    const nextSort = isValidSortOption(nextSortParam)
      ? (nextSortParam as SortOption)
      : DEFAULT_SORT_OPTION;

    if (nextSearch !== searchTerm) {
      setSearchTermState(nextSearch);
    }

    setSelectedCategories((previous) => {
      return areArraysEqual(previous, nextCategories) ? previous : nextCategories;
    });

    if (nextSort !== sortOption) {
      setSortOptionState(nextSort);
    }
  }, [searchParams, searchTerm, sortOption]);

  const categories = useMemo(() => {
    if (!rawItems) {
      return [] as string[];
    }

    return Array.from(new Set(rawItems.map((item) => item.category))).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [rawItems]);

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }

    setSelectedCategories((previous) => {
      const filtered = previous.filter((category) => categories.includes(category));
      return areArraysEqual(previous, filtered) ? previous : filtered;
    });
  }, [categories]);

  const setSearchTerm = useCallback((value: string) => {
    setSearchTermState(value);
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((previous) => {
      if (previous.includes(category)) {
        return previous.filter((entry) => entry !== category);
      }

      return [...previous, category].sort((a, b) => a.localeCompare(b));
    });
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTermState("");
    setSelectedCategories([]);
    setSortOptionState(DEFAULT_SORT_OPTION);
  }, []);

  const setSortOption = useCallback((value: SortOption) => {
    setSortOptionState(value);
  }, []);

  const visibleItems = useMemo(() => {
    if (!rawItems) {
      return [] as CatalogItem[];
    }

    const normalizedQuery = debouncedSearchTerm.toLowerCase();
    const hasSearch = normalizedQuery.length > 0;
    const hasCategories = selectedCategories.length > 0;

    const filtered = rawItems.filter((item) => {
      if (hasCategories && !selectedCategories.includes(item.category)) {
        return false;
      }

      if (hasSearch) {
        const haystack = `${item.name} ${item.description}`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }

      return true;
    });

    return sortCatalogItems(filtered, sortOption);
  }, [rawItems, debouncedSearchTerm, selectedCategories, sortOption]);

  const averagePrice = useMemo(() => {
    if (visibleItems.length === 0) {
      return 0;
    }

    const total = visibleItems.reduce((sum, item) => sum + item.price, 0);
    return total / visibleItems.length;
  }, [visibleItems]);

  const totalItems = rawItems?.length ?? 0;
  const isLoading = rawItems === null;
  const isEmpty = !isLoading && visibleItems.length === 0;
  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    selectedCategories.length > 0 ||
    sortOption !== DEFAULT_SORT_OPTION;

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchTerm.length > 0) {
      params.set("search", debouncedSearchTerm);
    } else {
      params.delete("search");
    }

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    if (sortOption !== DEFAULT_SORT_OPTION) {
      params.set("sort", sortOption);
    } else {
      params.delete("sort");
    }

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery === currentQuery) {
      return;
    }

    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [debouncedSearchTerm, selectedCategories, sortOption, pathname, router, searchParams]);

  const value = useMemo<CatalogDataContextValue>(
    () => ({
      items: visibleItems,
      totalItems,
      isLoading,
      isEmpty,
      categories,
      selectedCategories,
      searchTerm,
      setSearchTerm,
      toggleCategory,
      resetFilters,
      hasActiveFilters,
      sortOption,
      setSortOption,
      averagePrice
    }),
    [
      visibleItems,
      totalItems,
      isLoading,
      isEmpty,
      categories,
      selectedCategories,
      searchTerm,
      setSearchTerm,
      toggleCategory,
      resetFilters,
      hasActiveFilters,
      sortOption,
      setSortOption,
      averagePrice
    ]
  );

  return <CatalogDataContext.Provider value={value}>{children}</CatalogDataContext.Provider>;
}

export function useCatalogData() {
  const context = useContext(CatalogDataContext);
  if (context === undefined) {
    throw new Error("useCatalogData must be used within a CatalogDataProvider");
  }

  return context;
}
