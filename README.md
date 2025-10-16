# FSU Merchandise Catalogue

This repository models a comprehensive catalogue of Florida State University merchandise. It provides strongly typed data structures, a deterministic catalogue generator, pre-built data snapshots with more than 500 unique items, and helper utilities for querying merchandise information in downstream applications.

## What's Included

- **TypeScript models** for categories, size options, pricing metadata, and merchandise items (`src/types.ts`).
- **Deterministic catalogue generator** that can rebuild the data set from a fixed seed (`src/generator.ts`).
- **Pre-generated snapshot** containing 506 realistic FSU-branded products (`src/data/catalog.ts`).
- **Helper utilities** to retrieve catalogue data and apply common filters (`src/helpers.ts`).
- **Aggregate exports** for easy consumption (`src/index.ts`).

## Data Model Overview

Key interfaces are defined in `src/types.ts` and summarised below:

| Type | Description |
| --- | --- |
| `MerchCategory` | Identifies top-level shopping categories such as apparel, outerwear, and tailgating. |
| `SizeOption` | Normalises size choices (e.g. apparel sizes, headwear fits, standard one-size accessories) and groups them for reuse. |
| `PriceMetadata` | Captures list price, sale price, loyalty information, and merchandising flags for each item. |
| `MerchItem` | Represents a fully enriched product record with imagery, inventory, materials, colourways, pricing, and descriptive copy. |
| `CatalogSnapshot` | Bundles the generated merchandise items with the categories and size metadata used to render them. |

Refer to the source file for complete property documentation and inline comments.

## Generated Catalogue

`src/generator.ts` defines 30 product templates spanning every required category. Each template specifies:

- Base merchandising copy and material options.
- Supported size group (e.g. adult unisex apparel, headwear, tailgate gear).
- Colour families and imagery slug information.
- Variation counts that expand to 506 unique SKUs when combined with seeded randomness.

The generator uses a seeded Mulberry32 pseudo-random number generator to ensure deterministic output. Passing the same seed always reproduces the same catalogue, pricing, and descriptive metadata.

To create a snapshot programmatically:

```ts
import { generateCatalogSnapshot } from "./src";

const customSnapshot = generateCatalogSnapshot({ seed: 2025 });
console.log(customSnapshot.items.length); // 506
```

## Pre-Built Snapshot & Utilities

The repository exports a ready-to-use snapshot from `src/data/catalog.ts` using seed `1951`. You can import the data and helpers directly:

```ts
import {
  fsuMerchCatalog,
  merchItems,
  merchCategories,
  merchSizeOptions,
  getItemBySku,
  getItemsByCategory,
  searchItems,
  filterItemsByPriceRange
} from "./src";

const featured = getItemBySku("FSU-APP01001");
const apparel = getItemsByCategory("apparel");
const bargains = filterItemsByPriceRange(25, 60);
const searchResults = searchItems("spear hoodie");
```

All helper functions are located in `src/helpers.ts`.

## Extending the Data

- **Add new templates** to `PRODUCT_TEMPLATES` in `src/generator.ts` to expand the catalogue with additional variations or categories.
- **Adjust size options** in `src/constants.ts` to introduce new size groups or labels.
- **Regenerate snapshots** by calling `generateCatalogSnapshot` with the desired seed and storing the result as needed.

Because the generator is deterministic, updating template definitions and rerunning the generation process will produce stable, reproducible results suitable for tests, previews, or static site builds.
