export type Category =
  | 'Apparel'
  | 'Accessories'
  | 'Home Goods'
  | 'Headwear'
  | 'Drinkware'
  | 'Decals'
  | 'Office'
  | 'Tailgate';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'One Size' | 'Adjustable' | '12oz' | '16oz' | '20oz';

export type Currency = 'USD';

export interface Price {
  currency: Currency;
  amount: number; // in USD
}

export type Availability = 'InStock' | 'OutOfStock' | 'PreOrder' | 'Limited';

export interface Image {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Item {
  id: string;
  sku: string;
  title: string;
  description?: string;
  category: Category;
  price: Price;
  sizes?: Size[];
  availability: Availability;
  images: Image[];
  tags?: string[];
  rating?: number; // 0-5
}

export interface CatalogQuery {
  page: number;
  pageSize: number;
  category?: Category | 'All';
  search?: string;
}

export interface CatalogResult {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
  items: Item[];
}
