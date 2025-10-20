export type CurrencyCode = 'USD'

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Price {
  value: number
  currency: CurrencyCode
  sale?: number
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'One Size' | 'S/M' | 'L/XL' | 'Youth'

export interface Availability {
  inStock: boolean
  quantity: number
}

export interface Image {
  url: string
  alt: string
  width?: number
  height?: number
}

export interface Item {
  id: string
  sku: string
  title: string
  description: string
  categories: string[]
  price: Price
  sizes?: Size[]
  availability: Availability
  images: Image[]
  tags?: string[]
}
