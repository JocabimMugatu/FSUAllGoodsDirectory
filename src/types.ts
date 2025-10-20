export type Category =
  | 'Apparel'
  | 'Accessories'
  | 'Home Goods'

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'One Size'

export type Price = {
  currency: 'USD'
  value: number // in USD
}

export type Image = {
  url: string
  alt: string
  width: number
  height: number
}

export type Availability = {
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  quantity: number
}

export type Item = {
  id: string
  sku: string
  title: string
  description: string
  brand: 'FSU'
  category: Category
  price: Price
  sizes: Size[]
  availability: Availability
  images: Image[]
  tags: string[]
}
