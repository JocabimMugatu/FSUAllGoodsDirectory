import { generateCatalogSnapshot } from "../generator";
import type { CatalogSnapshot, MerchItem, MerchCategory, SizeOption } from "../types";

const DEFAULT_SEED = 1951;

const snapshot = generateCatalogSnapshot({ seed: DEFAULT_SEED });

export const fsuMerchCatalog: CatalogSnapshot = {
  seed: snapshot.seed,
  generatedAt: snapshot.generatedAt,
  items: snapshot.items,
  categories: snapshot.categories,
  sizeOptions: snapshot.sizeOptions
};

export const merchItems: readonly MerchItem[] = fsuMerchCatalog.items;
export const merchCategories: readonly MerchCategory[] = fsuMerchCatalog.categories;
export const merchSizeOptions: readonly SizeOption[] = fsuMerchCatalog.sizeOptions;
