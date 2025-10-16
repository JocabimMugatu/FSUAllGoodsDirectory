export type CurrencyCode = "USD";

export type PriceTier = "Value" | "Core" | "Premium" | "Limited";

export interface PriceMetadata {
  /** The ISO 4217 currency code used for pricing. */
  currency: CurrencyCode;
  /** The merchandise list price before discounts. */
  listPrice: number;
  /** Optional sale price when the item is discounted. */
  salePrice?: number;
  /** Optional member-exclusive price. */
  memberPrice?: number;
  /** Percentage discount applied relative to list price. */
  discountPercent?: number;
  /** Loyalty points earned on purchase. */
  loyaltyPoints: number;
  /** Qualitative price band used in the storefront. */
  priceTier: PriceTier;
  /** Indicates whether the item is currently on sale. */
  isOnSale: boolean;
  /** Whether the product can only be purchased online. */
  onlineExclusive: boolean;
  /** Timestamp representing the last time prices were refreshed. */
  lastUpdated: string;
}

export type SizeGroup =
  | "adult_unisex_apparel"
  | "women_apparel"
  | "youth_apparel"
  | "headwear"
  | "footwear"
  | "tailgate"
  | "accessories"
  | "collectibles"
  | "home_office";

export interface SizeOption {
  /** Stable identifier for the available size. */
  id: string;
  /** Human readable label shown to customers. */
  label: string;
  /** Optional short-form abbreviation (e.g. XS, OSFM). */
  abbreviation: string;
  /** Logical grouping for the size option. */
  group: SizeGroup;
  /** Ordinal value used for sorting within the group. */
  ordinal: number;
}

export type CategoryId =
  | "apparel"
  | "outerwear"
  | "headwear"
  | "footwear"
  | "accessories"
  | "tailgating"
  | "home_office"
  | "collectibles"
  | "youth";

export interface MerchCategory {
  /** Unique identifier for the category. */
  id: CategoryId;
  /** Display name for the category. */
  name: string;
  /** High-level description used in navigation. */
  description: string;
  /** Hero artwork or placeholder for category landing pages. */
  heroImage: string;
  /** Marketing tagline associated with the category. */
  featuredTagline: string;
}

export interface ImageAsset {
  /** Fully qualified URL pointing to a hosted image. */
  url: string;
  /** Alternative text describing the asset. */
  alt: string;
  /** Asset width in pixels. */
  width: number;
  /** Asset height in pixels. */
  height: number;
  /** Hex colour representing the dominant hue. */
  dominantColor: string;
}

export interface RatingSummary {
  /** The average customer rating (1–5 scale). */
  average: number;
  /** Number of ratings included in the average. */
  count: number;
}

export type InventoryStatus = "in_stock" | "low_stock" | "preorder";

export interface InventoryInfo {
  /** Current on-hand quantity reflected in the catalogue. */
  quantity: number;
  /** Inventory state used for merchandising rules. */
  status: InventoryStatus;
  /** Optional restock date when the item is expected back. */
  restockDate?: string;
}

export interface MerchItem {
  /** Stable identifier for linking within applications. */
  id: string;
  /** SKU or part number used by fulfilment systems. */
  sku: string;
  /** URL slug derived from the merchandising title. */
  slug: string;
  /** Customer-facing name of the product. */
  name: string;
  /** Concise summary shown in grid/list layouts. */
  shortDescription: string;
  /** Full product merchandising copy. */
  description: string;
  /** Category that the item belongs to. */
  categoryId: CategoryId;
  /** Searchable tags and merchandising facets. */
  tags: string[];
  /** List of primary colour descriptors. */
  colors: string[];
  /** Materials or fabric breakdown. */
  materials: string[];
  /** Size grouping to determine variant options. */
  sizeGroup: SizeGroup;
  /** Size option identifiers available to customers. */
  availableSizeIds: string[];
  /** Primary price metadata surfaced in the storefront. */
  price: PriceMetadata;
  /** Featured image used across the storefront. */
  primaryImage: ImageAsset;
  /** Additional gallery assets for detail pages. */
  gallery: ImageAsset[];
  /** Aggregate customer feedback data. */
  rating: RatingSummary;
  /** Release season descriptor for marketing. */
  releaseSeason: string;
  /** Availability information. */
  inventory: InventoryInfo;
  /** Flags describing merchandising positioning (e.g. Limited). */
  flags: string[];
  /** Convenience boolean for downstream systems. */
  isLimited: boolean;
  /** ISO timestamp when the item entered the catalogue. */
  introducedAt: string;
}

export interface CatalogSnapshot {
  /** Seed used when generating this snapshot. */
  seed: number;
  /** Timestamp representing when the snapshot was generated. */
  generatedAt: string;
  /** All merchandise items within the snapshot. */
  items: readonly MerchItem[];
  /** Category metadata referenced by items. */
  categories: readonly MerchCategory[];
  /** Size metadata referenced by items. */
  sizeOptions: readonly SizeOption[];
}
