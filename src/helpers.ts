import { fsuMerchCatalog, merchCategories, merchItems, merchSizeOptions } from "./data/catalog";
import type {
  CatalogSnapshot,
  CategoryId,
  MerchCategory,
  MerchItem,
  SizeOption
} from "./types";

export const getCatalogSnapshot = (): CatalogSnapshot => fsuMerchCatalog;

export const listCategories = (): readonly MerchCategory[] => merchCategories;

export const listSizeOptions = (): readonly SizeOption[] => merchSizeOptions;

export const getItemById = (id: string): MerchItem | undefined =>
  merchItems.find((item) => item.id === id);

export const getItemBySku = (sku: string): MerchItem | undefined =>
  merchItems.find((item) => item.sku === sku);

export const getItemsByCategory = (categoryId: CategoryId): MerchItem[] =>
  merchItems.filter((item) => item.categoryId === categoryId);

export const searchItems = (query: string): MerchItem[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }
  return merchItems.filter((item) => {
    const haystack = [
      item.name,
      item.shortDescription,
      item.description,
      ...item.tags
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
};

export const filterItemsByPriceRange = (min: number, max: number): MerchItem[] =>
  merchItems.filter((item) => {
    const price = item.price.salePrice ?? item.price.listPrice;
    return price >= min && price <= max;
  });

export const getItemsWithFlags = (flag: string): MerchItem[] =>
  merchItems.filter((item) => item.flags.includes(flag));
