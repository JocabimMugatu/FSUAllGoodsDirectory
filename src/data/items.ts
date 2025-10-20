import type { Item, Category, Size, Price, Availability, Image } from '@/types'

const apparelTypes = [
  'T-Shirt',
  'Hoodie',
  'Sweatshirt',
  'Jersey',
  'Polo',
  'Tank',
  'Long Sleeve',
] as const

const accessoryTypes = [
  'Hat',
  'Beanie',
  'Scarf',
  'Socks',
  'Backpack',
  'Lanyard',
  'Keychain',
  'Phone Case',
  'Water Bottle',
] as const

const homeGoodsTypes = [
  'Mug',
  'Tumbler',
  'Blanket',
  'Pillow',
  'Flag',
  'Poster',
  'Sticker',
  'Coaster Set',
  'Bottle Opener',
] as const

const colors = ['Garnet', 'Gold', 'White', 'Black', 'Grey'] as const

const apparelSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const oneSize: Size[] = ['One Size']

function seededRandom(seed: string) {
  // xmur3 hash + mulberry32 PRNG simplified
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507)
  h = Math.imul(h ^ (h >>> 13), 3266489909)
  h ^= h >>> 16
  // Convert to [0,1)
  const u = (h >>> 0) / 4294967296
  return u
}

function makePrice(base: number, seed: string): Price {
  const jitter = Math.round(seededRandom(seed) * 400) / 100 // up to $4.00
  return { currency: 'USD', value: Math.round((base + jitter) * 100) / 100 }
}

function imageForSku(sku: string, alt: string): Image {
  return {
    url: `https://picsum.photos/seed/${encodeURIComponent(sku)}/600/600`,
    alt,
    width: 600,
    height: 600,
  }
}

function availabilityForSku(sku: string): Availability {
  const r = seededRandom(sku)
  const quantity = Math.floor(r * 20) // 0..19
  let status: Availability['status'] = 'in_stock'
  if (quantity === 0) status = 'out_of_stock'
  else if (quantity < 5) status = 'low_stock'
  return { status, quantity }
}

function titleize(parts: string[]) {
  return parts.join(' ')
}

let counter = 1

function makeItem(
  base: string,
  color: typeof colors[number],
  idx: number,
  category: Category,
  basePrice: number,
  sizes: Size[],
): Item {
  const id = `${category.toLowerCase().replace(/\s+/g, '-')}-${base.toLowerCase().replace(/\s+/g, '-')}-${color.toLowerCase()}-${idx}`
  const sku = `FSU-${String(counter).padStart(5, '0')}`
  counter++
  const title = titleize(['FSU', color, base])
  const description = `Official FSU ${base.toLowerCase()} in ${color} — perfect for showing your Seminole spirit.`
  const price = makePrice(basePrice, sku)
  const availability = availabilityForSku(sku)
  const images = [imageForSku(sku, title)]
  const tags = ['FSU', 'Seminoles', color, base, category]
  return {
    id,
    sku,
    title,
    description,
    brand: 'FSU',
    category,
    price,
    sizes,
    availability,
    images,
    tags,
  }
}

function buildDataset(): Item[] {
  const items: Item[] = []

  // Apparel: 7 types * 5 colors * 6 variants = 210
  apparelTypes.forEach((base) => {
    colors.forEach((color) => {
      for (let i = 1; i <= 6; i++) {
        const basePrice =
          base === 'T-Shirt' || base === 'Tank' ? 24.99 :
          base === 'Long Sleeve' ? 29.99 :
          base === 'Hoodie' || base === 'Sweatshirt' ? 49.99 :
          base === 'Jersey' ? 79.99 :
          44.99
        items.push(
          makeItem(base, color, i, 'Apparel', basePrice, apparelSizes),
        )
      }
    })
  })

  // Accessories: 9 types * 5 colors * 4 variants = 180
  accessoryTypes.forEach((base) => {
    colors.forEach((color) => {
      for (let i = 1; i <= 4; i++) {
        const basePrice =
          base === 'Hat' || base === 'Beanie' ? 27.99 :
          base === 'Backpack' ? 59.99 :
          base === 'Phone Case' ? 24.99 :
          base === 'Water Bottle' ? 21.99 :
          14.99
        items.push(
          makeItem(base, color, i, 'Accessories', basePrice, oneSize),
        )
      }
    })
  })

  // Home Goods: 9 types * 5 colors * 4 variants = 180
  homeGoodsTypes.forEach((base) => {
    colors.forEach((color) => {
      for (let i = 1; i <= 4; i++) {
        const basePrice =
          base === 'Blanket' ? 39.99 :
          base === 'Pillow' ? 29.99 :
          base === 'Poster' ? 19.99 :
          base === 'Mug' || base === 'Tumbler' ? 17.99 :
          12.99
        items.push(
          makeItem(base, color, i, 'Home Goods', basePrice, oneSize),
        )
      }
    })
  })

  return items
}

export const ITEMS: Item[] = buildDataset()
