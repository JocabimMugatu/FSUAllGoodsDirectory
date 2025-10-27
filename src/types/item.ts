export type Category =
  | "Apparel"
  | "Accessories"
  | "Home Goods"
  | "Office"
  | "Promotional"

export interface Item {
  id: string
  sku: string
  name: string
  description: string
  category: Category
  price: number
  sizes: string[]
  colors: string[]
  materials: string[]
  tags: string[]
  images: string[]
  releaseDate: string
  rating: number
  featured: boolean
  availability: "In Stock" | "Limited" | "Preorder"
}

export interface PriceRange {
  min: number
  max: number
}
